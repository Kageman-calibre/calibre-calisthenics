
import { Clock, Target, Users, ChevronRight, Play, Filter, Trophy, CheckCircle } from "lucide-react";
import { BeginnerProgram } from "../../data/beginnerPrograms";
import { ProgramProgress } from "../../hooks/useProgramProgress";

interface ProgramCardProps {
  program: BeginnerProgram;
  progress?: ProgramProgress;
  onStartProgram: (programId: string) => void;
}

const ProgramCard = ({ program, progress, onStartProgram }: ProgramCardProps) => {
  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner": return "bg-emerald-500";
      case "Intermediate": return "bg-orange-500";
      case "Advanced": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const getButtonText = () => {
    if (progress?.isCompleted) return 'Restart Program';
    if (progress && progress.completedWorkouts > 0) return 'Continue Program';
    return 'Start Program';
  };

  return (
    <div className="group bg-gradient-to-br from-slate-800/60 to-slate-700/40 backdrop-blur-lg rounded-3xl overflow-hidden border border-slate-600/30 hover:border-emerald-500/40 transition-all duration-500 transform hover:scale-[1.02] cursor-pointer">
      <div className="relative">
        <img
          src={program.image}
          alt={program.name}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
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

        <div className="absolute top-4 right-4">
          <div className="bg-slate-900/70 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Play className="h-4 w-4 text-emerald-400" />
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

      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-2xl font-bold text-white group-hover:text-emerald-400 transition-colors">
            {program.name}
          </h3>
          {progress && (
            <div className="flex items-center space-x-1 text-emerald-400">
              <Trophy className="h-4 w-4" />
              <span className="text-xs font-medium">
                {progress.completedWorkouts}/{progress.totalWorkouts}
              </span>
            </div>
          )}
        </div>
        
        <p className="text-gray-400 mb-4 text-sm leading-relaxed">
          {program.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {program.focus.slice(0, 3).map((focus, index) => (
            <span
              key={index}
              className="text-xs bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded-full border border-emerald-500/20"
            >
              {focus}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
          <div className="flex items-center space-x-2 text-gray-400">
            <Clock className="h-4 w-4" />
            <span>{program.duration}</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-400">
            <Target className="h-4 w-4" />
            <span>{program.workoutsPerWeek}/week</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-400">
            <Users className="h-4 w-4" />
            <span>{program.totalWorkouts} workouts</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-400">
            <Filter className="h-4 w-4" />
            <span>{program.equipment.join(", ")}</span>
          </div>
        </div>

        {progress?.lastWorkoutDate && (
          <div className="text-xs text-gray-500 mb-4">
            Last workout: {new Date(progress.lastWorkoutDate).toLocaleDateString()}
          </div>
        )}

        <button 
          onClick={() => onStartProgram(program.id)}
          className="w-full bg-gradient-to-r from-emerald-500/10 to-green-500/10 hover:from-emerald-500 hover:to-green-500 border border-emerald-500/30 hover:border-transparent text-emerald-400 hover:text-white font-medium py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 group/btn"
        >
          <span>{getButtonText()}</span>
          <ChevronRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default ProgramCard;
