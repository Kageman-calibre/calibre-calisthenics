
import { ArrowLeft, Clock, Target, Play, Pause, RotateCcw, Volume2, CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { getExerciseById } from "../data/exerciseDatabase";
import ExerciseCard from "./ExerciseCard";
import WorkoutTimer from "./WorkoutTimer";
import { useWorkoutProgress } from "./WorkoutProgress";

const WorkoutDetail = () => {
  const [currentExercise, setCurrentExercise] = useState(0);
  const [currentSet, setCurrentSet] = useState(1);
  const [isResting, setIsResting] = useState(false);
  const [workoutStartTime, setWorkoutStartTime] = useState<Date | null>(null);
  const [completedSets, setCompletedSets] = useState<number[]>([]);
  const { addWorkoutSession } = useWorkoutProgress();

  const exerciseIds = ["push-ups", "pull-ups", "squats", "plank"];
  const exercises = exerciseIds.map(id => getExerciseById(id)).filter(Boolean);
  const currentEx = exercises[currentExercise];

  useEffect(() => {
    if (!workoutStartTime) {
      setWorkoutStartTime(new Date());
    }
  }, []);

  const handleCompleteSet = () => {
    const setKey = currentExercise * 10 + currentSet;
    setCompletedSets(prev => [...prev, setKey]);
    
    if (currentSet < currentEx.sets) {
      setCurrentSet(prev => prev + 1);
      setIsResting(true);
    } else {
      // Move to next exercise
      if (currentExercise < exercises.length - 1) {
        setCurrentExercise(prev => prev + 1);
        setCurrentSet(1);
        setIsResting(true);
      } else {
        // Workout complete
        handleWorkoutComplete();
      }
    }
  };

  const handleWorkoutComplete = () => {
    if (workoutStartTime) {
      const duration = Math.floor((new Date().getTime() - workoutStartTime.getTime()) / (1000 * 60));
      const totalCalories = exercises.reduce((sum, ex) => sum + ex.calories, 0);
      
      addWorkoutSession({
        date: new Date().toISOString(),
        exercises: exercises.map(ex => ex.name),
        duration,
        calories: totalCalories,
        difficulty: 'intermediate'
      });
    }
  };

  const handleTimerComplete = () => {
    setIsResting(false);
  };

  const getRestTime = (exerciseIndex: number) => {
    const exercise = exercises[exerciseIndex];
    return parseInt(exercise.restTime.replace('s', ''));
  };

  const isSetCompleted = (exerciseIndex: number, setNumber: number) => {
    const setKey = exerciseIndex * 10 + setNumber;
    return completedSets.includes(setKey);
  };

  if (!currentEx) {
    return <div className="text-white">Loading...</div>;
  }

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
          {/* Exercise Details */}
          <div>
            <ExerciseCard 
              exercise={currentEx} 
              showDetails={true}
            />
            
            {/* Exercise Navigation */}
            <div className="flex space-x-4 mt-6">
              <button
                onClick={() => {
                  setCurrentExercise(Math.max(0, currentExercise - 1));
                  setCurrentSet(1);
                  setIsResting(false);
                }}
                disabled={currentExercise === 0}
                className="flex-1 bg-slate-800/50 hover:bg-slate-700/50 disabled:bg-slate-800/30 disabled:text-gray-500 text-white font-medium py-3 px-4 rounded-xl transition-all duration-300 disabled:cursor-not-allowed"
              >
                Previous Exercise
              </button>
              <button
                onClick={() => {
                  setCurrentExercise(Math.min(exercises.length - 1, currentExercise + 1));
                  setCurrentSet(1);
                  setIsResting(false);
                }}
                disabled={currentExercise === exercises.length - 1}
                className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 disabled:from-slate-600 disabled:to-slate-600 disabled:text-gray-400 text-white font-medium py-3 px-4 rounded-xl transition-all duration-300 disabled:cursor-not-allowed"
              >
                Next Exercise
              </button>
            </div>
          </div>

          {/* Workout Controls */}
          <div className="space-y-8">
            {/* Timer */}
            {isResting ? (
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Rest Time</h3>
                <WorkoutTimer
                  initialTime={getRestTime(currentExercise)}
                  onComplete={handleTimerComplete}
                  autoStart={true}
                />
              </div>
            ) : (
              <div className="bg-gradient-to-br from-slate-800/60 to-slate-700/40 backdrop-blur-lg rounded-2xl p-6 border border-slate-600/30">
                <h3 className="text-lg font-semibold text-white mb-4">Current Set</h3>
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-orange-400 mb-2">
                    Set {currentSet} of {currentEx.sets}
                  </div>
                  <div className="text-gray-400">
                    {currentEx.reps} reps • {currentEx.restTime} rest
                  </div>
                </div>
                
                <button
                  onClick={handleCompleteSet}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-medium py-4 px-4 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <CheckCircle className="h-5 w-5" />
                  <span>Complete Set</span>
                </button>
              </div>
            )}

            {/* Set Progress */}
            <div className="bg-gradient-to-br from-slate-800/60 to-slate-700/40 backdrop-blur-lg rounded-2xl p-6 border border-slate-600/30">
              <h3 className="text-lg font-semibold text-white mb-4">Exercise Progress</h3>
              
              <div className="space-y-4">
                {exercises.map((exercise, exerciseIndex) => (
                  <div key={exercise.id} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className={`text-sm font-medium ${
                        exerciseIndex === currentExercise ? 'text-orange-400' : 'text-gray-400'
                      }`}>
                        {exercise.name}
                      </span>
                      <span className="text-xs text-gray-500">
                        {exercise.sets} sets
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      {[...Array(exercise.sets)].map((_, setIndex) => (
                        <div
                          key={setIndex}
                          className={`flex-1 h-2 rounded-full ${
                            isSetCompleted(exerciseIndex, setIndex + 1)
                              ? 'bg-green-500'
                              : exerciseIndex === currentExercise && setIndex + 1 === currentSet
                              ? 'bg-orange-500'
                              : 'bg-slate-600'
                          }`}
                        ></div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkoutDetail;
