import { useNavigate } from 'react-router-dom';
import { useOrders } from '../context/OrderContext';
import { Globe, LayoutGrid, ShoppingCart, Briefcase, ShieldCheck, Clock, MessagesSquare, CheckCircle2, Layers, CreditCard, Info } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import WhyInfoBox from '../components/WhyInfoBox';
import useRevealOnScroll from '../hooks/useRevealOnScroll';

interface WebPackage {
  key: string;
  title: string;
  subtitle: string;
  price: string;
  highlight?: boolean;
  features: string[];
  cta: string;
  mode?: string;
}

const websitePackages: WebPackage[] = [
  {
    key: 'starter-499',
    title: '₹499 Starter Website',
    subtitle: 'Single-page launch presence',
    price: '₹499',
    highlight: true,
    features: [
      '1-page professional website',
      '4–5 sections',
      'Mobile responsive',
      '1 revision',
      'Contact form',
      'Pay after delivery (no upfront payment)',
      '2-year free maintenance included'
    ],
    cta: 'Get Started (No Payment Yet)',
    mode: 'direct-starter'
  },
  {
    key: 'business',
    title: 'Business Website',
    subtitle: 'Everything in Starter + multi-page credibility',
    price: 'From ₹3,000',
    features: [
      'Up to 5 pages',
      'Custom layout',
      'SEO basics',
      'Domain guidance',
      '3-year free maintenance'
    ],
    cta: 'Book Now'
  },
  {
    key: 'ecommerce',
    title: 'E-commerce Website',
    subtitle: 'Everything in Starter + online selling capability',
    price: 'From ₹8,000',
    features: [
      'Product & catalog pages',
      'Payment integration',
      'Inventory ready',
      'Scalable',
      '3-year free maintenance'
    ],
    cta: 'Book Now'
  },
  {
    key: 'custom',
    title: 'Custom / Portfolio Website',
    subtitle: 'Tailored experience',
    price: 'Custom Quote',
    features: [
      'Unique layout',
      'Optimized UX',
      'Scalable stack',
      'Consultation first',
      'Free maintenance for 2 years'
    ],
    cta: 'Book Now'
  }
];

export default function WebsitePackages() {
  const navigate = useNavigate();
  const { createOrderDraft } = useOrders();
  useRevealOnScroll();

  const handleSelect = (pkg: any) => {
    if (pkg.mode === 'direct-starter') {
      // Go to existing summary (already funnels into starter flow)
      navigate('/order/summary');
      return;
    }
    // Create or overwrite draft with service + package metadata, then go to universal form
    createOrderDraft('GUEST', { serviceType: 'Website', packageName: pkg.title });
    navigate('/order/details');
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Website Development',
    provider: { '@type': 'Organization', name: 'Microsite Studio' },
    areaServed: 'IN',
    offers: websitePackages.map(p => ({ '@type': 'Offer', name: p.title, price: p.price.replace(/[^0-9]/g,'') || undefined, priceCurrency: 'INR' }))
  };

  return (
  <div className="min-h-screen bg-white dark:bg-neutral-950 pt-20 pb-24 px-6">
      <Helmet>
        <title>Website Packages | Microsite Studio</title>
        <meta name="description" content="Choose from ₹499 starter, business, e-commerce and custom website packages. Pay after delivery on eligible plans." />
        <link rel="canonical" href="https://www.micro-site.studio/services/websites" />
        <meta property="og:title" content="Website Packages | Microsite Studio" />
        <meta property="og:description" content="Affordable website development: starter, business, e-commerce & custom builds." />
        <meta property="og:url" content="https://www.micro-site.studio/services/websites" />
  <meta property="og:image" content="/og/website-packages.jpg" />
  <meta property="og:image:alt" content="Website packages preview card" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:image" content="/og/website-packages.jpg" />
  <meta name="twitter:image:alt" content="Website packages preview card" />
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
      </Helmet>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-[2.9rem] md:text-[3.2rem] leading-[1.05] font-extrabold tracking-tight text-gray-900 dark:text-white mb-5 relative inline-block">
            Website Packages
            <span className="absolute left-1/2 -bottom-3 h-[3px] w-40 -translate-x-1/2 rounded-full bg-gradient-to-r from-transparent via-[#FF2B2B] to-transparent" />
          </h1>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 font-medium tracking-tight">Choose the perfect website plan for your brand.</p>
        </div>

        {/* Why Box */}
        <WhyInfoBox
          title="Why a Professional Website?"
          description={<>
            Your website is often the first serious interaction a prospect has with your brand. A fast, structured, mobile‑ready experience builds credibility, improves conversion and becomes a foundation you can scale (SEO, content, products) without redoing core structure.
          </>}
        />
        {/* Cards */}
        <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-4 mb-20">
          {websitePackages.map(pkg => (
            <div
              key={pkg.key}
              className={`relative group rounded-2xl border ${pkg.highlight ? 'border-[#FF2B2B]' : 'border-neutral-200 dark:border-neutral-800'} bg-gray-50 dark:bg-neutral-900 p-7 flex flex-col shadow-sm hover:shadow-xl transition-all duration-400 hover:-translate-y-1 ${pkg.highlight ? 'ring-1 ring-[#FF2B2B]/40 scale-[1.02]' : ''}`}
            >
              {pkg.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#FF2B2B] text-white text-[11px] font-semibold px-3 py-1 rounded-full shadow">Most Popular</span>
              )}
              <div className="w-16 h-16 rounded-xl bg-[#FF2B2B]/10 text-[#FF2B2B] flex items-center justify-center mb-6">
                {pkg.key === 'starter-499' && <Globe className="w-8 h-8" />}
                {pkg.key === 'business' && <LayoutGrid className="w-8 h-8" />}
                {pkg.key === 'ecommerce' && <ShoppingCart className="w-8 h-8" />}
                {pkg.key === 'custom' && <Briefcase className="w-8 h-8" />}
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white leading-tight mb-1">{pkg.title}</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {pkg.subtitle.includes('Everything in Starter +') ? (
                  <>
                    <span className="text-[#FF2B2B] font-semibold">Everything in Starter +</span>{' '}
                    {pkg.subtitle.split('Everything in Starter +')[1]}
                  </>
                ) : pkg.subtitle}
              </p>
              <div className="text-xl font-extrabold text-[#FF2B2B] mb-5">{pkg.price}</div>
              <ul className="text-[13px] text-gray-700 dark:text-gray-300 space-y-2.5 mb-6 leading-relaxed">
                {pkg.features.map(f => (
                  <li key={f} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#FF2B2B] mt-0.5 flex-shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handleSelect(pkg)}
                className={`mt-auto w-full text-sm font-semibold rounded-lg px-4 py-3 transition-all tracking-tight will-change-transform ${pkg.mode === 'direct-starter' ? 'bg-[#FF2B2B] text-white hover:bg-red-600 shadow hover:shadow-red-500/20 hover:scale-[1.015] active:scale-[0.985]' : 'border border-[#FF2B2B] text-[#FF2B2B] hover:bg-[#FF2B2B] hover:text-white hover:scale-[1.015] active:scale-[0.985]'}`}
              >
                {pkg.cta}
              </button>
              {pkg.mode !== 'direct-starter' && (
                <button
                  onClick={() => window.open('https://wa.me/919060868026', '_blank')}
                  className="mt-3 w-full text-[11px] font-medium text-gray-500 hover:text-[#FF2B2B] transition-colors"
                >
                  Enquire via WhatsApp
                </button>
              )}
              {pkg.highlight && <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-[#FF2B2B]/40" />}
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="mb-24">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">Compare Plans</h3>
          <div className="overflow-x-auto rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm">
            <table className="w-full text-sm text-left min-w-[820px]">
              <thead className="bg-neutral-100/70 dark:bg-neutral-800/60 text-gray-700 dark:text-gray-300">
                <tr>
                  <th className="px-5 py-4 font-semibold">Feature</th>
                  <th className="px-5 py-4 font-semibold">Starter</th>
                  <th className="px-5 py-4 font-semibold">Business</th>
                  <th className="px-5 py-4 font-semibold">E-commerce</th>
                  <th className="px-5 py-4 font-semibold">Custom / Portfolio</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800 text-gray-700 dark:text-gray-300">
                {/* Static Rows except special handling for Maintenance */}
                {[
                  ['Pages', '1 Page', 'Up to 5', 'Multi + Product', 'Custom'],
                  ['Design Type', 'Template + Light Custom', 'Custom Layout', 'Custom + Product UI', 'Fully Tailored'],
                  ['Mobile Responsive', 'Yes', 'Yes', 'Yes', 'Yes'],
                  ['Maintenance', '2 Years Free', '3 Years Free', '3 Years Free', '2 Years Free'],
                  ['Revisions', '1', '2', '2', 'Scoped'],
                  ['Delivery Time', '2–3 Days', '4–6 Days', '5–7 Days', 'Scoped'],
                  ['Payment Terms', 'After Delivery', 'Milestone / After', 'Milestone / After', 'Scoped'],
                ].map(row => {
                  const isMaintenance = row[0] === 'Maintenance';
                  return (
                    <tr key={row[0]} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/40 transition-colors">
                      {row.map((cell, i) => {
                        if (i === 0) {
                          return (
                            <td key={i} className="px-5 py-4 font-semibold text-gray-900 dark:text-gray-200 w-52">
                              <span className="inline-flex items-center gap-2">
                                {cell}
                                {isMaintenance && (
                                  <span className="relative group">
                                    <Info className="w-4 h-4 text-[#FF2B2B] opacity-80 group-hover:opacity-100 transition-opacity cursor-pointer" aria-describedby="maint-tip" />
                                    <span id="maint-tip" role="tooltip" className="pointer-events-none select-none absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-neutral-800 px-3 py-2 text-[11px] font-medium text-neutral-200 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-neutral-700/70">
                                      Covers minor content edits, bug fixes & uptime monitoring.
                                    </span>
                                  </span>
                                )}
                              </span>
                            </td>
                          );
                        }
                        const highlight = isMaintenance && (i === 2 || i === 3); // Business & E-commerce
                        return (
                          <td
                            key={i}
                            className={`px-5 py-4 ${highlight ? 'font-semibold text-[#FF2B2B]' : ''}`}
                          >
                            {highlight ? (
                              <span className="inline-block px-2 py-1 rounded-md bg-[#FF2B2B]/10 border border-[#FF2B2B]/30 text-[#FF2B2B] text-xs font-semibold tracking-tight">
                                {cell}
                              </span>
                            ) : cell}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Trust / Value Points */}
        <div className="mb-24">
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { icon: <CreditCard className="w-5 h-5" />, label: 'Pay After Delivery' },
              { icon: <ShieldCheck className="w-5 h-5" />, label: 'Free 2-Year Maintenance' },
              { icon: <Clock className="w-5 h-5" />, label: 'Fast Delivery (2–7 Days)' },
              { icon: <MessagesSquare className="w-5 h-5" />, label: 'WhatsApp & Email Support' },
              { icon: <Layers className="w-5 h-5" />, label: 'No Hidden Charges' }
            ].map(item => (
              <div key={item.label} className="flex items-center gap-3 bg-neutral-100 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 rounded-xl px-5 py-4 text-sm text-gray-700 dark:text-gray-300 shadow-sm">
                <span className="text-[#FF2B2B]">{item.icon}</span>
                <span className="font-medium tracking-tight">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Unified Footer CTA */}
        <div className="mt-24 mb-12">
          <div className="relative w-full rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-900/60 backdrop-blur-[2px] p-10 md:p-14 overflow-hidden">
            <div className="absolute inset-0 pointer-events-none opacity-60 bg-[radial-gradient(circle_at_85%_25%,rgba(255,43,43,0.18),transparent_60%)]" />
            <div className="absolute -left-1 top-0 bottom-0 w-1.5 rounded-r-xl bg-gradient-to-b from-[#FF2B2B] via-[#ff4d4d] to-[#FF2B2B]" />
            <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-10">
              <div className="max-w-2xl">
                <h3 className="text-2xl md:text-[1.75rem] font-extrabold tracking-tight text-gray-900 dark:text-white mb-4">Need Guidance Choosing a Website Plan?</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm md:text-[15px] leading-relaxed">Not sure whether to start small or go multi-page/e-commerce? We’ll assess your goals, content readiness and scaling path—then recommend the best route. Quick, honest and no pushy selling.</p>
              </div>
              <div className="flex md:justify-end">
                <button
                  onClick={() => window.open('https://wa.me/919060868026', '_blank')}
                  className="inline-flex items-center justify-center bg-[#FF2B2B] text-white px-10 py-4 rounded-xl font-bold text-sm md:text-base tracking-tight shadow-sm hover:brightness-110 hover:shadow-lg hover:shadow-[#FF2B2B]/40 transition-all hover:scale-[1.02] active:scale-[0.95] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#FF2B2B]"
                >
                  Talk to Us
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
