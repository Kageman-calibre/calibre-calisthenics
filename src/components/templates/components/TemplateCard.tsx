
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Zap, Target, Users, Star, Play } from 'lucide-react';
import { WorkoutTemplate } from '../types';

interface TemplateCardProps {
  template: WorkoutTemplate;
  onStartWorkout: (template: WorkoutTemplate) => void;
}

const TemplateCard = ({ template, onStartWorkout }: TemplateCardProps) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-500/20 text-green-400';
      case 'intermediate': return 'bg-yellow-500/20 text-yellow-400';
      case 'advanced': return 'bg-red-500/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <Card className="bg-gradient-to-br from-slate-800/60 to-slate-700/40 border-slate-600/30 hover:border-orange-500/50 transition-all duration-300">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-white text-lg mb-2">{template.name}</CardTitle>
            <Badge className={getDifficultyColor(template.difficulty)}>
              {template.difficulty}
            </Badge>
          </div>
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="text-sm text-gray-300">{template.rating}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-gray-300 text-sm">{template.description}</p>
        
        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-blue-400" />
            <span className="text-gray-300">{template.duration} min</span>
          </div>
          <div className="flex items-center space-x-2">
            <Target className="h-4 w-4 text-green-400" />
            <span className="text-gray-300">{template.exercises} exercises</span>
          </div>
          <div className="flex items-center space-x-2">
            <Zap className="h-4 w-4 text-orange-400" />
            <span className="text-gray-300">{template.calories} cal</span>
          </div>
          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4 text-purple-400" />
            <span className="text-gray-300">{template.popularity}% liked</span>
          </div>
        </div>

        {/* Focus Areas */}
        <div>
          <div className="text-xs text-gray-400 mb-2">Focus Areas:</div>
          <div className="flex flex-wrap gap-1">
            {template.focus.map((focus, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {focus}
              </Badge>
            ))}
          </div>
        </div>

        {/* Equipment */}
        {template.equipment && (
          <div>
            <div className="text-xs text-gray-400 mb-2">Equipment:</div>
            <div className="flex flex-wrap gap-1">
              {template.equipment.map((item, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {item}
                </Badge>
              ))}
            </div>
          </div>
        )}

        <Button 
          className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
          onClick={() => onStartWorkout(template)}
        >
          <Play className="h-4 w-4 mr-2" />
          Start Workout
        </Button>
      </CardContent>
    </Card>
  );
};

export default TemplateCard;
