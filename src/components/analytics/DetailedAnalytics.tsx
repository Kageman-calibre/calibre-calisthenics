
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { Calendar, TrendingUp, Target, Award, Activity, Clock } from 'lucide-react';

const DetailedAnalytics = () => {
  const [timeRange, setTimeRange] = useState('month');

  // Sample data - in a real app, this would come from your database
  const workoutData = [
    { date: '2024-01-01', workouts: 3, calories: 850, duration: 120 },
    { date: '2024-01-02', workouts: 2, calories: 620, duration: 90 },
    { date: '2024-01-03', workouts: 4, calories: 1100, duration: 150 },
    { date: '2024-01-04', workouts: 1, calories: 350, duration: 45 },
    { date: '2024-01-05', workouts: 3, calories: 780, duration: 105 },
    { date: '2024-01-06', workouts: 2, calories: 560, duration: 80 },
    { date: '2024-01-07', workouts: 5, calories: 1250, duration: 180 }
  ];

  const exerciseTypeData = [
    { name: 'Cardio', value: 35, color: '#f97316' },
    { name: 'Strength', value: 30, color: '#3b82f6' },
    { name: 'Flexibility', value: 20, color: '#10b981' },
    { name: 'HIIT', value: 15, color: '#8b5cf6' }
  ];

  const progressData = [
    { month: 'Jan', weight: 75, bodyFat: 18, muscle: 65 },
    { month: 'Feb', weight: 74, bodyFat: 17.5, muscle: 65.5 },
    { month: 'Mar', weight: 73.5, bodyFat: 17, muscle: 66 },
    { month: 'Apr', weight: 73, bodyFat: 16.5, muscle: 66.5 },
    { month: 'May', weight: 72.5, bodyFat: 16, muscle: 67 },
    { month: 'Jun', weight: 72, bodyFat: 15.5, muscle: 67.5 }
  ];

  const performanceData = [
    { exercise: 'Push-ups', week1: 20, week2: 25, week3: 30, week4: 35 },
    { exercise: 'Squats', week1: 15, week2: 20, week3: 25, week4: 30 },
    { exercise: 'Plank (sec)', week1: 30, week2: 45, week3: 60, week4: 75 },
    { exercise: 'Pull-ups', week1: 5, week2: 7, week3: 10, week4: 12 }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Detailed Analytics</h2>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Deep dive into your fitness journey with comprehensive analytics and insights
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-slate-800/60 to-slate-700/40 border-slate-600/30">
          <CardContent className="p-6 text-center">
            <Activity className="h-8 w-8 text-orange-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">127</div>
            <div className="text-sm text-gray-400">Total Workouts</div>
            <div className="text-xs text-green-400 mt-1">↑ 12% vs last month</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-slate-800/60 to-slate-700/40 border-slate-600/30">
          <CardContent className="p-6 text-center">
            <Clock className="h-8 w-8 text-blue-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">2,340</div>
            <div className="text-sm text-gray-400">Minutes Trained</div>
            <div className="text-xs text-green-400 mt-1">↑ 8% vs last month</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-slate-800/60 to-slate-700/40 border-slate-600/30">
          <CardContent className="p-6 text-center">
            <Target className="h-8 w-8 text-green-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">18,450</div>
            <div className="text-sm text-gray-400">Calories Burned</div>
            <div className="text-xs text-green-400 mt-1">↑ 15% vs last month</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-slate-800/60 to-slate-700/40 border-slate-600/30">
          <CardContent className="p-6 text-center">
            <Award className="h-8 w-8 text-purple-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">23</div>
            <div className="text-sm text-gray-400">Streak Days</div>
            <div className="text-xs text-green-400 mt-1">Personal Best!</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="activity" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-slate-800/50">
          <TabsTrigger value="activity" className="text-white">Activity</TabsTrigger>
          <TabsTrigger value="progress" className="text-white">Progress</TabsTrigger>
          <TabsTrigger value="performance" className="text-white">Performance</TabsTrigger>
          <TabsTrigger value="breakdown" className="text-white">Breakdown</TabsTrigger>
        </TabsList>

        <TabsContent value="activity" className="space-y-6">
          <Card className="bg-gradient-to-br from-slate-800/60 to-slate-700/40 border-slate-600/30">
            <CardHeader>
              <CardTitle className="text-white">Workout Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={workoutData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="date" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1f2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="calories" 
                    stroke="#f97316" 
                    fill="#f97316" 
                    fillOpacity={0.3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="progress" className="space-y-6">
          <Card className="bg-gradient-to-br from-slate-800/60 to-slate-700/40 border-slate-600/30">
            <CardHeader>
              <CardTitle className="text-white">Body Composition Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={progressData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="month" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1f2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px'
                    }}
                  />
                  <Line type="monotone" dataKey="weight" stroke="#3b82f6" strokeWidth={2} />
                  <Line type="monotone" dataKey="bodyFat" stroke="#ef4444" strokeWidth={2} />
                  <Line type="monotone" dataKey="muscle" stroke="#10b981" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <Card className="bg-gradient-to-br from-slate-800/60 to-slate-700/40 border-slate-600/30">
            <CardHeader>
              <CardTitle className="text-white">Exercise Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="exercise" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1f2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="week1" fill="#64748b" />
                  <Bar dataKey="week2" fill="#3b82f6" />
                  <Bar dataKey="week3" fill="#10b981" />
                  <Bar dataKey="week4" fill="#f97316" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="breakdown" className="space-y-6">
          <Card className="bg-gradient-to-br from-slate-800/60 to-slate-700/40 border-slate-600/30">
            <CardHeader>
              <CardTitle className="text-white">Exercise Type Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={exerciseTypeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {exerciseTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-4 mt-4">
                {exerciseTypeData.map((item, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm text-gray-300">{item.name}: {item.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DetailedAnalytics;
