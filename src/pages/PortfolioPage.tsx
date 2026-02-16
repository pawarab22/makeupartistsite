import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/ui/Card';
import Tag from '../components/ui/Tag';
import MediaModal from '../components/ui/MediaModal';
import { getPortfolioItems } from '../lib/localDb';
import { PortfolioItem } from '../types/portfolio';
import { Play, ArrowLeft } from 'lucide-react';

// Check if we're in development mode
const isDev = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

// No static fallback - portfolio will only show admin-uploaded content

const categories = ['All', 'Bridal', 'Sider', 'Engagement', 'Baby Shower', 'Party', 'Pre-Wedding', 'Photoshoot'];

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const loadPortfolioItems = async () => {
    try {
      const storedItems = await getPortfolioItems();
      // Sort by creation date (newest first)
      const sorted = [...storedItems].sort((a, b) => {
        try {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        } catch {
          return 0;
        }
      });
      setPortfolioItems(sorted);
    } catch (error) {
      if (isDev) {
        console.error('Error loading portfolio items:', error);
      }
      setPortfolioItems([]);
    }
  };

  useEffect(() => {
    loadPortfolioItems();

    // Refresh when page becomes visible (user switches tabs/windows)
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        loadPortfolioItems();
      }
    };

    // Refresh on focus
    const handleFocus = () => {
      loadPortfolioItems();
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleFocus);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  const filteredItems = selectedCategory === 'All'
    ? portfolioItems
    : portfolioItems.filter(item => item.category === selectedCategory);

  const handleItemClick = (item: PortfolioItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-rose-50/30 to-soft-blush py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="inline-flex items-center text-rose-accent hover:text-rose-600 font-medium mb-6 group transition-all"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>
        <div className="text-center mb-8 sm:mb-12 animate-fade-in">
          <span className="inline-block px-4 py-2 bg-gradient-to-r from-rose-accent to-rose-pink text-white rounded-full text-sm font-semibold mb-4 shadow-md">
            Our Work
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-deep-plum mb-4 drop-shadow-sm" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            Portfolio
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-700 max-w-3xl mx-auto px-4 font-medium">
            Explore our collection of stunning transformations
          </p>
        </div>

        {/* Filter Chips */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12 px-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 sm:px-6 py-2.5 sm:py-2 rounded-full text-sm sm:text-base font-semibold transition-all duration-300 transform hover:scale-105 min-h-[40px] sm:min-h-[36px] ${selectedCategory === category
                ? 'bg-gradient-to-r from-rose-accent to-rose-pink text-white shadow-lg shadow-rose-accent/40'
                : 'bg-white text-deep-plum hover:bg-soft-blush shadow-md'
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        {filteredItems.length === 0 ? (
          <Card className="text-center py-12">
            <p className="text-gray-600 text-lg mb-4">No portfolio items available yet.</p>
            <p className="text-gray-500 text-sm">Check back soon for our latest work!</p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredItems.map((item, index) => (
              <Card
                key={item.id}
                hover
                className="p-0 overflow-hidden border-2 border-transparent hover:border-rose-200 transition-all duration-300 cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => handleItemClick(item)}
              >
                <div className="relative h-64 sm:h-80 overflow-hidden group">
                  {item.mediaType === 'image' ? (
                    <img
                      src={item.mediaUrl}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23f3f4f6" width="400" height="300"/%3E%3Ctext fill="%239ca3af" font-family="sans-serif" font-size="18" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3EImage not available%3C/text%3E%3C/svg%3E';
                      }}
                    />
                  ) : item.mediaUrl.includes('instagram.com') || item.mediaUrl.includes('youtube.com') || item.mediaUrl.includes('youtu.be') ? (
                    <div className="w-full h-full bg-gradient-to-br from-deep-plum to-rose-900 flex flex-col items-center justify-center p-6 text-center">
                      <div className="bg-white/90 rounded-full p-4 shadow-xl mb-4 transform group-hover:scale-110 transition-all duration-300">
                        <Play className="w-10 h-10 text-rose-accent fill-rose-accent ml-1" />
                      </div>
                      <span className="text-white font-bold text-lg drop-shadow-md">
                        Watch on {item.mediaUrl.includes('instagram.com') ? 'Instagram' : 'YouTube'}
                      </span>
                      <p className="text-white/80 text-xs mt-2 font-medium">Click to open full video</p>
                    </div>
                  ) : (
                    <>
                      <video
                        src={item.mediaUrl}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        preload="metadata"
                        playsInline
                        muted
                        loop
                        onLoadedMetadata={() => {
                          // Video loaded successfully
                        }}
                        onError={() => {
                          if (isDev) {
                            console.error('Error loading video:', item.title, item.mediaUrl);
                          }
                        }}
                      />
                      {/* Play Button Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-all duration-300">
                        <div className="bg-white/90 hover:bg-white rounded-full p-4 shadow-xl transform group-hover:scale-110 transition-all duration-300">
                          <Play className="w-8 h-8 text-rose-accent fill-rose-accent ml-1" />
                        </div>
                      </div>
                    </>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-3 left-3 flex gap-2 flex-wrap z-10">
                    {item.tags.map((tag, i) => (
                      <Tag key={i}>{tag}</Tag>
                    ))}
                  </div>
                </div>
                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold text-deep-plum mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.caption}</p>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Media Modal */}
      <MediaModal
        item={selectedItem}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}

