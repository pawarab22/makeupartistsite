import { useState } from 'react';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Textarea from '../components/ui/Textarea';
import Button from '../components/ui/Button';
import { Phone, Mail, MessageCircle, Instagram, MapPin } from 'lucide-react';
import { saveEnquiry } from '../lib/localDb';

export default function ContactPage() {
  const [quickForm, setQuickForm] = useState({
    name: '',
    phone: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  
  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!quickForm.name || !quickForm.phone) return;
    
    saveEnquiry({
      name: quickForm.name,
      phone: quickForm.phone,
      email: '',
      occasionType: 'Quick Contact',
      eventDate: '',
      location: '',
      message: quickForm.message,
    });
    
    setSubmitted(true);
    setQuickForm({ name: '', phone: '', message: '' });
    setTimeout(() => setSubmitted(false), 5000);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-rose-50/30 to-soft-blush py-8 sm:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 animate-fade-in">
          <span className="inline-block px-4 py-2 bg-gradient-to-r from-rose-accent to-rose-pink text-white rounded-full text-sm font-semibold mb-4 shadow-md">
            Contact Us
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-deep-plum mb-4 drop-shadow-sm" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>Get in Touch</h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-700 px-4 font-medium">
            We'd love to hear from you. Reach out through any of these channels
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Contact Information */}
          <div className="space-y-6">
            <Card>
              <div className="flex items-start gap-4 mb-4">
                <div className="text-rose-accent flex-shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-deep-plum mb-1">Phone</h3>
                  <a href="tel:+919021585686" className="text-gray-800 hover:text-rose-accent transition-colors font-medium">
                    +91 90215 85686
                  </a>
                </div>
              </div>
            </Card>
            
            <Card>
              <div className="flex items-start gap-4 mb-4">
                <div className="text-rose-accent flex-shrink-0">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-deep-plum mb-1">WhatsApp</h3>
                  <a
                    href="https://wa.me/919021585686"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-800 hover:text-rose-accent transition-colors font-medium"
                  >
                    +91 90215 85686
                  </a>
                </div>
              </div>
            </Card>
            
            <Card>
              <div className="flex items-start gap-4 mb-4">
                <div className="text-rose-accent flex-shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-deep-plum mb-1">Email</h3>
                  <a href="mailto:info.pooja.saura.artistry@gmail.com" className="text-gray-800 hover:text-rose-accent transition-colors break-all font-medium">
                    info.pooja.saura.artistry@gmail.com
                  </a>
                </div>
              </div>
            </Card>
            
            <Card>
              <div className="flex items-start gap-4 mb-4">
                <div className="text-rose-accent flex-shrink-0">
                  <Instagram className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-deep-plum mb-1">Instagram</h3>
                  <a
                    href="https://www.instagram.com/makeover_by_pooja04?igsh=YXVnOTY5NmM3NDBv"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-800 hover:text-rose-accent transition-colors break-all font-medium"
                  >
                    @makeover_by_pooja04
                  </a>
                </div>
              </div>
            </Card>
            
            <Card>
              <div className="flex items-start gap-4">
                <div className="text-rose-accent flex-shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-deep-plum mb-2">Service Locations</h3>
                  <p className="text-gray-800 mb-3 font-medium">
                    We provide on-location makeup services in the following areas:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {['Mumbai', 'Satara', 'Patan', 'Koyana'].map((location) => (
                      <span
                        key={location}
                        className="px-3 py-1.5 bg-gradient-to-r from-soft-blush to-pink-100 text-deep-plum rounded-full text-sm font-semibold border border-rose-200/50"
                      >
                        📍 {location}
                      </span>
                    ))}
                  </div>
                  <p className="text-gray-700 text-sm mt-3 font-medium">
                    On-location services available for all occasions
                  </p>
                </div>
              </div>
            </Card>
          </div>
          
          {/* Quick Enquiry Form */}
          <Card>
            <h2 className="text-2xl font-bold text-deep-plum mb-6">Quick Enquiry</h2>
            
            {submitted && (
              <div className="mb-4 p-3 bg-green-50 border-2 border-green-200 rounded-lg">
                <p className="text-green-800 text-sm font-semibold">
                  ✅ Thank you! We'll get back to you soon.
                </p>
              </div>
            )}
            
            <form onSubmit={handleQuickSubmit} className="space-y-4">
              <Input
                label="Name *"
                value={quickForm.name}
                onChange={(e) => setQuickForm({ ...quickForm, name: e.target.value })}
                required
              />
              <Input
                label="Phone *"
                type="tel"
                value={quickForm.phone}
                onChange={(e) => setQuickForm({ ...quickForm, phone: e.target.value })}
                required
              />
              <Textarea
                label="Message"
                rows={4}
                value={quickForm.message}
                onChange={(e) => setQuickForm({ ...quickForm, message: e.target.value })}
                placeholder="Tell us how we can help..."
              />
              <Button type="submit" className="w-full">
                Send Quick Enquiry
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}

