
import { Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export interface ExerciseAdjustment {
  sets: number;
  reps: number;
  difficulty: 'easier' | 'normal' | 'harder';
  restTime: number;
}

interface ExerciseAdjustmentCardProps {
  exercise: {
    id: string;
    name: string;
    defaultSets: number;
    defaultReps: string;
    defaultRest: string;
  };
  adjustment: ExerciseAdjustment;
  onUpdateAdjustment: (updates: Partial<ExerciseAdjustment>) => void;
}

const ExerciseAdjustmentCard = ({ exercise, adjustment, onUpdateAdjustment }: ExerciseAdjustmentCardProps) => {
  const getDifficultyDescription = (difficulty: string) => {
    switch (difficulty) {
      case 'easier': return 'Beginner modifications applied';
      case 'harder': return 'Advanced progressions included';
      default: return 'Standard exercise form';
    }
  };

  return (
    <Card className="bg-slate-700/30 border-slate-600">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold text-white mb-4">{exercise.name}</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Sets */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Sets</label>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onUpdateAdjustment({ sets: Math.max(1, adjustment.sets - 1) })}
                className="h-8 w-8 p-0 border-slate-600"
              >
                <Minus className="h-3 w-3" />
              </Button>
              <span className="text-white font-semibold min-w-[2rem] text-center">
                {adjustment.sets}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onUpdateAdjustment({ sets: Math.min(10, adjustment.sets + 1) })}
                className="h-8 w-8 p-0 border-slate-600"
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>
          </div>

          {/* Reps */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Reps per Set</label>
            <div className="space-y-2">
              <Slider
                value={[adjustment.reps]}
                onValueChange={([value]) => onUpdateAdjustment({ reps: value })}
                max={50}
                min={1}
                step={1}
                className="w-full"
              />
              <div className="text-center text-white font-semibold">
                {adjustment.reps}
              </div>
            </div>
          </div>

          {/* Difficulty */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Difficulty</label>
            <Select
              value={adjustment.difficulty}
              onValueChange={(value: 'easier' | 'normal' | 'harder') => 
                onUpdateAdjustment({ difficulty: value })
              }
            >
              <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-600">
                <SelectItem value="easier">Easier</SelectItem>
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="harder">Harder</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-gray-400">
              {getDifficultyDescription(adjustment.difficulty)}
            </p>
          </div>

          {/* Rest Time */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Rest Time (seconds)</label>
            <div className="space-y-2">
              <Slider
                value={[adjustment.restTime]}
                onValueChange={([value]) => onUpdateAdjustment({ restTime: value })}
                max={180}
                min={15}
                step={15}
                className="w-full"
              />
              <div className="text-center text-white font-semibold">
                {adjustment.restTime}s
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExerciseAdjustmentCard;
