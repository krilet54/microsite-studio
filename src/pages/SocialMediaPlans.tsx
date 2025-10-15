import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useOrders } from '../context/OrderContext';
import {
  Share2,
  BarChart3,
  Camera,
  Star,
  CheckCircle2,
  Repeat,
  MessageCircle,
  Goal,
  XCircle,
  Clock,
  ShieldCheck,
  Users,
  TrendingUp,
  Sparkles,
  Heart,
  Globe2,
  FileText,
  Calendar,
  ChevronDown,
} from 'lucide-react';
import WhyInfoBox from '../components/WhyInfoBox';
 
import useRevealOnScroll from '../hooks/useRevealOnScroll';
import { Helmet } from 'react-helmet-async';

const smPlans = [
  {
    key: 'starter',
    title: 'Starter',
    price: '₹1,000/mo',
    description: 'Light presence & consistency',
    features: ['1–2 posts / week', 'FB + Instagram', 'Basic captions', 'Comment replies']
  },
  {
    key: 'growth',
    title: 'Growth',
    price: '₹1,999/mo',
    description: 'Build brand authority',
    features: ['3 posts / week', 'FB + IG + LinkedIn', 'Branded graphics', 'Hashtag research']
  },
  {
    key: 'premium',
    title: 'Premium',
    price: '₹2,999/mo',
    description: 'Higher engagement & reach',
    features: ['4–5 posts / week', 'Stories + Reels', 'Engagement support', 'Monthly analytics'],
    highlight: true
  },
  {
    key: 'elite',
    title: 'Elite',
    price: '₹3,999/mo',
    description: 'Aggressive daily scaling',
    features: ['Daily posts', 'All major platforms', 'Campaigns & reels', 'Free Branding Kit']
  }
];

export default function SocialMediaPlans() {
  const navigate = useNavigate();
  const { createOrderDraft } = useOrders();
  const [expandedPlan, setExpandedPlan] = useState<string | null>(null);
  useRevealOnScroll();

  // Reintroduced expandable details (option 1 undo) – user requested restoration of the plan details toggle.
  const planDetails: Record<string, { label: string; items: string[] }> = {
    starter: {
      label: 'Inclusions',
      items: [
        'Weekly content calendar outline',
        'Caption writing & basic hashtag set',
        'Scheduling & publishing (1–2 posts / week)',
        'Basic comment monitoring (daily check)'
      ]
    },
    growth: {
      label: 'Inclusions',
      items: [
        'All Starter features',
        'Branded graphic templates',
        'Hashtag & timing research (refreshed monthly)',
        '3 posts / week scheduling & publishing',
        'Monthly performance snapshot (reach & engagement)',
        'Up to 2 strategy adjustments / month'
      ]
    },
    premium: {
      label: 'Inclusions',
      items: [
        'All Growth features',
        'Stories + Reels guidance & scheduling',
        'Content optimization (hook & CTA refinement)',
        'Active engagement support (comments & basic DMs)',
        'Advanced analytics & insights',
        'Quarterly growth recommendations'
      ]
    },
    elite: {
      label: 'Inclusions',
      items: [
        'All Premium features',
        'Daily posting & campaign execution',
        'All major platforms (FB, IG, LinkedIn, optional X)',
        'Promo & campaign calendar management',
        'Free branding kit',
        'Priority support channel'
      ]
    }
  };

  const pick = (plan: any) => {
    createOrderDraft('GUEST', { serviceType: 'Social Media Management', packageName: plan.title });
    navigate('/order/details');
  };

  // Detailed inclusions removed with toggle; simplification keeps feature bullets only.

  const socialServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Social Media Management',
    provider: { '@type': 'Organization', name: 'Microsite Studio' },
    areaServed: 'IN',
    offers: smPlans.map(p => ({ '@type': 'Offer', name: p.title + ' Plan', price: p.price.replace(/[^0-9]/g,'') || undefined, priceCurrency: 'INR' }))
  };

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 py-14 md:py-20 px-5 md:px-6">
      <Helmet>
        <title>Social Media Management Plans | Microsite Studio</title>
        <meta name="description" content="Monthly social media management plans: starter, growth, premium and elite. Consistent posting, engagement & analytics." />
        <link rel="canonical" href="https://www.micro-site.studio/services/social-media" />
        <meta property="og:title" content="Social Media Management Plans" />
        <meta property="og:description" content="Affordable managed social media plans to grow brand visibility and engagement." />
        <meta property="og:url" content="https://www.micro-site.studio/services/social-media" />
  <meta property="og:image" content="/og/social-media-plans.jpg" />
  <meta property="og:image:alt" content="Social media management plans preview card" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:image" content="/og/social-media-plans.jpg" />
  <meta name="twitter:image:alt" content="Social media management plans preview card" />
        <script type="application/ld+json">{JSON.stringify(socialServiceSchema)}</script>
      </Helmet>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="max-w-4xl mx-auto text-center mb-14 md:mb-18 header-fade">
          <h1 className="text-[3rem] md:text-[3.55rem] font-extrabold leading-[1.04] tracking-tight text-gray-900 dark:text-white mb-6 relative inline-block">
            Social Media Plans
            <span className="absolute -bottom-3 left-0 right-0 mx-auto h-[3px] w-56 bg-gradient-to-r from-transparent via-[#FF2B2B] to-transparent rounded-full line-expand" />
          </h1>
          <div className="mx-auto flex flex-col items-center gap-4 max-w-2xl">
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 font-medium tracking-tight m-0">Choose a plan that matches your brand’s growth goals</p>
          </div>
        </header>

        {/* Why Box */}
        <WhyInfoBox
          title="Why Social Media Management?"
          description={<>
            Consistent, strategic publishing compounds awareness, authority and inbound interest. A managed system ensures timing, brand voice, engagement response and iterative improvement—without you juggling daily posting or burning out.
          </>}
        />
        {/* Plans Grid */}
        <div className="grid gap-8 md:gap-10 md:grid-cols-2 xl:grid-cols-4 mb-20 items-start">
          {smPlans.map(plan => (
            <div
              key={plan.key}
              className={`group relative rounded-2xl border bg-gray-50 dark:bg-neutral-900 flex flex-col p-7 md:p-8 shadow-sm transition-all duration-400 hover:-translate-y-1 hover:shadow-xl ${plan.highlight ? 'premium-glow border-[#FF2B2B] ring-1 ring-[#FF2B2B]/50 scale-[1.03]' : 'border-neutral-200 dark:border-neutral-800'}`}
            >
              {plan.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#FF2B2B] text-white text-[10px] font-semibold px-3 py-1 rounded-full shadow ring-2 ring-[#FF2B2B]/60 animate-pulse">Most Popular</span>
              )}
              <div className="w-16 h-16 rounded-xl relative flex items-center justify-center mb-6">
                <div className="absolute inset-0 rounded-xl bg-[#FF2B2B]/15 blur-sm opacity-70 group-hover:opacity-100 transition-opacity" />
                <div className="relative w-full h-full rounded-xl bg-[#FF2B2B]/10 text-[#FF2B2B] flex items-center justify-center">
                  {plan.key === 'starter' && <Share2 className="w-8 h-8" />}
                  {plan.key === 'growth' && <BarChart3 className="w-8 h-8" />}
                  {plan.key === 'premium' && <Camera className="w-8 h-8" />}
                  {plan.key === 'elite' && <Star className="w-8 h-8" />}
                </div>
              </div>
              <h2 className="text-xl md:text-2xl font-extrabold text-gray-900 dark:text-white leading-tight mb-2 tracking-tight">{plan.title}</h2>
              <p className="text-xs tracking-wide font-medium italic text-gray-500 dark:text-gray-400 mb-4">{plan.description}</p>
              <div className="text-[1.55rem] font-extrabold text-[#FF2B2B] mb-6">{plan.price}</div>
              <ul className="text-[13px] text-gray-700 dark:text-gray-300 space-y-3 mb-5 leading-relaxed">
                {plan.features.map(f => (
                  <li key={f} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-[2px] text-[#FF2B2B] flex-shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              {/* Plan details toggle */}
              <button
                type="button"
                aria-expanded={expandedPlan === plan.key}
                aria-controls={`plan-details-${plan.key}`}
                onClick={() => setExpandedPlan(expandedPlan === plan.key ? null : plan.key)}
                className="w-full flex items-center justify-between text-[11px] font-semibold tracking-wide uppercase bg-neutral-800/90 dark:bg-neutral-800 text-white/90 hover:text-white rounded-md px-3 py-2 mb-4 transition-colors border border-neutral-700/60 hover:border-neutral-600"
              >
                <span className="flex items-center gap-2">
                  <Globe2 className="w-3.5 h-3.5 opacity-80" /> View Plan Details
                </span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${expandedPlan === plan.key ? 'rotate-180' : ''}`} />
              </button>
              <div
                id={`plan-details-${plan.key}`}
                role="region"
                aria-hidden={expandedPlan !== plan.key}
                className={`overflow-hidden transition-all duration-400 ease-out mb-3 ${expandedPlan === plan.key ? 'max-h-[520px] opacity-100' : 'max-h-0 opacity-0'} rounded-lg bg-neutral-950/60 border border-neutral-800/80`}
              >
                <div className="p-5 space-y-4">
                  <div className="flex items-center gap-2 text-[12px] font-bold tracking-wide text-white/90">
                    <FileText className="w-4 h-4 text-[#FF2B2B]" /> {planDetails[plan.key].label}
                  </div>
                  <ul className="space-y-2 text-[12px] leading-relaxed text-gray-400">
                    {planDetails[plan.key].items.map(item => (
                      <li key={item} className="flex gap-2">
                        <Calendar className="w-3.5 h-3.5 mt-[2px] text-[#FF2B2B]/70 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="h-px bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent mb-6" />
              <button
                onClick={() => pick(plan)}
                className={`w-full text-sm font-bold rounded-lg px-5 py-3 tracking-tight transition-all will-change-transform relative overflow-hidden ${plan.highlight ? 'bg-[#FF2B2B] text-white shadow shadow-[#FF2B2B]/40 hover:brightness-110 hover:shadow-lg hover:shadow-[#FF2B2B]/50' : 'bg-neutral-800 text-white hover:bg-neutral-700 dark:bg-neutral-800 dark:hover:bg-neutral-700'} active:scale-[0.97] hover:scale-[1.02]`}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>

        {/* Benefits Section (renamed to avoid duplication with Why box) */}
        <section className="mb-24">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-10 text-center">Benefits of Social Media Management</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7 max-w-5xl mx-auto">
            {[
              { icon: <ShieldCheck className="w-5 h-5" />, title: 'Builds credibility & visibility', text: 'A consistent presence shows reliability and elevates brand trust.' },
              { icon: <Users className="w-5 h-5" />, title: 'Attracts new customers', text: 'Reach new audiences organically through strategic content & timing.' },
              { icon: <Clock className="w-5 h-5" />, title: 'Saves your time', text: 'We handle planning, creation & scheduling so you can focus on operations.' },
              { icon: <Heart className="w-5 h-5" />, title: 'Boosts engagement & trust', text: 'Timely responses & relevant content nurture loyal followers.' },
              { icon: <Sparkles className="w-5 h-5" />, title: 'Keeps brand active & relevant', text: 'Stay part of ongoing conversations and trends in your industry.' },
              { icon: <TrendingUp className="w-5 h-5" />, title: 'Supports long-term growth', text: 'Compounding visibility drives leads, referrals & retention over time.' }
            ].map((block, i) => (
              <div key={block.title} style={{ animationDelay: `${i * 90}ms` }} className="fade-up-on-scroll rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/70 p-6 flex gap-4 relative overflow-hidden">
                <div className="w-10 h-10 rounded-lg bg-[#FF2B2B]/10 flex items-center justify-center text-[#FF2B2B] flex-shrink-0">{block.icon}</div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-gray-900 dark:text-gray-100 tracking-tight">{block.title}</h4>
                  <p className="text-[12px] leading-relaxed text-gray-600 dark:text-gray-400">{block.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Feature Highlights Strip */}
        <section className="mb-24">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: <Repeat className="w-5 h-5" />, label: 'Flexible monthly subscription' },
              { icon: <MessageCircle className="w-5 h-5" />, label: 'WhatsApp support' },
              { icon: <Goal className="w-5 h-5" />, label: 'Custom strategy options' },
              { icon: <XCircle className="w-5 h-5" />, label: 'Cancel anytime' }
            ].map(item => (
              <div key={item.label} className="group flex items-center gap-3 bg-neutral-900/70 dark:bg-neutral-900/70 border border-neutral-800 dark:border-neutral-800 rounded-xl px-5 py-4 text-[13px] text-gray-200 dark:text-gray-300 shadow-sm backdrop-blur-sm relative overflow-hidden">
                <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-[#FF2B2B]/10 via-transparent to-transparent pointer-events-none" />
                <span className="text-[#FF2B2B] relative">{item.icon}</span>
                <span className="font-medium tracking-tight relative">{item.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Quick FAQ / Info Section */}
        <section className="mb-24 max-w-5xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">What’s Included?</h3>
          <div className="grid md:grid-cols-2 gap-8 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            <div className="space-y-6">
              <div>
                <p className="font-semibold text-gray-900 dark:text-gray-100 mb-1">Content Calendar</p>
                <p className="text-gray-600 dark:text-gray-400 text-[13px]">We plan posts ahead so you always know what’s coming and can align promotions.</p>
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-gray-100 mb-1">Post Scheduling</p>
                <p className="text-gray-600 dark:text-gray-400 text-[13px]">Consistent posting at optimal times for visibility & engagement.</p>
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <p className="font-semibold text-gray-900 dark:text-gray-100 mb-1">Monthly Insights</p>
                <p className="text-gray-600 dark:text-gray-400 text-[13px]">Simple performance summary: reach, engagement & growth indicators.</p>
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-gray-100 mb-1">Support Channels</p>
                <p className="text-gray-600 dark:text-gray-400 text-[13px]">Direct WhatsApp & email support for quick adjustments or campaigns.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Unified Footer CTA */}
        <section className="mt-12 mb-10">
          <div className="relative w-full rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-900/60 backdrop-blur-[2px] p-10 md:p-14 overflow-hidden">
            <div className="absolute inset-0 pointer-events-none opacity-60 bg-[radial-gradient(circle_at_85%_25%,rgba(255,43,43,0.18),transparent_60%)]" />
            <div className="absolute -left-1 top-0 bottom-0 w-1.5 rounded-r-xl bg-gradient-to-b from-[#FF2B2B] via-[#ff4d4d] to-[#FF2B2B]" />
            <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-10">
              <div className="max-w-2xl">
                <h3 className="text-2xl md:text-[1.75rem] font-extrabold tracking-tight text-gray-900 dark:text-white mb-4">Need a Custom Social Strategy?</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm md:text-[15px] leading-relaxed">If none of these plans quite fit (multi-location, launch campaigns, niche positioning)—we’ll shape a tailored monthly or sprint-style plan around your goals and resources.</p>
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
        </section>
      </div>
    </div>
  );
}
