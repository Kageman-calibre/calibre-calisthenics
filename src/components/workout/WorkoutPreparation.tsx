
import { useState } from 'react';
import { CheckCircle, Circle, Settings, Play, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface WorkoutPreparationProps {
  programName: string;
  onStartWorkout: () => void;
  onAdjustExercises: () => void;
  onCancel: () => void;
}

const WorkoutPreparation = ({ 
  programName, 
  onStartWorkout, 
  onAdjustExercises, 
  onCancel 
}: WorkoutPreparationProps) => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const preparationSteps = [
    { id: 'warm-up', label: 'Warm up for 5-10 minutes', required: true },
    { id: 'equipment', label: 'Check all required equipment is available', required: true },
    { id: 'space', label: 'Clear adequate workout space', required: true },
    { id: 'water', label: 'Have water bottle ready', required: false },
    { id: 'music', label: 'Set up workout playlist (optional)', required: false },
    { id: 'timer', label: 'Phone/timer ready for rest periods', required: false }
  ];

  const toggleCheck = (id: string) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const requiredStepsCompleted = preparationSteps
    .filter(step => step.required)
    .every(step => checkedItems[step.id]);

  const allStepsCompleted = preparationSteps.every(step => checkedItems[step.id]);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-2xl text-white flex items-center space-x-2">
            <Play className="h-6 w-6 text-orange-400" />
            <span>Ready to Start: {programName}</span>
          </CardTitle>
          <p className="text-gray-300">
            Complete your pre-workout checklist to ensure the best workout experience
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Preparation Checklist */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-white">Pre-Workout Checklist</h3>
            {preparationSteps.map((step) => (
              <div
                key={step.id}
                className="flex items-center space-x-3 p-3 rounded-xl bg-slate-700/50 cursor-pointer hover:bg-slate-700/70 transition-colors"
                onClick={() => toggleCheck(step.id)}
              >
                {checkedItems[step.id] ? (
                  <CheckCircle className="h-5 w-5 text-green-400" />
                ) : (
                  <Circle className="h-5 w-5 text-gray-400" />
                )}
                <span className={`flex-1 ${checkedItems[step.id] ? 'text-green-400 line-through' : 'text-gray-300'}`}>
                  {step.label}
                </span>
                {step.required && (
                  <span className="text-xs bg-orange-500/20 text-orange-400 px-2 py-1 rounded-full">
                    Required
                  </span>
                )}
              </div>
            ))}
          </div>

          <Separator className="bg-slate-600" />

          {/* Progress Indicator */}
          <div className="text-center">
            <div className="text-sm text-gray-400 mb-2">
              Progress: {Object.values(checkedItems).filter(Boolean).length} / {preparationSteps.length}
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full transition-all duration-300"
                style={{ 
                  width: `${(Object.values(checkedItems).filter(Boolean).length / preparationSteps.length) * 100}%` 
                }}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={onCancel}
              className="flex-1 border-slate-600 text-gray-300 hover:bg-slate-700"
            >
              Cancel
            </Button>
            
            <Button
              variant="outline"
              onClick={onAdjustExercises}
              className="flex-1 border-slate-600 text-gray-300 hover:bg-slate-700"
            >
              <Settings className="h-4 w-4 mr-2" />
              Adjust Exercises
            </Button>
            
            <Button
              onClick={onStartWorkout}
              disabled={!requiredStepsCompleted}
              className={`flex-1 ${
                requiredStepsCompleted 
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600' 
                  : 'bg-slate-600 cursor-not-allowed'
              } text-white`}
            >
              <ArrowRight className="h-4 w-4 mr-2" />
              {allStepsCompleted ? 'Start Workout!' : 'Start Workout'}
            </Button>
          </div>

          {!requiredStepsCompleted && (
            <p className="text-sm text-orange-400 text-center">
              Complete all required steps to continue
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default WorkoutPreparation;
