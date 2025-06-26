
export interface BeginnerProgram {
  id: string;
  name: string;
  description: string;
  duration: string;
  level: string;
  workoutsPerWeek: number;
  totalWorkouts: number;
  image: string;
  tags: string[];
  color: string;
  focus: string[];
  targetMuscles: string[];
  equipment: string[];
  weeklySchedule: {
    week: number;
    workouts: {
      day: string;
      name: string;
      exercises: string[];
      duration: number;
      restTime: string;
    }[];
  }[];
}

export const beginnerPrograms: BeginnerProgram[] = [
  {
    id: "foundation-builder",
    name: "Foundation Builder",
    description: "Perfect for absolute beginners starting their calisthenics journey. Build basic strength and movement patterns.",
    duration: "8 weeks",
    level: "Beginner",
    workoutsPerWeek: 3,
    totalWorkouts: 24,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    tags: ["Push", "Pull", "Legs", "Core"],
    color: "from-emerald-500 to-green-600",
    focus: ["Basic Movements", "Form", "Strength Building"],
    targetMuscles: ["Full Body", "Core", "Upper Body", "Lower Body"],
    equipment: ["None"],
    weeklySchedule: [
      {
        week: 1,
        workouts: [
          {
            day: "Monday",
            name: "Upper Body Basics",
            exercises: ["Wall Push-ups", "Arm Circles", "Plank Hold", "Standing Row"],
            duration: 20,
            restTime: "45s"
          },
          {
            day: "Wednesday", 
            name: "Lower Body Foundation",
            exercises: ["Bodyweight Squats", "Calf Raises", "Glute Bridges", "Wall Sit"],
            duration: 25,
            restTime: "45s"
          },
          {
            day: "Friday",
            name: "Full Body Flow",
            exercises: ["Modified Burpees", "Mountain Climbers", "Dead Bug", "Bear Crawl"],
            duration: 30,
            restTime: "60s"
          }
        ]
      }
    ]
  },
  {
    id: "mobility-master",
    name: "Mobility Master",
    description: "Focus on flexibility, mobility, and movement quality for beginners who want to improve their range of motion.",
    duration: "6 weeks",
    level: "Beginner",
    workoutsPerWeek: 4,
    totalWorkouts: 24,
    image: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    tags: ["Mobility", "Flexibility", "Recovery"],
    color: "from-blue-500 to-cyan-600",
    focus: ["Flexibility", "Mobility", "Recovery"],
    targetMuscles: ["Hip Flexors", "Shoulders", "Spine", "Hamstrings"],
    equipment: ["None"],
    weeklySchedule: [
      {
        week: 1,
        workouts: [
          {
            day: "Monday",
            name: "Morning Mobility",
            exercises: ["Cat-Cow Stretch", "Hip Circles", "Shoulder Rolls", "Ankle Circles"],
            duration: 15,
            restTime: "30s"
          },
          {
            day: "Tuesday",
            name: "Hip Opener",
            exercises: ["Hip Flexor Stretch", "Pigeon Pose", "Butterfly Stretch", "90/90 Hip Stretch"],
            duration: 20,
            restTime: "30s"
          },
          {
            day: "Thursday",
            name: "Shoulder Freedom",
            exercises: ["Doorway Stretch", "Cross-body Stretch", "Overhead Reach", "Wall Angels"],
            duration: 18,
            restTime: "30s"
          },
          {
            day: "Saturday",
            name: "Full Body Flow",
            exercises: ["Sun Salutation", "Spinal Waves", "Dynamic Stretching", "Deep Breathing"],
            duration: 25,
            restTime: "45s"
          }
        ]
      }
    ]
  },
  {
    id: "core-crusher",
    name: "Core Crusher",
    description: "Build a strong foundation with core-focused exercises perfect for beginners.",
    duration: "4 weeks",
    level: "Beginner",
    workoutsPerWeek: 6,
    totalWorkouts: 24,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    tags: ["Core", "Abs", "Stability"],
    color: "from-orange-500 to-red-600",
    focus: ["Core Strength", "Stability", "Posture"],
    targetMuscles: ["Abs", "Obliques", "Lower Back", "Deep Core"],
    equipment: ["None"],
    weeklySchedule: [
      {
        week: 1,
        workouts: [
          {
            day: "Monday",
            name: "Core Basics",
            exercises: ["Plank", "Dead Bug", "Bird Dog", "Knee-to-Chest"],
            duration: 15,
            restTime: "30s"
          },
          {
            day: "Tuesday",
            name: "Rotation Focus",
            exercises: ["Russian Twists", "Side Plank", "Wood Chops", "Bicycle Crunches"],
            duration: 18,
            restTime: "30s"
          },
          {
            day: "Wednesday",
            name: "Stability Challenge",
            exercises: ["Single-Leg Stand", "Plank Variations", "Glute Bridge", "Wall Sit"],
            duration: 20,
            restTime: "45s"
          },
          {
            day: "Thursday",
            name: "Lower Core",
            exercises: ["Leg Raises", "Reverse Crunches", "Marching", "Hollow Hold"],
            duration: 16,
            restTime: "30s"
          },
          {
            day: "Friday",
            name: "Full Core Flow",
            exercises: ["Plank to Downward Dog", "Mountain Climbers", "Bear Crawl", "Crab Walk"],
            duration: 22,
            restTime: "45s"
          },
          {
            day: "Saturday",
            name: "Core Recovery",
            exercises: ["Gentle Stretching", "Child's Pose", "Cat-Cow", "Deep Breathing"],
            duration: 12,
            restTime: "60s"
          }
        ]
      }
    ]
  },
  {
    id: "push-up-progression",
    name: "Push-up Progression",
    description: "Master the push-up with systematic progression from wall push-ups to full push-ups.",
    duration: "8 weeks",
    level: "Beginner",
    workoutsPerWeek: 3,
    totalWorkouts: 24,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    tags: ["Push", "Upper Body", "Progressive"],
    color: "from-purple-500 to-pink-600",
    focus: ["Push-up Mastery", "Upper Body Strength", "Progressive Overload"],
    targetMuscles: ["Chest", "Shoulders", "Triceps", "Core"],
    equipment: ["None"],
    weeklySchedule: [
      {
        week: 1,
        workouts: [
          {
            day: "Monday",
            name: "Wall Push-ups",
            exercises: ["Wall Push-ups", "Arm Circles", "Shoulder Shrugs", "Plank Hold"],
            duration: 20,
            restTime: "45s"
          },
          {
            day: "Wednesday",
            name: "Incline Push-ups",
            exercises: ["Incline Push-ups", "Pike Push-ups", "Tricep Dips", "Arm Stretches"],
            duration: 25,
            restTime: "60s"
          },
          {
            day: "Friday",
            name: "Form Focus",
            exercises: ["Slow Push-ups", "Push-up Hold", "Negative Push-ups", "Recovery Stretches"],
            duration: 30,
            restTime: "90s"
          }
        ]
      }
    ]
  },
  {
    id: "squat-specialist",
    name: "Squat Specialist",
    description: "Perfect your squat technique and build lower body strength progressively.",
    duration: "6 weeks",
    level: "Beginner",
    workoutsPerWeek: 4,
    totalWorkouts: 24,
    image: "https://images.unsplash.com/photo-1434608519344-49d77a699e1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    tags: ["Legs", "Glutes", "Squats"],
    color: "from-green-500 to-emerald-600",
    focus: ["Squat Technique", "Lower Body Strength", "Mobility"],
    targetMuscles: ["Quads", "Glutes", "Hamstrings", "Calves"],
    equipment: ["None"],
    weeklySchedule: [
      {
        week: 1,
        workouts: [
          {
            day: "Monday",
            name: "Squat Basics",
            exercises: ["Bodyweight Squats", "Squat Holds", "Calf Raises", "Hip Circles"],
            duration: 20,
            restTime: "45s"
          },
          {
            day: "Tuesday",
            name: "Squat Variations",
            exercises: ["Wide Squats", "Narrow Squats", "Pulse Squats", "Squat Pulses"],
            duration: 22,
            restTime: "45s"
          },
          {
            day: "Thursday",
            name: "Single Leg Focus",
            exercises: ["Lunges", "Single-Leg Squats", "Step-ups", "Lateral Lunges"],
            duration: 25,
            restTime: "60s"
          },
          {
            day: "Saturday",
            name: "Mobility & Recovery",
            exercises: ["Hip Flexor Stretches", "Quad Stretches", "Calf Stretches", "Foam Rolling"],
            duration: 18,
            restTime: "30s"
          }
        ]
      }
    ]
  },
  {
    id: "balance-builder",
    name: "Balance Builder",
    description: "Improve balance, coordination, and proprioception for overall stability.",
    duration: "5 weeks",
    level: "Beginner",
    workoutsPerWeek: 5,
    totalWorkouts: 25,
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    tags: ["Balance", "Coordination", "Stability"],
    color: "from-indigo-500 to-purple-600",
    focus: ["Balance", "Coordination", "Proprioception"],
    targetMuscles: ["Core", "Stabilizers", "Ankles", "Hips"],
    equipment: ["None"],
    weeklySchedule: [
      {
        week: 1,
        workouts: [
          {
            day: "Monday",
            name: "Single Leg Basics",
            exercises: ["Single-Leg Stand", "Heel-to-Toe Walk", "Standing Marches", "Ankle Circles"],
            duration: 15,
            restTime: "30s"
          },
          {
            day: "Tuesday",
            name: "Dynamic Balance",
            exercises: ["Single-Leg Reaches", "Leg Swings", "Standing Hip Circles", "Balance Challenges"],
            duration: 18,
            restTime: "45s"
          },
          {
            day: "Wednesday",
            name: "Core Stability",
            exercises: ["Plank Variations", "Dead Bug", "Bird Dog", "Side Plank"],
            duration: 20,
            restTime: "45s"
          },
          {
            day: "Thursday",
            name: "Movement Patterns",
            exercises: ["Lunges", "Step-ups", "Lateral Steps", "Carioca"],
            duration: 22,
            restTime: "60s"
          },
          {
            day: "Friday",
            name: "Balance Flow",
            exercises: ["Tai Chi Movements", "Slow Motion Squats", "Tree Pose", "Walking Meditation"],
            duration: 25,
            restTime: "60s"
          }
        ]
      }
    ]
  },
  {
    id: "cardio-kickstart",
    name: "Cardio Kickstart",
    description: "Low-impact cardiovascular training perfect for beginners building endurance.",
    duration: "6 weeks",
    level: "Beginner",
    workoutsPerWeek: 4,
    totalWorkouts: 24,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    tags: ["Cardio", "Endurance", "Low Impact"],
    color: "from-red-500 to-orange-600",
    focus: ["Cardiovascular Health", "Endurance", "Fat Burning"],
    targetMuscles: ["Heart", "Lungs", "Full Body"],
    equipment: ["None"],
    weeklySchedule: [
      {
        week: 1,
        workouts: [
          {
            day: "Monday",
            name: "Low Impact Cardio",
            exercises: ["Marching in Place", "Arm Circles", "Step Touch", "Gentle Jumping Jacks"],
            duration: 15,
            restTime: "30s"
          },
          {
            day: "Tuesday",
            name: "Dance Cardio",
            exercises: ["Side Steps", "Grapevines", "Knee Lifts", "Arm Swings"],
            duration: 20,
            restTime: "45s"
          },
          {
            day: "Thursday",
            name: "Circuit Training",
            exercises: ["Modified Burpees", "Mountain Climbers", "High Knees", "Butt Kicks"],
            duration: 25,
            restTime: "60s"
          },
          {
            day: "Saturday",
            name: "Active Recovery",
            exercises: ["Walking", "Gentle Stretching", "Deep Breathing", "Tai Chi"],
            duration: 30,
            restTime: "As needed"
          }
        ]
      }
    ]
  },
  {
    id: "posture-perfect",
    name: "Posture Perfect",
    description: "Correct posture imbalances and strengthen postural muscles for better alignment.",
    duration: "8 weeks",
    level: "Beginner",
    workoutsPerWeek: 3,
    totalWorkouts: 24,
    image: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    tags: ["Posture", "Alignment", "Back Health"],
    color: "from-teal-500 to-blue-600",
    focus: ["Posture Correction", "Spinal Health", "Muscle Balance"],
    targetMuscles: ["Upper Back", "Rear Delts", "Deep Neck", "Core"],
    equipment: ["None"],
    weeklySchedule: [
      {
        week: 1,
        workouts: [
          {
            day: "Monday",
            name: "Upper Back Strengthening",
            exercises: ["Wall Angels", "Prone Y-T-W", "Reverse Flyes", "Chin Tucks"],
            duration: 25,
            restTime: "45s"
          },
          {
            day: "Wednesday",
            name: "Core Stability",
            exercises: ["Dead Bug", "Bird Dog", "Plank", "Side Plank"],
            duration: 20,
            restTime: "45s"
          },
          {
            day: "Friday",
            name: "Flexibility Focus",
            exercises: ["Chest Stretches", "Hip Flexor Stretches", "Neck Stretches", "Spinal Twists"],
            duration: 30,
            restTime: "60s"
          }
        ]
      }
    ]
  },
  {
    id: "joint-health",
    name: "Joint Health",
    description: "Gentle exercises to maintain and improve joint mobility and health.",
    duration: "10 weeks",
    level: "Beginner",
    workoutsPerWeek: 3,
    totalWorkouts: 30,
    image: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    tags: ["Joint Health", "Mobility", "Gentle"],
    color: "from-cyan-500 to-teal-600",
    focus: ["Joint Mobility", "Pain Prevention", "Gentle Movement"],
    targetMuscles: ["All Joints", "Surrounding Muscles"],
    equipment: ["None"],
    weeklySchedule: [
      {
        week: 1,
        workouts: [
          {
            day: "Monday",
            name: "Upper Body Joints",
            exercises: ["Shoulder Circles", "Wrist Circles", "Neck Rolls", "Elbow Circles"],
            duration: 20,
            restTime: "30s"
          },
          {
            day: "Wednesday",
            name: "Lower Body Joints",
            exercises: ["Hip Circles", "Knee Circles", "Ankle Circles", "Toe Wiggles"],
            duration: 18,
            restTime: "30s"
          },
          {
            day: "Friday",
            name: "Spinal Mobility",
            exercises: ["Cat-Cow", "Spinal Twists", "Side Bends", "Gentle Backbends"],
            duration: 25,
            restTime: "45s"
          }
        ]
      }
    ]
  },
  {
    id: "morning-energizer",
    name: "Morning Energizer",
    description: "Quick morning routines to start your day with energy and vitality.",
    duration: "4 weeks",
    level: "Beginner",
    workoutsPerWeek: 6,
    totalWorkouts: 24,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    tags: ["Morning", "Energy", "Quick"],
    color: "from-yellow-500 to-orange-600",
    focus: ["Energy Boost", "Morning Routine", "Quick Workouts"],
    targetMuscles: ["Full Body", "Core", "Cardiovascular"],
    equipment: ["None"],
    weeklySchedule: [
      {
        week: 1,
        workouts: [
          {
            day: "Monday",
            name: "Wake Up Flow",
            exercises: ["Gentle Stretching", "Arm Circles", "Marching", "Deep Breathing"],
            duration: 10,
            restTime: "30s"
          },
          {
            day: "Tuesday",
            name: "Energy Boost",
            exercises: ["Jumping Jacks", "High Knees", "Arm Swings", "Toe Touches"],
            duration: 12,
            restTime: "30s"
          },
          {
            day: "Wednesday",
            name: "Mobility Morning",
            exercises: ["Cat-Cow", "Hip Circles", "Shoulder Rolls", "Spinal Twists"],
            duration: 8,
            restTime: "20s"
          },
          {
            day: "Thursday",
            name: "Strength Wake-up",
            exercises: ["Wall Push-ups", "Squats", "Plank", "Calf Raises"],
            duration: 15,
            restTime: "45s"
          },
          {
            day: "Friday",
            name: "Flow Friday",
            exercises: ["Sun Salutation", "Dynamic Stretching", "Balance Poses", "Meditation"],
            duration: 18,
            restTime: "60s"
          },
          {
            day: "Saturday",
            name: "Weekend Warrior",
            exercises: ["Full Body Flow", "Cardio Burst", "Strength Circuit", "Cool Down"],
            duration: 20,
            restTime: "45s"
          }
        ]
      }
    ]
  },
  {
    id: "evening-unwind",
    name: "Evening Unwind",
    description: "Relaxing exercises to wind down and prepare for restful sleep.",
    duration: "6 weeks",
    level: "Beginner",
    workoutsPerWeek: 4,
    totalWorkouts: 24,
    image: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    tags: ["Evening", "Relaxation", "Sleep"],
    color: "from-purple-500 to-indigo-600",
    focus: ["Relaxation", "Sleep Preparation", "Stress Relief"],
    targetMuscles: ["Full Body", "Mind", "Nervous System"],
    equipment: ["None"],
    weeklySchedule: [
      {
        week: 1,
        workouts: [
          {
            day: "Monday",
            name: "Gentle Stretching",
            exercises: ["Child's Pose", "Gentle Twists", "Leg Stretches", "Deep Breathing"],
            duration: 15,
            restTime: "60s"
          },
          {
            day: "Tuesday",
            name: "Tension Release",
            exercises: ["Progressive Muscle Relaxation", "Neck Stretches", "Shoulder Rolls", "Meditation"],
            duration: 20,
            restTime: "As needed"
          },
          {
            day: "Thursday",
            name: "Yoga Flow",
            exercises: ["Gentle Yoga", "Restorative Poses", "Breathing Exercises", "Mindfulness"],
            duration: 25,
            restTime: "60s"
          },
          {
            day: "Saturday",
            name: "Weekend Restore",
            exercises: ["Full Body Stretch", "Foam Rolling", "Meditation", "Gratitude Practice"],
            duration: 30,
            restTime: "As needed"
          }
        ]
      }
    ]
  },
  {
    id: "desk-warrior",
    name: "Desk Warrior",
    description: "Combat the effects of prolonged sitting with targeted exercises for office workers.",
    duration: "8 weeks",
    level: "Beginner",
    workoutsPerWeek: 3,
    totalWorkouts: 24,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    tags: ["Office", "Desk", "Posture"],
    color: "from-gray-500 to-slate-600",
    focus: ["Desk Posture", "Hip Flexors", "Upper Back"],
    targetMuscles: ["Hip Flexors", "Upper Back", "Glutes", "Core"],
    equipment: ["None"],
    weeklySchedule: [
      {
        week: 1,
        workouts: [
          {
            day: "Monday",
            name: "Hip Opener",
            exercises: ["Hip Flexor Stretches", "Glute Bridges", "Squats", "Calf Raises"],
            duration: 20,
            restTime: "45s"
          },
          {
            day: "Wednesday",
            name: "Back Relief",
            exercises: ["Upper Back Stretches", "Thoracic Extensions", "Neck Stretches", "Shoulder Blade Squeezes"],
            duration: 18,
            restTime: "45s"
          },
          {
            day: "Friday",
            name: "Full Body Reset",
            exercises: ["Standing Desk Routine", "Walking", "Dynamic Stretching", "Posture Checks"],
            duration: 25,
            restTime: "60s"
          }
        ]
      }
    ]
  },
  {
    id: "strength-starter",
    name: "Strength Starter",
    description: "Build foundational strength with progressive bodyweight exercises.",
    duration: "12 weeks",
    level: "Beginner",
    workoutsPerWeek: 2,
    totalWorkouts: 24,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    tags: ["Strength", "Progressive", "Bodyweight"],
    color: "from-stone-500 to-gray-600",
    focus: ["Strength Building", "Progressive Overload", "Functional Movement"],
    targetMuscles: ["Full Body", "Core", "Major Muscle Groups"],
    equipment: ["None"],
    weeklySchedule: [
      {
        week: 1,
        workouts: [
          {
            day: "Tuesday",
            name: "Upper Body Strength",
            exercises: ["Push-up Progression", "Pike Push-ups", "Tricep Dips", "Plank Variations"],
            duration: 35,
            restTime: "90s"
          },
          {
            day: "Friday",
            name: "Lower Body Strength",
            exercises: ["Squat Variations", "Lunge Progressions", "Single-Leg Exercises", "Calf Raises"],
            duration: 40,
            restTime: "90s"
          }
        ]
      }
    ]
  },
  {
    id: "flexibility-focus",
    name: "Flexibility Focus",
    description: "Comprehensive flexibility training to improve range of motion and prevent injury.",
    duration: "8 weeks",
    level: "Beginner",
    workoutsPerWeek: 3,
    totalWorkouts: 24,
    image: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    tags: ["Flexibility", "Stretching", "Recovery"],
    color: "from-pink-500 to-rose-600",
    focus: ["Flexibility", "Range of Motion", "Injury Prevention"],
    targetMuscles: ["Hamstrings", "Hip Flexors", "Shoulders", "Spine"],
    equipment: ["None"],
    weeklySchedule: [
      {
        week: 1,
        workouts: [
          {
            day: "Monday",
            name: "Lower Body Flexibility",
            exercises: ["Hamstring Stretches", "Quad Stretches", "Hip Flexor Stretches", "Calf Stretches"],
            duration: 25,
            restTime: "30s"
          },
          {
            day: "Wednesday",
            name: "Upper Body Flexibility",
            exercises: ["Shoulder Stretches", "Chest Stretches", "Neck Stretches", "Arm Stretches"],
            duration: 20,
            restTime: "30s"
          },
          {
            day: "Friday",
            name: "Full Body Flow",
            exercises: ["Dynamic Stretching", "Yoga Flow", "Spinal Mobility", "Deep Breathing"],
            duration: 30,
            restTime: "45s"
          }
        ]
      }
    ]
  },
  {
    id: "functional-movement",
    name: "Functional Movement",
    description: "Learn fundamental movement patterns that translate to daily activities.",
    duration: "10 weeks",
    level: "Beginner",
    workoutsPerWeek: 3,
    totalWorkouts: 30,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    tags: ["Functional", "Movement", "Daily Activities"],
    color: "from-amber-500 to-yellow-600",
    focus: ["Functional Movement", "Daily Activities", "Movement Quality"],
    targetMuscles: ["Full Body", "Stabilizers", "Core"],
    equipment: ["None"],
    weeklySchedule: [
      {
        week: 1,
        workouts: [
          {
            day: "Monday",
            name: "Squat Patterns",
            exercises: ["Bodyweight Squats", "Chair Squats", "Goblet Squats", "Squat to Stand"],
            duration: 25,
            restTime: "60s"
          },
          {
            day: "Wednesday",
            name: "Push/Pull Patterns",
            exercises: ["Push-ups", "Pulling Motions", "Reaching Exercises", "Carrying Positions"],
            duration: 30,
            restTime: "60s"
          },
          {
            day: "Friday",
            name: "Locomotion Patterns",
            exercises: ["Walking Variations", "Crawling Patterns", "Climbing Motions", "Balance Challenges"],
            duration: 35,
            restTime: "90s"
          }
        ]
      }
    ]
  },
  {
    id: "injury-prevention",
    name: "Injury Prevention",
    description: "Focus on exercises that prevent common injuries and improve body mechanics.",
    duration: "12 weeks",
    level: "Beginner",
    workoutsPerWeek: 2,
    totalWorkouts: 24,
    image: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    tags: ["Injury Prevention", "Rehabilitation", "Strengthening"],
    color: "from-emerald-500 to-teal-600",
    focus: ["Injury Prevention", "Corrective Exercise", "Strengthening"],
    targetMuscles: ["Stabilizers", "Core", "Posterior Chain"],
    equipment: ["None"],
    weeklySchedule: [
      {
        week: 1,
        workouts: [
          {
            day: "Tuesday",
            name: "Knee Health",
            exercises: ["Quad Strengthening", "Hamstring Strengthening", "Calf Raises", "Balance Training"],
            duration: 30,
            restTime: "60s"
          },
          {
            day: "Friday",
            name: "Back Health",
            exercises: ["Core Strengthening", "Hip Flexor Stretches", "Glute Activation", "Posture Exercises"],
            duration: 35,
            restTime: "60s"
          }
        ]
      }
    ]
  },
  {
    id: "coordination-builder",
    name: "Coordination Builder",
    description: "Improve coordination, agility, and motor skills through fun movement patterns.",
    duration: "6 weeks",
    level: "Beginner",
    workoutsPerWeek: 4,
    totalWorkouts: 24,
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    tags: ["Coordination", "Agility", "Motor Skills"],
    color: "from-violet-500 to-purple-600",
    focus: ["Coordination", "Agility", "Reaction Time"],
    targetMuscles: ["Full Body", "Nervous System", "Stabilizers"],
    equipment: ["None"],
    weeklySchedule: [
      {
        week: 1,
        workouts: [
          {
            day: "Monday",
            name: "Hand-Eye Coordination",
            exercises: ["Clapping Patterns", "Juggling Motions", "Cross-Body Movements", "Rhythm Exercises"],
            duration: 20,
            restTime: "45s"
          },
          {
            day: "Tuesday",
            name: "Footwork Patterns",
            exercises: ["Step Patterns", "Ladder Drills", "Dance Steps", "Agility Movements"],
            duration: 22,
            restTime: "45s"
          },
          {
            day: "Thursday",
            name: "Full Body Coordination",
            exercises: ["Cross-Crawl", "Opposite Arm/Leg", "Complex Movements", "Reaction Drills"],
            duration: 25,
            restTime: "60s"
          },
          {
            day: "Saturday",
            name: "Fun Coordination",
            exercises: ["Dance Movements", "Games", "Creative Movement", "Flow Patterns"],
            duration: 30,
            restTime: "60s"
          }
        ]
      }
    ]
  },
  {
    id: "breathing-basics",
    name: "Breathing Basics",
    description: "Learn proper breathing techniques to enhance performance and reduce stress.",
    duration: "4 weeks",
    level: "Beginner",
    workoutsPerWeek: 6,
    totalWorkouts: 24,
    image: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    tags: ["Breathing", "Relaxation", "Stress Relief"],
    color: "from-sky-500 to-blue-600",
    focus: ["Breathing Techniques", "Stress Management", "Mindfulness"],
    targetMuscles: ["Diaphragm", "Core", "Nervous System"],
    equipment: ["None"],
    weeklySchedule: [
      {
        week: 1,
        workouts: [
          {
            day: "Monday",
            name: "Basic Breathing",
            exercises: ["Diaphragmatic Breathing", "Box Breathing", "Belly Breathing", "Breath Awareness"],
            duration: 10,
            restTime: "As needed"
          },
          {
            day: "Tuesday",
            name: "Rhythmic Breathing",
            exercises: ["4-7-8 Breathing", "Alternate Nostril", "Rhythmic Patterns", "Breath Counting"],
            duration: 12,
            restTime: "As needed"
          },
          {
            day: "Wednesday",
            name: "Movement & Breathing",
            exercises: ["Breathing with Movement", "Coordinated Breathing", "Flow Breathing", "Active Recovery"],
            duration: 15,
            restTime: "30s"
          },
          {
            day: "Thursday",
            name: "Stress Relief Breathing",
            exercises: ["Calming Breaths", "Anxiety Relief", "Progressive Relaxation", "Mindful Breathing"],
            duration: 12,
            restTime: "As needed"
          },
          {
            day: "Friday",
            name: "Energy Breathing",
            exercises: ["Energizing Breaths", "Power Breathing", "Activation Techniques", "Morning Breathing"],
            duration: 10,
            restTime: "30s"
          },
          {
            day: "Saturday",
            name: "Meditation Breathing",
            exercises: ["Meditation Techniques", "Mindfulness Breathing", "Contemplative Breathing", "Silence"],
            duration: 18,
            restTime: "As needed"
          }
        ]
      }
    ]
  },
  {
    id: "senior-fitness",
    name: "Senior Fitness",
    description: "Gentle, safe exercises designed specifically for older adults and seniors.",
    duration: "12 weeks",
    level: "Beginner",
    workoutsPerWeek: 2,
    totalWorkouts: 24,
    image: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    tags: ["Senior", "Gentle", "Safe"],
    color: "from-slate-500 to-gray-600",
    focus: ["Safety", "Gentle Movement", "Functional Fitness"],
    targetMuscles: ["Full Body", "Stabilizers", "Core"],
    equipment: ["Chair", "None"],
    weeklySchedule: [
      {
        week: 1,
        workouts: [
          {
            day: "Tuesday",
            name: "Chair Exercises",
            exercises: ["Seated Arm Circles", "Seated Leg Extensions", "Chair Squats", "Seated Twists"],
            duration: 25,
            restTime: "60s"
          },
          {
            day: "Friday",
            name: "Standing Gentle",
            exercises: ["Gentle Arm Movements", "Heel Raises", "Side Steps", "Wall Push-ups"],
            duration: 20,
            restTime: "90s"
          }
        ]
      }
    ]
  },
  {
    id: "kids-fitness",
    name: "Kids Fitness Fun",
    description: "Fun, engaging exercises designed to get children active and moving.",
    duration: "6 weeks",
    level: "Beginner",
    workoutsPerWeek: 4,
    totalWorkouts: 24,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    tags: ["Kids", "Fun", "Games"],
    color: "from-rainbow-500 to-multicolor-600",
    focus: ["Fun Movement", "Motor Skills", "Active Play"],
    targetMuscles: ["Full Body", "Motor Development"],
    equipment: ["None"],
    weeklySchedule: [
      {
        week: 1,
        workouts: [
          {
            day: "Monday",
            name: "Animal Movements",
            exercises: ["Bear Crawl", "Frog Jumps", "Crab Walk", "Monkey Swings"],
            duration: 15,
            restTime: "30s"
          },
          {
            day: "Tuesday",
            name: "Action Games",
            exercises: ["Simon Says", "Red Light Green Light", "Follow the Leader", "Dance Party"],
            duration: 20,
            restTime: "As needed"
          },
          {
            day: "Thursday",
            name: "Obstacle Course",
            exercises: ["Jumping", "Crawling", "Balancing", "Running"],
            duration: 25,
            restTime: "60s"
          },
          {
            day: "Saturday",
            name: "Team Games",
            exercises: ["Group Activities", "Cooperative Games", "Relay Races", "Fun Challenges"],
            duration: 30,
            restTime: "As needed"
          }
        ]
      }
    ]
  },
  {
    id: "pregnancy-fitness",
    name: "Pregnancy Fitness",
    description: "Safe, gentle exercises for expecting mothers to maintain fitness during pregnancy.",
    duration: "36 weeks",
    level: "Beginner",
    workoutsPerWeek: 1,
    totalWorkouts: 36,
    image: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    tags: ["Pregnancy", "Prenatal", "Safe"],
    color: "from-rose-500 to-pink-600",
    focus: ["Prenatal Safety", "Gentle Strengthening", "Flexibility"],
    targetMuscles: ["Core", "Pelvic Floor", "Back", "Legs"],
    equipment: ["None"],
    weeklySchedule: [
      {
        week: 1,
        workouts: [
          {
            day: "Wednesday",
            name: "Gentle Prenatal",
            exercises: ["Prenatal Yoga", "Pelvic Floor", "Gentle Stretching", "Breathing Exercises"],
            duration: 30,
            restTime: "As needed"
          }
        ]
      }
    ]
  },
  {
    id: "recovery-focused",
    name: "Recovery Focused",
    description: "Gentle recovery exercises for those returning to fitness after injury or extended break.",
    duration: "8 weeks",
    level: "Beginner",
    workoutsPerWeek: 3,
    totalWorkouts: 24,
    image: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    tags: ["Recovery", "Rehabilitation", "Gentle"],
    color: "from-green-500 to-emerald-600",
    focus: ["Recovery", "Gentle Progression", "Rebuilding"],
    targetMuscles: ["Full Body", "Stabilizers", "Core"],
    equipment: ["None"],
    weeklySchedule: [
      {
        week: 1,
        workouts: [
          {
            day: "Monday",
            name: "Gentle Reactivation",
            exercises: ["Gentle Movements", "Range of Motion", "Light Stretching", "Breathing"],
            duration: 15,
            restTime: "60s"
          },
          {
            day: "Wednesday",
            name: "Stability Focus",
            exercises: ["Balance Exercises", "Core Stability", "Posture Work", "Gentle Strengthening"],
            duration: 20,
            restTime: "90s"
          },
          {
            day: "Friday",
            name: "Progressive Movement",
            exercises: ["Functional Movements", "Light Cardio", "Flexibility", "Mind-Body Connection"],
            duration: 25,
            restTime: "60s"
          }
        ]
      }
    ]
  },
  {
    id: "quick-starter",
    name: "Quick Starter",
    description: "Super quick 5-10 minute workouts perfect for busy beginners.",
    duration: "4 weeks",
    level: "Beginner",
    workoutsPerWeek: 6,
    totalWorkouts: 24,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    tags: ["Quick", "Time-Efficient", "Busy Schedule"],
    color: "from-orange-500 to-red-600",
    focus: ["Time Efficiency", "Quick Results", "Consistency"],
    targetMuscles: ["Full Body", "Core", "Major Muscle Groups"],
    equipment: ["None"],
    weeklySchedule: [
      {
        week: 1,
        workouts: [
          {
            day: "Monday",
            name: "5-Minute Starter",
            exercises: ["Jumping Jacks", "Push-ups", "Squats", "Plank"],
            duration: 5,
            restTime: "20s"
          },
          {
            day: "Tuesday",
            name: "7-Minute Express",
            exercises: ["Burpees", "Mountain Climbers", "Lunges", "High Knees"],
            duration: 7,
            restTime: "30s"
          },
          {
            day: "Wednesday",
            name: "Quick Core",
            exercises: ["Plank", "Crunches", "Leg Raises", "Russian Twists"],
            duration: 6,
            restTime: "20s"
          },
          {
            day: "Thursday",
            name: "Power 8",
            exercises: ["Squat Jumps", "Push-up Variations", "Alternating Lunges", "Plank Jacks"],
            duration: 8,
            restTime: "30s"
          },
          {
            day: "Friday",
            name: "Fast Finisher",
            exercises: ["Full Body Circuit", "Cardio Burst", "Strength Combo", "Core Finish"],
            duration: 10,
            restTime: "45s"
          },
          {
            day: "Saturday",
            name: "Weekend Warrior",
            exercises: ["Longer Circuit", "Fun Movements", "Challenge Yourself", "Recovery"],
            duration: 12,
            restTime: "60s"
          }
        ]
      }
    ]
  }
];

export const getBeginnerProgramById = (id: string): BeginnerProgram | undefined => {
  return beginnerPrograms.find(program => program.id === id);
};

export const getBeginnerProgramsByFocus = (focus: string): BeginnerProgram[] => {
  return beginnerPrograms.filter(program => 
    program.focus.some(f => f.toLowerCase().includes(focus.toLowerCase()))
  );
};

export const getBeginnerProgramsByDuration = (maxWeeks: number): BeginnerProgram[] => {
  return beginnerPrograms.filter(program => {
    const weeks = parseInt(program.duration.split(' ')[0]);
    return weeks <= maxWeeks;
  });
};
