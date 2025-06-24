
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/auth/AuthProvider';
import { useToast } from '@/hooks/use-toast';

interface RPGData {
  level: number;
  currentXP: number;
  totalXP: number;
  title: string;
  badges: any[];
}

export const useRPGSystem = () => {
  const [rpgData, setRpgData] = useState<RPGData | null>(null);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [levelUpData, setLevelUpData] = useState({ newLevel: 1, newTitle: '', xpGained: 0 });
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchRPGData = useCallback(async () => {
    if (!user) return;

    // Fetch user progression
    const { data: progression } = await supabase
      .from('user_progression')
      .select('*')
      .eq('user_id', user.id)
      .single();

    // Fetch user badges
    const { data: badges } = await supabase
      .from('user_badges')
      .select('*')
      .eq('user_id', user.id);

    if (progression) {
      setRpgData({
        level: progression.level,
        currentXP: progression.current_xp,
        totalXP: progression.total_xp,
        title: progression.title,
        badges: badges || []
      });
    }
  }, [user]);

  const awardXP = async (actionType: string, multiplier: number = 1.0) => {
    if (!user) return;

    const { data, error } = await supabase
      .rpc('award_xp', {
        p_user_id: user.id,
        p_action_type: actionType,
        p_multiplier: multiplier
      });

    if (error) {
      console.error('Error awarding XP:', error);
      return;
    }

    if (data && data[0]) {
      const result = data[0];
      
      if (result.leveled_up) {
        setLevelUpData({
          newLevel: result.new_level,
          newTitle: getTitle(result.new_level),
          xpGained: result.xp_gained
        });
        setShowLevelUp(true);
      } else {
        toast({
          title: "XP Earned! ⭐",
          description: `You gained ${result.xp_gained} XP!`,
        });
      }
      
      // Refresh RPG data
      fetchRPGData();
    }
  };

  const awardBadge = async (badgeId: string, badgeName: string, description: string, rarity: string = 'common') => {
    if (!user) return;

    const { error } = await supabase
      .from('user_badges')
      .insert({
        user_id: user.id,
        badge_id: badgeId,
        badge_name: badgeName,
        badge_description: description,
        rarity: rarity
      });

    if (!error) {
      toast({
        title: "Badge Earned! 🏆",
        description: `You earned the "${badgeName}" badge!`,
      });
      fetchRPGData();
    }
  };

  const getTitle = (level: number): string => {
    if (level >= 50) return 'Fitness Legend';
    if (level >= 40) return 'Elite Athlete';
    if (level >= 30) return 'Fitness Master';
    if (level >= 20) return 'Advanced Trainee';
    if (level >= 15) return 'Dedicated Athlete';
    if (level >= 10) return 'Fitness Enthusiast';
    if (level >= 5) return 'Active Member';
    return 'Novice';
  };

  useEffect(() => {
    if (user) {
      fetchRPGData();
    }
  }, [user, fetchRPGData]);

  return {
    rpgData,
    showLevelUp,
    levelUpData,
    awardXP,
    awardBadge,
    fetchRPGData,
    closeLevelUp: () => setShowLevelUp(false)
  };
};
