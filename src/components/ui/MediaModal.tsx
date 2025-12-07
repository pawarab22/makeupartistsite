import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { PortfolioItem } from '../../types/portfolio';

interface MediaModalProps {
  item: PortfolioItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function MediaModal({ item, isOpen, onClose }: MediaModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Play video when modal opens
      if (videoRef.current && item?.mediaType === 'video') {
        videoRef.current.play().catch((error) => {
          console.error('Error playing video:', error);
        });
      }
    } else {
      document.body.style.overflow = 'unset';
      // Pause video when modal closes
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
    
    return () => {
      document.body.style.overflow = 'unset';
      if (videoRef.current) {
        videoRef.current.pause();
      }
    };
  }, [isOpen, item]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
    }

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !item) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4 md:p-6"
      onClick={onClose}
      style={{ 
        background: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        animation: 'fadeIn 0.3s ease-out'
      }}
    >
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-72 bg-rose-accent/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-rose-pink/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-rose-300/10 rounded-full blur-3xl"></div>
      </div>

      <div
        className="relative w-full max-w-4xl max-h-[90vh] sm:max-h-[85vh] md:max-h-[80vh] bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/20 flex flex-col"
        onClick={(e) => e.stopPropagation()}
        style={{ 
          animation: 'scaleIn 0.3s ease-out',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1)'
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 p-2.5 sm:p-2.5 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all duration-200 hover:scale-110 border border-rose-200/50 min-w-[44px] min-h-[44px] flex items-center justify-center"
          aria-label="Close modal"
        >
          <X className="w-5 h-5 sm:w-6 sm:h-6 text-deep-plum" />
        </button>

        {/* Media Content Card */}
        <div className="relative w-full flex items-center justify-center bg-gradient-to-br from-rose-50/30 via-pink-50/20 to-white p-3 sm:p-4 md:p-6 flex-shrink-0">
          <div className="relative w-full max-h-[45vh] sm:max-h-[50vh] md:max-h-[55vh] flex items-center justify-center rounded-2xl overflow-hidden bg-white/50 backdrop-blur-sm border border-white/30 shadow-inner">
            {item.mediaType === 'image' ? (
              <img
                src={item.mediaUrl}
                alt={item.title}
                className="w-full h-auto max-h-[45vh] sm:max-h-[50vh] md:max-h-[55vh] object-contain rounded-xl"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23f3f4f6" width="400" height="300"/%3E%3Ctext fill="%239ca3af" font-family="sans-serif" font-size="18" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3EImage not available%3C/text%3E%3C/svg%3E';
                }}
              />
            ) : (
              <video
                ref={videoRef}
                src={item.mediaUrl}
                controls
                autoPlay
                className="w-full h-auto max-h-[45vh] sm:max-h-[50vh] md:max-h-[55vh] object-contain rounded-xl"
                playsInline
                preload="auto"
                onError={() => {
                  console.error('Error loading video in modal:', item.title);
                }}
              >
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        </div>

        {/* Content Info Card - Always Visible */}
        <div className="bg-gradient-to-br from-white via-rose-50/30 to-pink-50/20 backdrop-blur-sm p-4 sm:p-5 md:p-6 border-t border-rose-200/30 flex-shrink-0 overflow-y-auto">
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-deep-plum leading-tight">
              {item.title}
            </h3>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              {item.caption}
            </p>
            <div className="flex flex-wrap gap-2 sm:gap-2.5 pt-1">
              {item.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 sm:px-3 sm:py-1.5 bg-gradient-to-r from-soft-blush to-pink-100 text-deep-plum rounded-full text-xs sm:text-sm font-semibold shadow-sm border border-rose-200/50"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

