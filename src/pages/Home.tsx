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
  ArrowRight,
  Zap,
  Users,
  Target,
  BarChart3,
  Timer
} from 'lucide-react';
import { useEffect, useMemo, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import heroVideo from '../video1.mp4';
import websiteMockup from '../assets/websitemockup.png';
import carouselVideo from '../assets/Red and White Retro Collage Animated Carousel Content Mobile Video.mp4';
import brandKit1 from '../assets/brandkit1.png';

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
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-gray-900 dark:text-white max-w-xl">
                Affordable websites that win you customers.
              </h1>
              <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-200 leading-relaxed max-w-2xl">
                We help small businesses and startups turn ideas into impact—fast websites, credible branding, and content that drives leads.
              </p>
              <ul className="grid gap-3 sm:gap-4 max-w-xl">
                {heroBullets.map(point => (
                  <li key={point} className="flex items-start gap-3 text-base sm:text-lg text-gray-800 dark:text-gray-200 leading-snug">
                    <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#FF2B2B]/10 text-[#FF2B2B]"><CheckCircle className="h-4 w-4" /></span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-col sm:flex-row gap-4">
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
              <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                <CheckCircle className="h-4 w-4 text-[#FF2B2B]" />
                <span>No upfront fees — pay after delivery on eligible plans.</span>
              </div>
            </div>
            <div className="hidden lg:flex justify-end">
              <div className="relative w-full max-w-xl">
                <div className="absolute -inset-6 bg-gradient-to-br from-[#FF2B2B]/15 via-transparent to-transparent blur-2xl" aria-hidden="true" />
                <div className="relative overflow-hidden rounded-3xl border border-white/40 bg-white/85 p-8 shadow-2xl backdrop-blur-sm dark:border-neutral-700/60 dark:bg-neutral-900/80">
                  <div className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.24em] text-[#FF2B2B]">
                    <span className="h-2 w-2 rounded-full bg-[#FF2B2B]" />
                    Recent launch snapshot
                  </div>
                  <p className="mt-6 text-lg font-semibold text-gray-900 dark:text-white">Starter site → live in 6 days</p>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">Salon in Pune jumped from DM-only enquiries to 21 WhatsApp leads in the first month.</p>
                  <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
                    <div className="rounded-xl border border-gray-200/70 bg-white/80 p-3 text-center shadow-sm dark:border-neutral-700 dark:bg-neutral-900/70">
                      <div className="text-2xl font-black text-gray-900 dark:text-white">7 days</div>
                      <div className="mt-1 text-xs uppercase tracking-[0.18em] text-gray-500">Launch timeline</div>
                    </div>
                    <div className="rounded-xl border border-gray-200/70 bg-white/80 p-3 text-center shadow-sm dark:border-neutral-700 dark:bg-neutral-900/70">
                      <div className="text-2xl font-black text-[#FF2B2B]">21 leads</div>
                      <div className="mt-1 text-xs uppercase tracking-[0.18em] text-gray-500">First 30 days</div>
                    </div>
                  </div>
                  <div className="mt-6 rounded-2xl border border-dashed border-[#FF2B2B]/50 bg-[#FF2B2B]/5 px-5 py-4 text-sm text-[#FF2B2B] dark:text-rose-300">
                    Includes brand kit, WhatsApp funnel, and SEO-ready copywriting.
                  </div>
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
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white heading-shimmer">Who we’re perfect for</h2>
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
              <h2 className="text-3xl sm:text-4xl font-bold heading-shimmer text-white pb-1">Proof in performance</h2>
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
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white heading-shimmer pb-1">Before &amp; after snapshots</h2>
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
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white text-center mb-16 heading-shimmer">Our Services</h2>
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
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white text-center mb-16 heading-shimmer">Why Choose Microsite</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center"><div className="w-16 h-16 bg-[#FF2B2B] rounded-full flex items-center justify-center mx-auto mb-4"><CheckCircle className="w-8 h-8 text-white" /></div><h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Pay After Work Model</h3><p className="text-gray-600 dark:text-gray-400">₹499 Websites with zero upfront payment. You only pay after we deliver.</p></div>
            <div className="text-center"><div className="w-16 h-16 bg-[#FF2B2B] rounded-full flex items-center justify-center mx-auto mb-4"><Zap className="w-8 h-8 text-white" /></div><h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Fast Delivery</h3><p className="text-gray-600 dark:text-gray-400">Ready templates and streamlined process for quick turnaround times.</p></div>
            <div className="text-center"><div className="w-16 h-16 bg-[#FF2B2B] rounded-full flex items-center justify-center mx-auto mb-4"><Layers className="w-8 h-8 text-white" /></div><h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Complete Solutions</h3><p className="text-gray-600 dark:text-gray-400">Social media management and branding add-ons available.</p></div>
            <div className="text-center"><div className="w-16 h-16 bg-[#FF2B2B] rounded-full flex items-center justify-center mx-auto mb-4"><Headphones className="w-8 h-8 text-white" /></div><h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Long-Term Support</h3><p className="text-gray-600 dark:text-gray-400">Ongoing support plans to keep your business growing online.</p></div>
          </div>
        </div>
      </section>

      {/* Workflow */}
  <section className="py-20 bg-gray-50 dark:bg-neutral-900 transition-colors">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white text-center mb-16 heading-shimmer">How We Work</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[1,2,3,4].map(n => (
              <div key={n} className="text-center">
                <div className="w-16 h-16 bg-[#FF2B2B] rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">{n}</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{n===1?'Contact Us':n===2?'Share Your Details':n===3?'We Design & Deliver':'Pay After Completion'}</h3>
                <p className="text-gray-600 dark:text-gray-400">{n===1?'Reach out via WhatsApp, phone, or email to get started.':n===2?'Tell us about your business, requirements, and preferences.':n===3?'Our team creates your website and delivers it for review.':'Only pay once you\'re completely satisfied with the work.'}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof / Results Section */}
      <section className="py-24 bg-white dark:bg-neutral-950 transition-colors">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Quotes */}
            <div className="flex-1 space-y-8">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white heading-shimmer">Results That Build Trust</h2>
              <div className="space-y-6">
                <div className="p-6 rounded-xl border border-gray-200 dark:border-neutral-800 bg-gray-50 dark:bg-neutral-900 shadow-sm">
                  <p className="text-gray-700 dark:text-gray-300 italic leading-relaxed">“They built my website and I only paid after delivery. Smooth and quick.”</p>
                  <div className="mt-4 text-xs font-semibold text-[#FF2B2B]">Website Client</div>
                </div>
                <div className="p-6 rounded-xl border border-gray-200 dark:border-neutral-800 bg-gray-50 dark:bg-neutral-900 shadow-sm">
                  <p className="text-gray-700 dark:text-gray-300 italic leading-relaxed">“My social media now looks professional and I see more inquiries.”</p>
                  <div className="mt-4 text-xs font-semibold text-[#FF2B2B]">Social Media Client</div>
                </div>
              </div>
              <div>
                <Link to="/portfolio" className="inline-flex items-center gap-2 bg-[#FF2B2B] text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors shadow" aria-label="View full portfolio of work">
                  View Full Portfolio
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
            {/* Visual Thumbnails */}
            <div className="flex-1 grid sm:grid-cols-3 gap-6">
              {/* Website Mockup Image (clickable) */}
              <a
                href="https://four-paws-cat-boarding.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open live website example (opens in new tab)"
                className="group relative aspect-[4/5] rounded-xl border border-gray-200 dark:border-neutral-800 overflow-hidden bg-neutral-100 dark:bg-neutral-800 shadow-sm transition-all duration-300 hover:shadow-lg hover:scale-[1.05] focus:outline-none focus:ring-2 focus:ring-[#FF2B2B] focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-neutral-950"
              >
                <img
                  src={websiteMockup}
                  alt="Website mockup sample"
                  className="w-full h-full object-cover object-top group-hover:scale-[1.04] transition-transform duration-500"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-black/0 opacity-60 pointer-events-none" />
                <span className="absolute bottom-2 left-2 text-[11px] tracking-wide font-semibold uppercase text-white/85 bg-black/40 backdrop-blur-sm px-2 py-1 rounded">Website</span>
                <span className="sr-only">Opens external site in new tab</span>
              </a>
              {/* Carousel Video */}
              <div className="group relative aspect-[4/5] rounded-xl border border-gray-200 dark:border-neutral-800 overflow-hidden bg-neutral-900 shadow-sm transition-all duration-300 hover:shadow-lg hover:scale-[1.05]">
                <video
                  src={carouselVideo}
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  poster={websiteMockup}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />
                <span className="absolute bottom-2 left-2 text-[11px] tracking-wide font-semibold uppercase text-white/90 bg-black/45 backdrop-blur-sm px-2 py-1 rounded">Carousel</span>
              </div>
              {/* Brand Kit Image */}
              <div className="group relative aspect-[4/5] rounded-xl border border-gray-200 dark:border-neutral-800 overflow-hidden bg-neutral-100 dark:bg-neutral-800 shadow-sm transition-all duration-300 hover:shadow-lg hover:scale-[1.05]">
                <img
                  src={brandKit1}
                  alt="Brand kit sample"
                  className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/0 to-black/0 pointer-events-none" />
                <span className="absolute bottom-2 left-2 text-[11px] tracking-wide font-semibold uppercase text-white/85 bg-black/40 backdrop-blur-sm px-2 py-1 rounded">Brand Kit</span>
              </div>
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