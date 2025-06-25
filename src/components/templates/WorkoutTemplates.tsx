
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import TemplateFilters from './components/TemplateFilters';
import TemplateCard from './components/TemplateCard';
import { templates, categories, difficulties } from './data/templatesData';
import { useTemplateFilters } from './hooks/useTemplateFilters';
import { WorkoutTemplate } from './types';

const WorkoutTemplates = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const {
    selectedCategory,
    selectedDifficulty,
    filteredTemplates,
    setSelectedCategory,
    setSelectedDifficulty
  } = useTemplateFilters(templates);

  const startWorkout = (template: WorkoutTemplate) => {
    toast({
      title: "Starting Workout! 🔥",
      description: `Get ready for ${template.name} - ${template.duration} minutes of training!`,
    });
    
    navigate('/studio', { 
      state: { 
        template: template,
        mode: 'template'
      } 
    });
  };

  return (
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
  );
};

export default WorkoutTemplates;
