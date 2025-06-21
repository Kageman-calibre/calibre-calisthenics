
import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Brain, Target, BarChart3, Activity, Zap } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from 'recharts';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/auth/AuthProvider';

interface AnalyticsData {
  performanceData: any[];
  strengthProgress: any[];
  volumeData: any[];
  recoveryTrends: any[];
  workoutFrequency: any[];
}

const AdvancedAnalytics = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    performanceData: [],
    strengthProgress: [],
    volumeData: [],
    recoveryTrends: [],
    workoutFrequency: []
  });
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('3months');
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchAnalyticsData();
    }
  }, [user, timeRange]);

  const fetchAnalyticsData = async () => {
    if (!user) return;

    const dateRanges = {
      '1month': 30,
      '3months': 90,
      '6months': 180,
      '1year': 365
    };

    const daysBack = dateRanges[timeRange as keyof typeof dateRanges];
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - daysBack);

    // Fetch performance data
    const { data: performanceData } = await supabase
      .from('exercise_performance')
      .select('*')
      .eq('user_id', user.id)
      .gte('performed_at', startDate.toISOString())
      .order('performed_at', { ascending: true });

    // Fetch recovery data
    const { data: recoveryData } = await supabase
      .from('recovery_metrics')
      .select('*')
      .eq('user_id', user.id)
      .gte('date', startDate.toISOString().split('T')[0])
      .order('date', { ascending: true });

    // Fetch workout sessions
    const { data: workoutData } = await supabase
      .from('workout_sessions')
      .select('*')
      .eq('user_id', user.id)
      .gte('completed_at', startDate.toISOString())
      .order('completed_at', { ascending: true });

    // Process data for charts
    const processedData = processAnalyticsData(performanceData || [], recoveryData || [], workoutData || []);
    setAnalyticsData(processedData);
    setLoading(false);
  };

  const processAnalyticsData = (performance: any[], recovery: any[], workouts: any[]) => {
    // Group performance data by exercise and calculate strength progress
    const exerciseGroups = performance.reduce((acc, item) => {
      if (!acc[item.exercise_name]) {
        acc[item.exercise_name] = [];
      }
      acc[item.exercise_name].push(item);
      return acc;
    }, {});

    const strengthProgress = Object.keys(exerciseGroups).map(exerciseName => {
      const exercises = exerciseGroups[exerciseName];
      const avgWeight = exercises.reduce((sum: number, ex: any) => 
        sum + (ex.weights_used?.[0] || 0), 0) / exercises.length;
      const totalVolume = exercises.reduce((sum: number, ex: any) => 
        sum + ((ex.weights_used?.[0] || 0) * (ex.reps_completed?.[0] || 0) * ex.sets_completed), 0);
      
      return {
        exercise: exerciseName,
        avgWeight: Math.round(avgWeight * 100) / 100,
        totalVolume: Math.round(totalVolume),
        sessions: exercises.length
      };
    });

    // Process recovery trends
    const recoveryTrends = recovery.map(item => ({
      date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      recoveryScore: (item.sleep_quality || 5) + (10 - (item.stress_level || 5)) + (item.energy_level || 5),
      sleepQuality: item.sleep_quality || 5,
      energyLevel: item.energy_level || 5,
      stressLevel: item.stress_level || 5
    }));

    // Process workout frequency
    const workoutsByWeek = workouts.reduce((acc, workout) => {
      const week = new Date(workout.completed_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      acc[week] = (acc[week] || 0) + 1;
      return acc;
    }, {});

    const workoutFrequency = Object.entries(workoutsByWeek).map(([week, count]) => ({
      week,
      workouts: count,
      target: 4 // Assuming target of 4 workouts per week
    }));

    return {
      performanceData: performance.map(item => ({
        date: new Date(item.performed_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        weight: item.weights_used?.[0] || 0,
        reps: item.reps_completed?.[0] || 0,
        volume: (item.weights_used?.[0] || 0) * (item.reps_completed?.[0] || 0) * item.sets_completed,
        difficulty: item.difficulty_rating || 5,
        exercise: item.exercise_name
      })),
      strengthProgress,
      volumeData: workouts.map(workout => ({
        date: new Date(workout.completed_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        duration: workout.duration_minutes,
        calories: workout.calories_burned,
        exercises: workout.exercises.length
      })),
      recoveryTrends,
      workoutFrequency
    };
  };

  if (loading) {
    return <div className="text-white">Loading analytics...</div>;
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 mb-6">
          <BarChart3 className="h-4 w-4 text-blue-400" />
          <span className="text-blue-400 text-sm font-medium">Advanced Analytics</span>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
          Performance
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            Analytics Dashboard
          </span>
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Deep insights into your training performance and recovery patterns
        </p>
      </div>

      {/* Time Range Selector */}
      <div className="flex justify-center space-x-2">
        {[
          { value: '1month', label: '1M' },
          { value: '3months', label: '3M' },
          { value: '6months', label: '6M' },
          { value: '1year', label: '1Y' }
        ].map((range) => (
          <button
            key={range.value}
            onClick={() => setTimeRange(range.value)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              timeRange === range.value
                ? 'bg-blue-500 text-white'
                : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
            }`}
          >
            {range.label}
          </button>
        ))}
      </div>

      {/* Analytics Tabs */}
      <Tabs defaultValue="strength" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-slate-800/50">
          <TabsTrigger value="strength" className="text-white flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Strength
          </TabsTrigger>
          <TabsTrigger value="volume" className="text-white flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Volume
          </TabsTrigger>
          <TabsTrigger value="recovery" className="text-white flex items-center gap-2">
            <Zap className="h-4 w-4" />
            Recovery
          </TabsTrigger>
          <TabsTrigger value="frequency" className="text-white flex items-center gap-2">
            <Target className="h-4 w-4" />
            Frequency
          </TabsTrigger>
        </TabsList>

        <TabsContent value="strength" className="mt-8">
          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Strength Progress by Exercise</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={analyticsData.strengthProgress}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="exercise" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1F2937', 
                        border: '1px solid #374151',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar dataKey="avgWeight" fill="#3B82F6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Training Volume</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={analyticsData.strengthProgress}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="exercise" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1F2937', 
                        border: '1px solid #374151',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar dataKey="totalVolume" fill="#10B981" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="volume" className="mt-8">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Workout Volume Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={analyticsData.volumeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="date" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px'
                    }}
                  />
                  <Area type="monotone" dataKey="duration" stackId="1" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.3} />
                  <Area type="monotone" dataKey="calories" stackId="2" stroke="#EF4444" fill="#EF4444" fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recovery" className="mt-8">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Recovery Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={analyticsData.recoveryTrends}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="date" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px'
                    }}
                  />
                  <Line type="monotone" dataKey="sleepQuality" stroke="#10B981" strokeWidth={2} />
                  <Line type="monotone" dataKey="energyLevel" stroke="#3B82F6" strokeWidth={2} />
                  <Line type="monotone" dataKey="stressLevel" stroke="#EF4444" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="frequency" className="mt-8">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Workout Frequency vs Target</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={analyticsData.workoutFrequency}>
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
                  <Bar dataKey="workouts" fill="#8B5CF6" />
                  <Bar dataKey="target" fill="#6B7280" fillOpacity={0.3} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdvancedAnalytics;
