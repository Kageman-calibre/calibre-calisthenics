
import { Trophy, Star, Target, Flame, Clock, Award } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface AchievementBadgeProps {
  name: string;
  description: string;
  earned: boolean;
  earnedDate?: string;
  rarity?: 'common' | 'rare' | 'epic' | 'legendary';
}

const AchievementBadge = ({ name, description, earned, earnedDate, rarity = 'common' }: AchievementBadgeProps) => {
  const getIcon = () => {
    if (name.toLowerCase().includes('streak')) return Flame;
    if (name.toLowerCase().includes('time')) return Clock;
    if (name.toLowerCase().includes('target')) return Target;
    if (name.toLowerCase().includes('star')) return Star;
    if (name.toLowerCase().includes('award')) return Award;
    return Trophy;
  };

  const getRarityColors = () => {
    switch (rarity) {
      case 'legendary': return 'from-purple-500/30 to-pink-500/30 border-purple-500/50 text-purple-400';
      case 'epic': return 'from-blue-500/30 to-cyan-500/30 border-blue-500/50 text-blue-400';
      case 'rare': return 'from-green-500/30 to-emerald-500/30 border-green-500/50 text-green-400';
      default: return 'from-yellow-500/30 to-orange-500/30 border-yellow-500/50 text-yellow-400';
    }
  };

  const IconComponent = getIcon();

  return (
    <div className={`
      relative p-4 rounded-lg border transition-all duration-300 hover:scale-105
      ${earned 
        ? `bg-gradient-to-br ${getRarityColors()}` 
        : 'bg-slate-800/50 border-slate-700/50'
      }
    `}>
      {earned && rarity === 'legendary' && (
        <div className="absolute -top-2 -right-2 animate-pulse">
          <Star className="h-6 w-6 text-purple-400 fill-purple-400" />
        </div>
      )}
      
      <div className="text-center">
        <div className={`p-3 rounded-full mx-auto mb-3 w-fit ${
          earned ? getRarityColors().split(' ')[0] : 'bg-slate-700/50'
        }`}>
          <IconComponent className={`h-6 w-6 ${
            earned ? getRarityColors().split(' ').pop() : 'text-gray-500'
          }`} />
        </div>
        
        <h3 className={`font-semibold mb-2 ${
          earned ? getRarityColors().split(' ').pop() : 'text-gray-400'
        }`}>
          {name}
        </h3>
        
        <p className="text-sm text-gray-300 mb-3">
          {description}
        </p>
        
        {earned && earnedDate && (
          <Badge variant="secondary" className={getRarityColors().split(' ')[0] + ' ' + getRarityColors().split(' ').pop()}>
            Earned {new Date(earnedDate).toLocaleDateString()}
          </Badge>
        )}
        
        {rarity !== 'common' && (
          <Badge variant="outline" className="mt-2 capitalize">
            {rarity}
          </Badge>
        )}
      </div>
    </div>
  );
};

export default AchievementBadge;
