
import { Flag, Trophy, X } from "lucide-react";

interface WorkoutFinishConfirmationProps {
  onConfirm: () => void;
  onCancel: () => void;
  completedExercises: number;
  totalExercises: number;
  workoutDuration: string;
}

const WorkoutFinishConfirmation = ({
  onConfirm,
  onCancel,
  completedExercises,
  totalExercises,
  workoutDuration
}: WorkoutFinishConfirmationProps) => {
  const isWorkoutComplete = completedExercises === totalExercises;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 max-w-md w-full border border-slate-600/30">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mb-4">
            {isWorkoutComplete ? (
              <Trophy className="h-8 w-8 text-white" />
            ) : (
              <Flag className="h-8 w-8 text-white" />
            )}
          </div>
          
          <h3 className="text-2xl font-bold text-white mb-2">
            {isWorkoutComplete ? "Workout Complete!" : "Finish Workout?"}
          </h3>
          
          <p className="text-gray-300 mb-4">
            {isWorkoutComplete 
              ? "Congratulations! You've completed all exercises."
              : `You've completed ${completedExercises} out of ${totalExercises} exercises.`
            }
          </p>

          <div className="bg-slate-700/50 rounded-lg p-4 mb-6">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-400">Duration:</span>
              <span className="text-white font-medium">{workoutDuration}</span>
            </div>
            <div className="flex justify-between items-center text-sm mt-2">
              <span className="text-gray-400">Progress:</span>
              <span className="text-white font-medium">
                {completedExercises}/{totalExercises} exercises
              </span>
            </div>
          </div>
        </div>

        <div className="flex space-x-3">
          <button
            onClick={onCancel}
            className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-medium py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2"
          >
            <X className="h-4 w-4" />
            <span>Continue</span>
          </button>
          
          <button
            onClick={onConfirm}
            className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-medium py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2"
          >
            <Trophy className="h-4 w-4" />
            <span>Finish</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorkoutFinishConfirmation;
