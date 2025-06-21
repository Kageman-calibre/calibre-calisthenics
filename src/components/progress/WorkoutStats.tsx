
import { Flame, Target, Clock, TrendingUp } from 'lucide-react';

interface UserStats {
  total_workouts: number;
  total_minutes: number;
  total_calories: number;
  current_streak: number;
}

interface WorkoutStatsProps {
  userStats: UserStats;
}

const WorkoutStats = ({ userStats }: WorkoutStatsProps) => {
  const stats = [
    { 
      icon: Flame, 
      label: "Current Streak", 
      value: `${userStats.current_streak} days`, 
      color: "text-orange-400",
      bgColor: "bg-orange-500/10 border-orange-500/20"
    },
    { 
      icon: Target, 
      label: "Total Workouts", 
      value: userStats.total_workouts.toString(), 
      color: "text-blue-400",
      bgColor: "bg-blue-500/10 border-blue-500/20"
    },
    { 
      icon: Clock, 
      label: "Total Time", 
      value: `${Math.floor(userStats.total_minutes / 60)}h ${userStats.total_minutes % 60}m`, 
      color: "text-green-400",
      bgColor: "bg-green-500/10 border-green-500/20"
    },
    { 
      icon: TrendingUp, 
      label: "Calories Burned", 
      value: userStats.total_calories.toString(), 
      color: "text-purple-400",
      bgColor: "bg-purple-500/10 border-purple-500/20"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const IconComponent = stat.icon;
        return (
          <div
            key={index}
            className={`backdrop-blur-sm rounded-xl p-6 border transition-all duration-300 hover:scale-105 ${stat.bgColor}`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              </div>
              <IconComponent className={`h-8 w-8 ${stat.color}`} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default WorkoutStats;
