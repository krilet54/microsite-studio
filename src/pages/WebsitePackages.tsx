import { useNavigate } from 'react-router-dom';
import { useOrders } from '../context/OrderContext';
import { Globe, LayoutGrid, ShoppingCart, Briefcase, ShieldCheck, Clock, MessagesSquare, CheckCircle2, Layers, CreditCard, Info, ChevronRight, Zap, Award, TrendingUp } from 'lucide-react';
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
  key: 'starter-1500',
  title: 'Starter Website',
  subtitle: 'Fast, secure launch-ready websites',
  price: '₹1,500 onwards',
    highlight: false,
    features: [
      'Professional static website build',
      'Core sections aligned to your business goals',
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
    highlight: true,
    subtitle: 'Database-backed websites with custom workflows',
    price: 'starts from ₹3,000',
    features: [
      'Dynamic page architecture',
      'Custom layout and business logic',
      'SEO-ready foundational setup',
      'Admin-oriented content flexibility',
      '3-year free maintenance'
    ],
    cta: 'Book Now'
  },
  {
    key: 'ecommerce',
    title: 'E-Commerce Platform',
    subtitle: 'Scalable storefront systems for online selling',
    price: 'starts from ₹15,000',
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
    title: 'Portal Systems',
    subtitle: 'Built based on client requirements and needs',
    price: 'Custom quote',
    features: [
      'Custom portal architecture',
      'Role-based and workflow-driven modules',
      'Scalable deployment planning',
      'Consultation-led execution',
      'Free maintenance for 2 years'
    ],
    cta: 'Book Now'
  }
];

const alliedWebServices = [
  {
    title: 'AI Chatbot Integration',
    points: [
      'Rule-based automated chat systems',
      'LLM-powered intelligent conversational assistants',
    ],
  },
  {
    title: 'Infrastructure & Deployment',
    points: [
      'Domain registration & configuration',
      'Web hosting & cloud deployment',
      'VPS setup & server management',
      'SSL certification & security hardening',
      'Website performance optimization',
    ],
  },
  {
    title: 'Search Engine Foundations',
    points: [
      'Technical SEO setup',
      'On-page SEO optimization',
      'Structured data implementation',
      'Speed & performance optimization',
    ],
  },
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

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://micro-site.studio' },
      { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://micro-site.studio/services' },
      { '@type': 'ListItem', position: 3, name: 'Website Packages', item: 'https://micro-site.studio/services/websites' },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What\'s the difference between static and dynamic websites?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Static websites are fast, secure, and ideal for businesses with stable content. Dynamic websites let you update content easily through an admin panel and support advanced features like user accounts and workflows.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do I get free maintenance?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! All packages include 2-3 years of free maintenance covering minor content edits, bug fixes, performance optimization, and uptime monitoring.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I upgrade my website later?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Absolutely. Start with a Starter website and upgrade to Dynamic or E-commerce later as your business grows. We\'ll migrate your content at no additional cost.',
        },
      },
    ],
  };

  return (
  <div className="min-h-screen bg-white dark:bg-neutral-950 pb-24 px-6">
      <Helmet>
        <title>Website Packages | Microsite Studio</title>
        <meta name="description" content="Choose from ₹1,500 onwards starter, business, e-commerce and custom website packages. Pay after delivery on eligible plans." />
  <link rel="canonical" href="https://micro-site.studio/services/websites" />
        <meta property="og:title" content="Website Packages | Microsite Studio" />
        <meta property="og:description" content="Affordable website development: starter, business, e-commerce & custom builds." />
  <meta property="og:url" content="https://micro-site.studio/services/websites" />
      <meta property="og:image" content="https://micro-site.studio/og/website-packages.jpg" />
  <meta property="og:image:alt" content="Website packages preview card" />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Microsite Studio" />
  <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Website Packages | Microsite Studio" />
      <meta name="twitter:description" content="Compare starter, business, e-commerce and custom website packages with pay-after-delivery options." />
      <meta name="twitter:image" content="https://micro-site.studio/og/website-packages.jpg" />
  <meta name="twitter:image:alt" content="Website packages preview card" />
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      {/* Breadcrumb Navigation */}
      <nav aria-label="breadcrumb" className="bg-white dark:bg-neutral-950 border-b border-gray-200 dark:border-neutral-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-3 text-sm">
          <ol className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
            <li>
              <a href="/" className="hover:text-[#FF2B2B] transition-colors">Home</a>
            </li>
            <li className="flex items-center gap-1">
              <ChevronRight className="w-4 h-4" />
              <a href="/services" className="hover:text-[#FF2B2B] transition-colors">Services</a>
            </li>
            <li className="flex items-center gap-1">
              <ChevronRight className="w-4 h-4" />
              <span className="text-gray-900 dark:text-gray-200">Website Packages</span>
            </li>
          </ol>
        </div>
      </nav>

      {/* Premium Hero Section */}
      <section className="relative pt-20 pb-16 bg-gradient-to-br from-white via-white to-gray-50 dark:from-neutral-950 dark:via-neutral-950 dark:to-neutral-900 transition-colors border-b border-gray-200 dark:border-neutral-800 overflow-hidden">
        {/* Premium gradient accents */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-gradient-to-br from-[#FF2B2B]/8 to-transparent blur-[100px]" />
          <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-gradient-to-tr from-[#FF2B2B]/5 to-transparent blur-[100px]" />
        </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-gradient-to-r from-[#FF2B2B]/10 to-[#FF2B2B]/5 border border-[#FF2B2B]/20">
              <Award className="w-4 h-4 text-[#FF2B2B]" />
              <span className="text-xs font-semibold text-[#FF2B2B] tracking-wide">WEB ENGINEERING & DIGITAL INFRASTRUCTURE</span>
            </div>

          <h1 className="text-[2.9rem] md:text-[3.2rem] leading-[1.05] font-extrabold tracking-tight text-gray-900 dark:text-white mb-5">
            Websites engineered for outcomes, not aesthetics.
            <span className="absolute left-1/2 -bottom-3 h-[3px] w-40 -translate-x-1/2 rounded-full bg-gradient-to-r from-transparent via-[#FF2B2B] to-transparent" /></h1>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 font-medium tracking-tight">
            Every site we build is scoped to a specific business goal — lead generation, credibility, e-commerce, or scale. We deliver in days, not weeks. And you pay only after approval.
          </p>

          {/* Trust Badges */}
          <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm font-medium">
            <div className="flex items-center gap-2 bg-green-50 dark:bg-green-950/30 rounded-lg px-3 py-2 border border-green-200 dark:border-green-900/40 text-green-700 dark:text-green-300">
              <CheckCircle2 className="w-4 h-4" />
              Pay After Delivery
            </div>
            <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-950/30 rounded-lg px-3 py-2 border border-blue-200 dark:border-blue-900/40 text-blue-700 dark:text-blue-300">
              <Zap className="w-4 h-4" />
              2-7 Days Delivery
            </div>
            <div className="flex items-center gap-2 bg-purple-50 dark:bg-purple-950/30 rounded-lg px-3 py-2 border border-purple-200 dark:border-purple-900/40 text-purple-700 dark:text-purple-300">
              <TrendingUp className="w-4 h-4" />
              Free 2yr Maintenance
            </div>
          </div>
        </div>
      </div>
      </section>

      <div className="max-w-7xl mx-auto px-6">
        <WhyInfoBox
          title="Why a Professional Website?"
          description={<>
            In high-consideration markets, buyers research before they reach out. Your website is the first filter — and often the deciding one. A well-engineered site does three things: it builds instant credibility, it captures the inquiry, and it scales with your business without requiring a rebuild every 18 months.
          </>}
        />

        {/* Cards Section */}
        <div className="mb-6 text-center">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">Packages</h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Static websites, dynamic websites, e-commerce websites, and portal systems.</p>
        </div>
        <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-4 mb-20">
          {websitePackages.map(pkg => (
            <div
              key={pkg.key}
              className={`relative group rounded-2xl border ${pkg.highlight ? 'border-[#FF2B2B]' : 'border-neutral-200 dark:border-neutral-800'} bg-gradient-to-br from-white to-gray-50 dark:from-neutral-900 dark:to-neutral-950 p-7 flex flex-col shadow-lg shadow-black/5 hover:shadow-xl hover:shadow-[#FF2B2B]/10 transition-all duration-300 hover:-translate-y-1 ${pkg.highlight ? 'ring-1 ring-[#FF2B2B]/40 scale-[1.02]' : ''}`}
            >
              {pkg.highlight && (
                <span className="absolute -top-4 -right-4 bg-gradient-to-r from-[#FF2B2B] to-[#FF5555] text-white text-[11px] font-bold px-4 py-1.5 rounded-full shadow-lg shadow-[#FF2B2B]/30">Most Popular</span>
              )}
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${pkg.highlight ? 'bg-gradient-to-br from-[#FF2B2B]/25 to-[#FF2B2B]/10' : 'bg-gradient-to-br from-[#FF2B2B]/15 to-[#FF2B2B]/5'} text-[#FF2B2B]`}>
                {pkg.key === 'starter-1500' && <Globe className="w-8 h-8" />}
                {pkg.key === 'business' && <LayoutGrid className="w-8 h-8" />}
                {pkg.key === 'ecommerce' && <ShoppingCart className="w-8 h-8" />}
                {pkg.key === 'custom' && <Briefcase className="w-8 h-8" />}
              </div>
              <h2 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white leading-tight mb-2">{pkg.title}</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-5 leading-relaxed min-h-[2.5rem]">
                {pkg.subtitle.includes('Everything in Starter +') ? (
                  <>
                    <span className="text-[#FF2B2B] font-semibold">Everything in Starter +</span>{' '}
                    {pkg.subtitle.split('Everything in Starter +')[1]}
                  </>
                ) : pkg.subtitle}
              </p>
              <div className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                <span className="font-extrabold text-[#FF2B2B]">{pkg.price}</span>
              </div>
              <ul className="text-[13px] text-gray-700 dark:text-gray-300 space-y-2.5 mb-7 leading-relaxed">
                {pkg.features.map(f => (
                  <li key={f} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#FF2B2B] mt-0.5 flex-shrink-0" />
                    <span>{f}</span>
                  {[
                    { icon: CreditCard, label: 'Pay after delivery' },
                    { icon: ShieldCheck, label: '2-year free maintenance' },
                    { icon: Clock, label: '7-day delivery' },
                    { icon: MessagesSquare, label: 'WhatsApp support' },
                    { icon: Layers, label: 'No hidden charges' }
                  ].map(item => (
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

        <div className="mb-20 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-gradient-to-br from-white to-gray-50 dark:from-neutral-900 dark:to-neutral-950 p-8 shadow-lg shadow-black/5">
          <div className="mb-8 text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#FF2B2B]/10 to-[#FF2B2B]/5 border border-[#FF2B2B]/20">
              <span className="text-[10px] uppercase tracking-[0.16em] font-bold text-[#FF2B2B]">Allied Services</span>
            </div>
            <h3 className="text-2xl md:text-[2rem] font-extrabold tracking-tight text-gray-900 dark:text-white mb-3">Integrated Support Around Your Core Build</h3>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
              Beyond the website, we strengthen automation, deployment, and search foundations so your digital system performs end-to-end.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {alliedWebServices.map((group) => (
              <div
                key={group.title}
                className="rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900/50 p-6 hover:shadow-lg transition-shadow"
              >
                <p className="text-[10px] uppercase tracking-[0.16em] font-bold text-[#FF2B2B] mb-4">{group.title}</p>
                <ul className="space-y-3 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                  {group.points.map((point) => (
                    <li key={point} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#FF2B2B] mt-1.5 flex-shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Comparison Table with Premium Styling */}
        <div className="mb-24">
          <div className="mb-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Compare Plans</h3>
            <p className="text-gray-600 dark:text-gray-400">See what's included in each package at a glance</p>
          </div>
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900/70 shadow-lg shadow-black/5 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left min-w-[820px]">
                <thead className="bg-gradient-to-r from-gray-100 to-gray-50 dark:from-neutral-800 dark:to-neutral-700/60 text-gray-800 dark:text-gray-200 border-b border-neutral-200 dark:border-neutral-700">
                  <tr>
                    <th className="px-6 py-4 font-bold">Feature</th>
                    <th className="px-6 py-4 font-bold">Starter</th>
                    <th className="px-6 py-4 font-bold">Business</th>
                    <th className="px-6 py-4 font-bold">E-commerce</th>
                    <th className="px-6 py-4 font-bold">Custom / Portal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700 text-gray-700 dark:text-gray-300">
                  {[
                    ['Pages', '1 Page', 'Up to 5', 'Multi + Product', 'Custom'],
                    ['Design Type', 'Template + Light Custom', 'Custom Layout', 'Custom + Product UI', 'Fully Tailored'],
                    ['Mobile Responsive', 'Yes', 'Yes', 'Yes', 'Yes'],
                    ['Maintenance', '2 Years Free', '3 Years Free', '3 Years Free', '2 Years Free'],
                    ['Revisions', '1', '2', '2', 'Scoped'],
                    ['Delivery Time', '2–3 Days', '4–6 Days', '5–7 Days', 'Scoped'],
                    ['Payment Terms', 'After Delivery', 'Milestone / After', 'Milestone / After', 'Scoped'],
                  ].map((row, idx) => {
                    const isMaintenance = row[0] === 'Maintenance';
                    return (
                      <tr key={row[0]} className="hover:bg-gray-50 dark:hover:bg-neutral-800/30 transition-colors">
                        {row.map((cell, i) => {
                          if (i === 0) {
                            return (
                              <td key={i} className="px-6 py-4 font-bold text-gray-900 dark:text-gray-200 w-52">
                                <span className="inline-flex items-center gap-2">
                                  {cell}
                                  {isMaintenance && (
                                    <span className="relative group">
                                      <Info className="w-4 h-4 text-[#FF2B2B] opacity-60 group-hover:opacity-100 transition-opacity cursor-help" aria-describedby="maint-tip" />
                                      <span id="maint-tip" role="tooltip" className="pointer-events-none select-none absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-neutral-900 dark:bg-neutral-700 px-3 py-2 text-[11px] font-medium text-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-neutral-700 dark:border-neutral-600">
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
                            <td key={i} className={`px-6 py-4 ${highlight ? 'font-bold text-[#FF2B2B]' : ''}`}>
                              {highlight ? (
                                <span className="inline-block px-2 py-1 rounded-md bg-[#FF2B2B]/10 border border-[#FF2B2B]/30 text-[#FF2B2B] text-xs font-bold tracking-tight">
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
        </div>

        {/* Trust & Value Section */}
        <div className="mb-24">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">Why Customers Choose Us</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { icon: CreditCard, label: 'Pay After Delivery' },
              { icon: ShieldCheck, label: 'Free 2-Year Maintenance' },
              { icon: Clock, label: 'Fast Delivery (2–7 Days)' },
              { icon: MessagesSquare, label: 'WhatsApp & Email Support' },
              { icon: Layers, label: 'No Hidden Charges' }
            ].map(item => (
              <div key={item.label} className="flex flex-col items-center gap-3 bg-gradient-to-br from-white to-gray-50 dark:from-neutral-900 dark:to-neutral-950 border border-neutral-200 dark:border-neutral-700 rounded-xl px-4 py-6 text-center shadow-sm hover:shadow-md hover:border-[#FF2B2B]/30 transition-all">
                <span className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#FF2B2B]/20 to-[#FF2B2B]/10 flex items-center justify-center text-[#FF2B2B]">
                  <item.icon className="w-5 h-5" />
                </span>
                <span className="font-semibold text-sm text-gray-900 dark:text-white tracking-tight">{item.label}</span>
              </div>
            ))}
          </div>
        </div>


        {/* Unified Footer CTA */}
        <div className="mt-24 mb-12">
          <div className="relative w-full rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-900/60 backdrop-blur-[2px] p-10 md:p-14 overflow-hidden">
            <div className="absolute -left-1 top-0 bottom-0 w-1.5 rounded-r-xl bg-gradient-to-b from-[#FF2B2B] via-[#ff4d4d] to-[#FF2B2B]" />
            <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-10">
                <div className="max-w-2xl">
                <h3 className="text-2xl md:text-[1.75rem] font-extrabold tracking-tight text-gray-900 dark:text-white mb-4">Not sure which build is right for you?</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm md:text-[15px] leading-relaxed">Tell us what the website needs to do for your business. We will recommend the right scope — and be honest if a simpler solution serves you better.</p>
              </div>
              <button
                onClick={() => window.open('https://wa.me/919060868026', '_blank')}
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#FF2B2B] to-[#FF5555] text-white px-8 py-4 rounded-xl font-bold text-base hover:shadow-xl hover:shadow-[#FF2B2B]/20 transition-all whitespace-nowrap flex-shrink-0"
              >
                Talk to Us
                <MessagesSquare className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
