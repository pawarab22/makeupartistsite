import Card from '../components/ui/Card';
import { Award, Sparkles, MapPin, Heart } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-rose-50/30 to-soft-blush py-8 sm:py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 animate-fade-in">
          <span className="inline-block px-4 py-2 bg-gradient-to-r from-rose-accent to-rose-pink text-white rounded-full text-sm font-semibold mb-4 shadow-md">
            About Us
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-deep-plum mb-4 drop-shadow-sm" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>About Pooja</h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-700 px-4 font-medium">
            Your trusted makeup artist for life's most beautiful moments
          </p>
        </div>
        
        {/* Profile Section */}
        <Card className="mb-12">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-shrink-0 flex justify-center md:justify-start">
              <div className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-full bg-gradient-to-br from-pink-200 to-rose-200 flex items-center justify-center overflow-hidden shadow-lg">
                <div className="w-full h-full bg-gradient-to-br from-rose-300 to-pink-300 flex items-center justify-center">
                  <span className="text-4xl sm:text-5xl md:text-6xl">💄✨</span>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl sm:text-3xl font-bold text-deep-plum mb-4 drop-shadow-sm">Pooja's Story</h2>
              <p className="text-gray-800 mb-4 leading-relaxed font-medium">
                As a certified makeup artist with 6 months of dedicated experience in the beauty industry, 
                Pooja has been passionate about helping women look and feel their absolute best on their 
                most important days. Specializing in bridal makeup, party glam, and editorial looks, 
                she combines technical expertise with an artistic eye to create stunning transformations.
              </p>
              <p className="text-gray-800 mb-4 leading-relaxed font-medium">
                Pooja believes that makeup is more than just cosmetics—it's a way to enhance your 
                natural beauty and express your unique aura. Her approach is personalized, ensuring 
                each client receives a look that's perfectly tailored to their features, skin tone, 
                and personal style.
              </p>
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div>
                  <p className="text-3xl font-bold text-rose-accent">6</p>
                  <p className="text-sm text-gray-700 font-medium">Months Experience</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-rose-accent">20+</p>
                  <p className="text-sm text-gray-700 font-medium">Happy Customers</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
        
        {/* Specialties */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-deep-plum mb-6 text-center drop-shadow-sm" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>Specialties</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <h3 className="font-bold text-deep-plum mb-2 drop-shadow-sm">Soft Glam & HD Makeup</h3>
              <p className="text-gray-700 text-sm font-medium">
                Creating natural, flawless looks that enhance your features without looking heavy
              </p>
            </Card>
            <Card>
              <h3 className="font-bold text-deep-plum mb-2 drop-shadow-sm">Airbrush Techniques</h3>
              <p className="text-gray-700 text-sm font-medium">
                Professional airbrush makeup for long-lasting, camera-ready perfection
              </p>
            </Card>
            <Card>
              <h3 className="font-bold text-deep-plum mb-2 drop-shadow-sm">Camera-Ready Looks</h3>
              <p className="text-gray-700 text-sm font-medium">
                Expertise in makeup that photographs beautifully in any lighting
              </p>
            </Card>
            <Card>
              <h3 className="font-bold text-deep-plum mb-2 drop-shadow-sm">Custom Color Matching</h3>
              <p className="text-gray-700 text-sm font-medium">
                Perfect color matching for your skin tone and undertones
              </p>
            </Card>
          </div>
        </div>
        
        {/* Why Choose */}
        <div>
          <h2 className="text-3xl font-bold text-deep-plum mb-6 text-center drop-shadow-sm" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            Why Choose Pooja's Aura Artistry?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card hover>
              <div className="flex items-start gap-4">
                <div className="text-rose-accent flex-shrink-0">
                  <Award className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-bold text-deep-plum mb-2 drop-shadow-sm">🏅 Certified Makeup Artist</h3>
                  <p className="text-gray-700 text-sm font-medium">
                    Pooja is a certified makeup artist with professional certification and continuous 
                    training in latest techniques and trends. Her dedication to learning and perfecting 
                    her craft ensures you receive the best service.
                  </p>
                </div>
              </div>
            </Card>
            
            <Card hover>
              <div className="flex items-start gap-4">
                <div className="text-rose-accent flex-shrink-0">
                  <Sparkles className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-bold text-deep-plum mb-2 drop-shadow-sm">💄 High-End Luxury Products</h3>
                  <p className="text-gray-700 text-sm font-medium">
                    Using only premium, long-lasting products from top international brands
                  </p>
                </div>
              </div>
            </Card>
            
            <Card hover>
              <div className="flex items-start gap-4">
                <div className="text-rose-accent flex-shrink-0">
                  <Sparkles className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-bold text-deep-plum mb-2 drop-shadow-sm">✨ Custom Looks Based on Your Aura</h3>
                  <p className="text-gray-700 text-sm font-medium">
                    Personalized approach that considers your unique features, style, and personality
                  </p>
                </div>
              </div>
            </Card>
            
            <Card hover>
              <div className="flex items-start gap-4">
                <div className="text-rose-accent flex-shrink-0">
                  <Heart className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-bold text-deep-plum mb-2 drop-shadow-sm">💝 Affordable & Customer-Focused</h3>
                  <p className="text-gray-700 text-sm font-medium">
                    Your satisfaction is our top priority! We offer affordable, negotiable prices 
                    because we want happy, satisfied customers above all else.
                  </p>
                </div>
              </div>
            </Card>
            
            <Card hover>
              <div className="flex items-start gap-4">
                <div className="text-rose-accent flex-shrink-0">
                  <MapPin className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-bold text-deep-plum mb-2 drop-shadow-sm">📍 Service Locations</h3>
                  <p className="text-gray-700 text-sm mb-3 font-medium">
                    Convenient on-location services for your home, hotel, or venue
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {['Mumbai', 'Satara', 'Patan', 'Koyana'].map((location) => (
                      <span
                        key={location}
                        className="px-2.5 py-1 bg-gradient-to-r from-soft-blush to-pink-100 text-deep-plum rounded-full text-xs font-semibold border border-rose-200/50"
                      >
                        {location}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

