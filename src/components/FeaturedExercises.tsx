
import { Play, Clock, BarChart3 } from "lucide-react";

const FeaturedExercises = () => {
  const exercises = [
    {
      id: 1,
      name: "Perfect Push-up",
      category: "Upper Body",
      difficulty: "Beginner",
      duration: "5 min",
      sets: "3 sets",
      reps: "8-12 reps",
      description: "Master the fundamental push-up with perfect form and progression techniques",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    {
      id: 2,
      name: "Pistol Squat Progression",
      category: "Lower Body",
      difficulty: "Intermediate",
      duration: "8 min",
      sets: "4 sets",
      reps: "5-8 reps",
      description: "Build single-leg strength with this challenging unilateral movement",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    {
      id: 3,
      name: "Handstand Hold",
      category: "Skills",
      difficulty: "Advanced",
      duration: "10 min",
      sets: "5 sets",
      reps: "30-60 sec",
      description: "Develop balance, strength, and control in the handstand position",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-green-500";
      case "Intermediate": return "bg-orange-500";
      case "Advanced": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Featured Exercises
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Master these fundamental movements to build a strong foundation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {exercises.map((exercise) => (
            <div
              key={exercise.id}
              className="bg-slate-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-slate-700/50 hover:border-orange-500/50 transition-all duration-300 transform hover:scale-105 group cursor-pointer"
            >
              <div className="relative">
                <img
                  src={exercise.image}
                  alt={exercise.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium text-white ${getDifficultyColor(exercise.difficulty)}`}>
                    {exercise.difficulty}
                  </span>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-orange-500 rounded-full p-4">
                    <Play className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-white group-hover:text-orange-400 transition-colors">
                    {exercise.name}
                  </h3>
                  <span className="text-sm text-gray-400">{exercise.category}</span>
                </div>

                <p className="text-gray-400 mb-4 text-sm">
                  {exercise.description}
                </p>

                <div className="flex items-center space-x-4 mb-4 text-sm text-gray-400">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{exercise.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <BarChart3 className="h-4 w-4" />
                    <span>{exercise.sets}</span>
                  </div>
                </div>

                <div className="text-orange-400 font-medium text-sm">
                  {exercise.reps}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedExercises;
