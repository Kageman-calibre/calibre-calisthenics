
import { useState } from 'react';
import { AnalysisResult, AdvancedAnalysisResult, EnhancedFeedbackData } from './types';

// Simple workout detection based on movement patterns (mock implementation)
const detectWorkoutType = (): string => {
  const workoutTypes = [
    'Push-ups', 'Pull-ups', 'Squats', 'Dips', 'Lunges', 
    'Burpees', 'Mountain Climbers', 'Plank', 'Jumping Jacks',
    'Deadlifts', 'Bench Press', 'Overhead Press', 'Rows'
  ];
  return workoutTypes[Math.floor(Math.random() * workoutTypes.length)];
};

// Generate workout-specific feedback based on exercise type
const generateWorkoutFeedback = (exerciseType: string) => {
  const feedbackMap: Record<string, { feedback: string[], suggestions: string[], keyFrames: number[] }> = {
    'Push-ups': {
      feedback: ['Good arm positioning', 'Consistent tempo maintained', 'Full range of motion achieved'],
      suggestions: ['Keep core more engaged', 'Ensure full extension at top', 'Control the descent'],
      keyFrames: [1.2, 3.5, 5.8, 8.1, 10.4]
    },
    'Pull-ups': {
      feedback: ['Strong pull phase', 'Good chin clearance', 'Controlled descent'],
      suggestions: ['Avoid swinging', 'Full arm extension at bottom', 'Engage lats more'],
      keyFrames: [2.1, 4.8, 7.2, 9.6, 12.3]
    },
    'Squats': {
      feedback: ['Good depth achieved', 'Knees tracking well', 'Upright torso maintained'],
      suggestions: ['Drive through heels', 'Keep chest up', 'Control the tempo'],
      keyFrames: [1.8, 4.2, 6.9, 9.3, 11.7]
    },
    'Dips': {
      feedback: ['Good depth on most repetitions', 'Slight forward lean detected', 'Consistent tempo maintained'],
      suggestions: ['Focus on keeping torso more upright', 'Ensure full lockout at the top', 'Control the descent more slowly'],
      keyFrames: [2.5, 5.1, 7.8, 10.2, 12.9]
    },
    'Lunges': {
      feedback: ['Good step distance', 'Proper knee alignment', 'Balanced execution'],
      suggestions: ['Keep front knee over ankle', 'Lower back knee closer to ground', 'Maintain upright posture'],
      keyFrames: [1.5, 3.8, 6.1, 8.4, 10.7]
    },
    'Burpees': {
      feedback: ['Explosive jump phase', 'Smooth transitions', 'Full push-up depth'],
      suggestions: ['Land softly on jump', 'Keep push-up form tight', 'Maintain rhythm'],
      keyFrames: [2.0, 4.5, 7.0, 9.5, 12.0]
    },
    'Mountain Climbers': {
      feedback: ['High plank position maintained', 'Good alternating rhythm', 'Core engagement visible'],
      suggestions: ['Keep hips level', 'Drive knees higher', 'Maintain hand position'],
      keyFrames: [1.0, 2.5, 4.0, 5.5, 7.0]
    },
    'Plank': {
      feedback: ['Straight body line maintained', 'Good shoulder stability', 'Consistent hold'],
      suggestions: ['Engage glutes more', 'Breathe normally', 'Keep neck neutral'],
      keyFrames: [5.0, 15.0, 30.0, 45.0, 60.0]
    }
  };

  return feedbackMap[exerciseType] || {
    feedback: ['Form analysis complete', 'Movement pattern recognized', 'Technique evaluation done'],
    suggestions: ['Focus on controlled movement', 'Maintain proper form', 'Keep consistent tempo'],
    keyFrames: [2.0, 4.5, 7.0, 9.5, 12.0]
  };
};

// Generate advanced analysis based on exercise type
const generateAdvancedAnalysis = (exerciseType: string): AdvancedAnalysisResult => {
  const baseAnalysis = {
    movementSymmetry: {
      leftSide: 82 + Math.floor(Math.random() * 15),
      rightSide: 85 + Math.floor(Math.random() * 15),
      asymmetryPercentage: 5 + Math.floor(Math.random() * 10),
      status: 'slight' as const
    },
    movementVelocity: {
      concentric: 1.5 + Math.random(),
      eccentric: 1.8 + Math.random(),
      optimal: Math.random() > 0.3
    },
    injuryRisk: {
      level: 'low' as const,
      factors: ['Minor form deviation detected'],
      score: 15 + Math.floor(Math.random() * 20)
    }
  };

  const exerciseSpecificAnalysis: Record<string, any> = {
    'Push-ups': {
      jointAngles: [
        { joint: 'Shoulder', angle: 160 + Math.floor(Math.random() * 20), idealRange: [150, 180], status: 'good' },
        { joint: 'Elbow', angle: 90 + Math.floor(Math.random() * 30), idealRange: [90, 160], status: 'good' },
        { joint: 'Wrist', angle: 170 + Math.floor(Math.random() * 10), idealRange: [165, 180], status: 'good' }
      ],
      rangeOfMotion: [
        { exercise: 'Push-up Descent', achieved: 140 + Math.floor(Math.random() * 20), optimal: 160, percentage: 88 + Math.floor(Math.random() * 10) },
        { exercise: 'Full Extension', achieved: 175 + Math.floor(Math.random() * 5), optimal: 180, percentage: 95 + Math.floor(Math.random() * 5) }
      ]
    },
    'Pull-ups': {
      jointAngles: [
        { joint: 'Shoulder', angle: 170 + Math.floor(Math.random() * 10), idealRange: [160, 180], status: 'good' },
        { joint: 'Elbow', angle: 30 + Math.floor(Math.random() * 20), idealRange: [20, 40], status: 'good' },
        { joint: 'Lat Engagement', angle: 145 + Math.floor(Math.random() * 15), idealRange: [140, 160], status: 'good' }
      ],
      rangeOfMotion: [
        { exercise: 'Pull Phase', achieved: 155 + Math.floor(Math.random() * 15), optimal: 170, percentage: 90 + Math.floor(Math.random() * 8) },
        { exercise: 'Full Extension', achieved: 178 + Math.floor(Math.random() * 2), optimal: 180, percentage: 98 + Math.floor(Math.random() * 2) }
      ]
    },
    'Squats': {
      jointAngles: [
        { joint: 'Hip', angle: 85 + Math.floor(Math.random() * 20), idealRange: [80, 100], status: 'good' },
        { joint: 'Knee', angle: 90 + Math.floor(Math.random() * 15), idealRange: [85, 105], status: 'good' },
        { joint: 'Ankle', angle: 75 + Math.floor(Math.random() * 10), idealRange: [70, 85], status: 'good' }
      ],
      rangeOfMotion: [
        { exercise: 'Squat Depth', achieved: 95 + Math.floor(Math.random() * 15), optimal: 110, percentage: 85 + Math.floor(Math.random() * 10) },
        { exercise: 'Hip Extension', achieved: 172 + Math.floor(Math.random() * 8), optimal: 180, percentage: 94 + Math.floor(Math.random() * 6) }
      ]
    }
  };

  return {
    ...baseAnalysis,
    ...(exerciseSpecificAnalysis[exerciseType] || exerciseSpecificAnalysis['Push-ups'])
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
      
      // Detect workout type dynamically
      const detectedExercise = detectWorkoutType();
      const workoutData = generateWorkoutFeedback(detectedExercise);
      const formScore = 65 + Math.floor(Math.random() * 30); // Random score between 65-95
      const repCount = 8 + Math.floor(Math.random() * 12); // Random reps between 8-20
      
      setAnalysisResult({
        exercise: detectedExercise,
        formScore,
        repCount,
        tempo: '2-1-2-1',
        feedback: workoutData.feedback,
        suggestions: workoutData.suggestions,
        keyFrames: workoutData.keyFrames
      });

      setAdvancedAnalysis(generateAdvancedAnalysis(detectedExercise));

      setEnhancedFeedback({
        realTimeFeedback: [
          { timestamp: 3.2, message: `Good ${detectedExercise.toLowerCase()} form`, type: 'encouragement', severity: 'low' },
          { timestamp: 6.8, message: 'Maintain consistent tempo', type: 'correction', severity: 'medium' },
          { timestamp: 9.1, message: 'Excellent range of motion!', type: 'encouragement', severity: 'low' },
          { timestamp: 11.5, message: 'Keep core engaged', type: 'correction', severity: 'low' },
          { timestamp: 14.2, message: 'Strong finish!', type: 'encouragement', severity: 'low' }
        ],
        progressiveRecommendation: {
          currentLevel: `Intermediate ${detectedExercise}`,
          nextLevel: `Advanced ${detectedExercise} Variations`,
          requirements: [
            'Achieve perfect form consistency',
            'Increase rep count by 25%',
            'Master tempo control'
          ],
          estimatedTimeframe: '2-4 weeks',
          difficulty: 60 + Math.floor(Math.random() * 30)
        },
        injuryRiskAlerts: [
          {
            risk: 'Form Breakdown Risk',
            severity: 'low',
            prevention: [
              'Focus on quality over quantity',
              'Take adequate rest between sets',
              'Progress gradually'
            ],
            immediateAction: 'Reduce intensity if form deteriorates'
          }
        ],
        movementComparison: {
          userScore: formScore,
          idealScore: 95,
          deviations: [
            {
              phase: 'Movement Phase',
              issue: 'Minor form inconsistency detected',
              correction: `Focus on ${detectedExercise.toLowerCase()} technique`
            }
          ]
        },
        overallImprovement: {
          score: formScore + 5,
          keyAreas: ['Form Consistency', 'Movement Control', 'Tempo Regulation'],
          priority: 'Maintain proper technique'
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
