
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle, Target, TrendingUp, Activity, Zap } from 'lucide-react';

interface JointAngle {
  joint: string;
  angle: number;
  idealRange: [number, number];
  status: 'good' | 'warning' | 'poor';
}

interface MovementSymmetry {
  leftSide: number;
  rightSide: number;
  asymmetryPercentage: number;
  status: 'balanced' | 'slight' | 'significant';
}

interface RangeOfMotion {
  exercise: string;
  achieved: number;
  optimal: number;
  percentage: number;
}

interface AdvancedAnalysisResult {
  jointAngles: JointAngle[];
  movementSymmetry: MovementSymmetry;
  rangeOfMotion: RangeOfMotion[];
  movementVelocity: {
    concentric: number;
    eccentric: number;
    optimal: boolean;
  };
  injuryRisk: {
    level: 'low' | 'moderate' | 'high';
    factors: string[];
    score: number;
  };
}

interface AdvancedMovementAnalysisProps {
  analysisResult: AdvancedAnalysisResult;
}

const AdvancedMovementAnalysis = ({ analysisResult }: AdvancedMovementAnalysisProps) => {
  const [activeTab, setActiveTab] = useState<'joints' | 'symmetry' | 'rom' | 'velocity' | 'injury'>('joints');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good':
      case 'balanced':
      case 'low':
        return 'text-green-400';
      case 'warning':
      case 'slight':
      case 'moderate':
        return 'text-yellow-400';
      case 'poor':
      case 'significant':
      case 'high':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      good: 'bg-green-500/20 text-green-400 border-green-500/30',
      balanced: 'bg-green-500/20 text-green-400 border-green-500/30',
      low: 'bg-green-500/20 text-green-400 border-green-500/30',
      warning: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      slight: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      moderate: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      poor: 'bg-red-500/20 text-red-400 border-red-500/30',
      significant: 'bg-red-500/20 text-red-400 border-red-500/30',
      high: 'bg-red-500/20 text-red-400 border-red-500/30',
    };
    return colors[status as keyof typeof colors] || 'bg-gray-500/20 text-gray-400';
  };

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Activity className="h-5 w-5 text-blue-400" />
          Advanced Movement Analysis
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-6">
          {[
            { id: 'joints', label: 'Joint Angles', icon: Target },
            { id: 'symmetry', label: 'Symmetry', icon: TrendingUp },
            { id: 'rom', label: 'Range of Motion', icon: Activity },
            { id: 'velocity', label: 'Velocity', icon: Zap },
            { id: 'injury', label: 'Injury Risk', icon: AlertTriangle },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id as any)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                activeTab === id
                  ? 'bg-blue-500 text-white'
                  : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </div>

        {/* Joint Angles Analysis */}
        {activeTab === 'joints' && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-white mb-4">Joint Angle Analysis</h3>
            {analysisResult.jointAngles.map((joint, index) => (
              <div key={index} className="bg-slate-700/30 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-white font-medium">{joint.joint}</span>
                  <Badge className={getStatusBadge(joint.status)}>
                    {joint.status}
                  </Badge>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-400">Current</p>
                    <p className="text-white font-bold">{joint.angle}°</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Ideal Range</p>
                    <p className="text-white font-bold">{joint.idealRange[0]}° - {joint.idealRange[1]}°</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Deviation</p>
                    <p className={`font-bold ${getStatusColor(joint.status)}`}>
                      {joint.angle < joint.idealRange[0] ? 
                        `${joint.idealRange[0] - joint.angle}° low` :
                        joint.angle > joint.idealRange[1] ?
                        `${joint.angle - joint.idealRange[1]}° high` :
                        'Within range'
                      }
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Movement Symmetry */}
        {activeTab === 'symmetry' && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-white mb-4">Movement Symmetry</h3>
            <div className="bg-slate-700/30 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <span className="text-white font-medium">Left/Right Balance</span>
                <Badge className={getStatusBadge(analysisResult.movementSymmetry.status)}>
                  {analysisResult.movementSymmetry.status}
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center">
                  <p className="text-gray-400 text-sm">Left Side</p>
                  <p className="text-white text-xl font-bold">{analysisResult.movementSymmetry.leftSide}</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-400 text-sm">Right Side</p>
                  <p className="text-white text-xl font-bold">{analysisResult.movementSymmetry.rightSide}</p>
                </div>
              </div>
              <div className="text-center">
                <p className="text-gray-400 text-sm">Asymmetry</p>
                <p className={`text-2xl font-bold ${getStatusColor(analysisResult.movementSymmetry.status)}`}>
                  {analysisResult.movementSymmetry.asymmetryPercentage}%
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Range of Motion */}
        {activeTab === 'rom' && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-white mb-4">Range of Motion Analysis</h3>
            {analysisResult.rangeOfMotion.map((rom, index) => (
              <div key={index} className="bg-slate-700/30 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-white font-medium">{rom.exercise}</span>
                  <span className="text-blue-400 font-bold">{rom.percentage}%</span>
                </div>
                <Progress value={rom.percentage} className="mb-2" />
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Achieved: {rom.achieved}°</span>
                  <span className="text-gray-400">Optimal: {rom.optimal}°</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Movement Velocity */}
        {activeTab === 'velocity' && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-white mb-4">Movement Velocity</h3>
            <div className="bg-slate-700/30 rounded-lg p-4">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center">
                  <p className="text-gray-400 text-sm">Concentric (Up)</p>
                  <p className="text-white text-xl font-bold">{analysisResult.movementVelocity.concentric}s</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-400 text-sm">Eccentric (Down)</p>
                  <p className="text-white text-xl font-bold">{analysisResult.movementVelocity.eccentric}s</p>
                </div>
              </div>
              <div className="text-center">
                <Badge className={analysisResult.movementVelocity.optimal ? 
                  'bg-green-500/20 text-green-400 border-green-500/30' : 
                  'bg-orange-500/20 text-orange-400 border-orange-500/30'
                }>
                  {analysisResult.movementVelocity.optimal ? 'Optimal Tempo' : 'Adjust Tempo'}
                </Badge>
              </div>
            </div>
          </div>
        )}

        {/* Injury Risk Assessment */}
        {activeTab === 'injury' && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-white mb-4">Injury Risk Assessment</h3>
            <div className="bg-slate-700/30 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <span className="text-white font-medium">Risk Level</span>
                <Badge className={getStatusBadge(analysisResult.injuryRisk.level)}>
                  {analysisResult.injuryRisk.level} risk
                </Badge>
              </div>
              <div className="text-center mb-4">
                <p className="text-gray-400 text-sm">Risk Score</p>
                <p className={`text-3xl font-bold ${getStatusColor(analysisResult.injuryRisk.level)}`}>
                  {analysisResult.injuryRisk.score}/100
                </p>
              </div>
              <div>
                <p className="text-white font-medium mb-2">Risk Factors:</p>
                <ul className="space-y-1">
                  {analysisResult.injuryRisk.factors.map((factor, index) => (
                    <li key={index} className="text-gray-300 text-sm flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-orange-400 mt-0.5 flex-shrink-0" />
                      {factor}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AdvancedMovementAnalysis;
