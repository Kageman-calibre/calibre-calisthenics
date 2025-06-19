
-- Create workout_programs table for custom workout routines
CREATE TABLE public.workout_programs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  difficulty TEXT CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')) DEFAULT 'intermediate',
  duration_minutes INTEGER,
  exercises JSONB NOT NULL DEFAULT '[]',
  is_public BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create workout_sessions table for tracking completed workouts
CREATE TABLE public.workout_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  program_id UUID REFERENCES public.workout_programs,
  program_name TEXT NOT NULL,
  exercises TEXT[] NOT NULL,
  duration_minutes INTEGER NOT NULL,
  calories_burned INTEGER DEFAULT 0,
  difficulty TEXT CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')) DEFAULT 'intermediate',
  completed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user_stats table for tracking progress
CREATE TABLE public.user_stats (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users UNIQUE NOT NULL,
  total_workouts INTEGER DEFAULT 0,
  total_minutes INTEGER DEFAULT 0,
  total_calories INTEGER DEFAULT 0,
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  last_workout_date DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Update profiles table to include more user info
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS full_name TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS age INTEGER;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS fitness_level TEXT CHECK (fitness_level IN ('beginner', 'intermediate', 'advanced')) DEFAULT 'beginner';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS goals TEXT[] DEFAULT '{}';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT now();

-- Enable RLS on all tables
ALTER TABLE public.workout_programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workout_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;

-- RLS policies for workout_programs
CREATE POLICY "Users can view their own programs and public ones" 
  ON public.workout_programs 
  FOR SELECT 
  USING (auth.uid() = user_id OR is_public = true);

CREATE POLICY "Users can create their own programs" 
  ON public.workout_programs 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own programs" 
  ON public.workout_programs 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own programs" 
  ON public.workout_programs 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- RLS policies for workout_sessions
CREATE POLICY "Users can view their own sessions" 
  ON public.workout_sessions 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own sessions" 
  ON public.workout_sessions 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own sessions" 
  ON public.workout_sessions 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- RLS policies for user_stats
CREATE POLICY "Users can view their own stats" 
  ON public.user_stats 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own stats" 
  ON public.user_stats 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own stats" 
  ON public.user_stats 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- RLS policies for profiles
CREATE POLICY "Users can view their own profile" 
  ON public.profiles 
  FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
  ON public.profiles 
  FOR UPDATE 
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" 
  ON public.profiles 
  FOR INSERT 
  WITH CHECK (auth.uid() = id);

-- RLS policies for achievements
CREATE POLICY "Users can view their own achievements" 
  ON public.achievements 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own achievements" 
  ON public.achievements 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Function to update user stats after workout completion
CREATE OR REPLACE FUNCTION public.update_user_stats_after_workout()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.user_stats (user_id, total_workouts, total_minutes, total_calories, last_workout_date)
  VALUES (NEW.user_id, 1, NEW.duration_minutes, NEW.calories_burned, CURRENT_DATE)
  ON CONFLICT (user_id) DO UPDATE SET
    total_workouts = user_stats.total_workouts + 1,
    total_minutes = user_stats.total_minutes + NEW.duration_minutes,
    total_calories = user_stats.total_calories + NEW.calories_burned,
    last_workout_date = CURRENT_DATE,
    updated_at = now();
  
  RETURN NEW;
END;
$$;

-- Trigger to update stats when a workout session is completed
CREATE TRIGGER update_stats_after_workout
  AFTER INSERT ON public.workout_sessions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_user_stats_after_workout();
