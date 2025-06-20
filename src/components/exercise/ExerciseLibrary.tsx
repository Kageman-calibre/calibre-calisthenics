
import { useState, useMemo } from 'react';
import { enhancedExerciseDatabase, EnhancedExercise } from '../../data/enhancedExerciseDatabase';
import EnhancedExerciseCard from './EnhancedExerciseCard';
import ExerciseFilter, { FilterState } from './ExerciseFilter';
import { BookOpen, Zap } from 'lucide-react';

const ExerciseLibrary = () => {
  const [filters, setFilters] = useState<FilterState>({
    searchTerm: '',
    equipment: [],
    muscleGroups: [],
    difficulty: [],
    tags: []
  });

  const filteredExercises = useMemo(() => {
    return enhancedExerciseDatabase.filter((exercise: EnhancedExercise) => {
      // Search term filter
      if (filters.searchTerm) {
        const searchLower = filters.searchTerm.toLowerCase();
        const matchesSearch = 
          exercise.name.toLowerCase().includes(searchLower) ||
          exercise.instructions.some(instruction => 
            instruction.toLowerCase().includes(searchLower)
          ) ||
          exercise.tags.some(tag => tag.toLowerCase().includes(searchLower));
        
        if (!matchesSearch) return false;
      }

      // Equipment filter
      if (filters.equipment.length > 0) {
        const hasEquipment = filters.equipment.some(equipment =>
          exercise.primaryEquipment.toLowerCase() === equipment.toLowerCase() ||
          exercise.equipment.some(eq => eq.toLowerCase() === equipment.toLowerCase())
        );
        if (!hasEquipment) return false;
      }

      // Muscle groups filter
      if (filters.muscleGroups.length > 0) {
        const hasMuscleGroup = filters.muscleGroups.some(muscle =>
          exercise.muscleGroups.primary.some(primary => 
            primary.toLowerCase().includes(muscle.toLowerCase())
          ) ||
          exercise.muscleGroups.secondary.some(secondary => 
            secondary.toLowerCase().includes(muscle.toLowerCase())
          )
        );
        if (!hasMuscleGroup) return false;
      }

      // Difficulty filter
      if (filters.difficulty.length > 0) {
        if (!filters.difficulty.includes(exercise.difficulty)) return false;
      }

      // Tags filter
      if (filters.tags.length > 0) {
        const hasTags = filters.tags.some(tag =>
          exercise.tags.includes(tag.toLowerCase())
        );
        if (!hasTags) return false;
      }

      return true;
    });
  }, [filters]);

  const handleStartExercise = (exercise: EnhancedExercise) => {
    console.log('Starting exercise:', exercise.name);
    // TODO: Navigate to workout session with this exercise
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center space-x-2 bg-orange-500/10 border border-orange-500/20 rounded-full px-4 py-2 mb-6">
          <BookOpen className="h-4 w-4 text-orange-400" />
          <span className="text-orange-400 text-sm font-medium">Exercise Library</span>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
          Master Your
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
            Movement Library
          </span>
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Comprehensive exercise database with detailed form guidance, muscle targeting, and progressive variations
        </p>
      </div>

      {/* Filter Component */}
      <ExerciseFilter onFilterChange={setFilters} />

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-gray-300">
          <Zap className="h-4 w-4 text-orange-400" />
          <span>{filteredExercises.length} exercises found</span>
        </div>
        
        {filters.searchTerm && (
          <div className="text-sm text-gray-400">
            Searching for "{filters.searchTerm}"
          </div>
        )}
      </div>

      {/* Exercise Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {filteredExercises.map((exercise) => (
          <EnhancedExerciseCard
            key={exercise.id}
            exercise={exercise}
            onStart={() => handleStartExercise(exercise)}
          />
        ))}
      </div>

      {/* No Results */}
      {filteredExercises.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg">No exercises found matching your filters</p>
            <p className="text-sm">Try adjusting your search criteria</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExerciseLibrary;
