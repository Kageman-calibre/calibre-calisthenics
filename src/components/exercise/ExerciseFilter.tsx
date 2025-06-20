
import { useState } from 'react';
import { Search, Filter, X, Dumbbell, Target } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface ExerciseFilterProps {
  onFilterChange: (filters: FilterState) => void;
}

export interface FilterState {
  searchTerm: string;
  equipment: string[];
  muscleGroups: string[];
  difficulty: string[];
  tags: string[];
}

const ExerciseFilter = ({ onFilterChange }: ExerciseFilterProps) => {
  const [filters, setFilters] = useState<FilterState>({
    searchTerm: '',
    equipment: [],
    muscleGroups: [],
    difficulty: [],
    tags: []
  });
  
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const equipmentOptions = [
    'Bodyweight', 'Dumbbells', 'Barbell', 'Pull-up Bar', 'Resistance Bands', 
    'Kettlebell', 'Cable Machine', 'Medicine Ball', 'TRX', 'Gymnastic Rings'
  ];

  const muscleGroupOptions = [
    'Chest', 'Back', 'Shoulders', 'Arms', 'Core', 'Legs', 'Glutes', 
    'Quadriceps', 'Hamstrings', 'Calves', 'Biceps', 'Triceps', 'Forearms'
  ];

  const difficultyOptions = ['beginner', 'intermediate', 'advanced'];

  const tagOptions = [
    'strength', 'cardio', 'flexibility', 'balance', 'power', 'endurance',
    'functional', 'compound', 'isolation', 'bodyweight', 'home-workout'
  ];

  const updateFilters = (newFilters: Partial<FilterState>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const toggleArrayFilter = (category: keyof FilterState, value: string) => {
    const currentArray = filters[category] as string[];
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value];
    
    updateFilters({ [category]: newArray });
  };

  const clearAllFilters = () => {
    const clearedFilters: FilterState = {
      searchTerm: '',
      equipment: [],
      muscleGroups: [],
      difficulty: [],
      tags: []
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  const hasActiveFilters = 
    filters.equipment.length > 0 || 
    filters.muscleGroups.length > 0 || 
    filters.difficulty.length > 0 || 
    filters.tags.length > 0;

  return (
    <Card className="bg-slate-800/50 backdrop-blur-lg border-slate-700">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center">
            <Search className="h-5 w-5 mr-2 text-orange-500" />
            Exercise Search & Filter
          </CardTitle>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-orange-400 hover:text-orange-300"
            >
              <X className="h-4 w-4 mr-1" />
              Clear All
            </Button>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search exercises..."
            value={filters.searchTerm}
            onChange={(e) => updateFilters({ searchTerm: e.target.value })}
            className="pl-10 bg-slate-700 border-slate-600 text-white"
          />
        </div>

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2">
            {filters.equipment.map(item => (
              <Badge key={item} variant="secondary" className="bg-orange-500/20 text-orange-400">
                <Dumbbell className="h-3 w-3 mr-1" />
                {item}
                <X 
                  className="h-3 w-3 ml-1 cursor-pointer" 
                  onClick={() => toggleArrayFilter('equipment', item)}
                />
              </Badge>
            ))}
            {filters.muscleGroups.map(item => (
              <Badge key={item} variant="secondary" className="bg-blue-500/20 text-blue-400">
                <Target className="h-3 w-3 mr-1" />
                {item}
                <X 
                  className="h-3 w-3 ml-1 cursor-pointer" 
                  onClick={() => toggleArrayFilter('muscleGroups', item)}
                />
              </Badge>
            ))}
            {filters.difficulty.map(item => (
              <Badge key={item} variant="outline" className="border-green-400 text-green-400">
                {item}
                <X 
                  className="h-3 w-3 ml-1 cursor-pointer" 
                  onClick={() => toggleArrayFilter('difficulty', item)}
                />
              </Badge>
            ))}
            {filters.tags.map(item => (
              <Badge key={item} variant="outline" className="border-purple-400 text-purple-400">
                #{item}
                <X 
                  className="h-3 w-3 ml-1 cursor-pointer" 
                  onClick={() => toggleArrayFilter('tags', item)}
                />
              </Badge>
            ))}
          </div>
        )}

        {/* Advanced Filters */}
        <Collapsible open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
          <CollapsibleTrigger asChild>
            <Button variant="outline" className="w-full">
              <Filter className="h-4 w-4 mr-2" />
              Advanced Filters
            </Button>
          </CollapsibleTrigger>
          
          <CollapsibleContent className="space-y-4 mt-4">
            {/* Equipment Filter */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-2 flex items-center">
                <Dumbbell className="h-4 w-4 mr-2" />
                Equipment
              </h4>
              <div className="flex flex-wrap gap-2">
                {equipmentOptions.map(equipment => (
                  <Badge
                    key={equipment}
                    variant={filters.equipment.includes(equipment) ? "default" : "outline"}
                    className={`cursor-pointer transition-colors ${
                      filters.equipment.includes(equipment)
                        ? 'bg-orange-500 text-white'
                        : 'hover:bg-slate-700'
                    }`}
                    onClick={() => toggleArrayFilter('equipment', equipment)}
                  >
                    {equipment}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Muscle Groups Filter */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-2 flex items-center">
                <Target className="h-4 w-4 mr-2" />
                Muscle Groups
              </h4>
              <div className="flex flex-wrap gap-2">
                {muscleGroupOptions.map(muscle => (
                  <Badge
                    key={muscle}
                    variant={filters.muscleGroups.includes(muscle) ? "default" : "outline"}
                    className={`cursor-pointer transition-colors ${
                      filters.muscleGroups.includes(muscle)
                        ? 'bg-blue-500 text-white'
                        : 'hover:bg-slate-700'
                    }`}
                    onClick={() => toggleArrayFilter('muscleGroups', muscle)}
                  >
                    {muscle}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Difficulty Filter */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-2">Difficulty</h4>
              <div className="flex gap-2">
                {difficultyOptions.map(difficulty => (
                  <Badge
                    key={difficulty}
                    variant={filters.difficulty.includes(difficulty) ? "default" : "outline"}
                    className={`cursor-pointer transition-colors capitalize ${
                      filters.difficulty.includes(difficulty)
                        ? 'bg-green-500 text-white'
                        : 'hover:bg-slate-700'
                    }`}
                    onClick={() => toggleArrayFilter('difficulty', difficulty)}
                  >
                    {difficulty}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Tags Filter */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-2">Tags</h4>
              <div className="flex flex-wrap gap-2">
                {tagOptions.map(tag => (
                  <Badge
                    key={tag}
                    variant={filters.tags.includes(tag) ? "default" : "outline"}
                    className={`cursor-pointer transition-colors ${
                      filters.tags.includes(tag)
                        ? 'bg-purple-500 text-white'
                        : 'hover:bg-slate-700'
                    }`}
                    onClick={() => toggleArrayFilter('tags', tag)}
                  >
                    #{tag}
                  </Badge>
                ))}
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
};

export default ExerciseFilter;
