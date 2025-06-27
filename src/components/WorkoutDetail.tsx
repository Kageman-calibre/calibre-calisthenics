import { ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";
import { getExerciseById } from "../data/exerciseDatabase";
import ExerciseCard from "./ExerciseCard";
import EnhancedWorkoutTimer from "./timer/EnhancedWorkoutTimer";
import WorkoutControls from "./WorkoutControls";
import ExerciseProgress from "./ExerciseProgress";
import WorkoutNavigation from "./WorkoutNavigation";
import WorkoutPreparation from "./workout/WorkoutPreparation";
import ExerciseAdjustment from "./workout/ExerciseAdjustment";
import { useWorkoutProgress } from "./WorkoutProgress";
import { useRPGSystem } from "@/hooks/useRPGSystem";
import { useToast } from "@/hooks/use-toast";

const WorkoutDetail = () => {
  const [currentExercise, setCurrentExercise] = useState(0);
  const [currentSet, setCurrentSet] = useState(1);
  const [isResting, setIsResting] = useState(false);
  const [workoutStartTime, setWorkoutStartTime] = useState<Date | null>(null);
  const [completedSets, setCompletedSets] = useState<number[]>([]);
  const [showPreparation, setShowPreparation] = useState(true);
  const [showAdjustments, setShowAdjustments] = useState(false);
  const [workoutStarted, setWorkoutStarted] = useState(false);
  const { addWorkoutSession } = useWorkoutProgress();
  const { awardXP, awardBadge } = useRPGSystem();
  const { toast } = useToast();

  const exerciseIds = ["push-ups", "pull-ups", "squats", "plank"];
  const exercises = exerciseIds.map(id => getExerciseById(id)).filter(Boolean);
  const currentEx = exercises[currentExercise];

  const handleWorkoutStart = () => {
    setWorkoutStartTime(new Date());
    setShowPreparation(false);
    setWorkoutStarted(true);
    
    // Award XP for starting workout
    awardXP('daily_login');
    
    toast({
      title: "Workout Started! 🔥",
      description: "Let's crush this workout together!",
    });
  };

  const handleAdjustExercises = () => {
    setShowPreparation(false);
    setShowAdjustments(true);
  };

  const handleSaveAdjustments = (adjustments: any) => {
    console.log('Exercise adjustments saved:', adjustments);
    toast({
      title: "Adjustments Saved",
      description: "Your exercise modifications have been applied.",
    });
    setShowAdjustments(false);
    setShowPreparation(true);
  };

  const handleCancelPreparation = () => {
    setShowPreparation(false);
    setWorkoutStarted(true);
  };

  const handleCancelAdjustments = () => {
    setShowAdjustments(false);
    setShowPreparation(true);
  };

  const exercisesForAdjustment = exercises.map(ex => ({
    id: ex.id,
    name: ex.name,
    defaultSets: ex.sets,
    defaultReps: ex.reps,
    defaultRest: ex.restTime
  }));

  useEffect(() => {
    if (!workoutStartTime) {
      setWorkoutStartTime(new Date());
    }
  }, []);

  const handleCompleteSet = () => {
    const setKey = currentExercise * 10 + currentSet;
    setCompletedSets(prev => [...prev, setKey]);
    
    // Award XP for completing a set
    awardXP('new_exercise', 0.5);
    
    if (currentSet < currentEx.sets) {
      setCurrentSet(prev => prev + 1);
      setIsResting(true);
    } else {
      // Move to next exercise
      if (currentExercise < exercises.length - 1) {
        setCurrentExercise(prev => prev + 1);
        setCurrentSet(1);
        setIsResting(true);
        
        // Award bonus XP for completing an exercise
        awardXP('new_exercise');
      } else {
        // Workout complete
        handleWorkoutComplete();
      }
    }
  };

  const handleWorkoutComplete = async () => {
    if (workoutStartTime) {
      const duration = Math.floor((new Date().getTime() - workoutStartTime.getTime()) / (1000 * 60));
      const totalCalories = exercises.reduce((sum, ex) => sum + ex.calories, 0);
      
      // Add workout session
      await addWorkoutSession({
        exercises: exercises.map(ex => ex.name),
        duration,
        calories: totalCalories,
        difficulty: 'intermediate',
        programName: 'Default Workout'
      });

      // Award completion XP and badges
      awardXP('workout_complete');
      
      // Check for milestone badges based on workout stats
      if (duration >= 45) {
        awardBadge('endurance_warrior', 'Endurance Warrior', 'Completed a 45+ minute workout!', 'uncommon');
      }
      
      if (totalCalories >= 400) {
        awardBadge('calorie_crusher', 'Calorie Crusher', 'Burned 400+ calories in one workout!', 'rare');
      }

      toast({
        title: "🎉 Workout Complete!",
        description: `Amazing work! You earned XP and potential new badges. Check your RPG progress!`,
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

  if (!workoutStarted) {
    return (
      <>
        {showPreparation && (
          <WorkoutPreparation
            programName="Default Workout"
            onStartWorkout={handleWorkoutStart}
            onAdjustExercises={handleAdjustExercises}
            onCancel={handleCancelPreparation}
          />
        )}

        {showAdjustments && (
          <ExerciseAdjustment
            exercises={exercisesForAdjustment}
            onSave={handleSaveAdjustments}
            onCancel={handleCancelAdjustments}
          />
        )}
      </>
    );
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
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

          <div className="space-y-8">
            {isResting ? (
              <EnhancedWorkoutTimer
                initialTime={getRestTime(currentExercise)}
                onComplete={handleTimerComplete}
                autoStart={true}
                title="Rest Time"
              />
            ) : (
              <WorkoutControls
                currentSet={currentSet}
                totalSets={currentEx.sets}
                reps={currentEx.reps}
                restTime={currentEx.restTime}
                onCompleteSet={handleCompleteSet}
              />
            )}

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
