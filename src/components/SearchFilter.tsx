
import { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { Exercise } from '../data/exerciseDatabase';

interface SearchFilterProps {
  exercises: Exercise[];
  onFilteredResults: (results: Exercise[]) => void;
}

const SearchFilter = ({ exercises, onFilteredResults }: SearchFilterProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedMuscleGroups, setSelectedMuscleGroups] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const categories = ['all', 'push', 'pull', 'legs', 'core', 'skills', 'cardio'];
  const difficulties = ['all', 'beginner', 'intermediate', 'advanced'];
  const allMuscleGroups = Array.from(new Set(exercises.flatMap(ex => ex.muscleGroups)));

  const applyFilters = () => {
    let filtered = exercises;

    // Search by name
    if (searchTerm) {
      filtered = filtered.filter(exercise =>
        exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exercise.muscleGroups.some(muscle =>
          muscle.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(exercise => exercise.category === selectedCategory);
    }

    // Filter by difficulty
    if (selectedDifficulty !== 'all') {
      filtered = filtered.filter(exercise => exercise.difficulty === selectedDifficulty);
    }

    // Filter by muscle groups
    if (selectedMuscleGroups.length > 0) {
      filtered = filtered.filter(exercise =>
        exercise.muscleGroups.some(muscle => selectedMuscleGroups.includes(muscle))
      );
    }

    onFilteredResults(filtered);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedDifficulty('all');
    setSelectedMuscleGroups([]);
    onFilteredResults(exercises);
  };

  const toggleMuscleGroup = (muscle: string) => {
    setSelectedMuscleGroups(prev =>
      prev.includes(muscle)
        ? prev.filter(m => m !== muscle)
        : [...prev, muscle]
    );
  };

  // Apply filters whenever any filter changes
  useState(() => {
    applyFilters();
  });

  return (
    <div className="bg-gradient-to-br from-slate-800/60 to-slate-700/40 backdrop-blur-lg rounded-2xl p-6 border border-slate-600/30 mb-8">
      {/* Search Bar */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search exercises..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            applyFilters();
          }}
          className="w-full bg-slate-700 border border-slate-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        />
      </div>

      {/* Filter Toggle */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
        >
          <Filter className="h-5 w-5" />
          <span>Filters</span>
        </button>
        
        {(selectedCategory !== 'all' || selectedDifficulty !== 'all' || selectedMuscleGroups.length > 0) && (
          <button
            onClick={clearFilters}
            className="flex items-center space-x-2 text-orange-400 hover:text-orange-300 transition-colors"
          >
            <X className="h-4 w-4" />
            <span>Clear</span>
          </button>
        )}
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="space-y-4">
          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                applyFilters();
              }}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Difficulty Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Difficulty</label>
            <select
              value={selectedDifficulty}
              onChange={(e) => {
                setSelectedDifficulty(e.target.value);
                applyFilters();
              }}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              {difficulties.map(difficulty => (
                <option key={difficulty} value={difficulty}>
                  {difficulty === 'all' ? 'All Levels' : difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Muscle Groups Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Muscle Groups</label>
            <div className="flex flex-wrap gap-2">
              {allMuscleGroups.map(muscle => (
                <button
                  key={muscle}
                  onClick={() => {
                    toggleMuscleGroup(muscle);
                    applyFilters();
                  }}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
                    selectedMuscleGroups.includes(muscle)
                      ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                      : 'bg-slate-700 text-gray-400 hover:bg-slate-600 hover:text-white'
                  }`}
                >
                  {muscle}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFilter;
