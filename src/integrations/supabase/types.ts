export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      achievements: {
        Row: {
          description: string | null
          earned_at: string | null
          id: string
          name: string
          user_id: string
        }
        Insert: {
          description?: string | null
          earned_at?: string | null
          id?: string
          name: string
          user_id: string
        }
        Update: {
          description?: string | null
          earned_at?: string | null
          id?: string
          name?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "achievements_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      exercise_performance: {
        Row: {
          difficulty_rating: number | null
          exercise_id: string
          exercise_name: string
          form_rating: number | null
          id: string
          notes: string | null
          performed_at: string
          reps_completed: number[] | null
          rest_times: number[] | null
          sets_completed: number
          user_id: string
          weights_used: number[] | null
          workout_session_id: string | null
        }
        Insert: {
          difficulty_rating?: number | null
          exercise_id: string
          exercise_name: string
          form_rating?: number | null
          id?: string
          notes?: string | null
          performed_at?: string
          reps_completed?: number[] | null
          rest_times?: number[] | null
          sets_completed: number
          user_id: string
          weights_used?: number[] | null
          workout_session_id?: string | null
        }
        Update: {
          difficulty_rating?: number | null
          exercise_id?: string
          exercise_name?: string
          form_rating?: number | null
          id?: string
          notes?: string | null
          performed_at?: string
          reps_completed?: number[] | null
          rest_times?: number[] | null
          sets_completed?: number
          user_id?: string
          weights_used?: number[] | null
          workout_session_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "exercise_performance_workout_session_id_fkey"
            columns: ["workout_session_id"]
            isOneToOne: false
            referencedRelation: "workout_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          age: number | null
          avatar_background: string | null
          avatar_badges: string[] | null
          avatar_url: string | null
          created_at: string | null
          fitness_level: string | null
          full_name: string | null
          goals: string[] | null
          id: string
          updated_at: string | null
          username: string | null
        }
        Insert: {
          age?: number | null
          avatar_background?: string | null
          avatar_badges?: string[] | null
          avatar_url?: string | null
          created_at?: string | null
          fitness_level?: string | null
          full_name?: string | null
          goals?: string[] | null
          id: string
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          age?: number | null
          avatar_background?: string | null
          avatar_badges?: string[] | null
          avatar_url?: string | null
          created_at?: string | null
          fitness_level?: string | null
          full_name?: string | null
          goals?: string[] | null
          id?: string
          updated_at?: string | null
          username?: string | null
        }
        Relationships: []
      }
      recovery_metrics: {
        Row: {
          created_at: string
          date: string
          energy_level: number | null
          heart_rate_variability: number | null
          id: string
          muscle_soreness: number | null
          notes: string | null
          resting_heart_rate: number | null
          sleep_hours: number | null
          sleep_quality: number | null
          stress_level: number | null
          user_id: string
          workout_readiness: number | null
        }
        Insert: {
          created_at?: string
          date?: string
          energy_level?: number | null
          heart_rate_variability?: number | null
          id?: string
          muscle_soreness?: number | null
          notes?: string | null
          resting_heart_rate?: number | null
          sleep_hours?: number | null
          sleep_quality?: number | null
          stress_level?: number | null
          user_id: string
          workout_readiness?: number | null
        }
        Update: {
          created_at?: string
          date?: string
          energy_level?: number | null
          heart_rate_variability?: number | null
          id?: string
          muscle_soreness?: number | null
          notes?: string | null
          resting_heart_rate?: number | null
          sleep_hours?: number | null
          sleep_quality?: number | null
          stress_level?: number | null
          user_id?: string
          workout_readiness?: number | null
        }
        Relationships: []
      }
      training_cycles: {
        Row: {
          created_at: string
          cycle_type: string
          end_date: string
          id: string
          intensity_multiplier: number
          is_deload: boolean
          phase: string
          program_id: string | null
          start_date: string
          user_id: string
          volume_multiplier: number
        }
        Insert: {
          created_at?: string
          cycle_type: string
          end_date: string
          id?: string
          intensity_multiplier?: number
          is_deload?: boolean
          phase: string
          program_id?: string | null
          start_date: string
          user_id: string
          volume_multiplier?: number
        }
        Update: {
          created_at?: string
          cycle_type?: string
          end_date?: string
          id?: string
          intensity_multiplier?: number
          is_deload?: boolean
          phase?: string
          program_id?: string | null
          start_date?: string
          user_id?: string
          volume_multiplier?: number
        }
        Relationships: [
          {
            foreignKeyName: "training_cycles_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "workout_programs"
            referencedColumns: ["id"]
          },
        ]
      }
      user_badges: {
        Row: {
          badge_description: string | null
          badge_id: string
          badge_name: string
          earned_at: string | null
          id: string
          rarity: string | null
          user_id: string
        }
        Insert: {
          badge_description?: string | null
          badge_id: string
          badge_name: string
          earned_at?: string | null
          id?: string
          rarity?: string | null
          user_id: string
        }
        Update: {
          badge_description?: string | null
          badge_id?: string
          badge_name?: string
          earned_at?: string | null
          id?: string
          rarity?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_progression: {
        Row: {
          created_at: string | null
          current_xp: number | null
          id: string
          level: number | null
          title: string | null
          total_xp: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          current_xp?: number | null
          id?: string
          level?: number | null
          title?: string | null
          total_xp?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          current_xp?: number | null
          id?: string
          level?: number | null
          title?: string | null
          total_xp?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_stats: {
        Row: {
          created_at: string
          current_streak: number | null
          id: string
          last_workout_date: string | null
          longest_streak: number | null
          total_calories: number | null
          total_minutes: number | null
          total_workouts: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          current_streak?: number | null
          id?: string
          last_workout_date?: string | null
          longest_streak?: number | null
          total_calories?: number | null
          total_minutes?: number | null
          total_workouts?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          current_streak?: number | null
          id?: string
          last_workout_date?: string | null
          longest_streak?: number | null
          total_calories?: number | null
          total_minutes?: number | null
          total_workouts?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      workout_programs: {
        Row: {
          created_at: string
          current_week: number
          description: string | null
          difficulty: string | null
          duration_minutes: number | null
          duration_weeks: number
          exercises: Json
          focus_type: string
          id: string
          is_active: boolean
          is_public: boolean | null
          name: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          current_week?: number
          description?: string | null
          difficulty?: string | null
          duration_minutes?: number | null
          duration_weeks?: number
          exercises?: Json
          focus_type?: string
          id?: string
          is_active?: boolean
          is_public?: boolean | null
          name: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          current_week?: number
          description?: string | null
          difficulty?: string | null
          duration_minutes?: number | null
          duration_weeks?: number
          exercises?: Json
          focus_type?: string
          id?: string
          is_active?: boolean
          is_public?: boolean | null
          name?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      workout_sessions: {
        Row: {
          calories_burned: number | null
          completed_at: string
          difficulty: string | null
          duration_minutes: number
          exercises: string[]
          id: string
          program_id: string | null
          program_name: string
          user_id: string
        }
        Insert: {
          calories_burned?: number | null
          completed_at?: string
          difficulty?: string | null
          duration_minutes: number
          exercises: string[]
          id?: string
          program_id?: string | null
          program_name: string
          user_id: string
        }
        Update: {
          calories_burned?: number | null
          completed_at?: string
          difficulty?: string | null
          duration_minutes?: number
          exercises?: string[]
          id?: string
          program_id?: string | null
          program_name?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workout_sessions_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "workout_programs"
            referencedColumns: ["id"]
          },
        ]
      }
      xp_rewards: {
        Row: {
          action_type: string
          base_xp: number
          created_at: string | null
          description: string | null
          id: string
        }
        Insert: {
          action_type: string
          base_xp: number
          created_at?: string | null
          description?: string | null
          id?: string
        }
        Update: {
          action_type?: string
          base_xp?: number
          created_at?: string | null
          description?: string | null
          id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      award_xp: {
        Args: {
          p_user_id: string
          p_action_type: string
          p_multiplier?: number
        }
        Returns: {
          xp_gained: number
          leveled_up: boolean
          new_level: number
        }[]
      }
      calculate_level_from_xp: {
        Args: { xp: number }
        Returns: number
      }
      calculate_recovery_score: {
        Args: { p_user_id: string; p_date?: string }
        Returns: number
      }
      get_xp_for_next_level: {
        Args: { current_level: number }
        Returns: number
      }
      suggest_progressive_overload: {
        Args: {
          p_user_id: string
          p_exercise_id: string
          p_target_reps?: number
        }
        Returns: {
          suggested_weight: number
          suggested_reps: number
          progression_type: string
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
