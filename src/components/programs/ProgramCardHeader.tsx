
import { Play, Star, CheckCircle, Zap, MapPin } from "lucide-react";
import { BeginnerProgram } from "../../data/beginnerPrograms";
import { ProgramProgress } from "../../hooks/useProgramProgress";
import OptimizedImage from "../ui/optimized-image";

interface ProgramCardHeaderProps {
  program: BeginnerProgram;
  progress?: ProgramProgress;
  estimatedCalories: number;
  mockRating: number;
}

const ProgramCardHeader = ({ program, progress, estimatedCalories, mockRating }: ProgramCardHeaderProps) => {
  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner": return "bg-emerald-500";
      case "Intermediate": return "bg-orange-500";
      case "Advanced": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="relative">
      <OptimizedImage
        src={program.image}
        alt={program.name}
        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
        width={400}
        height={192}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent"></div>
      
      <div className="absolute top-4 left-4 flex items-center space-x-2">
        <span className={`px-3 py-1 rounded-full text-xs font-bold text-white ${getLevelColor(program.level)}`}>
          {program.level}
        </span>
        {progress?.isCompleted && (
          <div className="bg-green-500/20 backdrop-blur-sm rounded-full p-1.5">
            <CheckCircle className="h-4 w-4 text-green-400" />
          </div>
        )}
      </div>

      <div className="absolute top-4 right-4 flex items-center space-x-2">
        {/* Rating Display */}
        <div className="bg-slate-900/70 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1">
          <Star className="h-3 w-3 text-yellow-400 fill-current" />
          <span className="text-xs text-white font-medium">{mockRating.toFixed(1)}</span>
        </div>
        
        {/* Video Preview Button */}
        <div className="bg-slate-900/70 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-emerald-500/80 cursor-pointer">
          <Play className="h-4 w-4 text-white" />
        </div>
      </div>

      {/* Estimated Calories */}
      <div className="absolute bottom-16 left-4 bg-slate-900/80 backdrop-blur-sm rounded-full px-3 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="flex items-center space-x-1 text-orange-400">
          <Zap className="h-3 w-3" />
          <span className="text-xs font-medium">~{estimatedCalories} cal</span>
        </div>
      </div>

      {/* Required Space Indicator */}
      <div className="absolute bottom-16 right-4 bg-slate-900/80 backdrop-blur-sm rounded-full px-3 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="flex items-center space-x-1 text-blue-400">
          <MapPin className="h-3 w-3" />
          <span className="text-xs font-medium">Small space</span>
        </div>
      </div>

      {/* Progress Bar */}
      {progress && progress.completionPercentage > 0 && (
        <div className="absolute bottom-0 left-0 right-0 bg-slate-900/80 backdrop-blur-sm px-4 py-2">
          <div className="flex items-center justify-between text-xs text-gray-300 mb-1">
            <span>Progress</span>
            <span>{progress.completionPercentage}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-1.5">
            <div 
              className="bg-emerald-500 h-1.5 rounded-full transition-all duration-300" 
              style={{ width: `${progress.completionPercentage}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgramCardHeader;
