import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../ui/Card';
import Tag from '../ui/Tag';
import MediaModal from '../ui/MediaModal';
import { getPortfolioItems } from '../../lib/localDb';
import { PortfolioItem } from '../../types/portfolio';
import { Play } from 'lucide-react';

// Check if we're in development mode
const isDev = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

// No static fallback - featured looks will only show admin-uploaded content

export default function FeaturedLooks() {
  const [featuredItems, setFeaturedItems] = useState<PortfolioItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const loadFeaturedItems = async () => {
    try {
      const storedItems = await getPortfolioItems();
      // Show latest 6 items from storage (newest first)
      if (storedItems.length > 0) {
        // Sort by creation date (newest first) and take latest 6
        const sorted = [...storedItems].sort((a, b) => {
          try {
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
          } catch {
            return 0;
          }
        });
        setFeaturedItems(sorted.slice(0, 6));
      } else {
        // No items uploaded yet
        setFeaturedItems([]);
      }
    } catch (error) {
      if (isDev) {
        console.error('Error loading featured items:', error);
      }
      setFeaturedItems([]);
    }
  };

  useEffect(() => {
    loadFeaturedItems();

    // Refresh when page becomes visible (user switches tabs/windows)
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        loadFeaturedItems();
      }
    };

    // Refresh on focus
    const handleFocus = () => {
      loadFeaturedItems();
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleFocus);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  const handleItemClick = (item: PortfolioItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-deep-plum mb-4 drop-shadow-sm" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>Featured Looks</h2>
          <p className="text-base sm:text-lg text-gray-700 max-w-2xl mx-auto px-4 font-medium">
            Explore our portfolio of stunning transformations
          </p>
        </div>

        {featuredItems.length === 0 ? (
          <Card className="text-center py-12">
            <p className="text-gray-600 text-lg mb-4">Portfolio coming soon!</p>
            <p className="text-gray-500 text-sm">We're working on showcasing our beautiful work.</p>
          </Card>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {featuredItems.map((look) => (
                <Card
                  key={look.id}
                  hover
                  className="p-0 overflow-hidden cursor-pointer"
                  onClick={() => handleItemClick(look)}
                >
                  <div className="relative h-64 overflow-hidden group">
                    {look.mediaType === 'image' ? (
                      <img
                        src={look.mediaUrl}
                        alt={look.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23f3f4f6" width="400" height="300"/%3E%3Ctext fill="%239ca3af" font-family="sans-serif" font-size="18" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3EImage not available%3C/text%3E%3C/svg%3E';
                        }}
                      />
                    ) : look.mediaUrl.includes('instagram.com') || look.mediaUrl.includes('youtube.com') || look.mediaUrl.includes('youtu.be') ? (
                      <div className="w-full h-full bg-gradient-to-br from-deep-plum to-rose-900 flex flex-col items-center justify-center p-6 text-center">
                        <div className="bg-white/90 rounded-full p-4 shadow-xl mb-4 transform group-hover:scale-110 transition-all duration-300">
                          <Play className="w-8 h-8 text-rose-accent fill-rose-accent ml-1" />
                        </div>
                        <span className="text-white font-bold text-base drop-shadow-md">
                          Watch on {look.mediaUrl.includes('instagram.com') ? 'Instagram' : 'YouTube'}
                        </span>
                        <p className="text-white/80 text-[10px] mt-1 font-medium">Click to open full video</p>
                      </div>
                    ) : (
                      <>
                        <video
                          src={look.mediaUrl}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                          preload="metadata"
                          muted
                          loop
                          playsInline
                          onLoadedMetadata={() => {
                            // Video loaded successfully
                          }}
                          onError={() => {
                            if (isDev) {
                              console.error('Error loading video:', look.title, look.mediaUrl);
                            }
                          }}
                        />
                        {/* Play Button Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-all duration-300">
                          <div className="bg-white/90 hover:bg-white rounded-full p-3 shadow-xl transform group-hover:scale-110 transition-all duration-300">
                            <Play className="w-6 h-6 text-rose-accent fill-rose-accent ml-1" />
                          </div>
                        </div>
                      </>
                    )}
                    <div className="absolute top-4 left-4 flex gap-2 flex-wrap z-10">
                      {look.tags.map((tag, i) => (
                        <Tag key={i}>{tag}</Tag>
                      ))}
                    </div>
                  </div>
                  <div className="p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-bold text-deep-plum mb-2 drop-shadow-sm">{look.title}</h3>
                    <p className="text-gray-700 text-sm leading-relaxed font-medium">{look.caption}</p>
                  </div>
                </Card>
              ))}
            </div>

            <div className="text-center mt-10">
              <Link to="/portfolio" className="text-rose-accent font-semibold hover:underline">
                View Full Portfolio →
              </Link>
            </div>
          </>
        )}
      </div>

      {/* Media Modal */}
      <MediaModal
        item={selectedItem}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
}

