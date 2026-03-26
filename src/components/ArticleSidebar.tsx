import { Link } from 'react-router-dom';

const featuredArticles = [
  {
    title: 'How Microsite Studio Works for Websites',
    url: '/articles/how-microsite-studio-works-for-websites',
    thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1200',
    date: 'Mar 26, 2026',
    author: 'Microsite Studio',
    readTime: '6 min read',
  },
  {
    title: 'How Microsite Studio Works for Digital Marketing',
    url: '/articles/how-microsite-studio-works-for-digital-marketing',
    thumbnail: 'https://images.pexels.com/photos/7567443/pexels-photo-7567443.jpeg?auto=compress&cs=tinysrgb&w=1200',
    date: 'Mar 26, 2026',
    author: 'Microsite Studio',
    readTime: '6 min read',
  },
  {
    title: 'How Microsite Studio Works for Branding',
    url: '/articles/how-microsite-studio-works-for-branding',
    thumbnail: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1200',
    date: 'Mar 26, 2026',
    author: 'Microsite Studio',
    readTime: '6 min read',
  },
  {
    title: 'Affordable Professional Websites Under ₹1000 – Pay on Delivery',
    url: '/articles/affordable-websites-under-1000',
  thumbnail: '/affordable websites under 1000.png',
    date: 'Oct 12, 2025',
    author: 'Microsite Studio',
    readTime: '4 min read',
  },
  // Add more featured articles here
];

export default function ArticleSidebar() {
  return (
    <aside className="sticky top-24 space-y-8">
      <h3 className="text-lg font-bold text-[#FF2B2B] mb-4">Featured Articles</h3>
      {featuredArticles.map(article => (
        <Link to={article.url} key={article.url} className="block group mb-6">
          <div className="flex gap-3 items-center">
            <img src={article.thumbnail} alt={article.title} className="w-16 h-16 object-cover rounded-lg border border-gray-200 dark:border-neutral-800 group-hover:shadow-lg transition" />
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-[#FF2B2B] transition mb-1 text-sm">{article.title}</h4>
              <div className="text-xs text-gray-500 dark:text-gray-400">{article.date} &bull; {article.readTime}</div>
            </div>
          </div>
        </Link>
      ))}
    </aside>
  );
}
