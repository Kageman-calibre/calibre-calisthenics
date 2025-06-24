
-- Add avatar and RPG elements to profiles table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS avatar_url text,
ADD COLUMN IF NOT EXISTS avatar_background text,
ADD COLUMN IF NOT EXISTS avatar_badges text[] DEFAULT '{}';

-- Create user progression table for XP and levels
CREATE TABLE IF NOT EXISTS public.user_progression (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  current_xp integer DEFAULT 0,
  total_xp integer DEFAULT 0,
  level integer DEFAULT 1,
  title text DEFAULT 'Novice',
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  UNIQUE(user_id)
);

-- Create badges/collectibles table
CREATE TABLE IF NOT EXISTS public.user_badges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  badge_id text NOT NULL,
  badge_name text NOT NULL,
  badge_description text,
  rarity text DEFAULT 'common',
  earned_at timestamp with time zone DEFAULT now(),
  UNIQUE(user_id, badge_id)
);

-- Create XP rewards table for different actions
CREATE TABLE IF NOT EXISTS public.xp_rewards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  action_type text NOT NULL,
  base_xp integer NOT NULL,
  description text,
  created_at timestamp with time zone DEFAULT now()
);

-- Insert default XP rewards
INSERT INTO public.xp_rewards (action_type, base_xp, description) VALUES
('workout_complete', 50, 'Complete a workout session'),
('streak_milestone', 100, 'Maintain workout streak'),
('new_exercise', 25, 'Try a new exercise'),
('personal_record', 75, 'Set a new personal record'),
('share_workout', 25, 'Share workout with community'),
('help_member', 40, 'Help another community member'),
('daily_login', 10, 'Daily app login bonus')
ON CONFLICT DO NOTHING;

-- Enable RLS on new tables
ALTER TABLE public.user_progression ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.xp_rewards ENABLE ROW LEVEL SECURITY;

-- RLS policies for user_progression
CREATE POLICY "Users can view own progression" ON public.user_progression
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own progression" ON public.user_progression
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own progression" ON public.user_progression
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS policies for user_badges  
CREATE POLICY "Users can view own badges" ON public.user_badges
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own badges" ON public.user_badges
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS policies for xp_rewards (read-only for all authenticated users)
CREATE POLICY "Authenticated users can view XP rewards" ON public.xp_rewards
  FOR SELECT TO authenticated USING (true);

-- Function to calculate level from XP
CREATE OR REPLACE FUNCTION public.calculate_level_from_xp(xp integer)
RETURNS integer
LANGUAGE plpgsql
IMMUTABLE
AS $$
BEGIN
  -- Level formula: every 500 XP = 1 level, with increasing requirements
  RETURN GREATEST(1, LEAST(100, FLOOR(SQRT(xp / 100)) + 1));
END;
$$;

-- Function to get XP needed for next level
CREATE OR REPLACE FUNCTION public.get_xp_for_next_level(current_level integer)
RETURNS integer
LANGUAGE plpgsql
IMMUTABLE
AS $$
BEGIN
  -- XP needed for next level
  RETURN (current_level * current_level * 100);
END;
$$;

-- Function to award XP and handle level ups
CREATE OR REPLACE FUNCTION public.award_xp(p_user_id uuid, p_action_type text, p_multiplier numeric DEFAULT 1.0)
RETURNS TABLE(xp_gained integer, leveled_up boolean, new_level integer)
LANGUAGE plpgsql
SECURITY DEFINER
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

-- Trigger to award XP when workout is completed
CREATE OR REPLACE FUNCTION public.award_workout_xp()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
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

-- Create trigger for workout XP
DROP TRIGGER IF EXISTS trigger_award_workout_xp ON public.workout_sessions;
CREATE TRIGGER trigger_award_workout_xp
  AFTER INSERT ON public.workout_sessions
  FOR EACH ROW
  EXECUTE FUNCTION public.award_workout_xp();
