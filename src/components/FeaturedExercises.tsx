
import { Play, Clock, BarChart3, Users, CheckCircle } from "lucide-react";

const FeaturedExercises = () => {
  const exercises = [
    {
      id: 1,
      name: "Perfect Push-up",
      category: "Upper Body Foundation",
      difficulty: "Beginner",
      duration: "5 min",
      sets: "3 sets",
      reps: "8-12 reps",
      description: "Master the fundamental push-up with perfect form and progression techniques for maximum strength gains",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      completions: "12.5K",
      rating: 4.9
    },
    {
      id: 2,
      name: "Pistol Squat Progression",
      category: "Lower Body Power",
      difficulty: "Intermediate", 
      duration: "8 min",
      sets: "4 sets",
      reps: "5-8 reps",
      description: "Build incredible single-leg strength and balance with this challenging unilateral movement progression",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      completions: "8.2K",
      rating: 4.8
    },
    {
      id: 3,
      name: "Handstand Mastery",
      category: "Skill Development",
      difficulty: "Advanced",
      duration: "12 min", 
      sets: "5 sets",
      reps: "30-60 sec",
      description: "Develop exceptional balance, strength, and control in the handstand position with progressive training",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      completions: "5.1K",
      rating: 4.9
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-emerald-500";
      case "Intermediate": return "bg-orange-500";
      case "Advanced": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <div className="inline-flex items-center space-x-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-2 mb-6">
            <CheckCircle className="h-4 w-4 text-purple-400" />
            <span className="text-purple-400 text-sm font-medium">Most Popular Exercises</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Master These
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
              Fundamentals
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Build an unshakeable foundation with these essential movements, perfected by thousands of athletes
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {exercises.map((exercise) => (
            <div
              key={exercise.id}
              className="group bg-gradient-to-br from-slate-800/60 to-slate-700/40 backdrop-blur-lg rounded-3xl overflow-hidden border border-slate-600/30 hover:border-orange-500/40 transition-all duration-500 transform hover:scale-[1.02] cursor-pointer"
            >
              <div className="relative">
                <img
                  src={exercise.image}
                  alt={exercise.name}
                  className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent"></div>
                
                {/* Difficulty badge */}
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold text-white ${getDifficultyColor(exercise.difficulty)}`}>
                    {exercise.difficulty}
                  </span>
                </div>
                
                {/* Play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-slate-900/40">
                  <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-full p-6 transform scale-75 group-hover:scale-100 transition-transform duration-300 shadow-2xl">
                    <Play className="h-8 w-8 text-white ml-1" />
                  </div>
                </div>
                
                {/* Stats overlay */}
                <div className="absolute bottom-4 right-4 flex items-center space-x-3">
                  <div className="flex items-center space-x-1 bg-slate-900/70 backdrop-blur-sm rounded-full px-3 py-1">
                    <Users className="h-3 w-3 text-orange-400" />
                    <span className="text-xs text-white font-medium">{exercise.completions}</span>
                  </div>
                  <div className="flex items-center space-x-1 bg-slate-900/70 backdrop-blur-sm rounded-full px-3 py-1">
                    <span className="text-xs text-yellow-400">★</span>
                    <span className="text-xs text-white font-medium">{exercise.rating}</span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-orange-400 transition-colors mb-1">
                      {exercise.name}
                    </h3>
                    <span className="text-sm text-orange-400 font-medium">{exercise.category}</span>
                  </div>
                </div>

                <p className="text-gray-400 mb-6 text-sm leading-relaxed">
                  {exercise.description}
                </p>

                <div className="flex items-center justify-between mb-6 text-sm text-gray-400">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{exercise.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <BarChart3 className="h-4 w-4" />
                    <span>{exercise.sets}</span>
                  </div>
                  <div className="text-orange-400 font-medium">
                    {exercise.reps}
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-orange-500/10 to-red-500/10 hover:from-orange-500 hover:to-red-500 border border-orange-500/30 hover:border-transparent text-orange-400 hover:text-white font-medium py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2">
                  <Play className="h-4 w-4" />
                  <span>Start Exercise</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedExercises;
