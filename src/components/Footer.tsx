import { MessageCircle, Phone, Mail, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../MICROSITE red logo.png';

export default function Footer() {
  return (
    <footer className="bg-neutral-900 dark:bg-neutral-950 text-white py-14 mt-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-start mb-5 group">
              <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-[#FF2B2B]/80 group-hover:ring-[#FF2B2B] bg-white dark:bg-neutral-800 flex items-center justify-center shadow transition-all">
                <img
                  src={logo}
                  alt="Microsite Logo"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <span aria-hidden="true" className="ml-4 mr-4 mt-1 h-10 w-px bg-neutral-700/70 rounded-full hidden sm:inline" />
              <div className="pt-1">
                <h3 className="text-[15px] font-semibold tracking-[0.08em] text-white leading-tight select-none">MICROSITE <span className="text-[#FF2B2B] group-hover:text-rose-400 transition-colors">STUDIO</span></h3>
                <p className="text-[#FF2B2B]/90 text-[10px] font-medium mt-2 tracking-[0.24em] uppercase">Ideas Into Impact</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">Helping small businesses get online with affordable websites, social media management, and branding solutions.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Services</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link to="/portfolio" className="hover:text-white transition-colors">Portfolio</Link></li>
              <li><Link to="/#contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link to="/services/websites" className="hover:text-white transition-colors">₹499 Websites</Link></li>
              <li><Link to="/services/social-media" className="hover:text-white transition-colors">Social Media</Link></li>
              <li><Link to="/services/branding" className="hover:text-white transition-colors">Branding</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">All Services</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li>
                <a href="https://wa.me/919060868026" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white transition-colors">
                  <MessageCircle className="w-4 h-4" /> WhatsApp
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/micrositestudio/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white transition-colors">
                  <Instagram className="w-4 h-4" /> Instagram
                </a>
              </li>
              <li>
                <a href="tel:+919060868026" className="flex items-center gap-2 hover:text-white transition-colors">
                  <Phone className="w-4 h-4" /> Phone Support
                </a>
              </li>
              <li>
                <a href="mailto:contact@micro-site.studio" className="flex items-center gap-2 hover:text-white transition-colors">
                  <Mail className="w-4 h-4" /> Email Support
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-neutral-800 mt-10 pt-8 text-center text-gray-500 text-xs">
          <p>&copy; {new Date().getFullYear()} Microsite. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}