
import { useState } from 'react';
import { Plus, Play, Save, Trash2, Edit3, Clock, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useRPGSystem } from '@/hooks/useRPGSystem';
import WorkoutPreparation from './WorkoutPreparation';
import ExerciseAdjustment from './ExerciseAdjustment';
import WorkoutFinishConfirmation from './WorkoutFinishConfirmation';

interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: string;
  restTime: string;
  notes?: string;
}

interface Workout {
  id: string;
  name: string;
  description: string;
  duration: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  exercises: Exercise[];
}

const WorkoutBuilder = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [currentWorkout, setCurrentWorkout] = useState<Workout | null>(null);
  const [showPreparation, setShowPreparation] = useState(false);
  const [showAdjustments, setShowAdjustments] = useState(false);
  const [showFinishConfirmation, setShowFinishConfirmation] = useState(false);
  const [workoutStartTime, setWorkoutStartTime] = useState<Date | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  
  const { toast } = useToast();
  const { awardXP } = useRPGSystem();

  const [workoutForm, setWorkoutForm] = useState({
    name: '',
    description: '',
    difficulty: 'beginner' as const
  });

  const [exerciseForm, setExerciseForm] = useState({
    name: '',
    sets: 3,
    reps: '10',
    restTime: '60s',
    notes: ''
  });

  const createNewWorkout = () => {
    if (!workoutForm.name) {
      toast({
        title: "Workout Name Required",
        description: "Please enter a name for your workout.",
        variant: "destructive"
      });
      return;
    }

    const newWorkout: Workout = {
      id: Date.now().toString(),
      name: workoutForm.name,
      description: workoutForm.description,
      duration: 30,
      difficulty: workoutForm.difficulty,
      exercises: []
    };

    setCurrentWorkout(newWorkout);
    setIsEditing(true);
    setWorkoutForm({ name: '', description: '', difficulty: 'beginner' });

    awardXP('new_exercise', 0.3);
    toast({
      title: "Workout Created! 🎯",
      description: `${newWorkout.name} is ready for exercises.`,
    });
  };

  const addExercise = () => {
    if (!currentWorkout || !exerciseForm.name) {
      toast({
        title: "Exercise Name Required",
        description: "Please enter an exercise name.",
        variant: "destructive"
      });
      return;
    }

    const newExercise: Exercise = {
      id: Date.now().toString(),
      ...exerciseForm
    };

    setCurrentWorkout({
      ...currentWorkout,
      exercises: [...currentWorkout.exercises, newExercise]
    });

    setExerciseForm({
      name: '',
      sets: 3,
      reps: '10',
      restTime: '60s',
      notes: ''
    });

    toast({
      title: "Exercise Added! 💪",
      description: `${newExercise.name} added to your workout.`,
    });
  };

  const removeExercise = (exerciseId: string) => {
    if (!currentWorkout) return;

    setCurrentWorkout({
      ...currentWorkout,
      exercises: currentWorkout.exercises.filter(ex => ex.id !== exerciseId)
    });

    toast({
      title: "Exercise Removed",
      description: "Exercise removed from workout.",
    });
  };

  const saveWorkout = () => {
    if (!currentWorkout) return;

    const updatedWorkouts = workouts.find(w => w.id === currentWorkout.id)
      ? workouts.map(w => w.id === currentWorkout.id ? currentWorkout : w)
      : [...workouts, currentWorkout];

    setWorkouts(updatedWorkouts);
    setIsEditing(false);

    awardXP('workout_complete', 0.5);
    toast({
      title: "Workout Saved! 💾",
      description: `${currentWorkout.name} has been saved to your library.`,
    });
  };

  const startWorkout = (workout: Workout) => {
    setCurrentWorkout(workout);
    setShowPreparation(true);
  };

  const handleWorkoutStart = () => {
    setWorkoutStartTime(new Date());
    setShowPreparation(false);
    
    awardXP('daily_login');
    
    toast({
      title: "Workout Started! 🔥",
      description: `Let's crush ${currentWorkout?.name}!`,
    });
  };

  const handleAdjustExercises = () => {
    setShowPreparation(false);
    setShowAdjustments(true);
  };

  const handleSaveAdjustments = (adjustments: any) => {
    console.log('Exercise adjustments saved:', adjustments);
    toast({
      title: "Adjustments Saved",
      description: "Your exercise modifications have been applied.",
    });
    setShowAdjustments(false);
    setShowPreparation(true);
  };

  const handleCancelPreparation = () => {
    setShowPreparation(false);
  };

  const handleCancelAdjustments = () => {
    setShowAdjustments(false);
    setShowPreparation(true);
  };

  const handleFinishWorkout = () => {
    setShowFinishConfirmation(true);
  };

  const handleFinishConfirmed = () => {
    if (currentWorkout && workoutStartTime) {
      const duration = Math.floor((new Date().getTime() - workoutStartTime.getTime()) / (1000 * 60));
      
      awardXP('workout_complete');
      
      toast({
        title: "🎉 Workout Complete!",
        description: `Great job completing ${currentWorkout.name}!`,
      });
    }
    
    setShowFinishConfirmation(false);
    setWorkoutStartTime(null);
  };

  const handleFinishCancelled = () => {
    setShowFinishConfirmation(false);
  };

  const getWorkoutDuration = () => {
    if (!workoutStartTime) return "0:00";
    const duration = Math.floor((new Date().getTime() - workoutStartTime.getTime()) / (1000 * 60));
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return hours > 0 ? `${hours}:${minutes.toString().padStart(2, '0')}` : `${minutes}:00`;
  };

  const getExercisesForAdjustment = () => {
    if (!currentWorkout) return [];
    
    return currentWorkout.exercises.map(ex => ({
      id: ex.id,
      name: ex.name,
      defaultSets: ex.sets,
      defaultReps: ex.reps,
      defaultRest: ex.restTime
    }));
  };

  return (
    <>
      <div className="space-y-8">
        {/* Workout Creation Form */}
        {!isEditing && (
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <Plus className="h-5 w-5 text-orange-400" />
                <span>Create New Workout</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="workout-name" className="text-gray-300">Workout Name</Label>
                  <Input
                    id="workout-name"
                    value={workoutForm.name}
                    onChange={(e) => setWorkoutForm(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="My Amazing Workout"
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="difficulty" className="text-gray-300">Difficulty</Label>
                  <Select value={workoutForm.difficulty} onValueChange={(value: any) => setWorkoutForm(prev => ({ ...prev, difficulty: value }))}>
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-600">
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label htmlFor="description" className="text-gray-300">Description</Label>
                <Textarea
                  id="description"
                  value={workoutForm.description}
                  onChange={(e) => setWorkoutForm(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe your workout..."
                  className="bg-slate-700 border-slate-600 text-white"
                />
              </div>

              <Button onClick={createNewWorkout} className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
                <Plus className="h-4 w-4 mr-2" />
                Create Workout
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Exercise Builder */}
        {isEditing && currentWorkout && (
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                <span className="flex items-center space-x-2">
                  <Edit3 className="h-5 w-5 text-orange-400" />
                  <span>Building: {currentWorkout.name}</span>
                </span>
                <div className="flex space-x-2">
                  <Button
                    onClick={() => setIsEditing(false)}
                    variant="outline"
                    className="border-slate-600 text-gray-300"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={saveWorkout}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Workout
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Exercise Form */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <Label htmlFor="exercise-name" className="text-gray-300">Exercise Name</Label>
                  <Input
                    id="exercise-name"
                    value={exerciseForm.name}
                    onChange={(e) => setExerciseForm(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Push-ups"
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="sets" className="text-gray-300">Sets</Label>
                  <Input
                    id="sets"
                    type="number"
                    value={exerciseForm.sets}
                    onChange={(e) => setExerciseForm(prev => ({ ...prev, sets: parseInt(e.target.value) || 1 }))}
                    min="1"
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="reps" className="text-gray-300">Reps</Label>
                  <Input
                    id="reps"
                    value={exerciseForm.reps}
                    onChange={(e) => setExerciseForm(prev => ({ ...prev, reps: e.target.value }))}
                    placeholder="10-15"
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="rest" className="text-gray-300">Rest Time</Label>
                  <Input
                    id="rest"
                    value={exerciseForm.restTime}
                    onChange={(e) => setExerciseForm(prev => ({ ...prev, restTime: e.target.value }))}
                    placeholder="60s"
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>
              </div>

              <Button onClick={addExercise} className="bg-orange-600 hover:bg-orange-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Exercise
              </Button>

              {/* Exercise List */}
              {currentWorkout.exercises.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-white">Exercises ({currentWorkout.exercises.length})</h3>
                  {currentWorkout.exercises.map((exercise, index) => (
                    <div key={exercise.id} className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4">
                          <span className="text-orange-400 font-semibold">{index + 1}.</span>
                          <div>
                            <h4 className="text-white font-medium">{exercise.name}</h4>
                            <p className="text-gray-400 text-sm">
                              {exercise.sets} sets × {exercise.reps} reps • {exercise.restTime} rest
                            </p>
                          </div>
                        </div>
                      </div>
                      <Button
                        onClick={() => removeExercise(exercise.id)}
                        variant="outline"
                        size="sm"
                        className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Saved Workouts */}
        {workouts.length > 0 && !isEditing && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Your Workouts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {workouts.map((workout) => (
                <Card key={workout.id} className="bg-slate-800/50 border-slate-700 hover:border-orange-500/40 transition-colors">
                  <CardHeader>
                    <CardTitle className="text-white">{workout.name}</CardTitle>
                    <p className="text-gray-400 text-sm">{workout.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-4 text-sm text-gray-400">
                      <div className="flex items-center space-x-1">
                        <Target className="h-4 w-4" />
                        <span>{workout.exercises.length} exercises</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>~{workout.duration} min</span>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button
                        onClick={() => startWorkout(workout)}
                        className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                      >
                        <Play className="h-4 w-4 mr-2" />
                        Start
                      </Button>
                      <Button
                        onClick={() => {
                          setCurrentWorkout(workout);
                          setIsEditing(true);
                        }}
                        variant="outline"
                        className="border-slate-600 text-gray-300"
                      >
                        <Edit3 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      {showPreparation && currentWorkout && (
        <WorkoutPreparation
          programName={currentWorkout.name}
          onStartWorkout={handleWorkoutStart}
          onAdjustExercises={handleAdjustExercises}
          onCancel={handleCancelPreparation}
        />
      )}

      {showAdjustments && currentWorkout && (
        <ExerciseAdjustment
          exercises={getExercisesForAdjustment()}
          onSave={handleSaveAdjustments}
          onCancel={handleCancelAdjustments}
        />
      )}

      {showFinishConfirmation && currentWorkout && (
        <WorkoutFinishConfirmation
          onConfirm={handleFinishConfirmed}
          onCancel={handleFinishCancelled}
          completedExercises={currentWorkout.exercises.length}
          totalExercises={currentWorkout.exercises.length}
          workoutDuration={getWorkoutDuration()}
        />
      )}
    </>
  );
};

export default WorkoutBuilder;
