
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/auth/AuthProvider';
import { useRPGSystem } from '@/hooks/useRPGSystem';

export interface ProgramProgress {
  programId: string;
  completedWorkouts: number;
  totalWorkouts: number;
  lastWorkoutDate?: string;
  isCompleted: boolean;
  completionPercentage: number;
}

export const useProgramProgress = () => {
  const [programProgress, setProgramProgress] = useState<Record<string, ProgramProgress>>({});
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { awardXP, awardBadge } = useRPGSystem();

  const fetchUserProgress = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      const { data: sessions } = await supabase
        .from('workout_sessions')
        .select('program_name, completed_at, program_id')
        .eq('user_id', user.id);

      if (sessions) {
        const progressMap: Record<string, ProgramProgress> = {};
        
        const sessionsByProgram = sessions.reduce((acc, session) => {
          const key = session.program_id || session.program_name;
          if (!acc[key]) acc[key] = [];
          acc[key].push(session);
          return acc;
        }, {} as Record<string, typeof sessions>);

        Object.entries(sessionsByProgram).forEach(([programKey, programSessions]) => {
          const completedWorkouts = programSessions.length;
          const lastSession = programSessions.sort((a, b) => 
            new Date(b.completed_at).getTime() - new Date(a.completed_at).getTime()
          )[0];

          const totalWorkouts = 24;
          const completionPercentage = Math.round((completedWorkouts / totalWorkouts) * 100);

          progressMap[programKey] = {
            programId: programKey,
            completedWorkouts,
            totalWorkouts,
            lastWorkoutDate: lastSession?.completed_at,
            isCompleted: completedWorkouts >= totalWorkouts,
            completionPercentage
          };
        });

        setProgramProgress(progressMap);
      }
    } catch (error) {
      console.error('Error fetching program progress:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateProgress = async (programId: string, programName: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('workout_sessions')
        .insert({
          user_id: user.id,
          program_id: programId,
          program_name: programName,
          exercises: [],
          duration_minutes: 30,
          calories_burned: 200,
          difficulty: 'beginner'
        });

      if (!error) {
        // Award XP for program participation
        awardXP('workout_complete', 0.5);
        
        // Check for program completion badges
        const updatedProgress = { ...programProgress };
        if (updatedProgress[programId]) {
          updatedProgress[programId].completedWorkouts += 1;
          
          // Award badges for program milestones
          const progress = updatedProgress[programId];
          if (progress.completedWorkouts === 5) {
            awardBadge('program_dedication', 'Program Dedication', 'Completed 5 workouts in a program!', 'common');
          } else if (progress.completedWorkouts === 12) {
            awardBadge('program_commitment', 'Program Commitment', 'Halfway through a program!', 'uncommon');
          } else if (progress.isCompleted) {
            awardBadge('program_graduate', 'Program Graduate', 'Completed an entire fitness program!', 'rare');
            awardXP('streak_milestone', 2.0); // Big bonus for program completion
          }
        }
        
        await fetchUserProgress();
      }
    } catch (error) {
      console.error('Error updating progress:', error);
    }
  };

  useEffect(() => {
    fetchUserProgress();
  }, [user]);

  return {
    programProgress,
    loading,
    fetchUserProgress,
    updateProgress
  };
};
