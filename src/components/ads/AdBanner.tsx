
import { useState, useEffect } from 'react';
import { X, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AdBannerProps {
  position?: 'top' | 'bottom' | 'inline';
  size?: 'banner' | 'large' | 'medium';
  className?: string;
}

const AdBanner = ({ position = 'bottom', size = 'banner', className = '' }: AdBannerProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [adContent, setAdContent] = useState<string>('');

  useEffect(() => {
    // Simulate ad loading
    const loadAd = setTimeout(() => {
      setIsLoading(false);
      setAdContent(generateSampleAd());
    }, 2000);

    return () => clearTimeout(loadAd);
  }, []);

  const generateSampleAd = () => {
    const ads = [
      "🏋️ Best Training Equipment - 30% Off!",
      "💪 Protein Powder for Strength Training - Buy Now!",
      "🥗 Healthy Meal Planning - Try Free!",
      "⌚ Smartwatch for Training - New Model Available!",
      "🏃 Running Shoes for All Terrains - See Selection!"
    ];
    return ads[Math.floor(Math.random() * ads.length)];
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'large':
        return 'h-24 lg:h-32';
      case 'medium':
        return 'h-20';
      case 'banner':
      default:
        return 'h-16';
    }
  };

  const getPositionClasses = () => {
    switch (position) {
      case 'top':
        return 'fixed top-0 left-0 right-0 z-40';
      case 'bottom':
        return 'fixed bottom-0 left-0 right-0 z-40';
      case 'inline':
      default:
        return 'relative';
    }
  };

  const refreshAd = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setAdContent(generateSampleAd());
    }, 1000);
  };

  if (!isVisible) return null;

  return (
    <div className={`${getPositionClasses()} ${className}`}>
      <div className={`bg-gradient-to-r from-slate-800 to-slate-700 border-t border-gold/20 ${getSizeClasses()}`}>
        <div className="container mx-auto px-4 h-full flex items-center justify-between">
          {isLoading ? (
            <div className="flex items-center space-x-3 flex-1">
              <RefreshCw className="h-4 w-4 text-gray-400 animate-spin" />
              <span className="text-gray-400 text-sm">Loading ad...</span>
            </div>
          ) : (
            <div className="flex items-center space-x-4 flex-1">
              <div className="bg-gold/20 px-2 py-1 rounded text-xs text-gold font-medium">
                AD
              </div>
              <p className="text-white text-sm flex-1 truncate">{adContent}</p>
              <Button
                size="sm"
                variant="outline"
                className="hidden sm:inline-flex border-gold/30 text-gold hover:bg-gold/10"
              >
                Learn More
              </Button>
            </div>
          )}
          
          <div className="flex items-center space-x-2 ml-4">
            <Button
              size="sm"
              variant="ghost"
              onClick={refreshAd}
              className="text-gray-400 hover:text-white p-1"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setIsVisible(false)}
              className="text-gray-400 hover:text-white p-1"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdBanner;
