
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/auth/AuthProvider';
import { useToast } from '@/hooks/use-toast';
import { LEVEL_REQUIREMENTS } from './skill-requirements/constants';
import LevelRequirementCard from './skill-requirements/LevelRequirementCard';
import AllRequirementsOverview from './skill-requirements/AllRequirementsOverview';

interface SkillRequirementsProps {
  currentLevel: number;
}

const SkillRequirements = ({ currentLevel }: SkillRequirementsProps) => {
  const [completedSkills, setCompletedSkills] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      fetchCompletedSkills();
    }
  }, [user]);

  const fetchCompletedSkills = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('skill_completions')
        .select('skill_id')
        .eq('user_id', user.id);

      if (error) {
        console.error('Error fetching skill completions:', error);
      } else if (data) {
        setCompletedSkills(new Set(data.map(item => item.skill_id)));
      }
    } catch (error) {
      console.error('Error in fetchCompletedSkills:', error);
    }
    
    setLoading(false);
  };

  const markSkillComplete = async (skillId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('skill_completions')
        .insert({
          user_id: user.id,
          skill_id: skillId
        });

      if (!error) {
        setCompletedSkills(prev => new Set([...prev, skillId]));
        toast({
          title: "Skill Completed! 🎉",
          description: "Great job! You've mastered this movement.",
        });
      } else {
        console.error('Error marking skill complete:', error);
      }
    } catch (error) {
      console.error('Error in markSkillComplete:', error);
    }
  };

  const getNextRequirement = () => {
    return LEVEL_REQUIREMENTS.find(req => req.level > currentLevel);
  };

  const getCurrentRequirement = () => {
    return LEVEL_REQUIREMENTS.find(req => req.level <= currentLevel + 10 && req.level > currentLevel);
  };

  if (loading) {
    return <div className="text-white">Loading skill requirements...</div>;
  }

  const nextReq = getNextRequirement();
  const currentReq = getCurrentRequirement();

  return (
    <div className="space-y-6">
      {/* Current Level Requirements */}
      {currentReq && (
        <LevelRequirementCard
          requirement={currentReq}
          completedSkills={completedSkills}
          onMarkSkillComplete={markSkillComplete}
          variant="current"
        />
      )}

      {/* Upcoming Requirements */}
      {nextReq && (
        <LevelRequirementCard
          requirement={nextReq}
          completedSkills={completedSkills}
          onMarkSkillComplete={markSkillComplete}
          variant="upcoming"
        />
      )}

      {/* All Requirements Overview */}
      <AllRequirementsOverview 
        currentLevel={currentLevel}
        currentRequirement={currentReq}
      />
    </div>
  );
};

export default SkillRequirements;
