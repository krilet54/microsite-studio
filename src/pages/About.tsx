import { Link } from 'react-router-dom';
import { Globe, Share2, Palette, CheckCircle, Target, Layers } from 'lucide-react';
import useRevealOnScroll from '../hooks/useRevealOnScroll';
import aboutLogo from '../assets/micrositeaboutlogo.png';
import { Helmet } from 'react-helmet-async';

export default function About() {
  useRevealOnScroll();

  const specialize = [
    {
      icon: <Globe className="w-8 h-8 text-[#FF2B2B]" />,
      title: 'Website Development',
      desc: 'Modern, responsive, conversion-focused sites for brands & professionals.',
      link: '/services/websites'
    },
    {
      icon: <Share2 className="w-8 h-8 text-[#FF2B2B]" />,
      title: 'Social Media Management',
      desc: 'Content, engagement and strategy to grow visibility & trust.',
      link: '/services/social-media'
    },
    {
      icon: <Palette className="w-8 h-8 text-[#FF2B2B]" />,
      title: 'Branding & Identity Design',
      desc: 'Logos, brand kits & visual systems that define consistent identity.',
      link: '/services/branding'
    }
  ];

  const whyPoints = [
    'Affordable, startup-friendly pricing',
    'Fast turnaround & reliable delivery',
    'Tailored for online visibility & branding',
    'Scalable services to support growth',
    'Dedicated support and updates'
  ];

  return (
    <div className="min-h-screen bg-neutral-950 text-white pt-24">
      <Helmet>
        <title>About Us | Microsite Studio</title>
        <meta name="description" content="Learn about Microsite Studio – affordable websites, social media and branding solutions helping Indian small businesses grow online." />
  <link rel="canonical" href="https://micro-site.studio/about" />
        <meta property="og:title" content="About Microsite Studio" />
        <meta property="og:description" content="Affordable digital services for small businesses: websites, social media, branding." />
  <meta property="og:url" content="https://micro-site.studio/about" />
  <meta property="og:image" content="https://micro-site.studio/micrositefavicon.png" />
      </Helmet>
      {/* HERO */}
      <section className="relative overflow-hidden py-24 fade-up-on-scroll">
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-950 to-black" />
        <div className="absolute -top-32 -left-24 w-[520px] h-[520px] bg-[#FF2B2B]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#FF2B2B]/5 rounded-full blur-2xl" />
        <div className="relative max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-6">About Microsite</h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">Empowering small businesses and startups with scalable digital solutions.</p>
        </div>
      </section>

      {/* WHO WE ARE */}
      <section className="py-24 bg-neutral-950 fade-up-on-scroll" style={{animationDelay:'80ms'}}>
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Who We Are</h2>
            <p className="text-gray-300 leading-relaxed text-[15px]">Microsite was created with one goal — to make digital branding and online presence accessible, affordable, and impactful for businesses of all sizes. We help startups, freelancers, and growing brands launch faster with smart design, strategic marketing, and tailored digital services.</p>
            <p className="text-gray-300 leading-relaxed text-[15px]">No jargon. No complexity. Just results-focused execution.</p>
          </div>
          {/* Logo Display */}
          <div className="flex md:justify-end">
            <div className="group relative w-full max-w-sm">
              {/* Decorative gradient ring */}
              <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-br from-[#FF2B2B]/40 via-transparent to-transparent opacity-80 blur-md group-hover:opacity-95 transition-opacity" />
              <div className="relative rounded-3xl bg-neutral-900/75 border border-neutral-800 backdrop-blur-sm p-4 sm:p-5 flex flex-col items-center shadow-[0_4px_26px_-8px_rgba(0,0,0,0.55)] group-hover:shadow-[0_8px_38px_-10px_rgba(255,43,43,0.28)] transition-shadow">
                <div className="relative w-full aspect-square flex items-center justify-center rounded-2xl overflow-hidden bg-white dark:bg-white/95">
                  <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_35%_35%,rgba(255,43,43,0.18),transparent_72%)] pointer-events-none" />
                  <img
                    src={aboutLogo}
                    alt="Microsite logo"
                    className="relative w-full h-full object-contain rounded-2xl p-3 sm:p-4"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="text-center mt-4 select-none">
                  <p className="text-[13px] font-semibold tracking-[0.08em] text-white leading-none">MICROSITE <span className="text-[#FF2B2B]">STUDIO</span></p>
                  <p className="text-[10px] uppercase tracking-[0.24em] text-[#FF2B2B]/90 font-medium mt-2">Ideas Into Impact</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT WE SPECIALIZE IN */}
      <section className="py-24 bg-neutral-900 fade-up-on-scroll" style={{animationDelay:'140ms'}}>
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white text-center mb-16">What We Specialize In</h2>
          <div className="grid md:grid-cols-3 gap-10">
            {specialize.map((s,i) => (
              <div key={s.title} style={{animationDelay:`${i*80}ms`}} className="fade-up-on-scroll group relative flex flex-col border border-neutral-800 rounded-2xl bg-neutral-950/60 p-8 transition-all hover:border-[#FF2B2B] hover:shadow-[0_4px_30px_-4px_rgba(255,43,43,0.25)]">
                <div className="w-14 h-14 rounded-xl bg-[#FF2B2B]/15 text-[#FF2B2B] flex items-center justify-center mb-6">
                  {s.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 tracking-tight">{s.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed flex-1">{s.desc}</p>
                <Link to={s.link} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#FF2B2B] hover:underline">
                  Explore Packages
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-24 bg-neutral-950 fade-up-on-scroll" style={{animationDelay:'200ms'}}>
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-center mb-14">Why Brands Choose Microsite</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 max-w-5xl mx-auto">
            {whyPoints.map(p => (
              <div key={p} className="flex items-start gap-3 text-sm text-gray-300 bg-neutral-900/70 rounded-xl p-5 border border-neutral-800">
                <CheckCircle className="w-5 h-5 text-[#FF2B2B] mt-[2px]" />
                <span>{p}</span>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link to="/services" className="inline-flex items-center gap-2 bg-[#FF2B2B] text-white px-8 py-4 rounded-xl font-semibold text-sm md:text-base hover:bg-red-600 transition-colors">
              View Our Services
            </Link>
          </div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="py-24 bg-neutral-900 fade-up-on-scroll" style={{animationDelay:'260ms'}}>
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16">
          <div>
            <h3 className="text-2xl font-bold flex items-center gap-2 mb-4"><Target className="w-6 h-6 text-[#FF2B2B]" /> Mission</h3>
            <p className="text-gray-300 text-[15px] leading-relaxed">To help businesses grow digitally with professional design and strategic online presence — without the usual high costs or complexity.</p>
          </div>
          <div>
            <h3 className="text-2xl font-bold flex items-center gap-2 mb-4"><Layers className="w-6 h-6 text-[#FF2B2B]" /> Vision</h3>
            <p className="text-gray-300 text-[15px] leading-relaxed">To be the go-to digital partner for small brands and emerging entrepreneurs worldwide.</p>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-28 bg-[#FF2B2B] text-white fade-up-on-scroll" style={{animationDelay:'320ms'}}>
        <div className="max-w-3xl mx-auto px-6 text-center space-y-8">
          <h2 className="text-4xl font-bold leading-tight">Let’s Build Your Brand</h2>
          <p className="text-white/90 text-lg">Pick a starting point and we’ll help you scale from there.</p>
          <div>
            <Link to="/services" className="inline-flex items-center gap-2 bg-white text-[#FF2B2B] px-10 py-4 rounded-xl font-bold text-base tracking-tight hover:bg-gray-100 transition-colors">
              Get Started
            </Link>
          </div>
        </div>
      </section>

      {/* Minimal Footer Pointer (re-uses main site footer if needed in layout) */}
    </div>
  );
}
