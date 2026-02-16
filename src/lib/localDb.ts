import { supabase } from './supabase';
import { Enquiry } from '../types/enquiry';
import { Feedback } from '../types/feedback';
import { PortfolioItem } from '../types/portfolio';

// --- Enquiries ---

export async function getEnquiries(): Promise<Enquiry[]> {
  const { data, error } = await supabase
    .from('enquiries')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching enquiries:', error);
    return [];
  }

  return (data || []).map(item => ({
    id: item.id.toString(),
    name: item.name,
    phone: item.phone,
    email: item.email,
    occasionType: item.occasion_type,
    eventDate: item.event_date,
    location: item.location,
    budgetRange: item.budget_range,
    message: item.message,
    status: item.status,
    createdAt: item.created_at,
    adminReply: item.admin_reply,
    adminReplyDate: item.admin_reply_date,
  }));
}

export async function saveEnquiry(enquiry: Omit<Enquiry, 'id' | 'createdAt' | 'status'>): Promise<Enquiry> {
  const { data, error } = await supabase
    .from('enquiries')
    .insert([{
      name: enquiry.name,
      phone: enquiry.phone,
      email: enquiry.email || null,
      occasion_type: enquiry.occasionType,
      event_date: enquiry.eventDate || null,
      location: enquiry.location || null,
      budget_range: enquiry.budgetRange || null,
      message: enquiry.message || null,
      status: 'PENDING',
    }])
    .select()
    .single();

  if (error) {
    throw new Error('Failed to save enquiry: ' + error.message);
  }

  return {
    id: data.id.toString(),
    name: data.name,
    phone: data.phone,
    email: data.email,
    occasionType: data.occasion_type,
    eventDate: data.event_date,
    location: data.location,
    budgetRange: data.budget_range,
    message: data.message,
    status: data.status,
    createdAt: data.created_at,
    adminReply: data.admin_reply,
    adminReplyDate: data.admin_reply_date,
  };
}

export async function updateEnquiryStatus(id: string, status: 'PENDING' | 'CONTACTED'): Promise<void> {
  const { error } = await supabase
    .from('enquiries')
    .update({ status })
    .eq('id', parseInt(id));

  if (error) console.error('Error updating enquiry status:', error);
}

export async function addEnquiryReply(id: string, reply: string): Promise<void> {
  const { error } = await supabase
    .from('enquiries')
    .update({
      admin_reply: reply,
      admin_reply_date: new Date().toISOString()
    })
    .eq('id', parseInt(id));

  if (error) console.error('Error adding enquiry reply:', error);
}

export async function updateEnquiryReply(id: string, reply: string): Promise<void> {
  await addEnquiryReply(id, reply);
}

export async function deleteEnquiryReply(id: string): Promise<void> {
  const { error } = await supabase
    .from('enquiries')
    .update({
      admin_reply: null,
      admin_reply_date: null
    })
    .eq('id', parseInt(id));

  if (error) console.error('Error deleting enquiry reply:', error);
}

// --- Feedback ---

export async function getFeedbacks(): Promise<Feedback[]> {
  const { data, error } = await supabase
    .from('feedback')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching feedbacks:', error);
    return [];
  }

  return (data || []).map(item => ({
    id: item.id.toString(),
    name: item.name,
    rating: item.rating,
    serviceType: item.service_type,
    message: item.message,
    createdAt: item.created_at,
    adminReply: item.admin_reply,
    adminReplyDate: item.admin_reply_date,
  }));
}

export async function saveFeedback(feedback: Omit<Feedback, 'id' | 'createdAt'>): Promise<Feedback> {
  const { data, error } = await supabase
    .from('feedback')
    .insert([{
      name: feedback.name,
      rating: feedback.rating,
      service_type: feedback.serviceType,
      message: feedback.message,
    }])
    .select()
    .single();

  if (error) {
    throw new Error('Failed to save feedback: ' + error.message);
  }

  return {
    id: data.id.toString(),
    name: data.name,
    rating: data.rating,
    serviceType: data.service_type,
    message: data.message,
    createdAt: data.created_at,
    adminReply: data.admin_reply,
    adminReplyDate: data.admin_reply_date,
  };
}

export async function addFeedbackReply(id: string, reply: string): Promise<void> {
  const { error } = await supabase
    .from('feedback')
    .update({
      admin_reply: reply,
      admin_reply_date: new Date().toISOString()
    })
    .eq('id', parseInt(id));

  if (error) console.error('Error adding feedback reply:', error);
}

export async function updateFeedbackReply(id: string, reply: string): Promise<void> {
  await addFeedbackReply(id, reply);
}

export async function deleteFeedbackReply(id: string): Promise<void> {
  const { error } = await supabase
    .from('feedback')
    .update({
      admin_reply: null,
      admin_reply_date: null
    })
    .eq('id', parseInt(id));

  if (error) console.error('Error deleting feedback reply:', error);
}

// --- Portfolio ---

export async function getPortfolioItems(): Promise<PortfolioItem[]> {
  const { data, error } = await supabase
    .from('portfolio')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching portfolio:', error);
    return [];
  }

  return (data || []).map(item => ({
    id: item.id.toString(),
    title: item.title,
    category: item.category,
    tags: item.tags || [],
    caption: item.caption,
    mediaType: item.media_type,
    mediaUrl: item.media_url,
    createdAt: item.created_at,
  }));
}

export async function savePortfolioItem(item: Omit<PortfolioItem, 'id' | 'createdAt'>): Promise<PortfolioItem> {
  const { data, error } = await supabase
    .from('portfolio')
    .insert([{
      title: item.title,
      category: item.category,
      tags: item.tags,
      caption: item.caption,
      media_type: item.mediaType,
      media_url: item.mediaUrl,
    }])
    .select()
    .single();

  if (error) {
    throw new Error('Failed to save portfolio item: ' + error.message);
  }

  return {
    id: data.id.toString(),
    title: data.title,
    category: data.category,
    tags: data.tags,
    caption: data.caption,
    mediaType: data.media_type,
    mediaUrl: data.media_url,
    createdAt: data.created_at,
  };
}

export async function deletePortfolioItem(id: string): Promise<void> {
  const { error } = await supabase
    .from('portfolio')
    .delete()
    .eq('id', parseInt(id));

  if (error) console.error('Error deleting portfolio item:', error);
}

export async function updatePortfolioItem(id: string, updates: Partial<PortfolioItem>): Promise<void> {
  const mappedUpdates: any = { ...updates };
  if (updates.mediaType) mappedUpdates.media_type = updates.mediaType;
  if (updates.mediaUrl) mappedUpdates.media_url = updates.mediaUrl;

  delete mappedUpdates.id;
  delete mappedUpdates.createdAt;
  delete mappedUpdates.mediaType;
  delete mappedUpdates.mediaUrl;

  const { error } = await supabase
    .from('portfolio')
    .update(mappedUpdates)
    .eq('id', parseInt(id));

  if (error) console.error('Error updating portfolio item:', error);
}
