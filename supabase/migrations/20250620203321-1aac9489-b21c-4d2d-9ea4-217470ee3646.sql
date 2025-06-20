
-- Create exercise_performance table for tracking progressive overload
CREATE TABLE public.exercise_performance (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  exercise_id TEXT NOT NULL,
  exercise_name TEXT NOT NULL,
  workout_session_id UUID REFERENCES workout_sessions(id),
  sets_completed INTEGER NOT NULL,
  reps_completed INTEGER[],
  weights_used DECIMAL[],
  rest_times INTEGER[], -- in seconds
  difficulty_rating INTEGER CHECK (difficulty_rating >= 1 AND difficulty_rating <= 10),
  form_rating INTEGER CHECK (form_rating >= 1 AND form_rating <= 10),
  notes TEXT,
  performed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create training_cycles table for periodization
CREATE TABLE public.training_cycles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  program_id UUID REFERENCES workout_programs(id),
  cycle_type TEXT NOT NULL, -- mesocycle, microcycle
  phase TEXT NOT NULL, -- accumulation, intensification, realization, deload
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  volume_multiplier DECIMAL NOT NULL DEFAULT 1.0,
  intensity_multiplier DECIMAL NOT NULL DEFAULT 1.0,
  is_deload BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create recovery_metrics table for smart rest recommendations
CREATE TABLE public.recovery_metrics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  sleep_hours DECIMAL,
  sleep_quality INTEGER CHECK (sleep_quality >= 1 AND sleep_quality <= 10),
  stress_level INTEGER CHECK (stress_level >= 1 AND stress_level <= 10),
  energy_level INTEGER CHECK (energy_level >= 1 AND energy_level <= 10),
  muscle_soreness INTEGER CHECK (muscle_soreness >= 1 AND muscle_soreness <= 10),
  heart_rate_variability DECIMAL,
  resting_heart_rate INTEGER,
  workout_readiness INTEGER CHECK (workout_readiness >= 1 AND workout_readiness <= 10),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, date)
);

-- Add missing columns to existing workout_programs table
ALTER TABLE public.workout_programs 
ADD COLUMN IF NOT EXISTS duration_weeks INTEGER NOT NULL DEFAULT 8,
ADD COLUMN IF NOT EXISTS current_week INTEGER NOT NULL DEFAULT 1,
ADD COLUMN IF NOT EXISTS focus_type TEXT NOT NULL DEFAULT 'strength',
ADD COLUMN IF NOT EXISTS is_active BOOLEAN NOT NULL DEFAULT false;

-- Add RLS policies for exercise_performance
ALTER TABLE public.exercise_performance ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own exercise performance" 
  ON public.exercise_performance 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own exercise performance" 
  ON public.exercise_performance 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own exercise performance" 
  ON public.exercise_performance 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own exercise performance" 
  ON public.exercise_performance 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Add RLS policies for training_cycles
ALTER TABLE public.training_cycles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own training cycles" 
  ON public.training_cycles 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own training cycles" 
  ON public.training_cycles 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own training cycles" 
  ON public.training_cycles 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own training cycles" 
  ON public.training_cycles 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Add RLS policies for recovery_metrics
ALTER TABLE public.recovery_metrics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own recovery metrics" 
  ON public.recovery_metrics 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own recovery metrics" 
  ON public.recovery_metrics 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own recovery metrics" 
  ON public.recovery_metrics 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own recovery metrics" 
  ON public.recovery_metrics 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Create function to automatically suggest progressive overload
CREATE OR REPLACE FUNCTION suggest_progressive_overload(
  p_user_id UUID,
  p_exercise_id TEXT,
  p_target_reps INTEGER DEFAULT 8
)
RETURNS TABLE (
  suggested_weight DECIMAL,
  suggested_reps INTEGER,
  progression_type TEXT
) AS $$
DECLARE
  last_performance RECORD;
  avg_performance RECORD;
BEGIN
  -- Get the most recent performance for this exercise
  SELECT ep.weights_used, ep.reps_completed, ep.difficulty_rating
  INTO last_performance
  FROM exercise_performance ep
  WHERE ep.user_id = p_user_id 
    AND ep.exercise_id = p_exercise_id
  ORDER BY ep.performed_at DESC
  LIMIT 1;

  -- Get average performance over last 4 sessions
  SELECT 
    AVG(COALESCE((ep.weights_used)[1], 0)) as avg_weight,
    AVG(COALESCE((ep.reps_completed)[1], 0)) as avg_reps,
    AVG(ep.difficulty_rating) as avg_difficulty
  INTO avg_performance
  FROM exercise_performance ep
  WHERE ep.user_id = p_user_id 
    AND ep.exercise_id = p_exercise_id
    AND ep.performed_at >= NOW() - INTERVAL '2 weeks'
  LIMIT 4;

  -- Logic for progression suggestions
  IF last_performance IS NULL THEN
    -- First time doing this exercise
    RETURN QUERY SELECT 
      0.0::DECIMAL as suggested_weight,
      p_target_reps as suggested_reps,
      'start_light'::TEXT as progression_type;
  ELSIF last_performance.difficulty_rating <= 6 THEN
    -- Exercise was too easy, increase weight
    RETURN QUERY SELECT 
      COALESCE((last_performance.weights_used)[1], 0) * 1.05 as suggested_weight,
      p_target_reps as suggested_reps,
      'increase_weight'::TEXT as progression_type;
  ELSIF last_performance.difficulty_rating >= 9 THEN
    -- Exercise was too hard, decrease weight or increase reps
    RETURN QUERY SELECT 
      COALESCE((last_performance.weights_used)[1], 0) * 0.95 as suggested_weight,
      GREATEST(p_target_reps - 2, 5) as suggested_reps,
      'decrease_intensity'::TEXT as progression_type;
  ELSE
    -- Maintain current progression
    RETURN QUERY SELECT 
      COALESCE((last_performance.weights_used)[1], 0) as suggested_weight,
      p_target_reps as suggested_reps,
      'maintain'::TEXT as progression_type;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to calculate recovery score
CREATE OR REPLACE FUNCTION calculate_recovery_score(p_user_id UUID, p_date DATE DEFAULT CURRENT_DATE)
RETURNS INTEGER AS $$
DECLARE
  recovery_score INTEGER;
  recent_metrics RECORD;
BEGIN
  -- Get recent recovery metrics
  SELECT 
    COALESCE(sleep_quality, 5) as sleep_quality,
    COALESCE(10 - stress_level, 5) as stress_score, -- invert stress (lower stress = better)
    COALESCE(energy_level, 5) as energy_level,
    COALESCE(10 - muscle_soreness, 5) as soreness_score, -- invert soreness
    COALESCE(workout_readiness, 5) as workout_readiness
  INTO recent_metrics
  FROM recovery_metrics
  WHERE user_id = p_user_id 
    AND date = p_date;

  -- Calculate weighted recovery score (1-10 scale)
  IF recent_metrics IS NULL THEN
    recovery_score := 7; -- Default moderate recovery if no data
  ELSE
    recovery_score := ROUND((
      recent_metrics.sleep_quality * 0.25 +
      recent_metrics.stress_score * 0.20 +
      recent_metrics.energy_level * 0.20 +
      recent_metrics.soreness_score * 0.20 +
      recent_metrics.workout_readiness * 0.15
    ));
  END IF;

  RETURN GREATEST(1, LEAST(10, recovery_score));
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
