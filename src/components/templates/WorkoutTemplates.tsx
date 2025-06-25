import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Zap, Target, Users, Star, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface WorkoutTemplate {
  id: string;
  name: string;
  description: string;
  duration: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  exercises: number;
  calories: number;
  rating: number;
  popularity: number;
  equipment?: string[];
  focus: string[];
}

const WorkoutTemplates = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const navigate = useNavigate();
  const { toast } = useToast();

  const startWorkout = (template: WorkoutTemplate) => {
    toast({
      title: "Starting Workout! 🔥",
      description: `Get ready for ${template.name} - ${template.duration} minutes of training!`,
    });
    
    // Navigate to studio page with template data
    navigate('/studio', { 
      state: { 
        template: template,
        mode: 'template'
      } 
    });
  };

  const templates: WorkoutTemplate[] = [
    {
      id: '1',
      name: 'HIIT Fat Burner',
      description: 'High-intensity interval training designed to maximize calorie burn and boost metabolism',
      duration: 30,
      difficulty: 'intermediate',
      category: 'HIIT',
      exercises: 8,
      calories: 350,
      rating: 4.8,
      popularity: 95,
      equipment: ['None'],
      focus: ['Fat Loss', 'Cardio', 'Full Body']
    },
    {
      id: '2',
      name: 'Upper Body Strength',
      description: 'Build lean muscle mass in your chest, shoulders, back, and arms',
      duration: 45,
      difficulty: 'intermediate',
      category: 'Strength',
      exercises: 6,
      calories: 280,
      rating: 4.6,
      popularity: 88,
      equipment: ['Dumbbells', 'Resistance Bands'],
      focus: ['Muscle Building', 'Upper Body']
    },
    {
      id: '3',
      name: 'Beginner Full Body',
      description: 'Perfect introduction to fitness with basic movements and proper form guidance',
      duration: 25,
      difficulty: 'beginner',
      category: 'Full Body',
      exercises: 5,
      calories: 180,
      rating: 4.9,
      popularity: 92,
      equipment: ['None'],
      focus: ['Beginner Friendly', 'Full Body', 'Form']
    },
    {
      id: '4',
      name: 'Core & Abs Blast',
      description: 'Targeted core workout to strengthen and tone your midsection',
      duration: 20,
      difficulty: 'intermediate',
      category: 'Core',
      exercises: 7,
      calories: 150,
      rating: 4.7,
      popularity: 85,
      equipment: ['Mat'],
      focus: ['Core', 'Abs', 'Stability']
    },
    {
      id: '5',
      name: 'Advanced Athlete Training',
      description: 'Elite-level workout combining strength, power, and endurance',
      duration: 60,
      difficulty: 'advanced',
      category: 'Athletic',
      exercises: 10,
      calories: 450,
      rating: 4.5,
      popularity: 78,
      equipment: ['Barbell', 'Kettlebell', 'Pull-up Bar'],
      focus: ['Athletic Performance', 'Power', 'Endurance']
    },
    {
      id: '6',
      name: 'Yoga Flow & Flexibility',
      description: 'Gentle yoga sequence to improve flexibility and reduce stress',
      duration: 35,
      difficulty: 'beginner',
      category: 'Yoga',
      exercises: 12,
      calories: 120,
      rating: 4.8,
      popularity: 90,
      equipment: ['Mat'],
      focus: ['Flexibility', 'Mobility', 'Relaxation']
    }
  ];

  const categories = ['all', 'HIIT', 'Strength', 'Full Body', 'Core', 'Athletic', 'Yoga'];
  const difficulties = ['all', 'beginner', 'intermediate', 'advanced'];

  const filteredTemplates = templates.filter(template => {
    const categoryMatch = selectedCategory === 'all' || template.category === selectedCategory;
    const difficultyMatch = selectedDifficulty === 'all' || template.difficulty === selectedDifficulty;
    return categoryMatch && difficultyMatch;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-500/20 text-green-400';
      case 'intermediate': return 'bg-yellow-500/20 text-yellow-400';
      case 'advanced': return 'bg-red-500/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Workout Templates</h2>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Choose from our collection of professionally designed workout templates tailored to your goals
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 justify-center">
        <div className="space-x-2">
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
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
              onClick={() => setSelectedDifficulty(difficulty)}
              className="capitalize"
            >
              {difficulty}
            </Button>
          ))}
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <Card key={template.id} className="bg-gradient-to-br from-slate-800/60 to-slate-700/40 border-slate-600/30 hover:border-orange-500/50 transition-all duration-300">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-white text-lg mb-2">{template.name}</CardTitle>
                  <Badge className={getDifficultyColor(template.difficulty)}>
                    {template.difficulty}
                  </Badge>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-300">{template.rating}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 text-sm">{template.description}</p>
              
              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-blue-400" />
                  <span className="text-gray-300">{template.duration} min</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Target className="h-4 w-4 text-green-400" />
                  <span className="text-gray-300">{template.exercises} exercises</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Zap className="h-4 w-4 text-orange-400" />
                  <span className="text-gray-300">{template.calories} cal</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-purple-400" />
                  <span className="text-gray-300">{template.popularity}% liked</span>
                </div>
              </div>

              {/* Focus Areas */}
              <div>
                <div className="text-xs text-gray-400 mb-2">Focus Areas:</div>
                <div className="flex flex-wrap gap-1">
                  {template.focus.map((focus, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {focus}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Equipment */}
              {template.equipment && (
                <div>
                  <div className="text-xs text-gray-400 mb-2">Equipment:</div>
                  <div className="flex flex-wrap gap-1">
                    {template.equipment.map((item, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <Button 
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                onClick={() => startWorkout(template)}
              >
                <Play className="h-4 w-4 mr-2" />
                Start Workout
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default WorkoutTemplates;
