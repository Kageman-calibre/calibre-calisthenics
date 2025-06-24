
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle } from 'lucide-react';
import { LEVEL_REQUIREMENTS } from './constants';

interface AllRequirementsOverviewProps {
  currentLevel: number;
  currentRequirement?: { level: number };
}

const AllRequirementsOverview = ({ currentLevel, currentRequirement }: AllRequirementsOverviewProps) => {
  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white">All Level Requirements</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {LEVEL_REQUIREMENTS.map((req) => (
            <div
              key={req.level}
              className={`p-4 rounded-lg border ${
                req.level <= currentLevel 
                  ? 'bg-green-500/10 border-green-500/30' 
                  : req.level === currentRequirement?.level
                  ? 'bg-orange-500/10 border-orange-500/30'
                  : 'bg-slate-700/30 border-slate-600'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-white font-medium">
                  Level {req.level}: {req.title}
                </h3>
                {req.level <= currentLevel && (
                  <CheckCircle className="h-5 w-5 text-green-400" />
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {req.skills.map((skill) => (
                  <Badge key={skill.id} variant="outline" className="text-xs">
                    {skill.name}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AllRequirementsOverview;
