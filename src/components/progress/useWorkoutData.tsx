
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/auth/AuthProvider';

interface WorkoutSession {
  id: string;
  program_name: string;
  exercises: string[];
  duration_minutes: number;
  calories_burned: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  completed_at: string;
}

interface UserStats {
  total_workouts: number;
  total_minutes: number;
  total_calories: number;
  current_streak: number;
}

export const useWorkoutData = () => {
  const [workoutHistory, setWorkoutHistory] = useState<WorkoutSession[]>([]);
  const [userStats, setUserStats] = useState<UserStats>({
    total_workouts: 0,
    total_minutes: 0,
    total_calories: 0,
    current_streak: 0
  });
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchWorkoutData();
    }
  }, [user]);

  const fetchWorkoutData = async () => {
    if (!user) return;

    // Fetch workout sessions
    const { data: sessions } = await supabase
      .from('workout_sessions')
      .select('*')
      .eq('user_id', user.id)
      .order('completed_at', { ascending: false })
      .limit(10);

    // Fetch user stats
    const { data: stats } = await supabase
      .from('user_stats')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (sessions) {
      // Type assertion to ensure difficulty is properly typed
      const typedSessions = sessions.map(session => ({
        ...session,
        difficulty: session.difficulty as 'beginner' | 'intermediate' | 'advanced'
      }));
      setWorkoutHistory(typedSessions);
    }
    if (stats) setUserStats(stats);
    
    setLoading(false);
  };

  const addWorkoutSession = async (session: {
    exercises: string[];
    duration: number;
    calories: number;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    programName?: string;
  }) => {
    if (!user) return;

    const { error } = await supabase
      .from('workout_sessions')
      .insert({
        user_id: user.id,
        program_name: session.programName || 'Quick Workout',
        exercises: session.exercises,
        duration_minutes: session.duration,
        calories_burned: session.calories,
        difficulty: session.difficulty
      });

    if (error) {
      console.error('Error saving workout session:', error);
    }
  };

  return {
    workoutHistory,
    userStats,
    loading,
    addWorkoutSession
  };
};
