import { PortfolioItem } from '../types/portfolio';
import { savePortfolioItem } from './localDb';

// Check if we're in development mode (Vite)
// Using a simple check that works in both dev and prod
const isDev = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

// Portfolio items based on images and videos in public folder
const portfolioItems: Omit<PortfolioItem, 'id' | 'createdAt'>[] = [
  // Bridal Makeup Images
  {
    title: 'Traditional Bridal Glam',
    category: 'Bridal',
    tags: ['Bridal', 'Traditional', 'HD Makeup', 'Elaborate Hairstyling', 'Jewelry Coordination'],
    caption: 'Stunning traditional bridal look with intricate hairstyling, perfect for your special day. Features HD makeup, elaborate updo with accessories, and traditional jewelry coordination.',
    mediaType: 'image',
    mediaUrl: '/instasave.website_541544109_17851416795538712_8386750327470936355_n.webp',
  },
  {
    title: 'Elegant Bridal Transformation',
    category: 'Bridal',
    tags: ['Bridal', 'Elegant', 'HD Makeup', 'Traditional', 'Hairstyling'],
    caption: 'Beautiful bridal transformation showcasing elegant makeup and sophisticated hairstyling. Perfect blend of traditional and contemporary styles.',
    mediaType: 'image',
    mediaUrl: '/instasave.website_542595349_17851416813538712_217566383778546525_n.webp',
  },
  {
    title: 'Royal Bridal Look',
    category: 'Bridal',
    tags: ['Bridal', 'Royal', 'Traditional', 'HD Makeup', 'Elaborate Hairstyling'],
    caption: 'Regal bridal look with royal elegance. Features elaborate traditional hairstyling with accessories and flawless HD makeup application.',
    mediaType: 'image',
    mediaUrl: '/instasave.website_543054210_17851416810538712_779706136186121418_n.webp',
  },
  {
    title: 'Contemporary Bridal Style',
    category: 'Bridal',
    tags: ['Bridal', 'Contemporary', 'Modern', 'HD Makeup', 'Hairstyling'],
    caption: 'Modern bridal look combining contemporary makeup techniques with elegant hairstyling. Perfect for the modern bride who wants timeless beauty.',
    mediaType: 'image',
    mediaUrl: '/instasave.website_553757342_17854686945538712_3419829515266565822_n.webp',
  },
  {
    title: 'Classic Bridal Elegance',
    category: 'Bridal',
    tags: ['Bridal', 'Classic', 'Traditional', 'HD Makeup', 'Hairstyling'],
    caption: 'Classic bridal elegance with traditional makeup and sophisticated hairstyling. Timeless beauty that photographs beautifully.',
    mediaType: 'image',
    mediaUrl: '/instasave.website_554833701_17854686927538712_8548395893989565524_n.webp',
  },
  {
    title: 'Glamorous Bridal Makeover',
    category: 'Bridal',
    tags: ['Bridal', 'Glamorous', 'HD Makeup', 'Elaborate Hairstyling', 'Traditional'],
    caption: 'Glamorous bridal makeover with elaborate hairstyling and flawless HD makeup. Perfect for creating stunning wedding day memories.',
    mediaType: 'image',
    mediaUrl: '/instasave.website_556393023_17854686918538712_60845933214524571_n.webp',
  },
  {
    title: 'Radiant Bridal Beauty',
    category: 'Bridal',
    tags: ['Bridal', 'Radiant', 'HD Makeup', 'Hairstyling', 'Traditional'],
    caption: 'Radiant bridal beauty with glowing makeup and elegant hairstyling. Features traditional elements with modern techniques.',
    mediaType: 'image',
    mediaUrl: '/instasave.website_561412621_17855876079538712_5967385780201950002_n.webp',
  },
  {
    title: 'Sophisticated Bridal Look',
    category: 'Bridal',
    tags: ['Bridal', 'Sophisticated', 'HD Makeup', 'Elaborate Hairstyling', 'Traditional'],
    caption: 'Sophisticated bridal look with intricate hairstyling and flawless makeup application. Perfect for the bride who wants elegance and sophistication.',
    mediaType: 'image',
    mediaUrl: '/instasave.website_561766515_17855876088538712_5662664238945648394_n.webp',
  },
  {
    title: 'Stunning Bridal Transformation',
    category: 'Bridal',
    tags: ['Bridal', 'Transformation', 'HD Makeup', 'Hairstyling', 'Traditional'],
    caption: 'Stunning bridal transformation showcasing the artistry of traditional bridal makeup and elaborate hairstyling with accessories.',
    mediaType: 'image',
    mediaUrl: '/instasave.website_562170210_17855876091538712_1311779504919493785_n.webp',
  },
  // Engagement Makeup
  {
    title: 'Engagement Makeup Look',
    category: 'Engagement',
    tags: ['Engagement', 'Traditional', 'HD Makeup', 'Hairstyling'],
    caption: 'Beautiful engagement makeup with traditional styling. Perfect for your engagement ceremony with elegant makeup and hairstyling.',
    mediaType: 'video',
    mediaUrl: '/instasave.website_AQMHQIW8kYlzRjod2wqUt24zj6DexloyE3r347kidxHOgrJAH1QlgZMJ91ftEIk-8TBEyprHwEyN1YqnkwkG9jQB10ks-WbwpYEw660.mp4',
  },
  {
    title: 'Engagement Glam Video',
    category: 'Engagement',
    tags: ['Engagement', 'Glam', 'HD Makeup', 'Hairstyling', 'Traditional'],
    caption: 'Glamorous engagement look video showcasing the complete transformation process. Features traditional makeup and elegant hairstyling.',
    mediaType: 'video',
    mediaUrl: '/instasave.website_AQMQQl9YI11j6cw7dhsUGovjmEa3U2DqPiEo9G-BUIZgj4DeWKN5VJuoUKGgIK308oXEqymN5UNfbga8OJ90bRii7R2cOXh_dHaipP0.mp4',
  },
  // Pre-Wedding Makeup
  {
    title: 'Pre-Wedding Haldi Look',
    category: 'Pre-Wedding',
    tags: ['Pre-Wedding', 'Haldi', 'Traditional', 'HD Makeup', 'Hairstyling'],
    caption: 'Beautiful pre-wedding haldi ceremony look with traditional makeup and elegant hairstyling. Perfect for capturing those special moments.',
    mediaType: 'video',
    mediaUrl: '/instasave.website_AQMYqNdmLmVYiJJEyOm3VvD6SX7SJSVJzB4Dg76ckZPX2UPAJMl9AwQaTmydpk42LFwLqC0ZhowF0Ugdds_nR9xPxRaTEhXRdxZPkGs.mp4',
  },
  {
    title: 'Mehendi Ceremony Makeup',
    category: 'Pre-Wedding',
    tags: ['Pre-Wedding', 'Mehendi', 'Traditional', 'HD Makeup', 'Hairstyling'],
    caption: 'Stunning mehendi ceremony makeup with traditional styling. Features elegant makeup and elaborate hairstyling perfect for the occasion.',
    mediaType: 'video',
    mediaUrl: '/instasave.website_AQOBT9kQZ8x1yZGqZ1FYrJ_G7QpRC-HjNKrmQxieaDm6JJoInlXyrYakKHqfyq3m3is5l4ClXdEwBXnB8yyXoEaQ4YCxuGrpoWhXxXs.mp4',
  },
  {
    title: 'Sangeet Night Glam',
    category: 'Pre-Wedding',
    tags: ['Pre-Wedding', 'Sangeet', 'Glam', 'HD Makeup', 'Hairstyling'],
    caption: 'Glamorous sangeet night look with bold makeup and elaborate hairstyling. Perfect for dancing the night away in style.',
    mediaType: 'video',
    mediaUrl: '/instasave.website_AQOc9JizB1SP7m4bZ7fGx6Su6OMRoRLcpueGvNBzK0hGwadmj0eLPcLOABDgyxpO2Qi7iAtS2S41hoIOzXc7y0sY-EqhjLPPB0j_m50.mp4',
  },
  {
    title: 'Pre-Wedding Photoshoot',
    category: 'Pre-Wedding',
    tags: ['Pre-Wedding', 'Photoshoot', 'HD Makeup', 'Hairstyling', 'Traditional'],
    caption: 'Beautiful pre-wedding photoshoot look with camera-ready makeup and elegant hairstyling. Perfect for capturing timeless memories.',
    mediaType: 'video',
    mediaUrl: '/instasave.website_AQOY3hrC9sh5PUVRqXpX9usJfExrfKQeJJlTbyIThV8NRcw5k9HQ6NPZ_0HSfTwDWAGtFwcYMrUdi9STmp89qSeVcB58zw-G6vvX5J8.mp4',
  },
  {
    title: 'Pre-Wedding Traditional Look',
    category: 'Pre-Wedding',
    tags: ['Pre-Wedding', 'Traditional', 'HD Makeup', 'Elaborate Hairstyling'],
    caption: 'Traditional pre-wedding look with elaborate hairstyling and flawless makeup. Perfect for traditional ceremonies and celebrations.',
    mediaType: 'video',
    mediaUrl: '/instasave.website_AQP1brBYQDvA5_rabFzhEt7zBBkEMWeWUqzPrt3Z65btMuEZ4ukpVwmcZyMjeuWwcrdqsQ4_hDtIxgE_e6Po3NFyt1QOi9DELU8fL6I.mp4',
  },
];

/**
 * Initialize portfolio with images and videos from public folder
 * This function should be called once to populate the portfolio
 */
export function initializePortfolio(): void {
  try {
    // Check if localStorage is available
    if (typeof window === 'undefined' || !window.localStorage) {
      return;
    }

    const existingItems = JSON.parse(localStorage.getItem('pooja_aura_portfolio') || '[]');
    
    // Only initialize if portfolio is empty
    if (existingItems.length === 0) {
      portfolioItems.forEach((item) => {
        try {
          savePortfolioItem(item);
        } catch (error) {
          if (isDev) {
            console.error(`Error saving portfolio item "${item.title}":`, error);
          }
        }
      });
      if (isDev) {
        console.log(`✅ Portfolio initialized with ${portfolioItems.length} items`);
      }
    }
  } catch (error) {
    if (isDev) {
      console.error('Error initializing portfolio:', error);
    }
  }
}

/**
 * Reset portfolio to initial state (use with caution - deletes all existing items)
 */
export function resetPortfolio(): void {
  try {
    // Check if localStorage is available
    if (typeof window === 'undefined' || !window.localStorage) {
      return;
    }

    localStorage.removeItem('pooja_aura_portfolio');
    portfolioItems.forEach((item) => {
      try {
        savePortfolioItem(item);
      } catch (error) {
        if (isDev) {
          console.error(`Error saving portfolio item "${item.title}":`, error);
        }
      }
    });
    if (isDev) {
      console.log(`✅ Portfolio reset and initialized with ${portfolioItems.length} items`);
    }
  } catch (error) {
    if (isDev) {
      console.error('Error resetting portfolio:', error);
    }
  }
}

