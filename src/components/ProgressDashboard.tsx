
import { Calendar, Trophy, Target, TrendingUp, Clock, Flame } from "lucide-react";

const ProgressDashboard = () => {
  const stats = [
    { icon: Calendar, label: "Workout Streak", value: "15 days", color: "text-green-400" },
    { icon: Trophy, label: "Completed Workouts", value: "47", color: "text-orange-400" },
    { icon: Target, label: "Goals Achieved", value: "8/10", color: "text-blue-400" },
    { icon: Clock, label: "Total Time", value: "28 hrs", color: "text-purple-400" },
  ];

  const recentWorkouts = [
    { name: "Upper Body Strength", date: "Today", duration: "35 min", difficulty: "Intermediate" },
    { name: "Core Power", date: "Yesterday", duration: "20 min", difficulty: "Beginner" },
    { name: "Lower Body Flow", date: "2 days ago", duration: "40 min", difficulty: "Advanced" },
    { name: "Handstand Practice", date: "3 days ago", duration: "25 min", difficulty: "Intermediate" },
  ];

  const goals = [
    { name: "Hold Handstand for 30 seconds", progress: 75, current: "22 sec", target: "30 sec" },
    { name: "Complete 50 Push-ups", progress: 60, current: "30 reps", target: "50 reps" },
    { name: "Master Pistol Squat", progress: 40, current: "Assisted", target: "Unassisted" },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Your Progress
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Track your journey and celebrate your achievements
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={index}
                className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-orange-500/50 transition-all duration-300"
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

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recent Workouts */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center">
              <Flame className="h-5 w-5 text-orange-500 mr-2" />
              Recent Workouts
            </h3>
            <div className="space-y-4">
              {recentWorkouts.map((workout, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors"
                >
                  <div>
                    <h4 className="text-white font-medium">{workout.name}</h4>
                    <p className="text-gray-400 text-sm">{workout.date} • {workout.duration}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    workout.difficulty === 'Beginner' ? 'bg-green-500/20 text-green-400' :
                    workout.difficulty === 'Intermediate' ? 'bg-orange-500/20 text-orange-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {workout.difficulty}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Goals Progress */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center">
              <TrendingUp className="h-5 w-5 text-blue-500 mr-2" />
              Current Goals
            </h3>
            <div className="space-y-6">
              {goals.map((goal, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-white font-medium text-sm">{goal.name}</h4>
                    <span className="text-orange-400 text-sm font-medium">{goal.progress}%</span>
                  </div>
                  <div className="bg-slate-700 rounded-full h-2 mb-2">
                    <div
                      className="bg-gradient-to-r from-orange-500 to-orange-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${goal.progress}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>Current: {goal.current}</span>
                    <span>Target: {goal.target}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProgressDashboard;
