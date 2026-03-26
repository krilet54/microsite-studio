import { 
  Globe, 
  Palette, 
  CheckCircle, 
  Star,
  MessageCircle,
  BarChart3,
  Camera,
  Megaphone,
  Mail,
  Server,
  ShoppingCart,
  ArrowRight
} from 'lucide-react';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export default function Plans() {
  const navigate = useNavigate();

  // Helper only for genuine enquiries (E-commerce plan)
  const openWhatsApp = useCallback((message: string) => {
    const base = 'https://wa.me/919060868026';
    const url = `${base}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  }, []);

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Digital Branding & Web Services',
    provider: { '@type': 'Organization', name: 'Microsite Studio' },
    areaServed: 'IN',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Core Services',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: '₹999 Starter Website' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Digital Marketing & Growth Systems' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Branding & Identity Kit' } }
      ]
    }
  };

  return (
  <div className="min-h-screen bg-white dark:bg-neutral-950 transition-colors">
      <Helmet>
        <title>Plans & Pricing | Microsite Studio</title>
        <meta name="description" content="Pricing for ₹999 websites, digital marketing growth systems, and branding kits. Pay-after-delivery options available." />
  <link rel="canonical" href="https://micro-site.studio/plans" />
        <meta property="og:title" content="Plans & Pricing | Microsite Studio" />
        <meta property="og:description" content="Affordable website, digital marketing, and branding packages for small businesses in India." />
  <meta property="og:url" content="https://micro-site.studio/plans" />
      <meta property="og:image" content="https://micro-site.studio/og/plans.jpg" />
  <meta property="og:image:alt" content="Microsite Studio pricing plans preview card" />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Microsite Studio" />
  <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Plans & Pricing | Microsite Studio" />
      <meta name="twitter:description" content="Pricing for ₹999 websites, digital marketing growth systems, and branding kits." />
      <meta name="twitter:image" content="https://micro-site.studio/og/plans.jpg" />
  <meta name="twitter:image:alt" content="Microsite Studio pricing plans preview card" />
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
      </Helmet>
      {/* Page Header */}
  <section className="bg-gray-50 dark:bg-neutral-900 py-20 transition-colors">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-black text-gray-900 dark:text-white mb-6">Our Plans</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Choose what fits your business. <span className="text-[#FF2B2B] font-semibold">Pay after delivery</span> on select services.
          </p>
        </div>
      </section>

    {/* Website Plans Section */}
  <section id="website-plans" className="py-20 bg-white dark:bg-neutral-950 transition-colors">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white text-center mb-16">Website Plans</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Starter Website */}
            <div className="bg-white dark:bg-neutral-950 border-2 border-gray-200 dark:border-neutral-800 p-8 rounded-xl hover:border-[#FF2B2B] transition-colors relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-[#FF2B2B] text-white px-4 py-2 rounded-full text-sm font-semibold">
                  Most Popular
                </span>
              </div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-[#FF2B2B] rounded-lg flex items-center justify-center">
                  <Globe className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Starter Website</h3>
              </div>
              <div className="text-4xl font-black text-[#FF2B2B] mb-6">₹999</div>
              <ul className="text-gray-700 dark:text-gray-300 space-y-3 mb-8">
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-[#FF2B2B] flex-shrink-0" />
                  One-page professional website
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-[#FF2B2B] flex-shrink-0" />
                  Mobile responsive design
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-[#FF2B2B] flex-shrink-0" />
                  Contact form integration
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-[#FF2B2B] flex-shrink-0" />
                  Template-based design
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-[#FF2B2B] flex-shrink-0" />
                  <span className="font-semibold text-[#FF2B2B]">Pay after delivery</span>
                </li>
              </ul>
              <button
                onClick={() => navigate('/services/websites')}
                className="w-full bg-[#FF2B2B] text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors"
              >
                Get Started
              </button>
            </div>

            {/* Business Website */}
            <div className="bg-white dark:bg-neutral-950 border-2 border-gray-200 dark:border-neutral-800 p-8 rounded-xl hover:border-[#FF2B2B] transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gray-100 dark:bg-neutral-800 rounded-lg flex items-center justify-center">
                  <Globe className="w-7 h-7 text-gray-600 dark:text-gray-300" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Business Website</h3>
              </div>
              <div className="text-4xl font-black text-gray-900 dark:text-white mb-6">starts from ₹3,000</div>
              <ul className="text-gray-700 dark:text-gray-300 space-y-3 mb-8">
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-[#FF2B2B] flex-shrink-0" />
                  Up to 5 pages
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-[#FF2B2B] flex-shrink-0" />
                  Custom layout design
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-[#FF2B2B] flex-shrink-0" />
                  Basic content placement
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-[#FF2B2B] flex-shrink-0" />
                  Domain & hosting support
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-[#FF2B2B] flex-shrink-0" />
                  SEO optimization
                </li>
              </ul>
              <button
                onClick={() => navigate('/services/websites')}
                className="w-full border-2 border-[#FF2B2B] text-[#FF2B2B] py-3 rounded-lg font-semibold hover:bg-[#FF2B2B] hover:text-white transition-colors"
              >
                Book Now
              </button>
            </div>

            {/* E-commerce Website */}
            <div className="bg-white dark:bg-neutral-950 border-2 border-gray-200 dark:border-neutral-800 p-8 rounded-xl hover:border-[#FF2B2B] transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gray-100 dark:bg-neutral-800 rounded-lg flex items-center justify-center">
                  <ShoppingCart className="w-7 h-7 text-gray-600 dark:text-gray-300" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">E-commerce Website</h3>
              </div>
              <div className="text-4xl font-black text-gray-900 dark:text-gray-100 mb-6">starts from ₹15,000</div>
              <ul className="text-gray-700 dark:text-gray-300 space-y-3 mb-8">
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-[#FF2B2B] flex-shrink-0" />
                  Product pages & catalog
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-[#FF2B2B] flex-shrink-0" />
                  Payment integration
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-[#FF2B2B] flex-shrink-0" />
                  Multi-page setup
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-[#FF2B2B] flex-shrink-0" />
                  Inventory management
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-[#FF2B2B] flex-shrink-0" />
                  Full support & training
                </li>
              </ul>
              <button
                onClick={() => openWhatsApp('Hi, I would like to enquire about the E-commerce Website plan (starts from ₹15,000).')}
                className="w-full border-2 border-[#FF2B2B] text-[#FF2B2B] py-3 rounded-lg font-semibold hover:bg-[#FF2B2B] hover:text-white transition-colors"
              >
                Enquire Now
              </button>
            </div>
          </div>
        </div>
      </section>

    {/* Digital Marketing & Growth Section */}
  <section id="digital-marketing" className="py-20 bg-gray-50 dark:bg-neutral-900 transition-colors scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white text-center mb-4">Digital Marketing &amp; Growth</h2>
          <p className="text-center text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-14">
            We build marketing systems that drive traffic, leads, and measurable revenue growth.
          </p>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-neutral-950 p-6 rounded-xl shadow-lg border border-transparent dark:border-neutral-800 transition-colors">
              <div className="w-10 h-10 bg-[#FF2B2B] rounded-lg flex items-center justify-center mb-4">
                <Megaphone className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Search Marketing</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">SEO, keyword research &amp; content mapping, Search Engine Marketing.</p>
            </div>

            <div className="bg-white dark:bg-neutral-950 p-6 rounded-xl shadow-lg border border-transparent dark:border-neutral-800 transition-colors">
              <div className="w-10 h-10 bg-[#FF2B2B] rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Performance Marketing</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">Google Ads, social media ads, sales funnel design and optimization.</p>
            </div>

            <div className="bg-white dark:bg-neutral-950 p-6 rounded-xl shadow-lg border border-transparent dark:border-neutral-800 transition-colors">
              <div className="w-10 h-10 bg-[#FF2B2B] rounded-lg flex items-center justify-center mb-4">
                <Camera className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Social Media Marketing</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">A/c setup &amp; management, content strategy &amp; planning, creative design &amp; copywriting.</p>
            </div>

            <div className="bg-white dark:bg-neutral-950 p-6 rounded-xl shadow-lg border border-transparent dark:border-neutral-800 transition-colors">
              <div className="w-10 h-10 bg-[#FF2B2B] rounded-lg flex items-center justify-center mb-4">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Content &amp; Media</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">Copywriting &amp; content strategy, video and email marketing, creative campaigns.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Branding & Identity Kits Section */}
      <section className="py-20 bg-white dark:bg-neutral-950 transition-colors">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white text-center mb-16">Branding & Identity Kits</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Basic Kit */}
            <div className="bg-white dark:bg-neutral-950 border-2 border-gray-200 dark:border-neutral-800 p-8 rounded-xl hover:border-[#FF2B2B] transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gray-100 dark:bg-neutral-800 rounded-lg flex items-center justify-center">
                  <Palette className="w-7 h-7 text-gray-600 dark:text-gray-300" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Basic Kit</h3>
              </div>
              <div className="text-4xl font-black text-[#FF2B2B] mb-6">₹899</div>
              <ul className="text-gray-700 dark:text-gray-300 space-y-3 mb-8">
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-[#FF2B2B] flex-shrink-0" />
                  Logo (JPG + PNG)
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-[#FF2B2B] flex-shrink-0" />
                  Color palette & fonts
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-[#FF2B2B] flex-shrink-0" />
                  Basic style guide
                </li>
              </ul>
              <button
                onClick={() => navigate('/services/branding')}
                className="w-full bg-[#FF2B2B] text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors"
              >
                Get Branding
              </button>
            </div>

            {/* Complete Kit */}
            <div className="bg-white dark:bg-neutral-950 border-2 border-[#FF2B2B] dark:border-[#FF2B2B] p-8 rounded-xl relative transition-colors">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-[#FF2B2B] text-white px-4 py-2 rounded-full text-sm font-semibold">
                  Popular
                </span>
              </div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-[#FF2B2B] rounded-lg flex items-center justify-center">
                  <Palette className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Complete Kit</h3>
              </div>
              <div className="text-4xl font-black text-[#FF2B2B] mb-6">₹1,499</div>
              <ul className="text-gray-700 dark:text-gray-300 space-y-3 mb-8">
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-[#FF2B2B] flex-shrink-0" />
                  Everything in Basic
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-[#FF2B2B] flex-shrink-0" />
                  Social media covers
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-[#FF2B2B] flex-shrink-0" />
                  Post templates
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-[#FF2B2B] flex-shrink-0" />
                  Extended style guide
                </li>
              </ul>
              <button
                onClick={() => navigate('/services/branding')}
                className="w-full bg-[#FF2B2B] text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors"
              >
                Get Branding
              </button>
            </div>

            {/* Premium Kit */}
            <div className="bg-white dark:bg-neutral-950 border-2 border-gray-200 dark:border-neutral-800 p-8 rounded-xl hover:border-[#FF2B2B] transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gray-100 dark:bg-neutral-800 rounded-lg flex items-center justify-center">
                  <Star className="w-7 h-7 text-gray-600 dark:text-gray-300" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Premium Kit</h3>
              </div>
              <div className="text-4xl font-black text-[#FF2B2B] mb-6">₹2,100</div>
              <ul className="text-gray-700 dark:text-gray-300 space-y-3 mb-8">
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-[#FF2B2B] flex-shrink-0" />
                  Everything in Complete
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-[#FF2B2B] flex-shrink-0" />
                  Business cards
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-[#FF2B2B] flex-shrink-0" />
                  Letterhead design
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-[#FF2B2B] flex-shrink-0" />
                  Custom post templates
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-[#FF2B2B] flex-shrink-0" />
                  Flyers/promotional materials
                </li>
              </ul>
              <button
                onClick={() => navigate('/services/branding')}
                className="w-full bg-[#FF2B2B] text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors"
              >
                Get Branding
              </button>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <p className="text-gray-600 dark:text-gray-400">
              <span className="font-semibold text-[#FF2B2B]">Note:</span> Premium branding kits include advanced rollout assets and governance support.
            </p>
          </div>
        </div>
      </section>

      {/* Add-ons Section */}
  <section className="py-20 bg-gray-50 dark:bg-neutral-900 transition-colors">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white text-center mb-16">Add-ons & Services</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex items-center gap-4 bg-white dark:bg-neutral-950 p-6 rounded-xl shadow-sm border border-transparent dark:border-neutral-800 transition-colors">
              <div className="w-12 h-12 bg-[#FF2B2B] rounded-lg flex items-center justify-center">
                <Server className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Domain & Hosting Setup</h3>
                <p className="text-gray-600 text-sm">Professional domain registration and hosting configuration</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 bg-white dark:bg-neutral-950 p-6 rounded-xl shadow-sm border border-transparent dark:border-neutral-800 transition-colors">
              <div className="w-12 h-12 bg-[#FF2B2B] rounded-lg flex items-center justify-center">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Business Email</h3>
                <p className="text-gray-600 text-sm">Professional email setup with your domain</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 bg-white dark:bg-neutral-950 p-6 rounded-xl shadow-sm border border-transparent dark:border-neutral-800 transition-colors">
              <div className="w-12 h-12 bg-[#FF2B2B] rounded-lg flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">WhatsApp Catalog Design</h3>
                <p className="text-gray-600 text-sm">Professional WhatsApp Business catalog setup</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 bg-white dark:bg-neutral-950 p-6 rounded-xl shadow-sm border border-transparent dark:border-neutral-800 transition-colors">
              <div className="w-12 h-12 bg-[#FF2B2B] rounded-lg flex items-center justify-center">
                <Camera className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Festival Creatives</h3>
                <p className="text-gray-600 text-sm">Custom festival and seasonal promotional graphics</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 bg-white dark:bg-neutral-950 p-6 rounded-xl shadow-sm border border-transparent dark:border-neutral-800 transition-colors">
              <div className="w-12 h-12 bg-[#FF2B2B] rounded-lg flex items-center justify-center">
                <Megaphone className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Ads Management</h3>
                <p className="text-gray-600 text-sm">Facebook and Google Ads campaign management</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
  <section className="py-20 bg-[#FF2B2B]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to start?</h2>
          <p className="text-xl text-white mb-8 opacity-90">Pay after delivery on eligible plans.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/services/websites')}
              className="bg-white text-[#FF2B2B] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
            >
              Start with ₹999 Website <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => navigate('/services')}
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-[#FF2B2B] transition-colors"
            >
              Explore Full Service Stack
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}