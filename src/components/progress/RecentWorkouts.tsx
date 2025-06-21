
interface WorkoutSession {
  id: string;
  program_name: string;
  exercises: string[];
  duration_minutes: number;
  calories_burned: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  completed_at: string;
}

interface RecentWorkoutsProps {
  workoutHistory: WorkoutSession[];
}

const RecentWorkouts = ({ workoutHistory }: RecentWorkoutsProps) => {
  const recentWorkouts = workoutHistory.slice(0, 5).map(session => ({
    ...session,
    formattedDate: new Date(session.completed_at).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    })
  }));

  if (recentWorkouts.length === 0) {
    return null;
  }

  return (
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
                {workout.program_name}
              </p>
              <p className="text-gray-400 text-sm">
                {workout.formattedDate} • {workout.duration_minutes} min • {workout.calories_burned} cal
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
  );
};

export default RecentWorkouts;
