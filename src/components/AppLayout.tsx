import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import BackButton from './BackButton';
import { useEffect, useState, useRef } from 'react';
import { ArrowLeft } from 'lucide-react';
import Footer from './Footer';

function humanize(pathSegment: string) {
  if (!pathSegment) return '';
  return pathSegment
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase());
}

export default function AppLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showFloat, setShowFloat] = useState(false);
  const lastPathRef = useRef(location.pathname);

  const segments = location.pathname.split('/').filter(Boolean);
  const depth = segments.length; // root has depth 0

  useEffect(() => {
    const onScroll = () => {
      setShowFloat(window.scrollY > 180); // appear after some scroll
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [location.pathname]);

  // Scroll to top on route (pathname) change so footer links land user at correct start
  useEffect(() => {
    if (lastPathRef.current !== location.pathname) {
      // Use auto for immediate; could switch to smooth but that can feel odd on rapid navigation
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
      lastPathRef.current = location.pathname;
    }
  }, [location.pathname]);

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  // Dynamic label (optional)
  const label = 'Back';
  const last = segments[segments.length - 1];
  const lastLabel = last ? humanize(last) : '';

  // Breadcrumb builder (custom mapping for nicer labels / hierarchy)
  function buildBreadcrumbs(pathname: string) {
    const crumbs: { label: string; to?: string }[] = [{ label: 'Home', to: '/' }];

    if (pathname === '/services') {
      crumbs.push({ label: 'Services' });
      return crumbs;
    } else if (pathname.startsWith('/services/')) {
      crumbs.push({ label: 'Services', to: '/services' });
      if (pathname === '/services/websites') crumbs.push({ label: 'Websites' });
      else if (pathname === '/services/social-media') crumbs.push({ label: 'Social Media' });
      else if (pathname === '/services/branding') crumbs.push({ label: 'Branding' });
    } else if (pathname.startsWith('/order/summary')) {
      // Trail: Home / Services / Websites / Summary
      crumbs.push({ label: 'Services', to: '/services' });
      crumbs.push({ label: 'Websites', to: '/services/websites' });
      crumbs.push({ label: 'Summary' });
      return crumbs;
    } else if (pathname.startsWith('/order/details')) {
      crumbs.push({ label: 'Order', to: '/order/summary' });
      crumbs.push({ label: 'Details' });
      return crumbs;
    } else if (pathname.startsWith('/order/success')) {
      crumbs.push({ label: 'Order', to: '/order/summary' });
      crumbs.push({ label: 'Success' });
      return crumbs;
    } else if (pathname === '/plans') {
      crumbs.push({ label: 'Plans' });
      return crumbs;
    } else if (pathname === '/portfolio') {
      crumbs.push({ label: 'Portfolio' });
      return crumbs;
    }

    // Fallback generic segmentation for any remaining depth (skip first slash)
    if (crumbs.length === 1 && segments.length) {
      let acc = '';
      segments.forEach((seg, idx) => {
        acc += `/${seg}`;
        const isLast = idx === segments.length - 1;
        crumbs.push({ label: humanize(seg), to: isLast ? undefined : acc });
      });
    }
    return crumbs;
  }

  const breadcrumbs = buildBreadcrumbs(location.pathname);

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 transition-colors">
      <Navbar />
      {depth > 0 && (
        <div className="max-w-7xl mx-auto w-full px-4 md:px-6 mt-3 hidden md:flex flex-col">
          <div className="flex items-center gap-6">
            <BackButton label={`Back${lastLabel ? ' from ' + lastLabel : ''}`} className="!px-2 !py-1.5" />
            <nav aria-label="Breadcrumb" className="flex-1">
              <ol className="flex flex-wrap items-center gap-2 text-[12px] font-medium tracking-wide">
                {breadcrumbs.map((c, i) => {
                  const isLast = i === breadcrumbs.length - 1;
                  return (
                    <li key={i} className="flex items-center gap-2">
                      {c.to && !isLast ? (
                        <button
                          onClick={() => navigate(c.to!)}
                          className="text-gray-500 dark:text-gray-400 hover:text-[#FF2B2B] transition-colors"
                        >
                          {c.label}
                        </button>
                      ) : (
                        <span className={`$${'{'}isLast ? 'text-gray-800 dark:text-gray-200 font-semibold' : 'text-gray-500 dark:text-gray-400'}$`}>{c.label}</span>
                      )}
                      {!isLast && <span className="text-gray-300 dark:text-neutral-600">/</span>}
                    </li>
                  );
                })}
              </ol>
            </nav>
          </div>
          <div className="h-px bg-gradient-to-r from-transparent via-neutral-200/70 dark:via-neutral-700/50 to-transparent mt-3" />
        </div>
      )}
      <Outlet />
      {/* Floating mobile back button */}
      {depth > 0 && (
        <button
          onClick={handleBack}
          aria-label={label}
          className={`md:hidden fixed left-4 bottom-4 z-50 inline-flex items-center gap-2 rounded-full bg-neutral-900/85 dark:bg-neutral-900 text-white shadow-lg shadow-black/40 border border-white/10 backdrop-blur-sm px-4 py-3 text-xs font-semibold tracking-tight transition-all ${showFloat ? 'opacity-100 translate-y-0' : 'opacity-0 pointer-events-none translate-y-2'} active:scale-95`}
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
      )}
      <Footer />
    </div>
  );
}
