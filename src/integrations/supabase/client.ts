// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://ajwkfctcaaxxktyjispy.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFqd2tmY3RjYWF4eGt0eWppc3B5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAwMjM1MTUsImV4cCI6MjA2NTU5OTUxNX0._7tf1yjURc4ToA-SiaDOmwjGfQEdWKZ6rtBCHeute8c";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);