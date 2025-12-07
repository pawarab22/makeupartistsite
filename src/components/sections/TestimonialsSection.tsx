import Card from '../ui/Card';
import { Star } from 'lucide-react';
import { getFeedbacks } from '../../lib/localDb';

const staticTestimonials = [
  {
    name: 'Divya Vhaval',
    rating: 5,
    service: 'Bridal Makeup',
    message: 'Pooja made me feel like a princess on my wedding day! The makeup was flawless and lasted all day. Highly recommend!',
  },
  {
    name: 'Sakshi Kate',
    rating: 5,
    service: 'Reception Makeup',
    message: 'Absolutely stunning work! The attention to detail and the way she understood my vision was incredible.',
  },
  {
    name: 'Poonam Kadam',
    rating: 5,
    service: 'Engagement Makeup',
    message: 'Professional, talented, and so sweet! My engagement photos turned out amazing thanks to Pooja\'s expertise.',
  },
];

export default function TestimonialsSection() {
  const storedFeedbacks = getFeedbacks();
  const recentFeedbacks = storedFeedbacks.slice(-3).reverse();
  const allTestimonials = [...staticTestimonials, ...recentFeedbacks].slice(0, 4);
  
  return (
    <section className="py-20 bg-gradient-to-b from-soft-blush to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-deep-plum mb-4 drop-shadow-sm" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>What Our Clients Say</h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto font-medium">
            Real experiences from our beautiful clients
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {allTestimonials.map((testimonial, index) => (
            <Card key={index} hover>
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
                  />
                ))}
              </div>
              <p className="text-gray-800 mb-4 text-sm italic font-medium">"{testimonial.message}"</p>
              {'adminReply' in testimonial && testimonial.adminReply && (
                <div className="mb-4 p-2.5 bg-gradient-to-r from-rose-50 to-pink-50 rounded-lg border border-rose-200/50">
                  <span className="text-xs font-bold text-rose-accent block mb-1">💬 Admin Response</span>
                  <p className="text-xs text-gray-800 leading-relaxed font-medium">{testimonial.adminReply}</p>
                </div>
              )}
              <div className="border-t border-soft-blush pt-4">
                <p className="font-bold text-deep-plum">{testimonial.name}</p>
                {'service' in testimonial && testimonial.service && (
                  <p className="text-sm text-gray-700 font-medium">{testimonial.service}</p>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

