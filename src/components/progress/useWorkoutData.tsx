
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

    const { data: sessions } = await supabase
      .from('workout_sessions')
      .select('*')
      .eq('user_id', user.id)
      .order('completed_at', { ascending: false })
      .limit(10);

    const { data: stats } = await supabase
      .from('user_stats')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (sessions) {
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
      return;
    }

    // Get updated stats for milestone checking
    const newStats = await fetchUpdatedStats();
    if (newStats) {
      // Award milestone badges with RPG integration
      if (newStats.total_workouts === 1) {
        awardBadge('first_workout', 'First Steps', 'Completed your first workout!', 'common');
        awardXP('workout_complete', 1.5); // Bonus XP for first workout
      } else if (newStats.total_workouts === 5) {
        awardBadge('habit_former', 'Habit Former', 'Completed 5 workouts!', 'common');
      } else if (newStats.total_workouts === 10) {
        awardBadge('workout_warrior', 'Workout Warrior', 'Completed 10 workouts!', 'uncommon');
        awardXP('streak_milestone'); // Bonus XP for milestone
      } else if (newStats.total_workouts === 25) {
        awardBadge('dedicated_athlete', 'Dedicated Athlete', 'Completed 25 workouts!', 'rare');
        awardXP('streak_milestone', 1.5);
      } else if (newStats.total_workouts === 50) {
        awardBadge('fitness_enthusiast', 'Fitness Enthusiast', 'Completed 50 workouts!', 'rare');
        awardXP('streak_milestone', 2.0);
      } else if (newStats.total_workouts === 100) {
        awardBadge('century_club', 'Century Club', 'Completed 100 workouts!', 'epic');
        awardXP('streak_milestone', 3.0);
      }

      // Streak milestone badges
      if (newStats.current_streak === 3) {
        awardBadge('streak_starter', 'Streak Starter', '3-day workout streak!', 'common');
      } else if (newStats.current_streak === 7) {
        awardBadge('week_streak', 'Week Warrior', '7-day workout streak!', 'uncommon');
        awardXP('streak_milestone');
      } else if (newStats.current_streak === 14) {
        awardBadge('two_week_streak', 'Consistency Champion', '14-day workout streak!', 'rare');
        awardXP('streak_milestone', 1.5);
      } else if (newStats.current_streak === 30) {
        awardBadge('month_streak', 'Monthly Master', '30-day workout streak!', 'epic');
        awardXP('streak_milestone', 2.5);
      }

      // Calorie milestone badges
      if (newStats.total_calories >= 1000 && (newStats.total_calories - session.calories) < 1000) {
        awardBadge('calorie_killer', 'Calorie Killer', 'Burned 1000+ total calories!', 'uncommon');
      } else if (newStats.total_calories >= 5000 && (newStats.total_calories - session.calories) < 5000) {
        awardBadge('calorie_crusher', 'Calorie Crusher', 'Burned 5000+ total calories!', 'rare');
      } else if (newStats.total_calories >= 10000 && (newStats.total_calories - session.calories) < 10000) {
        awardBadge('calorie_destroyer', 'Calorie Destroyer', 'Burned 10,000+ total calories!', 'epic');
      }

      // Duration milestone badges
      if (newStats.total_minutes >= 300 && (newStats.total_minutes - session.duration) < 300) {
        awardBadge('time_warrior', 'Time Warrior', '5+ hours of total workout time!', 'uncommon');
      } else if (newStats.total_minutes >= 1200 && (newStats.total_minutes - session.duration) < 1200) {
        awardBadge('endurance_master', 'Endurance Master', '20+ hours of total workout time!', 'epic');
      }
    }

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
