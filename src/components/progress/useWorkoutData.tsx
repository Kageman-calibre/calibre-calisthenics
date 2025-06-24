
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/auth/AuthProvider';
import { useRPGSystem } from '@/hooks/useRPGSystem';

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
  const { awardXP, awardBadge } = useRPGSystem();

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

    // Add workout session to database
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
      return;
    }

    // Award XP automatically via trigger, but also award badges for milestones
    const newStats = await fetchUpdatedStats();
    if (newStats) {
      // Check for milestone badges
      if (newStats.total_workouts === 1) {
        awardBadge('first_workout', 'First Steps', 'Completed your first workout!', 'common');
      } else if (newStats.total_workouts === 10) {
        awardBadge('workout_warrior', 'Workout Warrior', 'Completed 10 workouts!', 'uncommon');
      } else if (newStats.total_workouts === 50) {
        awardBadge('fitness_enthusiast', 'Fitness Enthusiast', 'Completed 50 workouts!', 'rare');
      } else if (newStats.total_workouts === 100) {
        awardBadge('century_club', 'Century Club', 'Completed 100 workouts!', 'epic');
      }

      // Check for streak badges
      if (newStats.current_streak === 7) {
        awardBadge('week_streak', 'Week Warrior', '7-day workout streak!', 'uncommon');
      } else if (newStats.current_streak === 30) {
        awardBadge('month_streak', 'Monthly Master', '30-day workout streak!', 'epic');
      }
    }

    // Refresh data
    fetchWorkoutData();
  };

  const fetchUpdatedStats = async () => {
    if (!user) return null;

    const { data: stats } = await supabase
      .from('user_stats')
      .select('*')
      .eq('user_id', user.id)
      .single();

    return stats;
  };

  return {
    workoutHistory,
    userStats,
    loading,
    addWorkoutSession
  };
};
