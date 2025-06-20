
import { useState } from 'react';
import { Clock, Target, Zap, ChevronDown, ChevronUp, Play, Info, AlertTriangle, CheckCircle, Dumbbell } from 'lucide-react';
import { EnhancedExercise } from '../../data/enhancedExerciseDatabase';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface EnhancedExerciseCardProps {
  exercise: EnhancedExercise;
  onStart?: () => void;
  showDetails?: boolean;
}

const EnhancedExerciseCard = ({ exercise, onStart, showDetails = false }: EnhancedExerciseCardProps) => {
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
    <Card className="bg-gradient-to-br from-slate-800/60 to-slate-700/40 backdrop-blur-lg border-slate-600/30 hover:border-orange-500/40 transition-all duration-500 overflow-hidden">
      <div className="relative">
        <img
          src={exercise.image}
          alt={exercise.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent"></div>
        
        <div className="absolute top-4 left-4 flex space-x-2">
          <Badge className={getDifficultyColor(exercise.difficulty)}>
            {exercise.difficulty}
          </Badge>
          <Badge variant="outline" className={getCategoryColor(exercise.category)}>
            {exercise.category.toUpperCase()}
          </Badge>
        </div>

        <div className="absolute top-4 right-4">
          <Badge variant="outline" className="bg-slate-900/70 backdrop-blur-sm text-white border-slate-600/30">
            <Dumbbell className="h-3 w-3 mr-1" />
            {exercise.primaryEquipment}
          </Badge>
        </div>

        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex flex-wrap gap-2">
            {exercise.muscleGroups.primary.slice(0, 2).map((muscle, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="text-xs bg-orange-500/80 text-white border-none"
              >
                {muscle}
              </Badge>
            ))}
            {exercise.muscleGroups.secondary.slice(0, 1).map((muscle, index) => (
              <Badge
                key={index}
                variant="outline"
                className="text-xs bg-slate-900/70 backdrop-blur-sm text-gray-300 border-slate-600/30"
              >
                {muscle}
              </Badge>
            ))}
            {exercise.muscleGroups.primary.length + exercise.muscleGroups.secondary.length > 3 && (
              <Badge variant="outline" className="text-xs bg-slate-900/70 backdrop-blur-sm text-gray-300 border-slate-600/30">
                +{exercise.muscleGroups.primary.length + exercise.muscleGroups.secondary.length - 3} more
              </Badge>
            )}
          </div>
        </div>
      </div>

      <CardContent className="p-6">
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

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {exercise.tags.map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-xs bg-slate-700 text-gray-300">
              {tag}
            </Badge>
          ))}
        </div>

        {isExpanded && (
          <div className="space-y-6 mb-6">
            <Tabs defaultValue="instructions" className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-slate-700">
                <TabsTrigger value="instructions" className="text-xs">Instructions</TabsTrigger>
                <TabsTrigger value="form" className="text-xs">Form</TabsTrigger>
                <TabsTrigger value="muscles" className="text-xs">Muscles</TabsTrigger>
                <TabsTrigger value="variations" className="text-xs">Variations</TabsTrigger>
              </TabsList>
              
              <TabsContent value="instructions" className="mt-4">
                <div className="space-y-3">
                  <h4 className="text-lg font-semibold text-white flex items-center">
                    <Info className="h-4 w-4 mr-2 text-blue-400" />
                    Step-by-Step Instructions
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
              </TabsContent>

              <TabsContent value="form" className="mt-4">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-lg font-semibold text-white flex items-center mb-3">
                      <CheckCircle className="h-4 w-4 mr-2 text-green-400" />
                      Key Form Points
                    </h4>
                    <ul className="space-y-2">
                      {exercise.formGuidance.keyPoints.map((point, index) => (
                        <li key={index} className="text-gray-300 text-sm flex">
                          <span className="text-green-400 mr-3">✓</span>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-white flex items-center mb-3">
                      <AlertTriangle className="h-4 w-4 mr-2 text-red-400" />
                      Common Mistakes
                    </h4>
                    <ul className="space-y-2">
                      {exercise.formGuidance.commonMistakes.map((mistake, index) => (
                        <li key={index} className="text-gray-300 text-sm flex">
                          <span className="text-red-400 mr-3">⚠</span>
                          {mistake}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-slate-700/50 p-3 rounded-lg">
                    <h5 className="text-sm font-semibold text-white mb-2">Breathing Pattern</h5>
                    <p className="text-gray-300 text-sm">{exercise.formGuidance.breathingPattern}</p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="muscles" className="mt-4">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">Primary Muscles</h4>
                    <div className="flex flex-wrap gap-2">
                      {exercise.muscleGroups.primary.map((muscle, index) => (
                        <Badge key={index} className="bg-orange-500 text-white">
                          {muscle}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">Secondary Muscles</h4>
                    <div className="flex flex-wrap gap-2">
                      {exercise.muscleGroups.secondary.map((muscle, index) => (
                        <Badge key={index} variant="outline" className="border-orange-400 text-orange-400">
                          {muscle}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {exercise.muscleMapImage && (
                    <div className="mt-4">
                      <h5 className="text-sm font-semibold text-white mb-2">Muscle Activation Map</h5>
                      <img 
                        src={exercise.muscleMapImage} 
                        alt="Muscle activation map"
                        className="w-full max-w-sm mx-auto rounded-lg"
                      />
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="variations" className="mt-4">
                <div className="space-y-4">
                  {exercise.variations.map((variation, index) => (
                    <div key={index} className="bg-slate-700/30 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-semibold text-white">{variation.name}</h5>
                        <Badge className={getDifficultyColor(variation.difficulty)}>
                          {variation.difficulty}
                        </Badge>
                      </div>
                      <p className="text-gray-300 text-sm mb-3">{variation.description}</p>
                      <div className="space-y-1">
                        {variation.modifications.map((mod, modIndex) => (
                          <p key={modIndex} className="text-gray-400 text-xs flex">
                            <span className="text-blue-400 mr-2">•</span>
                            {mod}
                          </p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
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
      </CardContent>
    </Card>
  );
};

export default EnhancedExerciseCard;
