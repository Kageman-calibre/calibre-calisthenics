
import { Calendar, Award } from 'lucide-react';

interface WorkoutSession {
  id: string;
  program_name: string;
  exercises: string[];
  duration_minutes: number;
  calories_burned: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  completed_at: string;
}

interface PeriodProgressProps {
  workoutHistory: WorkoutSession[];
}

const PeriodProgress = ({ workoutHistory }: PeriodProgressProps) => {
  const getWeeklyProgress = () => {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    
    const thisWeek = workoutHistory.filter(session => 
      new Date(session.completed_at) >= oneWeekAgo
    );
    
    return thisWeek.length;
  };

  const getMonthlyProgress = () => {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    
    const thisMonth = workoutHistory.filter(session => 
      new Date(session.completed_at) >= oneMonthAgo
    );
    
    return thisMonth.length;
  };

  const weeklyProgress = getWeeklyProgress();
  const monthlyProgress = getMonthlyProgress();

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center">
          <Calendar className="h-5 w-5 text-blue-500 mr-2" />
          This Week
        </h3>
        <div className="text-center">
          <div className="text-4xl font-bold text-blue-400 mb-2">
            {weeklyProgress}
          </div>
          <p className="text-gray-400">Workouts Completed</p>
          <div className="mt-4 bg-slate-700 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${Math.min((weeklyProgress / 7) * 100, 100)}%` }}
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
            {monthlyProgress}
          </div>
          <p className="text-gray-400">Workouts Completed</p>
          <div className="mt-4 bg-slate-700 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${Math.min((monthlyProgress / 30) * 100, 100)}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-500 mt-2">Goal: 30 workouts per month</p>
        </div>
      </div>
    </div>
  );
};

export default PeriodProgress;
