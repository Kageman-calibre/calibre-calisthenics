
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { beginnerPrograms } from "../../../data/beginnerPrograms";
import { useProgramProgress } from "../../../hooks/useProgramProgress";
import { useRPGSystem } from "@/hooks/useRPGSystem";
import { useToast } from "@/hooks/use-toast";

export const useProgramActions = () => {
  const [showPreparation, setShowPreparation] = useState(false);
  const [showAdjustments, setShowAdjustments] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<any>(null);
  const { updateProgress } = useProgramProgress();
  const { awardXP, awardBadge } = useRPGSystem();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleStartProgram = (programId: string) => {
    const program = beginnerPrograms.find(p => p.id === programId);
    if (!program) return;

    setSelectedProgram(program);
    setShowPreparation(true);

    // Award XP for starting a new program
    awardXP('new_exercise');
    
    toast({
      title: "Program Selected! 🎯",
      description: `Get ready to start ${program.name}. Complete your preparation checklist!`,
    });
  };

  const handleWorkoutStart = async () => {
    if (!selectedProgram) return;
    
    // Award XP for actually starting the workout
    awardXP('workout_complete', 0.3);
    
    // Update program progress
    await updateProgress(selectedProgram.id, selectedProgram.name);
    
    setShowPreparation(false);
    
    toast({
      title: "Program Started! 🚀",
      description: `${selectedProgram.name} is now active. You've earned XP for starting!`,
    });
    
    // Navigate to program detail page
    navigate(`/programs/${selectedProgram.id}`);
  };

  const handleAdjustExercises = () => {
    setShowPreparation(false);
    setShowAdjustments(true);
  };

  const handleSaveAdjustments = (adjustments: any) => {
    console.log('Program adjustments saved:', adjustments);
    
    // Award XP for customizing program
    awardXP('new_exercise', 0.2);
    
    toast({
      title: "Program Customized! ⚙️",
      description: "Your program adjustments have been saved. You earned XP for personalization!",
    });
    
    setShowAdjustments(false);
    setShowPreparation(true);
  };

  const handleCancelPreparation = () => {
    setShowPreparation(false);
    setSelectedProgram(null);
  };

  const handleCancelAdjustments = () => {
    setShowAdjustments(false);
    setShowPreparation(true);
  };

  // Mock exercise data for adjustments from selected program
  const getExercisesForAdjustment = () => {
    if (!selectedProgram?.weeklySchedule?.[0]?.workouts?.[0]?.exercises) return [];
    
    return selectedProgram.weeklySchedule[0].workouts[0].exercises.map((ex: any) => ({
      id: ex.id || ex.name.toLowerCase().replace(/\s+/g, '-'),
      name: ex.name,
      defaultSets: ex.sets || 3,
      defaultReps: ex.reps || '10-12',
      defaultRest: ex.restTime || '60s'
    }));
  };

  return {
    showPreparation,
    showAdjustments,
    selectedProgram,
    handleStartProgram,
    handleWorkoutStart,
    handleAdjustExercises,
    handleSaveAdjustments,
    handleCancelPreparation,
    handleCancelAdjustments,
    getExercisesForAdjustment
  };
};
