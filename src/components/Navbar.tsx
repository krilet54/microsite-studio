import { useEffect, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../MICROSITE red logo.png';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  // Force dark mode once on mount
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  }, []);

  const handleContactClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    // If already on home, just smooth scroll
    if (location.pathname === '/') {
      const el = document.getElementById('contact');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Optional subtle highlight pulse
        el.classList.add('ring-temp-contact');
        setTimeout(() => el.classList.remove('ring-temp-contact'), 1200);
      }
      return;
    }
    // Navigate with state so Home can scroll after mount
    navigate('/', { state: { scrollTo: 'contact' } });
  }, [location.pathname, navigate]);

  return (
  <nav className="bg-neutral-900 shadow-sm border-b border-neutral-800 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-[#FF2B2B]/80 group-hover:ring-[#FF2B2B] transition-all shadow-md bg-white dark:bg-neutral-800 flex items-center justify-center">
                <img
                  src={logo}
                  alt="Microsite Logo"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <span aria-hidden="true" className="hidden sm:inline h-6 w-px bg-neutral-700 rounded-full" />
              <span className="hidden sm:inline text-[15px] font-semibold tracking-[0.08em] text-white select-none">
                MICROSITE <span className="text-[#FF2B2B] transition-colors group-hover:text-rose-400">STUDIO</span>
              </span>
            </Link>
          </div>
          
          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-7">
            {(() => {
              const path = location.pathname;
              const mkClass = (active: boolean) => [
                'relative group px-0 pb-1 font-medium transition-colors',
                'text-gray-200 hover:text-[#FF2B2B]',
                'after:content-[""] after:absolute after:left-0 after:-bottom-0.5 after:h-[2px] after:rounded-full after:bg-[#FF2B2B] after:transition-transform after:duration-300 after:origin-left',
                active ? 'text-[#FF2B2B] after:scale-x-100' : 'after:scale-x-0 group-hover:after:scale-x-100'
              ].join(' ');
              return (
                <>
                  <Link to="/" aria-current={path === '/' ? 'page' : undefined} className={mkClass(path === '/')}>Home</Link>
                  <Link to="/services" aria-current={path === '/services' || path.startsWith('/services/') ? 'page' : undefined} className={mkClass(path === '/services' || path.startsWith('/services/'))}>Services</Link>
                  <Link to="/plans" aria-current={path === '/plans' ? 'page' : undefined} className={mkClass(path === '/plans')}>Plans</Link>
                  <Link to="/portfolio" aria-current={path === '/portfolio' ? 'page' : undefined} className={mkClass(path === '/portfolio')}>Portfolio</Link>
                </>
              );
            })()}
            <button
              onClick={handleContactClick}
              className="relative px-0 pb-1 font-medium text-gray-200 hover:text-[#FF2B2B] transition-colors focus:outline-none"
              aria-label="Go to contact section"
            >
              Contact
            </button>
            <span aria-hidden="true" className="h-6 w-px bg-neutral-700 rounded-full" />
            <button
              onClick={() => navigate('/services')}
              className="bg-[#FF2B2B] text-white px-5 py-2 rounded-lg font-semibold hover:bg-red-600 active:scale-[0.97] transition-all shadow-sm hover:shadow flex items-center gap-1"
              aria-label="Go to services overview"
            >
              <span>Get Started</span>
            </button>
            {/* Theme toggle removed */}
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button className="text-gray-700 hover:text-[#FF2B2B] transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}