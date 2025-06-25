import { ArrowLeft, Clock, Target, Users, Play, CheckCircle } from "lucide-react";

interface WorkoutDay {
  id: string;
  name: string;
  type: 'push' | 'pull' | 'legs' | 'skills';
  duration: string;
  exercises: number;
  muscleGroups: string[];
  image: string;
  completed?: boolean;
}

const ProgramDetail = () => {
  const workoutDays: WorkoutDay[] = [
    {
      id: "week1-push",
      name: "Push Day - Upper Body Power",
      type: "push",
      duration: "45 min",
      exercises: 8,
      muscleGroups: ["Chest", "Shoulders", "Triceps", "Core"],
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      completed: true
    },
    {
      id: "week1-pull",
      name: "Pull Day - Back & Biceps",
      type: "pull", 
      duration: "40 min",
      exercises: 7,
      muscleGroups: ["Lats", "Rhomboids", "Biceps", "Rear Delts"],
      image: "https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      completed: true
    },
    {
      id: "week1-legs",
      name: "Leg Day - Lower Body Strength",
      type: "legs",
      duration: "50 min", 
      exercises: 9,
      muscleGroups: ["Quads", "Glutes", "Hamstrings", "Calves"],
      image: "https://images.unsplash.com/photo-1434608519344-49d77a699e1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    },
    {
      id: "week1-skills",
      name: "Skills Day - Handstand & Flow",
      type: "skills",
      duration: "35 min",
      exercises: 6,
      muscleGroups: ["Shoulders", "Core", "Wrists", "Balance"],
      image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case "push": return "from-red-500 to-orange-500";
      case "pull": return "from-blue-500 to-cyan-500";
      case "legs": return "from-green-500 to-emerald-500";
      case "skills": return "from-purple-500 to-pink-500";
      default: return "from-gray-500 to-gray-600";
    }
  };

  const getTypeBg = (type: string) => {
    switch (type) {
      case "push": return "bg-red-500/10 border-red-500/20";
      case "pull": return "bg-blue-500/10 border-blue-500/20";
      case "legs": return "bg-green-500/10 border-green-500/20";
      case "skills": return "bg-purple-500/10 border-purple-500/20";
      default: return "bg-gray-500/10 border-gray-500/20";
    }
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors mr-6">
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Programs</span>
          </button>
        </div>

        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Foundation Builder
          </h1>
          <p className="text-xl text-gray-300 mb-6">
            Week 1 of 8 - Building Your Calisthenics Foundation
          </p>
          
          <div className="flex items-center space-x-6 text-gray-400">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span>3 workouts this week</span>
            </div>
            <div className="flex items-center space-x-2">
              <Target className="h-4 w-4" />
              <span>~165 min total</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>Beginner level</span>
            </div>
          </div>
        </div>

        {/* Workout Days */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {workoutDays.map((workout) => (
            <div
              key={workout.id}
              className="group bg-gradient-to-br from-slate-800/60 to-slate-700/40 backdrop-blur-lg rounded-3xl overflow-hidden border border-slate-600/30 hover:border-orange-500/40 transition-all duration-500 cursor-pointer"
            >
              <div className="relative">
                <img
                  src={workout.image}
                  alt={workout.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent"></div>
                
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold text-white border ${getTypeBg(workout.type)}`}>
                    {workout.type.toUpperCase()}
                  </span>
                </div>

                <div className="absolute top-4 right-4">
                  {workout.completed ? (
                    <div className="bg-green-500 rounded-full p-2">
                      <CheckCircle className="h-4 w-4 text-white" />
                    </div>
                  ) : (
                    <div className="bg-slate-900/70 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Play className="h-4 w-4 text-orange-400" />
                    </div>
                  )}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">
                  {workout.name}
                </h3>
                
                <div className="flex items-center justify-between mb-4 text-sm text-gray-400">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{workout.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Target className="h-4 w-4" />
                    <span>{workout.exercises} exercises</span>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="text-sm text-gray-500 mb-2 font-medium">Target Muscle Groups:</div>
                  <div className="flex flex-wrap gap-2">
                    {workout.muscleGroups.map((muscle, index) => (
                      <span
                        key={index}
                        className="text-xs bg-slate-700/50 text-gray-300 px-2 py-1 rounded-full border border-slate-600/30"
                      >
                        {muscle}
                      </span>
                    ))}
                  </div>
                </div>

                <button className={`w-full ${workout.completed ? 'bg-green-500/20 border-green-500/30 text-green-400' : 'bg-gradient-to-r from-orange-500/10 to-red-500/10 hover:from-orange-500 hover:to-red-500 border border-orange-500/30 hover:border-transparent text-orange-400 hover:text-white'} font-medium py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2`}>
                  {workout.completed ? (
                    <>
                      <CheckCircle className="h-4 w-4" />
                      <span>Completed</span>
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4" />
                      <span>Start Workout</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgramDetail;
