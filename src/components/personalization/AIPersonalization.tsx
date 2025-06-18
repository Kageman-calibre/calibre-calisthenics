
import { useState, useEffect } from 'react';
import { Brain, Target, Zap, Calendar, Star, ChevronRight } from 'lucide-react';

interface AIRecommendation {
  id: string;
  type: 'workout' | 'nutrition' | 'recovery' | 'goal';
  title: string;
  description: string;
  confidence: number;
  action: string;
}

interface PersonalizationInsights {
  fitnessLevel: number;
  preferredWorkoutStyle: string;
  optimalWorkoutTime: string;
  recoveryNeeds: string;
  nutritionFocus: string;
}

const AIPersonalization = () => {
  const [recommendations, setRecommendations] = useState<AIRecommendation[]>([
    {
      id: '1',
      type: 'workout',
      title: 'Increase Upper Body Focus',
      description: 'Based on your recent progress, your lower body is developing faster than upper body. Consider adding 2 more upper body sessions per week.',
      confidence: 92,
      action: 'View Recommended Workouts'
    },
    {
      id: '2',
      type: 'nutrition',
      title: 'Optimize Post-Workout Nutrition',
      description: 'Your recovery could improve by 23% with better post-workout protein timing. Aim for 25g protein within 30 minutes.',
      confidence: 87,
      action: 'See Meal Suggestions'
    },
    {
      id: '3',
      type: 'recovery',
      title: 'Schedule Rest Day',
      description: 'Your heart rate variability suggests you need an active recovery day. Consider yoga or light walking tomorrow.',
      confidence: 94,
      action: 'Plan Recovery Day'
    },
    {
      id: '4',
      type: 'goal',
      title: 'Adjust Strength Goals',
      description: 'You\'re progressing 15% faster than expected. Consider increasing your strength targets for next month.',
      confidence: 89,
      action: 'Update Goals'
    }
  ]);

  const [insights, setInsights] = useState<PersonalizationInsights>({
    fitnessLevel: 75,
    preferredWorkoutStyle: 'Strength & Cardio Mix',
    optimalWorkoutTime: 'Morning (6-8 AM)',
    recoveryNeeds: 'High - Focus on sleep',
    nutritionFocus: 'Muscle building'
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'workout': return <Zap className="h-5 w-5" />;
      case 'nutrition': return <Target className="h-5 w-5" />;
      case 'recovery': return <Calendar className="h-5 w-5" />;
      case 'goal': return <Star className="h-5 w-5" />;
      default: return <Brain className="h-5 w-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'workout': return 'from-orange-500/20 to-red-500/20 border-orange-500/30';
      case 'nutrition': return 'from-green-500/20 to-emerald-500/20 border-green-500/30';
      case 'recovery': return 'from-blue-500/20 to-cyan-500/20 border-blue-500/30';
      case 'goal': return 'from-purple-500/20 to-pink-500/20 border-purple-500/30';
      default: return 'from-gray-500/20 to-slate-500/20 border-gray-500/30';
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-white mb-4">AI Personalization</h2>
        <p className="text-xl text-gray-300">Intelligent recommendations tailored to your progress</p>
      </div>

      {/* AI Insights Overview */}
      <div className="bg-gradient-to-br from-slate-800/60 to-slate-700/40 backdrop-blur-lg rounded-2xl p-8 border border-slate-600/30">
        <h3 className="text-2xl font-semibold text-white mb-6 flex items-center">
          <Brain className="h-6 w-6 text-purple-500 mr-3" />
          Your AI Fitness Profile
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-3">
            <p className="text-gray-400 text-sm">Fitness Level</p>
            <div className="flex items-center space-x-3">
              <div className="flex-1 bg-slate-700 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${insights.fitnessLevel}%` }}
                ></div>
              </div>
              <span className="text-white font-medium">{insights.fitnessLevel}%</span>
            </div>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Preferred Style</p>
            <p className="text-white font-medium">{insights.preferredWorkoutStyle}</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Optimal Time</p>
            <p className="text-white font-medium">{insights.optimalWorkoutTime}</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Recovery Needs</p>
            <p className="text-white font-medium">{insights.recoveryNeeds}</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Nutrition Focus</p>
            <p className="text-white font-medium">{insights.nutritionFocus}</p>
          </div>
        </div>
      </div>

      {/* AI Recommendations */}
      <div className="space-y-6">
        <h3 className="text-2xl font-semibold text-white">Personalized Recommendations</h3>
        <div className="grid gap-6">
          {recommendations.map((rec) => (
            <div
              key={rec.id}
              className={`bg-gradient-to-br ${getTypeColor(rec.type)} backdrop-blur-sm rounded-xl p-6 border transition-all duration-300 hover:scale-[1.02]`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  <div className="p-3 bg-white/10 rounded-lg">
                    {getTypeIcon(rec.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="text-lg font-semibold text-white">{rec.title}</h4>
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span className="text-green-400 text-sm font-medium">{rec.confidence}% confidence</span>
                      </div>
                    </div>
                    <p className="text-gray-300 mb-4">{rec.description}</p>
                    <button className="bg-white/10 hover:bg-white/20 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 flex items-center">
                      {rec.action}
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Learning Progress */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
        <h3 className="text-xl font-semibold text-white mb-6">AI Learning Progress</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-400 mb-2">2,847</div>
            <p className="text-gray-400">Data Points Analyzed</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">94%</div>
            <p className="text-gray-400">Prediction Accuracy</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-400 mb-2">127</div>
            <p className="text-gray-400">Successful Recommendations</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIPersonalization;
