import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useLocation } from 'react-router-dom';
import { useOrders } from '../context/OrderContext';

export default function OrderDetails() {
  const { currentOrder, createOrderDraft, updateOrder, confirmOrder } = useOrders();
  const navigate = useNavigate();
  const location = useLocation();
  const [confirmChecked, setConfirmChecked] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const pkgParam = params.get('package');

    // Map known package query params to service/package pairs (extensible for future plans)
    const packageMap: Record<string, { serviceType: string; packageName: string }> = {
      starter499: { serviceType: 'Website', packageName: '₹499 Starter Website' }
      // Add more mappings here as needed e.g. social-starter, branding-basic etc.
    };

    const mapped = pkgParam ? packageMap[pkgParam] : undefined;

    if (!currentOrder || currentOrder.status !== 'pending') {
      if (mapped) {
        createOrderDraft('GUEST', mapped);
      } else {
        createOrderDraft('GUEST');
      }
      return;
    }

    // If a mapped package is requested and differs from current, override it.
    if (mapped && (currentOrder.packageName !== mapped.packageName || currentOrder.serviceType !== mapped.serviceType)) {
      updateOrder({ serviceType: mapped.serviceType, packageName: mapped.packageName });
    }
  }, [currentOrder, createOrderDraft, location.search, updateOrder]);

  // Flush any queued syncs when page mounts
  useEffect(() => {
    flushOrderSyncQueue();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formValid = !!currentOrder?.pocName && !!currentOrder?.phone && !!currentOrder?.email && confirmChecked && !!currentOrder?.communicationMethod;

  const toggleAddOn = (name: string) => {
    if (!currentOrder) return;
    const existing = currentOrder.addOns || [];
    const next = existing.includes(name) ? existing.filter(a => a !== name) : [...existing, name];
    updateOrder({ addOns: next });
  };

  const addOnChecked = (name: string) => !!currentOrder?.addOns?.includes(name);

  // Fire-and-forget sync to Google Apps Script (Option 1)
  const syncOrderToSheet = async (order: any) => {
    // Prefer environment variables (VITE_GSHEET_ENDPOINT & VITE_GSHEET_TOKEN) to avoid hardcoding.
    // Fallbacks below use current deployed Apps Script URL; replace token placeholder if intentionally committing.
  // Use a dev proxy path during local development to avoid CORS/preflight issues.
  // Vite dev server proxies '/api/gsheet' to the real Apps Script endpoint via vite.config.ts.
  const DEV_PROXY_PATH = '/api/gsheet';
  const ENDPOINT = import.meta.env.DEV ? DEV_PROXY_PATH : (import.meta.env.VITE_GSHEET_ENDPOINT as string | undefined);
    const TOKEN = import.meta.env.VITE_GSHEET_TOKEN as string | undefined;
    if (!ENDPOINT || !TOKEN) {
      console.error('[Order Sync] Missing VITE_GSHEET_ENDPOINT or VITE_GSHEET_TOKEN env vars – order not sent.');
      return;
    }
    try {
      // Minimal signature so we can tell which token is baked into the build without exposing full secret.
      const tokenSig = `${TOKEN.slice(0,4)}…${TOKEN.slice(-2)}`;
      if (import.meta.env.DEV) console.log('[Order Sync] using endpoint:', ENDPOINT, 'tokenSig:', tokenSig);

      // Primary: form-encoded POST to avoid CORS preflight from browsers
      let res: Response | null = null;
      try {
        const form = new URLSearchParams();
        form.append('payload', JSON.stringify(order));
        form.append('token', TOKEN || '');
        res = await fetch(ENDPOINT + (ENDPOINT.includes('?') ? '&' : '?') + `token=${encodeURIComponent(TOKEN || '')}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: form.toString(),
          redirect: 'follow'
        });
      } catch (e) {
        // network/CORS error — we'll attempt JSON fallback below in outer flow
        res = null;
      }

      // If form-encoded either failed or returned non-OK, try JSON POST as a fallback
      if (!res || !res.ok) {
        try {
          res = await fetch(`${ENDPOINT}?token=${encodeURIComponent(TOKEN)}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(order),
            redirect: 'follow'
          });
        } catch (e) {
          // will be caught by outer catch and queued
          throw e;
        }
      }

      const text = await res.text();
      let parsed: any = null;
      try { parsed = JSON.parse(text); } catch { /* ignore */ }
      console.log('[Order Sync] status:', res.status, 'raw:', text);

      // Consider success when HTTP 2xx OR explicit ok in response body
      if (!(res.ok || parsed?.ok)) {
        console.warn('[Order Sync] reported failure — queueing for retry', parsed || text);
        // Save to local retry queue so we can flush later from client
        try {
          const key = 'ms_order_sync_queue';
          const existing = JSON.parse(localStorage.getItem(key) || '[]');
          existing.push({ order, ts: Date.now() });
          localStorage.setItem(key, JSON.stringify(existing));
        } catch (e) {
          console.error('[Order Sync] failed storing to queue', e);
        }
      }
    } catch (err) {
      console.error('Sheet sync failed — queued for retry', err);
      try {
        const key = 'ms_order_sync_queue';
        const existing = JSON.parse(localStorage.getItem(key) || '[]');
        existing.push({ order, ts: Date.now(), err: String(err) });
        localStorage.setItem(key, JSON.stringify(existing));
      } catch (e) {
        console.error('[Order Sync] failed storing to queue after exception', e);
      }
    }
  };

  // Flush queued orders (best-effort). Called on mount and after submissions.
  const flushOrderSyncQueue = async () => {
    const key = 'ms_order_sync_queue';
    try {
      const items = JSON.parse(localStorage.getItem(key) || '[]');
      if (!Array.isArray(items) || items.length === 0) return;
      console.log('[Order Sync] flushing queue', items.length);
      // Send sequentially to avoid transient rate issues
      for (const it of items.slice()) {
        try {
          await syncOrderToSheet(it.order);
          // remove item on (best-effort) success — we'll clear whole queue after attempt
        } catch (e) {
          console.warn('[Order Sync] retry failed for item', e);
        }
      }
      // Clear queue after attempt (we intentionally keep it simple)
      localStorage.removeItem(key);
    } catch (e) {
      console.error('[Order Sync] flush failed', e);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 py-16 px-6">
      <Helmet>
        <title>Order Details | Microsite Studio</title>
        <meta name="robots" content="noindex,nofollow" />
        <meta name="description" content="Internal order details form page. Not for search indexing." />
  <link rel="canonical" href="https://micro-site.studio/order/details" />
      </Helmet>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-2">Complete Your Order</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-8">No upfront payment required. We will confirm via WhatsApp after submission.</p>
        <div className="bg-gray-50/70 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-xl p-8 space-y-10">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Service Type *</label>
              <input disabled value={currentOrder?.serviceType || 'Website'} className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 text-gray-900 dark:text-gray-100 text-sm font-medium" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Selected Package *</label>
              <input disabled value={currentOrder?.packageName || '₹499 Starter Website'} className="w-full px-4 py-3 rounded-lg border-2 border-[#FF2B2B] bg-neutral-100 dark:bg-neutral-800 text-gray-900 dark:text-gray-100 text-sm font-semibold shadow-sm" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Business Name *</label>
              <input value={currentOrder?.businessName || ''} onChange={e => updateOrder({ businessName: e.target.value })} className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:border-[#FF2B2B] placeholder:text-gray-400 dark:placeholder:text-neutral-500" placeholder="Registered / Trading name" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Industry / Category</label>
              <input value={currentOrder?.industry || ''} onChange={e => updateOrder({ industry: e.target.value })} className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:border-[#FF2B2B] placeholder:text-gray-400 dark:placeholder:text-neutral-500" placeholder="eg. Restaurant, Real Estate" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Point of Contact Name *</label>
              <input value={currentOrder?.pocName || ''} onChange={e => updateOrder({ pocName: e.target.value })} className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:border-[#FF2B2B] placeholder:text-gray-400 dark:placeholder:text-neutral-500" placeholder="Person we should talk to" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Mobile Number *</label>
              <input value={currentOrder?.phone || ''} onChange={e => updateOrder({ phone: e.target.value })} className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:border-[#FF2B2B] placeholder:text-gray-400 dark:placeholder:text-neutral-500" placeholder="WhatsApp preferred" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Email *</label>
              <input value={currentOrder?.email || ''} onChange={e => updateOrder({ email: e.target.value })} className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:border-[#FF2B2B] placeholder:text-gray-400 dark:placeholder:text-neutral-500" placeholder="you@business.com" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Domain Preference (optional)</label>
              <input value={currentOrder?.domainPreference || ''} onChange={e => updateOrder({ domainPreference: e.target.value })} className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:border-[#FF2B2B] placeholder:text-gray-400 dark:placeholder:text-neutral-500" placeholder="eg. mybrand.in" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Preferred Communication *</label>
              <select value={currentOrder?.communicationMethod || ''} onChange={e => updateOrder({ communicationMethod: e.target.value as any })} className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:border-[#FF2B2B]">
                <option value="" disabled>Select method</option>
                <option value="WhatsApp">WhatsApp</option>
                <option value="Email">Email</option>
                <option value="Call">Call</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Additional Notes (optional)</label>
              <textarea rows={4} value={currentOrder?.notes || ''} onChange={e => updateOrder({ notes: e.target.value })} className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:border-[#FF2B2B] placeholder:text-gray-400 dark:placeholder:text-neutral-500" placeholder="Anything specific we should know?"></textarea>
            </div>
          </div>

          {/* Optional Add-Ons */}
          <div className="pt-2 border-t border-dashed border-neutral-300 dark:border-neutral-700">
            <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4 tracking-wide">Optional Add-Ons</h2>
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              {['Branding & Identity Kit','Social Media Management','SEO Optimisation','Additional Web Pages','Logo Redesign','Business Email Setup','Marketing Templates'].map(item => (
                <label key={item} className="flex items-start gap-2 cursor-pointer group">
                  <input type="checkbox" checked={addOnChecked(item)} onChange={() => toggleAddOn(item)} className="mt-1 w-4 h-4 accent-[#FF2B2B]" />
                  <span className="text-gray-700 dark:text-gray-300 group-hover:text-white transition-colors">{item}</span>
                </label>
              ))}
              <div className="sm:col-span-2 flex flex-col gap-2">
                <label className="flex items-start gap-2 cursor-pointer">
                  <input type="checkbox" checked={addOnChecked('Others')} onChange={() => toggleAddOn('Others')} className="mt-1 w-4 h-4 accent-[#FF2B2B]" />
                  <span className="text-gray-700 dark:text-gray-300">Others</span>
                </label>
                {addOnChecked('Others') && (
                  <input value={currentOrder?.otherAddOn || ''} onChange={e => updateOrder({ otherAddOn: e.target.value })} placeholder="Describe other requirement" className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:border-[#FF2B2B] placeholder:text-gray-400 dark:placeholder:text-neutral-600" />
                )}
              </div>
            </div>
          </div>

          {/* Terms */}
          <div className="mt-2 flex items-start gap-3">
            <input required type="checkbox" checked={confirmChecked} onChange={e => setConfirmChecked(e.target.checked)} className="mt-1 w-4 h-4 accent-[#FF2B2B]" />
            <div>
              <p className="text-xs text-gray-700 dark:text-gray-300 font-medium">I confirm the above details are accurate and accept pay-after-delivery terms.</p>
              <p className="text-[10px] mt-1 text-gray-500 dark:text-gray-500">(Payment is due only after final delivery and approval.)</p>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              disabled={!formValid}
              onClick={async () => {
                const order = confirmOrder();
                if (order) {
                  // Fire and allow navigation, but log backend result for debugging
                  syncOrderToSheet(order);
                  navigate('/order/success', { state: { order } });
                }
              }}
              className="px-8 py-4 rounded-lg text-sm font-semibold shadow bg-[#FF2B2B] text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-red-600 transition-colors"
            >
              Confirm My Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
