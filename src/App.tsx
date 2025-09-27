import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

function App() {
  return (
    <Router>
      <OrderProvider>
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