
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/auth/AuthProvider';

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
        
        // Group sessions by program
        const sessionsByProgram = sessions.reduce((acc, session) => {
          const key = session.program_id || session.program_name;
          if (!acc[key]) acc[key] = [];
          acc[key].push(session);
          return acc;
        }, {} as Record<string, typeof sessions>);

        // Calculate progress for each program
        Object.entries(sessionsByProgram).forEach(([programKey, programSessions]) => {
          const completedWorkouts = programSessions.length;
          const lastSession = programSessions.sort((a, b) => 
            new Date(b.completed_at).getTime() - new Date(a.completed_at).getTime()
          )[0];

          // Assume 24 total workouts if we don't have the exact number
          const totalWorkouts = 24; // This could be enhanced to get actual program data
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
          duration_minutes: 30, // Default duration
          calories_burned: 200, // Default calories
          difficulty: 'beginner'
        });

      if (!error) {
        await fetchUserProgress(); // Refresh progress
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
