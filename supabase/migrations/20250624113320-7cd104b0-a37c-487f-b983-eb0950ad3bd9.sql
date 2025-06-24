
-- Create skill completions table to track which skills users have completed
CREATE TABLE IF NOT EXISTS public.skill_completions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  skill_id text NOT NULL,
  completed_at timestamp with time zone DEFAULT now(),
  notes text,
  UNIQUE(user_id, skill_id)
);

-- Enable RLS on skill_completions table
ALTER TABLE public.skill_completions ENABLE ROW LEVEL SECURITY;

-- RLS policies for skill_completions
CREATE POLICY "Users can view own skill completions" ON public.skill_completions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own skill completions" ON public.skill_completions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own skill completions" ON public.skill_completions
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own skill completions" ON public.skill_completions
  FOR DELETE USING (auth.uid() = user_id);
