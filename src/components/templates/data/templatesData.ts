
import { WorkoutTemplate } from '../types';

export const templates: WorkoutTemplate[] = [
  {
    id: '1',
    name: 'HIIT Fat Burner',
    description: 'High-intensity interval training designed to maximize calorie burn and boost metabolism',
    duration: 30,
    difficulty: 'intermediate',
    category: 'HIIT',
    exercises: 8,
    calories: 350,
    rating: 4.8,
    popularity: 95,
    equipment: ['None'],
    focus: ['Fat Loss', 'Cardio', 'Full Body']
  },
  {
    id: '2',
    name: 'Upper Body Strength',
    description: 'Build lean muscle mass in your chest, shoulders, back, and arms',
    duration: 45,
    difficulty: 'intermediate',
    category: 'Strength',
    exercises: 6,
    calories: 280,
    rating: 4.6,
    popularity: 88,
    equipment: ['Dumbbells', 'Resistance Bands'],
    focus: ['Muscle Building', 'Upper Body']
  },
  {
    id: '3',
    name: 'Beginner Full Body',
    description: 'Perfect introduction to fitness with basic movements and proper form guidance',
    duration: 25,
    difficulty: 'beginner',
    category: 'Full Body',
    exercises: 5,
    calories: 180,
    rating: 4.9,
    popularity: 92,
    equipment: ['None'],
    focus: ['Beginner Friendly', 'Full Body', 'Form']
  },
  {
    id: '4',
    name: 'Core & Abs Blast',
    description: 'Targeted core workout to strengthen and tone your midsection',
    duration: 20,
    difficulty: 'intermediate',
    category: 'Core',
    exercises: 7,
    calories: 150,
    rating: 4.7,
    popularity: 85,
    equipment: ['Mat'],
    focus: ['Core', 'Abs', 'Stability']
  },
  {
    id: '5',
    name: 'Advanced Athlete Training',
    description: 'Elite-level workout combining strength, power, and endurance',
    duration: 60,
    difficulty: 'advanced',
    category: 'Athletic',
    exercises: 10,
    calories: 450,
    rating: 4.5,
    popularity: 78,
    equipment: ['Barbell', 'Kettlebell', 'Pull-up Bar'],
    focus: ['Athletic Performance', 'Power', 'Endurance']
  },
  {
    id: '6',
    name: 'Yoga Flow & Flexibility',
    description: 'Gentle yoga sequence to improve flexibility and reduce stress',
    duration: 35,
    difficulty: 'beginner',
    category: 'Yoga',
    exercises: 12,
    calories: 120,
    rating: 4.8,
    popularity: 90,
    equipment: ['Mat'],
    focus: ['Flexibility', 'Mobility', 'Relaxation']
  }
];

export const categories = ['all', 'HIIT', 'Strength', 'Full Body', 'Core', 'Athletic', 'Yoga'];
export const difficulties = ['all', 'beginner', 'intermediate', 'advanced'];
