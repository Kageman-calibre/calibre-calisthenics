
import { ArrowLeft, Clock, Target, Play, Pause, RotateCcw, Volume2 } from "lucide-react";
import { useState } from "react";

interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: string;
  restTime: string;
  description: string;
  muscleGroups: string[];
  image: string;
  videoUrl?: string;
}

const WorkoutDetail = () => {
  const [currentExercise, setCurrentExercise] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSet, setCurrentSet] = useState(1);

  const exercises: Exercise[] = [
    {
      id: "push-ups",
      name: "Push-ups",
      sets: 3,
      reps: "8-12",
      restTime: "60s",
      description: "Keep your body in a straight line from head to heels. Lower until your chest nearly touches the ground, then push back up.",
      muscleGroups: ["Chest", "Shoulders", "Triceps", "Core"],
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
    },
    {
      id: "incline-push-ups",
      name: "Incline Push-ups",
      sets: 3,
      reps: "10-15",
      restTime: "45s",
      description: "Place hands on an elevated surface. Perfect for building strength before regular push-ups.",
      muscleGroups: ["Chest", "Shoulders", "Triceps"],
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
    },
    {
      id: "pike-push-ups",
      name: "Pike Push-ups",
      sets: 3,
      reps: "5-8",
      restTime: "90s",
      description: "Start in downward dog position. Lower your head toward the ground, focusing on shoulder strength.",
      muscleGroups: ["Shoulders", "Triceps", "Upper Chest"],
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
    },
    {
      id: "tricep-dips",
      name: "Tricep Dips",
      sets: 3,
      reps: "6-10",
      restTime: "60s",
      description: "Use a chair or bench. Lower your body until arms are at 90 degrees, then push back up.",
      muscleGroups: ["Triceps", "Shoulders", "Chest"],
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
    }
  ];

  const currentEx = exercises[currentExercise];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Program</span>
          </button>
          
          <div className="flex items-center space-x-4">
            <div className="text-sm font-medium text-orange-400">
              Exercise {currentExercise + 1} of {exercises.length}
            </div>
            <div className="text-sm text-gray-400">
              Set {currentSet} of {currentEx.sets}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Exercise Visual */}
          <div className="space-y-6">
            <div className="relative bg-gradient-to-br from-slate-800/60 to-slate-700/40 backdrop-blur-lg rounded-3xl overflow-hidden border border-slate-600/30">
              <img
                src={currentEx.image}
                alt={currentEx.name}
                className="w-full h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
              
              {/* Muscle Group Overlay */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex flex-wrap gap-2">
                  {currentEx.muscleGroups.map((muscle, index) => (
                    <span
                      key={index}
                      className="text-xs bg-slate-900/70 backdrop-blur-sm text-white px-3 py-1 rounded-full border border-slate-600/30"
                    >
                      {muscle}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Exercise Navigation */}
            <div className="flex space-x-4">
              <button
                onClick={() => setCurrentExercise(Math.max(0, currentExercise - 1))}
                disabled={currentExercise === 0}
                className="flex-1 bg-slate-800/50 hover:bg-slate-700/50 disabled:bg-slate-800/30 disabled:text-gray-500 text-white font-medium py-3 px-4 rounded-xl transition-all duration-300 disabled:cursor-not-allowed"
              >
                Previous Exercise
              </button>
              <button
                onClick={() => setCurrentExercise(Math.min(exercises.length - 1, currentExercise + 1))}
                disabled={currentExercise === exercises.length - 1}
                className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 disabled:from-slate-600 disabled:to-slate-600 disabled:text-gray-400 text-white font-medium py-3 px-4 rounded-xl transition-all duration-300 disabled:cursor-not-allowed"
              >
                Next Exercise
              </button>
            </div>
          </div>

          {/* Exercise Details */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-white mb-4">
                {currentEx.name}
              </h1>
              
              <div className="flex items-center space-x-6 text-gray-400 mb-6">
                <div className="flex items-center space-x-2">
                  <Target className="h-4 w-4" />
                  <span>{currentEx.sets} sets</span>
                </div>
                <div className="flex items-center space-x-2">
                  <RotateCcw className="h-4 w-4" />
                  <span>{currentEx.reps} reps</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>{currentEx.restTime} rest</span>
                </div>
              </div>

              <p className="text-gray-300 leading-relaxed">
                {currentEx.description}
              </p>
            </div>

            {/* Timer Controls */}
            <div className="bg-gradient-to-br from-slate-800/60 to-slate-700/40 backdrop-blur-lg rounded-2xl p-6 border border-slate-600/30">
              <h3 className="text-lg font-semibold text-white mb-4">Workout Timer</h3>
              
              <div className="text-center mb-6">
                <div className="text-6xl font-bold text-orange-400 mb-2">
                  2:30
                </div>
                <div className="text-gray-400">Rest Time Remaining</div>
              </div>

              <div className="flex space-x-4 mb-4">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-medium py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                  <span>{isPlaying ? 'Pause' : 'Start'}</span>
                </button>
                
                <button className="bg-slate-700 hover:bg-slate-600 text-white font-medium py-3 px-4 rounded-xl transition-all duration-300">
                  <RotateCcw className="h-5 w-5" />
                </button>
                
                <button className="bg-slate-700 hover:bg-slate-600 text-white font-medium py-3 px-4 rounded-xl transition-all duration-300">
                  <Volume2 className="h-5 w-5" />
                </button>
              </div>

              {/* Set Progress */}
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">Set Progress</span>
                <div className="flex space-x-2">
                  {[...Array(currentEx.sets)].map((_, index) => (
                    <div
                      key={index}
                      className={`w-3 h-3 rounded-full ${
                        index < currentSet ? 'bg-orange-500' : 'bg-slate-600'
                      }`}
                    ></div>
                  ))}
                </div>
              </div>
            </div>

            {/* Set Controls */}
            <div className="flex space-x-4">
              <button
                onClick={() => setCurrentSet(Math.max(1, currentSet - 1))}
                disabled={currentSet === 1}
                className="flex-1 bg-slate-800/50 hover:bg-slate-700/50 disabled:bg-slate-800/30 disabled:text-gray-500 text-white font-medium py-3 px-4 rounded-xl transition-all duration-300 disabled:cursor-not-allowed"
              >
                Previous Set
              </button>
              <button
                onClick={() => setCurrentSet(Math.min(currentEx.sets, currentSet + 1))}
                disabled={currentSet === currentEx.sets}
                className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 disabled:from-slate-600 disabled:to-slate-600 disabled:text-gray-400 text-white font-medium py-3 px-4 rounded-xl transition-all duration-300 disabled:cursor-not-allowed"
              >
                Complete Set
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkoutDetail;
