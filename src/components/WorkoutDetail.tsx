
import { ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";
import { getExerciseById } from "../data/exerciseDatabase";
import ExerciseCard from "./ExerciseCard";
import WorkoutTimer from "./WorkoutTimer";
import WorkoutControls from "./WorkoutControls";
import ExerciseProgress from "./ExerciseProgress";
import WorkoutNavigation from "./WorkoutNavigation";
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

  const handlePreviousExercise = () => {
    setCurrentExercise(Math.max(0, currentExercise - 1));
    setCurrentSet(1);
    setIsResting(false);
  };

  const handleNextExercise = () => {
    setCurrentExercise(Math.min(exercises.length - 1, currentExercise + 1));
    setCurrentSet(1);
    setIsResting(false);
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
            
            <WorkoutNavigation
              currentExercise={currentExercise}
              totalExercises={exercises.length}
              onPrevious={handlePreviousExercise}
              onNext={handleNextExercise}
            />
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
              <WorkoutControls
                currentSet={currentSet}
                totalSets={currentEx.sets}
                reps={currentEx.reps}
                restTime={currentEx.restTime}
                onCompleteSet={handleCompleteSet}
              />
            )}

            {/* Set Progress */}
            <ExerciseProgress
              exercises={exercises}
              completedSets={completedSets}
              currentExercise={currentExercise}
              currentSet={currentSet}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkoutDetail;
