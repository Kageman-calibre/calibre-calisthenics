
import { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Calendar, Target, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/auth/AuthProvider';

interface WorkoutAnalytics {
  totalVolume: number;
  avgIntensity: number;
  consistencyScore: number;
  topExercises: Array<{
    exercise_name: string;
    total_sets: number;
    avg_weight: number;
    improvement: number;
  }>;
  weeklyProgress: Array<{
    week: string;
    workouts: number;
    volume: number;
  }>;
}

const WorkoutAnalytics = () => {
  const [analytics, setAnalytics] = useState<WorkoutAnalytics | null>(null);
  const [timeframe, setTimeframe] = useState<'week' | 'month' | 'quarter'>('month');
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      calculateAnalytics();
    }
  }, [user, timeframe]);

  const calculateAnalytics = async () => {
    if (!user) return;

    const daysBack = timeframe === 'week' ? 7 : timeframe === 'month' ? 30 : 90;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - daysBack);

    // Get workout sessions
    const { data: sessions } = await supabase
      .from('workout_sessions')
      .select('*')
      .eq('user_id', user.id)
      .gte('completed_at', startDate.toISOString());

    // Get exercise performance
    const { data: performance } = await supabase
      .from('exercise_performance')
      .select('*')
      .eq('user_id', user.id)
      .gte('performed_at', startDate.toISOString());

    if (sessions && performance) {
      const analytics = processAnalytics(sessions, performance, daysBack);
      setAnalytics(analytics);
    }

    setLoading(false);
  };

  const processAnalytics = (sessions: any[], performance: any[], daysBack: number): WorkoutAnalytics => {
    // Calculate total volume (sets × reps × weight)
    const totalVolume = performance.reduce((sum, p) => {
      const setVolume = p.reps_completed.reduce((setSum: number, reps: number, index: number) => {
        return setSum + (reps * (p.weights_used[index] || 0));
      }, 0);
      return sum + setVolume;
    }, 0);

    // Calculate average intensity (average difficulty rating)
    const avgIntensity = performance.length > 0 
      ? performance.reduce((sum, p) => sum + p.difficulty_rating, 0) / performance.length
      : 0;

    // Calculate consistency score (workouts per week)
    const weeksInPeriod = Math.ceil(daysBack / 7);
    const consistencyScore = Math.min((sessions.length / weeksInPeriod) * 25, 100);

    // Get top exercises by frequency and improvement
    const exerciseStats = performance.reduce((stats: any, p) => {
      if (!stats[p.exercise_name]) {
        stats[p.exercise_name] = {
          exercise_name: p.exercise_name,
          performances: [],
          total_sets: 0
        };
      }
      stats[p.exercise_name].performances.push(p);
      stats[p.exercise_name].total_sets += p.sets_completed;
      return stats;
    }, {});

    const topExercises = Object.values(exerciseStats)
      .map((stat: any) => {
        const performances = stat.performances.sort((a: any, b: any) => 
          new Date(a.performed_at).getTime() - new Date(b.performed_at).getTime()
        );
        
        const firstWeight = performances[0]?.weights_used[0] || 0;
        const lastWeight = performances[performances.length - 1]?.weights_used[0] || 0;
        const improvement = firstWeight > 0 ? ((lastWeight - firstWeight) / firstWeight) * 100 : 0;
        
        const avgWeight = performances.reduce((sum: number, p: any) => 
          sum + (p.weights_used[0] || 0), 0) / performances.length;

        return {
          exercise_name: stat.exercise_name,
          total_sets: stat.total_sets,
          avg_weight: Math.round(avgWeight * 10) / 10,
          improvement: Math.round(improvement * 10) / 10
        };
      })
      .sort((a, b) => b.total_sets - a.total_sets)
      .slice(0, 5);

    // Calculate weekly progress
    const weeklyProgress = [];
    for (let i = 0; i < weeksInPeriod; i++) {
      const weekStart = new Date();
      weekStart.setDate(weekStart.getDate() - (i * 7) - 6);
      const weekEnd = new Date();
      weekEnd.setDate(weekEnd.getDate() - (i * 7));

      const weekSessions = sessions.filter(s => {
        const sessionDate = new Date(s.completed_at);
        return sessionDate >= weekStart && sessionDate <= weekEnd;
      });

      const weekPerformance = performance.filter(p => {
        const perfDate = new Date(p.performed_at);
        return perfDate >= weekStart && perfDate <= weekEnd;
      });

      const weekVolume = weekPerformance.reduce((sum, p) => {
        const setVolume = p.reps_completed.reduce((setSum: number, reps: number, index: number) => {
          return setSum + (reps * (p.weights_used[index] || 0));
        }, 0);
        return sum + setVolume;
      }, 0);

      weeklyProgress.unshift({
        week: `Week ${i + 1}`,
        workouts: weekSessions.length,
        volume: weekVolume
      });
    }

    return {
      totalVolume: Math.round(totalVolume),
      avgIntensity: Math.round(avgIntensity * 10) / 10,
      consistencyScore: Math.round(consistencyScore),
      topExercises,
      weeklyProgress
    };
  };

  if (loading) {
    return <div className="text-white">Loading analytics...</div>;
  }

  if (!analytics) {
    return (
      <Card className="bg-slate-800/50 border-slate-700">
        <CardContent className="pt-6 text-center">
          <p className="text-gray-400">No workout data available for analysis</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Timeframe Selector */}
      <div className="flex gap-2">
        {(['week', 'month', 'quarter'] as const).map((period) => (
          <button
            key={period}
            onClick={() => setTimeframe(period)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              timeframe === period
                ? 'bg-orange-500 text-white'
                : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
            }`}
          >
            {period.charAt(0).toUpperCase() + period.slice(1)}
          </button>
        ))}
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-5 w-5 text-blue-400" />
              <span className="text-gray-400 text-sm">Total Volume</span>
            </div>
            <p className="text-2xl font-bold text-white">{analytics.totalVolume.toLocaleString()}</p>
            <p className="text-gray-500 text-xs">kg lifted</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-2">
              <Target className="h-5 w-5 text-orange-400" />
              <span className="text-gray-400 text-sm">Avg Intensity</span>
            </div>
            <p className="text-2xl font-bold text-white">{analytics.avgIntensity}/10</p>
            <p className="text-gray-500 text-xs">difficulty rating</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="h-5 w-5 text-green-400" />
              <span className="text-gray-400 text-sm">Consistency</span>
            </div>
            <p className="text-2xl font-bold text-white">{analytics.consistencyScore}%</p>
            <p className="text-gray-500 text-xs">of target frequency</p>
          </CardContent>
        </Card>
      </div>

      {/* Top Exercises */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Award className="h-5 w-5 text-orange-400" />
            Top Performing Exercises
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {analytics.topExercises.map((exercise, index) => (
              <div key={exercise.exercise_name} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-orange-500 text-white text-xs font-bold flex items-center justify-center">
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-white font-medium">{exercise.exercise_name}</p>
                    <p className="text-gray-400 text-sm">{exercise.total_sets} sets completed</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Badge variant="outline" className="text-blue-400 border-blue-400">
                    {exercise.avg_weight}kg avg
                  </Badge>
                  {exercise.improvement !== 0 && (
                    <Badge 
                      variant="outline" 
                      className={exercise.improvement > 0 
                        ? "text-green-400 border-green-400" 
                        : "text-red-400 border-red-400"
                      }
                    >
                      {exercise.improvement > 0 ? '+' : ''}{exercise.improvement}%
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Weekly Progress */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-orange-400" />
            Weekly Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {analytics.weeklyProgress.map((week, index) => (
              <div key={week.week} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                <span className="text-white font-medium">{week.week}</span>
                <div className="flex gap-4">
                  <div className="text-right">
                    <p className="text-blue-400 font-medium">{week.workouts}</p>
                    <p className="text-gray-500 text-xs">workouts</p>
                  </div>
                  <div className="text-right">
                    <p className="text-orange-400 font-medium">{week.volume.toLocaleString()}</p>
                    <p className="text-gray-500 text-xs">kg volume</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WorkoutAnalytics;
