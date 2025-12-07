import { Enquiry } from '../types/enquiry';
import { Feedback } from '../types/feedback';
import { PortfolioItem } from '../types/portfolio';

const ENQUIRIES_KEY = 'pooja_aura_enquiries';
const FEEDBACKS_KEY = 'pooja_aura_feedbacks';
const PORTFOLIO_KEY = 'pooja_aura_portfolio';

// Check if we're in development mode (Vite)
// Using a simple check that works in both dev and prod
const isDev = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

// Enquiries
export function getEnquiries(): Enquiry[] {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      return [];
    }
    const data = localStorage.getItem(ENQUIRIES_KEY);
    if (!data) return [];
    return JSON.parse(data);
  } catch (error) {
    if (isDev) {
      console.error('Error reading enquiries from localStorage:', error);
    }
    // Clear corrupted data
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.removeItem(ENQUIRIES_KEY);
      }
    } catch {
      // Ignore cleanup errors
    }
    return [];
  }
}

export function saveEnquiry(enquiry: Omit<Enquiry, 'id' | 'createdAt' | 'status'>): Enquiry {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      throw new Error('LocalStorage is not available');
    }
    const enquiries = getEnquiries();
    const newEnquiry: Enquiry = {
      ...enquiry,
      id: `enq_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
      status: 'PENDING',
    };
    enquiries.push(newEnquiry);
    localStorage.setItem(ENQUIRIES_KEY, JSON.stringify(enquiries));
    return newEnquiry;
  } catch (error) {
    if (isDev) {
      console.error('Error saving enquiry to localStorage:', error);
    }
    throw new Error('Failed to save enquiry. Please try again.');
  }
}

export function updateEnquiryStatus(id: string, status: 'PENDING' | 'CONTACTED'): void {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      return;
    }
    const enquiries = getEnquiries();
    const index = enquiries.findIndex(e => e.id === id);
    if (index !== -1) {
      enquiries[index].status = status;
      localStorage.setItem(ENQUIRIES_KEY, JSON.stringify(enquiries));
    }
  } catch (error) {
    if (isDev) {
      console.error('Error updating enquiry status:', error);
    }
  }
}

export function addEnquiryReply(id: string, reply: string): void {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      return;
    }
    const enquiries = getEnquiries();
    const index = enquiries.findIndex(e => e.id === id);
    if (index !== -1) {
      enquiries[index].adminReply = reply;
      enquiries[index].adminReplyDate = new Date().toISOString();
      localStorage.setItem(ENQUIRIES_KEY, JSON.stringify(enquiries));
    }
  } catch (error) {
    if (isDev) {
      console.error('Error adding enquiry reply:', error);
    }
  }
}

export function addFeedbackReply(id: string, reply: string): void {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      return;
    }
    const feedbacks = getFeedbacks();
    const index = feedbacks.findIndex(f => f.id === id);
    if (index !== -1) {
      feedbacks[index].adminReply = reply;
      feedbacks[index].adminReplyDate = new Date().toISOString();
      localStorage.setItem(FEEDBACKS_KEY, JSON.stringify(feedbacks));
    }
  } catch (error) {
    if (isDev) {
      console.error('Error adding feedback reply:', error);
    }
  }
}

export function updateFeedbackReply(id: string, reply: string): void {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      return;
    }
    const feedbacks = getFeedbacks();
    const index = feedbacks.findIndex(f => f.id === id);
    if (index !== -1) {
      feedbacks[index].adminReply = reply;
      feedbacks[index].adminReplyDate = new Date().toISOString();
      localStorage.setItem(FEEDBACKS_KEY, JSON.stringify(feedbacks));
    }
  } catch (error) {
    if (isDev) {
      console.error('Error updating feedback reply:', error);
    }
  }
}

export function deleteFeedbackReply(id: string): void {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      return;
    }
    const feedbacks = getFeedbacks();
    const index = feedbacks.findIndex(f => f.id === id);
    if (index !== -1) {
      feedbacks[index].adminReply = undefined;
      feedbacks[index].adminReplyDate = undefined;
      localStorage.setItem(FEEDBACKS_KEY, JSON.stringify(feedbacks));
    }
  } catch (error) {
    if (isDev) {
      console.error('Error deleting feedback reply:', error);
    }
  }
}

export function updateEnquiryReply(id: string, reply: string): void {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      return;
    }
    const enquiries = getEnquiries();
    const index = enquiries.findIndex(e => e.id === id);
    if (index !== -1) {
      enquiries[index].adminReply = reply;
      enquiries[index].adminReplyDate = new Date().toISOString();
      localStorage.setItem(ENQUIRIES_KEY, JSON.stringify(enquiries));
    }
  } catch (error) {
    if (isDev) {
      console.error('Error updating enquiry reply:', error);
    }
  }
}

export function deleteEnquiryReply(id: string): void {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      return;
    }
    const enquiries = getEnquiries();
    const index = enquiries.findIndex(e => e.id === id);
    if (index !== -1) {
      enquiries[index].adminReply = undefined;
      enquiries[index].adminReplyDate = undefined;
      localStorage.setItem(ENQUIRIES_KEY, JSON.stringify(enquiries));
    }
  } catch (error) {
    if (isDev) {
      console.error('Error deleting enquiry reply:', error);
    }
  }
}

// Feedback
export function getFeedbacks(): Feedback[] {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      return [];
    }
    const data = localStorage.getItem(FEEDBACKS_KEY);
    if (!data) return [];
    return JSON.parse(data);
  } catch (error) {
    if (isDev) {
      console.error('Error reading feedbacks from localStorage:', error);
    }
    // Clear corrupted data
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.removeItem(FEEDBACKS_KEY);
      }
    } catch {
      // Ignore cleanup errors
    }
    return [];
  }
}

export function saveFeedback(feedback: Omit<Feedback, 'id' | 'createdAt'>): Feedback {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      throw new Error('LocalStorage is not available');
    }
    const feedbacks = getFeedbacks();
    const newFeedback: Feedback = {
      ...feedback,
      id: `fb_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
    };
    feedbacks.push(newFeedback);
    localStorage.setItem(FEEDBACKS_KEY, JSON.stringify(feedbacks));
    return newFeedback;
  } catch (error) {
    if (isDev) {
      console.error('Error saving feedback to localStorage:', error);
    }
    throw new Error('Failed to save feedback. Please try again.');
  }
}

// Portfolio
export function getPortfolioItems(): PortfolioItem[] {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      return [];
    }
    const data = localStorage.getItem(PORTFOLIO_KEY);
    if (!data) return [];
    return JSON.parse(data);
  } catch (error) {
    if (isDev) {
      console.error('Error reading portfolio items from localStorage:', error);
    }
    // Clear corrupted data
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.removeItem(PORTFOLIO_KEY);
      }
    } catch {
      // Ignore cleanup errors
    }
    return [];
  }
}

export function savePortfolioItem(item: Omit<PortfolioItem, 'id' | 'createdAt'>): PortfolioItem {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      throw new Error('LocalStorage is not available');
    }
    const items = getPortfolioItems();
    const newItem: PortfolioItem = {
      ...item,
      id: `port_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
    };
    items.push(newItem);
    localStorage.setItem(PORTFOLIO_KEY, JSON.stringify(items));
    return newItem;
  } catch (error) {
    if (isDev) {
      console.error('Error saving portfolio item to localStorage:', error);
    }
    if (error instanceof DOMException && error.name === 'QuotaExceededError') {
      throw new Error('Storage limit exceeded. Please delete some items or use smaller files.');
    }
    throw new Error('Failed to save portfolio item. Please try again.');
  }
}

export function deletePortfolioItem(id: string): void {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      return;
    }
    const items = getPortfolioItems();
    const filtered = items.filter(item => item.id !== id);
    localStorage.setItem(PORTFOLIO_KEY, JSON.stringify(filtered));
  } catch (error) {
    if (isDev) {
      console.error('Error deleting portfolio item:', error);
    }
  }
}

export function updatePortfolioItem(id: string, updates: Partial<PortfolioItem>): void {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      return;
    }
    const items = getPortfolioItems();
    const index = items.findIndex(item => item.id === id);
    if (index !== -1) {
      items[index] = { ...items[index], ...updates };
      localStorage.setItem(PORTFOLIO_KEY, JSON.stringify(items));
    }
  } catch (error) {
    if (isDev) {
      console.error('Error updating portfolio item:', error);
    }
  }
}

