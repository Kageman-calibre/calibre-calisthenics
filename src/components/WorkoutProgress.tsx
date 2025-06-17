
import { useState, useEffect } from 'react';
import { Calendar, TrendingUp, Target, Clock, Flame, Award } from 'lucide-react';

interface WorkoutSession {
  id: string;
  date: string;
  exercises: string[];
  duration: number;
  calories: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

const WorkoutProgress = () => {
  const [workoutHistory, setWorkoutHistory] = useState<WorkoutSession[]>([]);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [totalWorkouts, setTotalWorkouts] = useState(0);
  const [totalMinutes, setTotalMinutes] = useState(0);
  const [totalCalories, setTotalCalories] = useState(0);

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('workoutHistory');
    if (savedHistory) {
      const history = JSON.parse(savedHistory);
      setWorkoutHistory(history);
      calculateStats(history);
    }
  }, []);

  const calculateStats = (history: WorkoutSession[]) => {
    setTotalWorkouts(history.length);
    setTotalMinutes(history.reduce((sum, session) => sum + session.duration, 0));
    setTotalCalories(history.reduce((sum, session) => sum + session.calories, 0));
    
    // Calculate streak
    let streak = 0;
    const today = new Date();
    const sortedHistory = [...history].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    for (let i = 0; i < sortedHistory.length; i++) {
      const sessionDate = new Date(sortedHistory[i].date);
      const daysDiff = Math.floor((today.getTime() - sessionDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysDiff === i) {
        streak++;
      } else {
        break;
      }
    }
    setCurrentStreak(streak);
  };

  const addWorkoutSession = (session: Omit<WorkoutSession, 'id'>) => {
    const newSession = {
      ...session,
      id: Date.now().toString()
    };
    
    const updatedHistory = [...workoutHistory, newSession];
    setWorkoutHistory(updatedHistory);
    localStorage.setItem('workoutHistory', JSON.stringify(updatedHistory));
    calculateStats(updatedHistory);
  };

  const getWeeklyProgress = () => {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    
    const thisWeek = workoutHistory.filter(session => 
      new Date(session.date) >= oneWeekAgo
    );
    
    return thisWeek.length;
  };

  const getMonthlyProgress = () => {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    
    const thisMonth = workoutHistory.filter(session => 
      new Date(session.date) >= oneMonthAgo
    );
    
    return thisMonth.length;
  };

  const stats = [
    { 
      icon: Flame, 
      label: "Current Streak", 
      value: `${currentStreak} days`, 
      color: "text-orange-400",
      bgColor: "bg-orange-500/10 border-orange-500/20"
    },
    { 
      icon: Target, 
      label: "Total Workouts", 
      value: totalWorkouts.toString(), 
      color: "text-blue-400",
      bgColor: "bg-blue-500/10 border-blue-500/20"
    },
    { 
      icon: Clock, 
      label: "Total Time", 
      value: `${Math.floor(totalMinutes / 60)}h ${totalMinutes % 60}m`, 
      color: "text-green-400",
      bgColor: "bg-green-500/10 border-green-500/20"
    },
    { 
      icon: TrendingUp, 
      label: "Calories Burned", 
      value: totalCalories.toString(), 
      color: "text-purple-400",
      bgColor: "bg-purple-500/10 border-purple-500/20"
    }
  ];

  const recentWorkouts = workoutHistory
    .slice(-5)
    .reverse()
    .map(session => ({
      ...session,
      formattedDate: new Date(session.date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      })
    }));

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
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

      {/* Weekly & Monthly Progress */}
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center">
            <Calendar className="h-5 w-5 text-blue-500 mr-2" />
            This Week
          </h3>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-400 mb-2">
              {getWeeklyProgress()}
            </div>
            <p className="text-gray-400">Workouts Completed</p>
            <div className="mt-4 bg-slate-700 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${Math.min((getWeeklyProgress() / 7) * 100, 100)}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-2">Goal: 7 workouts per week</p>
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center">
            <Award className="h-5 w-5 text-green-500 mr-2" />
            This Month
          </h3>
          <div className="text-center">
            <div className="text-4xl font-bold text-green-400 mb-2">
              {getMonthlyProgress()}
            </div>
            <p className="text-gray-400">Workouts Completed</p>
            <div className="mt-4 bg-slate-700 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${Math.min((getMonthlyProgress() / 30) * 100, 100)}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-2">Goal: 30 workouts per month</p>
          </div>
        </div>
      </div>

      {/* Recent Workouts */}
      {recentWorkouts.length > 0 && (
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
          <h3 className="text-xl font-bold text-white mb-6">Recent Workouts</h3>
          <div className="space-y-3">
            {recentWorkouts.map((workout) => (
              <div
                key={workout.id}
                className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg"
              >
                <div>
                  <p className="text-white font-medium">
                    {workout.exercises.length} exercises
                  </p>
                  <p className="text-gray-400 text-sm">
                    {workout.formattedDate} • {workout.duration} min • {workout.calories} cal
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  workout.difficulty === 'beginner' ? 'bg-green-500/20 text-green-400' :
                  workout.difficulty === 'intermediate' ? 'bg-orange-500/20 text-orange-400' :
                  'bg-red-500/20 text-red-400'
                }`}>
                  {workout.difficulty}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkoutProgress;

// Export the function to add workout sessions so other components can use it
export const useWorkoutProgress = () => {
  const addWorkoutSession = (session: Omit<WorkoutSession, 'id'>) => {
    const newSession = {
      ...session,
      id: Date.now().toString()
    };
    
    const savedHistory = localStorage.getItem('workoutHistory');
    const history = savedHistory ? JSON.parse(savedHistory) : [];
    const updatedHistory = [...history, newSession];
    
    localStorage.setItem('workoutHistory', JSON.stringify(updatedHistory));
    
    // Trigger a custom event to update other components
    window.dispatchEvent(new CustomEvent('workoutAdded', { detail: newSession }));
  };

  return { addWorkoutSession };
};
