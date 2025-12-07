import { Link } from 'react-router-dom';
import Button from '../ui/Button';

export default function CallToAction() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-r from-rose-accent via-rose-pink to-muted-rose text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-15">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-2xl animate-float"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-white rounded-full blur-2xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-white rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>
      
      {/* Dark overlay for better text contrast */}
      <div className="absolute inset-0 bg-black/10"></div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 animate-fade-in">
        <div className="inline-block mb-6 sm:mb-8">
          <span className="px-5 py-2.5 sm:px-6 sm:py-3 bg-white/90 backdrop-blur-md rounded-full text-sm sm:text-base font-bold text-rose-accent shadow-2xl border-2 border-white/50">
            ✨ Transform Your Look
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold mb-5 sm:mb-7 leading-tight px-4 text-white drop-shadow-2xl" style={{ textShadow: '0 4px 12px rgba(0, 0, 0, 0.3), 0 2px 4px rgba(0, 0, 0, 0.2)' }}>
          Ready for Your Aura Glow-Up? ✨
        </h2>
        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-8 sm:mb-10 md:mb-12 text-white font-semibold max-w-2xl mx-auto px-4 drop-shadow-xl leading-relaxed" style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.25)' }}>
          Let's create a look that's as unique and beautiful as you are
        </p>
        <Link to="/enquiry" className="inline-block transform hover:scale-105 transition-transform duration-300">
          <Button variant="secondary" size="lg" className="shadow-2xl hover:shadow-xl hover:shadow-white/30 bg-white/95 text-rose-accent font-bold text-lg sm:text-xl px-8 sm:px-10 py-4 sm:py-5 border-2 border-white">
            Submit an Enquiry 💄
          </Button>
        </Link>
      </div>
    </section>
  );
}

