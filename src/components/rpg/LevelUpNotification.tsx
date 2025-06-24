
import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Trophy, Zap } from 'lucide-react';

interface LevelUpNotificationProps {
  isVisible: boolean;
  newLevel: number;
  newTitle: string;
  xpGained: number;
  onClose: () => void;
}

const LevelUpNotification = ({ 
  isVisible, 
  newLevel, 
  newTitle, 
  xpGained, 
  onClose 
}: LevelUpNotificationProps) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
        setTimeout(onClose, 300); // Wait for animation to complete
      }, 4000);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${
      show ? 'opacity-100' : 'opacity-0'
    }`} style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}>
      <Card className={`bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border-yellow-500/50 max-w-md w-full transform transition-all duration-300 ${
        show ? 'scale-100' : 'scale-95'
      }`}>
        <CardContent className="p-8 text-center">
          {/* Celebration Animation */}
          <div className="relative mb-6">
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
              <Star className="h-12 w-12 text-white animate-pulse" />
            </div>
            {/* Sparkle effects */}
            <div className="absolute top-0 left-1/4 w-2 h-2 bg-yellow-400 rounded-full animate-ping" />
            <div className="absolute top-1/4 right-1/4 w-1 h-1 bg-orange-400 rounded-full animate-ping animation-delay-100" />
            <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-yellow-300 rounded-full animate-ping animation-delay-200" />
          </div>

          <h1 className="text-4xl font-bold text-white mb-2 animate-bounce">
            LEVEL UP!
          </h1>
          
          <div className="space-y-3 mb-6">
            <div className="flex items-center justify-center space-x-2">
              <Trophy className="h-6 w-6 text-yellow-400" />
              <span className="text-2xl font-bold text-yellow-400">Level {newLevel}</span>
            </div>
            
            <Badge className="bg-yellow-500/20 text-yellow-400 text-lg px-4 py-2">
              {newTitle}
            </Badge>
            
            <div className="flex items-center justify-center space-x-2 text-green-400">
              <Zap className="h-4 w-4" />
              <span>+{xpGained} XP Earned</span>
            </div>
          </div>

          <div className="text-gray-300 text-sm">
            <p>🎉 Congratulations on reaching a new level!</p>
            <p>Keep up the amazing work!</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LevelUpNotification;
