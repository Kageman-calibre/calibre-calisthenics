
import { Progress } from '@/components/ui/progress';

interface SkillProgressProps {
  completed: number;
  total: number;
}

const SkillProgress = ({ completed, total }: SkillProgressProps) => {
  return (
    <div className="mt-4">
      <div className="flex justify-between text-sm text-gray-400 mb-2">
        <span>Progress</span>
        <span>{completed} / {total}</span>
      </div>
      <Progress 
        value={(completed / total) * 100} 
        className="h-2"
      />
    </div>
  );
};

export default SkillProgress;
