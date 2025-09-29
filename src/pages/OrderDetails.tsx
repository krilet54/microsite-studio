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
    const ENDPOINT = import.meta.env.VITE_GSHEET_ENDPOINT || 'https://script.google.com/macros/s/AKfycbyQIYDEeaB9zN_Y9JRWLfDu_UuaDb-0vX2ectRFlLLdg-gE7WtPxitaaSnFUdF0Tjoasg/exec';
    const TOKEN = import.meta.env.VITE_GSHEET_TOKEN || 'ms_ord_r4D7XK9mQ2pF18LT0vZc';
    try {
      // Minimal signature so we can tell which token is baked into the build without exposing full secret.
      const tokenSig = TOKEN ? `${TOKEN.slice(0,4)}…${TOKEN.slice(-2)}` : 'none';
      console.log('[Order Sync] using endpoint:', ENDPOINT, 'tokenSig:', tokenSig);
      const res = await fetch(`${ENDPOINT}?token=${encodeURIComponent(TOKEN)}`, {
        method: 'POST',
        body: JSON.stringify(order)
      });
      const text = await res.text();
      // Attempt to parse JSON, but tolerate plain text for diagnostics
      let parsed: any = null;
      try { parsed = JSON.parse(text); } catch { /* ignore */ }
      console.log('[Order Sync] status:', res.status, 'raw:', text);
      if (!res.ok || !parsed?.ok) {
        console.warn('Order sync reported failure', parsed || text);
      }
    } catch (err) {
      console.error('Sheet sync failed', err);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 py-16 px-6">
      <Helmet>
        <title>Order Details | Microsite Studio</title>
        <meta name="robots" content="noindex,nofollow" />
        <meta name="description" content="Internal order details form page. Not for search indexing." />
        <link rel="canonical" href="https://www.micrositestudio.in/order/details" />
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
