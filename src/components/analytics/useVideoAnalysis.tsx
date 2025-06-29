
import { useState } from 'react';
import { AnalysisResult, AdvancedAnalysisResult, EnhancedFeedbackData } from './types';

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
      
      setAnalysisResult({
        exercise: 'Dips',
        formScore: 78,
        repCount: 12,
        tempo: '2-1-2-1',
        feedback: [
          'Good depth on most repetitions',
          'Slight forward lean detected',
          'Consistent tempo maintained'
        ],
        suggestions: [
          'Focus on keeping torso more upright',
          'Ensure full lockout at the top',
          'Control the descent more slowly'
        ],
        keyFrames: [2.5, 5.1, 7.8, 10.2, 12.9]
      });

      setAdvancedAnalysis({
        jointAngles: [
          { joint: 'Shoulder', angle: 165, idealRange: [160, 180], status: 'good' },
          { joint: 'Elbow', angle: 140, idealRange: [90, 160], status: 'good' },
          { joint: 'Hip', angle: 175, idealRange: [170, 180], status: 'warning' },
          { joint: 'Knee', angle: 178, idealRange: [175, 180], status: 'good' }
        ],
        movementSymmetry: {
          leftSide: 85,
          rightSide: 92,
          asymmetryPercentage: 8.2,
          status: 'slight'
        },
        rangeOfMotion: [
          { exercise: 'Dip Descent', achieved: 145, optimal: 160, percentage: 91 },
          { exercise: 'Full Extension', achieved: 175, optimal: 180, percentage: 97 }
        ],
        movementVelocity: {
          concentric: 1.8,
          eccentric: 2.2,
          optimal: true
        },
        injuryRisk: {
          level: 'low',
          factors: ['Slight forward lean', 'Minor asymmetry detected'],
          score: 25
        }
      });

      setEnhancedFeedback({
        realTimeFeedback: [
          { timestamp: 3.2, message: 'Maintain upright torso position', type: 'correction', severity: 'medium' },
          { timestamp: 6.8, message: 'Excellent depth achieved!', type: 'encouragement', severity: 'low' },
          { timestamp: 9.1, message: 'Control the descent more slowly', type: 'correction', severity: 'low' },
          { timestamp: 11.5, message: 'Good lockout at the top', type: 'encouragement', severity: 'low' },
          { timestamp: 14.2, message: 'Watch for forward lean', type: 'warning', severity: 'medium' }
        ],
        progressiveRecommendation: {
          currentLevel: 'Intermediate Dips',
          nextLevel: 'Weighted Dips (5kg)',
          requirements: [
            'Achieve 15 perfect form reps',
            'Eliminate forward lean completely',
            'Maintain 2-second controlled descent'
          ],
          estimatedTimeframe: '2-3 weeks',
          difficulty: 72
        },
        injuryRiskAlerts: [
          {
            risk: 'Shoulder Impingement Risk',
            severity: 'low',
            prevention: [
              'Warm up shoulders thoroughly',
              'Focus on scapular stability',
              'Avoid excessive forward lean'
            ],
            immediateAction: 'Reduce range of motion if shoulder pain occurs'
          }
        ],
        movementComparison: {
          userScore: 78,
          idealScore: 95,
          deviations: [
            {
              phase: 'Descent Phase',
              issue: 'Slight forward lean detected',
              correction: 'Engage core and maintain vertical torso'
            },
            {
              phase: 'Bottom Position',
              issue: 'Inconsistent depth across reps',
              correction: 'Aim for shoulders level with elbows'
            }
          ]
        },
        overallImprovement: {
          score: 82,
          keyAreas: ['Torso Position', 'Movement Consistency', 'Tempo Control'],
          priority: 'Eliminate forward lean'
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
