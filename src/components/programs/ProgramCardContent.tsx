
import { Star, Trophy, Calendar } from "lucide-react";
import { BeginnerProgram } from "../../data/beginnerPrograms";
import { ProgramProgress } from "../../hooks/useProgramProgress";

interface ProgramCardContentProps {
  program: BeginnerProgram;
  progress?: ProgramProgress;
  mockRating: number;
  mockReviews: number;
  previewExercises: string[];
}

const ProgramCardContent = ({ program, progress, mockRating, mockReviews, previewExercises }: ProgramCardContentProps) => {
  return (
    <>
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
    </>
  );
};

export default ProgramCardContent;
