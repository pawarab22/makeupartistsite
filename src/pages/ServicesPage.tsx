import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Tag from '../components/ui/Tag';
import { Link } from 'react-router-dom';
import { Sparkles, PartyPopper, Camera, Heart, Users, Baby, ArrowLeft } from 'lucide-react';

const services = [
  {
    icon: <Sparkles className="w-10 h-10" />,
    name: 'Bridal Makeup',
    description: 'Complete bridal makeup package including trial session, HD makeup, traditional and contemporary looks, elaborate hairstyling with accessories, and touch-ups throughout the day. Perfect for your most important day with traditional Indian bridal elegance.',
    priceRange: '₹15,000 - ₹35,000',
    duration: '3-4 hours',
    tag: 'Bridal',
  },
  {
    icon: <Users className="w-10 h-10" />,
    name: 'Sider Makeup',
    description: 'Professional makeup for bridesmaids, sisters, family members, and friends. Includes traditional and contemporary looks with hairstyling. Group packages available with special pricing.',
    priceRange: '₹3,000 - ₹8,000',
    duration: '1-1.5 hours',
    tag: 'Sider',
  },
  {
    icon: <Heart className="w-10 h-10" />,
    name: 'Engagement Makeup',
    description: 'Beautiful traditional and modern makeup for engagement ceremonies. Includes HD makeup, hairstyling with accessories, and jewelry coordination. Perfect for capturing your special moments.',
    priceRange: '₹8,000 - ₹18,000',
    duration: '2-3 hours',
    tag: 'Engagement',
  },
  {
    icon: <Baby className="w-10 h-10" />,
    name: 'Baby Shower Makeup',
    description: 'Fresh and radiant makeup for baby shower celebrations. Natural, glowing look with soft glam that\'s perfect for this joyous occasion. Includes hairstyling.',
    priceRange: '₹5,000 - ₹12,000',
    duration: '1.5-2 hours',
    tag: 'Baby Shower',
  },
  {
    icon: <PartyPopper className="w-10 h-10" />,
    name: 'Party Makeup',
    description: 'Glamorous party makeup for receptions, birthdays, anniversaries, and special occasions. Includes bold or subtle looks with hairstyling. Long-lasting formulas for all-night celebrations.',
    priceRange: '₹5,000 - ₹12,000',
    duration: '1.5-2 hours',
    tag: 'Party',
  },
  {
    icon: <Heart className="w-10 h-10" />,
    name: 'Pre-Wedding Makeup',
    description: 'Beautiful makeup for haldi, mehendi, sangeet, and other pre-wedding ceremonies. Traditional and modern looks with elaborate hairstyling, hair accessories, and coordination with traditional attire.',
    priceRange: '₹10,000 - ₹20,000',
    duration: '2-3 hours',
    tag: 'Pre-Wedding',
  },
  {
    icon: <Camera className="w-10 h-10" />,
    name: 'Photoshoot Makeup',
    description: 'Professional makeup for photoshoots, fashion editorials, and camera work. HD and airbrush techniques for flawless results.',
    priceRange: '₹8,000 - ₹18,000',
    duration: '2-3 hours',
    tag: 'Photoshoot',
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-rose-50/30 to-soft-blush py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="inline-flex items-center text-rose-accent hover:text-rose-600 font-medium mb-6 group transition-all"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>
        <div className="text-center mb-8 sm:mb-12 animate-fade-in">
          <span className="inline-block px-4 py-2 bg-gradient-to-r from-rose-accent to-rose-pink text-white rounded-full text-sm font-semibold mb-4 shadow-md">
            What We Offer
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-deep-plum mb-4 drop-shadow-sm" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            Our Services
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-700 max-w-3xl mx-auto px-4 font-medium">
            Professional makeup artistry tailored to your occasion and style
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {services.map((service, index) => (
            <Card key={index} hover className="flex flex-col">
              <div className="flex items-start gap-4 mb-4">
                <div className="text-rose-accent flex-shrink-0">
                  {service.icon}
                </div>
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                    <h2 className="text-xl sm:text-2xl font-bold text-deep-plum drop-shadow-sm">{service.name}</h2>
                    <Tag>{service.tag}</Tag>
                  </div>
                  <p className="text-gray-700 mb-4 text-sm sm:text-base font-medium">{service.description}</p>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-sm mb-3">
                    <div>
                      <span className="font-semibold text-deep-plum">Price: </span>
                      <span className="text-rose-accent">{service.priceRange}</span>
                      <span className="text-xs text-gray-500 ml-1">(Negotiable)</span>
                    </div>
                    <div>
                      <span className="font-semibold text-deep-plum">Duration: </span>
                      <span className="text-gray-600">{service.duration}</span>
                    </div>
                  </div>
                  <p className="text-xs text-rose-accent mb-4 font-medium">
                    💝 Our priority is your satisfaction! Prices are affordable and negotiable.
                  </p>
                  <Link to="/enquiry" state={{ service: service.name }}>
                    <Button className="w-full">Enquire Now</Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Card className="bg-gradient-to-r from-pink-50 to-rose-50 border-2 border-rose-200">
            <h3 className="text-2xl font-bold text-deep-plum mb-4 drop-shadow-sm">
              Custom Packages Available
            </h3>
            <p className="text-gray-800 mb-4 font-medium">
              Need a custom package for multiple events or special requirements?
              Contact us to create a personalized quote just for you.
            </p>
            <div className="bg-white/60 rounded-lg p-4 mb-6 border border-rose-200/50">
              <p className="text-base text-deep-plum font-semibold mb-2">
                💝 Our Priority: Your Satisfaction!
              </p>
              <p className="text-sm text-gray-700">
                We believe in making you happy and satisfied. Our prices are affordable and negotiable
                because your happiness matters most to us. Let's work together to create the perfect look
                within your budget!
              </p>
            </div>
            <Link to="/contact">
              <Button>Get Custom Quote</Button>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
}

