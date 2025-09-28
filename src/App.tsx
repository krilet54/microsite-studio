import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Home from './pages/Home';
import Plans from './pages/Plans';
import Portfolio from './pages/Portfolio';
import About from './pages/About';
import OrderSummary from './pages/OrderSummary';
import OrderDetails from './pages/OrderDetails';
import OrderSuccess from './pages/OrderSuccess';
import { OrderProvider } from './context/OrderContext';
import WebsitePackages from './pages/WebsitePackages';
import SocialMediaPlans from './pages/SocialMediaPlans';
import BrandingPackages from './pages/BrandingPackages';
import Services from './pages/Services';
import AppLayout from './components/AppLayout';

// Breadcrumbs JSON-LD component
const BreadcrumbsSchema: React.FC = () => {
  const location = useLocation();
  const segments = location.pathname.split('/').filter(Boolean);
  // Use the primary production domain for structured data URLs
  const baseUrl = 'https://www.micrositestudio.in';

  const items = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: baseUrl + '/',
    },
    ...segments.map((seg, idx) => {
      const path = '/' + segments.slice(0, idx + 1).join('/');
      const formatted = seg
        .replace(/-/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase());
      return {
        '@type': 'ListItem',
        position: idx + 2,
        name: formatted,
        item: baseUrl + path,
      };
    }),
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items,
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>
  );
};

function App() {
  return (
    <Router>
      <OrderProvider>
        <BreadcrumbsSchema />
        <Routes>
          <Route element={<AppLayout />}> 
            <Route path="/" element={<Home />} />
            <Route path="/plans" element={<Plans />} />
            <Route path="/services" element={<Services />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/about" element={<About />} />
            <Route path="/order/summary" element={<OrderSummary />} />
            <Route path="/services/websites" element={<WebsitePackages />} />
            <Route path="/services/social-media" element={<SocialMediaPlans />} />
            <Route path="/services/branding" element={<BrandingPackages />} />
            <Route path="/order/details" element={<OrderDetails />} />
            <Route path="/order/success" element={<OrderSuccess />} />
          </Route>
        </Routes>
      </OrderProvider>
    </Router>
  );
}

export default App;