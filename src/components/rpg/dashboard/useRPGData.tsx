
import { useState, useEffect } from 'react';
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

export const useRPGData = () => {
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

  return {
    userBadges,
    xpRewards,
    currentLevel,
    loading,
    fetchUserData,
    awardTestXP
  };
};
