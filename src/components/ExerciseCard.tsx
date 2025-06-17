
import { useState } from 'react';
import { Clock, Target, Zap, ChevronDown, ChevronUp, Play, Info } from 'lucide-react';
import { Exercise } from '../data/exerciseDatabase';

interface ExerciseCardProps {
  exercise: Exercise;
  onStart?: () => void;
  showDetails?: boolean;
}

const ExerciseCard = ({ exercise, onStart, showDetails = false }: ExerciseCardProps) => {
  const [isExpanded, setIsExpanded] = useState(showDetails);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-500 text-white';
      case 'intermediate': return 'bg-orange-500 text-white';
      case 'advanced': return 'bg-red-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'push': return 'bg-red-500/10 border-red-500/20 text-red-400';
      case 'pull': return 'bg-blue-500/10 border-blue-500/20 text-blue-400';
      case 'legs': return 'bg-green-500/10 border-green-500/20 text-green-400';
      case 'core': return 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400';
      case 'skills': return 'bg-purple-500/10 border-purple-500/20 text-purple-400';
      case 'cardio': return 'bg-pink-500/10 border-pink-500/20 text-pink-400';
      default: return 'bg-gray-500/10 border-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-800/60 to-slate-700/40 backdrop-blur-lg rounded-3xl overflow-hidden border border-slate-600/30 hover:border-orange-500/40 transition-all duration-500">
      <div className="relative">
        <img
          src={exercise.image}
          alt={exercise.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent"></div>
        
        <div className="absolute top-4 left-4 flex space-x-2">
          <span className={`px-3 py-1 rounded-full text-xs font-bold ${getDifficultyColor(exercise.difficulty)}`}>
            {exercise.difficulty}
          </span>
          <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getCategoryColor(exercise.category)}`}>
            {exercise.category.toUpperCase()}
          </span>
        </div>

        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex flex-wrap gap-2">
            {exercise.muscleGroups.slice(0, 3).map((muscle, index) => (
              <span
                key={index}
                className="text-xs bg-slate-900/70 backdrop-blur-sm text-white px-3 py-1 rounded-full border border-slate-600/30"
              >
                {muscle}
              </span>
            ))}
            {exercise.muscleGroups.length > 3 && (
              <span className="text-xs bg-slate-900/70 backdrop-blur-sm text-white px-3 py-1 rounded-full border border-slate-600/30">
                +{exercise.muscleGroups.length - 3} more
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-2xl font-bold text-white mb-2">
          {exercise.name}
        </h3>
        
        <div className="flex items-center justify-between mb-4 text-sm text-gray-400">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Target className="h-4 w-4" />
              <span>{exercise.sets} × {exercise.reps}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{exercise.restTime}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Zap className="h-4 w-4" />
              <span>{exercise.calories} cal</span>
            </div>
          </div>
        </div>

        {isExpanded && (
          <div className="space-y-6 mb-6">
            {/* Instructions */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                <Info className="h-4 w-4 mr-2 text-blue-400" />
                Instructions
              </h4>
              <ol className="space-y-2">
                {exercise.instructions.map((instruction, index) => (
                  <li key={index} className="text-gray-300 text-sm flex">
                    <span className="text-orange-400 font-medium mr-3 min-w-[1.5rem]">
                      {index + 1}.
                    </span>
                    {instruction}
                  </li>
                ))}
              </ol>
            </div>

            {/* Tips */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-3">Tips</h4>
              <ul className="space-y-2">
                {exercise.tips.map((tip, index) => (
                  <li key={index} className="text-gray-300 text-sm flex">
                    <span className="text-green-400 mr-3">•</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>

            {/* Common Mistakes */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-3">Common Mistakes</h4>
              <ul className="space-y-2">
                {exercise.commonMistakes.map((mistake, index) => (
                  <li key={index} className="text-gray-300 text-sm flex">
                    <span className="text-red-400 mr-3">⚠</span>
                    {mistake}
                  </li>
                ))}
              </ul>
            </div>

            {/* Progressions & Regressions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-semibold text-white mb-2">Progressions</h4>
                <div className="space-y-1">
                  {exercise.progressions.map((progression, index) => (
                    <span key={index} className="block text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">
                      {progression}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white mb-2">Regressions</h4>
                <div className="space-y-1">
                  {exercise.regressions.map((regression, index) => (
                    <span key={index} className="block text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded">
                      {regression}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex space-x-3">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex-1 bg-slate-800/50 hover:bg-slate-700/50 text-white font-medium py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2"
          >
            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            <span>{isExpanded ? 'Less Info' : 'More Info'}</span>
          </button>
          
          {onStart && (
            <button
              onClick={onStart}
              className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-medium py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <Play className="h-4 w-4" />
              <span>Start Exercise</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExerciseCard;
