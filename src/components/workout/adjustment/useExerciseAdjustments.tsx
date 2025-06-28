
import { useState } from 'react';
import { ExerciseAdjustment } from './ExerciseAdjustmentCard';

interface Exercise {
  id: string;
  name: string;
  defaultSets: number;
  defaultReps: string;
  defaultRest: string;
}

export const useExerciseAdjustments = (exercises: Exercise[]) => {
  const [adjustments, setAdjustments] = useState<Record<string, ExerciseAdjustment>>({});

  const getAdjustment = (exerciseId: string): ExerciseAdjustment => {
    const exercise = exercises.find(e => e.id === exerciseId);
    return adjustments[exerciseId] || {
      sets: exercise?.defaultSets || 3,
      reps: parseInt(exercise?.defaultReps?.split('-')[0] || '10'),
      difficulty: 'normal',
      restTime: parseInt(exercise?.defaultRest?.replace('s', '') || '60')
    };
  };

  const updateAdjustment = (exerciseId: string, updates: Partial<ExerciseAdjustment>) => {
    setAdjustments(prev => ({
      ...prev,
      [exerciseId]: { ...getAdjustment(exerciseId), ...updates }
    }));
  };

  const resetToDefaults = () => {
    setAdjustments({});
  };

  return {
    adjustments,
    getAdjustment,
    updateAdjustment,
    resetToDefaults
  };
};
