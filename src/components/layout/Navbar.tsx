import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import Logo from './Logo';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  
  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/services', label: 'Services' },
    { path: '/portfolio', label: 'Portfolio' },
    { path: '/about', label: 'About' },
    { path: '/enquiry', label: 'Enquiry' },
    { path: '/feedback', label: 'Feedback' },
    { path: '/contact', label: 'Contact' },
    { path: '/admin/login', label: 'Admin' },
  ];
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-md sticky top-0 z-50 border-b border-rose-100/50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          <Link to="/" className="flex items-center transform hover:scale-105 transition-transform duration-300">
            <Logo size="md" />
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-1 lg:space-x-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 lg:px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  isActive(link.path)
                    ? 'text-rose-accent bg-gradient-to-r from-soft-blush to-pink-100 shadow-sm font-bold'
                    : 'text-deep-plum hover:text-rose-accent hover:bg-soft-blush/50 font-semibold'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
          
          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-deep-plum p-2 rounded-lg hover:bg-soft-blush transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 pt-2 animate-slide-up">
            <div className="flex flex-col space-y-1 bg-white/50 backdrop-blur-sm rounded-xl p-2 shadow-elegant">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-300 ${
                    isActive(link.path)
                      ? 'text-rose-accent bg-gradient-to-r from-soft-blush to-pink-100 shadow-sm font-bold'
                      : 'text-deep-plum hover:text-rose-accent hover:bg-soft-blush/50 font-semibold'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

