
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, Lock, Timer, Trophy } from 'lucide-react';
import { SkillRequirement, getDifficultyColor } from './constants';

interface SkillCardProps {
  skill: SkillRequirement;
  isCompleted: boolean;
  onMarkComplete: (skillId: string) => void;
}

const SkillCard = ({ skill, isCompleted, onMarkComplete }: SkillCardProps) => {
  return (
    <div
      className={`p-4 rounded-lg border ${
        isCompleted 
          ? 'bg-green-500/10 border-green-500/30' 
          : 'bg-slate-700/30 border-slate-600'
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          {isCompleted ? (
            <CheckCircle className="h-5 w-5 text-green-400" />
          ) : (
            <Lock className="h-5 w-5 text-gray-500" />
          )}
          <h3 className="text-white font-medium">{skill.name}</h3>
        </div>
        <Badge className={getDifficultyColor(skill.difficulty)}>
          {skill.difficulty}
        </Badge>
      </div>
      
      <p className="text-gray-300 text-sm mb-3">{skill.description}</p>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-gray-400">
          {skill.type === 'hold' ? (
            <Timer className="h-4 w-4" />
          ) : (
            <Trophy className="h-4 w-4" />
          )}
          Target: {skill.targetValue} {skill.unit}
        </div>
        
        {!isCompleted && (
          <Button
            size="sm"
            onClick={() => onMarkComplete(skill.id)}
            className="bg-orange-500 hover:bg-orange-600"
          >
            Mark Complete
          </Button>
        )}
      </div>
    </div>
  );
};

export default SkillCard;
