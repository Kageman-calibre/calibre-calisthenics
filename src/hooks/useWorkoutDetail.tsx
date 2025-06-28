
import { useState, useEffect } from "react";
import { getExerciseById } from "../data/exerciseDatabase";
import { useWorkoutProgress } from "../components/WorkoutProgress";
import { useRPGSystem } from "@/hooks/useRPGSystem";
import { useToast } from "@/hooks/use-toast";

export const useWorkoutDetail = () => {
  const [currentExercise, setCurrentExercise] = useState(0);
  const [currentSet, setCurrentSet] = useState(1);
  const [isResting, setIsResting] = useState(false);
  const [workoutStartTime, setWorkoutStartTime] = useState<Date | null>(null);
  const [completedSets, setCompletedSets] = useState<number[]>([]);
  const [showPreparation, setShowPreparation] = useState(true);
  const [showAdjustments, setShowAdjustments] = useState(false);
  const [showFinishConfirmation, setShowFinishConfirmation] = useState(false);
  const [workoutStarted, setWorkoutStarted] = useState(false);
  
  const { addWorkoutSession } = useWorkoutProgress();
  const { awardXP, awardBadge } = useRPGSystem();
  const { toast } = useToast();

  const exerciseIds = ["push-ups", "pull-ups", "squats", "plank"];
  const exercises = exerciseIds.map(id => getExerciseById(id)).filter(Boolean);
  const currentEx = exercises[currentExercise];

  useEffect(() => {
    if (!workoutStartTime) {
      setWorkoutStartTime(new Date());
    }
  }, []);

  const handleWorkoutStart = () => {
    setWorkoutStartTime(new Date());
    setShowPreparation(false);
    setWorkoutStarted(true);
    
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

  const handleFinishWorkout = () => {
    setShowFinishConfirmation(true);
  };

  const handleFinishConfirmed = () => {
    setShowFinishConfirmation(false);
    handleWorkoutComplete();
  };

  const handleFinishCancelled = () => {
    setShowFinishConfirmation(false);
  };

  const getWorkoutDuration = () => {
    if (!workoutStartTime) return "0:00";
    const duration = Math.floor((new Date().getTime() - workoutStartTime.getTime()) / (1000 * 60));
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return hours > 0 ? `${hours}:${minutes.toString().padStart(2, '0')}` : `${minutes}:00`;
  };

  const getCompletedExercisesCount = () => {
    let completedExercises = 0;
    exercises.forEach((exercise, index) => {
      const exerciseCompleted = [...Array(exercise.sets)].every((_, setIndex) => {
        const setKey = index * 10 + (setIndex + 1);
        return completedSets.includes(setKey);
      });
      if (exerciseCompleted) completedExercises++;
    });
    return completedExercises;
  };

  const handleCompleteSet = () => {
    const setKey = currentExercise * 10 + currentSet;
    setCompletedSets(prev => [...prev, setKey]);
    
    awardXP('new_exercise', 0.5);
    
    if (currentSet < currentEx.sets) {
      setCurrentSet(prev => prev + 1);
      setIsResting(true);
    } else {
      if (currentExercise < exercises.length - 1) {
        setCurrentExercise(prev => prev + 1);
        setCurrentSet(1);
        setIsResting(true);
        
        awardXP('new_exercise');
      } else {
        handleWorkoutComplete();
      }
    }
  };

  const handleWorkoutComplete = async () => {
    if (workoutStartTime) {
      const duration = Math.floor((new Date().getTime() - workoutStartTime.getTime()) / (1000 * 60));
      const totalCalories = exercises.reduce((sum, ex) => sum + ex.calories, 0);
      
      await addWorkoutSession({
        exercises: exercises.map(ex => ex.name),
        duration,
        calories: totalCalories,
        difficulty: 'intermediate',
        programName: 'Default Workout'
      });

      awardXP('workout_complete');
      
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

  const exercisesForAdjustment = exercises.map(ex => ({
    id: ex.id,
    name: ex.name,
    defaultSets: ex.sets,
    defaultReps: ex.reps,
    defaultRest: ex.restTime
  }));

  return {
    // State
    currentExercise,
    currentSet,
    isResting,
    completedSets,
    showPreparation,
    showAdjustments,
    showFinishConfirmation,
    workoutStarted,
    exercises,
    currentEx,
    exercisesForAdjustment,
    
    // Handlers
    handleWorkoutStart,
    handleAdjustExercises,
    handleSaveAdjustments,
    handleCancelPreparation,
    handleCancelAdjustments,
    handleFinishWorkout,
    handleFinishConfirmed,
    handleFinishCancelled,
    handleCompleteSet,
    handleTimerComplete,
    handlePreviousExercise,
    handleNextExercise,
    
    // Computed values
    getWorkoutDuration,
    getCompletedExercisesCount,
    getRestTime
  };
};
