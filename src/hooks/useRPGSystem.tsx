
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

  const checkSkillRequirements = async (targetLevel: number): Promise<boolean> => {
    if (!user) return false;

    // Define skill requirements for each level milestone
    const skillRequirements: { [key: number]: string[] } = {
      11: ['l-sit', 'pistol-squat'],
      21: ['strict-pullup', 'parallel-dips'],
      31: ['muscle-up', 'handstand-pushup', 'front-lever'],
      41: ['one-arm-pullup', 'planche', 'human-flag'],
      51: ['iron-cross', 'one-arm-handstand']
    };

    const requiredSkills = skillRequirements[targetLevel];
    if (!requiredSkills) return true; // No requirements for this level

    // Check if user has completed all required skills
    const { data: completedSkills } = await supabase
      .from('skill_completions')
      .select('skill_id')
      .eq('user_id', user.id)
      .in('skill_id', requiredSkills);

    const completedSkillIds = completedSkills?.map(s => s.skill_id) || [];
    const hasAllSkills = requiredSkills.every(skill => completedSkillIds.includes(skill));

    if (!hasAllSkills) {
      const missingSkills = requiredSkills.filter(skill => !completedSkillIds.includes(skill));
      toast({
        title: "Skill Requirements Not Met",
        description: `To reach Level ${targetLevel}, you must complete: ${missingSkills.join(', ')}`,
        variant: "destructive"
      });
    }

    return hasAllSkills;
  };

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
        // Check skill requirements before allowing level up
        const canLevelUp = await checkSkillRequirements(result.new_level);
        
        if (canLevelUp) {
          setLevelUpData({
            newLevel: result.new_level,
            newTitle: getTitle(result.new_level),
            xpGained: result.xp_gained
          });
          setShowLevelUp(true);
        } else {
          // Award XP but don't level up - cap at previous level
          toast({
            title: "XP Earned! ⭐",
            description: `You gained ${result.xp_gained} XP! Complete skill requirements to level up.`,
          });
        }
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
    if (level >= 50) return 'Legendary Master';
    if (level >= 40) return 'Elite Performer';
    if (level >= 30) return 'Movement Master';
    if (level >= 20) return 'Strength Adept';
    if (level >= 15) return 'Dedicated Athlete';
    if (level >= 10) return 'Skill Initiate';
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
    checkSkillRequirements,
    closeLevelUp: () => setShowLevelUp(false)
  };
};
