
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useRPGSystem } from '@/hooks/useRPGSystem';
import TemplateFilters from './components/TemplateFilters';
import TemplateCard from './components/TemplateCard';
import WorkoutPreparation from '../workout/WorkoutPreparation';
import ExerciseAdjustment from '../workout/ExerciseAdjustment';
import WorkoutFinishConfirmation from '../workout/WorkoutFinishConfirmation';
import { templates, categories, difficulties } from './data/templatesData';
import { useTemplateFilters } from './hooks/useTemplateFilters';
import { WorkoutTemplate } from './types';

const WorkoutTemplates = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { awardXP } = useRPGSystem();
  
  const [showPreparation, setShowPreparation] = useState(false);
  const [showAdjustments, setShowAdjustments] = useState(false);
  const [showFinishConfirmation, setShowFinishConfirmation] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<WorkoutTemplate | null>(null);
  const [workoutStartTime, setWorkoutStartTime] = useState<Date | null>(null);
  
  const {
    selectedCategory,
    selectedDifficulty,
    filteredTemplates,
    setSelectedCategory,
    setSelectedDifficulty
  } = useTemplateFilters(templates);

  const startWorkout = (template: WorkoutTemplate) => {
    setSelectedTemplate(template);
    setShowPreparation(true);
  };

  const handleWorkoutStart = () => {
    if (!selectedTemplate) return;
    
    setWorkoutStartTime(new Date());
    setShowPreparation(false);
    
    awardXP('daily_login');
    
    toast({
      title: "Workout Started! 🔥",
      description: `Get ready for ${selectedTemplate.name} - ${selectedTemplate.duration} minutes of training!`,
    });
  };

  const handleAdjustExercises = () => {
    setShowPreparation(false);
    setShowAdjustments(true);
  };

  const handleSaveAdjustments = (adjustments: any) => {
    console.log('Template adjustments saved:', adjustments);
    toast({
      title: "Adjustments Saved",
      description: "Your exercise modifications have been applied.",
    });
    setShowAdjustments(false);
    setShowPreparation(true);
  };

  const handleCancelPreparation = () => {
    setShowPreparation(false);
    setSelectedTemplate(null);
  };

  const handleCancelAdjustments = () => {
    setShowAdjustments(false);
    setShowPreparation(true);
  };

  const handleFinishWorkout = () => {
    setShowFinishConfirmation(true);
  };

  const handleFinishConfirmed = () => {
    if (selectedTemplate && workoutStartTime) {
      const duration = Math.floor((new Date().getTime() - workoutStartTime.getTime()) / (1000 * 60));
      
      awardXP('workout_complete');
      
      toast({
        title: "🎉 Workout Complete!",
        description: `Great job completing ${selectedTemplate.name}!`,
      });
    }
    
    setShowFinishConfirmation(false);
    setSelectedTemplate(null);
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
    if (!selectedTemplate) return [];
    
    return selectedTemplate.exercises.map(ex => ({
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
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Workout Templates</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Choose from our collection of professionally designed workout templates tailored to your goals
          </p>
        </div>

        <TemplateFilters
          selectedCategory={selectedCategory}
          selectedDifficulty={selectedDifficulty}
          categories={categories}
          difficulties={difficulties}
          onCategoryChange={setSelectedCategory}
          onDifficultyChange={setSelectedDifficulty}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              onStartWorkout={startWorkout}
            />
          ))}
        </div>
      </div>

      {/* Modals */}
      {showPreparation && selectedTemplate && (
        <WorkoutPreparation
          programName={selectedTemplate.name}
          onStartWorkout={handleWorkoutStart}
          onAdjustExercises={handleAdjustExercises}
          onCancel={handleCancelPreparation}
        />
      )}

      {showAdjustments && selectedTemplate && (
        <ExerciseAdjustment
          exercises={getExercisesForAdjustment()}
          onSave={handleSaveAdjustments}
          onCancel={handleCancelAdjustments}
        />
      )}

      {showFinishConfirmation && selectedTemplate && (
        <WorkoutFinishConfirmation
          onConfirm={handleFinishConfirmed}
          onCancel={handleFinishCancelled}
          completedExercises={selectedTemplate.exercises.length}
          totalExercises={selectedTemplate.exercises.length}
          workoutDuration={getWorkoutDuration()}
        />
      )}
    </>
  );
};

export default WorkoutTemplates;
