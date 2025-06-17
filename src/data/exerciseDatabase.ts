
export interface Exercise {
  id: string;
  name: string;
  category: 'push' | 'pull' | 'legs' | 'core' | 'skills' | 'cardio';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  muscleGroups: string[];
  equipment: string[];
  instructions: string[];
  tips: string[];
  commonMistakes: string[];
  progressions: string[];
  regressions: string[];
  sets: number;
  reps: string;
  restTime: string;
  calories: number;
  duration?: string;
  image: string;
  videoUrl?: string;
}

export const exerciseDatabase: Exercise[] = [
  {
    id: "push-ups",
    name: "Push-ups",
    category: "push",
    difficulty: "beginner",
    muscleGroups: ["Chest", "Shoulders", "Triceps", "Core"],
    equipment: ["None"],
    instructions: [
      "Start in a plank position with hands slightly wider than shoulder-width apart",
      "Keep your body in a straight line from head to heels",
      "Lower your chest until it nearly touches the ground",
      "Push back up to the starting position",
      "Keep your core engaged throughout the movement"
    ],
    tips: [
      "Focus on controlled movement rather than speed",
      "Breathe in on the way down, out on the way up",
      "Keep your elbows at a 45-degree angle to your body"
    ],
    commonMistakes: [
      "Letting hips sag or pike up",
      "Not going through full range of motion",
      "Placing hands too wide or too narrow"
    ],
    progressions: ["Diamond Push-ups", "Archer Push-ups", "One-arm Push-ups"],
    regressions: ["Incline Push-ups", "Knee Push-ups", "Wall Push-ups"],
    sets: 3,
    reps: "8-15",
    restTime: "60s",
    calories: 8,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
  },
  {
    id: "pull-ups",
    name: "Pull-ups",
    category: "pull",
    difficulty: "intermediate",
    muscleGroups: ["Lats", "Rhomboids", "Biceps", "Rear Delts"],
    equipment: ["Pull-up Bar"],
    instructions: [
      "Hang from a pull-up bar with hands shoulder-width apart, palms facing away",
      "Start from a dead hang with arms fully extended",
      "Pull yourself up until your chin clears the bar",
      "Lower yourself back to the starting position with control",
      "Keep your core tight and avoid swinging"
    ],
    tips: [
      "Focus on pulling with your back muscles, not just arms",
      "Keep shoulders down and back",
      "Use full range of motion for maximum benefit"
    ],
    commonMistakes: [
      "Using momentum or swinging",
      "Not going through full range of motion",
      "Letting shoulders roll forward"
    ],
    progressions: ["Weighted Pull-ups", "One-arm Pull-ups", "Muscle-ups"],
    regressions: ["Assisted Pull-ups", "Negative Pull-ups", "Inverted Rows"],
    sets: 3,
    reps: "5-12",
    restTime: "90s",
    calories: 12,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
  },
  {
    id: "squats",
    name: "Bodyweight Squats",
    category: "legs",
    difficulty: "beginner",
    muscleGroups: ["Quads", "Glutes", "Hamstrings", "Calves"],
    equipment: ["None"],
    instructions: [
      "Stand with feet shoulder-width apart, toes slightly turned out",
      "Lower your body by bending at hips and knees",
      "Keep your chest up and weight on your heels",
      "Lower until thighs are parallel to the ground",
      "Push through your heels to return to starting position"
    ],
    tips: [
      "Keep knees in line with toes",
      "Maintain a neutral spine throughout",
      "Focus on sitting back into the squat"
    ],
    commonMistakes: [
      "Knees caving inward",
      "Not going deep enough",
      "Leaning too far forward"
    ],
    progressions: ["Jump Squats", "Pistol Squats", "Shrimp Squats"],
    regressions: ["Chair-assisted Squats", "Partial Squats", "Wall Squats"],
    sets: 3,
    reps: "15-20",
    restTime: "45s",
    calories: 6,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
  },
  {
    id: "plank",
    name: "Plank",
    category: "core",
    difficulty: "beginner",
    muscleGroups: ["Core", "Shoulders", "Glutes"],
    equipment: ["None"],
    instructions: [
      "Start in a push-up position",
      "Lower down to your forearms",
      "Keep your body in a straight line from head to heels",
      "Hold this position while breathing normally",
      "Keep your core engaged and glutes tight"
    ],
    tips: [
      "Don't hold your breath - breathe normally",
      "Focus on quality over duration",
      "Keep hips level - don't let them sag or pike up"
    ],
    commonMistakes: [
      "Letting hips sag",
      "Holding breath",
      "Looking up instead of down"
    ],
    progressions: ["Single-arm Plank", "Plank to Push-up", "Side Plank"],
    regressions: ["Knee Plank", "Incline Plank", "Wall Plank"],
    sets: 3,
    reps: "30-60s",
    restTime: "30s",
    calories: 4,
    duration: "30-60s",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
  },
  {
    id: "handstand-hold",
    name: "Handstand Hold",
    category: "skills",
    difficulty: "advanced",
    muscleGroups: ["Shoulders", "Core", "Wrists", "Forearms"],
    equipment: ["Wall (optional)"],
    instructions: [
      "Start in a downward dog position near a wall",
      "Walk your feet up the wall while walking hands closer",
      "Find your balance point with minimal wall support",
      "Keep arms straight and shoulders over wrists",
      "Hold the position while breathing normally"
    ],
    tips: [
      "Start with wall-supported holds",
      "Keep fingers spread wide for stability",
      "Look at the ground, not forward"
    ],
    commonMistakes: [
      "Arching back too much",
      "Not keeping shoulders over wrists",
      "Holding breath"
    ],
    progressions: ["Free-standing Handstand", "Handstand Push-ups", "Handstand Walking"],
    regressions: ["Wall Handstand", "Pike Hold", "Crow Pose"],
    sets: 3,
    reps: "15-30s",
    restTime: "120s",
    calories: 8,
    duration: "15-30s",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
  }
];

export const getExercisesByCategory = (category: Exercise['category']) => {
  return exerciseDatabase.filter(exercise => exercise.category === category);
};

export const getExercisesByDifficulty = (difficulty: Exercise['difficulty']) => {
  return exerciseDatabase.filter(exercise => exercise.difficulty === difficulty);
};

export const getExerciseById = (id: string) => {
  return exerciseDatabase.find(exercise => exercise.id === id);
};
