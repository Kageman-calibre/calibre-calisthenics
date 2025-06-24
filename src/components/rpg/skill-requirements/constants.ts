
export interface SkillRequirement {
  id: string;
  name: string;
  description: string;
  type: 'hold' | 'reps';
  targetValue: number;
  unit: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}

export interface LevelRequirement {
  level: number;
  title: string;
  skills: SkillRequirement[];
}

export const LEVEL_REQUIREMENTS: LevelRequirement[] = [
  {
    level: 11,
    title: 'Skill Initiate',
    skills: [
      {
        id: 'l-sit',
        name: 'L-Sit Hold',
        description: 'Demonstrate core strength with an L-sit',
        type: 'hold',
        targetValue: 15,
        unit: 'seconds',
        difficulty: 'intermediate'
      },
      {
        id: 'pistol-squat',
        name: 'Pistol Squat',
        description: 'Single-leg squat demonstrating leg strength and balance',
        type: 'reps',
        targetValue: 1,
        unit: 'per leg',
        difficulty: 'intermediate'
      }
    ]
  },
  {
    level: 21,
    title: 'Strength Adept',
    skills: [
      {
        id: 'strict-pullup',
        name: 'Strict Pull-ups',
        description: 'Dead hang to chin over bar with strict form',
        type: 'reps',
        targetValue: 10,
        unit: 'reps',
        difficulty: 'intermediate'
      },
      {
        id: 'parallel-dips',
        name: 'Parallel Bar Dips',
        description: 'Full range of motion dips',
        type: 'reps',
        targetValue: 15,
        unit: 'reps',
        difficulty: 'intermediate'
      }
    ]
  },
  {
    level: 31,
    title: 'Movement Master',
    skills: [
      {
        id: 'muscle-up',
        name: 'Muscle-up',
        description: 'Transition from pull-up to dip in one fluid motion',
        type: 'reps',
        targetValue: 3,
        unit: 'reps',
        difficulty: 'advanced'
      },
      {
        id: 'handstand-pushup',
        name: 'Handstand Push-up',
        description: 'Inverted push-up against wall',
        type: 'reps',
        targetValue: 5,
        unit: 'reps',
        difficulty: 'advanced'
      },
      {
        id: 'front-lever',
        name: 'Front Lever',
        description: 'Horizontal body hold parallel to ground',
        type: 'hold',
        targetValue: 5,
        unit: 'seconds',
        difficulty: 'advanced'
      }
    ]
  },
  {
    level: 41,
    title: 'Elite Performer',
    skills: [
      {
        id: 'one-arm-pullup',
        name: 'One-Arm Pull-up',
        description: 'Ultimate pulling strength demonstration',
        type: 'reps',
        targetValue: 1,
        unit: 'per arm',
        difficulty: 'expert'
      },
      {
        id: 'planche',
        name: 'Planche Hold',
        description: 'Advanced static hold requiring extreme strength',
        type: 'hold',
        targetValue: 10,
        unit: 'seconds',
        difficulty: 'expert'
      },
      {
        id: 'human-flag',
        name: 'Human Flag',
        description: 'Lateral body hold on vertical pole',
        type: 'hold',
        targetValue: 8,
        unit: 'seconds',
        difficulty: 'expert'
      }
    ]
  },
  {
    level: 51,
    title: 'Legendary Master',
    skills: [
      {
        id: 'iron-cross',
        name: 'Iron Cross',
        description: 'Rings gymnastics strength move',
        type: 'hold',
        targetValue: 3,
        unit: 'seconds',
        difficulty: 'expert'
      },
      {
        id: 'one-arm-handstand',
        name: 'One-Arm Handstand',
        description: 'Ultimate balance and strength display',
        type: 'hold',
        targetValue: 10,
        unit: 'seconds',
        difficulty: 'expert'
      }
    ]
  }
];

export const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'beginner': return 'bg-green-500/20 text-green-400 border-green-500/50';
    case 'intermediate': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
    case 'advanced': return 'bg-orange-500/20 text-orange-400 border-orange-500/50';
    case 'expert': return 'bg-red-500/20 text-red-400 border-red-500/50';
    default: return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
  }
};
