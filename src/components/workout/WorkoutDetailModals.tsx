
import WorkoutPreparation from "./WorkoutPreparation";
import ExerciseAdjustment from "./ExerciseAdjustment";
import WorkoutFinishConfirmation from "./WorkoutFinishConfirmation";

interface WorkoutDetailModalsProps {
  showPreparation: boolean;
  showAdjustments: boolean;
  showFinishConfirmation: boolean;
  exercisesForAdjustment: any[];
  getCompletedExercisesCount: () => number;
  totalExercises: number;
  getWorkoutDuration: () => string;
  handleWorkoutStart: () => void;
  handleAdjustExercises: () => void;
  handleCancelPreparation: () => void;
  handleSaveAdjustments: (adjustments: any) => void;
  handleCancelAdjustments: () => void;
  handleFinishConfirmed: () => void;
  handleFinishCancelled: () => void;
}

const WorkoutDetailModals = ({
  showPreparation,
  showAdjustments,
  showFinishConfirmation,
  exercisesForAdjustment,
  getCompletedExercisesCount,
  totalExercises,
  getWorkoutDuration,
  handleWorkoutStart,
  handleAdjustExercises,
  handleCancelPreparation,
  handleSaveAdjustments,
  handleCancelAdjustments,
  handleFinishConfirmed,
  handleFinishCancelled
}: WorkoutDetailModalsProps) => {
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

      {showFinishConfirmation && (
        <WorkoutFinishConfirmation
          onConfirm={handleFinishConfirmed}
          onCancel={handleFinishCancelled}
          completedExercises={getCompletedExercisesCount()}
          totalExercises={totalExercises}
          workoutDuration={getWorkoutDuration()}
        />
      )}
    </>
  );
};

export default WorkoutDetailModals;
