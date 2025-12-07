export interface PortfolioItem {
  id: string;
  title: string;
  category: 'Bridal' | 'Sider' | 'Engagement' | 'Baby Shower' | 'Party' | 'Pre-Wedding' | 'Photoshoot' | 'Other';
  tags: string[];
  caption: string;
  mediaType: 'image' | 'video';
  mediaUrl: string; // base64 encoded or URL
  createdAt: string;
}

