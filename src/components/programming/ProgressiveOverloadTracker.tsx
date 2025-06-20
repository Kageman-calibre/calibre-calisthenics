
import { useState, useEffect } from 'react';
import { TrendingUp, Target, AlertCircle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/auth/AuthProvider';

interface ProgressionSuggestion {
  suggested_weight: number;
  suggested_reps: number;
  progression_type: string;
}

interface ExercisePerformance {
  id: string;
  exercise_name: string;
  sets_completed: number;
  reps_completed: number[];
  weights_used: number[];
  difficulty_rating: number;
  form_rating: number;
  performed_at: string;
}

interface ProgressiveOverloadTrackerProps {
  exerciseId: string;
  exerciseName: string;
  onSavePerformance?: (performance: any) => void;
}

const ProgressiveOverloadTracker = ({ 
  exerciseId, 
  exerciseName, 
  onSavePerformance 
}: ProgressiveOverloadTrackerProps) => {
  const [suggestion, setSuggestion] = useState<ProgressionSuggestion | null>(null);
  const [recentPerformance, setRecentPerformance] = useState<ExercisePerformance[]>([]);
  const [currentWeight, setCurrentWeight] = useState(0);
  const [currentReps, setCurrentReps] = useState(8);
  const [difficultyRating, setDifficultyRating] = useState(5);
  const [formRating, setFormRating] = useState(5);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchProgressionData();
    }
  }, [exerciseId, user]);

  const fetchProgressionData = async () => {
    if (!user) return;

    // Get progression suggestion
    const { data: suggestionData } = await supabase.rpc('suggest_progressive_overload', {
      p_user_id: user.id,
      p_exercise_id: exerciseId,
      p_target_reps: 8
    });

    if (suggestionData && suggestionData.length > 0) {
      setSuggestion(suggestionData[0]);
      setCurrentWeight(suggestionData[0].suggested_weight);
      setCurrentReps(suggestionData[0].suggested_reps);
    }

    // Get recent performance history
    const { data: performanceData } = await supabase
      .from('exercise_performance')
      .select('*')
      .eq('user_id', user.id)
      .eq('exercise_id', exerciseId)
      .order('performed_at', { ascending: false })
      .limit(5);

    if (performanceData) {
      setRecentPerformance(performanceData);
    }

    setLoading(false);
  };

  const savePerformance = async () => {
    if (!user) return;

    const performance = {
      user_id: user.id,
      exercise_id: exerciseId,
      exercise_name: exerciseName,
      sets_completed: 3, // Default to 3 sets
      reps_completed: [currentReps, currentReps, currentReps],
      weights_used: [currentWeight, currentWeight, currentWeight],
      difficulty_rating: difficultyRating,
      form_rating: formRating
    };

    const { error } = await supabase
      .from('exercise_performance')
      .insert(performance);

    if (!error) {
      await fetchProgressionData();
      onSavePerformance?.(performance);
    }
  };

  const getProgressionTypeColor = (type: string) => {
    switch (type) {
      case 'increase_weight': return 'bg-green-500/20 text-green-400';
      case 'decrease_intensity': return 'bg-orange-500/20 text-orange-400';
      case 'start_light': return 'bg-blue-500/20 text-blue-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getProgressionTypeIcon = (type: string) => {
    switch (type) {
      case 'increase_weight': return <TrendingUp className="h-4 w-4" />;
      case 'decrease_intensity': return <AlertCircle className="h-4 w-4" />;
      case 'start_light': return <Target className="h-4 w-4" />;
      default: return <CheckCircle className="h-4 w-4" />;
    }
  };

  if (loading) {
    return <div className="text-white">Loading progression data...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Progression Suggestion */}
      {suggestion && (
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-orange-400" />
              Smart Progression
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Badge className={getProgressionTypeColor(suggestion.progression_type)}>
                {getProgressionTypeIcon(suggestion.progression_type)}
                <span className="ml-1 capitalize">
                  {suggestion.progression_type.replace('_', ' ')}
                </span>
              </Badge>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-700/30 rounded-lg p-3">
                <label className="text-gray-400 text-sm">Suggested Weight</label>
                <input
                  type="number"
                  value={currentWeight}
                  onChange={(e) => setCurrentWeight(Number(e.target.value))}
                  className="w-full bg-transparent text-white text-lg font-bold mt-1 border-none outline-none"
                  step="0.5"
                />
                <span className="text-gray-500 text-xs">kg</span>
              </div>
              
              <div className="bg-slate-700/30 rounded-lg p-3">
                <label className="text-gray-400 text-sm">Target Reps</label>
                <input
                  type="number"
                  value={currentReps}
                  onChange={(e) => setCurrentReps(Number(e.target.value))}
                  className="w-full bg-transparent text-white text-lg font-bold mt-1 border-none outline-none"
                />
                <span className="text-gray-500 text-xs">reps</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Performance Rating */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Rate Your Performance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-gray-400 text-sm block mb-2">
              Difficulty (1 = Too Easy, 10 = Too Hard)
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((rating) => (
                <button
                  key={rating}
                  onClick={() => setDifficultyRating(rating)}
                  className={`w-8 h-8 rounded-full text-sm font-medium transition-colors ${
                    difficultyRating === rating
                      ? 'bg-orange-500 text-white'
                      : 'bg-slate-700 text-gray-400 hover:bg-slate-600'
                  }`}
                >
                  {rating}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-gray-400 text-sm block mb-2">
              Form Quality (1 = Poor, 10 = Perfect)
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((rating) => (
                <button
                  key={rating}
                  onClick={() => setFormRating(rating)}
                  className={`w-8 h-8 rounded-full text-sm font-medium transition-colors ${
                    formRating === rating
                      ? 'bg-blue-500 text-white'
                      : 'bg-slate-700 text-gray-400 hover:bg-slate-600'
                  }`}
                >
                  {rating}
                </button>
              ))}
            </div>
          </div>

          <Button 
            onClick={savePerformance}
            className="w-full bg-orange-500 hover:bg-orange-600"
          >
            Save Performance
          </Button>
        </CardContent>
      </Card>

      {/* Recent Performance History */}
      {recentPerformance.length > 0 && (
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Recent Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {recentPerformance.map((performance) => (
                <div
                  key={performance.id}
                  className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg"
                >
                  <div>
                    <p className="text-white font-medium">
                      {performance.weights_used[0]}kg × {performance.reps_completed[0]} reps
                    </p>
                    <p className="text-gray-400 text-sm">
                      {new Date(performance.performed_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="outline" className="text-orange-400 border-orange-400">
                      D: {performance.difficulty_rating}/10
                    </Badge>
                    <Badge variant="outline" className="text-blue-400 border-blue-400">
                      F: {performance.form_rating}/10
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ProgressiveOverloadTracker;
