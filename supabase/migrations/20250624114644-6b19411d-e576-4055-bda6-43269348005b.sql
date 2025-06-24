
-- Update existing functions to include proper search_path settings

-- Fix the award_xp function
CREATE OR REPLACE FUNCTION public.award_xp(p_user_id uuid, p_action_type text, p_multiplier numeric DEFAULT 1.0)
RETURNS TABLE(xp_gained integer, leveled_up boolean, new_level integer)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
DECLARE
  base_xp integer;
  xp_to_award integer;
  current_progression RECORD;
  new_total_xp integer;
  calculated_level integer;
  did_level_up boolean := false;
BEGIN
  -- Get base XP for action
  SELECT xr.base_xp INTO base_xp
  FROM public.xp_rewards xr
  WHERE xr.action_type = p_action_type;
  
  IF base_xp IS NULL THEN
    base_xp := 10; -- Default XP if action type not found
  END IF;
  
  xp_to_award := ROUND(base_xp * p_multiplier);
  
  -- Get current progression or create if doesn't exist
  SELECT * INTO current_progression
  FROM public.user_progression
  WHERE user_id = p_user_id;
  
  IF current_progression IS NULL THEN
    -- Create new progression record
    INSERT INTO public.user_progression (user_id, current_xp, total_xp, level)
    VALUES (p_user_id, xp_to_award, xp_to_award, public.calculate_level_from_xp(xp_to_award))
    RETURNING * INTO current_progression;
    
    calculated_level := current_progression.level;
    did_level_up := calculated_level > 1;
  ELSE
    -- Update existing progression
    new_total_xp := current_progression.total_xp + xp_to_award;
    calculated_level := public.calculate_level_from_xp(new_total_xp);
    did_level_up := calculated_level > current_progression.level;
    
    UPDATE public.user_progression 
    SET 
      current_xp = current_xp + xp_to_award,
      total_xp = new_total_xp,
      level = calculated_level,
      updated_at = now()
    WHERE user_id = p_user_id;
  END IF;
  
  RETURN QUERY SELECT xp_to_award, did_level_up, calculated_level;
END;
$$;

-- Fix the award_workout_xp function
CREATE OR REPLACE FUNCTION public.award_workout_xp()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
DECLARE
  xp_multiplier numeric := 1.0;
BEGIN
  -- Calculate XP multiplier based on workout difficulty and duration
  IF NEW.difficulty = 'advanced' THEN
    xp_multiplier := 1.5;
  ELSIF NEW.difficulty = 'intermediate' THEN
    xp_multiplier := 1.2;
  END IF;
  
  -- Bonus XP for longer workouts
  IF NEW.duration_minutes > 45 THEN
    xp_multiplier := xp_multiplier + 0.3;
  ELSIF NEW.duration_minutes > 30 THEN
    xp_multiplier := xp_multiplier + 0.2;
  END IF;
  
  -- Award XP for workout completion
  PERFORM public.award_xp(NEW.user_id, 'workout_complete', xp_multiplier);
  
  RETURN NEW;
END;
$$;

-- Fix the update_user_stats_after_workout function
CREATE OR REPLACE FUNCTION public.update_user_stats_after_workout()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
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

-- Fix the calculate_level_from_xp function
CREATE OR REPLACE FUNCTION public.calculate_level_from_xp(xp integer)
RETURNS integer
LANGUAGE plpgsql
IMMUTABLE
SET search_path = 'public'
AS $$
BEGIN
  -- Level formula: every 500 XP = 1 level, with increasing requirements
  RETURN GREATEST(1, LEAST(100, FLOOR(SQRT(xp / 100)) + 1));
END;
$$;

-- Fix the get_xp_for_next_level function
CREATE OR REPLACE FUNCTION public.get_xp_for_next_level(current_level integer)
RETURNS integer
LANGUAGE plpgsql
IMMUTABLE
SET search_path = 'public'
AS $$
BEGIN
  -- XP needed for next level
  RETURN (current_level * current_level * 100);
END;
$$;

-- Fix the suggest_progressive_overload function
CREATE OR REPLACE FUNCTION public.suggest_progressive_overload(p_user_id uuid, p_exercise_id text, p_target_reps integer DEFAULT 8)
RETURNS TABLE(suggested_weight numeric, suggested_reps integer, progression_type text)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
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
$$;

-- Fix the calculate_recovery_score function
CREATE OR REPLACE FUNCTION public.calculate_recovery_score(p_user_id uuid, p_date date DEFAULT CURRENT_DATE)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
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
$$;
