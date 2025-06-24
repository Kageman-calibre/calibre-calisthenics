import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User, Trophy, Star, Target, Gift, Zap } from 'lucide-react';
import XPProgressBar from './XPProgressBar';
import AvatarCustomizer from './AvatarCustomizer';
import SkillRequirements from './SkillRequirements';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/auth/AuthProvider';
import { useToast } from '@/hooks/use-toast';

interface BadgeData {
  badge_id: string;
  badge_name: string;
  badge_description: string;
  rarity: string;
  earned_at: string;
}

interface XPReward {
  action_type: string;
  base_xp: number;
  description: string;
}

const RPGDashboard = () => {
  const [activeTab, setActiveTab] = useState('character');
  const [userBadges, setUserBadges] = useState<BadgeData[]>([]);
  const [xpRewards, setXpRewards] = useState<XPReward[]>([]);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [user]);

  const fetchUserData = async () => {
    if (!user) return;

    setLoading(true);
    
    // Fetch user badges
    const { data: badges } = await supabase
      .from('user_badges')
      .select('*')
      .eq('user_id', user.id)
      .order('earned_at', { ascending: false });

    // Fetch XP rewards
    const { data: rewards } = await supabase
      .from('xp_rewards')
      .select('*')
      .order('base_xp', { ascending: false });

    // Fetch user progression
    const { data: progression } = await supabase
      .from('user_progression')
      .select('level')
      .eq('user_id', user.id)
      .single();

    if (badges) setUserBadges(badges);
    if (rewards) setXpRewards(rewards);
    if (progression) setCurrentLevel(progression.level);
    
    setLoading(false);
  };

  const awardTestXP = async (actionType: string) => {
    if (!user) return;

    const { data, error } = await supabase
      .rpc('award_xp', {
        p_user_id: user.id,
        p_action_type: actionType
      });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to award XP",
        variant: "destructive"
      });
    } else if (data && data[0]) {
      const result = data[0];
      if (result.leveled_up) {
        toast({
          title: "🎉 LEVEL UP!",
          description: `Congratulations! You reached Level ${result.new_level}!`,
        });
      } else {
        toast({
          title: "XP Earned! ⭐",
          description: `You gained ${result.xp_gained} XP!`,
        });
      }
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'epic': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'rare': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'uncommon': return 'bg-green-500/20 text-green-400 border-green-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="space-y-6">
      {/* XP Progress Bar */}
      <XPProgressBar />

      {/* Main RPG Dashboard */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-slate-800/50">
          <TabsTrigger value="character" className="text-white flex items-center gap-2">
            <User className="h-4 w-4" />
            Character
          </TabsTrigger>
          <TabsTrigger value="skills" className="text-white flex items-center gap-2">
            <Target className="h-4 w-4" />
            Skills
          </TabsTrigger>
          <TabsTrigger value="badges" className="text-white flex items-center gap-2">
            <Trophy className="h-4 w-4" />
            Badges
          </TabsTrigger>
          <TabsTrigger value="rewards" className="text-white flex items-center gap-2">
            <Gift className="h-4 w-4" />
            XP Rewards
          </TabsTrigger>
          <TabsTrigger value="quests" className="text-white flex items-center gap-2">
            <Target className="h-4 w-4" />
            Daily Quests
          </TabsTrigger>
        </TabsList>

        <TabsContent value="character" className="mt-6">
          <AvatarCustomizer onAvatarUpdate={fetchUserData} />
        </TabsContent>

        <TabsContent value="skills" className="mt-6">
          <SkillRequirements currentLevel={currentLevel} />
        </TabsContent>

        <TabsContent value="badges" className="mt-6">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Trophy className="h-6 w-6 mr-2 text-yellow-400" />
                Badge Collection ({userBadges.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-white">Loading badges...</div>
              ) : userBadges.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {userBadges.map((badge) => (
                    <div
                      key={badge.badge_id}
                      className={`p-4 rounded-lg border ${getRarityColor(badge.rarity)}`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <Star className="h-5 w-5" />
                        <Badge className={getRarityColor(badge.rarity)}>
                          {badge.rarity}
                        </Badge>
                      </div>
                      <h3 className="font-semibold text-white mb-1">{badge.badge_name}</h3>
                      <p className="text-sm text-gray-300 mb-2">{badge.badge_description}</p>
                      <p className="text-xs text-gray-400">
                        Earned: {new Date(badge.earned_at).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Trophy className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                  <p className="text-gray-400">No badges earned yet!</p>
                  <p className="text-sm text-gray-500">Complete workouts and achievements to earn badges.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rewards" className="mt-6">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Gift className="h-6 w-6 mr-2 text-green-400" />
                XP Reward System
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {xpRewards.map((reward) => (
                <div
                  key={reward.action_type}
                  className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg"
                >
                  <div>
                    <h3 className="text-white font-medium">{reward.description}</h3>
                    <p className="text-sm text-gray-400">Action: {reward.action_type}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge className="bg-blue-500/20 text-blue-400">
                      +{reward.base_xp} XP
                    </Badge>
                    <button
                      onClick={() => awardTestXP(reward.action_type)}
                      className="text-xs bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md transition-colors"
                    >
                      Test
                    </button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quests" className="mt-6">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Target className="h-6 w-6 mr-2 text-purple-400" />
                Daily Quests
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { name: 'Complete a workout', xp: 50, completed: false },
                { name: 'Try a new exercise', xp: 25, completed: true },
                { name: 'Login to the app', xp: 10, completed: true },
                { name: 'Share your progress', xp: 25, completed: false }
              ].map((quest, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-4 rounded-lg ${
                    quest.completed 
                      ? 'bg-green-500/20 border border-green-500/30' 
                      : 'bg-slate-700/30'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full border-2 ${
                      quest.completed 
                        ? 'bg-green-500 border-green-500' 
                        : 'border-gray-500'
                    }`}>
                      {quest.completed && (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full" />
                        </div>
                      )}
                    </div>
                    <span className={`${quest.completed ? 'text-green-400' : 'text-white'}`}>
                      {quest.name}
                    </span>
                  </div>
                  <Badge className={`${
                    quest.completed 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-blue-500/20 text-blue-400'
                  }`}>
                    +{quest.xp} XP
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RPGDashboard;
