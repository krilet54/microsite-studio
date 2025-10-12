import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import ArticleSidebar from '../components/ArticleSidebar';

export default function Articles() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  // Example articles data
  const articles = [
    {
      title: 'Affordable Professional Websites Under ₹1000 – Pay on Delivery',
      url: '/articles/affordable-websites-under-1000',
  thumbnail: '/affordable websites under 1000.png',
      date: 'Oct 12, 2025',
      author: 'Microsite Studio',
      readTime: '4 min read',
      category: 'Websites',
      description: 'Get a high-quality, professional website for under ₹1000, pay on delivery, and enjoy 2 years of maintenance.'
    },
    // Add more articles here
  ];
  const categories = ['all', 'Websites', 'SEO', 'Branding'];
  const filtered = articles.filter(a => (category === 'all' || a.category === category) && a.title.toLowerCase().includes(search.toLowerCase()));
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 py-16 px-6">
      <Helmet>
        <title>Articles | Microsite Studio</title>
        <meta name="description" content="Read expert articles on affordable websites, branding, and digital solutions for small businesses in India." />
        <link rel="canonical" href="https://micro-site.studio/articles" />
      </Helmet>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12">
        <main className="flex-1">
          <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-6">Articles & Guides</h1>
          {/* Search & Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search articles..."
              className="px-4 py-2 rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 text-gray-900 dark:text-gray-100 text-sm flex-1"
            />
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 text-gray-900 dark:text-gray-100 text-sm"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat === 'all' ? 'All Categories' : cat}</option>
              ))}
            </select>
          </div>
          {/* Article Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map(article => (
              <article key={article.url} className="bg-gray-50/70 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-xl p-4 hover:shadow-lg transition group flex flex-col">
                <img src={article.thumbnail} alt={article.title} className="w-full h-32 object-cover rounded mb-3" />
                <h2 className="font-bold text-[#FF2B2B] group-hover:text-red-600 mb-1 text-lg">
                  <Link to={article.url} className="hover:underline">{article.title}</Link>
                </h2>
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">{article.date} &bull; {article.author} &bull; {article.readTime}</div>
                <p className="text-gray-700 dark:text-gray-300 mb-2 flex-1">{article.description}</p>
                <Link to={article.url} className="inline-block px-4 py-2 rounded bg-[#FF2B2B] text-white font-semibold hover:bg-red-600 transition self-start">Read Article</Link>
              </article>
            ))}
          </div>
        </main>
        <div className="w-full md:w-80 flex-shrink-0">
          <ArticleSidebar />
        </div>
      </div>
    </div>
  );
}
