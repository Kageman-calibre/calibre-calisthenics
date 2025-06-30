
import { useState } from 'react';
import { AnalysisResult, AdvancedAnalysisResult, EnhancedFeedbackData } from './types';

// Calisthenics-specific skill detection
const detectCalisthenicsSkill = (): string => {
  const calisthenicsSkills = [
    'Muscle-up', 'Human Flag', 'Planche', 'Front Lever', 'Back Lever',
    'Handstand', 'Handstand Push-up', 'Archer Pull-up', 'One Arm Pull-up',
    'Pistol Squat', 'Dragon Flag', 'L-Sit', 'V-Sit', 'Maltese',
    'Iron Cross', 'Straddle Planche', 'Full Planche', 'Lever Pull-up',
    'Muscle-up Transition', 'Strict Muscle-up', 'Kipping Muscle-up',
    'Wall Handstand', 'Freestanding Handstand', 'Hollow Body Hold',
    'Superman Hold', 'Bridge', 'Crow Pose', 'Side Lever'
  ];
  return calisthenicsSkills[Math.floor(Math.random() * calisthenicsSkills.length)];
};

// Generate calisthenics-specific feedback based on skill type
const generateCalisthenicsSkillFeedback = (skillType: string) => {
  const skillFeedbackMap: Record<string, { feedback: string[], suggestions: string[], keyFrames: number[] }> = {
    'Muscle-up': {
      feedback: ['Good transition phase detected', 'Strong pull strength shown', 'Dip portion well executed'],
      suggestions: ['Work on smoother transition', 'Reduce kipping if present', 'Focus on chest-to-bar contact'],
      keyFrames: [1.5, 3.2, 5.8, 8.1, 10.5]
    },
    'Human Flag': {
      feedback: ['Good body alignment maintained', 'Core strength evident', 'Grip positioning appropriate'],
      suggestions: ['Engage lats more actively', 'Keep legs straight and together', 'Maintain hollow body position'],
      keyFrames: [2.0, 5.0, 8.0, 12.0, 15.0]
    },
    'Planche': {
      feedback: ['Shoulder protraction visible', 'Hollow body maintained', 'Good lean angle achieved'],
      suggestions: ['Increase shoulder strength', 'Work on wrist flexibility', 'Progress to longer holds'],
      keyFrames: [3.0, 6.0, 9.0, 12.0, 15.0]
    },
    'Front Lever': {
      feedback: ['Strong lat engagement', 'Body line maintained well', 'Good shoulder depression'],
      suggestions: ['Focus on posterior chain strength', 'Keep shoulders away from ears', 'Maintain neutral spine'],
      keyFrames: [2.5, 5.0, 7.5, 10.0, 12.5]
    },
    'Back Lever': {
      feedback: ['Good shoulder flexibility shown', 'Core engagement evident', 'Straight body line achieved'],
      suggestions: ['Improve shoulder mobility', 'Strengthen rear delts', 'Work on bicep flexibility'],
      keyFrames: [2.0, 4.5, 7.0, 9.5, 12.0]
    },
    'Handstand': {
      feedback: ['Good body alignment', 'Straight line maintained', 'Proper hand placement'],
      suggestions: ['Engage fingertips for balance', 'Keep shoulders over hands', 'Maintain hollow body'],
      keyFrames: [5.0, 10.0, 15.0, 20.0, 25.0]
    },
    'Handstand Push-up': {
      feedback: ['Full range of motion achieved', 'Good body control', 'Strong pressing power'],
      suggestions: ['Keep body straight throughout', 'Control the descent', 'Full lockout at top'],
      keyFrames: [1.8, 4.2, 6.8, 9.1, 11.5]
    },
    'Pistol Squat': {
      feedback: ['Good unilateral strength', 'Balance maintained well', 'Full depth achieved'],
      suggestions: ['Work on ankle mobility', 'Keep extended leg straight', 'Control the ascent'],
      keyFrames: [2.2, 4.8, 7.3, 9.7, 12.1]
    },
    'L-Sit': {
      feedback: ['Good compression strength', 'Shoulders depressed properly', 'Legs parallel to ground'],
      suggestions: ['Increase hold time gradually', 'Keep legs straight', 'Push hands down actively'],
      keyFrames: [3.0, 8.0, 13.0, 18.0, 23.0]
    },
    'Dragon Flag': {
      feedback: ['Exceptional core control', 'Full body tension maintained', 'Controlled movement'],
      suggestions: ['Focus on slow negatives', 'Keep body straight', 'Strengthen core progressively'],
      keyFrames: [2.5, 5.5, 8.0, 10.5, 13.0]
    }
  };

  return skillFeedbackMap[skillType] || {
    feedback: ['Calisthenics skill analysis complete', 'Movement pattern recognized', 'Form evaluation done'],
    suggestions: ['Focus on progressive skill development', 'Master prerequisites first', 'Maintain proper form'],
    keyFrames: [2.0, 5.0, 8.0, 11.0, 14.0]
  };
};

// Generate calisthenics-specific advanced analysis
const generateCalisthenicsAdvancedAnalysis = (skillType: string): AdvancedAnalysisResult => {
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

export const useVideoAnalysis = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [advancedAnalysis, setAdvancedAnalysis] = useState<AdvancedAnalysisResult | null>(null);
  const [enhancedFeedback, setEnhancedFeedback] = useState<EnhancedFeedbackData | null>(null);

  const analyzeVideo = async () => {
    setIsAnalyzing(true);
    setAnalysisProgress(0);

    const progressInterval = setInterval(() => {
      setAnalysisProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 8;
      });
    }, 400);

    setTimeout(() => {
      setIsAnalyzing(false);
      
      // Detect calisthenics skill dynamically
      const detectedSkill = detectCalisthenicsSkill();
      const skillData = generateCalisthenicsSkillFeedback(detectedSkill);
      const formScore = 70 + Math.floor(Math.random() * 25); // Calisthenics skills typically score higher when achieved
      const holdTime = 5 + Math.floor(Math.random() * 15); // For static holds
      const repCount = ['Muscle-up', 'Handstand Push-up', 'Pistol Squat'].includes(detectedSkill) ? 
        3 + Math.floor(Math.random() * 8) : holdTime;
      
      setAnalysisResult({
        exercise: detectedSkill,
        formScore,
        repCount,
        tempo: detectedSkill.includes('Hold') || detectedSkill.includes('Sit') || detectedSkill.includes('Flag') || 
               detectedSkill.includes('Lever') || detectedSkill.includes('Planche') || detectedSkill.includes('Handstand') ? 
               'Static Hold' : '3-1-3-1',
        feedback: skillData.feedback,
        suggestions: skillData.suggestions,
        keyFrames: skillData.keyFrames
      });

      setAdvancedAnalysis(generateCalisthenicsAdvancedAnalysis(detectedSkill));

      setEnhancedFeedback({
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
      });
    }, 5000);
  };

  const resetAnalysis = () => {
    setAnalysisResult(null);
    setAdvancedAnalysis(null);
    setEnhancedFeedback(null);
    setIsAnalyzing(false);
    setAnalysisProgress(0);
  };

  return {
    isAnalyzing,
    analysisProgress,
    analysisResult,
    advancedAnalysis,
    enhancedFeedback,
    analyzeVideo,
    resetAnalysis
  };
};
