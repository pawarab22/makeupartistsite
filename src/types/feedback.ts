export interface Feedback {
  id: string;
  name: string;
  rating: number;
  serviceType: string;
  message: string;
  createdAt: string;
  adminReply?: string;
  adminReplyDate?: string;
}

