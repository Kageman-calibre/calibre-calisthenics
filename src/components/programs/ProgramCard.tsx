
import { Clock, Target, Users, ChevronRight, Play, Filter, Trophy, CheckCircle, Star, Calendar, Zap, MapPin } from "lucide-react";
import { BeginnerProgram } from "../../data/beginnerPrograms";
import { ProgramProgress } from "../../hooks/useProgramProgress";
import OptimizedImage from "../ui/optimized-image";

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

  // Calculate estimated calories (rough estimation)
  const estimatedCalories = Math.round((program.totalWorkouts * 25) + (program.workoutsPerWeek * 15));

  // Get first 3 exercises from the program for preview - fix the type issue
  const previewExercises = program.weeklySchedule?.[0]?.workouts?.[0]?.exercises?.slice(0, 3) || [];

  // Mock rating (in real app, this would come from user reviews)
  const mockRating = 4.2 + (Math.random() * 0.8);
  const mockReviews = Math.floor(Math.random() * 500) + 50;

  return (
    <div className="group bg-gradient-to-br from-slate-800/60 to-slate-700/40 backdrop-blur-lg rounded-3xl overflow-hidden border border-slate-600/30 hover:border-emerald-500/40 transition-all duration-500 transform hover:scale-[1.02] cursor-pointer">
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

        {/* Rating and Reviews */}
        <div className="flex items-center space-x-3 mb-3">
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`h-3 w-3 ${i < Math.floor(mockRating) ? 'text-yellow-400 fill-current' : 'text-gray-500'}`} 
              />
            ))}
          </div>
          <span className="text-xs text-gray-400">({mockReviews} reviews)</span>
        </div>
        
        <p className="text-gray-400 mb-4 text-sm leading-relaxed">
          {program.description}
        </p>

        {/* Exercise Preview */}
        {previewExercises.length > 0 && (
          <div className="mb-4">
            <h4 className="text-xs font-semibold text-emerald-400 mb-2 uppercase tracking-wide">First Exercises</h4>
            <div className="space-y-1">
              {previewExercises.map((exerciseName, index) => (
                <div key={index} className="text-xs text-gray-300 flex items-center space-x-2">
                  <div className="w-1 h-1 bg-emerald-500 rounded-full"></div>
                  <span>{typeof exerciseName === 'string' ? exerciseName : 'Exercise'}</span>
                  <span className="text-gray-500">• 3x10</span>
                </div>
              ))}
              {program.weeklySchedule?.[0]?.workouts?.[0]?.exercises?.length > 3 && (
                <div className="text-xs text-gray-500 ml-3">
                  +{program.weeklySchedule[0].workouts[0].exercises.length - 3} more exercises
                </div>
              )}
            </div>
          </div>
        )}

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
          <div className="flex items-center space-x-2 text-xs text-gray-500 mb-4">
            <Calendar className="h-3 w-3" />
            <span>Last workout: {new Date(progress.lastWorkoutDate).toLocaleDateString()}</span>
          </div>
        )}

        {/* User Testimonial */}
        <div className="bg-slate-700/30 rounded-lg p-3 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <p className="text-xs text-gray-300 italic">
            "Great progression and clear instructions. Perfect for beginners!"
          </p>
          <p className="text-xs text-gray-500 mt-1">- Sarah K.</p>
        </div>

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
