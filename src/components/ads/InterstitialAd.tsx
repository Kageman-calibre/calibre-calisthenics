
import { useState, useEffect } from 'react';
import { X, Play, SkipForward } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface InterstitialAdProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete?: () => void;
}

const InterstitialAd = ({ isOpen, onClose, onComplete }: InterstitialAdProps) => {
  const [countdown, setCountdown] = useState(5);
  const [canSkip, setCanSkip] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    setCountdown(5);
    setCanSkip(false);
    setIsPlaying(false);

    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          setCanSkip(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen]);

  const handleClose = () => {
    onClose();
    onComplete?.();
  };

  const handlePlay = () => {
    setIsPlaying(true);
    // Simulate video/ad playing
    setTimeout(() => {
      setIsPlaying(false);
      setCanSkip(true);
    }, 3000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg bg-slate-900 border-gold/20">
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="bg-gold/20 px-2 py-1 rounded text-xs text-gold font-medium">
              AD
            </div>
            {canSkip && (
              <Button
                size="sm"
                variant="ghost"
                onClick={handleClose}
                className="text-gray-400 hover:text-white p-1"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          <div className="aspect-video bg-gradient-to-br from-slate-800 to-slate-700 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
            {!isPlaying ? (
              <div className="text-center">
                <Button
                  onClick={handlePlay}
                  className="bg-gold hover:bg-gold/80 text-black rounded-full p-4 mb-4"
                >
                  <Play className="h-8 w-8" />
                </Button>
                <p className="text-white text-lg font-medium">
                  🏋️ Premium Training Equipment
                </p>
                <p className="text-gray-400">
                  Discover our range of professional training equipment
                </p>
              </div>
            ) : (
              <div className="text-center">
                <div className="animate-pulse">
                  <div className="w-16 h-16 bg-gold/30 rounded-full mx-auto mb-4"></div>
                  <p className="text-white">Playing ad...</p>
                </div>
              </div>
            )}

            {!canSkip && (
              <div className="absolute bottom-4 right-4 bg-black/70 px-3 py-1 rounded-full">
                <span className="text-white text-sm">
                  Skip in {countdown}s
                </span>
              </div>
            )}
          </div>

          <div className="flex justify-between items-center">
            <div className="text-left">
              <h3 className="text-white font-medium">Training Equipment</h3>
              <p className="text-gray-400 text-sm">Get 30% off this week</p>
            </div>
            
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                className="border-gold/30 text-gold hover:bg-gold/10"
              >
                Learn More
              </Button>
              {canSkip && (
                <Button
                  onClick={handleClose}
                  size="sm"
                  className="bg-slate-700 hover:bg-slate-600 text-white"
                >
                  <SkipForward className="h-4 w-4 mr-1" />
                  Skip
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InterstitialAd;
