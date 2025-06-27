
import ProgramCard from "../../programs/ProgramCard";
import { useProgramProgress } from "../../../hooks/useProgramProgress";

interface ProgramsGridProps {
  programs: any[];
  onStartProgram: (programId: string) => void;
}

const ProgramsGrid = ({ programs, onStartProgram }: ProgramsGridProps) => {
  const { programProgress } = useProgramProgress();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {programs.map((program) => (
        <ProgramCard
          key={program.id}
          program={program}
          progress={programProgress[program.id]}
          onStartProgram={onStartProgram}
        />
      ))}
    </div>
  );
};

export default ProgramsGrid;
