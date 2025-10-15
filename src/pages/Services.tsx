import React from 'react';
import { Link } from 'react-router-dom';
import { Share2, Globe, Palette, CheckCircle, ArrowRight } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

/**
 * Services Overview Page
 * Redesigned to visually align with `Plans` and `Portfolio` pages:
 * - Hero section with centered heading & subline (matching spacing + typography)
 * - Service offerings presented as three feature cards (grid, equal height, hover state)
 * - Alternating neutral backgrounds for visual rhythm (white / gray-50 like other pages)
 * - Consistent button variants (primary solid + outline variant pattern reused)
 * - "Why Choose" value grid styled similar to stat/info sections used elsewhere
 * - Final red CTA block matching Plans & Portfolio endings
 */
export default function Services() {
  const services = [
    {
      key: 'web',
      title: 'Website Packages',
      priceHint: 'Starting ₹499',
      desc: 'Fast, mobile-friendly websites built for credibility and conversion—landing pages, business sites, and e‑commerce foundations.',
      bullets: ['Mobile responsive', 'Custom layout', 'SEO ready', 'Fast delivery'],
      icon: <Globe className="w-8 h-8 text-[#FF2B2B]" />,
      link: '/services/websites',
      badge: 'Popular'
    },
    {
      key: 'social',
      title: 'Social Media Management',
      priceHint: 'From ₹1,000/mo',
      desc: 'Consistent posting, engagement support, branded creatives, and growth tracking across key platforms.',
      bullets: ['Branded posts', 'Engagement replies', 'Platform strategy', 'Performance insights'],
      icon: <Share2 className="w-8 h-8 text-[#FF2B2B]" />,
      link: '/services/social-media'
    },
    {
      key: 'branding',
      title: 'Branding & Identity Kits',
      priceHint: 'Kits from ₹899',
      desc: 'Logos, color systems, typography, and ready-to-use templates that create a consistent, memorable identity.',
      bullets: ['Logo design', 'Color palette', 'Typography set', 'Social templates'],
      icon: <Palette className="w-8 h-8 text-[#FF2B2B]" />,
      link: '/services/branding'
    }
  ];

  const valuePoints = [
    'Pay-after-delivery options',
    'Startup-friendly pricing',
    'Modern clean aesthetics',
    'Built for trust & growth'
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 transition-colors">
      <Helmet>
        <title>Services | Microsite Studio</title>
        <meta name="description" content="Websites, social media management and branding services built for small business growth. Explore our core digital service areas." />
        <link rel="canonical" href="https://www.micro-site.studio/services" />
        <meta property="og:title" content="Services | Microsite Studio" />
        <meta property="og:description" content="Affordable websites, social media and branding solutions in India." />
        <meta property="og:url" content="https://www.micro-site.studio/services" />
        <meta property="og:image" content="https://www.micro-site.studio/micrositefavicon.png" />
      </Helmet>
      {/* Hero */}
      <section className="py-20 bg-gray-50 dark:bg-neutral-900 transition-colors">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-black text-gray-900 dark:text-white mb-6">Our Services</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Websites, social media, and branding—executed with clarity, speed, and measurable value.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white dark:bg-neutral-950 transition-colors">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white text-center mb-16">What We Do</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map(s => (
              <div
                key={s.key}
                className={`relative bg-white dark:bg-neutral-950 border-2 p-8 rounded-xl transition-all duration-300 flex flex-col will-change-transform ${
                  s.badge
                    ? 'border-[#FF2B2B] dark:border-[#FF2B2B] hover:shadow-lg hover:shadow-[#FF2B2B]/20'
                    : 'border-gray-200 dark:border-neutral-800 hover:border-[#FF2B2B] hover:shadow-lg hover:shadow-[#FF2B2B]/15'
                } hover:-translate-y-1 hover:scale-[1.015]`}
              >
                {s.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-[#FF2B2B] text-white px-4 py-2 rounded-full text-sm font-semibold">{s.badge}</span>
                  </div>
                )}
                <div className={`w-16 h-16 rounded-lg flex items-center justify-center mb-6 ${s.badge ? 'bg-[#FF2B2B]' : 'bg-gray-100 dark:bg-neutral-900'}`}> 
                  {s.badge ? React.cloneElement(s.icon as any, { className: 'w-8 h-8 text-white' }) : s.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{s.title}</h3>
                <div className="text-sm font-semibold text-[#FF2B2B] mb-4">{s.priceHint}</div>
                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-5 flex-1">{s.desc}</p>
                <ul className="text-gray-700 dark:text-gray-300 space-y-3 mb-8 text-sm">
                  {s.bullets.map(b => (
                    <li key={b} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-[#FF2B2B] flex-shrink-0" /> {b}
                    </li>
                  ))}
                </ul>
                <Link
                  to={s.link}
                  className={
                    s.badge
                      ? 'w-full bg-[#FF2B2B] text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors text-center'
                      : 'w-full border-2 border-[#FF2B2B] text-[#FF2B2B] py-3 rounded-lg font-semibold hover:bg-[#FF2B2B] hover:text-white transition-colors text-center'
                  }
                >
                  {s.key === 'web' ? 'Explore Websites' : s.key === 'social' ? 'View Social Plans' : 'View Branding Kits'}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Value / Why Section */}
      <section className="py-20 bg-gray-50 dark:bg-neutral-900 transition-colors">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white text-center mb-14">Why Choose Us</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {valuePoints.map(v => (
              <div key={v} className="text-center p-6 rounded-xl bg-white dark:bg-neutral-950 border border-gray-200 dark:border-neutral-800 shadow-sm hover:shadow-md transition-all">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 leading-relaxed">{v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Path Section (optional subtle cross-sell) */}
      <section className="py-20 bg-white dark:bg-neutral-950 transition-colors">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-12">A Simple Growth Path</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-xl border border-gray-200 dark:border-neutral-800 bg-gray-50 dark:bg-neutral-900">
              <p className="text-sm font-semibold text-[#FF2B2B] mb-2">Step 1</p>
              <p className="font-medium text-gray-900 dark:text-white mb-2">Launch Your Website</p>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">Get a fast, credible online presence that makes you discoverable and trusted.</p>
            </div>
            <div className="p-6 rounded-xl border border-gray-200 dark:border-neutral-800 bg-gray-50 dark:bg-neutral-900">
              <p className="text-sm font-semibold text-[#FF2B2B] mb-2">Step 2</p>
              <p className="font-medium text-gray-900 dark:text-white mb-2">Grow on Social</p>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">Stay consistent, engage audiences, and build relationships that convert.</p>
            </div>
            <div className="p-6 rounded-xl border border-gray-200 dark:border-neutral-800 bg-gray-50 dark:bg-neutral-900">
              <p className="text-sm font-semibold text-[#FF2B2B] mb-2">Step 3</p>
              <p className="font-medium text-gray-900 dark:text-white mb-2">Elevate Your Brand</p>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">Unify visuals and messaging with identity assets that scale with you.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-[#FF2B2B] text-white">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
          <h2 className="text-4xl font-bold leading-tight">Ready to pick a starting point?</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/services/websites" className="bg-white text-[#FF2B2B] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
                Start with ₹499 Website <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/services/social-media" className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-[#FF2B2B] transition-colors">
                Explore Social Plans
              </Link>
            </div>
        </div>
      </section>
    </div>
  );
}
