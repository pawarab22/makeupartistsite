import Card from '../ui/Card';
import { Calendar, Eye, Palette, Sparkles } from 'lucide-react';

const steps = [
  {
    icon: <Calendar className="w-10 h-10" />,
    step: 'Step 1',
    title: 'Book a Consultation',
    description: 'Reach out via enquiry form or call. We\'ll discuss your event details, preferences, and requirements.',
  },
  {
    icon: <Eye className="w-10 h-10" />,
    step: 'Step 2',
    title: 'Look & Aura Analysis',
    description: 'We analyze your skin tone, features, and personal style to create a customized look that enhances your natural beauty.',
  },
  {
    icon: <Palette className="w-10 h-10" />,
    step: 'Step 3',
    title: 'Trial / Finalizing',
    description: 'Schedule a trial session to perfect your look. We\'ll adjust colors, techniques, and products until it\'s perfect.',
  },
  {
    icon: <Sparkles className="w-10 h-10" />,
    step: 'Step 4',
    title: 'Event Day Glam',
    description: 'On your special day, we arrive on time with all products and tools to create your flawless, camera-ready look.',
  },
];

export default function HowItWorks() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-soft-blush via-pink-50/50 to-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-rose-200/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-200/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-8 sm:mb-12 animate-fade-in">
          <span className="inline-block px-3 sm:px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-xs sm:text-sm font-semibold text-rose-accent mb-4 shadow-md">
            Our Process
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-deep-plum mb-4 px-4 drop-shadow-sm" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            How It Works
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-700 max-w-2xl mx-auto px-4 font-medium">
            A simple, stress-free process to get you looking and feeling your absolute best
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 px-2 sm:px-0">
          {steps.map((step, index) => (
            <Card 
              key={index} 
              hover 
              className="text-center relative border-2 border-transparent hover:border-rose-200 transition-all duration-300"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-10">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-rose-accent to-rose-pink flex items-center justify-center text-white shadow-lg shadow-rose-accent/40 transform hover:scale-110 transition-transform duration-300">
                  {step.icon}
                </div>
              </div>
              <div className="mt-6 sm:mt-8">
                <span className="text-xs sm:text-sm font-bold text-rose-accent bg-rose-50 px-3 py-1 rounded-full">
                  {step.step}
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-deep-plum mb-3 mt-3 drop-shadow-sm">{step.title}</h3>
                <p className="text-gray-700 text-sm leading-relaxed font-medium">{step.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

