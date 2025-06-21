
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Crystal, TrendingUp, Target, Calendar, Award } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/auth/AuthProvider';

interface Prediction {
  id: string;
  type: 'strength' | 'weight_loss' | 'endurance' | 'skill';
  title: string;
  description: string;
  timeline: string;
  probability: number;
  target_value: number;
  current_value: number;
  prediction_data: any[];
}

const PredictiveAnalytics = () => {
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      generatePredictions();
    }
  }, [user]);

  const generatePredictions = async () => {
    if (!user) return;

    // Fetch historical data for predictions
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const { data: performanceData } = await supabase
      .from('exercise_performance')
      .select('*')
      .eq('user_id', user.id)
      .gte('performed_at', sixMonthsAgo.toISOString())
      .order('performed_at', { ascending: true });

    const { data: workoutData } = await supabase
      .from('workout_sessions')
      .select('*')
      .eq('user_id', user.id)
      .gte('completed_at', sixMonthsAgo.toISOString())
      .order('completed_at', { ascending: true });

    // Generate predictions based on trends
    const generatedPredictions = createPredictions(performanceData || [], workoutData || []);
    setPredictions(generatedPredictions);
    setLoading(false);
  };

  const createPredictions = (performance: any[], workouts: any[]): Prediction[] => {
    const predictions: Prediction[] = [];

    // Strength progression predictions
    const exerciseGroups = performance.reduce((acc, item) => {
      if (!acc[item.exercise_name]) {
        acc[item.exercise_name] = [];
      }
      acc[item.exercise_name].push(item);
      return acc;
    }, {});

    Object.entries(exerciseGroups).forEach(([exercise, sessions]: [string, any[]]) => {
      if (sessions.length >= 8) {
        const weights = sessions.map((s, index) => ({
          week: index + 1,
          weight: s.weights_used?.[0] || 0,
          date: new Date(s.performed_at)
        }));

        // Calculate linear regression for trend
        const { slope, intercept } = calculateLinearRegression(weights.map((w, i) => ({ x: i, y: w.weight })));
        
        if (slope > 0) {
          const currentWeight = weights[weights.length - 1].weight;
          const predicted12Week = currentWeight + (slope * 12);
          const predicted24Week = currentWeight + (slope * 24);

          // Generate prediction data points
          const predictionData = [];
          for (let i = 0; i <= 24; i += 2) {
            predictionData.push({
              week: weights.length + i,
              actual: i === 0 ? currentWeight : null,
              predicted: currentWeight + (slope * i),
              date: new Date(Date.now() + (i * 7 * 24 * 60 * 60 * 1000)).toLocaleDateString()
            });
          }

          predictions.push({
            id: `strength-${exercise}`,
            type: 'strength',
            title: `${exercise} Strength Prediction`,
            description: `Based on your current progression rate, you could reach ${predicted12Week.toFixed(1)}kg in 12 weeks.`,
            timeline: '12 weeks',
            probability: Math.min(85, 60 + (slope * 10)),
            target_value: predicted12Week,
            current_value: currentWeight,
            prediction_data: predictionData
          });
        }
      }
    });

    // Workout consistency predictions
    if (workouts.length >= 12) {
      const weeklyWorkouts = groupWorkoutsByWeek(workouts);
      const avgWeeklyWorkouts = Object.values(weeklyWorkouts).reduce((a: number, b: number) => a + b, 0) / Object.keys(weeklyWorkouts).length;
      
      const predictedYearlyWorkouts = avgWeeklyWorkouts * 52;
      const currentYearlyPace = (workouts.length / (workouts.length / avgWeeklyWorkouts)) * 52;

      predictions.push({
        id: 'workout-consistency',
        type: 'endurance',
        title: 'Annual Workout Prediction',
        description: `At your current pace, you'll complete ${Math.round(predictedYearlyWorkouts)} workouts this year.`,
        timeline: '1 year',
        probability: 75,
        target_value: predictedYearlyWorkouts,
        current_value: workouts.length,
        prediction_data: generateWorkoutPredictionData(avgWeeklyWorkouts)
      });
    }

    // Milestone predictions
    const totalWorkouts = workouts.length;
    const milestonesLeft = [50, 100, 200, 365, 500, 1000].filter(m => m > totalWorkouts);
    
    if (milestonesLeft.length > 0 && workouts.length >= 4) {
      const nextMilestone = milestonesLeft[0];
      const workoutsNeeded = nextMilestone - totalWorkouts;
      const avgWorkoutsPerWeek = workouts.length >= 8 ? 
        workouts.slice(-8).length / 8 * 7 : 
        workouts.length / Math.max(1, Math.ceil(workouts.length / 4));
      
      const weeksToMilestone = workoutsNeeded / Math.max(avgWorkoutsPerWeek, 0.5);

      predictions.push({
        id: `milestone-${nextMilestone}`,
        type: 'skill',
        title: `${nextMilestone} Workout Milestone`,
        description: `You're ${workoutsNeeded} workouts away from ${nextMilestone} total workouts.`,
        timeline: `${Math.ceil(weeksToMilestone)} weeks`,
        probability: Math.min(90, 50 + (avgWorkoutsPerWeek * 10)),
        target_value: nextMilestone,
        current_value: totalWorkouts,
        prediction_data: generateMilestonePredictionData(totalWorkouts, nextMilestone, avgWorkoutsPerWeek)
      });
    }

    return predictions.sort((a, b) => b.probability - a.probability);
  };

  const calculateLinearRegression = (data: { x: number; y: number }[]) => {
    const n = data.length;
    const sumX = data.reduce((sum, point) => sum + point.x, 0);
    const sumY = data.reduce((sum, point) => sum + point.y, 0);
    const sumXY = data.reduce((sum, point) => sum + point.x * point.y, 0);
    const sumXX = data.reduce((sum, point) => sum + point.x * point.x, 0);

    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;

    return { slope, intercept };
  };

  const groupWorkoutsByWeek = (workouts: any[]) => {
    return workouts.reduce((acc, workout) => {
      const week = new Date(workout.completed_at).toISOString().substr(0, 10);
      acc[week] = (acc[week] || 0) + 1;
      return acc;
    }, {});
  };

  const generateWorkoutPredictionData = (avgWeeklyWorkouts: number) => {
    const data = [];
    let cumulative = 0;
    for (let week = 1; week <= 52; week++) {
      cumulative += avgWeeklyWorkouts;
      data.push({
        week,
        predicted: Math.round(cumulative),
        date: new Date(Date.now() + (week * 7 * 24 * 60 * 60 * 1000)).toLocaleDateString()
      });
    }
    return data.filter((_, index) => index % 4 === 0); // Show every 4th week
  };

  const generateMilestonePredictionData = (current: number, target: number, weeklyRate: number) => {
    const data = [];
    let cumulative = current;
    let week = 0;
    
    while (cumulative < target && week < 104) { // Max 2 years
      week++;
      cumulative += weeklyRate;
      if (week % 2 === 0) { // Every 2 weeks
        data.push({
          week,
          predicted: Math.round(cumulative),
          target: cumulative >= target ? target : null,
          date: new Date(Date.now() + (week * 7 * 24 * 60 * 60 * 1000)).toLocaleDateString()
        });
      }
    }
    return data;
  };

  const getPredictionIcon = (type: string) => {
    switch (type) {
      case 'strength': return TrendingUp;
      case 'endurance': return Target;
      case 'skill': return Award;
      default: return Crystal;
    }
  };

  const getProbabilityColor = (probability: number) => {
    if (probability >= 80) return 'bg-green-500/20 text-green-400 border-green-500/30';
    if (probability >= 60) return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
    return 'bg-red-500/20 text-red-400 border-red-500/30';
  };

  if (loading) {
    return <div className="text-white">Generating predictions...</div>;
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center space-x-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full px-4 py-2 mb-6">
          <Crystal className="h-4 w-4 text-cyan-400" />
          <span className="text-cyan-400 text-sm font-medium">Predictive Analytics</span>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
          Future
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            Performance Predictions
          </span>
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
          AI-powered predictions based on your training patterns and progress trends
        </p>
      </div>

      {/* Predictions Grid */}
      {predictions.length === 0 ? (
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="text-center py-12">
            <Crystal className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">No Predictions Available</h3>
            <p className="text-gray-400">
              Keep tracking your workouts to get personalized performance predictions.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-8">
          {predictions.map((prediction) => {
            const IconComponent = getPredictionIcon(prediction.type);
            return (
              <Card key={prediction.id} className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <IconComponent className="h-6 w-6 text-cyan-400" />
                      <div>
                        <CardTitle className="text-white text-lg">{prediction.title}</CardTitle>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge className={getProbabilityColor(prediction.probability)}>
                            {prediction.probability}% likely
                          </Badge>
                          <div className="flex items-center text-sm text-gray-400">
                            <Calendar className="h-3 w-3 mr-1" />
                            {prediction.timeline}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-gray-300">{prediction.description}</p>
                  
                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Current: {prediction.current_value.toFixed(1)}</span>
                      <span className="text-cyan-400">Target: {prediction.target_value.toFixed(1)}</span>
                    </div>
                    <div className="bg-slate-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                        style={{ 
                          width: `${Math.min((prediction.current_value / prediction.target_value) * 100, 100)}%` 
                        }}
                      />
                    </div>
                  </div>

                  {/* Prediction Chart */}
                  {prediction.prediction_data.length > 0 && (
                    <div className="bg-slate-700/30 rounded-lg p-4">
                      <h4 className="text-sm font-medium text-cyan-400 mb-4">Predicted Progress</h4>
                      <ResponsiveContainer width="100%" height={200}>
                        <LineChart data={prediction.prediction_data}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                          <XAxis dataKey="week" stroke="#9CA3AF" />
                          <YAxis stroke="#9CA3AF" />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: '#1F2937', 
                              border: '1px solid #374151',
                              borderRadius: '8px'
                            }}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="predicted" 
                            stroke="#06B6D4" 
                            strokeWidth={2}
                            strokeDasharray="5 5"
                          />
                          {prediction.prediction_data[0]?.actual && (
                            <Line 
                              type="monotone" 
                              dataKey="actual" 
                              stroke="#10B981" 
                              strokeWidth={2}
                            />
                          )}
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default PredictiveAnalytics;
