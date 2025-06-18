
import { useState, useEffect } from 'react';
import { TrendingUp, Calendar, Target, Zap, BarChart3, PieChart } from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPieChart, Cell } from 'recharts';

interface AnalyticsData {
  workoutFrequency: Array<{ date: string; workouts: number }>;
  strengthProgress: Array<{ exercise: string; weight: number; month: string }>;
  bodyComposition: Array<{ name: string; value: number; color: string }>;
  weeklyStats: {
    totalWorkouts: number;
    averageDuration: number;
    caloriesBurned: number;
    strengthGains: number;
  };
}

const AnalyticsDashboard = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    workoutFrequency: [
      { date: 'Week 1', workouts: 3 },
      { date: 'Week 2', workouts: 4 },
      { date: 'Week 3', workouts: 5 },
      { date: 'Week 4', workouts: 4 },
      { date: 'Week 5', workouts: 6 },
      { date: 'Week 6', workouts: 5 },
    ],
    strengthProgress: [
      { exercise: 'Bench Press', weight: 80, month: 'Jan' },
      { exercise: 'Bench Press', weight: 85, month: 'Feb' },
      { exercise: 'Bench Press', weight: 90, month: 'Mar' },
      { exercise: 'Squat', weight: 100, month: 'Jan' },
      { exercise: 'Squat', weight: 110, month: 'Feb' },
      { exercise: 'Squat', weight: 120, month: 'Mar' },
    ],
    bodyComposition: [
      { name: 'Muscle', value: 45, color: '#22c55e' },
      { name: 'Fat', value: 15, color: '#f59e0b' },
      { name: 'Water', value: 40, color: '#3b82f6' },
    ],
    weeklyStats: {
      totalWorkouts: 5,
      averageDuration: 45,
      caloriesBurned: 2450,
      strengthGains: 12,
    }
  });

  const chartConfig = {
    workouts: {
      label: "Workouts",
      color: "#f97316",
    },
    weight: {
      label: "Weight (kg)",
      color: "#22c55e",
    },
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-white mb-4">Advanced Analytics</h2>
        <p className="text-xl text-gray-300">Deep insights into your fitness journey</p>
      </div>

      {/* Weekly Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 backdrop-blur-sm rounded-xl p-6 border border-orange-500/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-400 text-sm font-medium">Total Workouts</p>
              <p className="text-3xl font-bold text-white">{analyticsData.weeklyStats.totalWorkouts}</p>
              <p className="text-green-400 text-sm">+25% vs last week</p>
            </div>
            <Calendar className="h-8 w-8 text-orange-400" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-sm rounded-xl p-6 border border-blue-500/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-400 text-sm font-medium">Avg Duration</p>
              <p className="text-3xl font-bold text-white">{analyticsData.weeklyStats.averageDuration}m</p>
              <p className="text-green-400 text-sm">+8% vs last week</p>
            </div>
            <Target className="h-8 w-8 text-blue-400" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-sm rounded-xl p-6 border border-green-500/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-400 text-sm font-medium">Calories Burned</p>
              <p className="text-3xl font-bold text-white">{analyticsData.weeklyStats.caloriesBurned}</p>
              <p className="text-green-400 text-sm">+15% vs last week</p>
            </div>
            <Zap className="h-8 w-8 text-green-400" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-400 text-sm font-medium">Strength Gains</p>
              <p className="text-3xl font-bold text-white">{analyticsData.weeklyStats.strengthGains}%</p>
              <p className="text-green-400 text-sm">+5% vs last month</p>
            </div>
            <TrendingUp className="h-8 w-8 text-purple-400" />
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Workout Frequency */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
          <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
            <BarChart3 className="h-5 w-5 text-orange-500 mr-2" />
            Workout Frequency
          </h3>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={analyticsData.workoutFrequency}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="date" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="workouts" stroke="var(--color-workouts)" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>

        {/* Body Composition */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
          <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
            <PieChart className="h-5 w-5 text-blue-500 mr-2" />
            Body Composition
          </h3>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <RechartsPieChart data={analyticsData.bodyComposition} cx="50%" cy="50%" outerRadius={80} fill="#8884d8">
                  {analyticsData.bodyComposition.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </RechartsPieChart>
                <ChartTooltip content={<ChartTooltipContent />} />
              </RechartsPieChart>
            </ResponsiveContainer>
          </ChartContainer>
          <div className="flex justify-center space-x-6 mt-4">
            {analyticsData.bodyComposition.map((item) => (
              <div key={item.name} className="flex items-center">
                <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></div>
                <span className="text-sm text-gray-300">{item.name}: {item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Strength Progress */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
        <h3 className="text-xl font-semibold text-white mb-6">Strength Progress Over Time</h3>
        <ChartContainer config={chartConfig} className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={analyticsData.strengthProgress}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="weight" fill="var(--color-weight)" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
