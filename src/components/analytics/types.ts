
export interface AnalysisResult {
  exercise: string;
  formScore: number;
  repCount: number;
  tempo: string;
  feedback: string[];
  suggestions: string[];
  keyFrames: number[];
}

export interface AdvancedAnalysisResult {
  jointAngles: Array<{
    joint: string;
    angle: number;
    idealRange: [number, number];
    status: 'good' | 'warning' | 'poor';
  }>;
  movementSymmetry: {
    leftSide: number;
    rightSide: number;
    asymmetryPercentage: number;
    status: 'balanced' | 'slight' | 'significant';
  };
  rangeOfMotion: Array<{
    exercise: string;
    achieved: number;
    optimal: number;
    percentage: number;
  }>;
  movementVelocity: {
    concentric: number;
    eccentric: number;
    optimal: boolean;
  };
  injuryRisk: {
    level: 'low' | 'moderate' | 'high';
    factors: string[];
    score: number;
  };
}

export interface EnhancedFeedbackData {
  realTimeFeedback: Array<{
    timestamp: number;
    message: string;
    type: 'correction' | 'encouragement' | 'warning';
    severity: 'low' | 'medium' | 'high';
  }>;
  progressiveRecommendation: {
    currentLevel: string;
    nextLevel: string;
    requirements: string[];
    estimatedTimeframe: string;
    difficulty: number;
  };
  injuryRiskAlerts: Array<{
    risk: string;
    severity: 'low' | 'medium' | 'high';
    prevention: string[];
    immediateAction: string;
  }>;
  movementComparison: {
    userScore: number;
    idealScore: number;
    deviations: Array<{
      phase: string;
      issue: string;
      correction: string;
    }>;
  };
  overallImprovement: {
    score: number;
    keyAreas: string[];
    priority: string;
  };
}
