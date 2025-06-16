
import { Users, Zap, Trophy, Target, Clock, TrendingUp } from "lucide-react";

const WorkoutCategories = () => {
  const categories = [
    {
      id: "beginner",
      title: "Beginner",
      subtitle: "Foundation Builder",
      description: "Perfect starting point for your calisthenics journey with progressive fundamentals",
      icon: Users,
      color: "from-emerald-500 to-green-600",
      bgColor: "from-emerald-500/10 to-green-600/10",
      exercises: ["Push-ups", "Squats", "Planks", "Assisted Pull-ups"],
      duration: "15-30 min",
      level: "Levels 1-3",
      workouts: "24 Workouts"
    },
    {
      id: "intermediate",
      title: "Intermediate", 
      subtitle: "Strength Developer",
      description: "Advance your skills with compound movements and increased difficulty progressions",
      icon: Zap,
      color: "from-orange-500 to-amber-600",
      bgColor: "from-orange-500/10 to-amber-600/10",
      exercises: ["Archer Push-ups", "Pistol Squats", "L-sits", "Muscle-ups"],
      duration: "30-45 min",
      level: "Levels 4-6",
      workouts: "36 Workouts"
    },
    {
      id: "advanced",
      title: "Advanced",
      subtitle: "Elite Performer", 
      description: "Master the most challenging movements and achieve elite-level strength",
      icon: Trophy,
      color: "from-red-500 to-rose-600",
      bgColor: "from-red-500/10 to-rose-600/10",
      exercises: ["One-arm Push-ups", "Human Flag", "Planche", "Front Lever"],
      duration: "45-60 min",
      level: "Levels 7-10",
      workouts: "48 Workouts"
    },
    {
      id: "skills",
      title: "Skills",
      subtitle: "Movement Artist",
      description: "Learn impressive freestyle skills and dynamic movement combinations",
      icon: Target,
      color: "from-purple-500 to-violet-600",
      bgColor: "from-purple-500/10 to-violet-600/10",
      exercises: ["Handstand", "Backflip", "Kip-up", "Flow Combos"],
      duration: "20-40 min",
      level: "All Levels",
      workouts: "30 Workouts"
    }
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 mb-6">
            <TrendingUp className="h-4 w-4 text-blue-400" />
            <span className="text-blue-400 text-sm font-medium">Progressive Training System</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Choose Your
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
              Training Path
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Our scientifically structured programs adapt to your current level and progressively challenge you to reach new heights
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <div
                key={category.id}
                className="group bg-gradient-to-br from-slate-800/60 to-slate-700/40 backdrop-blur-lg rounded-3xl p-8 border border-slate-600/30 hover:border-orange-500/40 transition-all duration-500 transform hover:scale-[1.02] cursor-pointer relative overflow-hidden"
              >
                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                
                <div className="relative">
                  <div className="flex items-start justify-between mb-6">
                    <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${category.color} group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-400 mb-1">{category.level}</div>
                      <div className="text-sm text-orange-400 font-medium">{category.workouts}</div>
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">
                    {category.title}
                  </h3>
                  
                  <div className="text-orange-400 font-medium mb-4">{category.subtitle}</div>
                  
                  <p className="text-gray-400 mb-6 leading-relaxed">
                    {category.description}
                  </p>
                  
                  <div className="mb-6">
                    <div className="text-sm text-gray-500 mb-3 font-medium">Featured Exercises:</div>
                    <div className="flex flex-wrap gap-2">
                      {category.exercises.map((exercise, index) => (
                        <span
                          key={index}
                          className="text-xs bg-slate-700/50 text-gray-300 px-3 py-2 rounded-full border border-slate-600/30 group-hover:border-orange-500/30 transition-colors"
                        >
                          {exercise}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-gray-400">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm">{category.duration}</span>
                    </div>
                    <button className="text-orange-400 font-medium text-sm hover:text-orange-300 transition-colors flex items-center space-x-1 group/btn">
                      <span>Start Training</span>
                      <svg className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WorkoutCategories;
