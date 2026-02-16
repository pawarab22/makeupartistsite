import { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Textarea from '../components/ui/Textarea';
import Select from '../components/ui/Select';
import Button from '../components/ui/Button';
import { Star, ArrowLeft } from 'lucide-react';
import { saveFeedback, getFeedbacks } from '../lib/localDb';
import Swal from 'sweetalert2';

// Check if we're in development mode
const isDev = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

export default function FeedbackPage() {
  const [formData, setFormData] = useState({
    name: '',
    rating: 5,
    serviceType: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [feedbacks, setFeedbacks] = useState<any[]>([]);

  const loadFeedbacks = async () => {
    const data = await getFeedbacks();
    setFeedbacks(data);
  };

  useState(() => {
    loadFeedbacks();
  });

  const serviceOptions = [
    { value: '', label: 'Select Service Type' },
    { value: 'Bridal Makeup', label: 'Bridal Makeup' },
    { value: 'Sider Makeup', label: 'Sider Makeup' },
    { value: 'Engagement Makeup', label: 'Engagement Makeup' },
    { value: 'Baby Shower Makeup', label: 'Baby Shower Makeup' },
    { value: 'Party Makeup', label: 'Party Makeup' },
    { value: 'Pre-Wedding Makeup', label: 'Pre-Wedding Makeup' },
    { value: 'Photoshoot Makeup', label: 'Photoshoot Makeup' },
    { value: 'Other', label: 'Other' },
  ];

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.serviceType) newErrors.serviceType = 'Service type is required';
    if (!formData.message.trim()) newErrors.message = 'Feedback message is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      await saveFeedback(formData);
      await loadFeedbacks();
      setSubmitted(true);
      Swal.fire({
        icon: 'success',
        title: 'Feedback Received',
        text: 'Thank you for sharing your experience!',
        confirmButtonColor: '#E11D48',
        background: '#FFF5F7',
        color: '#4A0E2E'
      });
      setFormData({
        name: '',
        rating: 5,
        serviceType: '',
        message: '',
      });

      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to submit feedback. Please try again.';
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: errorMessage,
        confirmButtonColor: '#E11D48',
        background: '#FFF5F7',
        color: '#4A0E2E'
      });
      if (isDev) {
        console.error('Error submitting feedback:', error);
      }
    }
  };

  const recentFeedbacks = [...feedbacks].reverse().slice(0, 10);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-rose-50/30 to-soft-blush py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="inline-flex items-center text-rose-accent hover:text-rose-600 font-medium mb-6 group transition-all"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>
        <div className="text-center mb-6 sm:mb-8 animate-fade-in">
          <span className="inline-block px-4 py-2 bg-gradient-to-r from-rose-accent to-rose-pink text-white rounded-full text-sm font-semibold mb-4 shadow-md">
            Your Feedback
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-deep-plum mb-4 drop-shadow-sm" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>Share Your Experience</h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-700 px-4 font-medium">
            We'd love to hear about your experience with Pooja's Aura Artistry
          </p>
        </div>

        {submitted && (
          <Card className="mb-6 bg-green-50 border-2 border-green-200">
            <p className="text-green-800 font-semibold text-center">
              ✅ Thank you for your feedback! Your review has been submitted.
            </p>
          </Card>
        )}

        <Card className="mb-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Your Name *"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              error={errors.name}
              placeholder="Ex: Alia Bhatt"
              required
            />

            <div>
              <label className="block text-sm font-medium text-deep-plum mb-2">
                Rating *
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setFormData({ ...formData, rating: star })}
                    className="focus:outline-none"
                  >
                    <Star
                      size={32}
                      className={
                        star <= formData.rating
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-gray-300'
                      }
                    />
                  </button>
                ))}
              </div>
            </div>

            <Select
              label="Service Type *"
              value={formData.serviceType}
              onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
              options={serviceOptions}
              error={errors.serviceType}
              required
            />

            <Textarea
              label="Your Feedback *"
              rows={5}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              error={errors.message}
              placeholder="Share your experience, what you loved, and any suggestions..."
              required
            />

            <Button type="submit" size="lg" className="w-full">
              Submit Feedback ✨
            </Button>
          </form>
        </Card>

        {/* Recent Feedback */}
        {recentFeedbacks.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold text-deep-plum mb-6 text-center drop-shadow-sm" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
              Recent Feedback
            </h2>
            <div className="space-y-4">
              {recentFeedbacks.map((feedback) => (
                <Card key={feedback.id}>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-bold text-deep-plum">{feedback.name}</h3>
                      <p className="text-sm text-gray-700 font-medium">{feedback.serviceType}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={16}
                          className={
                            star <= feedback.rating
                              ? 'text-yellow-400 fill-yellow-400'
                              : 'text-gray-300'
                          }
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-800 text-sm mb-3 font-medium">{feedback.message}</p>
                  {feedback.adminReply && (
                    <div className="p-3 bg-gradient-to-r from-rose-50 to-pink-50 rounded-lg border border-rose-200 mb-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-rose-accent flex items-center gap-1">
                          💬 Admin Response
                        </span>
                        <span className="text-xs text-gray-600 font-medium">
                          {feedback.adminReplyDate ? new Date(feedback.adminReplyDate).toLocaleDateString() : ''}
                        </span>
                      </div>
                      <p className="text-sm text-gray-800 leading-relaxed">{feedback.adminReply}</p>
                    </div>
                  )}
                  <p className="text-xs text-gray-600 font-medium">
                    {new Date(feedback.createdAt).toLocaleDateString()}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

