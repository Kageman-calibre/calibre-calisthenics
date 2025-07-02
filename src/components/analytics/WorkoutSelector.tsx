import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { exerciseDatabase } from '@/data/exerciseDatabase';
import { Target, Clock, TrendingUp } from 'lucide-react';

interface WorkoutSelectorProps {
  onWorkoutSelect: (exercise: any) => void;
  onSkip: () => void;
}

const WorkoutSelector = ({ onWorkoutSelect, onSkip }: WorkoutSelectorProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedExercise, setSelectedExercise] = useState<any>(null);

  const categories = Array.from(new Set(exerciseDatabase.map(ex => ex.category)));
  
  const filteredExercises = selectedCategory && selectedCategory !== 'all'
    ? exerciseDatabase.filter(ex => ex.category === selectedCategory)
    : exerciseDatabase;

  const handleExerciseSelect = (exerciseId: string) => {
    if (exerciseId === 'none') {
      setSelectedExercise(null);
      return;
    }
    const exercise = exerciseDatabase.find(ex => ex.id === exerciseId);
    setSelectedExercise(exercise);
  };

  const handleConfirm = () => {
    if (selectedExercise) {
      onWorkoutSelect(selectedExercise);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'intermediate': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'advanced': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'push': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'pull': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'legs': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'core': return 'bg-pink-500/20 text-pink-400 border-pink-500/30';
      case 'skills': return 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30';
      case 'cardio': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Target className="h-5 w-5" />
            Choose Your Workout
          </CardTitle>
          <p className="text-gray-400">
            Select the exercise you'll be performing for more accurate analysis
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-300 mb-2 block">
              Exercise Category
            </label>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600">
                <SelectItem value="all" className="text-white">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category} className="text-white capitalize">
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-300 mb-2 block">
              Exercise
            </label>
            <Select value={selectedExercise?.id || 'none'} onValueChange={handleExerciseSelect}>
              <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                <SelectValue placeholder="Select exercise" />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600">
                <SelectItem value="none" className="text-gray-400">Select an exercise</SelectItem>
                {filteredExercises.map(exercise => (
                  <SelectItem key={exercise.id} value={exercise.id} className="text-white">
                    {exercise.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedExercise && (
            <Card className="bg-slate-700/50 border-slate-600">
              <CardContent className="pt-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-white">{selectedExercise.name}</h4>
                    <div className="flex gap-2">
                      <Badge className={getCategoryColor(selectedExercise.category)}>
                        {selectedExercise.category}
                      </Badge>
                      <Badge className={getDifficultyColor(selectedExercise.difficulty)}>
                        {selectedExercise.difficulty}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2 text-gray-300">
                      <TrendingUp className="h-4 w-4" />
                      <span>{selectedExercise.sets} sets × {selectedExercise.reps} reps</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <Clock className="h-4 w-4" />
                      <span>Rest: {selectedExercise.restTime}</span>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-gray-400 mb-1">Target Muscles:</p>
                    <div className="flex flex-wrap gap-1">
                      {selectedExercise.muscleGroups.map((muscle: string) => (
                        <Badge key={muscle} variant="secondary" className="text-xs">
                          {muscle}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="flex gap-3">
            <Button 
              onClick={handleConfirm} 
              disabled={!selectedExercise}
              className="flex-1"
            >
              Confirm Exercise
            </Button>
            <Button 
              onClick={onSkip} 
              variant="outline"
              className="flex-1"
            >
              Skip Selection
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WorkoutSelector;