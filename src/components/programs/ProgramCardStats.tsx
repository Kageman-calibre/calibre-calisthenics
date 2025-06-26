
import { Clock, Target, Users, Filter } from "lucide-react";
import { BeginnerProgram } from "../../data/beginnerPrograms";

interface ProgramCardStatsProps {
  program: BeginnerProgram;
}

const ProgramCardStats = ({ program }: ProgramCardStatsProps) => {
  return (
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
  );
};

export default ProgramCardStats;
