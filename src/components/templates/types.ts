
export interface WorkoutTemplate {
  id: string;
  name: string;
  description: string;
  duration: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  exercises: number;
  calories: number;
  rating: number;
  popularity: number;
  equipment?: string[];
  focus: string[];
}
