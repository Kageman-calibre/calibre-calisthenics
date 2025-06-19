
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Flame, Target, Clock, Award, Star } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/auth/AuthProvider';
import { useToast } from '@/hooks/use-toast';

interface Achievement {
  id: string;
  name: string;
  description: string | null;
  earned_at: string | null;
}

interface UserStats {
  total_workouts: number;
  total_minutes: number;
  current_streak: number;
  longest_streak: number;
}

const ACHIEVEMENT_DEFINITIONS = [
  {
    id: 'first_workout',
    name: 'First Steps',
    description: 'Complete your first workout',
    icon: Target,
    check: (stats: UserStats) => stats.total_workouts >= 1
  },
  {
    id: 'workout_warrior',
    name: 'Workout Warrior',
    description: 'Complete 10 workouts',
    icon: Trophy,
    check: (stats: UserStats) => stats.total_workouts >= 10
  },
  {
    id: 'century_club',
    name: 'Century Club',
    description: 'Complete 100 workouts',
    icon: Award,
    check: (stats: UserStats) => stats.total_workouts >= 100
  },
  {
    id: 'streak_starter',
    name: 'Streak Starter',
    description: 'Maintain a 7-day workout streak',
    icon: Flame,
    check: (stats: UserStats) => stats.current_streak >= 7
  },
  {
    id: 'consistency_king',
    name: 'Consistency King',
    description: 'Maintain a 30-day workout streak',
    icon: Star,
    check: (stats: UserStats) => stats.longest_streak >= 30
  },
  {
    id: 'time_master',
    name: 'Time Master',
    description: 'Accumulate 1000 minutes of exercise',
    icon: Clock,
    check: (stats: UserStats) => stats.total_minutes >= 1000
  }
];

const AchievementSystem = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      fetchAchievements();
      fetchUserStats();
    }
  }, [user]);

  const fetchAchievements = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('achievements')
      .select('*')
      .eq('user_id', user.id);

    if (!error && data) {
      setAchievements(data);
    }
  };

  const fetchUserStats = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('user_stats')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (!error && data) {
      setUserStats(data);
      checkForNewAchievements(data);
    }
    
    setLoading(false);
  };

  const checkForNewAchievements = async (stats: UserStats) => {
    const earnedAchievementIds = achievements.map(a => a.name);
    
    for (const achievementDef of ACHIEVEMENT_DEFINITIONS) {
      if (!earnedAchievementIds.includes(achievementDef.name) && achievementDef.check(stats)) {
        await awardAchievement(achievementDef.name, achievementDef.description);
      }
    }
  };

  const awardAchievement = async (name: string, description: string) => {
    if (!user) return;

    const { error } = await supabase
      .from('achievements')
      .insert({
        user_id: user.id,
        name,
        description,
        earned_at: new Date().toISOString()
      });

    if (!error) {
      toast({
        title: "Achievement Unlocked! 🏆",
        description: `${name}: ${description}`,
      });
      
      fetchAchievements(); // Refresh achievements
    }
  };

  if (loading) {
    return <div className="text-white">Loading achievements...</div>;
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 backdrop-blur-sm border-yellow-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Trophy className="h-6 w-6 mr-2 text-yellow-400" />
            Your Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ACHIEVEMENT_DEFINITIONS.map((achievementDef) => {
              const earned = achievements.find(a => a.name === achievementDef.name);
              const IconComponent = achievementDef.icon;
              
              return (
                <Card
                  key={achievementDef.id}
                  className={`${
                    earned 
                      ? 'bg-gradient-to-br from-yellow-500/30 to-orange-500/30 border-yellow-500/50' 
                      : 'bg-slate-800/50 border-slate-700/50'
                  } transition-all duration-300`}
                >
                  <CardContent className="p-4 text-center">
                    <div className={`p-3 rounded-full mx-auto mb-3 w-fit ${
                      earned ? 'bg-yellow-500/20' : 'bg-slate-700/50'
                    }`}>
                      <IconComponent className={`h-6 w-6 ${
                        earned ? 'text-yellow-400' : 'text-gray-500'
                      }`} />
                    </div>
                    <h3 className={`font-semibold mb-2 ${
                      earned ? 'text-yellow-400' : 'text-gray-400'
                    }`}>
                      {achievementDef.name}
                    </h3>
                    <p className="text-sm text-gray-300 mb-3">
                      {achievementDef.description}
                    </p>
                    {earned && (
                      <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-400">
                        Earned {new Date(earned.earned_at || '').toLocaleDateString()}
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {userStats && (
        <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50">
          <CardHeader>
            <CardTitle className="text-white">Progress Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-400">{userStats.total_workouts}</div>
                <div className="text-sm text-gray-400">Total Workouts</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">{Math.floor(userStats.total_minutes / 60)}h {userStats.total_minutes % 60}m</div>
                <div className="text-sm text-gray-400">Total Time</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">{userStats.current_streak}</div>
                <div className="text-sm text-gray-400">Current Streak</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">{userStats.longest_streak}</div>
                <div className="text-sm text-gray-400">Best Streak</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AchievementSystem;
