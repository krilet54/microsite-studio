import { useNavigate } from 'react-router-dom';
import { useOrders } from '../context/OrderContext';
import { Palette, Star, Layers, CheckCircle, ChevronDown, FileText, Target, Clock3, TrendingUp, ChevronRight, Award, Shield, Zap, ArrowRight } from 'lucide-react';
import WhyInfoBox from '../components/WhyInfoBox';
import { useState, useRef, useEffect } from 'react';
import useRevealOnScroll from '../hooks/useRevealOnScroll';
import { Helmet } from 'react-helmet-async';

const brandingPackages = [
  { key: 'basic', title: 'Basic Kit', price: 899, features: ['Logo (JPG + PNG)', 'Color palette & fonts', 'Primary typography', 'Basic style guide'] },
  { key: 'complete', title: 'Complete Kit', price: 1499, highlight: true, features: ['Everything in Basic', 'Social media covers', 'Post templates', 'Extended style guide'] },
  { key: 'premium', title: 'Premium Kit', price: 2100, features: ['Everything in Complete', 'Business cards', 'Letterhead design', 'Promo / campaign templates'] },
];

// Deeper detailed inclusions extracted for maintainability
const kitInclusions: Record<string, string[]> = {
  basic: [
    'Primary logo variations (light / dark)',
    'Color palette with HEX / RGB codes',
    'Primary & fallback font recommendations',
    'Basic usage do & don’t list'
  ],
  complete: [
    'Everything in Basic deliverables',
    'Social media cover designs (FB / LinkedIn)',
    'Post & story template starter bundle',
    'Extended style guide (logo clearspace, typography scale)',
    'File delivery organised by platform'
  ],
  premium: [
    'Everything in Complete deliverables',
    'Business card front & back layout',
    'Letterhead (print + digital version)',
    'Promo / campaign template bundle',
    'Editable source files (where applicable)',
    'PDF master style guide (export ready)'
  ]
};

const brandingOutcomes = [
  { metric: 'Faster trust', text: 'A consistent visual identity improves first-impression confidence.' },
  { metric: 'Clear positioning', text: 'Customers understand what your brand stands for, faster.' },
  { metric: 'Reusable assets', text: 'You get organized templates and guidelines your team can actually use.' },
];

const brandingProcess = [
  {
    title: 'Brand Discovery',
    subtitle: 'Step 1',
    detail: 'We map your audience, positioning, and tone so visuals align with business goals.'
  },
  {
    title: 'Design System Build',
    subtitle: 'Step 2',
    detail: 'Logo direction, color logic, typography, and layout standards are created as one system.'
  },
  {
    title: 'Asset Production',
    subtitle: 'Step 3',
    detail: 'We deliver practical brand assets for social, business, and campaign execution.'
  },
  {
    title: 'Handover & Usage',
    subtitle: 'Step 4',
    detail: 'You receive organized files and usage guidance so implementation stays consistent.'
  }
];

const brandingFaq = [
  {
    q: 'Will this work if I already have a logo?',
    a: 'Yes. We can refine your existing identity and build a cleaner system around it.'
  },
  {
    q: 'Do I get editable files?',
    a: 'Premium includes editable source files where applicable, along with export-ready assets.'
  },
  {
    q: 'Can I use these assets for social media and ads?',
    a: 'Yes. The kits are built for real usage across social posts, business collateral, and campaigns.'
  },
  {
    q: 'How long does delivery take?',
    a: 'Turnaround depends on kit and revision scope, but we keep delivery structured and milestone-based.'
  }
];

export default function BrandingPackages() {
  const navigate = useNavigate();
  const { createOrderDraft } = useOrders();
  useRevealOnScroll();
  // Single-open accordion behaviour
  const [expanded, setExpanded] = useState<string | null>(null);
  const detailRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const toggleExpand = (key: string) => {
    setExpanded(prev => (prev === key ? null : key));
  };
  // Auto scroll into view when newly expanded
  useEffect(() => {
    if (expanded) {
      requestAnimationFrame(() => {
        const el = detailRefs.current[expanded];
        if (el) {
          const rect = el.getBoundingClientRect();
            const vh = window.innerHeight;
            if (rect.bottom > vh - 40 || rect.top < 0) {
              el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        }
      });
    }
  }, [expanded]);

  const selectPackage = (pkg: any) => {
    createOrderDraft('GUEST', { serviceType: 'Branding', packageName: pkg.title });
    navigate('/order/details');
  };

  const brandingSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Branding & Identity Kits',
    provider: { '@type': 'Organization', name: 'Microsite Studio' },
    areaServed: 'IN',
    offers: brandingPackages.map(p => ({ '@type': 'Offer', name: p.title, price: p.price, priceCurrency: 'INR' }))
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://micro-site.studio' },
      { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://micro-site.studio/services' },
      { '@type': 'ListItem', position: 3, name: 'Branding Kits', item: 'https://micro-site.studio/services/branding' },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: brandingFaq.map(faq => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a }
    }))
  };

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 pt-28 pb-20 px-6">
      <Helmet>
        <title>Branding & Identity Kits | Microsite Studio</title>
        <meta name="description" content="Affordable branding & identity kits: logo, color system, typography, templates and style guides." />
  <link rel="canonical" href="https://micro-site.studio/services/branding" />
        <meta property="og:title" content="Branding & Identity Kits" />
        <meta property="og:description" content="Logo design, color palette, typography & brand assets packages." />
  <meta property="og:url" content="https://micro-site.studio/services/branding" />
      <meta property="og:image" content="https://micro-site.studio/og/branding-kits.jpg" />
  <meta property="og:image:alt" content="Branding & identity kits preview card" />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Microsite Studio" />
  <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Branding & Identity Kits | Microsite Studio" />
      <meta name="twitter:description" content="Affordable logo design, brand identity systems, and visual assets for business growth." />
      <meta name="twitter:image" content="https://micro-site.studio/og/branding-kits.jpg" />
  <meta name="twitter:image:alt" content="Branding & identity kits preview card" />
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
              <span className="text-gray-900 dark:text-gray-200">Branding Kits</span>
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
              <span className="text-xs font-semibold text-[#FF2B2B] tracking-wide">TRUSTED BRAND SYSTEMS SINCE 2020</span>
            </div>

            <h1 className="text-[2.9rem] md:text-[3.2rem] leading-[1.05] font-extrabold tracking-tight text-gray-900 dark:text-white mb-5">
              Branding & Identity Kits
              <span className="absolute left-1/2 -bottom-3 h-[3px] w-40 -translate-x-1/2 rounded-full bg-gradient-to-r from-transparent via-[#FF2B2B] to-transparent" />
            </h1>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 font-medium tracking-tight">
              Structured brand systems for consistency, credibility, and scalable execution across all touchpoints.
            </p>

            {/* Trust Badges */}
            <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm font-medium">
              <div className="flex items-center gap-2 bg-green-50 dark:bg-green-950/30 rounded-lg px-3 py-2 border border-green-200 dark:border-green-900/40 text-green-700 dark:text-green-300">
                <CheckCircle className="w-4 h-4" />
                Fast Turnaround
              </div>
              <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-950/30 rounded-lg px-3 py-2 border border-blue-200 dark:border-blue-900/40 text-blue-700 dark:text-blue-300">
                <Zap className="w-4 h-4" />
                Organized Assets
              </div>
              <div className="flex items-center gap-2 bg-purple-50 dark:bg-purple-950/30 rounded-lg px-3 py-2 border border-purple-200 dark:border-purple-900/40 text-purple-700 dark:text-purple-300">
                <TrendingUp className="w-4 h-4" />
                Scalable System
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto">
        <WhyInfoBox
          title="Why Branding & Identity Kits?"
          description={<>
            A cohesive brand system amplifies trust and recall. Instead of piecemeal logos and ad-hoc colors, you get intentional assets, usage clarity and consistency across touchpoints. These kits accelerate launches, keep future creators aligned and prevent costly redesign drift.
          </>}
          className="mb-12 mt-12"
        />

        {/* Cards - now with premium styling */}
  <div className="grid md:grid-cols-3 gap-8 lg:gap-10 items-start mb-20">
          {brandingPackages.map((pkg, i) => (
            <div
              key={pkg.key}
              style={{animationDelay: `${120 + i * 90}ms`}}
              className={`group flex flex-col relative overflow-hidden p-9 rounded-2xl transition-all duration-400 border shadow-lg shadow-black/5 hover:shadow-xl hover:shadow-[#FF2B2B]/10 hover:-translate-y-1 will-change-transform ${pkg.highlight ? 'border-[#FF2B2B] ring-1 ring-[#FF2B2B]/40 scale-[1.02] hover:scale-[1.03]' : 'border-neutral-200 dark:border-neutral-800 hover:scale-[1.02]' } bg-gradient-to-br from-white to-gray-50 dark:from-neutral-900 dark:to-neutral-950`}
            >
              {pkg.highlight && (
                <span className="absolute top-4 right-4 bg-gradient-to-r from-[#FF2B2B] to-[#FF5555] text-white text-[10px] font-semibold px-3 py-1 rounded-full shadow-lg shadow-[#FF2B2B]/30">Most Popular</span>
              )}
              {pkg.key === 'premium' && (
                <span className="absolute top-4 left-4 bg-neutral-900/80 dark:bg-neutral-800 text-[10px] font-semibold text-white px-2.5 py-1 rounded-md border border-neutral-700/60 flex items-center gap-1">
                  <FileText className="w-3.5 h-3.5 text-[#FF2B2B]" /> PDF Style Guide
                </span>
              )}
              <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 ${pkg.highlight ? 'bg-gradient-to-br from-[#FF2B2B]/25 to-[#FF2B2B]/10' : 'bg-gradient-to-br from-[#FF2B2B]/15 to-[#FF2B2B]/5'} text-[#FF2B2B]`}>
                {pkg.key === 'basic' && <Palette className="w-10 h-10" />}
                {pkg.key === 'complete' && <Layers className="w-10 h-10" />}
                {pkg.key === 'premium' && <Star className="w-10 h-10" />}
              </div>
              <h2 className="text-[1.45rem] md:text-2xl font-extrabold text-gray-900 dark:text-white mb-1 tracking-tight">{pkg.title}</h2>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-black text-[#FF2B2B]"><span className="opacity-70 font-semibold text-[1.8rem] align-top">₹</span>{pkg.price.toLocaleString('en-IN')}</span>
              </div>
              <ul className="text-gray-700 dark:text-gray-300 space-y-[14px] mb-5 text-[13px] leading-relaxed">
                {pkg.features.map(f => (
                  <li key={f} className="flex items-start gap-2"><CheckCircle className="w-4 h-4 mt-[2px] text-[#FF2B2B] flex-shrink-0" />{f}</li>
                ))}
              </ul>
              {/* Expand toggle */}
              <button
                type="button"
                aria-expanded={expanded === pkg.key}
                aria-controls={`branding-details-${pkg.key}`}
                onClick={() => toggleExpand(pkg.key)}
                className={`w-full flex items-center justify-between text-[11px] font-semibold tracking-wide uppercase bg-neutral-900/90 dark:bg-neutral-800 text-white/90 hover:text-white rounded-md px-3 py-2 mb-4 transition-colors border ${pkg.highlight ? 'border-[#FF2B2B]/60' : 'border-neutral-700/60 hover:border-neutral-600'}`}
              >
                <span className="flex items-center gap-2"><FileText className="w-3.5 h-3.5 opacity-80" /> What You Get</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 ${expanded === pkg.key ? 'rotate-180' : ''}`}
                  style={{ transition: 'transform 420ms cubic-bezier(.34,1.56,.64,1)' }}
                />
              </button>
              <div className="relative">
                <div
                  id={`branding-details-${pkg.key}`}
                  role="region"
                  aria-hidden={expanded !== pkg.key}
                  ref={el => (detailRefs.current[pkg.key] = el)}
                  className={`transition-all duration-500 ease-in-out overflow-hidden mb-5 bg-neutral-950/60 border border-neutral-800/80 rounded-lg ${expanded === pkg.key ? 'max-h-56 opacity-100' : 'max-h-0 opacity-0'} `}
                >
                  <div className="p-5 space-y-4 overflow-y-auto max-h-52 pr-1">
                    <div className="flex items-center gap-2 text-[12px] font-bold tracking-wide text-white/90">
                      <FileText className="w-4 h-4 text-[#FF2B2B]" /> Detailed Inclusions
                    </div>
                    <ul className="space-y-2 text-[12px] leading-relaxed text-gray-400">
                      {expanded === pkg.key && kitInclusions[pkg.key].map(item => (
                        <li key={item} className="flex gap-2">
                          <CheckCircle className="w-3.5 h-3.5 mt-[2px] text-[#FF2B2B]/70 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="mt-auto">
                <button
                  onClick={() => selectPackage(pkg)}
                  className="w-full py-3.5 rounded-lg font-bold tracking-tight text-sm md:text-[15px] border border-[#FF2B2B] text-[#FF2B2B] transition-all hover:bg-[#FF2B2B] hover:text-white hover:shadow-lg hover:shadow-[#FF2B2B]/40 hover:scale-[1.015] active:scale-[0.985] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#FF2B2B] dark:border-[#FF2B2B]"
                >
                  Get Branding
                </button>
              </div>
            </div>
          ))}
        </div>
        {/* Note */}
        <div className="text-center mt-10 fade-up-on-scroll" style={{animationDelay: '420ms'}}>
          <p className="text-gray-600 dark:text-gray-400 text-sm"><span className="font-semibold text-[#FF2B2B]">Note:</span> Premium kit includes complete brand asset delivery for launch readiness.</p>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-3">
          {brandingOutcomes.map(item => (
            <div key={item.metric} className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-900 text-white p-5">
              <Target className="w-5 h-5 text-[#FF2B2B] mb-2" />
              <p className="text-xl font-black mb-1">{item.metric}</p>
              <p className="text-xs uppercase tracking-[0.18em] text-white/70">{item.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-8">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">How Branding Delivery Works</h3>
          <div className="grid gap-5 md:grid-cols-2">
            {brandingProcess.map(step => (
              <div key={step.title} className="rounded-xl bg-gray-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Clock3 className="w-4 h-4 text-[#FF2B2B]" />
                  <p className="text-xs uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 font-semibold">{step.subtitle}</p>
                </div>
                <h4 className="text-base font-bold text-gray-900 dark:text-white mb-2">{step.title}</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">{step.detail}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">Branding FAQs</h3>
          <div className="grid md:grid-cols-2 gap-5 text-sm">
            {brandingFaq.map(faq => (
              <div key={faq.q} className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-gray-50 dark:bg-neutral-900 p-5">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{faq.q}</h4>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer CTA - full width aligned with cards */}
        <div className="mt-20 fade-up-on-scroll" style={{animationDelay: '520ms'}}>
          <div className="relative w-full rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-900/60 backdrop-blur-[2px] p-10 md:p-14 overflow-hidden">
            <div className="absolute inset-0 pointer-events-none opacity-60 bg-[radial-gradient(circle_at_85%_25%,rgba(255,43,43,0.18),transparent_60%)]" />
            <div className="absolute -left-1 top-0 bottom-0 w-1.5 rounded-r-xl bg-gradient-to-b from-[#FF2B2B] via-[#ff4d4d] to-[#FF2B2B]" />
            <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-10">
              <div className="max-w-2xl">
                <h4 className="text-2xl md:text-[1.75rem] font-extrabold tracking-tight text-gray-900 dark:text-white mb-4">Need Custom Branding?</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm md:text-[15px] leading-relaxed">Need something beyond these kits—like packaging, pitch decks, investor decks, product launch assets, or a full rebrand system? We can scope a custom engagement that fits where you are.</p>
              </div>
              <div className="flex md:justify-end">
                <button
                  onClick={() => navigate('/', { state: { scrollTo: 'contact' } })}
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
