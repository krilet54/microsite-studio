import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import ArticleSidebar from '../../components/ArticleSidebar';

export default function AffordableBusinessWebsites() {
  // Table of contents anchors
  const toc = [
    { id: 'why', label: 'Why Choose Microsite Studio?' },
    { id: 'package', label: 'What’s Included?' },
    { id: 'benefits', label: 'Business Benefits' },
    { id: 'process', label: 'How It Works' },
    { id: 'portfolio', label: 'Portfolio Highlights' },
    { id: 'faq', label: 'FAQs' },
  ];
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 py-16 px-6">
      <Helmet>
        <title>Get a Professional Website in India for ₹499 – No Upfront Payment | Microsite Studio</title>
        <meta name="description" content="Get a professional website for ₹499 in India. No upfront payment, SEO included, fast delivery. Perfect for small businesses. Pay after launch!" />
        <link rel="canonical" href="https://micro-site.studio/articles/affordable-websites-under-1000" />
        <meta property="og:title" content="Get a Professional Website in India for ₹499 – No Upfront Payment" />
        <meta property="og:description" content="Get a professional website for ₹499 in India. No upfront payment, SEO included, fast delivery. Perfect for small businesses. Pay after launch!" />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://micro-site.studio/articles/affordable-websites-under-1000" />
        <meta property="og:image" content="https://micro-site.studio/microsite-logo-512.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Get a Professional Website in India for ₹499 – No Upfront Payment" />
        <meta name="twitter:description" content="Get a professional website for ₹499 in India. No upfront payment, SEO included, fast delivery. Perfect for small businesses. Pay after launch!" />
        <meta name="twitter:image" content="https://micro-site.studio/microsite-logo-512.png" />
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Can I get a website for ₹499 in India?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes! Microsite Studio offers professional websites for ₹499, designed for small businesses in India."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to pay upfront for the website?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No upfront payment required. Pay only after your website is live and approved."
                }
              },
              {
                "@type": "Question",
                "name": "How long does it take to deliver the website?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Most websites are delivered within 3-5 business days after requirements are finalized."
                }
              }
            ]
          }
        `}</script>
      </Helmet>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12">
        <main className="flex-1">
          {/* Table of Contents */}
          <nav className="mb-8">
            <ul className="flex flex-wrap gap-4 text-sm font-medium text-gray-600 dark:text-gray-400">
              {toc.map(item => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className="hover:text-[#FF2B2B] underline">{item.label}</a>
                </li>
              ))}
            </ul>
          </nav>
          <header className="mb-8">
            <div className="w-full h-56 md:h-72 rounded-xl overflow-hidden mb-6 bg-gray-100 dark:bg-neutral-900 flex items-center justify-center">
              <img src="/affordable websites under 1000.png" alt="Affordable business website homepage screenshot for pet care" className="w-full h-full object-cover" />
            </div>
            <h1 className="text-3xl font-black text-[#FF2B2B] mb-2">Get a Professional Website in India for ₹499 – No Upfront Payment</h1>
            <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mb-4">
              <span>By Microsite Studio</span>
              <span>Oct 12, 2025</span>
              <span>4 min read</span>
            </div>
            <p className="text-gray-700 dark:text-gray-300 text-lg mb-2">
              <strong>Looking for a cheap website for your small business in India?</strong> Microsite Studio delivers high-quality, SEO-optimized websites for just ₹499. No upfront payment, no hidden fees. Get online fast and grow your business!
            </p>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              <Link to="/plans" className="text-[#FF2B2B] underline hover:text-red-600">See our ₹499 Website Plans</Link> |{' '}
              <Link to="/contact" className="text-[#FF2B2B] underline hover:text-red-600">Contact Us</Link> |{' '}
              <Link to="/about" className="text-[#FF2B2B] underline hover:text-red-600">About Microsite Studio</Link>
            </p>
            <div className="flex gap-3 mt-4">
              <a href="https://twitter.com/intent/tweet?url=https://micro-site.studio/articles/affordable-business-websites" target="_blank" rel="noopener" className="px-3 py-2 rounded bg-[#1DA1F2] text-white text-xs font-semibold hover:bg-blue-600 transition">Share on Twitter</a>
              <a href="https://www.facebook.com/sharer/sharer.php?u=https://micro-site.studio/articles/affordable-business-websites" target="_blank" rel="noopener" className="px-3 py-2 rounded bg-[#4267B2] text-white text-xs font-semibold hover:bg-blue-800 transition">Share on Facebook</a>
              <a href="https://wa.me/?text=https://micro-site.studio/articles/affordable-business-websites" target="_blank" rel="noopener" className="px-3 py-2 rounded bg-[#25D366] text-white text-xs font-semibold hover:bg-green-600 transition">Share on WhatsApp</a>
            </div>
          </header>
          <section id="why" className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Why Choose Microsite Studio for Affordable Business Websites?</h2>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-1">
              <li><strong>Affordable Pricing:</strong> Get a complete, functional website for just ₹499.</li>
              <li><strong>Pay on Delivery:</strong> No upfront payment; pay only after your website is ready and approved.</li>
              <li><strong>Transparent Costs:</strong> No hidden charges, no surprise fees.</li>
              <li><strong>SEO-Optimized:</strong> On-page SEO included to help your business rank on Google.</li>
            </ul>
          </section>
          <section id="package" className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">What’s Included in Our ₹499 Website Package?</h2>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-1">
              <li><strong>Custom Design:</strong> Tailored to your brand and business needs.</li>
              <li><strong>Responsive Layout:</strong> Optimized for desktop, tablet, and mobile.</li>
              <li><strong>SEO Basics:</strong> On-page SEO to help your website rank on Google.</li>
              <li><strong>Fast Loading Speed:</strong> Smooth experience for your visitors.</li>
              <li><strong>Security:</strong> SSL certificate for secure browsing.</li>
              <li><strong>Contact Form:</strong> Capture leads and inquiries directly from your website.</li>
              <li><strong>2 Years Maintenance:</strong> Ongoing support to keep your site running smoothly.</li>
            </ul>
          </section>
          <section id="benefits" className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Business Benefits of an Affordable Website</h2>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-1">
              <li><strong>Professional Online Presence:</strong> Build credibility and attract more customers.</li>
              <li><strong>Cost-Effective:</strong> High-quality websites without the usual high price.</li>
              <li><strong>Ongoing Support:</strong> 2 years of maintenance included.</li>
              <li><strong>Lead Generation:</strong> Capture leads and inquiries directly from your site.</li>
            </ul>
          </section>
          <section id="process" className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">How Our Website Process Works</h2>
            <ol className="list-decimal pl-6 text-gray-700 dark:text-gray-300 space-y-1">
              <li><strong>Initial Consultation:</strong> Discuss your business goals and requirements.</li>
              <li><strong>Design & Development:</strong> We create a custom website tailored for your business.</li>
              <li><strong>Review & Feedback:</strong> You review the website and suggest changes.</li>
              <li><strong>Launch:</strong> Once approved, your website goes live.</li>
              <li><strong>Post-Launch Support:</strong> Enjoy 2 years of maintenance and support.</li>
            </ol>
          </section>
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Get Started Today</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">A professional website under ₹1000 is now within your reach. Take the first step towards establishing your online presence with a website that looks great, works flawlessly, and is backed by reliable support.</p>
            <Link to="/services/websites" className="inline-block px-6 py-3 rounded-lg bg-[#FF2B2B] text-white font-semibold shadow hover:bg-red-600 transition">Get Started</Link>
          </section>

          <section id="portfolio" className="mb-12">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Portfolio Highlights</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {/* Pet Care Business Landing Page */}
              <a
                href="https://laviedaviepetocare.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="group border border-gray-200 dark:border-neutral-800 rounded-xl overflow-hidden bg-white dark:bg-neutral-900 shadow-sm hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-[#FF2B2B] focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-neutral-950"
                aria-label="Open Pet Care Business Landing Page"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src="/mockup1.png"
                    alt="Affordable pet care business website homepage screenshot"
                    className="w-full h-full object-cover object-top transition-transform duration-[900ms] group-hover:scale-[1.04]"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-transparent opacity-60 group-hover:opacity-70 transition-opacity" />
                  <span className="absolute bottom-2 left-2 text-[10px] font-semibold tracking-wide bg-black/45 backdrop-blur-sm text-white px-2 py-1 rounded uppercase">Live Site</span>
                </div>
                <div className="p-5 space-y-2">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100 line-clamp-1">Pet Care Business Landing Page</p>
                  <p className="text-xs text-[#FF2B2B] font-semibold">Delivered under ₹499 model</p>
                </div>
              </a>
              {/* Cat Boarding Service Site */}
              <a
                href="https://four-paws-cat-boarding.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="group border border-gray-200 dark:border-neutral-800 rounded-xl overflow-hidden bg-white dark:bg-neutral-900 shadow-sm hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-[#FF2B2B] focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-neutral-950"
                aria-label="Open Cat Boarding Service Site"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src="/mockup2.png"
                    alt="Affordable cat boarding business website homepage screenshot"
                    className="w-full h-full object-cover object-top transition-transform duration-[900ms] group-hover:scale-[1.04]"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-transparent opacity-60 group-hover:opacity-70 transition-opacity" />
                  <span className="absolute bottom-2 left-2 text-[10px] font-semibold tracking-wide bg-black/45 backdrop-blur-sm text-white px-2 py-1 rounded uppercase">Live Site</span>
                </div>
                <div className="p-5 space-y-2">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100 line-clamp-1">Cat Boarding Service Site</p>
                  <p className="text-xs text-[#FF2B2B] font-semibold">Delivered under ₹499 model</p>
                </div>
              </a>
              {/* Spike Point website screenshot */}
              <a
                href="https://spike-point.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="group border border-gray-200 dark:border-neutral-800 rounded-xl overflow-hidden bg-white dark:bg-neutral-900 shadow-sm hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-[#FF2B2B] focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-neutral-950"
                aria-label="Open Spike Point website"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src="/mockup3.png"
                    alt="Affordable local utility service website homepage screenshot"
                    className="w-full h-full object-cover object-top transition-transform duration-[900ms] group-hover:scale-[1.04]"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-transparent opacity-60 group-hover:opacity-70 transition-opacity" />
                  <span className="absolute bottom-2 left-2 text-[10px] font-semibold tracking-wide bg-black/45 backdrop-blur-sm text-white px-2 py-1 rounded uppercase">Live Site</span>
                </div>
                <div className="p-5 space-y-2">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100 line-clamp-1">Local Utility / Service Page</p>
                  <p className="text-xs text-[#FF2B2B] font-semibold">Delivered under ₹499 model</p>
                </div>
              </a>
            </div>
          </section>
          <section id="faq" className="mb-8">
            <div className="bg-gradient-to-r from-[#FF2B2B]/10 to-[#FF2B2B]/5 rounded-xl p-8 shadow mb-8">
              <h2 className="text-2xl font-black text-[#FF2B2B] mb-4">Frequently Asked Questions</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-[#FF2B2B]">Can I get a website for ₹499 in India?</h3>
                  <p className="text-gray-700 dark:text-gray-300">Yes! Microsite Studio offers professional websites for ₹499, designed for small businesses in India.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-[#FF2B2B]">Do I need to pay upfront for the website?</h3>
                  <p className="text-gray-700 dark:text-gray-300">No upfront payment required. Pay only after your website is live and approved.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-[#FF2B2B]">How long does it take to deliver the website?</h3>
                  <p className="text-gray-700 dark:text-gray-300">Most websites are delivered within 3-5 business days after requirements are finalized.</p>
                </div>
              </div>
            </div>
          </section>
          {/* Comments/Questions Placeholder */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Comments & Questions</h2>
            <div className="bg-gray-50 dark:bg-neutral-900 rounded-xl p-6 border border-gray-200 dark:border-neutral-800">
              <p className="text-gray-500 dark:text-gray-400 text-sm">Want to ask something about affordable business websites? <br />Email us at <a href="mailto:contact@micro-site.studio" className="text-[#FF2B2B] underline">contact@micro-site.studio</a> or <Link to="/#contact" className="text-[#FF2B2B] underline">use our contact form</Link>.</p>
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
