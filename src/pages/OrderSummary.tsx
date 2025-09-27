import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOrders } from '../context/OrderContext';
import { Monitor, LayoutGrid, Smartphone, Mail, RefreshCcw, Clock, CreditCard, ShieldCheck, Info } from 'lucide-react';

export default function OrderSummary() {
  const { createOrderDraft, currentOrder, updateOrder } = useOrders();
  const navigate = useNavigate();

  useEffect(() => {
    // This page always represents the 499 Website starter package.
    if (!currentOrder) {
      createOrderDraft('GUEST', { serviceType: 'Website', packageName: '₹499 Starter Website' });
    } else if (currentOrder.serviceType !== 'Website' || currentOrder.packageName !== '₹499 Starter Website') {
      // Override any previous different draft (e.g., branding/basic) to reflect this page's canonical package.
      updateOrder({ serviceType: 'Website', packageName: '₹499 Starter Website' });
    }
  }, [currentOrder, createOrderDraft, updateOrder]);

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 py-24 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Title + Badge + Caption */}
        <div className="text-center mb-16">
          <div className="flex items-start justify-center gap-2 flex-wrap">
            <h1 className="relative inline-block text-[2.55rem] leading-[1.1] font-extrabold tracking-tight text-white/95">
              ₹499 Starter Website Package
              <span className="absolute left-1/2 -bottom-3 h-[2px] w-32 -translate-x-1/2 rounded bg-gradient-to-r from-transparent via-[#FF2B2B] to-transparent opacity-70" />
            </h1>
            <span className="relative -mt-1 text-[8px] tracking-wide font-semibold px-2 py-[3px] rounded border border-[#FF2B2B]/45 text-[#FF2B2B] bg-transparent backdrop-blur-sm">
              MOST POPULAR
            </span>
          </div>
          <p className="mt-6 text-[11px] font-normal text-white/65 leading-snug">No advance payment — quick 2–3 day delivery</p>
          <p className="mt-3 text-[13px] text-neutral-400 max-w-xl mx-auto leading-relaxed">Perfect for startups, freelancers, and small businesses who want an online presence without heavy costs.</p>
        </div>

        {/* Feature Data Rendered */}
        {(() => {
          const left = [
            { icon: <Monitor className="w-5 h-5" />, label: '1-page professional website' },
            { icon: <LayoutGrid className="w-5 h-5" />, label: '4–5 predefined sections (About, Services, Gallery, Contact)' },
            { icon: <Smartphone className="w-5 h-5" />, label: 'Mobile responsive' },
            { icon: <RefreshCcw className="w-5 h-5" />, label: '1 revision' }
          ];
          const right = [
            { icon: <Mail className="w-5 h-5" />, label: 'Contact form linked to email' },
            { icon: <Clock className="w-5 h-5" />, label: 'Delivery: 2–3 days' },
            { icon: <CreditCard className="w-5 h-5" />, label: 'Pay after delivery (no upfront payment)' },
            { icon: <ShieldCheck className="w-5 h-5" />, label: '2-year free maintenance included' }
          ];
          return (
            <div className="group relative mb-16">
              <div className="absolute -inset-px rounded-[14px] bg-gradient-to-br from-[#FF2B2B]/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-sm pointer-events-none" />
              <div className="relative rounded-[12px] border border-[#2a2a2a] bg-neutral-900/85 backdrop-blur-sm px-14 py-10 shadow-[0_4px_20px_rgba(0,0,0,0.25)] group-hover:shadow-[0_4px_26px_rgba(0,0,0,0.35),0_0_0_1px_rgba(255,43,43,0.25)] transition-shadow duration-500">
                <div className="hidden md:block absolute top-8 bottom-8 left-1/2 -translate-x-1/2 w-px divider-fade" />
                <div className="grid md:grid-cols-2 gap-x-16 gap-y-4 text-[16px] leading-[1.5] text-[#e8e8e8]">
                  <ul className="space-y-8">
                    {left.map((f, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <span className="flex-shrink-0 text-[#FF2B2B] inline-flex items-center justify-center">{f.icon}</span>
                        <span className="pr-1 font-semibold tracking-tight">{f.label}</span>
                      </li>
                    ))}
                  </ul>
                  <ul className="space-y-8">
                    {right.map((f, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <span className="flex-shrink-0 text-[#FF2B2B] inline-flex items-center justify-center">{f.icon}</span>
                        <span className="pr-1 font-semibold tracking-tight flex items-center gap-2">
                          {f.label}
                          {f.label.includes('maintenance') && (
                            <span className="relative group/info inline-flex">
                              <Info className="w-4 h-4 text-[#FF2B2B] opacity-80 hover:opacity-100 transition-opacity cursor-pointer" aria-describedby="maintenance-tip" />
                              <span id="maintenance-tip" role="tooltip" className="pointer-events-none select-none absolute left-1/2 top-full z-10 mt-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-neutral-800 px-3 py-2 text-[11px] font-medium text-neutral-200 shadow-lg opacity-0 group-hover/info:opacity-100 transition-opacity duration-300 border border-neutral-700/70">
                                Includes minor content edits, bug fixes & uptime checks.
                              </span>
                            </span>
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })()}

        {/* CTA */}
        <div className="text-center">
          <button
            onClick={() => navigate('/order/details?package=starter499')}
            className="inline-flex items-center justify-center bg-[#FF2B2B] text-white px-9 py-3.5 rounded-lg font-semibold text-sm tracking-tight hover:brightness-110 hover:scale-[1.015] active:scale-[0.98] transition-all shadow-lg shadow-[#FF2B2B]/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF2B2B] focus:ring-offset-neutral-950 will-change-transform"
          >
            Get Started (No Payment Yet)
          </button>
          <div className="mt-2.5 text-[10px] text-white/65 font-normal tracking-wide">No upfront payment required</div>
        </div>
      </div>
    </div>
  );
}
