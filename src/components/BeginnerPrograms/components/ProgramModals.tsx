
import WorkoutPreparation from "../../workout/WorkoutPreparation";
import ExerciseAdjustment from "../../workout/ExerciseAdjustment";

interface ProgramModalsProps {
  showPreparation: boolean;
  showAdjustments: boolean;
  selectedProgram: any;
  onStartWorkout: () => void;
  onAdjustExercises: () => void;
  onCancelPreparation: () => void;
  onSaveAdjustments: (adjustments: any) => void;
  onCancelAdjustments: () => void;
  getExercisesForAdjustment: () => any[];
}

const ProgramModals = ({
  showPreparation,
  showAdjustments,
  selectedProgram,
  onStartWorkout,
  onAdjustExercises,
  onCancelPreparation,
  onSaveAdjustments,
  onCancelAdjustments,
  getExercisesForAdjustment
}: ProgramModalsProps) => {
  return (
    <>
      {showPreparation && selectedProgram && (
        <WorkoutPreparation
          programName={selectedProgram.name}
          onStartWorkout={onStartWorkout}
          onAdjustExercises={onAdjustExercises}
          onCancel={onCancelPreparation}
        />
      )}

      {showAdjustments && selectedProgram && (
        <ExerciseAdjustment
          exercises={getExercisesForAdjustment()}
          onSave={onSaveAdjustments}
          onCancel={onCancelAdjustments}
        />
      )}
    </>
  );
};

export default ProgramModals;
