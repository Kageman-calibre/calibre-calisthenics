
import { useState, useEffect } from 'react';
import { Heart, Moon, Zap, AlertTriangle, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/auth/AuthProvider';

interface RecoveryMetrics {
  id?: string;
  sleep_hours: number;
  sleep_quality: number;
  stress_level: number;
  energy_level: number;
  muscle_soreness: number;
  workout_readiness: number;
  notes?: string;
  date: string;
}

const RecoveryTracker = () => {
  const [metrics, setMetrics] = useState<RecoveryMetrics>({
    sleep_hours: 8,
    sleep_quality: 5,
    stress_level: 5,
    energy_level: 5,
    muscle_soreness: 5,
    workout_readiness: 5,
    notes: '',
    date: new Date().toISOString().split('T')[0]
  });
  
  const [recoveryScore, setRecoveryScore] = useState<number | null>(null);
  const [weeklyData, setWeeklyData] = useState<RecoveryMetrics[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchRecoveryData();
    }
  }, [user]);

  const fetchRecoveryData = async () => {
    if (!user) return;

    // Get today's metrics if they exist
    const { data: todayData } = await supabase
      .from('recovery_metrics')
      .select('*')
      .eq('user_id', user.id)
      .eq('date', metrics.date)
      .maybeSingle();

    if (todayData) {
      setMetrics(todayData);
    }

    // Get recovery score
    const { data: scoreData } = await supabase.rpc('calculate_recovery_score', {
      p_user_id: user.id,
      p_date: metrics.date
    });

    if (scoreData !== null) {
      setRecoveryScore(scoreData);
    }

    // Get weekly data for trends
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    
    const { data: weeklyMetrics } = await supabase
      .from('recovery_metrics')
      .select('*')
      .eq('user_id', user.id)
      .gte('date', oneWeekAgo.toISOString().split('T')[0])
      .order('date', { ascending: false });

    if (weeklyMetrics) {
      setWeeklyData(weeklyMetrics);
    }

    setLoading(false);
  };

  const saveMetrics = async () => {
    if (!user) return;

    const { error } = await supabase
      .from('recovery_metrics')
      .upsert({
        ...metrics,
        user_id: user.id
      });

    if (!error) {
      await fetchRecoveryData();
    }
  };

  const updateMetric = (key: keyof RecoveryMetrics, value: number | string) => {
    setMetrics(prev => ({ ...prev, [key]: value }));
  };

  const getRecoveryScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-400 bg-green-500/20';
    if (score >= 6) return 'text-orange-400 bg-orange-500/20';
    return 'text-red-400 bg-red-500/20';
  };

  const getRecoveryRecommendation = (score: number) => {
    if (score >= 8) return 'Perfect day for an intense workout!';
    if (score >= 6) return 'Good for moderate intensity training';
    return 'Consider a rest day or light activity';
  };

  const MetricSlider = ({ 
    label, 
    value, 
    onChange, 
    icon: Icon, 
    color, 
    lowLabel, 
    highLabel 
  }: {
    label: string;
    value: number;
    onChange: (value: number) => void;
    icon: any;
    color: string;
    lowLabel: string;
    highLabel: string;
  }) => (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Icon className={`h-4 w-4 ${color}`} />
        <span className="text-white font-medium">{label}</span>
        <Badge className={`ml-auto ${color.includes('green') ? 'bg-green-500/20 text-green-400' : 
          color.includes('blue') ? 'bg-blue-500/20 text-blue-400' :
          color.includes('orange') ? 'bg-orange-500/20 text-orange-400' :
          'bg-purple-500/20 text-purple-400'}`}>
          {value}/10
        </Badge>
      </div>
      
      <div className="space-y-2">
        <input
          type="range"
          min="1"
          max="10"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
        />
        <div className="flex justify-between text-xs text-gray-400">
          <span>{lowLabel}</span>
          <span>{highLabel}</span>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return <div className="text-white">Loading recovery data...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Recovery Score */}
      {recoveryScore !== null && (
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${getRecoveryScoreColor(recoveryScore)}`}>
                <Heart className="h-5 w-5" />
                <span className="text-2xl font-bold">{recoveryScore}/10</span>
              </div>
              <p className="text-gray-300 mt-2">Recovery Score</p>
              <p className="text-sm text-gray-400 mt-1">
                {getRecoveryRecommendation(recoveryScore)}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Daily Metrics Input */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Today's Recovery Metrics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Sleep Hours */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Moon className="h-4 w-4 text-blue-400" />
              <span className="text-white font-medium">Sleep Hours</span>
              <Badge className="ml-auto bg-blue-500/20 text-blue-400">
                {metrics.sleep_hours}h
              </Badge>
            </div>
            <input
              type="range"
              min="3"
              max="12"
              step="0.5"
              value={metrics.sleep_hours}
              onChange={(e) => updateMetric('sleep_hours', Number(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <MetricSlider
            label="Sleep Quality"
            value={metrics.sleep_quality}
            onChange={(value) => updateMetric('sleep_quality', value)}
            icon={Moon}
            color="text-blue-400"
            lowLabel="Poor"
            highLabel="Excellent"
          />

          <MetricSlider
            label="Stress Level"
            value={metrics.stress_level}
            onChange={(value) => updateMetric('stress_level', value)}
            icon={AlertTriangle}
            color="text-red-400"
            lowLabel="Very Low"
            highLabel="Very High"
          />

          <MetricSlider
            label="Energy Level"
            value={metrics.energy_level}
            onChange={(value) => updateMetric('energy_level', value)}
            icon={Zap}
            color="text-yellow-400"
            lowLabel="Exhausted"
            highLabel="Energized"
          />

          <MetricSlider
            label="Muscle Soreness"
            value={metrics.muscle_soreness}
            onChange={(value) => updateMetric('muscle_soreness', value)}
            icon={TrendingUp}
            color="text-purple-400"
            lowLabel="None"
            highLabel="Very Sore"
          />

          <MetricSlider
            label="Workout Readiness"
            value={metrics.workout_readiness}
            onChange={(value) => updateMetric('workout_readiness', value)}
            icon={Heart}
            color="text-green-400"
            lowLabel="Not Ready"
            highLabel="Ready to Go"
          />

          <div className="space-y-2">
            <label className="text-white font-medium">Notes (Optional)</label>
            <textarea
              value={metrics.notes || ''}
              onChange={(e) => updateMetric('notes', e.target.value)}
              placeholder="How are you feeling today?"
              className="w-full bg-slate-700/30 border border-slate-600 rounded-lg p-3 text-white placeholder-gray-400"
              rows={3}
            />
          </div>

          <Button 
            onClick={saveMetrics}
            className="w-full bg-orange-500 hover:bg-orange-600"
          >
            Save Today's Metrics
          </Button>
        </CardContent>
      </Card>

      {/* Weekly Trend */}
      {weeklyData.length > 0 && (
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">7-Day Recovery Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {weeklyData.map((day) => (
                <div key={day.id} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                  <div>
                    <p className="text-white font-medium">
                      {new Date(day.date).toLocaleDateString('en-US', { 
                        weekday: 'short', 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </p>
                    <p className="text-gray-400 text-sm">{day.sleep_hours}h sleep</p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <Badge variant="outline" className="text-blue-400 border-blue-400">
                      SQ: {day.sleep_quality}
                    </Badge>
                    <Badge variant="outline" className="text-green-400 border-green-400">
                      WR: {day.workout_readiness}
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

export default RecoveryTracker;
