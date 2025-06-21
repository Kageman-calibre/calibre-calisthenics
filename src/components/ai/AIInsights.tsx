
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain, TrendingUp, AlertTriangle, CheckCircle, Target, Zap } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/auth/AuthProvider';

interface AIInsight {
  id: string;
  type: 'strength' | 'recovery' | 'volume' | 'form' | 'progression';
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  recommendation: string;
  confidence: number;
  data_points: any;
}

const AIInsights = () => {
  const [insights, setInsights] = useState<AIInsight[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      generateInsights();
    }
  }, [user]);

  const generateInsights = async () => {
    if (!user) return;

    // Fetch recent data for analysis
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const { data: performanceData } = await supabase
      .from('exercise_performance')
      .select('*')
      .eq('user_id', user.id)
      .gte('performed_at', thirtyDaysAgo.toISOString());

    const { data: recoveryData } = await supabase
      .from('recovery_metrics')
      .select('*')
      .eq('user_id', user.id)
      .gte('date', thirtyDaysAgo.toISOString().split('T')[0]);

    const { data: workoutData } = await supabase
      .from('workout_sessions')
      .select('*')
      .eq('user_id', user.id)
      .gte('completed_at', thirtyDaysAgo.toISOString());

    // Generate AI insights based on data analysis
    const generatedInsights = analyzeData(performanceData || [], recoveryData || [], workoutData || []);
    setInsights(generatedInsights);
    setLoading(false);
  };

  const analyzeData = (performance: any[], recovery: any[], workouts: any[]): AIInsight[] => {
    const insights: AIInsight[] = [];

    // Strength progression analysis
    const exerciseGroups = performance.reduce((acc, item) => {
      if (!acc[item.exercise_name]) {
        acc[item.exercise_name] = [];
      }
      acc[item.exercise_name].push(item);
      return acc;
    }, {});

    Object.entries(exerciseGroups).forEach(([exercise, sessions]: [string, any[]]) => {
      if (sessions.length >= 3) {
        const weights = sessions.map(s => s.weights_used?.[0] || 0);
        const recentWeights = weights.slice(-3);
        const avgRecent = recentWeights.reduce((a, b) => a + b, 0) / recentWeights.length;
        const avgOlder = weights.slice(0, -3).reduce((a, b) => a + b, 0) / Math.max(weights.slice(0, -3).length, 1);

        if (avgRecent <= avgOlder) {
          insights.push({
            id: `strength-plateau-${exercise}`,
            type: 'strength',
            priority: 'high',
            title: `Strength Plateau in ${exercise}`,
            description: `Your strength gains have stagnated in ${exercise} over the last 3 sessions.`,
            recommendation: 'Consider deload week, form check, or exercise variation.',
            confidence: 85,
            data_points: { exercise, avgRecent, avgOlder }
          });
        }
      }
    });

    // Recovery analysis
    if (recovery.length >= 7) {
      const avgSleep = recovery.reduce((sum, r) => sum + (r.sleep_quality || 5), 0) / recovery.length;
      const avgStress = recovery.reduce((sum, r) => sum + (r.stress_level || 5), 0) / recovery.length;

      if (avgSleep < 6) {
        insights.push({
          id: 'poor-sleep',
          type: 'recovery',
          priority: 'high',
          title: 'Poor Sleep Quality Detected',
          description: `Your average sleep quality is ${avgSleep.toFixed(1)}/10 over the last week.`,
          recommendation: 'Focus on sleep hygiene: consistent bedtime, dark room, limit screens before bed.',
          confidence: 90,
          data_points: { avgSleep }
        });
      }

      if (avgStress > 7) {
        insights.push({
          id: 'high-stress',
          type: 'recovery',
          priority: 'medium',
          title: 'Elevated Stress Levels',
          description: `Your stress levels are averaging ${avgStress.toFixed(1)}/10.`,
          recommendation: 'Consider stress management techniques: meditation, yoga, or reducing training volume.',
          confidence: 80,
          data_points: { avgStress }
        });
      }
    }

    // Volume analysis
    if (workouts.length >= 4) {
      const totalVolume = workouts.reduce((sum, w) => sum + w.duration_minutes, 0);
      const avgDuration = totalVolume / workouts.length;

      if (avgDuration > 90) {
        insights.push({
          id: 'long-workouts',
          type: 'volume',
          priority: 'medium',
          title: 'Extended Workout Duration',
          description: `Your workouts average ${avgDuration.toFixed(0)} minutes.`,
          recommendation: 'Consider focusing on compound movements and reducing rest times for efficiency.',
          confidence: 75,
          data_points: { avgDuration }
        });
      }
    }

    // Form analysis
    const formRatings = performance.filter(p => p.form_rating).map(p => p.form_rating);
    if (formRatings.length >= 5) {
      const avgForm = formRatings.reduce((a, b) => a + b, 0) / formRatings.length;
      if (avgForm < 7) {
        insights.push({
          id: 'form-concern',
          type: 'form',
          priority: 'high',
          title: 'Form Quality Needs Attention',
          description: `Your self-reported form quality averages ${avgForm.toFixed(1)}/10.`,
          recommendation: 'Focus on technique over weight. Consider working with a trainer or reducing loads.',
          confidence: 85,
          data_points: { avgForm }
        });
      }
    }

    // Progressive overload analysis
    const difficultyRatings = performance.filter(p => p.difficulty_rating).map(p => p.difficulty_rating);
    if (difficultyRatings.length >= 5) {
      const recentDifficulty = difficultyRatings.slice(-5);
      const avgDifficulty = recentDifficulty.reduce((a, b) => a + b, 0) / recentDifficulty.length;
      
      if (avgDifficulty < 6) {
        insights.push({
          id: 'too-easy',
          type: 'progression',
          priority: 'medium',
          title: 'Workouts May Be Too Easy',
          description: `Your recent difficulty ratings average ${avgDifficulty.toFixed(1)}/10.`,
          recommendation: 'Increase weight, reps, or add more challenging variations to promote growth.',
          confidence: 80,
          data_points: { avgDifficulty }
        });
      } else if (avgDifficulty > 8.5) {
        insights.push({
          id: 'too-hard',
          type: 'progression',
          priority: 'high',
          title: 'Training Intensity Too High',
          description: `Your recent difficulty ratings average ${avgDifficulty.toFixed(1)}/10.`,
          recommendation: 'Consider reducing weight or volume to prevent overtraining and injury.',
          confidence: 85,
          data_points: { avgDifficulty }
        });
      }
    }

    return insights.sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'strength': return TrendingUp;
      case 'recovery': return Zap;
      case 'volume': return Target;
      case 'form': return AlertTriangle;
      case 'progression': return CheckCircle;
      default: return Brain;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'medium': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'low': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  if (loading) {
    return <div className="text-white">Analyzing your data...</div>;
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center space-x-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-2 mb-6">
          <Brain className="h-4 w-4 text-purple-400" />
          <span className="text-purple-400 text-sm font-medium">AI Insights</span>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
          Intelligent
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
            Training Insights
          </span>
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
          AI-powered analysis of your training data with personalized recommendations
        </p>
      </div>

      {/* Insights Grid */}
      {insights.length === 0 ? (
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="text-center py-12">
            <Brain className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">No Insights Available</h3>
            <p className="text-gray-400">
              Continue tracking your workouts and recovery to get personalized AI insights.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {insights.map((insight) => {
            const IconComponent = getInsightIcon(insight.type);
            return (
              <Card key={insight.id} className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <IconComponent className="h-6 w-6 text-purple-400" />
                      <div>
                        <CardTitle className="text-white text-lg">{insight.title}</CardTitle>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge className={getPriorityColor(insight.priority)}>
                            {insight.priority.toUpperCase()}
                          </Badge>
                          <span className="text-sm text-gray-400">
                            {insight.confidence}% confidence
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4">{insight.description}</p>
                  <div className="bg-slate-700/30 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-purple-400 mb-2">Recommendation</h4>
                    <p className="text-gray-300 text-sm">{insight.recommendation}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AIInsights;
