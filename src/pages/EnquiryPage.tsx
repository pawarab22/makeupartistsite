import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Textarea from '../components/ui/Textarea';
import Select from '../components/ui/Select';
import Button from '../components/ui/Button';
import { saveEnquiry } from '../lib/localDb';
import Swal from 'sweetalert2';

// Check if we're in development mode
const isDev = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

export default function EnquiryPage() {
  const location = useLocation();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    occasionType: location.state?.service || '',
    eventDate: '',
    location: '',
    budgetRange: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (location.state?.service) {
      setFormData(prev => ({ ...prev, occasionType: location.state.service }));
    }
  }, [location.state]);

  const occasionOptions = [
    { value: '', label: 'Select Occasion Type' },
    { value: 'Bridal Makeup', label: 'Bridal Makeup' },
    { value: 'Sider Makeup', label: 'Sider Makeup' },
    { value: 'Engagement Makeup', label: 'Engagement Makeup' },
    { value: 'Baby Shower Makeup', label: 'Baby Shower Makeup' },
    { value: 'Party Makeup', label: 'Party Makeup' },
    { value: 'Pre-Wedding Makeup', label: 'Pre-Wedding Makeup' },
    { value: 'Photoshoot Makeup', label: 'Photoshoot Makeup' },
    { value: 'Other', label: 'Other' },
  ];

  const budgetOptions = [
    { value: '', label: 'Select Budget Range' },
    { value: 'Under ₹5,000', label: 'Under ₹5,000' },
    { value: '₹5,000 - ₹10,000', label: '₹5,000 - ₹10,000' },
    { value: '₹10,000 - ₹20,000', label: '₹10,000 - ₹20,000' },
    { value: '₹20,000 - ₹35,000', label: '₹20,000 - ₹35,000' },
    { value: 'Above ₹35,000', label: 'Above ₹35,000' },
  ];

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.occasionType) newErrors.occasionType = 'Occasion type is required';
    if (!formData.eventDate) newErrors.eventDate = 'Event date is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      await saveEnquiry(formData);
      setSubmitted(true);
      Swal.fire({
        icon: 'success',
        title: 'Enquiry Submitted',
        text: 'We have received your enquiry and will get back to you soon!',
        confirmButtonColor: '#E11D48',
        background: '#FFF5F7',
        color: '#4A0E2E'
      });
      setFormData({
        name: '',
        phone: '',
        email: '',
        occasionType: '',
        eventDate: '',
        location: '',
        budgetRange: '',
        message: '',
      });

      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to submit enquiry. Please try again.';
      Swal.fire({
        icon: 'error',
        title: 'Submission Failed',
        text: errorMessage,
        confirmButtonColor: '#E11D48',
        background: '#FFF5F7',
        color: '#4A0E2E'
      });
      if (isDev) {
        console.error('Error submitting enquiry:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-rose-50/30 to-soft-blush py-8 sm:py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="inline-flex items-center text-rose-accent hover:text-rose-600 font-medium mb-6 group transition-all"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>
        <div className="text-center mb-6 sm:mb-8 animate-fade-in">
          <span className="inline-block px-4 py-2 bg-gradient-to-r from-rose-accent to-rose-pink text-white rounded-full text-sm font-semibold mb-4 shadow-md">
            Get Started
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-deep-plum mb-4 drop-shadow-sm" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            Book Your Makeover
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-700 px-4 font-medium">
            Fill out the form below and we'll get back to you soon!
          </p>
        </div>

        {submitted && (
          <Card className="mb-6 bg-green-50 border-2 border-green-200">
            <p className="text-green-800 font-semibold text-center">
              ✅ Thank you! Your enquiry has been submitted successfully. We'll contact you soon.
            </p>
          </Card>
        )}

        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Name *"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                error={errors.name}
                placeholder="Ex: Priyanka Chopra"
                required
              />
              <Input
                label="Phone *"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                error={errors.phone}
                placeholder="Ex: 9876543210"
                required
              />
            </div>

            <Input
              label="Email *"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              error={errors.email}
              placeholder="Ex: user@gmail.com"
              required
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Select
                label="Occasion Type *"
                value={formData.occasionType}
                onChange={(e) => setFormData({ ...formData, occasionType: e.target.value })}
                options={occasionOptions}
                error={errors.occasionType}
                required
              />
              <Input
                label="Event Date *"
                type="date"
                value={formData.eventDate}
                onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                error={errors.eventDate}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-deep-plum mb-2">
                Location / Venue *
              </label>
              <Input
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                error={errors.location}
                placeholder="Ex: Satara, Mumbai, or your home address"
                required
              />
              <p className="text-xs text-gray-600 mt-1 mb-2 font-medium">Preferred locations: Mumbai, Satara, Patan, Koyana</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {['Mumbai', 'Satara', 'Patan', 'Koyana'].map((location) => (
                  <button
                    key={location}
                    type="button"
                    onClick={() => setFormData({ ...formData, location })}
                    className="px-3 py-2 text-xs bg-soft-blush hover:bg-pink-100 text-deep-plum rounded-full font-semibold border border-rose-200/50 transition-colors min-h-[36px]"
                  >
                    {location}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Select
                label="Budget Range (Optional)"
                value={formData.budgetRange}
                onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                options={budgetOptions}
              />
              <div className="mt-2 p-3 bg-rose-50 rounded-lg border border-rose-200/50">
                <p className="text-xs text-rose-accent font-bold mb-1">
                  💝 Your Satisfaction is Our Priority!
                </p>
                <p className="text-xs text-gray-800 leading-relaxed font-medium">
                  We want happy customers! Our prices are affordable and negotiable. Share your budget
                  and we'll work together to ensure you're completely satisfied.
                </p>
              </div>
            </div>

            <Textarea
              label="Message / Requirements"
              rows={5}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Tell us about your requirements, preferred style, or any special requests..."
            />

            <Button type="submit" size="lg" className="w-full">
              Submit Enquiry 💄
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}

