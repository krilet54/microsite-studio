import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle2,
  Globe,
  Layers,
  Megaphone,
  Target,
  TrendingUp,
  Users,
  Shield,
  Zap,
  Award,
  ChevronRight,
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';

interface ServiceMetric {
  label: string;
  value: string;
}

interface ServiceSection {
  id: string;
  eyebrow: string;
  title: string;
  priceTag: string;
  summary: string;
  fit: string;
  outcomes: string[];
  deliverables: string[];
  metrics: ServiceMetric[];
  review: {
    quote: string;
    author: string;
  };
  primaryCta: {
    label: string;
    to: string;
  };
  secondaryCta: {
    label: string;
    to: string;
  };
}

const services: ServiceSection[] = [
  {
    id: 'websites',
    eyebrow: 'Service 01',
    title: 'WEB ENGINEERING & DIGITAL INFRASTRUCTURE',
    priceTag: 'From ₹1,500 onwards',
    summary:
      'Scalable digital systems built for launch readiness, operational stability, and long-term online growth.',
    fit: 'Best for founders and local businesses that need a high-credibility online presence fast.',
    outcomes: [
      'Production-ready infrastructure designed for reliability and scale',
      'Clear website-to-marketing continuity for long-term business growth',
      'Better performance, discoverability, and conversion readiness from day one',
    ],
    deliverables: [
      'Static Websites from ₹1,500 onwards',
      'Dynamic Web from ₹3,000 onwards',
      'Applications',
      'E-Commerce Platforms from ₹15,000 onwards',
      'Portal Systems based on client requirements and needs',
      'Custom solutions',
    ],
    metrics: [
      { value: '2-7 days', label: 'Typical launch window' },
      { value: '4.8/5', label: 'Average client rating' },
    ],
    review: {
      quote: 'They built my website and I only paid after delivery. Smooth and quick.',
      author: 'Website Client · Verified',
    },
    primaryCta: { label: 'Explore Website Packages', to: '/services/websites' },
    secondaryCta: { label: 'See Website Proof', to: '/portfolio' },
  },
  {
    id: 'growth',
    eyebrow: 'Service 02',
    title: 'Digital Marketing & Growth',
    priceTag: 'Monthly growth systems',
    summary: 'Turn SEO, paid media, and funnel optimization into one measurable lead-generation engine.',
    fit: 'Best for teams with an active offer who need predictable qualified leads, not vanity traffic.',
    outcomes: [
      'Lower cost per qualified lead with weekly optimization loops',
      'Better lead quality from tighter channel-fit and messaging',
      'Clear ROI visibility across SEO, ads, and landing funnels',
    ],
    deliverables: [
      'Search + paid campaign management',
      'Creative and copy test cycles',
      'Landing page conversion optimization',
      'Weekly reporting and decision dashboard',
    ],
    metrics: [
      { value: '30%↓', label: 'Average CPL improvement' },
      { value: 'Weekly', label: 'Optimization cadence' },
    ],
    review: {
      quote: 'Their growth campaigns look professional and we now get more qualified enquiries.',
      author: 'Digital Marketing Client · Verified',
    },
    primaryCta: { label: 'Explore Growth Services', to: '/services/digital-marketing' },
    secondaryCta: { label: 'Read Growth Framework', to: '/articles/how-microsite-studio-works-for-digital-marketing' },
  },
  {
    id: 'branding',
    eyebrow: 'Service 03',
    title: 'Branding & Identity Kits',
    priceTag: 'Structured packages from ₹899',
    summary: 'Build a consistent identity so your brand looks premium across every touchpoint.',
    fit: 'Best for businesses with scattered visuals who need a usable and consistent brand system.',
    outcomes: [
      'Higher trust at first impression',
      'Stronger recall through consistent visual language',
      'Faster execution with reusable brand assets',
    ],
    deliverables: [
      'Logo, color, and typography system',
      'Clear brand usage guidelines',
      'Social and collateral templates',
      'Rollout-ready asset handoff',
    ],
    metrics: [
      { value: '3 tiers', label: 'Package options' },
      { value: '2+ years', label: 'Asset usability horizon' },
    ],
    review: {
      quote: 'I did not expect professional work at this price. Worth it.',
      author: 'Branding Client · Verified',
    },
    primaryCta: { label: 'Explore Branding Kits', to: '/services/branding' },
    secondaryCta: { label: 'See Branding Proof', to: '/portfolio' },
  },
];

const processSteps = [
  {
    title: 'Scope',
    detail: 'We align goals, offer, and priorities before execution starts.',
  },
  {
    title: 'Build',
    detail: 'We execute in focused sprint cycles with clear ownership.',
  },
  {
    title: 'Optimize',
    detail: 'We improve based on lead quality and conversion signals.',
  },
  {
    title: 'Scale',
    detail: 'We double down on winning channels and proven assets.',
  },
];

export default function Services() {
  const pageUrl = 'https://micro-site.studio/services';
  const pageTitle = 'Services | Microsite Studio';
  const pageDescription =
    'Sales-oriented website, digital growth, and branding services with clear outcomes, proof metrics, and conversion-focused delivery.';
  const pageImage = 'https://micro-site.studio/micrositefavicon.png';

  const servicesSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${pageUrl}#services-catalog`,
    name: 'Microsite Studio Services',
    provider: {
      '@type': 'Organization',
      name: 'Microsite Studio',
      url: 'https://micro-site.studio',
    },
    areaServed: 'IN',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Core Service Lines',
      itemListElement: services.map((service) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: service.title },
      })),
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://micro-site.studio',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Services',
        item: pageUrl,
      },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What services does Microsite Studio offer?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We offer three core services: Web Engineering & Digital Infrastructure (websites from ₹1,500), Digital Marketing & Growth (monthly systems for qualified leads), and Branding & Identity Kits (packages from ₹899). Each is designed for measurable outcomes and long-term growth.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do I pay upfront for services?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'For eligible packages, we offer "Pay After Delivery" terms. You only pay once you\'re satisfied with the work.',
        },
      },
      {
        '@type': 'Question',
        name: 'How long does service delivery take?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Typical delivery windows: Websites (2-7 days), Branding packages (3-5 business days), Digital marketing (setup within a week). Custom projects are scoped individually.',
        },
      },
      {
        '@type': 'Question',
        name: 'What support is included after delivery?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'All packages include free maintenance: 2-3 years depending on the service, covering content updates, bug fixes, monitoring, and performance optimization.',
        },
      },
    ],
  };

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 transition-colors">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta
          name="keywords"
          content="website services, digital marketing services, branding packages, conversion-focused services"
        />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content={pageImage} />
        <meta property="og:image:alt" content="Microsite Studio services overview" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Microsite Studio" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={pageImage} />
        <script type="application/ld+json">{JSON.stringify(servicesSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      {/* Breadcrumb Navigation */}
      <nav aria-label="breadcrumb" className="bg-white dark:bg-neutral-950 border-b border-gray-200 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-6 py-3 text-sm">
          <ol className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
            <li>
              <Link to="/" className="hover:text-[#FF2B2B] transition-colors">Home</Link>
            </li>
            <li className="flex items-center gap-1">
              <ChevronRight className="w-4 h-4" />
              <span className="text-gray-900 dark:text-gray-200">Services</span>
            </li>
          </ol>
        </div>
      </nav>

      {/* Hero Section with Premium Styling */}
      <section className="relative pt-20 pb-16 bg-gradient-to-br from-white via-white to-gray-50 dark:from-neutral-950 dark:via-neutral-950 dark:to-neutral-900 transition-colors border-b border-gray-200 dark:border-neutral-800 overflow-hidden">
        {/* Premium gradient background elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-gradient-to-br from-[#FF2B2B]/8 to-transparent blur-[100px]" />
          <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-gradient-to-tr from-[#FF2B2B]/5 to-transparent blur-[100px]" />
        </div>

        <div className="relative max-w-5xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-gradient-to-r from-[#FF2B2B]/10 to-[#FF2B2B]/5 border border-[#FF2B2B]/20">
            <Award className="w-4 h-4 text-[#FF2B2B]" />
            <span className="text-xs font-semibold text-[#FF2B2B] tracking-wide">TRUSTED BY 100+ BUSINESSES</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white mb-6 leading-tight tracking-tight">
            Professional Services for Digital Growth
          </h1>

          <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed font-medium">
            At Microsite Studio, we craft scalable digital ecosystems—from conversion-optimized websites to growth engines and premium brand identities. Every service is engineered for measurable outcomes and long-term success.
          </p>

          {/* Premium gradient underline */}
          <div className="mt-8 flex justify-center">
            <div className="h-1 w-40 rounded-full bg-gradient-to-r from-[#FF2B2B] via-[#FF5555] to-[#FF2B2B]" />
          </div>
        </div>
      </section>

      {services.map((service, index) => (
        <section
          key={service.id}
          id={service.id}
          className={`py-20 transition-colors relative overflow-hidden ${index % 2 === 1 ? 'bg-gray-50 dark:bg-neutral-900' : 'bg-white dark:bg-neutral-950'}`}
        >
          {/* Premium gradient accents */}
          {index % 2 === 1 && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute -top-40 -left-32 w-80 h-80 rounded-full bg-gradient-to-br from-[#FF2B2B]/5 to-transparent blur-[100px]" />
            </div>
          )}

          <div className="relative max-w-6xl mx-auto px-6">
            <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr] items-start">
              <div>
                {/* Premium eyebrow with gradient accent */}
                <div className="inline-flex items-center gap-3 mb-4">
                  <div className="h-8 w-1 rounded-full bg-gradient-to-b from-[#FF2B2B] to-[#FF5555]" />
                  <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#FF2B2B]">{service.eyebrow}</span>
                </div>

                {/* Icon badge with premium styling */}
                <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-gradient-to-br from-[#FF2B2B]/15 to-[#FF2B2B]/5 border border-[#FF2B2B]/20 text-[#FF2B2B] mb-6 shadow-lg shadow-[#FF2B2B]/10">
                  {service.id === 'websites' && <Globe className="h-7 w-7" />}
                  {service.id === 'growth' && <Megaphone className="h-7 w-7" />}
                  {service.id === 'branding' && <Layers className="h-7 w-7" />}
                </div>

                <h2 className="text-3.5xl md:text-4xl font-black text-gray-900 dark:text-white leading-tight tracking-tight mb-3">{service.title}</h2>
                <p className="text-sm font-bold tracking-widest text-[#FF2B2B] mb-5 uppercase">{service.priceTag}</p>
                <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed font-medium max-w-2xl mb-8">{service.summary}</p>

                {/* Premium Best Fit Box */}
                <div className="rounded-2xl border border-[#FF2B2B]/30 bg-gradient-to-br from-[#FFF4F4] to-[#FFF9F9] dark:from-[#3A1515] dark:to-[#2A0F0F] px-6 py-5 mb-8 backdrop-blur-sm shadow-lg shadow-[#FF2B2B]/5">
                  <div className="mb-3">
                    <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#FF2B2B] to-[#FF5555] px-3 py-1.5 text-[10px] uppercase tracking-[0.16em] text-white font-bold shadow-lg shadow-[#FF2B2B]/20">
                      <Users className="w-3.5 h-3.5" /> Best Fit
                    </span>
                  </div>
                  <p className="text-sm text-gray-800 dark:text-gray-100 font-medium leading-relaxed">{service.fit}</p>
                </div>

                {/* Outcomes and Deliverables */}
                <div className="grid gap-8 md:grid-cols-2 mb-8">
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Target className="w-5 h-5 text-[#FF2B2B]" />
                      <h3 className="text-base font-bold text-gray-900 dark:text-white">Expected Impact</h3>
                    </div>
                    <ul className="space-y-3">
                      {service.outcomes.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#FF2B2B] mt-2 flex-shrink-0" />
                          <span className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <CheckCircle2 className="w-5 h-5 text-[#FF2B2B]" />
                      <h3 className="text-base font-bold text-gray-900 dark:text-white">What We Deliver</h3>
                    </div>
                    <ul className="space-y-3">
                      {service.deliverables.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#FF2B2B] mt-2 flex-shrink-0" />
                          <span className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Premium Sidebar */}
              <aside className="rounded-3xl border border-gray-200 dark:border-neutral-700 bg-gradient-to-br from-white to-gray-50 dark:from-neutral-900 dark:to-neutral-950 p-8 space-y-6 shadow-xl shadow-black/5 sticky top-24">
                {/* Metrics Cards with Premium Styling */}
                <div className="grid grid-cols-2 gap-4">
                  {service.metrics.map((metric) => (
                    <div key={metric.label} className="rounded-2xl border border-gray-200 dark:border-neutral-700 bg-gradient-to-br from-gray-50 to-white dark:from-neutral-800 dark:to-neutral-900 p-5 shadow-sm hover:shadow-md transition-shadow">
                      <p className="text-2xl font-black bg-gradient-to-r from-[#FF2B2B] to-[#FF5555] bg-clip-text text-transparent">{metric.value}</p>
                      <p className="text-[11px] uppercase tracking-[0.14em] text-gray-500 dark:text-gray-400 mt-2 font-semibold">{metric.label}</p>
                    </div>
                  ))}
                </div>

                {/* Premium Review Card */}
                <div className="rounded-2xl border border-gray-200 dark:border-neutral-700 bg-gradient-to-br from-gray-50 to-white dark:from-neutral-800 dark:to-neutral-900 p-6 shadow-sm">
                  <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-gray-500 dark:text-gray-400 font-bold mb-3">
                    <div className="w-2 h-2 rounded-full bg-[#FF2B2B]" />
                    Verified Review
                  </div>
                  <p className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed mb-3 italic font-medium">"{service.review.quote}"</p>
                  <p className="text-[11px] uppercase tracking-[0.16em] text-gray-500 dark:text-gray-400 font-bold">{service.review.author}</p>
                </div>

                {/* Trust Badges */}
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <div className="flex items-center gap-2 bg-green-50 dark:bg-green-950/30 rounded-lg px-3 py-2 border border-green-200 dark:border-green-900/40">
                    <Shield className="w-3.5 h-3.5 text-green-600 dark:text-green-400" />
                    <span className="text-[10px] font-semibold text-green-700 dark:text-green-300">No Risk</span>
                  </div>
                  <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-950/30 rounded-lg px-3 py-2 border border-blue-200 dark:border-blue-900/40">
                    <Zap className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                    <span className="text-[10px] font-semibold text-blue-700 dark:text-blue-300">Fast</span>
                  </div>
                </div>

                {/* CTAs with Premium Styling */}
                <div className="flex flex-col gap-3 pt-4">
                  <Link
                    to={service.primaryCta.to}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#FF2B2B] to-[#FF5555] text-white px-6 py-3.5 text-sm font-bold hover:shadow-lg hover:shadow-[#FF2B2B]/40 hover:-translate-y-0.5 transition-all active:scale-95 shadow-lg shadow-[#FF2B2B]/20"
                  >
                    {service.primaryCta.label}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    to={service.secondaryCta.to}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-[#FF2B2B] text-[#FF2B2B] px-6 py-3 text-sm font-bold hover:bg-[#FF2B2B] hover:text-white hover:shadow-lg hover:shadow-[#FF2B2B]/30 transition-all active:scale-95"
                  >
                    {service.secondaryCta.label}
                  </Link>
                </div>
              </aside>
            </div>
          </div>
        </section>
      ))}

      {/* Process Section with Premium Design */}
      <section id="process" className="py-20 bg-white dark:bg-neutral-950 transition-colors border-t border-gray-200 dark:border-neutral-800 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-gradient-to-tr from-[#FF2B2B]/5 to-transparent blur-[100px]" />
        </div>

        <div className="relative max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-4">Our Proven Delivery Framework</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">A structured approach that ensures quality, accountability, and measurable results at every step.</p>
          </div>

          <div className="grid gap-8 md:grid-cols-4">
            {processSteps.map((step, idx) => (
              <div
                key={step.title}
                className="relative group rounded-2xl border border-gray-200 dark:border-neutral-700 bg-gradient-to-br from-white to-gray-50 dark:from-neutral-900 dark:to-neutral-950 p-7 shadow-lg shadow-black/5 hover:shadow-xl hover:border-[#FF2B2B]/50 transition-all duration-300"
              >
                {/* Step number badge */}
                <div className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-gradient-to-br from-[#FF2B2B] to-[#FF5555] text-white font-bold text-sm flex items-center justify-center shadow-lg">
                  {idx + 1}
                </div>

                <div className="mb-4">
                  <p className="text-[10px] uppercase tracking-[0.16em] text-[#FF2B2B] font-bold">{step.title}</p>
                </div>

                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">{step.title}</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{step.detail}</p>

                {/* Connector line for desktop */}
                {idx < processSteps.length - 1 && (
                  <div className="hidden md:block absolute -right-4 top-1/2 w-8 h-0.5 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-neutral-700 dark:to-neutral-600" />
                )}
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[#FF2B2B]/10 to-[#FF2B2B]/5 border border-[#FF2B2B]/30 px-5 py-3 shadow-lg shadow-[#FF2B2B]/10">
              <TrendingUp className="w-4 h-4 text-[#FF2B2B]" />
              <span className="text-xs md:text-sm font-bold text-gray-900 dark:text-white tracking-wide">Simple process, measurable outcomes, guaranteed success</span>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Authority Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white dark:from-neutral-900 dark:to-neutral-950 transition-colors border-t border-gray-200 dark:border-neutral-800">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-950 p-8 text-center shadow-sm hover:shadow-lg transition-shadow">
              <div className="text-3xl font-black mb-2 bg-gradient-to-r from-[#FF2B2B] to-[#FF5555] bg-clip-text text-transparent">30+</div>
              <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">Projects Delivered</p>
            </div>
            <div className="rounded-2xl border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-950 p-8 text-center shadow-sm hover:shadow-lg transition-shadow">
              <div className="text-3xl font-black mb-2 bg-gradient-to-r from-[#FF2B2B] to-[#FF5555] bg-clip-text text-transparent">4.8/5</div>
              <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">Average Client Rating</p>
            </div>
            <div className="rounded-2xl border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-950 p-8 text-center shadow-sm hover:shadow-lg transition-shadow">
              <div className="text-3xl font-black mb-2 bg-gradient-to-r from-[#FF2B2B] to-[#FF5555] bg-clip-text text-transparent">100%</div>
              <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">On-Time Delivery Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section with Premium Design */}
      <section className="py-20 bg-white dark:bg-neutral-950 transition-colors relative">
        <div className="max-w-4xl mx-auto px-6">
          <div className="relative rounded-3xl border border-gray-200 dark:border-neutral-700 bg-gradient-to-br from-white via-gray-50 to-white dark:from-neutral-900 dark:via-neutral-950 dark:to-neutral-900 overflow-hidden shadow-2xl shadow-black/10">
            {/* Premium gradient accent */}
            <div className="absolute inset-0 pointer-events-none opacity-60">
              <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-gradient-to-br from-[#FF2B2B]/10 to-transparent blur-[100px]" />
              <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-gradient-to-tr from-[#FF2B2B]/8 to-transparent blur-[100px]" />
            </div>

            <div className="relative p-12 md:p-16">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12">
                <div className="flex-1">
                  <h3 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-5 leading-tight">Ready to Elevate Your Digital Presence?</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg leading-relaxed mb-6">Share your goals and challenges. We'll recommend the right service path and show you exactly what's possible.</p>
                  
                  <ul className="space-y-3 mb-8">
                    {[
                      '20-minute strategy consultation',
                      'Custom service recommendation',
                      'No pressure, no obligation'
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#FF2B2B]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col gap-4 sm:max-lg:flex-row lg:flex-col">
                  <Link
                    to="/services/digital-marketing"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#FF2B2B] to-[#FF5555] text-white px-8 py-4 font-bold text-base hover:shadow-xl hover:shadow-[#FF2B2B]/40 hover:-translate-y-1 transition-all active:scale-95 shadow-lg shadow-[#FF2B2B]/25 whitespace-nowrap"
                  >
                    Book Strategy Call
                    <ArrowRight className="w-5 h-5" />
                  </Link>

                  <button
                    onClick={() => window.open('https://wa.me/919060868026', '_blank')}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-[#FF2B2B] text-[#FF2B2B] px-8 py-4 font-bold text-base hover:bg-[#FF2B2B] hover:text-white hover:shadow-lg transition-all active:scale-95 whitespace-nowrap"
                  >
                    Message on WhatsApp
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Left accent bar spanning full height */}
          <div className="absolute left-6 top-20 bottom-20 w-2 rounded-full bg-gradient-to-b from-[#FF2B2B] via-[#FF5555] to-[#FF2B2B] shadow-lg" />
        </div>
      </section>
    </div>
  );
}
