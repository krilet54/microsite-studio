import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import ArticleSidebar from '../../components/ArticleSidebar';
import LeadMagnetOptIn from '../../components/LeadMagnetOptIn';

export default function Top6PassiveIncomeStudents() {
  const pageUrl = 'https://micro-site.studio/articles/top-6-passive-income-students';
  const pageTitle = 'Top 6 Legit Passive Income Ideas For Students (College & School Friendly)';
  const pageDescription = 'Six practical, low-barrier passive income ideas students can start today — referral commissions, digital products, print-on-demand, UGC stock, micro-templates and short-form content.';
  const imageUrl = 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1200';
  const datePublished = '2026-04-17';

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
      logo: { '@type': 'ImageObject', url: 'https://micro-site.studio/microsite-logo-512.png' }
    },
    mainEntityOfPage: pageUrl,
    datePublished,
    dateModified: datePublished,
    articleSection: 'Passive Income',
    keywords: ['passive income', 'students', 'college', 'earn online', 'affiliate', 'referral']
  };

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 py-16 px-6">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content="passive income for students, passive income students, referral commission, microsite studio, student side hustles" />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        {/** FAQ schema for featured snippets */}
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          'mainEntity': [
            { '@type': 'Question', 'name': 'How quickly can a student earn via referrals?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'With a warm local lead you can earn within 24–72 hours after the client approves and pays. Results vary.' } },
            { '@type': 'Question', 'name': 'Do I need technical skills to earn with referrals?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'No. Referrals need outreach skills and local relationships — Microsite Studio handles delivery.' } },
            { '@type': 'Question', 'name': 'What should I price my digital product at?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'Start small: ₹99–₹499 for simple templates or notes. Test demand, then increase price.' } }
          ]
        })}</script>
      </Helmet>

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12">
        <main className="flex-1">
          <header className="mb-8">
            <img src={imageUrl} alt="Student working on laptop" className="w-full h-56 md:h-72 rounded-xl object-cover mb-6" />
            <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-3">{pageTitle}</h1>
            <p className="text-gray-700 dark:text-gray-300">By Microsite Studio · {datePublished} · 6 min read</p>
          </header>
          <LeadMagnetOptIn />

          <section className="max-w-none text-gray-700 dark:text-gray-300">
            {/* Tweet URL */}
            {/** build a prefilled tweet link */}
            <div className="mt-3">
              {(() => {
                const tweetText = 'Students — try one small passive-income experiment this month: refer local clients, sell a tiny digital product, or make short videos.';
                const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText + ' ' + pageUrl)}`;
                return (
                  <a href={tweetUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-[#1DA1F2]">Share this article on X</a>
                );
              })()}
            </div>
            <p className="mb-4"><strong>TL;DR:</strong> Students can build simple, low-cost passive income streams in parallel with studies — start with one idea, validate it for 30 days, then scale. Referral programs (like Microsite Studio’s 30% commission) and lightweight digital products are the fastest paths.</p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-6 mb-3">Why students should pick one small experiment</h2>
            <p className="mb-4">Most passive income streams require an upfront time investment. The trick is choosing low-friction ideas that match your skills and schedule. Below are six proven, legitimate options you can start this week.</p>

            <ol className="list-decimal pl-6 space-y-6">
              <li>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Refer local clients — real commissions, low effort</h3>
                <p className="mt-2">Why it works: Many local businesses need a quick website but don’t know where to start. You already have the connections — introductions are the valuable part. Microsite Studio pays <strong>30% commission</strong> on qualifying referrals.</p>
                <p className="mt-2">How to start: pick 5 businesses (salons, tutors, cafés), write a short WhatsApp pitch, and introduce them to Microsite Studio. Stay in the thread until kickoff.</p>
                <blockquote className="bg-gray-50 dark:bg-neutral-900 border p-3 mt-3">Hi [Name], I noticed your [business/page] — a simple website could bring more enquiries. I can connect you with a team who builds fast and you pay after delivery. Interested?</blockquote>
                <p className="mt-2">Resources: See our referral details: <Link to="/got-client" className="text-[#FF2B2B]">Referral details</Link>. Also cross-link to <Link to="/articles/how-i-made-1500-in-24-hours" className="text-[#FF2B2B]">how one student earned ₹1,500 in 24 hours</Link>.</p>
              </li>

              <li>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Sell small digital products</h3>
                <p className="mt-2">Examples: resume templates, study notes, Instagram planners, simple Photoshop/Canva templates.</p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Make one asset (1–2 hours), price it ₹99–₹499.</li>
                  <li>Platforms: Gumroad, Etsy, Gumtree, or your own microsite landing page with Stripe.</li>
                  <li>Promote in college groups, Telegram channels, and Instagram Stories.</li>
                </ul>
              </li>

              <li>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Print-on-demand (POD)</h3>
                <p className="mt-2">Create 5–10 niche designs (memes, campus jokes), connect to Printful/Teespring, and use short-form content to drive orders. Time to first sale: 1–3 weeks with consistent posting.</p>
              </li>

              <li>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Stock photos & short UGC clips</h3>
                <p className="mt-2">If you take photos or shoot short vertical videos, upload them to microstock sites or UGC marketplaces — every license yields a small payment over time. Focus on high-demand niches: study spaces, campus life, flatlay setups.</p>
              </li>

              <li>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Short-form content + affiliate/referral funnels</h3>
                <p className="mt-2">Create 30–60 second videos about study hacks, side hustles, or tools. Add a simple link in bio to a landing page (or Microsite Studio referral), and track clicks. Short videos scale quickly and can spike virality if one catches on.</p>
              </li>

              <li>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Build micro-templates or no-code components</h3>
                <p className="mt-2">Make a simple microsite template, a Notion resume template, or a link-in-bio template and sell it. Developers and marketers often buy time-savers — price templates between ₹299–₹1,499 depending on complexity.</p>
              </li>
            </ol>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-3">Promotion & virality checklist</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Pick one main keyword per article (e.g., “passive income for students”) and use it in title, H2, meta description, and first 100 words.</li>
              <li>Create 3 share assets: a short video, a quote image, and a 3-tweet thread summarising the idea.</li>
              <li>Add internal links to related pages (our referral story) and an opt-in (email or free checklist) to capture interested readers.</li>
              <li>Use Schema.org Article markup (this page includes it) so search engines understand the content.</li>
              <li>Seed the article in targeted communities: college WhatsApp groups, subreddits (r/IndiaFavors, r/SideProject), and Telegram channels.</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-3">Shareable snippets</h2>
            <p className="mb-2"><strong>Tweet:</strong> “Students — tired of odd jobs? Try one low-friction passive income experiment this month: refer local businesses, sell a digital asset, or make short videos. Start small, validate fast. #passiveincome #studenthustle”</p>
            <p className="mb-2"><strong>Instagram caption:</strong> “Earn while you study: 6 legit, low-effort ideas to try this month. Link in bio. 👇”</p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-3">Final notes & ethics</h2>
            <p className="mb-4">Passive income takes work up-front. Avoid anything that promises guaranteed returns or requires upfront fees to participate. Be honest with businesses you refer — pass value, not spam.</p>

            <div className="mt-6 p-4 rounded-lg bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800">
              <h3 className="text-lg font-semibold mb-2">Want to try referrals first?</h3>
              <p className="mb-3">Referring local clients is the fastest way to earn meaningful commissions with minimal hassle. Learn how to introduce a client and claim your 30% commission on qualifying projects.</p>
              <div className="flex gap-3">
                <Link to="/got-client" className="px-5 py-2.5 rounded-lg bg-[#FF2B2B] text-white font-semibold hover:bg-red-600 transition-colors">Referral details & signup</Link>
                <Link to="/articles/how-i-made-1500-in-24-hours" className="px-5 py-2.5 rounded-lg border border-[#FF2B2B] text-[#FF2B2B] font-semibold hover:bg-[#FF2B2B] hover:text-white transition-colors">Read a real story</Link>
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
