import { Link } from 'react-router-dom';
import {
  Bot,
  Server,
  Search,
  Megaphone,
  TrendingUp,
  PenSquare,
  Layers,
  Package,
  ShieldCheck,
  Globe,
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const sectionNav = ['Overview', 'Services', 'Our Work', 'Why Us'];

export default function Services() {
  const pageUrl = 'https://micro-site.studio/services';
  const pageTitle = 'Services | Microsite Studio';
  const pageDescription =
    'Scalable digital systems for web engineering, digital marketing, and brand identity built for performance and long-term growth.';
  const pageImage = 'https://micro-site.studio/micrositefavicon.png';

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: pageTitle,
    url: pageUrl,
    description: pageDescription,
    inLanguage: 'en-IN',
  };

  const serviceCatalogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${pageUrl}#services-catalog`,
    name: 'Microsite Studio Services',
    serviceType: 'Web Engineering, Digital Marketing & Brand Strategy',
    provider: {
      '@type': 'Organization',
      name: 'Microsite Studio',
      url: 'https://micro-site.studio',
    },
    areaServed: 'IN',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Core Service Lines',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: 'Web Engineering & Infrastructure' },
        },
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: 'Digital Marketing & Growth' },
        },
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: 'Brand Strategy & Visual Identity' },
        },
      ],
    },
  };

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 transition-colors">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta
          name="keywords"
          content="web engineering, infrastructure setup, digital marketing, brand strategy, identity design, website development India"
        />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta
          property="og:description"
          content="We build scalable digital systems for online growth: infrastructure, marketing, and brand identity."
        />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content={pageImage} />
        <meta property="og:image:alt" content="Microsite Studio services overview" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Microsite Studio" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={pageImage} />
        <script type="application/ld+json">{JSON.stringify([webPageSchema, serviceCatalogSchema])}</script>
      </Helmet>

      <section className="py-20 bg-gray-50 dark:bg-neutral-900 transition-colors">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6">Services</h1>
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
            At Microsite Studio, we build scalable digital systems that help businesses establish, grow, and optimize
            their online presence. From infrastructure to marketing and brand identity, we deliver solutions
            engineered for performance and long-term growth.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {sectionNav.map((item) => (
              <span
                key={item}
                className="rounded-full border border-gray-300 dark:border-neutral-700 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-gray-600 dark:text-gray-300"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-neutral-950 transition-colors">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-6">1. Website Packages</h2>
          <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 mb-10 max-w-3xl">
            Fast, mobile-friendly websites built for credibility and conversion with a scalable technical foundation.
          </p>

          <div className="rounded-3xl border-2 border-[#FF2B2B] bg-gradient-to-br from-white via-gray-50 to-white dark:from-neutral-900 dark:via-neutral-900 dark:to-neutral-950 p-7 md:p-9 mb-10 shadow-lg shadow-[#FF2B2B]/10">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 rounded-full bg-[#FF2B2B]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#FF2B2B] mb-4">
                  <Globe className="w-4 h-4" />
                  Most Popular
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white mb-2">Website Launch Kits</h3>
                <p className="text-sm font-semibold text-[#FF2B2B] mb-4">Starting at ₹1,500 onwards</p>
                <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-5">
                  We design and develop high-performance web platforms tailored to your business objectives, with clear structure,
                  fast loading speed, and growth-ready architecture.
                </p>
                <ul className="grid sm:grid-cols-2 gap-3 text-sm text-gray-700 dark:text-gray-300">
                  <li className="rounded-lg bg-white/80 dark:bg-neutral-800 px-3 py-2 border border-gray-200 dark:border-neutral-700">Mobile responsive</li>
                  <li className="rounded-lg bg-white/80 dark:bg-neutral-800 px-3 py-2 border border-gray-200 dark:border-neutral-700">Custom layout</li>
                  <li className="rounded-lg bg-white/80 dark:bg-neutral-800 px-3 py-2 border border-gray-200 dark:border-neutral-700">SEO ready</li>
                  <li className="rounded-lg bg-white/80 dark:bg-neutral-800 px-3 py-2 border border-gray-200 dark:border-neutral-700">Fast delivery</li>
                </ul>
              </div>
              <div className="md:pt-1">
                <Link
                  to="/services/websites"
                  className="inline-flex items-center justify-center rounded-lg bg-[#FF2B2B] text-white px-6 py-3 font-semibold hover:bg-red-600 transition-colors"
                >
                  Explore Website Packages
                </Link>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-gray-200 dark:border-neutral-800 p-6 bg-gray-50 dark:bg-neutral-900">
              <div className="flex items-center gap-3 mb-4">
                <Bot className="w-6 h-6 text-[#FF2B2B]" />
                <h3 className="font-bold text-gray-900 dark:text-white">AI Chatbot Integration</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li>Rule-based automated chat systems</li>
                <li>LLM-powered intelligent conversational assistants</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-gray-200 dark:border-neutral-800 p-6 bg-gray-50 dark:bg-neutral-900">
              <div className="flex items-center gap-3 mb-4">
                <Server className="w-6 h-6 text-[#FF2B2B]" />
                <h3 className="font-bold text-gray-900 dark:text-white">Infrastructure & Deployment</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li>Domain registration & configuration</li>
                <li>Web hosting & cloud deployment</li>
                <li>VPS setup & server management</li>
                <li>SSL certification & security hardening</li>
                <li>Website performance optimization</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-gray-200 dark:border-neutral-800 p-6 bg-gray-50 dark:bg-neutral-900">
              <div className="flex items-center gap-3 mb-4">
                <Search className="w-6 h-6 text-[#FF2B2B]" />
                <h3 className="font-bold text-gray-900 dark:text-white">Search Engine Foundations</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li>Technical SEO setup</li>
                <li>On-page SEO optimization</li>
                <li>Structured data implementation</li>
                <li>Speed & performance optimization</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {['Static Websites', 'Dynamic Web Applications', 'E-Commerce Platforms', 'Portal Systems'].map((item) => (
              <div
                key={item}
                className="rounded-xl bg-neutral-900 text-white dark:bg-neutral-800 px-4 py-4 text-sm font-semibold text-center"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50 dark:bg-neutral-900 transition-colors">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-5">
            2. Digital Marketing & Growth
          </h2>
          <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 mb-10 max-w-3xl">
            We build marketing systems that drive traffic, leads, and measurable revenue growth.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-gray-200 dark:border-neutral-800 p-6 bg-white dark:bg-neutral-950">
              <div className="flex items-center gap-3 mb-3">
                <Search className="w-5 h-5 text-[#FF2B2B]" />
                <h3 className="font-bold text-gray-900 dark:text-white">Search Marketing</h3>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300">SEO, keyword research & content mapping, Search Engine Marketing.</p>
            </div>

            <div className="rounded-2xl border border-gray-200 dark:border-neutral-800 p-6 bg-white dark:bg-neutral-950">
              <div className="flex items-center gap-3 mb-3">
                <TrendingUp className="w-5 h-5 text-[#FF2B2B]" />
                <h3 className="font-bold text-gray-900 dark:text-white">Performance Marketing</h3>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300">Google Ads, social media ads, sales funnel design and optimization.</p>
            </div>

            <div className="rounded-2xl border border-gray-200 dark:border-neutral-800 p-6 bg-white dark:bg-neutral-950">
              <div className="flex items-center gap-3 mb-3">
                <Megaphone className="w-5 h-5 text-[#FF2B2B]" />
                <h3 className="font-bold text-gray-900 dark:text-white">Social Media Marketing</h3>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300">A/c setup & management, content strategy & planning, creative design & copywriting.</p>
            </div>

            <div className="rounded-2xl border border-gray-200 dark:border-neutral-800 p-6 bg-white dark:bg-neutral-950">
              <div className="flex items-center gap-3 mb-3">
                <PenSquare className="w-5 h-5 text-[#FF2B2B]" />
                <h3 className="font-bold text-gray-900 dark:text-white">Content & Media</h3>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300">Copywriting & content strategy, video and email marketing, creative campaigns.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-neutral-950 transition-colors">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-5">
            3. Brand Strategy & Visual Identity
          </h2>
          <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 mb-10 max-w-3xl">
            We create cohesive brand systems that communicate clarity, consistency, and credibility.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-gray-200 dark:border-neutral-800 p-6 bg-gray-50 dark:bg-neutral-900">
              <div className="flex items-center gap-3 mb-3">
                <Layers className="w-5 h-5 text-[#FF2B2B]" />
                <h3 className="font-bold text-gray-900 dark:text-white">Brand Identity Systems</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li>Logo design (wordmarks, emblems, combination marks)</li>
                <li>Typography systems</li>
                <li>Color palette development</li>
                <li>Visual identity guidelines</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-gray-200 dark:border-neutral-800 p-6 bg-gray-50 dark:bg-neutral-900">
              <div className="flex items-center gap-3 mb-3">
                <Package className="w-5 h-5 text-[#FF2B2B]" />
                <h3 className="font-bold text-gray-900 dark:text-white">Brand Collateral & Assets</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li>Business cards & stationery</li>
                <li>Social media branding kits</li>
                <li>Presentation decks</li>
                <li>Marketing materials</li>
                <li>Packaging design</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-gray-200 dark:border-neutral-800 p-6 bg-gray-50 dark:bg-neutral-900">
              <div className="flex items-center gap-3 mb-3">
                <ShieldCheck className="w-5 h-5 text-[#FF2B2B]" />
                <h3 className="font-bold text-gray-900 dark:text-white">Corporate Identity Systems</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li>Cross-platform brand consistency</li>
                <li>Website brand alignment</li>
                <li>Digital & print integration</li>
                <li>Brand governance frameworks</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#FF2B2B]">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-5">Ready to Build for Long-Term Growth?</h2>
          <p className="text-white/90 mb-8 text-base md:text-lg">
            Start with a scalable website foundation, then expand through marketing systems and brand consistency.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/services/websites"
              className="inline-flex items-center gap-2 rounded-lg bg-white text-[#FF2B2B] px-7 py-3.5 font-semibold hover:bg-gray-100 transition-colors"
            >
              <Globe className="w-5 h-5" />
              Explore Website Packages
            </Link>
            <Link
              to="/services/branding"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-white text-white px-7 py-3.5 font-semibold hover:bg-white hover:text-[#FF2B2B] transition-colors"
            >
              <Layers className="w-5 h-5" />
              Explore Branding Kits
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
