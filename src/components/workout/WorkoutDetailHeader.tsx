
import { ArrowLeft } from "lucide-react";

interface WorkoutDetailHeaderProps {
  currentExercise: number;
  totalExercises: number;
  currentSet: number;
  totalSets: number;
}

const WorkoutDetailHeader = ({ 
  currentExercise, 
  totalExercises, 
  currentSet, 
  totalSets 
}: WorkoutDetailHeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-8">
      <button className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors">
        <ArrowLeft className="h-5 w-5" />
        <span>Back to Program</span>
      </button>
      
      <div className="flex items-center space-x-4">
        <div className="text-sm font-medium text-orange-400">
          Exercise {currentExercise + 1} of {totalExercises}
        </div>
        <div className="text-sm text-gray-400">
          Set {currentSet} of {totalSets}
        </div>
      </div>
    </div>
  );
};

export default WorkoutDetailHeader;
