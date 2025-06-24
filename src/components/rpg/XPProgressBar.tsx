
import { useState, useEffect } from 'react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Star, TrendingUp } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/auth/AuthProvider';

interface UserProgression {
  current_xp: number;
  total_xp: number;
  level: number;
  title: string;
}

const XPProgressBar = () => {
  const [progression, setProgression] = useState<UserProgression | null>(null);
  const [xpForNextLevel, setXpForNextLevel] = useState(0);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchProgression();
    }
  }, [user]);

  const fetchProgression = async () => {
    if (!user) return;

    // Get user progression
    const { data: progressData } = await supabase
      .from('user_progression')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (progressData) {
      setProgression(progressData);
      
      // Calculate XP needed for next level
      const { data: nextLevelXP } = await supabase
        .rpc('get_xp_for_next_level', { current_level: progressData.level });
      
      if (nextLevelXP) {
        setXpForNextLevel(nextLevelXP);
      }
    } else {
      // Create initial progression if doesn't exist
      const { data: newProgression } = await supabase
        .from('user_progression')
        .insert({ user_id: user.id })
        .select()
        .single();
      
      if (newProgression) {
        setProgression(newProgression);
        setXpForNextLevel(100);
      }
    }
  };

  if (!progression) return null;

  const progressPercentage = xpForNextLevel > 0 ? (progression.current_xp / xpForNextLevel) * 100 : 0;
  const xpNeeded = Math.max(0, xpForNextLevel - progression.current_xp);

  const getLevelColor = (level: number) => {
    if (level >= 50) return 'text-purple-400';
    if (level >= 25) return 'text-blue-400';
    if (level >= 10) return 'text-green-400';
    if (level >= 5) return 'text-orange-400';
    return 'text-gray-400';
  };

  const getTitleBadgeColor = (level: number) => {
    if (level >= 50) return 'bg-purple-500/20 text-purple-400';
    if (level >= 25) return 'bg-blue-500/20 text-blue-400';
    if (level >= 10) return 'bg-green-500/20 text-green-400';
    if (level >= 5) return 'bg-orange-500/20 text-orange-400';
    return 'bg-gray-500/20 text-gray-400';
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <Star className={`h-5 w-5 ${getLevelColor(progression.level)}`} />
            <span className={`text-2xl font-bold ${getLevelColor(progression.level)}`}>
              Level {progression.level}
            </span>
          </div>
          <Badge className={getTitleBadgeColor(progression.level)}>
            {progression.title}
          </Badge>
        </div>
        <div className="text-right">
          <div className="text-white font-medium">{progression.current_xp} XP</div>
          <div className="text-xs text-gray-400">{progression.total_xp} total</div>
        </div>
      </div>
      
      <div className="space-y-2">
        <Progress value={progressPercentage} className="h-3" />
        <div className="flex justify-between text-sm">
          <span className="text-gray-400 flex items-center">
            <TrendingUp className="h-3 w-3 mr-1" />
            Progress to Level {progression.level + 1}
          </span>
          <span className="text-gray-400">{xpNeeded} XP needed</span>
        </div>
      </div>
    </div>
  );
};

export default XPProgressBar;
