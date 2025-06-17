
interface WorkoutNavigationProps {
  currentExercise: number;
  totalExercises: number;
  onPrevious: () => void;
  onNext: () => void;
}

const WorkoutNavigation = ({ 
  currentExercise, 
  totalExercises, 
  onPrevious, 
  onNext 
}: WorkoutNavigationProps) => {
  return (
    <div className="flex space-x-4 mt-6">
      <button
        onClick={onPrevious}
        disabled={currentExercise === 0}
        className="flex-1 bg-slate-800/50 hover:bg-slate-700/50 disabled:bg-slate-800/30 disabled:text-gray-500 text-white font-medium py-3 px-4 rounded-xl transition-all duration-300 disabled:cursor-not-allowed"
      >
        Previous Exercise
      </button>
      <button
        onClick={onNext}
        disabled={currentExercise === totalExercises - 1}
        className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 disabled:from-slate-600 disabled:to-slate-600 disabled:text-gray-400 text-white font-medium py-3 px-4 rounded-xl transition-all duration-300 disabled:cursor-not-allowed"
      >
        Next Exercise
      </button>
    </div>
  );
};

export default WorkoutNavigation;
