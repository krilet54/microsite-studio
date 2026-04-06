import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import ArticleSidebar from '../../components/ArticleSidebar';

export default function HowMicrositeStudioWorksDigitalMarketing() {
  const pageUrl = 'https://micro-site.studio/articles/how-microsite-studio-works-for-digital-marketing';
  const pageTitle = 'How Microsite Studio Works for Digital Marketing: SEO, Ads, Social, and Funnel Optimization';
  const pageDescription =
    'In-depth guide to Microsite Studio digital marketing function: search strategy, performance media, social content operations, attribution, and conversion growth.';
  const imageUrl =
    'https://images.pexels.com/photos/7567443/pexels-photo-7567443.jpeg?auto=compress&cs=tinysrgb&w=1200';

  const toc = [
    { id: 'overview', label: 'What Microsite Studio Does' },
    { id: 'system', label: 'Demand Generation System' },
    { id: 'channels', label: 'Execution Channels' },
    { id: 'funnels', label: 'Funnel and CRO' },
    { id: 'reporting', label: 'Analytics and Attribution' },
    { id: 'kpis', label: 'Growth KPIs' },
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
    articleSection: 'Digital Marketing',
    keywords: [
      'how microsite studio works',
      'digital marketing services India',
      'SEO and ads strategy',
      'lead generation funnel optimization',
      'social media marketing for business'
    ]
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://micro-site.studio/' },
      { '@type': 'ListItem', position: 2, name: 'Articles', item: 'https://micro-site.studio/articles' },
      { '@type': 'ListItem', position: 3, name: 'How Microsite Studio Works for Digital Marketing', item: pageUrl }
    ]
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How does Microsite Studio digital marketing work?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            'We combine search visibility, paid media execution, social content operations, and conversion funnel optimization in one coordinated growth system.'
        }
      },
      {
        '@type': 'Question',
        name: 'What channels are included in this model?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            'Search marketing, performance advertising, social media marketing, and content operations are managed as integrated growth channels.'
        }
      },
      {
        '@type': 'Question',
        name: 'How is campaign impact measured?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            'We track measurable KPIs such as cost per lead, conversion rate, channel-level ROI, engagement quality, and pipeline impact.'
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
          content="how microsite studio works, digital marketing services India, SEO services for small business, Google Ads management, lead generation funnel optimization, social media marketing strategy"
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
        <meta property="article:section" content="Digital Marketing" />
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
              alt="Digital marketing dashboard and strategy planning"
              className="w-full h-56 md:h-72 rounded-xl object-cover mb-6"
            />
            <h1 className="text-3xl font-black text-[#FF2B2B] mb-3">
              How Microsite Studio Works for Digital Marketing: SEO, Ads, Social, and Funnel Optimization
            </h1>
            <p className="text-gray-700 dark:text-gray-300">
              This guide explains the Microsite Studio digital marketing function for businesses searching high-intent
              terms such as digital marketing services India, SEO services for small business, and Google Ads management.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link to="/services/digital-marketing" className="px-5 py-2.5 rounded-lg bg-[#FF2B2B] text-white font-semibold hover:bg-red-600 transition-colors">
                Explore Digital Growth Services
              </Link>
              <Link to="/" className="px-5 py-2.5 rounded-lg border border-[#FF2B2B] text-[#FF2B2B] font-semibold hover:bg-[#FF2B2B] hover:text-white transition-colors">
                Visit Microsite Studio
              </Link>
            </div>
          </header>

          <section id="overview" className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">What Microsite Studio Does in Digital Marketing</h2>
            <p className="text-gray-700 dark:text-gray-300">
              We build growth systems, not disconnected campaigns. Microsite Studio combines SEO, paid media,
              social content execution, and conversion optimization so every channel supports a common revenue goal.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mt-3">
              This approach helps businesses reduce wasted spend, improve lead quality, and scale acquisition with a clearer
              performance framework.
            </p>
          </section>

          <section id="system" className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Demand Generation System</h2>
            <ol className="list-decimal pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Opportunity mapping from market demand, search intent, and funnel bottlenecks.</li>
              <li>Audience segmentation and message architecture by awareness and decision stage.</li>
              <li>Channel planning with budget allocation and KPI ownership per campaign objective.</li>
              <li>Rapid launch cycle with creative and copy testing loops.</li>
              <li>Optimization cycles based on conversion quality and cost efficiency signals.</li>
            </ol>
          </section>

          <section id="channels" className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Execution Channels</h2>
            <ul className="list-disc pl-6 space-y-1 text-gray-700 dark:text-gray-300">
              <li>Search Marketing: keyword strategy, page relevance mapping, technical visibility improvements.</li>
              <li>Performance Marketing: Google and social ad systems with structured testing plans.</li>
              <li>Social Media Marketing: calendar operations, creative direction, and audience engagement rhythms.</li>
              <li>Content and Media: campaign copy systems, video hooks, and nurture content.</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 mt-4">
              Explore our <Link to="/services/digital-marketing" className="text-[#FF2B2B] underline">Digital Marketing and Growth</Link> stack and align channel scope with business goals.
            </p>
          </section>

          <section id="funnels" className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Funnel and Conversion Rate Optimization</h2>
            <p className="text-gray-700 dark:text-gray-300">
              Traffic acquisition alone does not guarantee growth. We tune landing pages, CTA clarity, form design,
              and trust signals to increase lead submission rates and reduce drop-off.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mt-3">
              This CRO layer improves campaign ROI by improving what happens after the click.
            </p>
          </section>

          <section id="reporting" className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Analytics and Attribution</h2>
            <p className="text-gray-700 dark:text-gray-300">
              We track lead source quality, funnel progression, campaign-level economics, and channel assisted conversions.
              This gives better clarity than vanity metrics and helps scale what actually drives business outcomes.
            </p>
          </section>

          <section id="kpis" className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Growth KPIs We Prioritize</h2>
            <ul className="list-disc pl-6 space-y-1 text-gray-700 dark:text-gray-300">
              <li>Cost per qualified lead</li>
              <li>Landing page conversion rate</li>
              <li>Click-through rate by channel and creative type</li>
              <li>Customer acquisition efficiency trends</li>
              <li>Revenue-linked campaign contribution</li>
            </ul>
          </section>

          <section id="faq" className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">FAQ</h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Can you run SEO and ads together?</h3>
                <p>Yes. We run integrated SEO and paid media strategies to improve both immediate leads and long-term visibility.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Do you support local businesses?</h3>
                <p>Yes. We build local-first campaigns for clinics, consultants, services, and location-based brands.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Do you optimize campaigns after launch?</h3>
                <p>Yes. We continuously optimize targeting, messaging, budgets, and landing performance based on data.</p>
              </div>
            </div>
          </section>

          <section className="mb-2 mt-10 rounded-2xl border border-gray-200 dark:border-neutral-800 bg-gray-50 dark:bg-neutral-900 p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Need a Structured Digital Growth Engine?</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-5">
              Build a unified SEO, paid, and content strategy that improves lead quality and campaign efficiency.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/services/digital-marketing" className="px-5 py-2.5 rounded-lg bg-[#FF2B2B] text-white font-semibold hover:bg-red-600 transition-colors">
                Start Growth Strategy
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
