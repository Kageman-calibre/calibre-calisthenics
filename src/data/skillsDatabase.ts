
export interface SkillProgression {
  name: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  description: string;
  instructions: string[];
  targetHold: string;
}

export interface CommonMistake {
  mistake: string;
  correction: string;
}

export interface TrainingProtocol {
  frequency: string;
  sets: string;
  rest: string;
}

export interface SkillGuide {
  id: string;
  name: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  category: 'static' | 'dynamic' | 'strength' | 'flexibility';
  prerequisites: string[];
  musclesWorked: string[];
  timeline: string;
  image: string;
  progressions: SkillProgression[];
  trainingProtocol: TrainingProtocol;
  commonMistakes: CommonMistake[];
  tips: string[];
}

export const skillsDatabase: SkillGuide[] = [
  {
    id: 'l-sit',
    name: 'L-Sit',
    description: 'A challenging static hold that builds incredible core strength and shoulder stability while maintaining straight legs parallel to the ground.',
    difficulty: 'intermediate',
    category: 'static',
    prerequisites: [
      'Hold a plank for 60+ seconds',
      'Perform 10+ push-ups with good form',
      'Hold a dead hang for 30+ seconds',
      'Basic hollow body hold for 30+ seconds'
    ],
    musclesWorked: ['Core', 'Hip Flexors', 'Shoulders', 'Triceps', 'Lats'],
    timeline: '3-6 months with consistent training',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    progressions: [
      {
        name: 'Support Hold',
        difficulty: 'beginner',
        description: 'Learn to support your bodyweight on your hands',
        instructions: [
          'Sit between parallettes or on the edge of a bench',
          'Place hands beside your hips, fingers pointing forward',
          'Press down to lift your body up, supporting your weight on your hands',
          'Keep shoulders down and chest proud'
        ],
        targetHold: '30-60 seconds'
      },
      {
        name: 'Knee Tuck L-Sit',
        difficulty: 'beginner',
        description: 'Lift knees to chest while in support position',
        instructions: [
          'Start in support hold position',
          'Slowly lift knees up toward your chest',
          'Keep knees together and core tight',
          'Maintain straight arms and depressed shoulders'
        ],
        targetHold: '15-30 seconds'
      },
      {
        name: 'Single Leg L-Sit',
        difficulty: 'intermediate',
        description: 'Extend one leg while keeping the other tucked',
        instructions: [
          'Begin in knee tuck position',
          'Slowly extend one leg straight out',
          'Keep the extended leg parallel to ground',
          'Alternate legs or hold with stronger leg first'
        ],
        targetHold: '10-20 seconds each leg'
      },
      {
        name: 'Full L-Sit',
        difficulty: 'intermediate',
        description: 'Both legs extended straight and parallel to ground',
        instructions: [
          'Start in support hold',
          'Lift both legs together, keeping them straight',
          'Raise legs until parallel with the ground',
          'Point toes and keep legs pressed together',
          'Maintain hollow body position'
        ],
        targetHold: '5-15 seconds'
      }
    ],
    trainingProtocol: {
      frequency: 'Train 3-4 times per week with at least one rest day between sessions',
      sets: '3-5 sets of maximum hold time, focusing on perfect form over duration',
      rest: '2-3 minutes between sets to allow full recovery'
    },
    commonMistakes: [
      {
        mistake: 'Rounded shoulders and hunched posture',
        correction: 'Keep shoulders depressed and pulled back, maintain proud chest position'
      },
      {
        mistake: 'Bent legs or legs below parallel',
        correction: 'Focus on hip flexor strength, use progressions until you can maintain straight legs'
      },
      {
        mistake: 'Rushing the progression',
        correction: 'Master each step completely before advancing - quality over speed'
      },
      {
        mistake: 'Not engaging the core properly',
        correction: 'Think about pulling belly button to spine and creating hollow body shape'
      }
    ],
    tips: [
      'Start each session with a proper warm-up including wrist circles and shoulder mobility',
      'Practice hollow body holds separately to build the core strength pattern',
      'Use parallettes or push-up handles to give yourself more clearance',
      'Film yourself from the side to check leg position and form',
      'Consistency beats intensity - short daily practice is better than long weekly sessions'
    ]
  },
  {
    id: 'v-sit',
    name: 'V-Sit',
    description: 'An advanced progression of the L-sit where legs are raised higher than parallel, creating a V-shape with your body.',
    difficulty: 'advanced',
    category: 'static',
    prerequisites: [
      'Hold L-sit for 15+ seconds',
      'Strong pike flexibility',
      'Excellent core and hip flexor strength',
      'Solid shoulder strength and stability'
    ],
    musclesWorked: ['Core', 'Hip Flexors', 'Shoulders', 'Lower Back', 'Hamstrings'],
    timeline: '6-12 months after mastering L-sit',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    progressions: [
      {
        name: 'Pike Stretch Conditioning',
        difficulty: 'beginner',
        description: 'Develop the flexibility needed for V-sit',
        instructions: [
          'Sit with legs extended, reach toward toes',
          'Hold pike position for 30-60 seconds',
          'Focus on keeping back straight, not rounded',
          'Gradually increase range of motion over time'
        ],
        targetHold: '60+ seconds with flat back'
      },
      {
        name: 'Elevated L-Sit',
        difficulty: 'intermediate',
        description: 'Gradually increase leg height from L-sit position',
        instructions: [
          'Start in perfect L-sit hold',
          'Slowly raise legs higher than parallel',
          'Maintain straight legs and pointed toes',
          'Hold for as long as possible with good form'
        ],
        targetHold: '5-10 seconds above parallel'
      },
      {
        name: 'V-Sit Compressions',
        difficulty: 'advanced',
        description: 'Dynamic movement to build strength in V-sit range',
        instructions: [
          'Start in support hold position',
          'Quickly compress into V-sit position',
          'Lower legs slowly back to support',
          'Focus on explosive up, controlled down'
        ],
        targetHold: '5-10 compression reps'
      },
      {
        name: 'Full V-Sit',
        difficulty: 'advanced',
        description: 'Complete V-sit with legs at 45+ degrees above parallel',
        instructions: [
          'Begin in support hold',
          'Lift legs to create V-shape with torso',
          'Keep legs straight and together',
          'Maintain balance and control throughout'
        ],
        targetHold: '3-10 seconds'
      }
    ],
    trainingProtocol: {
      frequency: '2-3 times per week, allowing full recovery between sessions',
      sets: '3-4 sets of maximum hold, plus flexibility work daily',
      rest: '3-4 minutes between strength sets, stretch during rest periods'
    },
    commonMistakes: [
      {
        mistake: 'Insufficient flexibility in pike position',
        correction: 'Dedicate time to daily pike stretching and pancake flexibility work'
      },
      {
        mistake: 'Attempting V-sit without mastering L-sit first',
        correction: 'Perfect your L-sit hold for 15+ seconds before progressing'
      },
      {
        mistake: 'Leaning too far back to compensate',
        correction: 'Maintain upright torso position, focus on active leg lifting'
      }
    ],
    tips: [
      'Flexibility is just as important as strength for this skill',
      'Practice pike pulses in V-sit position to build specific strength',
      'Use ankle weights to add resistance during progressions',
      'Work on shoulder blade protraction to help with balance'
    ]
  },
  {
    id: 'pistol-squat',
    name: 'Pistol Squat',
    description: 'A single-leg squat that demonstrates exceptional leg strength, balance, and mobility in one fluid movement.',
    difficulty: 'advanced',
    category: 'dynamic',
    prerequisites: [
      'Perform 20+ bodyweight squats with perfect form',
      'Single-leg balance for 30+ seconds',
      'Deep squat hold with heels down',
      'Good ankle and hip mobility'
    ],
    musclesWorked: ['Quadriceps', 'Glutes', 'Hamstrings', 'Calves', 'Core', 'Hip Flexors'],
    timeline: '4-8 months with consistent practice',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    progressions: [
      {
        name: 'Deep Squat Hold',
        difficulty: 'beginner',
        description: 'Build ankle mobility and squat depth',
        instructions: [
          'Squat down as deep as possible',
          'Keep heels on ground and knees tracking over toes',
          'Hold position while maintaining balance',
          'Work up to 2+ minutes'
        ],
        targetHold: '2+ minutes'
      },
      {
        name: 'Assisted Pistol Squat',
        difficulty: 'intermediate',
        description: 'Use support to learn the movement pattern',
        instructions: [
          'Hold onto a sturdy object for balance',
          'Extend one leg forward',
          'Lower down on standing leg',
          'Use minimal assistance from hands'
        ],
        targetHold: '5-10 reps each leg'
      },
      {
        name: 'Box Pistol Squat',
        difficulty: 'intermediate',
        description: 'Reduce range of motion with elevated surface',
        instructions: [
          'Stand on a box or step',
          'Extend one leg off the edge',
          'Lower into single-leg squat',
          'Gradually use lower boxes'
        ],
        targetHold: '5-8 reps from 12-inch height'
      },
      {
        name: 'Full Pistol Squat',
        difficulty: 'advanced',
        description: 'Complete single-leg squat from standing to full depth',
        instructions: [
          'Stand on one leg, extend other leg forward',
          'Lower down while keeping extended leg off ground',
          'Descend until hip crease below knee',
          'Stand back up without touching other foot down'
        ],
        targetHold: '3-8 reps each leg'
      }
    ],
    trainingProtocol: {
      frequency: '3-4 times per week, alternating legs evenly',
      sets: '3-5 sets per leg, focus on quality over quantity',
      rest: '2-3 minutes between sets, longer if needed for perfect form'
    },
    commonMistakes: [
      {
        mistake: 'Rising up on toes or heel lifting',
        correction: 'Work on ankle mobility daily, use heel elevation if needed initially'
      },
      {
        mistake: 'Extended leg dropping down during movement',
        correction: 'Strengthen hip flexors with leg raises and holds'
      },
      {
        mistake: 'Falling backward during descent',
        correction: 'Practice sitting back into movement, work on counterbalance with arms'
      },
      {
        mistake: 'Knee caving inward',
        correction: 'Focus on knee tracking over toes, strengthen glutes and hip stabilizers'
      }
    ],
    tips: [
      'Master the regular squat pattern first - depth and heel contact are crucial',
      'Work on ankle mobility daily with calf stretches and ankle circles',
      'Practice single-leg balance separately to build stability',
      'Use a TRX or resistance band for assistance when learning',
      'Start with your stronger leg to learn the movement pattern'
    ]
  },
  {
    id: 'dragon-squat',
    name: 'Dragon Squat',
    description: 'An extremely advanced single-leg squat variation where one leg is held behind the body, requiring exceptional strength and flexibility.',
    difficulty: 'expert',
    category: 'dynamic',
    prerequisites: [
      'Perfect pistol squats (8+ reps each leg)',
      'Excellent hip and ankle flexibility',
      'Advanced single-leg strength',
      'Deep lunge and hip flexor mobility'
    ],
    musclesWorked: ['Quadriceps', 'Glutes', 'Hip Flexors', 'Core', 'Hamstrings', 'Calves'],
    timeline: '1-2 years after mastering pistol squats',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    progressions: [
      {
        name: 'Deep Lunge Holds',
        difficulty: 'intermediate',
        description: 'Build the flexibility needed for dragon squat position',
        instructions: [
          'Step into deep lunge position',
          'Lower back knee toward ground',
          'Hold stretch feeling hip flexor lengthening',
          'Keep front shin vertical'
        ],
        targetHold: '60+ seconds each side'
      },
      {
        name: 'Rear Foot Elevated Split Squat',
        difficulty: 'intermediate',
        description: 'Build single-leg strength in similar position',
        instructions: [
          'Place rear foot on elevated surface',
          'Lower into lunge position',
          'Focus weight on front leg',
          'Perform controlled reps'
        ],
        targetHold: '10-15 reps each leg'
      },
      {
        name: 'Assisted Dragon Squat',
        difficulty: 'advanced',
        description: 'Practice the movement with support',
        instructions: [
          'Hold wall or sturdy object for balance',
          'Position rear leg behind body',
          'Lower into single-leg squat',
          'Use minimal hand support'
        ],
        targetHold: '3-5 reps with assistance'
      },
      {
        name: 'Full Dragon Squat',
        difficulty: 'expert',
        description: 'Complete dragon squat without assistance',
        instructions: [
          'Stand on one leg',
          'Position other leg behind body',
          'Lower into deep squat on standing leg',
          'Maintain balance and control throughout'
        ],
        targetHold: '1-5 reps each leg'
      }
    ],
    trainingProtocol: {
      frequency: '2-3 times per week maximum, requires significant recovery',
      sets: '2-4 sets per leg, very low reps with perfect form',
      rest: '3-5 minutes between sets'
    },
    commonMistakes: [
      {
        mistake: 'Attempting without sufficient pistol squat strength',
        correction: 'Master pistol squats completely first - aim for 10+ perfect reps'
      },
      {
        mistake: 'Inadequate hip flexor flexibility',
        correction: 'Spend months working on deep lunge holds and hip mobility'
      },
      {
        mistake: 'Using momentum instead of control',
        correction: 'Focus on slow, controlled movement - better to do 1 perfect rep than 5 poor ones'
      }
    ],
    tips: [
      'This is an elite-level movement - be patient with progression',
      'Flexibility work should be done daily, strength work 2-3x per week',
      'Consider working with a qualified trainer for this skill',
      'Video yourself from multiple angles to check form'
    ]
  },
  {
    id: 'handstand',
    name: 'Handstand',
    description: 'The foundational inverted skill that builds shoulder strength, core stability, and body awareness while balanced on your hands.',
    difficulty: 'intermediate',
    category: 'static',
    prerequisites: [
      'Hold plank for 60+ seconds',
      'Perform 10+ push-ups with good form',
      'Basic shoulder flexibility and mobility',
      'Hollow body hold for 30+ seconds'
    ],
    musclesWorked: ['Shoulders', 'Core', 'Forearms', 'Upper Back', 'Wrists'],
    timeline: '6-12 months with consistent practice',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    progressions: [
      {
        name: 'Wall Handstand',
        difficulty: 'beginner',
        description: 'Learn proper handstand alignment using wall support',
        instructions: [
          'Place hands 6 inches from wall',
          'Walk feet up wall until inverted',
          'Focus on straight body line',
          'Keep shoulders over wrists'
        ],
        targetHold: '30-60 seconds'
      },
      {
        name: 'Chest-to-Wall Handstand',
        difficulty: 'intermediate',
        description: 'Face the wall to learn proper hollow body position',
        instructions: [
          'Face wall with hands close to baseboard',
          'Walk up into handstand facing wall',
          'Chest and toes should lightly touch wall',
          'This teaches proper hollow position'
        ],
        targetHold: '30+ seconds'
      },
      {
        name: 'Kick-up Practice',
        difficulty: 'intermediate',
        description: 'Learn to kick up to handstand',
        instructions: [
          'Start in downward dog position',
          'Step one foot closer to hands',
          'Kick up with back leg while pushing off front foot',
          'Practice finding balance point'
        ],
        targetHold: 'Consistent kick-ups'
      },
      {
        name: 'Freestanding Handstand',
        difficulty: 'intermediate',
        description: 'Balance handstand without wall support',
        instructions: [
          'Kick up to handstand',
          'Find balance using finger pressure and wrist adjustments',
          'Keep body in straight line',
          'Breathe normally while balancing'
        ],
        targetHold: '10-60+ seconds'
      }
    ],
    trainingProtocol: {
      frequency: '4-6 times per week, daily practice is ideal for skill development',
      sets: 'Multiple short sets rather than few long ones - quality over duration',
      rest: '1-2 minutes between attempts to avoid fatigue affecting form'
    },
    commonMistakes: [
      {
        mistake: 'Banana back (excessive arch)',
        correction: 'Practice hollow body holds, focus on posterior pelvic tilt'
      },
      {
        mistake: 'Looking around or lifting head',
        correction: 'Look at ground between hands, keep head in neutral position'
      },
      {
        mistake: 'Shoulders not over wrists',
        correction: 'Work on shoulder flexibility, ensure proper setup position'
      },
      {
        mistake: 'Gripping with whole hand',
        correction: 'Learn to balance using fingertips, develop finger strength'
      }
    ],
    tips: [
      'Warm up wrists thoroughly before each practice session',
      'Practice kicks against wall before attempting freestanding',
      'Record yourself to check alignment - you can\'t see your form while inverted',
      'Be patient - handstand is as much skill as strength',
      'Practice hollow body holds daily to build the core strength pattern'
    ]
  },
  {
    id: 'muscle-up',
    name: 'Muscle-up',
    description: 'A dynamic movement combining a pull-up with a dip, transitioning from hanging below the bar to supporting above it.',
    difficulty: 'advanced',
    category: 'dynamic',
    prerequisites: [
      'Perform 10+ strict pull-ups',
      'Perform 10+ parallel bar dips',
      'High pulling strength (chest to bar pull-ups)',
      'Strong grip and forearm strength'
    ],
    musclesWorked: ['Lats', 'Rhomboids', 'Biceps', 'Triceps', 'Chest', 'Core'],
    timeline: '3-8 months after mastering prerequisite movements',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    progressions: [
      {
        name: 'High Pull-ups',
        difficulty: 'intermediate',
        description: 'Pull higher than standard pull-up',
        instructions: [
          'Perform pull-up pulling chest to bar',
          'Focus on explosive upward movement',
          'Pull as high as possible',
          'Control the descent'
        ],
        targetHold: '8-12 reps chest to bar'
      },
      {
        name: 'Transition Practice',
        difficulty: 'intermediate',
        description: 'Practice the transition from pull to dip',
        instructions: [
          'Jump or step up to support position above bar',
          'Lower slowly through transition',
          'Focus on shifting from pull to push position',
          'Use bands for assistance if needed'
        ],
        targetHold: '5-8 slow negatives'
      },
      {
        name: 'Assisted Muscle-up',
        difficulty: 'advanced',
        description: 'Complete muscle-up with minimal assistance',
        instructions: [
          'Use resistance band around waist or feet',
          'Perform explosive pull-up',
          'Transition over bar with band assistance',
          'Complete dip portion'
        ],
        targetHold: '3-5 reps with light assistance'
      },
      {
        name: 'Strict Muscle-up',
        difficulty: 'advanced',
        description: 'Complete muscle-up without assistance or kipping',
        instructions: [
          'Hang from bar with overhand grip',
          'Pull explosively bringing chest to bar',
          'Transition by leaning forward over bar',
          'Press to full support position'
        ],
        targetHold: '1-5 strict reps'
      }
    ],
    trainingProtocol: {
      frequency: '2-3 times per week, allowing full recovery between sessions',
      sets: '3-5 sets of low reps, focusing on perfect technique',
      rest: '3-5 minutes between sets due to high intensity'
    },
    commonMistakes: [
      {
        mistake: 'Attempting muscle-up without sufficient pull-up strength',
        correction: 'Build to 12+ strict pull-ups before attempting muscle-ups'
      },
      {
        mistake: 'Poor transition technique',
        correction: 'Practice transition separately, focus on leaning forward over bar'
      },
      {
        mistake: 'Relying too much on momentum/kipping',
        correction: 'Focus on strict strength-based muscle-ups for better development'
      },
      {
        mistake: 'Weak false grip',
        correction: 'Practice false grip hangs to build wrist and forearm strength'
      }
    ],
    tips: [
      'Master both pull-ups and dips separately before combining',
      'Practice high pull-ups focusing on explosive power',
      'Work on transition drills using bands or assistance',
      'False grip muscle-ups are easier for beginners than regular grip',
      'Focus on quality over quantity - one perfect rep beats five sloppy ones'
    ]
  }
];

export const getSkillById = (id: string) => {
  return skillsDatabase.find(skill => skill.id === id);
};

export const getSkillsByDifficulty = (difficulty: string) => {
  return skillsDatabase.filter(skill => skill.difficulty === difficulty);
};

export const getSkillsByCategory = (category: string) => {
  return skillsDatabase.filter(skill => skill.category === category);
};
