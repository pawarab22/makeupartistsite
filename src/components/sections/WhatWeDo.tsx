import Card from '../ui/Card';
import { Sparkles, PartyPopper, Heart, Users, Baby } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';

const services = [
  {
    icon: <Sparkles className="w-8 h-8" />,
    title: 'Bridal Makeup 👰',
    description: 'Complete bridal glam package with trial, HD makeup, and touch-ups for your special day.',
    price: 'Starting at ₹15,000',
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: 'Sider Makeup 👥',
    description: 'Makeup for bridesmaids, family members, and friends. Group packages available.',
    price: 'Starting at ₹3,000',
  },
  {
    icon: <Heart className="w-8 h-8" />,
    title: 'Engagement Makeup 💍',
    description: 'Beautiful makeup for engagement ceremonies. Soft glam that photographs beautifully.',
    price: 'Starting at ₹8,000',
  },
  {
    icon: <Baby className="w-8 h-8" />,
    title: 'Baby Shower Makeup 👶',
    description: 'Fresh and radiant makeup for baby shower celebrations. Natural, glowing look.',
    price: 'Starting at ₹5,000',
  },
  {
    icon: <PartyPopper className="w-8 h-8" />,
    title: 'Party Makeup 🎉',
    description: 'Glamorous looks for parties, receptions, birthdays, and special celebrations.',
    price: 'Starting at ₹5,000',
  },
  {
    icon: <Heart className="w-8 h-8" />,
    title: 'Pre-Wedding Makeup 💐',
    description: 'Beautiful makeup for haldi, mehendi, sangeet, and other pre-wedding ceremonies.',
    price: 'Starting at ₹10,000',
  },
];

export default function WhatWeDo() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-white via-rose-50/30 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 animate-fade-in">
          <span className="inline-block px-4 py-2 bg-gradient-to-r from-rose-accent to-rose-pink text-white rounded-full text-sm font-semibold mb-4 shadow-md">
            Our Services
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-deep-plum mb-4 px-4 drop-shadow-sm" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            What We Do
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-700 max-w-2xl mx-auto px-4 font-medium">
            Professional makeup services tailored to your unique style and occasion
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {services.map((service, index) => (
            <Card 
              key={index} 
              hover 
              className="text-center border-2 border-transparent hover:border-rose-200 transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="mb-4 flex justify-center">
                <div className="p-4 bg-gradient-to-br from-rose-100 to-pink-100 rounded-2xl transform hover:scale-110 transition-transform duration-300">
                  <div className="text-rose-accent">
                    {service.icon}
                  </div>
                </div>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-deep-plum mb-3 drop-shadow-sm">{service.title}</h3>
              <p className="text-gray-700 mb-4 text-sm leading-relaxed font-medium">{service.description}</p>
              <p className="text-rose-accent font-bold mb-4 text-base drop-shadow-sm">{service.price}</p>
              <Link to="/enquiry" className="block">
                <Button size="sm" className="w-full">Enquire Now</Button>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

