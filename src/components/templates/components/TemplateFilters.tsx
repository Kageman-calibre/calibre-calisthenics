
import { Button } from '@/components/ui/button';

interface TemplateFiltersProps {
  selectedCategory: string;
  selectedDifficulty: string;
  categories: string[];
  difficulties: string[];
  onCategoryChange: (category: string) => void;
  onDifficultyChange: (difficulty: string) => void;
}

const TemplateFilters = ({
  selectedCategory,
  selectedDifficulty,
  categories,
  difficulties,
  onCategoryChange,
  onDifficultyChange
}: TemplateFiltersProps) => {
  return (
    <div className="flex flex-wrap gap-4 justify-center">
      <div className="space-x-2">
        {categories.map(category => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => onCategoryChange(category)}
            className="capitalize"
          >
            {category}
          </Button>
        ))}
      </div>
      <div className="space-x-2">
        {difficulties.map(difficulty => (
          <Button
            key={difficulty}
            variant={selectedDifficulty === difficulty ? "secondary" : "outline"}
            size="sm"
            onClick={() => onDifficultyChange(difficulty)}
            className="capitalize"
          >
            {difficulty}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default TemplateFilters;
