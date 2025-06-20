
export interface MuscleGroup {
  primary: string[];
  secondary: string[];
}

export interface FormGuidance {
  keyPoints: string[];
  commonMistakes: string[];
  breathingPattern: string;
  setupTips: string[];
}

export interface ExerciseVariation {
  name: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  description: string;
  modifications: string[];
}

export interface EnhancedExercise {
  id: string;
  name: string;
  category: 'push' | 'pull' | 'legs' | 'core' | 'skills' | 'cardio';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  muscleGroups: MuscleGroup;
  equipment: string[];
  primaryEquipment: string;
  instructions: string[];
  formGuidance: FormGuidance;
  variations: ExerciseVariation[];
  sets: number;
  reps: string;
  restTime: string;
  calories: number;
  duration?: string;
  image: string;
  videoUrl?: string;
  muscleMapImage?: string;
  tags: string[];
}

export const enhancedExerciseDatabase: EnhancedExercise[] = [
  {
    id: "push-ups",
    name: "Push-ups",
    category: "push",
    difficulty: "beginner",
    muscleGroups: {
      primary: ["Chest", "Triceps"],
      secondary: ["Shoulders", "Core"]
    },
    equipment: ["None"],
    primaryEquipment: "Bodyweight",
    instructions: [
      "Start in a plank position with hands slightly wider than shoulder-width apart",
      "Keep your body in a straight line from head to heels",
      "Lower your chest until it nearly touches the ground",
      "Push back up to the starting position",
      "Keep your core engaged throughout the movement"
    ],
    formGuidance: {
      keyPoints: [
        "Maintain neutral spine throughout the movement",
        "Keep elbows at 45-degree angle to body",
        "Full range of motion - chest to floor",
        "Controlled tempo on both up and down phases"
      ],
      commonMistakes: [
        "Letting hips sag or pike up",
        "Not going through full range of motion",
        "Placing hands too wide or too narrow",
        "Rushing through the movement"
      ],
      breathingPattern: "Inhale on the descent, exhale on the push up",
      setupTips: [
        "Start with feet together for stability",
        "Engage core before beginning movement",
        "Look slightly ahead, not straight down"
      ]
    },
    variations: [
      {
        name: "Knee Push-ups",
        difficulty: "beginner",
        description: "Performed on knees to reduce load",
        modifications: ["Drop to knees", "Maintain straight line from knees to head"]
      },
      {
        name: "Incline Push-ups",
        difficulty: "beginner",
        description: "Hands elevated on bench or step",
        modifications: ["Use bench, step, or wall", "Higher elevation = easier"]
      },
      {
        name: "Diamond Push-ups",
        difficulty: "intermediate",
        description: "Hands form diamond shape for tricep focus",
        modifications: ["Form diamond with thumbs and index fingers", "More tricep activation"]
      },
      {
        name: "Archer Push-ups",
        difficulty: "advanced",
        description: "Shift weight to one side during push-up",
        modifications: ["Extend one arm, shift weight to other", "Builds unilateral strength"]
      }
    ],
    sets: 3,
    reps: "8-15",
    restTime: "60s",
    calories: 8,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    muscleMapImage: "https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    tags: ["bodyweight", "upper-body", "strength", "home-workout"]
  },
  {
    id: "squats",
    name: "Bodyweight Squats",
    category: "legs",
    difficulty: "beginner",
    muscleGroups: {
      primary: ["Quadriceps", "Glutes"],
      secondary: ["Hamstrings", "Calves", "Core"]
    },
    equipment: ["None"],
    primaryEquipment: "Bodyweight",
    instructions: [
      "Stand with feet shoulder-width apart, toes slightly turned out",
      "Lower your body by bending at hips and knees",
      "Keep your chest up and weight on your heels",
      "Lower until thighs are parallel to the ground",
      "Push through your heels to return to starting position"
    ],
    formGuidance: {
      keyPoints: [
        "Keep knees in line with toes",
        "Maintain chest up and proud posture",
        "Weight distributed on heels and mid-foot",
        "Hip hinge movement pattern"
      ],
      commonMistakes: [
        "Knees caving inward (valgus collapse)",
        "Not reaching parallel depth",
        "Forward lean with chest",
        "Rising up on toes"
      ],
      breathingPattern: "Inhale on the way down, exhale on the way up",
      setupTips: [
        "Point toes slightly outward",
        "Engage core before descending",
        "Imagine sitting back into a chair"
      ]
    },
    variations: [
      {
        name: "Chair-assisted Squats",
        difficulty: "beginner",
        description: "Use chair for balance and depth guide",
        modifications: ["Light touch on chair back", "Sit back to chair for depth"]
      },
      {
        name: "Goblet Squats",
        difficulty: "intermediate",
        description: "Hold weight at chest level",
        modifications: ["Use dumbbell or kettlebell", "Weight helps with balance"]
      },
      {
        name: "Jump Squats",
        difficulty: "intermediate",
        description: "Explosive squat with jump",
        modifications: ["Land softly", "Focus on power and control"]
      },
      {
        name: "Pistol Squats",
        difficulty: "advanced",
        description: "Single-leg squat",
        modifications: ["One leg extended forward", "Requires significant strength and mobility"]
      }
    ],
    sets: 3,
    reps: "15-20",
    restTime: "45s",
    calories: 6,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    muscleMapImage: "https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    tags: ["bodyweight", "lower-body", "functional", "strength"]
  },
  {
    id: "pull-ups",
    name: "Pull-ups",
    category: "pull",
    difficulty: "intermediate",
    muscleGroups: {
      primary: ["Latissimus Dorsi", "Rhomboids"],
      secondary: ["Biceps", "Rear Delts", "Core"]
    },
    equipment: ["Pull-up Bar"],
    primaryEquipment: "Pull-up Bar",
    instructions: [
      "Hang from a pull-up bar with hands shoulder-width apart, palms facing away",
      "Start from a dead hang with arms fully extended",
      "Pull yourself up until your chin clears the bar",
      "Lower yourself back to the starting position with control",
      "Keep your core tight and avoid swinging"
    ],
    formGuidance: {
      keyPoints: [
        "Full range of motion - dead hang to chin over bar",
        "Shoulders down and back",
        "Engage lats and rhomboids, not just arms",
        "Controlled eccentric (lowering) phase"
      ],
      commonMistakes: [
        "Using momentum or kipping",
        "Not achieving full range of motion",
        "Shoulders rolling forward",
        "Rushing the movement"
      ],
      breathingPattern: "Exhale on pull up, inhale on lowering",
      setupTips: [
        "Grip slightly wider than shoulders",
        "Activate lats before pulling",
        "Think about pulling elbows to hips"
      ]
    },
    variations: [
      {
        name: "Assisted Pull-ups",
        difficulty: "beginner",
        description: "Use resistance band or machine assistance",
        modifications: ["Band around knees or feet", "Reduces bodyweight load"]
      },
      {
        name: "Negative Pull-ups",
        difficulty: "beginner",
        description: "Focus on the lowering phase",
        modifications: ["Jump or step up to top position", "Slow 3-5 second descent"]
      },
      {
        name: "Chin-ups",
        difficulty: "intermediate",
        description: "Underhand grip variation",
        modifications: ["Palms facing toward you", "More bicep involvement"]
      },
      {
        name: "Weighted Pull-ups",
        difficulty: "advanced",
        description: "Add external weight",
        modifications: ["Weight belt or vest", "Increases resistance"]
      }
    ],
    sets: 3,
    reps: "5-12",
    restTime: "90s",
    calories: 12,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    muscleMapImage: "https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    tags: ["upper-body", "pulling", "strength", "compound"]
  },
  {
    id: "deadlifts",
    name: "Romanian Deadlifts",
    category: "pull",
    difficulty: "intermediate",
    muscleGroups: {
      primary: ["Hamstrings", "Glutes"],
      secondary: ["Lower Back", "Core", "Traps"]
    },
    equipment: ["Dumbbells", "Barbell"],
    primaryEquipment: "Dumbbells",
    instructions: [
      "Stand with feet hip-width apart, holding weights in front of thighs",
      "Keep slight bend in knees throughout movement",
      "Hinge at hips, pushing them back while lowering weights",
      "Keep chest up and weights close to legs",
      "Return to standing by driving hips forward"
    ],
    formGuidance: {
      keyPoints: [
        "Hip hinge movement, not squat",
        "Maintain neutral spine throughout",
        "Feel stretch in hamstrings at bottom",
        "Drive hips forward to return to standing"
      ],
      commonMistakes: [
        "Rounding the back",
        "Turning it into a squat",
        "Not feeling hamstring stretch",
        "Letting weights drift away from legs"
      ],
      breathingPattern: "Inhale at top, exhale while returning to standing",
      setupTips: [
        "Start with light weight to master pattern",
        "Keep shoulders back and down",
        "Imagine trying to touch wall behind you with hips"
      ]
    },
    variations: [
      {
        name: "Single-leg RDL",
        difficulty: "intermediate",
        description: "Performed on one leg for balance challenge",
        modifications: ["Extend free leg behind", "Focus on balance and control"]
      },
      {
        name: "Stiff-leg Deadlift",
        difficulty: "intermediate",
        description: "Less knee bend for more hamstring focus",
        modifications: ["Keep legs straighter", "Greater hamstring stretch"]
      },
      {
        name: "Sumo RDL",
        difficulty: "intermediate",
        description: "Wide stance variation",
        modifications: ["Feet wider than shoulder-width", "Toes turned out"]
      }
    ],
    sets: 3,
    reps: "8-12",
    restTime: "90s",
    calories: 10,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    muscleMapImage: "https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    tags: ["lower-body", "hip-hinge", "strength", "posterior-chain"]
  }
];

export const getExercisesByEquipment = (equipment: string) => {
  return enhancedExerciseDatabase.filter(exercise => 
    exercise.primaryEquipment.toLowerCase() === equipment.toLowerCase() ||
    exercise.equipment.some(eq => eq.toLowerCase() === equipment.toLowerCase())
  );
};

export const getExercisesByMuscleGroup = (muscleGroup: string) => {
  return enhancedExerciseDatabase.filter(exercise => 
    exercise.muscleGroups.primary.some(muscle => 
      muscle.toLowerCase().includes(muscleGroup.toLowerCase())
    ) ||
    exercise.muscleGroups.secondary.some(muscle => 
      muscle.toLowerCase().includes(muscleGroup.toLowerCase())
    )
  );
};

export const getExercisesByTags = (tags: string[]) => {
  return enhancedExerciseDatabase.filter(exercise =>
    tags.some(tag => exercise.tags.includes(tag.toLowerCase()))
  );
};

export const getEnhancedExerciseById = (id: string) => {
  return enhancedExerciseDatabase.find(exercise => exercise.id === id);
};
