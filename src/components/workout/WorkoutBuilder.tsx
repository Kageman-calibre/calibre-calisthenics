
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash2, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/auth/AuthProvider';

interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: string;
  restTime: string;
  description: string;
}

const WorkoutBuilder = ({ onSave }: { onSave?: () => void }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [difficulty, setDifficulty] = useState<'beginner' | 'intermediate' | 'advanced'>('intermediate');
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [isPublic, setIsPublic] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const addExercise = () => {
    const newExercise: Exercise = {
      id: Date.now().toString(),
      name: '',
      sets: 3,
      reps: '10',
      restTime: '60s',
      description: ''
    };
    setExercises([...exercises, newExercise]);
  };

  const updateExercise = (id: string, field: keyof Exercise, value: any) => {
    setExercises(exercises.map(ex => 
      ex.id === id ? { ...ex, [field]: value } : ex
    ));
  };

  const removeExercise = (id: string) => {
    setExercises(exercises.filter(ex => ex.id !== id));
  };

  const saveWorkout = async () => {
    if (!user) return;
    
    if (!name || exercises.length === 0) {
      toast({
        title: "Validation Error",
        description: "Please provide a workout name and at least one exercise.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    const totalDuration = exercises.reduce((sum, ex) => {
      const restTime = parseInt(ex.restTime.replace('s', ''));
      return sum + (ex.sets * 2) + (restTime * (ex.sets - 1) / 60); // Rough estimate
    }, 0);

    const { error } = await supabase
      .from('workout_programs')
      .insert({
        user_id: user.id,
        name,
        description,
        difficulty,
        duration_minutes: Math.round(totalDuration),
        exercises: exercises,
        is_public: isPublic
      });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to save workout program.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success!",
        description: "Workout program saved successfully.",
      });
      
      // Reset form
      setName('');
      setDescription('');
      setExercises([]);
      onSave?.();
    }

    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-slate-800/50 backdrop-blur-lg border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Plus className="h-5 w-5 mr-2 text-orange-500" />
            Create Custom Workout
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="workoutName" className="text-white">Workout Name</Label>
              <Input
                id="workoutName"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-slate-700 border-slate-600 text-white"
                placeholder="My Custom Workout"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="difficulty" className="text-white">Difficulty</Label>
              <Select value={difficulty} onValueChange={(value: any) => setDifficulty(value)}>
                <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-700 border-slate-600">
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="workoutDescription" className="text-white">Description</Label>
            <Textarea
              id="workoutDescription"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-slate-700 border-slate-600 text-white"
              placeholder="Describe your workout..."
            />
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold text-white">Exercises</h3>
          <Button onClick={addExercise} className="bg-orange-500 hover:bg-orange-600">
            <Plus className="h-4 w-4 mr-2" />
            Add Exercise
          </Button>
        </div>

        {exercises.map((exercise) => (
          <Card key={exercise.id} className="bg-slate-800/50 backdrop-blur-lg border-slate-700">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div className="space-y-2">
                  <Label className="text-white">Exercise Name</Label>
                  <Input
                    value={exercise.name}
                    onChange={(e) => updateExercise(exercise.id, 'name', e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white"
                    placeholder="Push ups"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-white">Sets</Label>
                  <Input
                    type="number"
                    value={exercise.sets}
                    onChange={(e) => updateExercise(exercise.id, 'sets', parseInt(e.target.value))}
                    className="bg-slate-700 border-slate-600 text-white"
                    min="1"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-white">Reps</Label>
                  <Input
                    value={exercise.reps}
                    onChange={(e) => updateExercise(exercise.id, 'reps', e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white"
                    placeholder="10 or 30s"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-white">Rest Time</Label>
                  <Input
                    value={exercise.restTime}
                    onChange={(e) => updateExercise(exercise.id, 'restTime', e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white"
                    placeholder="60s"
                  />
                </div>
              </div>
              
              <div className="space-y-2 mb-4">
                <Label className="text-white">Description</Label>
                <Textarea
                  value={exercise.description}
                  onChange={(e) => updateExercise(exercise.id, 'description', e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white"
                  placeholder="Exercise instructions..."
                />
              </div>
              
              <Button
                onClick={() => removeExercise(exercise.id)}
                variant="destructive"
                size="sm"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Remove
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-between items-center pt-6">
        <label className="flex items-center space-x-2 text-white">
          <input
            type="checkbox"
            checked={isPublic}
            onChange={(e) => setIsPublic(e.target.checked)}
            className="rounded"
          />
          <span>Make this workout public</span>
        </label>
        
        <Button
          onClick={saveWorkout}
          disabled={loading}
          className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
          size="lg"
        >
          <Save className="h-4 w-4 mr-2" />
          {loading ? 'Saving...' : 'Save Workout'}
        </Button>
      </div>
    </div>
  );
};

export default WorkoutBuilder;
