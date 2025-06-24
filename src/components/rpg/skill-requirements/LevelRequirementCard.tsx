
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, Lock, CheckCircle } from 'lucide-react';
import { LevelRequirement } from './constants';
import SkillCard from './SkillCard';
import SkillProgress from './SkillProgress';

interface LevelRequirementCardProps {
  requirement: LevelRequirement;
  completedSkills: Set<string>;
  onMarkSkillComplete: (skillId: string) => void;
  variant: 'current' | 'upcoming';
}

const LevelRequirementCard = ({ 
  requirement, 
  completedSkills, 
  onMarkSkillComplete, 
  variant 
}: LevelRequirementCardProps) => {
  const completedCount = requirement.skills.filter(skill => 
    completedSkills.has(skill.id)
  ).length;

  const cardClassName = variant === 'current' 
    ? 'bg-slate-800/50 border-orange-500/30'
    : 'bg-slate-800/50 border-slate-700';

  const iconColor = variant === 'current' ? 'text-orange-400' : 'text-gray-400';

  return (
    <Card className={cardClassName}>
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          {variant === 'current' ? (
            <Target className={`h-5 w-5 ${iconColor}`} />
          ) : (
            <Lock className={`h-5 w-5 ${iconColor}`} />
          )}
          {variant === 'current' ? 'Level' : 'Upcoming: Level'} {requirement.level} Requirements - {requirement.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-gray-300">
          {variant === 'current' 
            ? `Complete these skills to unlock Level ${requirement.level}:`
            : `Future challenges to unlock at Level ${requirement.level}:`
          }
        </p>
        
        <div className="grid gap-4">
          {requirement.skills.map((skill) => (
            <SkillCard
              key={skill.id}
              skill={skill}
              isCompleted={completedSkills.has(skill.id)}
              onMarkComplete={onMarkSkillComplete}
            />
          ))}
        </div>
        
        {variant === 'current' && (
          <SkillProgress completed={completedCount} total={requirement.skills.length} />
        )}
      </CardContent>
    </Card>
  );
};

export default LevelRequirementCard;
