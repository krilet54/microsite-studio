import { Globe, Share2, Palette, CheckCircle, X, ArrowLeft as ArrowL, ArrowRight as ArrowR } from 'lucide-react';
import mock1 from '../assets/mockup1.png';
import mock2 from '../assets/mockup2.png';
import mock3 from '../assets/mockup3.png';
import sm1 from '../assets/1.png';
import sm2 from '../assets/2.png';
import sm3 from '../assets/3.png';
import sm4 from '../assets/4.png';
import launchTeaser from '../assets/Launch teaser.mp4';
import seasonalPush from '../assets/Seasonal push.mp4';
import L1Logo from '../assets/L1.png';
import L2Logo from '../assets/L2.png';
import L3Logo from '../assets/L3.png';
import { useState, useEffect, useCallback, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

export default function Portfolio() {
  const navigate = useNavigate();
  // Social media showcase items
  const socialItems: Array<{
    type: 'image' | 'video';
    src: string;
    label: string;
    alt: string;
  }> = [
    { type: 'image', src: sm1, label: 'Restaurant branding', alt: 'Restaurant branding carousel graphic' },
    { type: 'image', src: sm2, label: 'Coaching page growth', alt: 'Coaching page growth social post' },
    { type: 'image', src: sm3, label: 'Local salon promos', alt: 'Local salon promotional design' },
    { type: 'image', src: sm4, label: 'Festive campaign', alt: 'Festive campaign creative' },
    { type: 'video', src: launchTeaser, label: 'Launch teaser', alt: 'Launch teaser animation' },
    { type: 'video', src: seasonalPush, label: 'Seasonal push', alt: 'Seasonal push animation' }
  ];

  // Branding kits data
  const brandKits: Array<{
    id: string;
    name: string;
    logo: string;
    alt: string;
    palette: string[];
    tags: string[];
    description: string;
    preview: {
      headline: string;
      body: string;
      bg: string;
      headlineColor: string;
      bodyColor: string;
      accent: string;
    };
  }> = [
    {
      id: 'L1',
      name: 'Brand Kit L1',
      logo: L1Logo,
      alt: 'L1 brand primary logo',
      // Ascend Global corporate palette (moved from L2 per correction)
      palette: ['#0E304A','#1E5178','#3073A4','#B4B8BC','#FFFFFF'],
      tags: ['Logo','Palette','Typography','Corporate'],
      description: 'Professional corporate identity using deep navy foundation, ascending blues for momentum, and refined silvery neutral support.',
      preview: {
        headline: 'Strategic. Global. Ascending.',
        body: 'Tiered blues communicate trust and forward motion while the silver neutral adds an innovative, precision feel.',
        bg: '#FFFFFF',
        headlineColor: '#0E304A',
        bodyColor: '#1E5178',
        accent: '#3073A4'
      }
    },
    {
      id: 'L2',
      name: 'Brand Kit L2',
      logo: L2Logo,
      alt: 'L2 brand primary logo',
      // Reverted to previous green/gold craft-oriented palette
      palette: ['#0F5132','#D4A347','#F2EEDF','#1C7B52','#7F5B24'],
      tags: ['Logo','Palette','Typography','Social Skins'],
      description: 'Clean, professional tone with cool depth hues and adaptive social media cover & story skins.',
      preview: {
        headline: 'Clear. Dependable. Modern.',
        body: 'Structured greens and warm metallic accent convey craft & authenticity with natural balance.',
        bg: '#F2EEDF',
        headlineColor: '#0F5132',
        bodyColor: '#1C7B52',
        accent: '#D4A347'
      }
    },
    {
      id: 'L3',
      name: 'Brand Kit L3',
      logo: L3Logo,
      alt: 'L3 brand primary logo',
      palette: ['#0F7F82','#F29F2D','#F5F2EB','#9CDAD9','#075055'],
      tags: ['Logo','Palette','Typography','Mockups'],
      description: 'Vibrant gradient-friendly system leveraging teal energy with warm accent and soft neutrals.',
      preview: {
        headline: 'Expressive. Energetic. Caring.',
        body: 'Teal core with warm orange accent creates optimism; neutral canvas supports legibility for pet-friendly tone.',
        bg: '#F5F2EB',
        headlineColor: '#075055',
        bodyColor: '#0F7F82',
        accent: '#F29F2D'
      }
    }
  ];

  // State for modals
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null); // social media
  const [openBrandKit, setOpenBrandKit] = useState<number | null>(null); // brand kit detail
  const isSocialOpen = lightboxIndex !== null;
  const isBrandKitOpen = openBrandKit !== null;
  const isAnyModalOpen = isSocialOpen || isBrandKitOpen;

  const close = useCallback(() => { setLightboxIndex(null); setOpenBrandKit(null); }, []);
  const showPrev = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((i) => (i! - 1 + socialItems.length) % socialItems.length);
  }, [lightboxIndex, socialItems.length]);
  const showNext = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((i) => (i! + 1) % socialItems.length);
  }, [lightboxIndex, socialItems.length]);

  const showPrevBrandKit = useCallback(() => {
    if (openBrandKit === null) return;
    setOpenBrandKit(i => (i! - 1 + brandKits.length) % brandKits.length);
  }, [openBrandKit, brandKits.length]);
  const showNextBrandKit = useCallback(() => {
    if (openBrandKit === null) return;
    setOpenBrandKit(i => (i! + 1) % brandKits.length);
  }, [openBrandKit, brandKits.length]);

  // Keyboard handlers
  useEffect(() => {
    if (!isAnyModalOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowLeft') { if (isSocialOpen) showPrev(); else if (isBrandKitOpen) showPrevBrandKit(); }
      else if (e.key === 'ArrowRight') { if (isSocialOpen) showNext(); else if (isBrandKitOpen) showNextBrandKit(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isAnyModalOpen, close, showPrev, showNext, showPrevBrandKit, showNextBrandKit, isSocialOpen, isBrandKitOpen]);

  // Prevent body scroll when open
  useEffect(() => {
    if (isAnyModalOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = prev; };
    }
  }, [isAnyModalOpen]);

  // Touch / swipe support (mobile)
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const swipeThreshold = 50; // px

  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touchStartX.current = t.clientX;
    touchStartY.current = t.clientY;
  };

  const handleSwipe = (endX: number, endY: number, context: 'social' | 'brand') => {
    if (touchStartX.current == null || touchStartY.current == null) return;
    const dx = endX - touchStartX.current;
    const dy = endY - touchStartY.current;
    // Ignore mostly vertical swipes
    if (Math.abs(dy) > Math.abs(dx)) return;
    if (Math.abs(dx) < swipeThreshold) return;
    if (dx < 0) {
      // swipe left -> next
      context === 'social' ? showNext() : showNextBrandKit();
    } else {
      // swipe right -> prev
      context === 'social' ? showPrev() : showPrevBrandKit();
    }
  };

  const onTouchEndSocial = (e: React.TouchEvent) => {
    const t = e.changedTouches[0];
    handleSwipe(t.clientX, t.clientY, 'social');
    touchStartX.current = null; touchStartY.current = null;
  };
  const onTouchEndBrand = (e: React.TouchEvent) => {
    const t = e.changedTouches[0];
    handleSwipe(t.clientX, t.clientY, 'brand');
    touchStartX.current = null; touchStartY.current = null;
  };

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 transition-colors">
      <Helmet>
        <title>Portfolio | Microsite Studio</title>
        <meta name="description" content="Sample website projects, social media creatives, and branding kits delivered by Microsite Studio for Indian small businesses." />
        <link rel="canonical" href="https://www.micro-site.studio/portfolio" />
        <meta property="og:title" content="Portfolio | Microsite Studio" />
        <meta property="og:description" content="Web, social media and branding work examples." />
        <meta property="og:url" content="https://www.micro-site.studio/portfolio" />
        <meta property="og:image" content="https://www.micro-site.studio/micrositefavicon.png" />
      </Helmet>
      {/* Header */}
      <section className="py-20 bg-gray-50 dark:bg-neutral-900 transition-colors">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">Portfolio & Results</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">A glimpse of what we’ve delivered for businesses like yours.</p>
        </div>
      </section>

      {/* Websites Section */}
      <section className="py-20 bg-white dark:bg-neutral-950 transition-colors">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-10">Website Work</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[{
              img: mock1,
              href: 'https://laviedaviepetocare.vercel.app/',
              alt: 'La Vie Davie Pet Care website screenshot',
              title: 'Pet Care Business Landing Page'
            },{
              img: mock2,
              href: 'https://four-paws-cat-boarding.vercel.app/',
              alt: 'Four Paws Cat Boarding website screenshot',
              title: 'Cat Boarding Service Site'
            },{
              img: mock3,
              href: 'https://spike-point.vercel.app/',
              alt: 'Spike Point website screenshot',
              title: 'Local Utility / Service Page'
            }].map(item => (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group border border-gray-200 dark:border-neutral-800 rounded-xl overflow-hidden bg-white dark:bg-neutral-900 shadow-sm hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-[#FF2B2B] focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-neutral-950"
                aria-label={`Open ${item.title}`}
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={item.img}
                    alt={item.alt}
                    className="w-full h-full object-cover object-top transition-transform duration-[900ms] group-hover:scale-[1.04]"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-transparent opacity-60 group-hover:opacity-70 transition-opacity" />
                  <span className="absolute bottom-2 left-2 text-[10px] font-semibold tracking-wide bg-black/45 backdrop-blur-sm text-white px-2 py-1 rounded uppercase">Live Site</span>
                </div>
                <div className="p-5 space-y-2">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100 line-clamp-1">{item.title}</p>
                  <p className="text-xs text-[#FF2B2B] font-semibold">Delivered under ₹499 model</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Social Media Projects */}
      <section className="py-20 bg-gray-50 dark:bg-neutral-900 transition-colors">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-10">Social Media Projects</h2>
          <div className="-mx-6 px-6 md:mx-0 md:px-0 overflow-x-auto md:overflow-visible scrollbar-thin scrollbar-track-transparent scrollbar-thumb-neutral-300 dark:scrollbar-thumb-neutral-700">
            <div className="flex gap-5 md:grid md:grid-cols-6 md:gap-6 min-w-max md:min-w-0">
              {socialItems.map((item, i) => (
                <button
                  key={i}
                  onClick={() => setLightboxIndex(i)}
                  className="w-48 md:w-auto flex-shrink-0 md:flex-shrink rounded-xl overflow-hidden border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm transition-all duration-300 hover:shadow-lg hover:scale-[1.04] hover:opacity-95 group focus:outline-none focus:ring-2 focus:ring-[#FF2B2B] focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-neutral-950"
                  aria-label={`Open ${item.label} ${item.type === 'image' ? 'carousel image' : 'reel'} in viewer`}
                >
                  <div className="relative aspect-square overflow-hidden w-full">
                    {item.type === 'image' ? (
                      <img
                        src={item.src}
                        alt={item.alt}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.05]"
                      />
                    ) : (
                      <video
                        src={item.src}
                        className="w-full h-full object-cover"
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="metadata"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-transparent opacity-60 group-hover:opacity-70 transition-opacity" />
                    <span className="absolute bottom-1.5 left-1.5 text-[9px] font-semibold tracking-wide bg-black/45 backdrop-blur-sm text-white px-1.5 py-0.5 rounded uppercase">
                      {item.type === 'image' ? 'Carousel' : 'Reel'}
                    </span>
                  </div>
                  <div className="p-3 w-full text-left">
                    <p className="text-xs font-medium text-gray-800 dark:text-gray-200 line-clamp-2">{item.label}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Social Media Lightbox Modal */}
      {isSocialOpen && lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-sm animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-label={socialItems[lightboxIndex].label}
          onClick={(e) => { if (e.target === e.currentTarget) close(); }}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEndSocial}
        >
          <div className="absolute inset-0 pointer-events-none select-none bg-[radial-gradient(circle_at_50%_50%,rgba(255,43,43,0.18),transparent_70%)]" />
          <div className="relative max-w-4xl w-full">
            <div className="relative rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800 shadow-2xl">
              <div className="relative flex items-center justify-center bg-black p-4 max-h-[80vh]">
                {socialItems[lightboxIndex].type === 'image' ? (
                  <img
                    src={socialItems[lightboxIndex].src}
                    alt={socialItems[lightboxIndex].alt}
                    className="max-h-[72vh] max-w-full object-contain"
                  />
                ) : (
                  <video
                    src={socialItems[lightboxIndex].src}
                    className="max-h-[72vh] max-w-full object-contain"
                    controls
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                )}
              </div>
              <div className="flex items-center justify-between px-5 py-3 bg-neutral-950/80 backdrop-blur border-t border-neutral-800">
                <p className="text-sm font-medium text-white pr-4 line-clamp-1">{socialItems[lightboxIndex].label}</p>
                <div className="flex items-center gap-2">
                  <button onClick={showPrev} aria-label="Previous" className="p-2 rounded-md bg-neutral-800 hover:bg-neutral-700 text-gray-200 transition-colors">
                    <ArrowL className="w-4 h-4" />
                  </button>
                  <button onClick={showNext} aria-label="Next" className="p-2 rounded-md bg-neutral-800 hover:bg-neutral-700 text-gray-200 transition-colors">
                    <ArrowR className="w-4 h-4" />
                  </button>
                  <button onClick={close} aria-label="Close" className="p-2 rounded-md bg-[#FF2B2B] hover:bg-red-600 text-white transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-10 left-0 right-0 flex items-center justify-center gap-1" aria-hidden="true">
              {socialItems.map((_, idx) => (
                <span
                  key={idx}
                  className={`h-1.5 w-6 rounded-full transition-all ${idx === lightboxIndex ? 'bg-[#FF2B2B]' : 'bg-neutral-600'}`}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Branding Kits */}
      <section className="py-20 bg-white dark:bg-neutral-950 transition-colors">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-10">Branding Kits</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {brandKits.map((kit, idx) => (
              <button
                key={kit.id}
                onClick={() => setOpenBrandKit(idx)}
                className="text-left group rounded-2xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 space-y-5 shadow-sm hover:shadow-lg hover:border-[#FF2B2B]/50 transition-all relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-[#FF2B2B] focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-neutral-950"
                aria-label={`Open detailed view for ${kit.name}`}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-[radial-gradient(circle_at_70%_20%,rgba(255,43,43,0.12),transparent_70%)]" />
                <div className="flex items-center gap-4 relative z-10">
                  <div className="w-20 h-20 rounded-xl bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 flex items-center justify-center overflow-hidden shadow-sm">
                    <img src={kit.logo} alt={kit.alt} className="w-full h-full object-cover" loading="lazy" decoding="async" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white leading-tight">{kit.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Delivered under Premium Kit</p>
                  </div>
                </div>
                <div className="grid grid-cols-5 gap-2 relative z-10">
                  {kit.palette.map(c => (
                    <div
                      key={c}
                      className="h-10 rounded-md border border-black/5 dark:border-white/10 flex items-end justify-start p-1"
                      style={{background:c}}
                    >
                      <span className="text-[8px] font-semibold mix-blend-difference text-white/90 leading-none drop-shadow">
                        {c.replace('#','')}
                      </span>
                    </div>
                  ))}
                </div>
                {/* Removed tag chips under logo per refinement */}
                <div className="relative z-10 flex items-center gap-2 pt-1">
                  <div className="h-1 w-8 rounded-full bg-gradient-to-r from-[#FF2B2B] to-transparent group-hover:w-12 transition-all" />
                  <span className="text-[10px] uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold">Professional Kit</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Kit Modal */}
      {isBrandKitOpen && openBrandKit !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-sm animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-label={brandKits[openBrandKit].name}
          onClick={(e) => { if (e.target === e.currentTarget) close(); }}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEndBrand}
        >
          <div className="absolute inset-0 pointer-events-none select-none bg-[radial-gradient(circle_at_40%_30%,rgba(255,43,43,0.20),transparent_75%)]" />
          <div className="relative max-w-5xl w-full">
            <div className="relative rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800 shadow-2xl">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="p-8 flex flex-col items-center justify-center bg-neutral-950 md:border-r border-neutral-800">
                  <div className="w-64 h-64 rounded-2xl bg-white dark:bg-neutral-800 border border-neutral-300/40 dark:border-neutral-700 flex items-center justify-center overflow-hidden shadow-inner mb-2">
                    <img src={brandKits[openBrandKit].logo} alt={brandKits[openBrandKit].alt} className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className="p-8 space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-1">{brandKits[openBrandKit].name}</h3>
                    <p className="text-sm text-gray-300 leading-relaxed">{brandKits[openBrandKit].description}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-3">Core Palette</p>
                    <div className="grid grid-cols-5 gap-3">
                      {brandKits[openBrandKit].palette.map(c => (
                        <div key={c} className="relative h-16 rounded-xl border border-white/10 overflow-hidden flex items-end justify-start p-2" style={{background:c}}>
                          <span className="text-[10px] font-semibold mix-blend-difference text-white/90 drop-shadow tracking-wide">{c}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold">Preview</p>
                    <div
                      className="rounded-xl p-4 space-y-2 border shadow-sm"
                      style={{
                        background: brandKits[openBrandKit].preview.bg,
                        borderColor: brandKits[openBrandKit].preview.accent
                      }}
                    >
                      <p
                        className="font-semibold text-lg tracking-tight"
                        style={{color: brandKits[openBrandKit].preview.headlineColor}}
                      >
                        {brandKits[openBrandKit].preview.headline}
                      </p>
                      <p
                        className="text-xs leading-relaxed"
                        style={{color: brandKits[openBrandKit].preview.bodyColor}}
                      >
                        {brandKits[openBrandKit].preview.body}
                      </p>
                      <div
                        className="h-1 w-20 rounded-full"
                        style={{background: brandKits[openBrandKit].preview.accent}}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between px-5 py-3 bg-neutral-950/80 backdrop-blur border-t border-neutral-800">
                <p className="text-sm font-medium text-white pr-4 line-clamp-1">{brandKits[openBrandKit].name}</p>
                <div className="flex items-center gap-2">
                  <button onClick={showPrevBrandKit} aria-label="Previous brand kit" className="p-2 rounded-md bg-neutral-800 hover:bg-neutral-700 text-gray-200 transition-colors">
                    <ArrowL className="w-4 h-4" />
                  </button>
                  <button onClick={showNextBrandKit} aria-label="Next brand kit" className="p-2 rounded-md bg-neutral-800 hover:bg-neutral-700 text-gray-200 transition-colors">
                    <ArrowR className="w-4 h-4" />
                  </button>
                  <button onClick={close} aria-label="Close" className="p-2 rounded-md bg-[#FF2B2B] hover:bg-red-600 text-white transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-10 left-0 right-0 flex items-center justify-center gap-1" aria-hidden="true">
              {brandKits.map((_, idx) => (
                <span key={idx} className={`h-1.5 w-6 rounded-full transition-all ${idx === openBrandKit ? 'bg-[#FF2B2B]' : 'bg-neutral-600'}`} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Testimonials */}
      <section className="py-20 bg-gray-50 dark:bg-neutral-900 transition-colors">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-10">Testimonials</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: '“I didn’t expect professional work at this price. Worth it.”',
                name: 'Ananya Sharma',
                city: 'Mumbai'
              },
              {
                quote: '“Their team handled everything after just one call.”',
                name: 'Rahul Mehta',
                city: 'Bengaluru'
              },
              {
                quote: '“Fast delivery and no upfront payment made it easy to start.”',
                name: 'Priya Nair',
                city: 'Kochi'
              }
            ].map((t, i) => (
              <div key={i} className="relative p-6 rounded-xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm">
                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{t.quote}</p>
                <div className="mt-4 text-[11px] font-semibold tracking-wide text-[#FF2B2B]">
                  {t.name} <span className="text-gray-400 dark:text-gray-500 font-medium">· {t.city}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Snapshot */}
      <section className="py-20 bg-white dark:bg-neutral-950 transition-colors">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-12">Impact Snapshot</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center p-6 rounded-xl bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800">
              <Globe className="w-8 h-8 mx-auto text-[#FF2B2B] mb-3" />
              <p className="text-3xl font-bold text-gray-900 dark:text-white">10+</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Websites Delivered</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800">
              <Share2 className="w-8 h-8 mx-auto text-[#FF2B2B] mb-3" />
              <p className="text-3xl font-bold text-gray-900 dark:text-white">Social</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Media Clients Onboarded</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800">
              <Palette className="w-8 h-8 mx-auto text-[#FF2B2B] mb-3" />
              <p className="text-3xl font-bold text-gray-900 dark:text-white">Brand</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Branding Kits Completed</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800">
              <CheckCircle className="w-8 h-8 mx-auto text-[#FF2B2B] mb-3" />
              <p className="text-3xl font-bold text-gray-900 dark:text-white">Trusted</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Pay-after-delivery Model</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-[#FF2B2B] text-white">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
          <h2 className="text-4xl font-bold leading-tight">Want to be our next success story?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/services/websites')}
              className="bg-white text-[#FF2B2B] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-white/70 focus:ring-offset-2 focus:ring-offset-[#FF2B2B]"
              aria-label="View website packages"
            >
              Get a Website for ₹499
            </button>
            <button
              onClick={() => navigate('/services/social-media')}
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-[#FF2B2B] transition-colors focus:outline-none focus:ring-2 focus:ring-white/70 focus:ring-offset-2 focus:ring-offset-[#FF2B2B]"
              aria-label="View social media management plans"
            >
              Start Social Media Management
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
