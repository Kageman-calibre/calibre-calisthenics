
import { useState } from 'react';
import { BarChart3, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const MovementAnalysis = () => {
  const [analysisType, setAnalysisType] = useState<'balance' | 'progression' | 'volume'>('balance');

  // Mock data for movement pattern analysis
  const pushPullData = [
    { week: 'Week 1', push: 120, pull: 80, ratio: 1.5 },
    { week: 'Week 2', push: 140, pull: 90, ratio: 1.56 },
    { week: 'Week 3', push: 130, pull: 100, ratio: 1.3 },
    { week: 'Week 4', push: 150, pull: 120, ratio: 1.25 },
    { week: 'Week 5', push: 160, pull: 140, ratio: 1.14 },
    { week: 'Week 6', push: 170, pull: 150, ratio: 1.13 }
  ];

  const progressionData = [
    { exercise: 'Push-ups', current: 15, target: 20, progress: 75 },
    { exercise: 'Pull-ups', current: 6, target: 10, progress: 60 },
    { exercise: 'Handstand', current: 20, target: 60, progress: 33 },
    { exercise: 'L-Sit', current: 8, target: 30, progress: 27 },
    { exercise: 'Pistol Squat', current: 3, target: 8, progress: 38 }
  ];

  const unilateralBalance = [
    { movement: 'Single Arm Push-up Prep', left: 5, right: 8, imbalance: 37.5 },
    { movement: 'Pistol Squat', left: 2, right: 4, imbalance: 50 },
    { movement: 'Single Arm Hang', left: 15, right: 20, imbalance: 25 },
    { movement: 'Archer Push-up', left: 6, right: 9, imbalance: 33 }
  ];

  const getImbalanceColor = (imbalance: number) => {
    if (imbalance > 30) return 'text-red-400';
    if (imbalance > 15) return 'text-orange-400';
    return 'text-green-400';
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 60) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-6">
      {/* Analysis Type Selector */}
      <div className="flex gap-2">
        <button
          onClick={() => setAnalysisType('balance')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            analysisType === 'balance'
              ? 'bg-orange-500 text-white'
              : 'bg-slate-800 text-gray-300 hover:bg-slate-700'
          }`}
        >
          Push/Pull Balance
        </button>
        <button
          onClick={() => setAnalysisType('progression')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            analysisType === 'progression'
              ? 'bg-orange-500 text-white'
              : 'bg-slate-800 text-gray-300 hover:bg-slate-700'
          }`}
        >
          Skill Progression
        </button>
        <button
          onClick={() => setAnalysisType('volume')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            analysisType === 'volume'
              ? 'bg-orange-500 text-white'
              : 'bg-slate-800 text-gray-300 hover:bg-slate-700'
          }`}
        >
          Unilateral Balance
        </button>
      </div>

      {/* Push/Pull Balance Analysis */}
      {analysisType === 'balance' && (
        <div className="space-y-6">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-orange-400" />
                Push/Pull Ratio Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={pushPullData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="week" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1F2937', 
                        border: '1px solid #374151',
                        borderRadius: '8px',
                        color: '#F9FAFB'
                      }} 
                    />
                    <Line type="monotone" dataKey="push" stroke="#EF4444" strokeWidth={2} name="Push Volume" />
                    <Line type="monotone" dataKey="pull" stroke="#3B82F6" strokeWidth={2} name="Pull Volume" />
                    <Line type="monotone" dataKey="ratio" stroke="#F59E0B" strokeWidth={2} name="Push/Pull Ratio" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-700/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="h-4 w-4 text-orange-400" />
                    <span className="text-white font-medium">Current Ratio</span>
                  </div>
                  <p className="text-2xl font-bold text-orange-400">1.13:1</p>
                  <p className="text-gray-400 text-sm">Push:Pull</p>
                </div>
                
                <div className="bg-slate-700/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span className="text-white font-medium">Status</span>
                  </div>
                  <Badge className="bg-green-500/20 text-green-400">Well Balanced</Badge>
                  <p className="text-gray-400 text-sm mt-1">Ideal range: 1:1 to 1.2:1</p>
                </div>
                
                <div className="bg-slate-700/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="h-4 w-4 text-blue-400" />
                    <span className="text-white font-medium">Recommendation</span>
                  </div>
                  <p className="text-blue-400 text-sm">Maintain current balance</p>
                  <p className="text-gray-400 text-sm">Good shoulder health</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Skill Progression Analysis */}
      {analysisType === 'progression' && (
        <div className="space-y-4">
          {progressionData.map((skill) => (
            <Card key={skill.exercise} className="bg-slate-800/50 border-slate-700">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-white font-medium">{skill.exercise}</h3>
                  <Badge className={`${getProgressColor(skill.progress)}/20 text-white`}>
                    {skill.progress}% to goal
                  </Badge>
                </div>
                
                <div className="flex items-center gap-4 mb-2">
                  <span className="text-gray-400 text-sm">Current: {skill.current}</span>
                  <span className="text-gray-400 text-sm">Target: {skill.target}</span>
                </div>
                
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${getProgressColor(skill.progress)}`}
                    style={{ width: `${skill.progress}%` }}
                  ></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Unilateral Balance Analysis */}
      {analysisType === 'volume' && (
        <div className="space-y-4">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Unilateral Strength Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {unilateralBalance.map((movement) => (
                  <div key={movement.movement} className="bg-slate-700/30 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-white font-medium">{movement.movement}</h4>
                      <span className={`font-medium ${getImbalanceColor(movement.imbalance)}`}>
                        {movement.imbalance}% imbalance
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <p className="text-gray-400 text-sm">Left</p>
                        <p className="text-white text-lg font-bold">{movement.left}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-gray-400 text-sm">Right</p>
                        <p className="text-white text-lg font-bold">{movement.right}</p>
                      </div>
                    </div>
                    
                    {movement.imbalance > 20 && (
                      <div className="mt-3 text-orange-400 text-sm">
                        ⚠ Focus on weaker side training
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default MovementAnalysis;
