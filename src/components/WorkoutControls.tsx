
import { CheckCircle, Flag } from "lucide-react";

interface WorkoutControlsProps {
  currentSet: number;
  totalSets: number;
  reps: string;
  restTime: string;
  onCompleteSet: () => void;
  onFinishWorkout: () => void;
  showFinishButton?: boolean;
}

const WorkoutControls = ({ 
  currentSet, 
  totalSets, 
  reps, 
  restTime, 
  onCompleteSet,
  onFinishWorkout,
  showFinishButton = true
}: WorkoutControlsProps) => {
  return (
    <div className="bg-gradient-to-br from-slate-800/60 to-slate-700/40 backdrop-blur-lg rounded-2xl p-6 border border-slate-600/30">
      <h3 className="text-lg font-semibold text-white mb-4">Current Set</h3>
      <div className="text-center mb-6">
        <div className="text-4xl font-bold text-orange-400 mb-2">
          Set {currentSet} of {totalSets}
        </div>
        <div className="text-gray-400">
          {reps} reps • {restTime} rest
        </div>
      </div>
      
      <div className="space-y-3">
        <button
          onClick={onCompleteSet}
          className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-medium py-4 px-4 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2"
        >
          <CheckCircle className="h-5 w-5" />
          <span>Complete Set</span>
        </button>
        
        {showFinishButton && (
          <button
            onClick={onFinishWorkout}
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-medium py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2"
          >
            <Flag className="h-4 w-4" />
            <span>Finish Workout</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default WorkoutControls;
