
import { useState, useMemo } from 'react';
import { WorkoutTemplate } from '../types';

export const useTemplateFilters = (templates: WorkoutTemplate[]) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');

  const filteredTemplates = useMemo(() => {
    return templates.filter(template => {
      const categoryMatch = selectedCategory === 'all' || template.category === selectedCategory;
      const difficultyMatch = selectedDifficulty === 'all' || template.difficulty === selectedDifficulty;
      return categoryMatch && difficultyMatch;
    });
  }, [templates, selectedCategory, selectedDifficulty]);

  return {
    selectedCategory,
    selectedDifficulty,
    filteredTemplates,
    setSelectedCategory,
    setSelectedDifficulty
  };
};
