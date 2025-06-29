
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, AlertTriangle, TrendingUp, Target, Play, BookOpen } from 'lucide-react';

interface RealTimeFeedback {
  timestamp: number;
  message: string;
  type: 'correction' | 'encouragement' | 'warning';
  severity: 'low' | 'medium' | 'high';
}

interface ProgressiveRecommendation {
  currentLevel: string;
  nextLevel: string;
  requirements: string[];
  estimatedTimeframe: string;
  difficulty: number;
}

interface InjuryRiskAlert {
  risk: string;
  severity: 'low' | 'medium' | 'high';
  prevention: string[];
  immediateAction: string;
}

interface MovementComparison {
  userScore: number;
  idealScore: number;
  deviations: {
    phase: string;
    issue: string;
    correction: string;
  }[];
}

interface EnhancedFeedbackData {
  realTimeFeedback: RealTimeFeedback[];
  progressiveRecommendation: ProgressiveRecommendation;
  injuryRiskAlerts: InjuryRiskAlert[];
  movementComparison: MovementComparison;
  overallImprovement: {
    score: number;
    keyAreas: string[];
    priority: string;
  };
}

interface EnhancedFeedbackSystemProps {
  feedbackData: EnhancedFeedbackData;
  onPlayback?: (timestamp: number) => void;
}

const EnhancedFeedbackSystem = ({ feedbackData, onPlayback }: EnhancedFeedbackSystemProps) => {
  const [activeSection, setActiveSection] = useState<'realtime' | 'progression' | 'safety' | 'comparison'>('realtime');

  const getFeedbackIcon = (type: string) => {
    switch (type) {
      case 'correction':
        return <Target className="h-4 w-4 text-orange-400" />;
      case 'encouragement':
        return <CheckCircle className="h-4 w-4 text-green-400" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-red-400" />;
      default:
        return <Target className="h-4 w-4 text-gray-400" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low':
        return 'text-green-400';
      case 'medium':
        return 'text-yellow-400';
      case 'high':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  const formatTimestamp = (timestamp: number) => {
    const minutes = Math.floor(timestamp / 60);
    const seconds = Math.floor(timestamp % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-purple-400" />
          Enhanced Feedback System
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Section Navigation */}
        <div className="flex flex-wrap gap-2 mb-6">
          {[
            { id: 'realtime', label: 'Real-time Feedback', icon: Play },
            { id: 'progression', label: 'Progression', icon: TrendingUp },
            { id: 'safety', label: 'Safety Alerts', icon: AlertTriangle },
            { id: 'comparison', label: 'Ideal Comparison', icon: Target },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveSection(id as any)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                activeSection === id
                  ? 'bg-purple-500 text-white'
                  : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </div>

        {/* Real-time Feedback */}
        {activeSection === 'realtime' && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-white mb-4">Real-time Form Corrections</h3>
            <div className="max-h-64 overflow-y-auto space-y-3">
              {feedbackData.realTimeFeedback.map((feedback, index) => (
                <div key={index} className="bg-slate-700/30 rounded-lg p-3 flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">
                    {getFeedbackIcon(feedback.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-white text-sm font-medium">
                        {formatTimestamp(feedback.timestamp)}
                      </span>
                      <Badge className={`text-xs ${
                        feedback.type === 'correction' ? 'bg-orange-500/20 text-orange-400' :
                        feedback.type === 'encouragement' ? 'bg-green-500/20 text-green-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {feedback.type}
                      </Badge>
                    </div>
                    <p className="text-gray-300 text-sm">{feedback.message}</p>
                    {onPlayback && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onPlayback(feedback.timestamp)}
                        className="mt-2 h-6 px-2 text-xs"
                      >
                        <Play className="h-3 w-3 mr-1" />
                        View
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Progressive Recommendations */}
        {activeSection === 'progression' && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-white mb-4">Progression Recommendations</h3>
            <div className="bg-slate-700/30 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-white font-medium">Current Level</p>
                  <p className="text-blue-400">{feedbackData.progressiveRecommendation.currentLevel}</p>
                </div>
                <div className="text-right">
                  <p className="text-white font-medium">Next Target</p>
                  <p className="text-green-400">{feedbackData.progressiveRecommendation.nextLevel}</p>
                </div>
              </div>
              
              <div className="mb-4">
                <p className="text-white font-medium mb-2">Difficulty Level</p>
                <Progress value={feedbackData.progressiveRecommendation.difficulty} className="mb-1" />
                <p className="text-gray-400 text-sm">{feedbackData.progressiveRecommendation.difficulty}/100</p>
              </div>

              <div className="mb-4">
                <p className="text-white font-medium mb-2">Requirements to Progress:</p>
                <ul className="space-y-1">
                  {feedbackData.progressiveRecommendation.requirements.map((req, index) => (
                    <li key={index} className="text-gray-300 text-sm flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="text-center">
                <p className="text-gray-400 text-sm">Estimated timeframe</p>
                <p className="text-white font-bold">{feedbackData.progressiveRecommendation.estimatedTimeframe}</p>
              </div>
            </div>
          </div>
        )}

        {/* Safety Alerts */}
        {activeSection === 'safety' && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-white mb-4">Injury Risk Alerts</h3>
            {feedbackData.injuryRiskAlerts.map((alert, index) => (
              <div key={index} className="bg-slate-700/30 rounded-lg p-4 border-l-4 border-red-500">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-white font-medium">{alert.risk}</p>
                  <Badge className={`${
                    alert.severity === 'high' ? 'bg-red-500/20 text-red-400' :
                    alert.severity === 'medium' ? 'bg-orange-500/20 text-orange-400' :
                    'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {alert.severity} risk
                  </Badge>
                </div>
                
                <div className="mb-3">
                  <p className="text-red-400 font-medium text-sm mb-1">Immediate Action:</p>
                  <p className="text-gray-300 text-sm">{alert.immediateAction}</p>
                </div>

                <div>
                  <p className="text-white font-medium text-sm mb-2">Prevention Tips:</p>
                  <ul className="space-y-1">
                    {alert.prevention.map((tip, tipIndex) => (
                      <li key={tipIndex} className="text-gray-300 text-sm flex items-start gap-2">
                        <BookOpen className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Movement Comparison */}
        {activeSection === 'comparison' && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-white mb-4">Ideal Movement Comparison</h3>
            
            <div className="bg-slate-700/30 rounded-lg p-4 mb-4">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center">
                  <p className="text-gray-400 text-sm">Your Score</p>
                  <p className="text-white text-2xl font-bold">{feedbackData.movementComparison.userScore}/100</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-400 text-sm">Ideal Score</p>
                  <p className="text-green-400 text-2xl font-bold">{feedbackData.movementComparison.idealScore}/100</p>
                </div>
              </div>
              <Progress 
                value={(feedbackData.movementComparison.userScore / feedbackData.movementComparison.idealScore) * 100} 
                className="mb-2" 
              />
              <p className="text-center text-gray-400 text-sm">
                {Math.round((feedbackData.movementComparison.userScore / feedbackData.movementComparison.idealScore) * 100)}% of ideal form
              </p>
            </div>

            <div>
              <p className="text-white font-medium mb-3">Movement Phase Analysis:</p>
              <div className="space-y-3">
                {feedbackData.movementComparison.deviations.map((deviation, index) => (
                  <div key={index} className="bg-slate-700/30 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-medium text-sm">{deviation.phase}</span>
                      <AlertTriangle className="h-4 w-4 text-orange-400" />
                    </div>
                    <p className="text-gray-300 text-sm mb-2">
                      <span className="text-red-400">Issue:</span> {deviation.issue}
                    </p>
                    <p className="text-gray-300 text-sm">
                      <span className="text-green-400">Correction:</span> {deviation.correction}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Overall Improvement Summary */}
        <div className="mt-6 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-lg p-4">
          <h4 className="text-white font-medium mb-3 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-purple-400" />
            Overall Improvement Score
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-purple-400 text-2xl font-bold">{feedbackData.overallImprovement.score}/100</p>
              <p className="text-gray-400 text-sm">Improvement Score</p>
            </div>
            <div>
              <p className="text-white font-medium text-sm mb-2">Key Focus Areas:</p>
              <ul className="space-y-1">
                {feedbackData.overallImprovement.keyAreas.map((area, index) => (
                  <li key={index} className="text-gray-300 text-xs">• {area}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-white font-medium text-sm">Top Priority:</p>
              <p className="text-blue-400 text-sm font-medium">{feedbackData.overallImprovement.priority}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedFeedbackSystem;
