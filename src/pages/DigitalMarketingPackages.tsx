import { useNavigate } from 'react-router-dom';
import { useOrders } from '../context/OrderContext';
import {
  Megaphone,
  TrendingUp,
  Search,
  LineChart,
  Users,
  Target,
  CheckCircle2,
  ArrowRight,
  Clock3,
  BarChart3,
  ShieldCheck,
  MessageCircle,
  ChevronRight,
  Award,
  Zap,
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import WhyInfoBox from '../components/WhyInfoBox';
import useRevealOnScroll from '../hooks/useRevealOnScroll';

interface MarketingPlan {
  key: string;
  title: string;
  subtitle: string;
  price: string;
  highlight?: boolean;
  features: string[];
}

const marketingPlans: MarketingPlan[] = [
  {
    key: 'starter-visibility',
    title: 'Starter Visibility',
    subtitle: 'For local businesses building consistent lead flow',
    price: 'from ₹6,000 / month',
    features: [
      'SEO foundation and local optimization',
      'Content calendar (8 posts/month)',
      'Profile and listing optimization',
      'Monthly reporting dashboard',
      '1 strategy call per month',
    ],
  },
  {
    key: 'growth-engine',
    title: 'Growth Engine',
    subtitle: 'For teams that need qualified leads, not vanity traffic',
    price: 'from ₹12,000 / month',
    highlight: true,
    features: [
      'Everything in Starter Visibility',
      'Google + Meta campaign management',
      'Landing page and funnel optimization',
      'Creative and copy testing',
      'Weekly optimization check-ins',
    ],
  },
  {
    key: 'performance-scale',
    title: 'Performance Scale',
    subtitle: 'For businesses ready to scale aggressively',
    price: 'from ₹22,000 / month (+ ad spend)',
    features: [
      'Multi-channel paid growth systems',
      'Advanced conversion tracking and attribution',
      'CRO sprint cycles and experiment roadmap',
      'Lead quality filters + CRM handoff workflow',
      'Fortnightly leadership performance reviews',
    ],
  },
];

const fitPoints = [
  {
    icon: Users,
    title: 'Who It Is For',
    text: 'Clinics, coaches, agencies, local services, and founder-led teams needing stable monthly leads.',
  },
  {
    icon: Target,
    title: 'Best Stage',
    text: 'You already have an offer and want a predictable lead generation system without hiring a full in-house team.',
  },
  {
    icon: LineChart,
    title: 'What Improves',
    text: 'Lead quality, conversion rates, and cost per lead through weekly optimization loops.',
  },
];

const processSteps = [
  {
    title: 'Step 1: Growth Audit',
    subtitle: 'Days 1-3',
    detail: 'We audit your current channels, funnels, and tracking gaps. Then define baseline KPIs and priorities.',
  },
  {
    title: 'Step 2: System Setup',
    subtitle: 'Week 1',
    detail: 'Campaign structure, creatives, landing flow, and tracking are configured so every click is measurable.',
  },
  {
    title: 'Step 3: Launch + Testing',
    subtitle: 'Weeks 2-4',
    detail: 'We run controlled tests across audiences, hooks, and offers to identify scalable pockets of performance.',
  },
  {
    title: 'Step 4: Scale + Reporting',
    subtitle: 'Month 2 onward',
    detail: 'Budget shifts to best-performing segments, while reporting stays tied to qualified leads and revenue signals.',
  },
];

const faqs = [
  {
    q: 'Do I need a large ad budget to start?',
    a: 'No. We can start lean and scale with evidence. The goal is efficient lead quality first, then volume.',
  },
  {
    q: 'Do you provide creatives and copy?',
    a: 'Yes. Depending on your plan, we provide ad copy, creatives, content direction, and landing page optimization.',
  },
  {
    q: 'How soon can we expect results?',
    a: 'You usually see early directional data in 2-3 weeks. Stable, compounding performance typically appears over 6-10 weeks.',
  },
  {
    q: 'Can this integrate with our current website?',
    a: 'Yes. We can work with your existing site and improve funnel flow, or build dedicated conversion pages where needed.',
  },
];

export default function DigitalMarketingPackages() {
  const navigate = useNavigate();
  const { createOrderDraft } = useOrders();
  useRevealOnScroll();

  const handlePlanSelect = (plan: MarketingPlan) => {
    createOrderDraft('GUEST', { serviceType: 'Digital Marketing', packageName: plan.title });
    navigate('/order/details');
  };

  const pageUrl = 'https://micro-site.studio/services/digital-marketing';
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Digital Marketing & Growth Systems',
    provider: { '@type': 'Organization', name: 'Microsite Studio' },
    areaServed: 'IN',
    offers: marketingPlans.map((plan) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: plan.title },
      priceSpecification: {
        '@type': 'PriceSpecification',
        priceCurrency: 'INR',
      },
    })),
  };

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 pt-20 pb-24 px-6">
      <Helmet>
        <title>Digital Marketing & Growth | Microsite Studio</title>
        <meta
          name="description"
          content="Digital marketing packages for SEO, paid ads, content and funnel optimization. Built to improve lead quality and lower cost-per-lead."
        />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:title" content="Digital Marketing & Growth | Microsite Studio" />
        <meta
          property="og:description"
          content="Performance-focused digital marketing systems for small businesses and growth-stage teams."
        />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Microsite Studio" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Digital Marketing & Growth | Microsite Studio" />
        <meta
          name="twitter:description"
          content="SEO, ads, social, and conversion systems designed for measurable business growth."
        />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
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
              <span className="text-gray-900 dark:text-gray-200">Digital Marketing</span>
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
              <span className="text-xs font-semibold text-[#FF2B2B] tracking-wide">DATA-DRIVEN GROWTH SYSTEMS</span>
            </div>

            <h1 className="text-[2.9rem] md:text-[3.2rem] leading-[1.05] font-extrabold tracking-tight text-gray-900 dark:text-white mb-5">
              Digital Marketing & Growth
              <span className="absolute left-1/2 -bottom-3 h-[3px] w-40 -translate-x-1/2 rounded-full bg-gradient-to-r from-transparent via-[#FF2B2B] to-transparent" />
            </h1>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 font-medium tracking-tight">
              Structured growth infrastructure focused on qualified leads, conversion quality, and measurable ROI.
            </p>

            {/* Trust Badges */}
            <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm font-medium">
              <div className="flex items-center gap-2 bg-green-50 dark:bg-green-950/30 rounded-lg px-3 py-2 border border-green-200 dark:border-green-900/40 text-green-700 dark:text-green-300">
                <CheckCircle2 className="w-4 h-4" />
                Measurable Results
              </div>
              <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-950/30 rounded-lg px-3 py-2 border border-blue-200 dark:border-blue-900/40 text-blue-700 dark:text-blue-300">
                <Zap className="w-4 h-4" />
                Unified Systems
              </div>
              <div className="flex items-center gap-2 bg-purple-50 dark:bg-purple-950/30 rounded-lg px-3 py-2 border border-purple-200 dark:border-purple-900/40 text-purple-700 dark:text-purple-300">
                <TrendingUp className="w-4 h-4" />
                Growth Focused
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto">
        <WhyInfoBox
          title="Why This Service Exists"
          description={
            <>
              Most marketing fails because channels run in isolation. We unify search, paid media, content, and conversion flow into one growth system so your spend converts into real opportunities.
            </>
          }
          className="mb-12 mt-12"
        />

        <div className="grid gap-6 md:grid-cols-3 mb-16">
          {fitPoints.map((point) => (
            <div
              key={point.title}
              className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-gradient-to-br from-white to-gray-50 dark:from-neutral-900 dark:to-neutral-950 p-6 shadow-lg shadow-black/5 hover:shadow-xl hover:shadow-[#FF2B2B]/10 transition-all hover:-translate-y-1"
            >
              <div className="w-11 h-11 rounded-lg bg-[#FF2B2B]/10 text-[#FF2B2B] flex items-center justify-center mb-4">
                <point.icon className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{point.title}</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{point.text}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-8 md:grid-cols-3 mb-16">
          {marketingPlans.map((plan) => (
            <div
              key={plan.key}
              className={`relative rounded-2xl border p-7 flex flex-col shadow-lg shadow-black/5 hover:shadow-xl hover:shadow-[#FF2B2B]/10 hover:-translate-y-1 transition-all bg-gradient-to-br from-white to-gray-50 dark:from-neutral-900 dark:to-neutral-950 ${
                plan.highlight ? 'border-[#FF2B2B] ring-1 ring-[#FF2B2B]/40 scale-[1.02]' : 'border-neutral-200 dark:border-neutral-800'
              }`}
            >
              {plan.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#FF2B2B] to-[#FF5555] text-white text-[11px] font-semibold px-3 py-1 rounded-full shadow-lg shadow-[#FF2B2B]/30">
                  Most Recommended
                </span>
              )}
              <div className={`w-14 h-14 rounded-xl ${plan.highlight ? 'bg-gradient-to-br from-[#FF2B2B]/25 to-[#FF2B2B]/10' : 'bg-gradient-to-br from-[#FF2B2B]/15 to-[#FF2B2B]/5'} text-[#FF2B2B] flex items-center justify-center mb-5`}>
                {plan.key === 'starter-visibility' && <Search className="w-6 h-6" />}
                {plan.key === 'growth-engine' && <TrendingUp className="w-6 h-6" />}
                {plan.key === 'performance-scale' && <Megaphone className="w-6 h-6" />}
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{plan.title}</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{plan.subtitle}</p>
              <div className="text-xl font-extrabold text-[#FF2B2B] mb-5">{plan.price}</div>
              <ul className="space-y-2.5 text-[13px] text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#FF2B2B] mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handlePlanSelect(plan)}
                className={`mt-auto w-full rounded-lg px-4 py-3 text-sm font-semibold transition-all ${
                  plan.highlight
                    ? 'bg-gradient-to-r from-[#FF2B2B] to-[#FF5555] text-white hover:shadow-lg hover:shadow-[#FF2B2B]/40 hover:scale-[1.02] active:scale-95'
                    : 'border-2 border-[#FF2B2B] text-[#FF2B2B] hover:bg-[#FF2B2B] hover:text-white hover:scale-[1.02] active:scale-95'
                }`}
              >
                Book Strategy Call
              </button>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-8 mb-16">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">How We Execute</h3>
          <div className="grid gap-5 md:grid-cols-2">
            {processSteps.map((step) => (
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

        <div className="grid gap-4 sm:grid-cols-3 mb-16">
          {[
            { icon: BarChart3, metric: '30%↓', label: 'Average cost-per-lead reduction' },
            { icon: ShieldCheck, metric: '2-3 weeks', label: 'Directionally useful performance data' },
            { icon: MessageCircle, metric: 'Weekly', label: 'Optimization and reporting cadence' },
          ].map((item) => (
            <div key={item.label} className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-900 text-white p-5">
              <item.icon className="w-5 h-5 text-[#FF2B2B] mb-3" />
              <p className="text-2xl font-black mb-1">{item.metric}</p>
              <p className="text-xs uppercase tracking-[0.18em] text-white/70">{item.label}</p>
            </div>
          ))}
        </div>

        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">Frequently Asked Questions</h3>
          <div className="grid md:grid-cols-2 gap-5 text-sm">
            {faqs.map((faq) => (
              <div key={faq.q} className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-gray-50 dark:bg-neutral-900 p-5">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{faq.q}</h4>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-900/60 p-10 md:p-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div className="max-w-2xl">
              <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white mb-3">
                Want a Growth Plan Tailored to Your Business?
              </h3>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
                Share your offer, current channels, and goals. We will recommend the right growth model and realistic KPI targets.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => handlePlanSelect(marketingPlans[1])}
                className="inline-flex items-center justify-center gap-2 bg-[#FF2B2B] text-white px-7 py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors"
              >
                Start Growth Strategy
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => window.open('https://wa.me/919060868026', '_blank')}
                className="inline-flex items-center justify-center gap-2 border border-[#FF2B2B] text-[#FF2B2B] px-7 py-3 rounded-lg font-semibold hover:bg-[#FF2B2B] hover:text-white transition-colors"
              >
                WhatsApp Enquiry
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
