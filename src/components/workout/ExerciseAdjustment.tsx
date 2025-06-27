
import { useState } from 'react';
import { Settings, Minus, Plus, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ExerciseAdjustment {
  sets: number;
  reps: number;
  difficulty: 'easier' | 'normal' | 'harder';
  restTime: number;
}

interface ExerciseAdjustmentProps {
  exercises: Array<{
    id: string;
    name: string;
    defaultSets: number;
    defaultReps: string;
    defaultRest: string;
  }>;
  onSave: (adjustments: Record<string, ExerciseAdjustment>) => void;
  onCancel: () => void;
}

const ExerciseAdjustment = ({ exercises, onSave, onCancel }: ExerciseAdjustmentProps) => {
  const [adjustments, setAdjustments] = useState<Record<string, ExerciseAdjustment>>({});

  const getAdjustment = (exerciseId: string): ExerciseAdjustment => {
    const exercise = exercises.find(e => e.id === exerciseId);
    return adjustments[exerciseId] || {
      sets: exercise?.defaultSets || 3,
      reps: parseInt(exercise?.defaultReps?.split('-')[0] || '10'),
      difficulty: 'normal',
      restTime: parseInt(exercise?.defaultRest?.replace('s', '') || '60')
    };
  };

  const updateAdjustment = (exerciseId: string, updates: Partial<ExerciseAdjustment>) => {
    setAdjustments(prev => ({
      ...prev,
      [exerciseId]: { ...getAdjustment(exerciseId), ...updates }
    }));
  };

  const resetToDefaults = () => {
    setAdjustments({});
  };

  const getDifficultyDescription = (difficulty: string) => {
    switch (difficulty) {
      case 'easier': return 'Beginner modifications applied';
      case 'harder': return 'Advanced progressions included';
      default: return 'Standard exercise form';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-4xl max-h-[80vh] overflow-y-auto bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-2xl text-white flex items-center space-x-2">
            <Settings className="h-6 w-6 text-orange-400" />
            <span>Adjust Your Workout</span>
          </CardTitle>
          <p className="text-gray-300">
            Customize each exercise to match your fitness level and goals
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Global Controls */}
          <div className="flex justify-between items-center p-4 bg-slate-700/30 rounded-xl">
            <span className="text-white font-medium">Quick Actions</span>
            <Button
              variant="outline"
              onClick={resetToDefaults}
              className="border-slate-600 text-gray-300 hover:bg-slate-700"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset All
            </Button>
          </div>

          {/* Exercise Adjustments */}
          <div className="space-y-4">
            {exercises.map((exercise) => {
              const adjustment = getAdjustment(exercise.id);
              
              return (
                <Card key={exercise.id} className="bg-slate-700/30 border-slate-600">
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
                            onClick={() => updateAdjustment(exercise.id, { sets: Math.max(1, adjustment.sets - 1) })}
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
                            onClick={() => updateAdjustment(exercise.id, { sets: Math.min(10, adjustment.sets + 1) })}
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
                            onValueChange={([value]) => updateAdjustment(exercise.id, { reps: value })}
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
                            updateAdjustment(exercise.id, { difficulty: value })
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
                            onValueChange={([value]) => updateAdjustment(exercise.id, { restTime: value })}
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
            })}
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4">
            <Button
              variant="outline"
              onClick={onCancel}
              className="flex-1 border-slate-600 text-gray-300 hover:bg-slate-700"
            >
              Cancel
            </Button>
            
            <Button
              onClick={() => onSave(adjustments)}
              className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
            >
              Save Adjustments
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExerciseAdjustment;
