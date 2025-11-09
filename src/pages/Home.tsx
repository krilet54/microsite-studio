// CLEAN REWRITE STARTS HERE
import {
  Globe,
  Share2,
  Palette,
  CheckCircle,
  Layers,
  Headphones,
  MessageCircle,
  Phone,
  Mail,
  ArrowLeft,
  ArrowRight,
  Zap,
  Users,
  Target,
  BarChart3,
  Timer,
  Receipt,
  Gauge,
  Search,
  Rocket,
  Star,
  ShieldCheck
} from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import heroVideo from '../video1.mp4';
import websiteMockup from '../assets/websitemockup.png';
import carouselVideo from '../assets/Red and White Retro Collage Animated Carousel Content Mobile Video.mp4';
import brandKit1 from '../assets/brandkit1.png';

type HeroSnapshotMetric = {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  accent?: boolean;
};

type HeroSnapshot = {
  id: string;
  clientType: string;
  city: string;
  resultHighlight: string;
  timeframe: string;
  addOns: string;
  summary?: string;
  metrics: HeroSnapshotMetric[];
};

function AnimatedMetric({ value, prefix = '', suffix = '', decimals = 0, accent = false, animationKey }: HeroSnapshotMetric & { animationKey: number }) {
  const [displayValue, setDisplayValue] = useState(() => value);

  useEffect(() => {
    if (typeof window === 'undefined') {
      setDisplayValue(value);
      return;
    }

    let frame = 0;
    let start: number | null = null;
    const duration = 900;

    const animate = (timestamp: number) => {
      if (start === null) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const nextValue = value * eased;
      setDisplayValue(progress === 1 ? value : nextValue);
      if (progress < 1) {
        frame = window.requestAnimationFrame(animate);
      }
    };

    setDisplayValue(0);
    frame = window.requestAnimationFrame(animate);

    return () => window.cancelAnimationFrame(frame);
  }, [animationKey, value, decimals]);

  const formatted = (() => {
    const base = decimals > 0 ? displayValue.toFixed(decimals) : Math.round(displayValue).toString();
    return `${prefix}${base}${suffix ?? ''}`;
  })();

  return (
    <div className={`text-2xl font-black ${accent ? 'text-[#FF2B2B]' : 'text-gray-900 dark:text-white'}`}>
      {formatted}
    </div>
  );
}
// Seamless looping background video component (crossfades two instances to mask hard cut)
function SeamlessHeroVideo() {
  const v1Ref = useRef<HTMLVideoElement | null>(null);
  const v2Ref = useRef<HTMLVideoElement | null>(null);
  const activeRef = useRef<1 | 2>(1);
  const fadingRef = useRef(false);

  // Tunable values
  const fadeDuration = 1000; // ms for crossfade transition
  const overlap = 1200; // ms before end of active video to start the next

  useEffect(() => {
    const v1 = v1Ref.current;
    const v2 = v2Ref.current;
    if (!v1 || !v2) return;

    // Base setup
    [v1, v2].forEach(v => {
      v.muted = true;
      v.playsInline = true;
      v.loop = false; // we manually handle seamless loop logic
      v.preload = 'auto';
      v.style.position = 'absolute';
      v.style.inset = '0';
      v.style.width = '100%';
      v.style.height = '100%';
      v.style.objectFit = 'cover';
      v.style.transition = `opacity ${fadeDuration}ms linear`;
      v.style.opacity = '0';
      v.style.transform = 'scale(1.12)';
      v.style.transformOrigin = 'center';
      v.style.willChange = 'opacity, transform';
    });

    v1.style.opacity = '1';

    let cleanup: (() => void) | null = null;

    function attachTimeUpdate(video: HTMLVideoElement) {
      const handler = () => {
        if (fadingRef.current) return;
        if (!video.duration || isNaN(video.duration)) return;
        const remainingMs = (video.duration - video.currentTime) * 1000;
        if (remainingMs <= overlap) {
          startCrossfade();
        }
      };
      video.addEventListener('timeupdate', handler);
      cleanup = () => video.removeEventListener('timeupdate', handler);
    }

    function startCrossfade() {
      const fromVideo = activeRef.current === 1 ? v1 : v2;
      const toVideo = activeRef.current === 1 ? v2 : v1;
      if (!fromVideo || !toVideo) return; // safety guard
      fadingRef.current = true;
      toVideo.currentTime = 0;
      toVideo.play().catch(() => {});
      requestAnimationFrame(() => { // ensure style applied next frame
        if (toVideo && fromVideo) {
          toVideo.style.opacity = '1';
          fromVideo.style.opacity = '0';
        }
      });
      setTimeout(() => {
        activeRef.current = activeRef.current === 1 ? 2 : 1;
        fadingRef.current = false;
        cleanup?.();
        const current = activeRef.current === 1 ? v1 : v2;
        if (current) attachTimeUpdate(current);
      }, fadeDuration + 30);
    }

    // Start first video after metadata is available
    const startIfReady = () => {
      if (v1.readyState >= 2) {
        v1.play().catch(() => {});
        attachTimeUpdate(v1);
      } else {
        v1.addEventListener('loadeddata', () => {
          v1.play().catch(() => {});
          attachTimeUpdate(v1);
        }, { once: true });
      }
    };
    startIfReady();

    return () => {
      cleanup?.();
    };
  }, [fadeDuration, overlap]);

  return (
    <div className="absolute inset-0 z-0" aria-hidden="true">
      <div className="absolute inset-0 bg-black/40" />
      <video ref={v1Ref} src={heroVideo} playsInline muted preload="auto" />
      <video ref={v2Ref} src={heroVideo} playsInline muted preload="auto" />
      <div className="absolute inset-0 brightness-[0.75] contrast-[1.05] saturate-[1.15] mix-blend-normal" />
    </div>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const faqSchema = useMemo(() => ({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': [
      {
        '@type': 'Question',
        'name': 'Do I need to pay upfront for the ₹499 website?',
        'acceptedAnswer': { '@type': 'Answer', 'text': 'No. You only pay after the starter website is delivered and approved.' }
      },
      {
        '@type': 'Question',
        'name': 'How fast can you deliver the starter website?',
        'acceptedAnswer': { '@type': 'Answer', 'text': 'Typical delivery is 2–3 days after we receive your basic details and any assets.' }
      },
      {
        '@type': 'Question',
        'name': 'Can I upgrade later to a multi-page or e-commerce site?',
        'acceptedAnswer': { '@type': 'Answer', 'text': 'Yes. We structure the initial build so it can expand into multi‑page or e‑commerce without starting over.' }
      },
      {
        '@type': 'Question',
        'name': 'Do you also manage social media and branding?',
        'acceptedAnswer': { '@type': 'Answer', 'text': 'Yes. We offer social media management plans and branding & identity kits that integrate with your website growth.' }
      }
    ]
  }), []);
  // Removed svgRef (animated outline) per request to remove odd background shape.

  const heroSnapshots: HeroSnapshot[] = [
    {
      id: 'salon-pune',
      clientType: 'Salon',
      city: 'Pune',
      resultHighlight: '21 WhatsApp leads',
      timeframe: '30 days',
  addOns: 'Brand Kit + Funnel + SEO Copy',
      summary: 'Starter site replaced DM-only enquiries with a WhatsApp funnel the team can track.',
      metrics: [
        { label: 'Launch timeline', value: 6, suffix: ' days' },
        { label: 'Leads captured', value: 21, suffix: ' leads', accent: true }
      ]
    },
    {
      id: 'gaming-delhi',
      clientType: 'Gaming platform',
      city: 'Delhi',
      resultHighlight: '3.2× session time',
      timeframe: '45 days',
  addOns: 'Landing Page + UI Kit',
      summary: 'Growth landing page kept players engaged long enough to boost LTV.',
      metrics: [
        { label: 'Launch timeline', value: 12, suffix: ' days' },
        { label: 'Session lift', value: 3.2, decimals: 1, suffix: '× session time', accent: true }
      ]
    },
    {
      id: 'petshop-mumbai',
      clientType: 'Pet shop',
      city: 'Mumbai',
      resultHighlight: '2× conversions from Instagram bio',
      timeframe: '25 days',
  addOns: 'Starter Site + WhatsApp CTA',
      summary: 'Unified link-in-bio funnel doubled paid orders coming from Instagram.',
      metrics: [
        { label: 'Launch timeline', value: 5, suffix: ' days' },
        { label: 'Conversion lift', value: 2, suffix: '× conversions', accent: true }
      ]
    },
    {
      id: 'homechef-hyderabad',
      clientType: 'Home chef',
      city: 'Hyderabad',
      resultHighlight: '3× prepaid bookings',
      timeframe: '3 weeks',
  addOns: 'Menu Funnel + Copywriting',
      summary: 'Menu-first microsite made prepaid tasting slots the default.',
      metrics: [
        { label: 'Launch timeline', value: 7, suffix: ' days' },
        { label: 'Bookings growth', value: 3, suffix: '× bookings', accent: true }
      ]
    },
    {
      id: 'fitness-bengaluru',
      clientType: 'Fitness coach',
      city: 'Bengaluru',
      resultHighlight: '18 qualified calls',
      timeframe: '6 weeks',
  addOns: 'Growth Site + SEO Funnel',
      summary: 'SEO-first microsite and nurture flow filled the consult calendar.',
      metrics: [
        { label: 'Launch timeline', value: 8, suffix: ' days' },
        { label: 'Qualified calls', value: 18, suffix: ' calls', accent: true }
      ]
    }
  ];

  const heroBullets = [
    'Launch in 7 days or less (Starter plan)',
    'SEO-ready & mobile-first from day one',
    'Pro brand kit that looks bigger than your budget'
  ];

  const icpHighlights = [
    {
      icon: Users,
      title: 'Industries',
      description: 'Local services, clinics, home services, coaching, retail & D2C, restaurants/cafes.'
    },
    {
      icon: Target,
      title: 'Stage',
      description: 'Pre-launch, MVP, or growing teams who need consistent leads without the agency bloat.'
    },
    {
      icon: Globe,
      title: 'Geography',
      description: 'India-first with remote-friendly execution for clients worldwide.'
    },
    {
      icon: Layers,
      title: 'Size',
      description: 'Solo founders to lean teams of up to 50 people.'
    }
  ];

  const outcomeMetrics = [
    {
      icon: BarChart3,
      stat: '+42%',
      caption: 'Increase in website enquiries within 60 days',
      annotation: 'Starter plan rollouts · trailing 6 months'
    },
    {
      icon: Timer,
      stat: '7 days',
      caption: 'Average launch timeline for Starter websites',
      annotation: 'Kickoff call → go-live'
    },
    {
      icon: Zap,
      stat: '<2.0s',
      caption: 'Mobile page-load on standard 4G',
      annotation: 'Web Vitals performance baseline'
    },
    {
      icon: MessageCircle,
      stat: '30% lower',
      caption: 'Cost-per-lead achieved versus previous campaigns',
      annotation: 'Average savings across marketing budgets'
    }
  ];

  const storySnippets = [
    {
      title: 'Boutique salon launch',
      before: 'No website, enquiries only via Instagram DMs.',
      after: '1-page site + WhatsApp CTA → 21 leads in first 30 days.'
    },
    {
      title: 'Home chef collective',
      before: 'Menu stuck in PDFs and Google Forms.',
      after: 'Order-ready landing page → 3x more prepaid bookings.'
    },
    {
      title: 'Coaching startup',
      before: 'DIY site with slow load and no credibility cues.',
      after: 'SEO-first microsite → 18 qualified consult calls in 6 weeks.'
    }
  ];

  const whyChooseCards = [
    {
      icon: CheckCircle,
      title: 'Pay After Work Model',
      description: 'Zero risk. You pay only once your website is live and approved.'
    },
    {
      icon: Zap,
      title: 'Fast Delivery',
      description: 'Launch in 7 days—streamlined templates and zero agency delays.'
    },
    {
      icon: Layers,
      title: 'Complete Solutions',
      description: 'Add branding, copy, and social in the same ecosystem.'
    },
    {
      icon: Headphones,
      title: 'Long-Term Support',
      description: 'After launch, we maintain and grow your presence — includes 2 years of free maintenance.'
    },
    {
      icon: Receipt,
      title: 'Transparent Pricing',
      description: 'Every inclusion and add-on listed upfront. No hidden retainers.'
    },
    {
      icon: Gauge,
      title: 'Performance-First',
      description: 'Every site is speed-tested and SEO-ready by default.'
    }
  ];

  const processSteps = [
    {
      icon: MessageCircle,
      title: 'Kick-off Call',
      subTitle: '30 min alignment',
      description: 'Clarify goals, collect assets, and map funnels.'
    },
    {
      icon: Palette,
      title: 'Design & Copy Phase',
      subTitle: 'Days 1–3',
      description: 'We wireframe, write, and build your draft microsite.'
    },
    {
      icon: Search,
      title: 'Review & Revisions',
      subTitle: 'Days 4–6',
      description: 'Refine content, polish visuals, and run QA.'
    },
    {
      icon: Rocket,
      title: 'Go-Live & Pay',
      subTitle: 'Day 7',
      description: 'Launch, approval, and payment — plus post-launch checklist.'
    }
  ];

  const testimonials = [
    {
      quote: '“They built my website and I only paid after delivery. Smooth and quick.”',
      clientType: 'Website Client',
      rating: 4.8
    },
    {
      quote: '“My social media now looks professional and I see more enquiries.”',
      clientType: 'Social Media Client',
      rating: 4.9
    },
    {
      quote: '“Our new microsite plus WhatsApp funnel dropped ad costs and doubled qualified leads.”',
      clientType: 'Growth Plan Client',
      rating: 4.7
    }
  ];

  const quickStats = [
    { label: 'Average rating', value: '4.8★' },
    { label: 'Lower cost per lead', value: '30%↓ marketing CPL' },
    { label: 'Launch timeline', value: '7-day average' }
  ];

  const [activeSnapshot, setActiveSnapshot] = useState(0);
  const [snapshotPaused, setSnapshotPaused] = useState(false);
  const snapshotResumeTimeout = useRef<number | null>(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const formatMetricValue = (metric: HeroSnapshotMetric) => {
    const decimals = metric.decimals ?? 0;
    const base = decimals > 0 ? metric.value.toFixed(decimals) : Math.round(metric.value).toString();
    return `${metric.prefix ?? ''}${base}${metric.suffix ?? ''}`;
  };

  const handleSnapshotChange = (nextIndex: number, pause = true) => {
    setActiveSnapshot(() => {
      const total = heroSnapshots.length;
      if (total === 0) return 0;
      const normalized = ((nextIndex % total) + total) % total;
      return normalized;
    });

    if (!pause) return;

    setSnapshotPaused(true);
    if (snapshotResumeTimeout.current !== null) {
      window.clearTimeout(snapshotResumeTimeout.current);
    }
    snapshotResumeTimeout.current = window.setTimeout(() => {
      setSnapshotPaused(false);
      snapshotResumeTimeout.current = null;
    }, 8000);
  };

  useEffect(() => {
    if (typeof window === 'undefined' || heroSnapshots.length <= 1 || snapshotPaused) return;
    const id = window.setInterval(() => {
      setActiveSnapshot(prev => (prev + 1) % heroSnapshots.length);
    }, 5200);
    return () => window.clearInterval(id);
  }, [heroSnapshots.length, snapshotPaused]);

  useEffect(() => () => {
    if (snapshotResumeTimeout.current !== null) {
      window.clearTimeout(snapshotResumeTimeout.current);
    }
  }, []);

  useEffect(() => {
    if (testimonials.length <= 1 || typeof window === 'undefined') return;
    const id = window.setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % testimonials.length);
    }, 6500);
    return () => window.clearInterval(id);
  }, [testimonials.length]);

  // Handle smooth scroll when coming from navbar Contact (state-based) or hash
  useEffect(() => {
    const state: any = (location as any).state;
    const hashId = location.hash ? location.hash.substring(1) : null; // e.g. #contact -> contact
    const targetId: string | null = state?.scrollTo || hashId;
    if (targetId && ['contact', 'about'].includes(targetId)) {
      setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          if (targetId === 'contact') {
            el.classList.add('ring-temp-contact');
            setTimeout(() => el.classList.remove('ring-temp-contact'), 1200);
          }
        }
      }, 80);
    }
  }, [location]);

  return (
  <div className="min-h-screen bg-white dark:bg-neutral-950 transition-colors">
      <Helmet>
        <title>Microsite Studio | ₹499 Websites, Social Media & Branding</title>
        <meta name="description" content="Affordable ₹499 websites, social media management and branding kits for small businesses in India. Pay after delivery on eligible plans." />
  <link rel="canonical" href="https://micro-site.studio/" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Microsite Studio" />
        <meta property="og:title" content="Microsite Studio | ₹499 Websites, Social Media & Branding" />
        <meta property="og:description" content="Professional one-page websites from ₹499 plus branding & social media services. Pay only after delivery." />
  <meta property="og:url" content="https://micro-site.studio/" />
  <meta property="og:image" content="/og/home-default.jpg" />
  <meta property="og:image:alt" content="Microsite Studio digital services preview card" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Microsite Studio | ₹499 Websites, Social Media & Branding" />
        <meta name="twitter:description" content="Affordable websites & digital services. Pay after delivery." />
  <meta name="twitter:image" content="/og/home-default.jpg" />
  <meta name="twitter:image:alt" content="Microsite Studio digital services preview card" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>
      {/* Hero Section */}
  <section id="home" className="relative bg-gray-50 dark:bg-neutral-900 py-24 md:py-28 transition-colors overflow-hidden">
        {/* Background Video (z-0 so it sits above section background) */}
        <SeamlessHeroVideo />
  {/* Overlays above video for readability */}
  <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_30%_30%,rgba(255,43,43,0.22),transparent_60%)] dark:bg-[radial-gradient(circle_at_30%_30%,rgba(255,43,43,0.14),transparent_65%)] pointer-events-none" />
  <div className="absolute inset-0 z-20 bg-white/35 dark:bg-neutral-900/30 backdrop-blur-[2px] mix-blend-normal pointer-events-none" />
        <div className="max-w-6xl mx-auto px-6 relative z-30">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="space-y-6 text-left max-w-xl">
              <span className="inline-flex items-center rounded-full bg-white/80 dark:bg-neutral-900/80 px-4 py-1 text-sm font-semibold uppercase tracking-[0.22em] text-neutral-700 dark:text-neutral-300 shadow-sm">Microsite Studio</span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-gray-900 dark:text-white max-w-xl hero-fade-in">
                Affordable websites that win you customers.
              </h1>
              <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-200 leading-relaxed max-w-2xl hero-fade-in hero-delay-sm">
                We help small businesses and startups turn ideas into impact—fast websites, credible branding, and content that drives leads.
              </p>
              <ul className="grid gap-3 sm:gap-4 max-w-xl hero-fade-in hero-delay-md">
                {heroBullets.map(point => (
                  <li key={point} className="flex items-start gap-3 text-base sm:text-lg text-gray-800 dark:text-gray-200 leading-snug">
                    <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#FF2B2B]/10 text-[#FF2B2B]"><CheckCircle className="h-4 w-4" /></span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-col sm:flex-row gap-4 hero-fade-in hero-delay-lg">
                <button
                  onClick={() => navigate('/', { state: { scrollTo: 'contact' } })}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#FF2B2B] px-8 py-4 text-lg font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-red-600"
                  aria-label="Book a free 15 minute consultation"
                >
                  Get a free 15-min consult
                  <ArrowRight className="h-5 w-5" />
                </button>
                <button
                  onClick={() => navigate('/plans')}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-900 px-8 py-4 text-lg font-semibold text-gray-900 transition-all hover:-translate-y-0.5 hover:bg-gray-900 hover:text-white dark:border-neutral-200 dark:text-white dark:hover:bg-neutral-200 dark:hover:text-gray-900"
                  aria-label="See pricing for Microsite Studio plans"
                >
                  See pricing
                </button>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300 hero-fade-in hero-delay-xl">
                <CheckCircle className="h-4 w-4 text-[#FF2B2B]" />
                <span>No upfront fees — pay after delivery on eligible plans.</span>
              </div>
            </div>
            <div className="hidden lg:flex justify-end">
              <div
                className="relative w-full max-w-xl"
                onMouseEnter={() => setSnapshotPaused(true)}
                onMouseLeave={() => setSnapshotPaused(false)}
                onFocusCapture={() => setSnapshotPaused(true)}
                onBlurCapture={() => setSnapshotPaused(false)}
                aria-live="polite"
              >
                <div className="absolute -inset-6 bg-gradient-to-br from-[#FF2B2B]/15 via-transparent to-transparent blur-2xl" aria-hidden="true" />
                <div className="relative overflow-hidden rounded-3xl border border-white/40 shadow-2xl backdrop-blur-sm dark:border-neutral-700/60">
                  <button
                    type="button"
                    className="group absolute left-4 top-1/2 z-20 flex -translate-y-1/2 items-center justify-center rounded-full bg-white/85 p-2 text-gray-700 shadow-lg transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF2B2B] focus:ring-offset-2 focus:ring-offset-white dark:bg-neutral-900/80 dark:text-white dark:hover:bg-neutral-900 dark:focus:ring-offset-neutral-900"
                    onClick={() => handleSnapshotChange(activeSnapshot - 1)}
                    aria-label="Show previous snapshot"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    className="group absolute right-4 top-1/2 z-20 flex -translate-y-1/2 items-center justify-center rounded-full bg-white/85 p-2 text-gray-700 shadow-lg transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF2B2B] focus:ring-offset-2 focus:ring-offset-white dark:bg-neutral-900/80 dark:text-white dark:hover:bg-neutral-900 dark:focus:ring-offset-neutral-900"
                    onClick={() => handleSnapshotChange(activeSnapshot + 1)}
                    aria-label="Show next snapshot"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </button>
                  <div className="relative min-h-[460px] bg-white/85 dark:bg-neutral-900/80">
                    {heroSnapshots.map((snapshot, idx) => {
                      const isActive = idx === activeSnapshot;
                      return (
                        <article
                          key={snapshot.id}
                          className={`absolute inset-0 flex h-full flex-col justify-between p-8 pb-10 transition-all duration-[600ms] ease-out ${isActive ? 'opacity-100 translate-y-0' : 'pointer-events-none opacity-0 translate-y-6'}`}
                          aria-hidden={!isActive}
                        >
                          <div>
                            <div className="flex flex-wrap items-center justify-between gap-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#FF2B2B]">
                              <div className="flex items-center gap-3">
                                <span className="h-2 w-2 rounded-full bg-[#FF2B2B]" />
                                Recent launch snapshot
                              </div>
                              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-3 py-1 text-[10px] font-semibold tracking-[0.2em] text-emerald-600 dark:text-emerald-300">
                                <ShieldCheck className="h-3.5 w-3.5" />
                                Verified client result
                              </span>
                            </div>
                            <p className="mt-6 text-lg font-semibold text-gray-900 dark:text-white">
                              {`${snapshot.clientType} in ${snapshot.city} → ${snapshot.resultHighlight}`}
                            </p>
                            <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
                              {`${snapshot.resultHighlight} in ${snapshot.timeframe} | ${snapshot.addOns}`}
                            </p>
                          </div>
                          <div className="mt-8 grid grid-cols-2 gap-4 text-sm">
                            {snapshot.metrics.map(metric => (
                              <div key={`${snapshot.id}-${metric.label}`} className="rounded-xl border border-gray-200/70 bg-white/80 p-3 text-center shadow-sm dark:border-neutral-700 dark:bg-neutral-900/70">
                                {isActive ? (
                                  <AnimatedMetric {...metric} animationKey={activeSnapshot} />
                                ) : (
                                  <div className={`text-2xl font-black ${metric.accent ? 'text-[#FF2B2B]' : 'text-gray-900 dark:text-white'}`}>
                                    {formatMetricValue(metric)}
                                  </div>
                                )}
                                <div className="mt-1 text-xs uppercase tracking-[0.18em] text-gray-500 dark:text-gray-400">{metric.label}</div>
                              </div>
                            ))}
                          </div>
                          <div className="mt-8 rounded-2xl border border-dashed border-[#FF2B2B]/50 bg-[#FF2B2B]/5 px-5 py-4 text-sm text-[#FF2B2B] dark:text-rose-300">
                            {snapshot.summary ?? `Key add-ons: ${snapshot.addOns}`}
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-center gap-2">
                  {heroSnapshots.map((snapshot, idx) => (
                    <button
                      key={`dot-${snapshot.id}`}
                      type="button"
                      onClick={() => handleSnapshotChange(idx)}
                      onFocus={() => setSnapshotPaused(true)}
                      onBlur={() => setSnapshotPaused(false)}
                      className={`h-2.5 rounded-full transition-all duration-300 ${idx === activeSnapshot ? 'w-6 bg-[#FF2B2B]' : 'w-2.5 bg-gray-300/70 hover:bg-[#FF2B2B]/60 dark:bg-neutral-700'}`}
                      aria-label={`Show snapshot ${idx + 1}: ${snapshot.clientType} in ${snapshot.city}`}
                      aria-current={idx === activeSnapshot}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    {/* ICP Explainer */}
  <section id="about" className="py-20 bg-white dark:bg-neutral-950 transition-colors">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid gap-12 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] items-start">
            <div className="space-y-6">
              <span className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-4 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-gray-600 dark:bg-neutral-900 dark:text-neutral-300">Ideal customer profile</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">Who we’re perfect for</h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                If you need a credible online presence that converts—without agency bloat—we’ll get you live in days, not months. You stay focused on service delivery while we handle the build, branding, funnels, and launch checklist.
              </p>
              <div className="rounded-3xl border border-dashed border-[#FF2B2B]/50 bg-[#FF2B2B]/5 px-5 py-4 text-sm text-[#FF2B2B] dark:text-rose-300">
                India-first founders, consultants, clinics, educators, and hyperlocal retail love our pay-after-delivery model.
              </div>
            </div>
            <ul className="grid gap-5 sm:grid-cols-2">
              {icpHighlights.map(({ icon: Icon, title, description }) => (
                <li key={title} className="group flex flex-col gap-3 rounded-2xl border border-gray-200 bg-white/70 p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-900/80">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#FF2B2B]/10 text-[#FF2B2B] group-hover:bg-[#FF2B2B]/20">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{description}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Outcome Metrics Strip */}
      <section className="py-20 bg-neutral-900 text-white transition-colors">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl space-y-4">
              <h2 className="text-3xl sm:text-4xl font-bold text-white pb-1">Proof in performance</h2>
              <p className="mt-4 text-base text-neutral-300">
                What “credibility” looks like once our Starter and Growth sites go live.
              </p>
            </div>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {outcomeMetrics.map(({ icon: Icon, stat, caption, annotation }) => (
              <div key={caption} className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 shadow-lg transition hover:-translate-y-1 hover:bg-white/10">
                <div className="flex items-center gap-3 text-sm uppercase tracking-[0.28em] text-[#FF9AA0]">
                  <Icon className="h-5 w-5" />
                  Metric highlight
                </div>
                <div className="mt-6 text-4xl font-black text-white">{stat}</div>
                <p className="mt-3 text-base font-medium text-neutral-100">{caption}</p>
                <p className="mt-4 text-xs text-neutral-400">{annotation}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Before/After Snippets */}
      <section className="py-20 bg-white dark:bg-neutral-950 transition-colors">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-3xl space-y-4">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white pb-1">Before &amp; after snapshots</h2>
              <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">Real micro-transformations that help clients look bigger than their budget.</p>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Each go-live includes copy, design, lead funnels, and support.</div>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {storySnippets.map(snippet => (
              <div key={snippet.title} className="group flex h-full flex-col gap-5 rounded-3xl border border-gray-200 bg-white/90 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-900/85">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{snippet.title}</h3>
                <div className="grid flex-1 grid-rows-2 gap-4">
                  <div className="flex flex-col justify-between rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-4 text-sm text-gray-600 dark:border-neutral-700 dark:bg-neutral-900/70 dark:text-gray-300">
                    <span className="font-semibold uppercase tracking-[0.3em] text-gray-400 dark:text-gray-500">Before</span>
                    <p className="mt-2 leading-relaxed">{snippet.before}</p>
                  </div>
                  <div className="flex flex-col justify-between rounded-2xl border border-[#FF2B2B]/40 bg-[#FF2B2B]/10 p-4 text-sm text-gray-800 dark:border-rose-300/40 dark:bg-rose-300/15 dark:text-white">
                    <span className="font-semibold uppercase tracking-[0.3em] text-[#FF2B2B]">After</span>
                    <p className="mt-2 leading-relaxed">{snippet.after}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
  <section id="services" className="py-20 bg-gray-50 dark:bg-neutral-900 transition-colors">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white text-center mb-16">Our Services</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-neutral-950 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all border border-transparent dark:border-neutral-800">
              <div className="w-16 h-16 bg-[#FF2B2B] rounded-lg flex items-center justify-center mb-6"><Globe className="w-8 h-8 text-white" /></div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Websites</h3>
              <p className="text-[#FF2B2B] font-bold text-lg mb-4">Starting at ₹499</p>
              <ul className="text-gray-700 dark:text-gray-300 space-y-2 mb-6">
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#FF2B2B]" /> One-page professional website</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#FF2B2B]" /> Mobile responsive</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#FF2B2B]" /> Pay after delivery</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#FF2B2B]" /> Add-ons: hosting, domain, upgrades</li>
              </ul>
              <button onClick={() => navigate('/services/websites')} className="w-full bg-[#FF2B2B] text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors">Get Started</button>
            </div>
            <div className="bg-white dark:bg-neutral-950 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all border border-transparent dark:border-neutral-800">
              <div className="w-16 h-16 bg-[#FF2B2B] rounded-lg flex items-center justify-center mb-6"><Share2 className="w-8 h-8 text-white" /></div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Social Media Management</h3>
              <p className="text-[#FF2B2B] font-bold text-lg mb-4">Starting ₹1,000/month</p>
              <div className="text-gray-700 dark:text-gray-300 mb-6">
                <p className="font-semibold mb-2">Packages:</p>
                <ul className="space-y-1">
                  <li>• Starter</li>
                  <li>• Growth</li>
                  <li>• Premium</li>
                  <li>• Elite <span className="text-[#FF2B2B]">(includes free branding kit)</span></li>
                </ul>
              </div>
              <button onClick={() => navigate('/services/social-media')} className="w-full bg-[#FF2B2B] text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors">View Plans</button>
            </div>
            <div className="bg-white dark:bg-neutral-950 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all border border-transparent dark:border-neutral-800">
              <div className="w-16 h-16 bg-[#FF2B2B] rounded-lg flex items-center justify-center mb-6"><Palette className="w-8 h-8 text-white" /></div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Branding & Identity Kits</h3>
              <p className="text-[#FF2B2B] font-bold text-lg mb-4">Starting ₹899</p>
              <ul className="text-gray-700 dark:text-gray-300 space-y-2 mb-6">
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#FF2B2B]" /> Logo design</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#FF2B2B]" /> Color palette & fonts</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#FF2B2B]" /> Style guide</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#FF2B2B]" /> Templates & business cards</li>
              </ul>
              <button onClick={() => navigate('/services/branding')} className="w-full bg-[#FF2B2B] text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors">Get Branded</button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white dark:bg-neutral-950 transition-colors">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <span className="inline-flex items-center justify-center rounded-full bg-gray-100 px-5 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-gray-600 dark:bg-neutral-900 dark:text-neutral-300">
              Why choose Microsite
            </span>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white">Go live without the agency drag</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300">Every deliverable is focused on credibility, speed, and measurable results.</p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {whyChooseCards.map(({ icon: Icon, title, description }) => (
              <div key={title} className="group flex h-full flex-col gap-4 rounded-3xl border border-gray-200 bg-white/80 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-neutral-800 dark:bg-neutral-900/75">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FF2B2B]/10 text-[#FF2B2B] group-hover:bg-[#FF2B2B]/15">
                  <Icon className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h3>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section className="py-20 bg-gray-50 dark:bg-neutral-900 transition-colors">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <span className="inline-flex items-center justify-center rounded-full bg-white px-5 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-gray-600 dark:bg-neutral-800 dark:text-neutral-300">
              Process timeline
            </span>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white">From kick-off call to live site in 7 days</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300">Clear milestones so you always know what’s happening next.</p>
          </div>
          <div className="relative mt-16 hidden md:block">
            <div className="absolute left-[5%] right-[5%] top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-[#FF2B2B]/60 to-transparent" aria-hidden="true" />
          </div>
          <div className="mt-10 grid gap-10 md:grid-cols-4">
            {processSteps.map(({ icon: Icon, title, subTitle, description }, index) => (
              <div key={title} className="relative">
                <div className="flex flex-col gap-4 text-center md:text-left">
                  <span className="mx-auto md:mx-0 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FF2B2B]/10 text-[#FF2B2B] shadow-sm">
                    <Icon className="h-6 w-6" />
                  </span>
                  <div className="space-y-1">
                    <p className="text-xs font-semibold uppercase tracking-[0.35em] text-gray-500 dark:text-gray-400">Step {index + 1}</p>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h3>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{subTitle}</p>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof / Results Section */}
      <section className="py-24 bg-white dark:bg-neutral-950 transition-colors">
        <div className="max-w-6xl mx-auto px-6 space-y-16">
          <div className="flex flex-col gap-12 lg:flex-row">
            <div className="flex-1 space-y-6">
              <div className="space-y-3">
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white">Results that build trust</h2>
                <div className="flex items-center gap-2 text-[#FFB703] text-sm font-semibold">
                  <Star className="h-4 w-4 fill-current" />
                  4.8★ average rating from founders & operators
                </div>
              </div>
              <article className="rounded-3xl border border-gray-200 bg-white/80 p-8 shadow-md dark:border-neutral-800 dark:bg-neutral-900/80">
                <p className="text-lg text-gray-800 dark:text-gray-200 leading-relaxed">
                  {testimonials[activeTestimonial].quote}
                </p>
                <div className="mt-6 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.26em] text-gray-500 dark:text-gray-400">
                  <ShieldCheck className="h-4 w-4 text-[#FF2B2B]" />
                  {testimonials[activeTestimonial].clientType} · Verified
                </div>
              </article>
              <div className="flex items-center gap-3">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveTestimonial(idx)}
                    className={`h-3 w-8 rounded-full transition-all ${idx === activeTestimonial ? 'bg-[#FF2B2B]' : 'bg-gray-200 dark:bg-neutral-700'}`}
                    aria-label={`Show testimonial ${idx + 1}`}
                  />
                ))}
              </div>
              <Link to="/portfolio" className="inline-flex items-center gap-2 rounded-lg bg-[#FF2B2B] px-6 py-3 text-base font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-red-600" aria-label="View full portfolio of work">
                View full portfolio
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
            <div className="flex-1 grid gap-6 sm:grid-cols-3">
              <a
                href="https://four-paws-cat-boarding.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open live website example (opens in new tab)"
                className="group relative aspect-[4/5] overflow-hidden rounded-xl border border-gray-200 bg-neutral-100 shadow-sm transition-all duration-300 hover:scale-[1.03] hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-800"
              >
                <img
                  src={websiteMockup}
                  alt="Website mockup sample"
                  className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                <span className="absolute bottom-2 left-2 rounded bg-black/45 px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white">Website</span>
              </a>
              <div className="group relative aspect-[4/5] overflow-hidden rounded-xl border border-gray-200 bg-neutral-900 shadow-sm transition-all duration-300 hover:scale-[1.03] hover:shadow-lg dark:border-neutral-800">
                <video
                  src={carouselVideo}
                  className="h-full w-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  poster={websiteMockup}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />
                <span className="absolute bottom-2 left-2 rounded bg-black/45 px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white">Carousel</span>
              </div>
              <div className="group relative aspect-[4/5] overflow-hidden rounded-xl border border-gray-200 bg-neutral-100 shadow-sm transition-all duration-300 hover:scale-[1.03] hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-800">
                <img
                  src={brandKit1}
                  alt="Brand kit sample"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                <span className="absolute bottom-2 left-2 rounded bg-black/45 px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white">Brand Kit</span>
              </div>
            </div>
          </div>

          <div className="grid gap-4 rounded-3xl border border-neutral-200 bg-neutral-900 px-6 py-8 text-white shadow-lg dark:border-neutral-800">
            <div className="grid gap-4 sm:grid-cols-3">
              {quickStats.map(stat => (
                <div key={stat.label} className="rounded-2xl bg-white/10 p-4 text-center">
                  <div className="text-xl font-bold">{stat.value}</div>
                  <div className="mt-1 text-xs uppercase tracking-[0.25em] text-white/70">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#FF2B2B]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to take your business online?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/order/summary')}
              className="bg-white text-[#FF2B2B] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
              aria-label="Start your ₹499 website order"
            >
              Start Your ₹499 Website
            </button>
            <button
              onClick={() => navigate('/services/social-media')}
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-[#FF2B2B] transition-colors"
              aria-label="Go to social media management plans"
            >
              Get Social Media Managed
            </button>
          </div>
        </div>
      </section>

      {/* Contact */}
  <section id="contact" className="py-20 bg-white dark:bg-neutral-950 transition-colors">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white text-center mb-16 heading-shimmer">Get In Touch</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-center gap-4"><div className="w-12 h-12 bg-[#FF2B2B] rounded-lg flex items-center justify-center"><MessageCircle className="w-6 h-6 text-white" /></div><div><h3 className="font-semibold text-gray-900 dark:text-white">WhatsApp</h3><p className="text-gray-600 dark:text-gray-400">Quick responses on WhatsApp</p></div></div>
              <div className="flex items-center gap-4"><div className="w-12 h-12 bg-[#FF2B2B] rounded-lg flex items-center justify-center"><Phone className="w-6 h-6 text-white" /></div><div><h3 className="font-semibold text-gray-900 dark:text-white">Phone</h3><p className="text-gray-600 dark:text-gray-400">Call us for immediate assistance</p></div></div>
              <div className="flex items-center gap-4"><div className="w-12 h-12 bg-[#FF2B2B] rounded-lg flex items-center justify-center"><Mail className="w-6 h-6 text-white" /></div><div><h3 className="font-semibold text-gray-900 dark:text-white">Email</h3><p className="text-gray-600 dark:text-gray-400">Send us your requirements</p></div></div>
            </div>
            <div className="bg-gray-50 dark:bg-neutral-900 p-8 rounded-xl transition-colors">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Start Your Project</h3>
              <form className="space-y-4">
                <input type="text" placeholder="Your Name" className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-[#FF2B2B]" />
                <input type="email" placeholder="Email Address" className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-[#FF2B2B]" />
                <input type="tel" placeholder="Phone Number" className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-[#FF2B2B]" />
                <select className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-[#FF2B2B]">
                  <option>Select Service</option>
                  <option>Website (₹499)</option>
                  <option>Social Media Management</option>
                  <option>Branding & Identity</option>
                  <option>Complete Package</option>
                </select>
                <textarea rows={4} placeholder="Tell us about your business..." className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-[#FF2B2B]" />
                <button className="w-full bg-[#FF2B2B] text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50 dark:bg-neutral-900 transition-colors">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-10 text-center">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-8 text-sm text-gray-700 dark:text-gray-300">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Do I need to pay upfront for the ₹499 website?</h3>
              <p>No. You only pay after we deliver and you approve the starter website.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">How fast is delivery?</h3>
              <p>Usually 2–3 days once we have your details (name, business info, basic content).</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Can I upgrade later?</h3>
              <p>Yes—your one‑page build can expand into multi‑page or e‑commerce without a rebuild.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Do you handle branding & social?</h3>
              <p>Yes. We offer branding kits and social media management that plug into the same growth path.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Global footer now rendered via AppLayout */}
    </div>
  );
}