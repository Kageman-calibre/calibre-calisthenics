
import { AdvancedAnalysisResult } from '../types';

// Generate calisthenics-specific advanced analysis
export const generateCalisthenicsAdvancedAnalysis = (skillType: string): AdvancedAnalysisResult => {
  const baseAnalysis = {
    movementSymmetry: {
      leftSide: 85 + Math.floor(Math.random() * 12),
      rightSide: 87 + Math.floor(Math.random() * 12),
      asymmetryPercentage: 2 + Math.floor(Math.random() * 8),
      status: 'balanced' as const
    },
    movementVelocity: {
      concentric: 2.0 + Math.random(),
      eccentric: 2.5 + Math.random(),
      optimal: Math.random() > 0.2
    },
    injuryRisk: {
      level: 'low' as const,
      factors: ['Advanced skill - requires proper progression'],
      score: 10 + Math.floor(Math.random() * 15)
    }
  };

  const skillSpecificAnalysis: Record<string, any> = {
    'Muscle-up': {
      jointAngles: [
        { joint: 'Shoulder Extension', angle: 165 + Math.floor(Math.random() * 15), idealRange: [160, 180], status: 'good' },
        { joint: 'Elbow Flexion', angle: 35 + Math.floor(Math.random() * 25), idealRange: [30, 60], status: 'good' },
        { joint: 'Wrist Neutral', angle: 175 + Math.floor(Math.random() * 10), idealRange: [170, 180], status: 'good' }
      ],
      rangeOfMotion: [
        { exercise: 'Pull Phase', achieved: 150 + Math.floor(Math.random() * 20), optimal: 170, percentage: 88 + Math.floor(Math.random() * 10) },
        { exercise: 'Transition', achieved: 165 + Math.floor(Math.random() * 10), optimal: 175, percentage: 92 + Math.floor(Math.random() * 8) },
        { exercise: 'Dip Phase', achieved: 170 + Math.floor(Math.random() * 10), optimal: 180, percentage: 94 + Math.floor(Math.random() * 6) }
      ]
    },
    'Planche': {
      jointAngles: [
        { joint: 'Shoulder Protraction', angle: 145 + Math.floor(Math.random() * 20), idealRange: [140, 165], status: 'good' },
        { joint: 'Hip Extension', angle: 175 + Math.floor(Math.random() * 5), idealRange: [170, 180], status: 'good' },
        { joint: 'Wrist Extension', angle: 85 + Math.floor(Math.random() * 10), idealRange: [80, 95], status: 'good' }
      ],
      rangeOfMotion: [
        { exercise: 'Lean Angle', achieved: 45 + Math.floor(Math.random() * 15), optimal: 60, percentage: 75 + Math.floor(Math.random() * 20) },
        { exercise: 'Body Line', achieved: 175 + Math.floor(Math.random() * 5), optimal: 180, percentage: 97 + Math.floor(Math.random() * 3) }
      ]
    },
    'Handstand': {
      jointAngles: [
        { joint: 'Shoulder Flexion', angle: 175 + Math.floor(Math.random() * 5), idealRange: [170, 180], status: 'good' },
        { joint: 'Hip Alignment', angle: 178 + Math.floor(Math.random() * 2), idealRange: [175, 180], status: 'good' },
        { joint: 'Ankle Alignment', angle: 177 + Math.floor(Math.random() * 3), idealRange: [175, 180], status: 'good' }
      ],
      rangeOfMotion: [
        { exercise: 'Shoulder Mobility', achieved: 172 + Math.floor(Math.random() * 8), optimal: 180, percentage: 95 + Math.floor(Math.random() * 5) },
        { exercise: 'Balance Control', achieved: 85 + Math.floor(Math.random() * 15), optimal: 100, percentage: 85 + Math.floor(Math.random() * 15) }
      ]
    },
    'Front Lever': {
      jointAngles: [
        { joint: 'Shoulder Extension', angle: 160 + Math.floor(Math.random() * 15), idealRange: [155, 175], status: 'good' },
        { joint: 'Hip Extension', angle: 177 + Math.floor(Math.random() * 3), idealRange: [175, 180], status: 'good' },
        { joint: 'Lat Engagement', angle: 140 + Math.floor(Math.random() * 20), idealRange: [135, 155], status: 'good' }
      ],
      rangeOfMotion: [
        { exercise: 'Body Position', achieved: 170 + Math.floor(Math.random() * 10), optimal: 180, percentage: 94 + Math.floor(Math.random() * 6) },
        { exercise: 'Hold Duration', achieved: 8 + Math.floor(Math.random() * 7), optimal: 15, percentage: 60 + Math.floor(Math.random() * 30) }
      ]
    }
  };

  return {
    ...baseAnalysis,
    ...(skillSpecificAnalysis[skillType] || skillSpecificAnalysis['Muscle-up'])
  };
};
