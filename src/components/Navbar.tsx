import { useEffect, useCallback, useState, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../MICROSITE red logo.png';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const toggleRef = useRef<HTMLButtonElement | null>(null);
  // Force dark mode once on mount
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  }, []);

  const closeMobile = () => setMobileOpen(false);

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
      closeMobile();
      return;
    }
    // Navigate with state so Home can scroll after mount
    navigate('/', { state: { scrollTo: 'contact' } });
    closeMobile();
  }, [location.pathname, navigate]);

  // Close on route change
  useEffect(() => { closeMobile(); }, [location.pathname]);

  // Close on escape & outside click
  useEffect(() => {
    if (!mobileOpen) {
      document.body.style.overflow = '';
      return;
    }
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeMobile(); };
    const onClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (menuRef.current && menuRef.current.contains(target)) return; // inside menu
      if (toggleRef.current && toggleRef.current.contains(target)) return; // toggle button
      closeMobile();
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('click', onClick);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('click', onClick);
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

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
            <button
              ref={toggleRef}
              className="text-gray-200 hover:text-[#FF2B2B] transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF2B2B]/50 rounded p-1"
              aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(o => !o)}
            >
              {mobileOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu Panel */}
      <div
        className={`md:hidden overflow-hidden transition-[max-height] duration-300 ease-out bg-neutral-900 border-b border-neutral-800 ${mobileOpen ? 'max-h-[480px]' : 'max-h-0'}`}
        ref={menuRef}
        aria-hidden={!mobileOpen}
      >
        <div className="px-6 pt-4 pb-6 flex flex-col gap-4">
          {(() => {
            const path = location.pathname;
            const linkCls = (active: boolean) => `block w-full text-left px-1 py-1.5 rounded-md text-sm font-medium transition-colors ${active ? 'text-[#FF2B2B]' : 'text-gray-300 hover:text-white hover:bg-neutral-800'}`;
            return (
              <>
                <Link to="/" className={linkCls(path === '/')} onClick={closeMobile}>Home</Link>
                <Link to="/services" className={linkCls(path === '/services' || path.startsWith('/services/'))} onClick={closeMobile}>Services</Link>
                <Link to="/plans" className={linkCls(path === '/plans')} onClick={closeMobile}>Plans</Link>
                <Link to="/portfolio" className={linkCls(path === '/portfolio')} onClick={closeMobile}>Portfolio</Link>
                <button onClick={handleContactClick} className={linkCls(false)}>Contact</button>
                <button
                  onClick={() => { navigate('/services'); closeMobile(); }}
                  className="mt-2 bg-[#FF2B2B] text-white w-full py-2.5 rounded-lg font-semibold text-sm hover:bg-red-600 active:scale-[0.97] transition-all shadow-sm"
                >
                  Get Started
                </button>
              </>
            );
          })()}
        </div>
      </div>
    </nav>
  );
}