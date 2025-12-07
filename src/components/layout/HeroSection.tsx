import { Link } from 'react-router-dom';
import Button from '../ui/Button';

export default function HeroSection() {
  return (
    <section className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-soft-blush via-pink-50 via-rose-50 to-white overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-5 sm:top-20 sm:left-10 w-48 h-48 sm:w-72 sm:h-72 bg-rose-accent rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-10 right-5 sm:bottom-20 sm:right-10 w-64 h-64 sm:w-96 sm:h-96 bg-pink-300 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 sm:w-60 sm:h-60 bg-rose-pink rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-20 right-10 sm:right-20 w-2 h-2 bg-rose-accent rounded-full animate-pulse"></div>
      <div className="absolute bottom-32 left-16 sm:left-24 w-3 h-3 bg-rose-pink rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      
      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-in">
        <div className="mb-6 animate-slide-up">
          <span className="inline-block px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-sm font-semibold text-rose-accent shadow-soft mb-4">
            ✨ Premium Makeup Artistry
          </span>
        </div>
        
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 leading-tight">
          <span className="block text-deep-plum mb-2 drop-shadow-md" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>Pooja's</span>
          <span className="block bg-gradient-to-r from-rose-accent via-rose-pink to-muted-rose bg-clip-text text-transparent drop-shadow-md" style={{ WebkitTextFillColor: 'transparent', textShadow: '0 2px 4px rgba(194, 24, 91, 0.3)' }}>
            Aura Artistry
          </span>
        </h1>
        
        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-gray-900 mb-4 animate-slide-up drop-shadow-sm" style={{ animationDelay: '0.2s', textShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>
          Where your aura meets flawless glam ✨
        </p>
        
        <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed px-4 animate-slide-up drop-shadow-sm" style={{ animationDelay: '0.4s', textShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
          Aura-inspired bridal & party makeovers that let your inner glow shine. 
          Professional makeup artistry for your most special moments.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 lg:gap-8 justify-center items-stretch sm:items-center animate-slide-up" style={{ animationDelay: '0.6s' }}>
          <Link to="/enquiry" className="w-full sm:w-auto sm:flex-1 sm:max-w-[280px]">
            <Button 
              size="lg" 
              className="w-full sm:w-full shadow-lg hover:shadow-xl hover:shadow-rose-accent/40 transform hover:scale-105 transition-all duration-300 bg-gradient-to-r from-rose-accent via-rose-pink to-muted-rose"
            >
              <span className="flex flex-col items-center gap-1">
                <span className="font-bold">Book Your Makeover</span>
                <span className="text-lg">💄</span>
              </span>
            </Button>
          </Link>
          <Link to="/portfolio" className="w-full sm:w-auto sm:flex-1 sm:max-w-[280px]">
            <Button 
              variant="outline" 
              size="lg" 
              className="w-full sm:w-full transform hover:scale-105 transition-all duration-300 bg-white border-2 border-rose-accent text-rose-accent shadow-md"
            >
              <span className="flex items-center justify-center gap-2">
                <span className="font-bold">View Portfolio</span>
                <span>📸</span>
              </span>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

