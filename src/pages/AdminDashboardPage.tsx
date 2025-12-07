import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Textarea from '../components/ui/Textarea';
import { getEnquiries, updateEnquiryStatus, getPortfolioItems, addEnquiryReply, addFeedbackReply, updateEnquiryReply, deleteEnquiryReply, updateFeedbackReply, deleteFeedbackReply } from '../lib/localDb';
import { getFeedbacks } from '../lib/localDb';
import { Enquiry } from '../types/enquiry';
import { Feedback } from '../types/feedback';
import { Star, Image, MessageSquare, ChevronUp, Trash2, Edit2 } from 'lucide-react';

export default function AdminDashboardPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [expandedEnquiries, setExpandedEnquiries] = useState<Set<string>>(new Set());
  const [expandedFeedbacks, setExpandedFeedbacks] = useState<Set<string>>(new Set());
  const [enquiryReplies, setEnquiryReplies] = useState<Record<string, string>>({});
  const [feedbackReplies, setFeedbackReplies] = useState<Record<string, string>>({});
  
  useEffect(() => {
    loadData();
  }, []);
  
  const loadData = () => {
    setEnquiries(getEnquiries());
    setFeedbacks(getFeedbacks());
  };
  
  const portfolioItems = getPortfolioItems();
  
  const handleToggleStatus = (id: string, currentStatus: 'PENDING' | 'CONTACTED') => {
    const newStatus = currentStatus === 'PENDING' ? 'CONTACTED' : 'PENDING';
    updateEnquiryStatus(id, newStatus);
    loadData();
  };

  const toggleEnquiryExpanded = (id: string) => {
    const newExpanded = new Set(expandedEnquiries);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
      // Clear the reply text when closing
      setEnquiryReplies({ ...enquiryReplies, [id]: '' });
    } else {
      newExpanded.add(id);
      // Pre-populate with existing reply if editing
      const enquiry = enquiries.find(e => e.id === id);
      if (enquiry?.adminReply) {
        setEnquiryReplies({ ...enquiryReplies, [id]: enquiry.adminReply });
      }
    }
    setExpandedEnquiries(newExpanded);
  };

  const toggleFeedbackExpanded = (id: string) => {
    const newExpanded = new Set(expandedFeedbacks);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
      // Clear the reply text when closing
      setFeedbackReplies({ ...feedbackReplies, [id]: '' });
    } else {
      newExpanded.add(id);
      // Pre-populate with existing reply if editing
      const feedback = feedbacks.find(f => f.id === id);
      if (feedback?.adminReply) {
        setFeedbackReplies({ ...feedbackReplies, [id]: feedback.adminReply });
      }
    }
    setExpandedFeedbacks(newExpanded);
  };


  const handleFeedbackReply = (id: string) => {
    const reply = feedbackReplies[id]?.trim();
    if (!reply) {
      alert('Please enter a reply');
      return;
    }
    const feedback = feedbacks.find(f => f.id === id);
    if (feedback?.adminReply) {
      updateFeedbackReply(id, reply);
    } else {
      addFeedbackReply(id, reply);
    }
    setFeedbackReplies({ ...feedbackReplies, [id]: '' });
    loadData();
  };

  const handleEnquiryReplyUpdate = (id: string) => {
    const reply = enquiryReplies[id]?.trim();
    if (!reply) {
      alert('Please enter a reply');
      return;
    }
    const enquiry = enquiries.find(e => e.id === id);
    if (enquiry?.adminReply) {
      updateEnquiryReply(id, reply);
    } else {
      addEnquiryReply(id, reply);
    }
    setEnquiryReplies({ ...enquiryReplies, [id]: '' });
    loadData();
  };

  const handleDeleteEnquiryReply = (id: string) => {
    if (confirm('Are you sure you want to delete this reply?')) {
      deleteEnquiryReply(id);
      setEnquiryReplies({ ...enquiryReplies, [id]: '' });
      loadData();
    }
  };

  const handleDeleteFeedbackReply = (id: string) => {
    if (confirm('Are you sure you want to delete this reply?')) {
      deleteFeedbackReply(id);
      setFeedbackReplies({ ...feedbackReplies, [id]: '' });
      loadData();
    }
  };
  
  const totalEnquiries = enquiries.length;
  const todayEnquiries = enquiries.filter(e => {
    const today = new Date().toDateString();
    return new Date(e.createdAt).toDateString() === today;
  }).length;
  const totalFeedback = feedbacks.length;
  const avgRating = feedbacks.length > 0
    ? (feedbacks.reduce((sum, f) => sum + f.rating, 0) / feedbacks.length).toFixed(1)
    : '0';
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-soft-blush py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-deep-plum mb-2">Admin Dashboard</h1>
          <p className="text-sm sm:text-base text-gray-600">Manage enquiries, feedback, and portfolio</p>
        </div>
        
        {/* Quick Actions */}
        <div className="mb-6">
          <Link to="/admin/portfolio">
            <Button variant="secondary" className="flex items-center gap-2">
              <Image size={20} />
              Manage Portfolio
            </Button>
          </Link>
        </div>
        
        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <Card>
            <h3 className="text-xs sm:text-sm font-medium text-gray-600 mb-2">Total Enquiries</h3>
            <p className="text-2xl sm:text-3xl font-bold text-deep-plum">{totalEnquiries}</p>
          </Card>
          <Card>
            <h3 className="text-xs sm:text-sm font-medium text-gray-600 mb-2">Today's Enquiries</h3>
            <p className="text-2xl sm:text-3xl font-bold text-rose-accent">{todayEnquiries}</p>
          </Card>
          <Card>
            <h3 className="text-xs sm:text-sm font-medium text-gray-600 mb-2">Total Feedback</h3>
            <p className="text-2xl sm:text-3xl font-bold text-deep-plum">{totalFeedback}</p>
          </Card>
          <Card>
            <h3 className="text-xs sm:text-sm font-medium text-gray-600 mb-2">Average Rating</h3>
            <p className="text-2xl sm:text-3xl font-bold text-deep-plum">{avgRating} ⭐</p>
          </Card>
        </div>
        
        {/* Portfolio Summary */}
        <div className="mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-deep-plum">Portfolio Summary</h2>
            <Link to="/admin/portfolio">
              <Button size="sm" variant="outline" className="w-full sm:w-auto">Manage Portfolio</Button>
            </Link>
          </div>
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-deep-plum">{portfolioItems.length}</p>
                <p className="text-sm text-gray-600">Total Portfolio Items</p>
              </div>
              <div className="text-rose-accent">
                <Image size={32} />
              </div>
            </div>
          </Card>
        </div>
        
        {/* Enquiries Table */}
        <div className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-deep-plum mb-4">Enquiries</h2>
          {enquiries.length === 0 ? (
            <Card>
              <p className="text-gray-600 text-center py-8">No enquiries yet</p>
            </Card>
          ) : (
            <div className="overflow-x-auto -mx-4 sm:mx-0">
              <Card className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[800px]">
                    <thead className="bg-soft-blush">
                      <tr>
                        <th className="px-2 sm:px-4 py-3 text-left text-xs sm:text-sm font-semibold text-deep-plum whitespace-nowrap">Name</th>
                        <th className="px-2 sm:px-4 py-3 text-left text-xs sm:text-sm font-semibold text-deep-plum whitespace-nowrap">Occasion</th>
                        <th className="px-2 sm:px-4 py-3 text-left text-xs sm:text-sm font-semibold text-deep-plum whitespace-nowrap">Event Date</th>
                        <th className="px-2 sm:px-4 py-3 text-left text-xs sm:text-sm font-semibold text-deep-plum whitespace-nowrap">Phone</th>
                        <th className="px-2 sm:px-4 py-3 text-left text-xs sm:text-sm font-semibold text-deep-plum whitespace-nowrap">Location</th>
                        <th className="px-2 sm:px-4 py-3 text-left text-xs sm:text-sm font-semibold text-deep-plum whitespace-nowrap">Status</th>
                        <th className="px-2 sm:px-4 py-3 text-left text-xs sm:text-sm font-semibold text-deep-plum whitespace-nowrap">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {enquiries.map((enquiry) => (
                        <>
                          <tr key={enquiry.id} className="hover:bg-gray-50">
                            <td className="px-2 sm:px-4 py-3 text-xs sm:text-sm text-gray-900 font-semibold whitespace-nowrap">{enquiry.name}</td>
                            <td className="px-2 sm:px-4 py-3 text-xs sm:text-sm text-gray-600 whitespace-nowrap">{enquiry.occasionType}</td>
                            <td className="px-2 sm:px-4 py-3 text-xs sm:text-sm text-gray-600 whitespace-nowrap">
                              {new Date(enquiry.eventDate).toLocaleDateString()}
                            </td>
                            <td className="px-2 sm:px-4 py-3 text-xs sm:text-sm text-gray-600 break-all">{enquiry.phone}</td>
                            <td className="px-2 sm:px-4 py-3 text-xs sm:text-sm text-gray-600 whitespace-nowrap">{enquiry.location}</td>
                            <td className="px-2 sm:px-4 py-3">
                              <Badge variant={enquiry.status === 'PENDING' ? 'warning' : 'success'}>
                                {enquiry.status}
                              </Badge>
                            </td>
                            <td className="px-2 sm:px-4 py-3">
                              <div className="flex flex-col gap-2 min-w-[140px]">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleToggleStatus(enquiry.id, enquiry.status)}
                                  className="text-xs sm:text-sm whitespace-nowrap w-full sm:w-auto min-h-[36px] sm:min-h-[32px]"
                                >
                                  {enquiry.status === 'PENDING' ? 'Mark Contacted' : 'Mark Pending'}
                                </Button>
                                <Button
                                  size="sm"
                                  variant="secondary"
                                  onClick={() => toggleEnquiryExpanded(enquiry.id)}
                                  className="text-xs sm:text-sm whitespace-nowrap w-full sm:w-auto min-h-[36px] sm:min-h-[32px]"
                                >
                                  {expandedEnquiries.has(enquiry.id) ? (
                                    <>
                                      <ChevronUp size={14} className="mr-1" />
                                      Hide
                                    </>
                                  ) : (
                                    <>
                                      <MessageSquare size={14} className="mr-1" />
                                      Reply
                                    </>
                                  )}
                                </Button>
                              </div>
                            </td>
                          </tr>
                          {expandedEnquiries.has(enquiry.id) && (
                            <tr>
                              <td colSpan={7} className="px-2 sm:px-4 py-4 bg-gray-50">
                                <Card className="bg-white">
                                  <div className="space-y-4">
                                    <div>
                                      <h4 className="font-semibold text-deep-plum mb-2">Enquiry Details</h4>
                                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                                        <div>
                                          <span className="font-medium text-gray-600">Email:</span>
                                          <p className="text-gray-900">{enquiry.email || 'N/A'}</p>
                                        </div>
                                        <div>
                                          <span className="font-medium text-gray-600">Budget:</span>
                                          <p className="text-gray-900">{enquiry.budgetRange || 'Not specified'}</p>
                                        </div>
                                        {enquiry.message && (
                                          <div className="sm:col-span-2">
                                            <span className="font-medium text-gray-600">Message:</span>
                                            <p className="text-gray-900 mt-1">{enquiry.message}</p>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                    {enquiry.adminReply && !expandedEnquiries.has(enquiry.id) && (
                                      <div className="p-3 bg-rose-50 rounded-lg border border-rose-200">
                                        <div className="flex items-center justify-between mb-2">
                                          <span className="text-xs font-semibold text-rose-accent">Admin Reply</span>
                                          <div className="flex items-center gap-2">
                                            <span className="text-xs text-gray-500">
                                              {enquiry.adminReplyDate ? new Date(enquiry.adminReplyDate).toLocaleDateString() : ''}
                                            </span>
                                            <button
                                              onClick={() => toggleEnquiryExpanded(enquiry.id)}
                                              className="text-rose-accent hover:text-rose-600 transition-colors p-2 min-w-[36px] min-h-[36px] flex items-center justify-center"
                                              title="Edit reply"
                                              aria-label="Edit reply"
                                            >
                                              <Edit2 size={16} />
                                            </button>
                                            <button
                                              onClick={() => handleDeleteEnquiryReply(enquiry.id)}
                                              className="text-red-500 hover:text-red-700 transition-colors p-2 min-w-[36px] min-h-[36px] flex items-center justify-center"
                                              title="Delete reply"
                                              aria-label="Delete reply"
                                            >
                                              <Trash2 size={16} />
                                            </button>
                                          </div>
                                        </div>
                                        <p className="text-sm text-gray-700">{enquiry.adminReply}</p>
                                      </div>
                                    )}
                                    <div>
                                      <Textarea
                                        label={enquiry.adminReply ? "Edit Reply / Comment" : "Add Reply / Comment"}
                                        rows={4}
                                        value={enquiryReplies[enquiry.id] || ''}
                                        onChange={(e) => setEnquiryReplies({ ...enquiryReplies, [enquiry.id]: e.target.value })}
                                        placeholder="Type your reply or comment here..."
                                      />
                                      <div className="flex flex-col sm:flex-row gap-2 mt-2">
                                        <Button
                                          size="sm"
                                          onClick={() => handleEnquiryReplyUpdate(enquiry.id)}
                                          className="w-full sm:w-auto min-h-[36px] sm:min-h-[32px]"
                                        >
                                          {enquiry.adminReply ? 'Update Reply' : 'Send Reply'}
                                        </Button>
                                        {enquiry.adminReply && (
                                          <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => handleDeleteEnquiryReply(enquiry.id)}
                                            className="text-red-600 border-red-300 hover:bg-red-50 w-full sm:w-auto min-h-[36px] sm:min-h-[32px]"
                                          >
                                            <Trash2 size={14} className="mr-1" />
                                            Delete
                                          </Button>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </Card>
                              </td>
                            </tr>
                          )}
                        </>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          )}
        </div>
        
        {/* Feedback List */}
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-deep-plum mb-4">Feedback</h2>
          {feedbacks.length === 0 ? (
            <Card>
              <p className="text-gray-600 text-center py-8">No feedback yet</p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {feedbacks.map((feedback) => (
                <Card key={feedback.id} className="flex flex-col">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-deep-plum">{feedback.name}</h3>
                      <p className="text-sm text-gray-600">{feedback.serviceType}</p>
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
                  <p className="text-gray-700 text-sm mb-3 flex-1">{feedback.message}</p>
                  <p className="text-xs text-gray-500 mb-3">
                    {new Date(feedback.createdAt).toLocaleDateString()}
                  </p>
                  {feedback.adminReply && !expandedFeedbacks.has(feedback.id) && (
                    <div className="p-3 bg-rose-50 rounded-lg border border-rose-200 mb-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold text-rose-accent">Admin Reply</span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500">
                            {feedback.adminReplyDate ? new Date(feedback.adminReplyDate).toLocaleDateString() : ''}
                          </span>
                          <button
                            onClick={() => toggleFeedbackExpanded(feedback.id)}
                            className="text-rose-accent hover:text-rose-600 transition-colors p-2 min-w-[36px] min-h-[36px] flex items-center justify-center"
                            title="Edit reply"
                            aria-label="Edit reply"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteFeedbackReply(feedback.id)}
                            className="text-red-500 hover:text-red-700 transition-colors p-2 min-w-[36px] min-h-[36px] flex items-center justify-center"
                            title="Delete reply"
                            aria-label="Delete reply"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                      <p className="text-sm text-gray-700">{feedback.adminReply}</p>
                    </div>
                  )}
                  <div className="space-y-2">
                    {!expandedFeedbacks.has(feedback.id) ? (
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => toggleFeedbackExpanded(feedback.id)}
                        className="w-full text-xs sm:text-sm"
                      >
                        {feedback.adminReply ? (
                          <>
                            <Edit2 size={14} className="mr-1" />
                            Edit Reply
                          </>
                        ) : (
                          <>
                            <MessageSquare size={14} className="mr-1" />
                            Add Reply
                          </>
                        )}
                      </Button>
                    ) : (
                      <div className="space-y-2">
                        <Textarea
                          rows={3}
                          value={feedbackReplies[feedback.id] || ''}
                          onChange={(e) => setFeedbackReplies({ ...feedbackReplies, [feedback.id]: e.target.value })}
                          placeholder="Type your reply here..."
                          className="text-sm"
                        />
                        <div className="flex flex-col sm:flex-row gap-2">
                          <Button
                            size="sm"
                            onClick={() => handleFeedbackReply(feedback.id)}
                            className="flex-1 text-xs sm:text-sm min-h-[36px] sm:min-h-[32px]"
                          >
                            {feedback.adminReply ? 'Update Reply' : 'Send Reply'}
                          </Button>
                          {feedback.adminReply && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDeleteFeedbackReply(feedback.id)}
                              className="text-red-600 border-red-300 hover:bg-red-50 text-xs sm:text-sm min-h-[36px] sm:min-h-[32px]"
                            >
                              <Trash2 size={14} />
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => toggleFeedbackExpanded(feedback.id)}
                            className="text-xs sm:text-sm min-h-[36px] sm:min-h-[32px]"
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

