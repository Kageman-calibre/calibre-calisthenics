
import { Card, CardContent } from '@/components/ui/card';
import AdjustmentHeader from './adjustment/AdjustmentHeader';
import ExerciseAdjustmentCard, { type ExerciseAdjustment } from './adjustment/ExerciseAdjustmentCard';
import AdjustmentActions from './adjustment/AdjustmentActions';
import { useExerciseAdjustments } from './adjustment/useExerciseAdjustments';

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
  const { adjustments, getAdjustment, updateAdjustment, resetToDefaults } = useExerciseAdjustments(exercises);

  const handleSave = () => {
    onSave(adjustments);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-4xl max-h-[80vh] overflow-y-auto bg-black/20 backdrop-blur-xl border-white/20 shadow-2xl">
        <AdjustmentHeader onResetToDefaults={resetToDefaults} />
        
        <CardContent className="space-y-6">
          <div className="space-y-4">
            {exercises.map((exercise) => (
              <ExerciseAdjustmentCard
                key={exercise.id}
                exercise={exercise}
                adjustment={getAdjustment(exercise.id)}
                onUpdateAdjustment={(updates) => updateAdjustment(exercise.id, updates)}
              />
            ))}
          </div>
        </CardContent>

        <AdjustmentActions onCancel={onCancel} onSave={handleSave} />
      </Card>
    </div>
  );
};

export default ExerciseAdjustment;
