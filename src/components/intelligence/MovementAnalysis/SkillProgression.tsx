
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ProgressionData } from './types';

interface SkillProgressionProps {
  data: ProgressionData[];
}

const SkillProgression = ({ data }: SkillProgressionProps) => {
  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 60) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-4">
      {data.map((skill) => (
        <Card key={skill.exercise} className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-white font-medium">{skill.exercise}</h3>
              <Badge className={`${getProgressColor(skill.progress)}/20 text-white`}>
                {skill.progress}% to goal
              </Badge>
            </div>
            
            <div className="flex items-center gap-4 mb-2">
              <span className="text-gray-400 text-sm">Current: {skill.current}</span>
              <span className="text-gray-400 text-sm">Target: {skill.target}</span>
            </div>
            
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${getProgressColor(skill.progress)}`}
                style={{ width: `${skill.progress}%` }}
              ></div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default SkillProgression;
