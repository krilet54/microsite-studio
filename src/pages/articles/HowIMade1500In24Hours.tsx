import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import ArticleSidebar from '../../components/ArticleSidebar';

export default function HowIMade1500In24Hours() {
  const pageUrl = 'https://micro-site.studio/articles/how-i-made-1500-in-24-hours';
  const pageTitle = 'How I Earned ₹1,500 in 24 Hours: 30% Commission with Microsite Studio';
  const pageDescription =
    'Rahul Singh shares a first-person account of earning ₹1,500 in 24 hours by referring a client to Microsite Studio and earning a 30% commission. Practical steps to replicate.';
  const imageUrl = 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1200';
  const datePublished = '2026-04-17';

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: pageTitle,
    description: pageDescription,
    image: imageUrl,
    author: { '@type': 'Person', name: 'Rahul Singh' },
    publisher: {
      '@type': 'Organization',
      name: 'Microsite Studio',
      logo: { '@type': 'ImageObject', url: 'https://micro-site.studio/microsite-logo-512.png' }
    },
    mainEntityOfPage: pageUrl,
    datePublished,
    dateModified: datePublished,
    articleSection: 'Passive Income',
    keywords: [
      'passive income',
      'earn passive income',
      '30% commission',
      'Microsite Studio',
      'refer and earn',
      'earn money online India'
    ]
  };

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 py-16 px-6">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content="passive income, 30% commission, refer and earn, Microsite Studio, earn money online India" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <meta name="author" content="Rahul Singh" />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:site_name" content="Microsite Studio" />
        <meta property="og:locale" content="en_IN" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content={imageUrl} />
        <meta property="article:published_time" content="2026-04-17T00:00:00+05:30" />
        <meta property="article:modified_time" content="2026-04-17T00:00:00+05:30" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={imageUrl} />
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
      </Helmet>

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12">
        <main className="flex-1">
          <header className="mb-8">
            <img src={imageUrl} alt="Person checking phone with payment notification" className="w-full h-56 md:h-72 rounded-xl object-cover mb-6" />
            <h1 className="text-3xl font-black text-[#FF2B2B] mb-3">{pageTitle}</h1>
            <p className="text-gray-700 dark:text-gray-300">By <strong>Rahul Singh</strong> · {datePublished} · 4 min read</p>
          </header>

          <section id="story" className="mb-6 text-gray-700 dark:text-gray-300">
            <p className="mb-3">Just earned ₹1,500 in passive income within 24 hours — and I didn't have to do the delivery work. Here's my real, step-by-step experience working with <Link to="/got-client" className="text-[#FF2B2B] underline">Microsite Studio</Link> and earning a 30% commission on a website project.</p>

            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">How I found Microsite Studio</h2>
            <p className="mb-3">No joke — I was scrolling the internet and found their page about collaborating with referrers. They offered a straightforward commission structure: refer a client, hand them over, and receive a percentage when the project is delivered. I decided to try it by reaching out to local businesses I already knew.</p>

            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">How the 30% commission worked for me</h2>
            <p className="mb-3">I locked one client for a starter website at ₹5,000. Microsite Studio handled the build, QA, and delivery. Once the project was completed and the client paid, I received my 30% share — ₹1,500 — with no extra work on my part. The process felt passive because I only connected the client and they managed everything else.</p>

            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Step-by-step: What I actually did</h2>
            <ol className="list-decimal pl-6 space-y-2 mb-3">
              <li>Picked a local business I thought needed a website.</li>
              <li>Messaged them (WhatsApp) with a short pitch and offered to connect them to a reliable web team.</li>
              <li>If they showed interest, I introduced them to Microsite Studio via WhatsApp or email and stayed in the group until kickoff.</li>
              <li>Microsite Studio scoped the site, completed delivery, and handled billing.</li>
              <li>After delivery, I received my commission — no technical work required.</li>
            </ol>

            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Practical tips if you want to try this</h2>
            <ul className="list-disc pl-6 space-y-2 mb-3">
              <li>Target small local businesses (salons, tutors, local shops) — they respond well to simple, low-cost website offers.</li>
              <li>Use WhatsApp or email introductions rather than the referral form — I found the team was faster and clearer on WhatsApp.</li>
              <li>Be honest about what you expect: this is lead referral, not freelance delivery.</li>
              <li>Prepare a short pitch: what the client gets, typical price range, and expected turnaround.</li>
              <li>Follow up politely — many small businesses need a nudge to move forward.</li>
            </ul>

            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Realistic expectations and disclaimers</h2>
            <p className="mb-3">This worked for me because I already had local contacts and I was comfortable doing short outreach. If you don't want to do any outreach (calls/messages), this probably isn't passive for you. Results vary — not everyone will lock a ₹5,000 project on day one.</p>

            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Short script you can use</h2>
            <p className="mb-3">Hi [Name], I saw your [shop/page] and think a simple website could help with customer enquiries. I can connect you with a team that builds and delivers quickly — they handle everything and you pay after delivery. Interested?</p>

            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">PS — what I learned</h2>
            <p className="mb-3">Trust matters. I stayed in the WhatsApp thread between the client and Microsite Studio until the handoff felt secure. Also: avoid submitting leads through a generic form — direct introductions via WhatsApp or email were faster and clearer.</p>

            <div className="mt-6 p-4 rounded-lg bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800">
              <strong>Final thought:</strong> If you have basic outreach skills, a small network, and a willingness to message or call local businesses, this can be a real way to earn passive income in India. It was for me — ₹1,500 in 24 hours — and it only took an honest intro.
            </div>
          </section>

          <section id="cta" className="mt-8">
            <div className="rounded-2xl border border-gray-200 dark:border-neutral-800 bg-gray-50 dark:bg-neutral-900 p-6">
              <h3 className="text-lg font-bold mb-3">Want to try it?</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">Check the collaborator details on the Microsite Studio referral page and start with one local business. If you want, introduce via WhatsApp — it's what worked for me.</p>
              <div className="flex gap-3">
                <Link to="/got-client" className="px-5 py-2.5 rounded-lg bg-[#FF2B2B] text-white font-semibold hover:bg-red-600 transition-colors">Referral Details</Link>
                <Link to="/services" className="px-5 py-2.5 rounded-lg border border-[#FF2B2B] text-[#FF2B2B] font-semibold hover:bg-[#FF2B2B] hover:text-white transition-colors">See Services</Link>
              </div>
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
