
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, CheckCircle } from 'lucide-react';
import { AnalysisResult } from './types';

interface QuickAnalysisProps {
  isAnalyzing: boolean;
  analysisProgress: number;
  analysisResult: AnalysisResult | null;
}

const QuickAnalysis = ({ isAnalyzing, analysisProgress, analysisResult }: QuickAnalysisProps) => {
  const getFormScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getFormScoreBadge = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    return 'Needs Work';
  };

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white">Quick Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        {isAnalyzing && (
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-sm text-gray-400 mb-2">Performing comprehensive analysis...</div>
              <Progress value={analysisProgress} className="w-full" />
              <div className="text-xs text-gray-500 mt-1">{analysisProgress}% complete</div>
            </div>
          </div>
        )}

        {analysisResult && (
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-white">{analysisResult.exercise}</h3>
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                  {getFormScoreBadge(analysisResult.formScore)}
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-400">Form Score</div>
                  <div className={`text-2xl font-bold ${getFormScoreColor(analysisResult.formScore)}`}>
                    {analysisResult.formScore}/100
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Rep Count</div>
                  <div className="text-2xl font-bold text-white">{analysisResult.repCount}</div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-md font-medium text-white mb-3 flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                Quick Feedback
              </h4>
              <ul className="space-y-2">
                {analysisResult.feedback.slice(0, 2).map((item, index) => (
                  <li key={index} className="text-gray-300 text-sm flex items-start gap-2">
                    <span className="text-green-400 mt-1">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="text-sm text-gray-400">Tempo</div>
              <div className="text-lg font-medium text-white">{analysisResult.tempo}</div>
            </div>
          </div>
        )}

        {!isAnalyzing && !analysisResult && (
          <div className="text-center py-8">
            <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-400">Click "Comprehensive Analysis" to get detailed feedback</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default QuickAnalysis;
