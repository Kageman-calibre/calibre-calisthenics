
import { ChevronRight } from "lucide-react";
import { BeginnerProgram } from "../../data/beginnerPrograms";
import { ProgramProgress } from "../../hooks/useProgramProgress";
import ProgramCardHeader from "./ProgramCardHeader";
import ProgramCardContent from "./ProgramCardContent";
import ProgramCardStats from "./ProgramCardStats";

interface ProgramCardProps {
  program: BeginnerProgram;
  progress?: ProgramProgress;
  onStartProgram: (programId: string) => void;
}

const ProgramCard = ({ program, progress, onStartProgram }: ProgramCardProps) => {
  const getButtonText = () => {
    if (progress?.isCompleted) return 'Restart Program';
    if (progress && progress.completedWorkouts > 0) return 'Continue Program';
    return 'Start Program';
  };

  // Calculate estimated calories (rough estimation)
  const estimatedCalories = Math.round((program.totalWorkouts * 25) + (program.workoutsPerWeek * 15));

  // Get first 3 exercises from the program for preview
  const previewExercises = program.weeklySchedule?.[0]?.workouts?.[0]?.exercises?.slice(0, 3) || [];

  // Mock rating (in real app, this would come from user reviews)
  const mockRating = 4.2 + (Math.random() * 0.8);
  const mockReviews = Math.floor(Math.random() * 500) + 50;

  return (
    <div className="group bg-gradient-to-br from-slate-800/60 to-slate-700/40 backdrop-blur-lg rounded-3xl overflow-hidden border border-slate-600/30 hover:border-emerald-500/40 transition-all duration-500 transform hover:scale-[1.02] cursor-pointer">
      <ProgramCardHeader 
        program={program}
        progress={progress}
        estimatedCalories={estimatedCalories}
        mockRating={mockRating}
      />

      <div className="p-6">
        <ProgramCardContent
          program={program}
          progress={progress}
          mockRating={mockRating}
          mockReviews={mockReviews}
          previewExercises={previewExercises}
        />

        <ProgramCardStats program={program} />

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
