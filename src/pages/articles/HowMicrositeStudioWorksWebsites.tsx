import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import ArticleSidebar from '../../components/ArticleSidebar';

export default function HowMicrositeStudioWorksWebsites() {
  const pageUrl = 'https://micro-site.studio/articles/how-microsite-studio-works-for-websites';
  const pageTitle = 'How Microsite Studio Works for Websites in India: Process, SEO, and Conversion Framework';
  const pageDescription =
    'Detailed guide to how Microsite Studio works for websites: discovery, conversion planning, UI, development, SEO architecture, launch QA, and growth iteration.';
  const imageUrl =
    'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1200';

  const toc = [
    { id: 'overview', label: 'What Microsite Studio Does' },
    { id: 'framework', label: 'Website Framework' },
    { id: 'seo', label: 'Advanced SEO Setup' },
    { id: 'technical', label: 'Technical Delivery' },
    { id: 'timeline', label: 'Timeline and Milestones' },
    { id: 'kpis', label: 'Impact Metrics' },
    { id: 'faq', label: 'FAQ' },
  ];

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: pageTitle,
    description: pageDescription,
    image: imageUrl,
    author: { '@type': 'Organization', name: 'Microsite Studio' },
    publisher: {
      '@type': 'Organization',
      name: 'Microsite Studio',
      logo: {
        '@type': 'ImageObject',
        url: 'https://micro-site.studio/microsite-logo-512.png'
      }
    },
    mainEntityOfPage: pageUrl,
    datePublished: '2026-03-26',
    dateModified: '2026-03-26',
    articleSection: 'Websites',
    keywords: [
      'how microsite studio works',
      'website development process India',
      'SEO ready website development',
      'small business website India',
      'conversion focused website'
    ]
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://micro-site.studio/' },
      { '@type': 'ListItem', position: 2, name: 'Articles', item: 'https://micro-site.studio/articles' },
      { '@type': 'ListItem', position: 3, name: 'How Microsite Studio Works for Websites', item: pageUrl }
    ]
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How does Microsite Studio website development work?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            'Microsite Studio follows a structured workflow: business discovery, conversion wireframe, UI direction, development, technical SEO setup, QA, and launch.'
        }
      },
      {
        '@type': 'Question',
        name: 'What makes this process SEO optimized?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            'We include index-ready architecture, semantic heading hierarchy, metadata mapping, schema markup, internal link planning, and performance optimization for Core Web Vitals.'
        }
      },
      {
        '@type': 'Question',
        name: 'Can the website scale into a larger platform later?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            'Yes. Initial builds are structured to scale into multi-page websites, lead funnels, dynamic modules, and ecommerce experiences without rebuilding from zero.'
        }
      }
    ]
  };

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 py-16 px-6">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta
          name="keywords"
          content="how microsite studio works, website development process India, SEO ready website development, affordable website for small business India, conversion focused web design"
        />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <meta name="author" content="Microsite Studio" />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:site_name" content="Microsite Studio" />
        <meta property="og:locale" content="en_IN" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content={imageUrl} />
        <meta property="article:published_time" content="2026-03-26T00:00:00+05:30" />
        <meta property="article:modified_time" content="2026-03-26T00:00:00+05:30" />
        <meta property="article:section" content="Websites" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={imageUrl} />
        <script type="application/ld+json">{JSON.stringify([articleSchema, breadcrumbSchema, faqSchema])}</script>
      </Helmet>

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12">
        <main className="flex-1">
          <nav className="mb-8">
            <ul className="flex flex-wrap gap-4 text-sm font-medium text-gray-600 dark:text-gray-400">
              {toc.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className="hover:text-[#FF2B2B] underline">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <header className="mb-8">
            <img
              src={imageUrl}
              alt="Website planning and development workflow"
              className="w-full h-56 md:h-72 rounded-xl object-cover mb-6"
            />
            <h1 className="text-3xl font-black text-[#FF2B2B] mb-3">
              How Microsite Studio Works for Websites in India: Process, SEO, and Conversion Framework
            </h1>
            <p className="text-gray-700 dark:text-gray-300">
              If you are searching for what Microsite Studio does, website development process in India, or SEO-ready
              website services for small business, this guide explains the full workflow from strategy to launch and growth.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link to="/services/websites" className="px-5 py-2.5 rounded-lg bg-[#FF2B2B] text-white font-semibold hover:bg-red-600 transition-colors">
                Explore Website Packages
              </Link>
              <Link to="/" className="px-5 py-2.5 rounded-lg border border-[#FF2B2B] text-[#FF2B2B] font-semibold hover:bg-[#FF2B2B] hover:text-white transition-colors">
                Visit Microsite Studio
              </Link>
            </div>
          </header>

          <section id="overview" className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">What Microsite Studio Does for Website Growth</h2>
            <p className="text-gray-700 dark:text-gray-300">
              Microsite Studio builds websites that are designed to perform as business assets, not just design showcases.
              Every build is planned around a commercial objective such as lead generation, consultation booking,
              product enquiries, or direct checkout conversion.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mt-3">
              Our team aligns user intent, conversion architecture, technical quality, and search visibility in one system.
              This is why businesses searching for affordable website development in India and SEO-optimized web design
              choose a workflow that combines speed, clarity, and measurable outcomes.
            </p>
          </section>

          <section id="framework" className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Website Framework: From Discovery to Conversion</h2>
            <ol className="list-decimal pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Business discovery: market context, audience intent, and decision-stage behavior mapping.</li>
              <li>Page strategy: conversion flow, offer framing, trust modules, and CTA hierarchy.</li>
              <li>Content architecture: headline sequencing, proof blocks, objection handling, and action clarity.</li>
              <li>UI and development: responsive front-end build, accessibility fundamentals, and device QA.</li>
              <li>Search layer: metadata map, heading semantics, schema coverage, and crawl readiness.</li>
              <li>Launch and iterate: event tracking setup, baseline analytics, and post-launch refinements.</li>
            </ol>
            <p className="text-gray-700 dark:text-gray-300 mt-3">
              This structure keeps turnaround efficient while preserving strategic depth. Instead of rebuilding repeatedly,
              we launch with a scalable base and improve via real behavior signals.
            </p>
          </section>

          <section id="seo" className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Advanced SEO Setup Included</h2>
            <ul className="list-disc pl-6 space-y-1 text-gray-700 dark:text-gray-300">
              <li>Technical SEO setup with indexable page architecture and clean URL logic</li>
              <li>On-page optimization for title intent, heading depth, and semantic topical relevance</li>
              <li>Structured data implementation to improve SERP understanding and rich-result eligibility</li>
              <li>Internal linking strategy that supports crawl depth and topical authority</li>
              <li>Speed and Core Web Vitals optimization for better UX and ranking support</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 mt-3">
              We do not treat SEO as a post-launch add-on. It is part of the core implementation so your website starts
              with stronger discoverability from day one.
            </p>
          </section>

          <section id="technical" className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Technical Delivery Scope</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-3">Common build outputs and scale paths:</p>
            <ul className="list-disc pl-6 space-y-1 text-gray-700 dark:text-gray-300">
              <li>Static Websites</li>
              <li>Dynamic Web Applications</li>
              <li>E-Commerce Platforms</li>
              <li>Portal Systems</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 mt-3">
              Depending on scope, we also align domain setup, hosting deployment, SSL hardening, and performance checks
              so the website is production-ready and maintainable.
            </p>
          </section>

          <section id="timeline" className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Timeline and Milestones</h2>
            <p className="text-gray-700 dark:text-gray-300">
              Most focused landing projects move quickly once inputs are approved. Typical phases are: discovery and brief,
              first draft build, revision pass, and launch handoff. For broader multi-page scopes, milestones are expanded
              into modular delivery windows with review gates.
            </p>
          </section>

          <section id="kpis" className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Impact Metrics We Prioritize</h2>
            <ul className="list-disc pl-6 space-y-1 text-gray-700 dark:text-gray-300">
              <li>Lead form completion rate</li>
              <li>Call and WhatsApp CTA click-through rate</li>
              <li>Page speed and interaction stability</li>
              <li>Organic impression and click growth for target queries</li>
              <li>Landing-to-enquiry conversion ratio</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 mt-4">
              Start with <Link to="/services/websites" className="text-[#FF2B2B] underline">Website Packages</Link>, compare options on
              <Link to="/plans" className="text-[#FF2B2B] underline"> Plans</Link>, or review the full
              <Link to="/services" className="text-[#FF2B2B] underline"> Services</Link> ecosystem.
            </p>
          </section>

          <section id="faq" className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">FAQ</h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">How long does the website process usually take?</h3>
                <p>Most focused starter builds are delivered in a few business days after requirements and assets are finalized.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Can the site scale later?</h3>
                <p>Yes. We architect pages so they can evolve into larger multi-page or e-commerce implementations.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Do you include post-launch support?</h3>
                <p>Yes. We support launch stabilization and planned enhancement cycles depending on package scope.</p>
              </div>
            </div>
          </section>

          <section className="mb-2 mt-10 rounded-2xl border border-gray-200 dark:border-neutral-800 bg-gray-50 dark:bg-neutral-900 p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Ready to Build a High-Performance Website?</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-5">
              Use this framework for your next launch and align design, SEO, and conversion from the start.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/services/websites" className="px-5 py-2.5 rounded-lg bg-[#FF2B2B] text-white font-semibold hover:bg-red-600 transition-colors">
                Start Website Project
              </Link>
              <Link to="/" className="px-5 py-2.5 rounded-lg border border-[#FF2B2B] text-[#FF2B2B] font-semibold hover:bg-[#FF2B2B] hover:text-white transition-colors">
                Back to Microsite Studio
              </Link>
            </div>
          </section>
        </main>

        <div className="w-full md:w-80 flex-shrink-0">
          <ArticleSidebar />
        </div>
      </div>
    </div>
  );
}
