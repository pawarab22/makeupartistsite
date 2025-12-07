export interface Enquiry {
  id: string;
  name: string;
  phone: string;
  email: string;
  occasionType: string;
  eventDate: string;
  location: string;
  budgetRange?: string;
  message?: string;
  status: 'PENDING' | 'CONTACTED';
  createdAt: string;
  adminReply?: string;
  adminReplyDate?: string;
}

