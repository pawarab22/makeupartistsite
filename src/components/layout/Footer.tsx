import { Link } from 'react-router-dom';
import { Instagram, MessageCircle, Mail, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-deep-plum to-gray-900 text-white mt-12 sm:mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 sm:gap-3 mb-4">
              <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-18 lg:h-18 transform hover:scale-105 transition-transform duration-300">
                <svg 
                  viewBox="0 0 200 200" 
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full drop-shadow-lg"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <defs>
                    <linearGradient id="footerLogoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{ stopColor: '#f093fb', stopOpacity: 1 }} />
                      <stop offset="100%" style={{ stopColor: '#f5576c', stopOpacity: 1 }} />
                    </linearGradient>
                    <linearGradient id="footerLogoGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{ stopColor: '#E91E63', stopOpacity: 1 }} />
                      <stop offset="100%" style={{ stopColor: '#FF6B9D', stopOpacity: 1 }} />
                    </linearGradient>
                    <linearGradient id="footerBrushGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{ stopColor: '#FFD700', stopOpacity: 1 }} />
                      <stop offset="100%" style={{ stopColor: '#FFA500', stopOpacity: 1 }} />
                    </linearGradient>
                  </defs>
                  
                  <circle cx="100" cy="100" r="95" fill="url(#footerLogoGradient)" opacity="0.15"/>
                  <circle cx="100" cy="100" r="85" fill="url(#footerLogoGradient)" opacity="0.2"/>
                  <circle cx="100" cy="100" r="75" fill="url(#footerLogoGradient)" stroke="url(#footerLogoGradient2)" strokeWidth="2.5"/>
                  
                  <g transform="translate(40, 80) rotate(-15)">
                    <rect x="0" y="0" width="8" height="45" rx="4" fill="url(#footerBrushGradient)" opacity="0.9"/>
                    <ellipse cx="4" cy="50" rx="12" ry="8" fill="#FFB6C1" opacity="0.8"/>
                    <ellipse cx="4" cy="52" rx="10" ry="6" fill="#FFC0CB" opacity="0.9"/>
                  </g>
                  
                  <g transform="translate(152, 75)">
                    <rect x="0" y="0" width="12" height="35" rx="2" fill="#FF1493" opacity="0.9"/>
                    <rect x="2" y="0" width="8" height="5" rx="1" fill="#FF69B4"/>
                    <ellipse cx="6" cy="38" rx="5" ry="3" fill="#DC143C"/>
                  </g>
                  
                  <circle cx="100" cy="35" r="3" fill="#FFD700" opacity="0.9">
                    <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite"/>
                  </circle>
                  <path d="M 100 30 L 100 25 M 95 35 L 90 35 M 105 35 L 110 35" stroke="#FFD700" strokeWidth="2" opacity="0.8">
                    <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite"/>
                  </path>
                  
                  <g transform="translate(85, 85)">
                    <circle cx="15" cy="15" r="18" fill="none" stroke="#FFD700" strokeWidth="2" opacity="0.6"/>
                    <circle cx="15" cy="15" r="14" fill="url(#footerLogoGradient)" opacity="0.3"/>
                    <ellipse cx="15" cy="15" rx="10" ry="12" fill="#E0E0E0" opacity="0.4"/>
                  </g>
                  
                  <text 
                    x="100" 
                    y="135" 
                    fontFamily="Arial, sans-serif" 
                    fontSize="36" 
                    fontWeight="bold" 
                    fill="white" 
                    textAnchor="middle" 
                    opacity="0.95"
                    style={{ letterSpacing: '2px' }}
                  >
                    PAA
                  </text>
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-tight">
                  <span className="block text-rose-200 sm:text-rose-100">Pooja's</span>
                  <span className="block bg-gradient-to-r from-rose-200 via-pink-300 to-rose-200 bg-clip-text text-transparent" style={{ WebkitTextFillColor: 'transparent' }}>
                    Aura Artistry
                  </span>
                </h1>
              </div>
            </div>
            <p className="mt-4 text-sm sm:text-base text-gray-200 leading-relaxed mb-4 font-medium">
              Where your aura meets flawless glam. Professional makeup artistry for your special moments.
            </p>
            <div className="mt-4">
              <p className="text-xs sm:text-sm text-rose-200 font-semibold mb-2">Service Locations:</p>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {['Mumbai', 'Satara', 'Patan', 'Koyana'].map((location) => (
                  <span
                    key={location}
                    className="px-2 py-1 bg-rose-accent/20 text-rose-200 rounded-full text-xs font-medium border border-rose-300/30"
                  >
                    {location}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-base sm:text-lg font-bold mb-4 text-rose-200">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/services" className="hover:text-rose-300 transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-rose-accent rounded-full"></span>
                  Services
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="hover:text-rose-300 transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-rose-accent rounded-full"></span>
                  Portfolio
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-rose-300 transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-rose-accent rounded-full"></span>
                  About
                </Link>
              </li>
              <li>
                <Link to="/enquiry" className="hover:text-rose-300 transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-rose-accent rounded-full"></span>
                  Book Now
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-base sm:text-lg font-bold mb-4 text-rose-200">Get in Touch</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 group">
                <div className="p-2 bg-rose-accent/20 rounded-lg group-hover:bg-rose-accent/30 transition-colors">
                  <Phone size={16} />
                </div>
                <a href="tel:+919021585686" className="hover:text-rose-300 transition-colors">
                  +91 90215 85686
                </a>
              </li>
              <li className="flex items-center gap-2 group">
                <div className="p-2 bg-rose-accent/20 rounded-lg group-hover:bg-rose-accent/30 transition-colors">
                  <Mail size={16} />
                </div>
                <a href="mailto:info.pooja.saura.artistry@gmail.com" className="hover:text-rose-300 transition-colors break-all">
                  info.pooja.saura.artistry@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2 group">
                <div className="p-2 bg-rose-accent/20 rounded-lg group-hover:bg-rose-accent/30 transition-colors">
                  <MessageCircle size={16} />
                </div>
                <a href="https://wa.me/919021585686" target="_blank" rel="noopener noreferrer" className="hover:text-rose-300 transition-colors">
                  +91 90215 85686
                </a>
              </li>
              <li className="flex items-center gap-2 group">
                <div className="p-2 bg-rose-accent/20 rounded-lg group-hover:bg-rose-accent/30 transition-colors">
                  <Instagram size={16} />
                </div>
                <a href="https://www.instagram.com/makeover_by_pooja04?igsh=YXVnOTY5NmM3NDBv" target="_blank" rel="noopener noreferrer" className="hover:text-rose-300 transition-colors break-all">
                  @makeover_by_pooja04
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700/50 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-xs sm:text-sm text-gray-300">
          <p className="font-medium">&copy; {new Date().getFullYear()} Pooja's Aura Artistry. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

