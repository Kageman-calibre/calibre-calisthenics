
import { EnhancedFeedbackData } from '../types';

export const generateEnhancedFeedback = (detectedSkill: string, formScore: number): EnhancedFeedbackData => {
  return {
    realTimeFeedback: [
      { timestamp: 2.5, message: `Strong ${detectedSkill.toLowerCase()} attempt`, type: 'encouragement', severity: 'low' },
      { timestamp: 5.0, message: 'Maintain body tension', type: 'correction', severity: 'medium' },
      { timestamp: 7.8, message: 'Excellent control displayed!', type: 'encouragement', severity: 'low' },
      { timestamp: 10.2, message: 'Focus on breathing rhythm', type: 'correction', severity: 'low' },
      { timestamp: 12.7, message: 'Impressive skill execution!', type: 'encouragement', severity: 'low' }
    ],
    progressiveRecommendation: {
      currentLevel: `${detectedSkill} - Developing`,
      nextLevel: `Advanced ${detectedSkill} Variations`,
      requirements: [
        'Master current form consistently',
        'Increase hold time or rep count by 20%',
        'Develop supporting muscle groups',
        'Work on skill-specific mobility'
      ],
      estimatedTimeframe: '4-8 weeks',
      difficulty: 70 + Math.floor(Math.random() * 25)
    },
    injuryRiskAlerts: [
      {
        risk: 'Advanced Skill Injury Risk',
        severity: 'medium',
        prevention: [
          'Ensure proper skill progression pathway',
          'Master prerequisite movements first',
          'Focus on joint mobility and stability',
          'Use progressive overload principles'
        ],
        immediateAction: 'Do not attempt without proper preparation'
      }
    ],
    movementComparison: {
      userScore: formScore,
      idealScore: 95,
      deviations: [
        {
          phase: 'Skill Execution Phase',
          issue: 'Minor technique refinement needed',
          correction: `Focus on ${detectedSkill.toLowerCase()}-specific cues`
        }
      ]
    },
    overallImprovement: {
      score: formScore + 8,
      keyAreas: ['Skill Technique', 'Body Control', 'Progressive Development', 'Strength Foundation'],
      priority: 'Master fundamental movement patterns'
    }
  };
};
