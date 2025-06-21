
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Star, Trophy, Target, Flame, Gift } from 'lucide-react';

interface UserLevel {
  level: number;
  currentXP: number;
  nextLevelXP: number;
  totalXP: number;
  title: string;
}

interface PointsSystemProps {
  onPointsEarned?: (points: number, reason: string) => void;
}

const PointsSystem = ({ onPointsEarned }: PointsSystemProps) => {
  const [userLevel, setUserLevel] = useState<UserLevel>({
    level: 5,
    currentXP: 350,
    nextLevelXP: 500,
    totalXP: 2350,
    title: 'Fitness Enthusiast'
  });

  const [recentPoints, setRecentPoints] = useState([
    { reason: 'Completed workout', points: 50, time: '2 hours ago' },
    { reason: 'Weekly streak bonus', points: 100, time: '1 day ago' },
    { reason: 'New personal record', points: 75, time: '2 days ago' },
    { reason: 'Shared workout', points: 25, time: '3 days ago' }
  ]);

  const progressPercentage = (userLevel.currentXP / userLevel.nextLevelXP) * 100;

  const getLevelTitle = (level: number) => {
    if (level >= 20) return 'Fitness Legend';
    if (level >= 15) return 'Elite Athlete';
    if (level >= 10) return 'Fitness Master';
    if (level >= 5) return 'Fitness Enthusiast';
    return 'Beginner';
  };

  const getLevelColor = (level: number) => {
    if (level >= 20) return 'text-purple-400';
    if (level >= 15) return 'text-blue-400';
    if (level >= 10) return 'text-green-400';
    if (level >= 5) return 'text-orange-400';
    return 'text-gray-400';
  };

  const earnPoints = (points: number, reason: string) => {
    setRecentPoints(prev => [
      { reason, points, time: 'Just now' },
      ...prev.slice(0, 4)
    ]);
    
    const newCurrentXP = userLevel.currentXP + points;
    const newTotalXP = userLevel.totalXP + points;
    
    if (newCurrentXP >= userLevel.nextLevelXP) {
      // Level up!
      const newLevel = userLevel.level + 1;
      setUserLevel({
        level: newLevel,
        currentXP: newCurrentXP - userLevel.nextLevelXP,
        nextLevelXP: userLevel.nextLevelXP + 100,
        totalXP: newTotalXP,
        title: getLevelTitle(newLevel)
      });
    } else {
      setUserLevel(prev => ({
        ...prev,
        currentXP: newCurrentXP,
        totalXP: newTotalXP
      }));
    }
    
    onPointsEarned?.(points, reason);
  };

  return (
    <div className="space-y-6">
      {/* Level & Progress */}
      <Card className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 border-purple-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Star className="h-6 w-6 mr-2 text-yellow-400" />
            Your Level
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <div className="text-4xl font-bold text-white mb-2">
              Level {userLevel.level}
            </div>
            <Badge className={`${getLevelColor(userLevel.level)} bg-transparent border-current`}>
              {userLevel.title}
            </Badge>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-300">
              <span>{userLevel.currentXP} XP</span>
              <span>{userLevel.nextLevelXP} XP</span>
            </div>
            <Progress value={progressPercentage} className="h-3" />
            <p className="text-center text-sm text-gray-400">
              {userLevel.nextLevelXP - userLevel.currentXP} XP to next level
            </p>
          </div>
          
          <div className="text-center">
            <p className="text-lg font-semibold text-gray-300">
              Total XP: {userLevel.totalXP.toLocaleString()}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Point Earning Actions */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Target className="h-6 w-6 mr-2 text-green-400" />
            Earn Points
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { action: 'Complete a workout', points: 50, icon: Trophy },
            { action: 'Share your workout', points: 25, icon: Gift },
            { action: 'Maintain 7-day streak', points: 100, icon: Flame },
            { action: 'Set new personal record', points: 75, icon: Star }
          ].map((item, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
              <div className="flex items-center">
                <item.icon className="h-5 w-5 text-blue-400 mr-3" />
                <span className="text-white">{item.action}</span>
              </div>
              <Badge variant="secondary" className="bg-green-500/20 text-green-400">
                +{item.points} XP
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Recent Points */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Recent Points</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {recentPoints.map((point, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
              <div>
                <p className="text-white font-medium">{point.reason}</p>
                <p className="text-sm text-gray-400">{point.time}</p>
              </div>
              <Badge className="bg-blue-500/20 text-blue-400">
                +{point.points} XP
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Demo Button */}
      <div className="text-center">
        <button
          onClick={() => earnPoints(50, 'Demo workout completion')}
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition-colors"
        >
          Simulate Earning Points
        </button>
      </div>
    </div>
  );
};

export default PointsSystem;
