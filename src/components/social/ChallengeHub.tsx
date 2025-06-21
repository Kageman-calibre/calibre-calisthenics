
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Trophy, Users, Calendar, Target, Flame, Award } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Challenge {
  id: string;
  name: string;
  description: string;
  type: 'daily' | 'weekly' | 'monthly';
  category: 'fitness' | 'social' | 'streak';
  target: number;
  unit: string;
  progress: number;
  participants: number;
  timeLeft: string;
  reward: string;
  difficulty: 'easy' | 'medium' | 'hard';
  joined: boolean;
}

const ChallengeHub = () => {
  const { toast } = useToast();
  const [challenges, setChallenges] = useState<Challenge[]>([
    {
      id: '1',
      name: '30-Day Streak Master',
      description: 'Complete at least one workout every day for 30 days',
      type: 'monthly',
      category: 'streak',
      target: 30,
      unit: 'days',
      progress: 12,
      participants: 156,
      timeLeft: '18 days',
      reward: 'Consistency Champion Badge + 500 XP',
      difficulty: 'hard',
      joined: true
    },
    {
      id: '2',
      name: 'Community Builder',
      description: 'Share 5 workouts and get 20 total likes this week',
      type: 'weekly',
      category: 'social',
      target: 20,
      unit: 'likes',
      progress: 8,
      participants: 89,
      timeLeft: '4 days',
      reward: 'Social Star Badge + 200 XP',
      difficulty: 'medium',
      joined: true
    },
    {
      id: '3',
      name: 'Calorie Crusher',
      description: 'Burn 3000 calories through workouts this week',
      type: 'weekly',
      category: 'fitness',
      target: 3000,
      unit: 'calories',
      progress: 1250,
      participants: 234,
      timeLeft: '5 days',
      reward: 'Calorie Crusher Badge + 300 XP',
      difficulty: 'medium',
      joined: false
    },
    {
      id: '4',
      name: 'Early Bird Special',
      description: 'Complete a workout before 8 AM today',
      type: 'daily',
      category: 'fitness',
      target: 1,
      unit: 'workout',
      progress: 0,
      participants: 67,
      timeLeft: '6 hours',
      reward: 'Early Bird Badge + 50 XP',
      difficulty: 'easy',
      joined: false
    }
  ]);

  const joinChallenge = (challengeId: string) => {
    setChallenges(prev => prev.map(challenge => 
      challenge.id === challengeId 
        ? { ...challenge, joined: true, participants: challenge.participants + 1 }
        : challenge
    ));
    
    toast({
      title: "Challenge Joined! 🎯",
      description: "Good luck achieving your goal!",
    });
  };

  const leaveChallenge = (challengeId: string) => {
    setChallenges(prev => prev.map(challenge => 
      challenge.id === challengeId 
        ? { ...challenge, joined: false, participants: Math.max(0, challenge.participants - 1) }
        : challenge
    ));
    
    toast({
      title: "Left Challenge",
      description: "You can rejoin anytime!",
    });
  };

  const getCategoryIcon = (category: Challenge['category']) => {
    switch (category) {
      case 'fitness': return Target;
      case 'social': return Users;
      case 'streak': return Flame;
      default: return Trophy;
    }
  };

  const getDifficultyColor = (difficulty: Challenge['difficulty']) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500/20 text-green-400';
      case 'medium': return 'bg-orange-500/20 text-orange-400';
      case 'hard': return 'bg-red-500/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getTypeColor = (type: Challenge['type']) => {
    switch (type) {
      case 'daily': return 'bg-blue-500/20 text-blue-400';
      case 'weekly': return 'bg-purple-500/20 text-purple-400';
      case 'monthly': return 'bg-cyan-500/20 text-cyan-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-full px-4 py-2 mb-6">
          <Trophy className="h-4 w-4 text-orange-400" />
          <span className="text-orange-400 text-sm font-medium">Community Challenges</span>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
          Challenge
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-400 to-pink-400">
            Yourself
          </span>
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Join community challenges, compete with friends, and earn exclusive rewards
        </p>
      </div>

      {/* Active Challenges */}
      <div className="grid gap-6">
        {challenges.map((challenge) => {
          const CategoryIcon = getCategoryIcon(challenge.category);
          const progressPercentage = (challenge.progress / challenge.target) * 100;

          return (
            <Card 
              key={challenge.id} 
              className={`border transition-all duration-300 hover:scale-[1.02] ${
                challenge.joined 
                  ? 'bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/30' 
                  : 'bg-slate-800/50 border-slate-700'
              }`}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-slate-700/50 rounded-lg">
                      <CategoryIcon className="h-6 w-6 text-orange-400" />
                    </div>
                    <div>
                      <CardTitle className="text-white text-lg">{challenge.name}</CardTitle>
                      <p className="text-gray-400 mt-1">{challenge.description}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <Badge className={getDifficultyColor(challenge.difficulty)}>
                      {challenge.difficulty}
                    </Badge>
                    <Badge className={getTypeColor(challenge.type)}>
                      {challenge.type}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Progress</span>
                    <span className="text-sm font-medium text-white">
                      {challenge.progress}/{challenge.target} {challenge.unit}
                    </span>
                  </div>
                  <Progress value={progressPercentage} className="h-2" />
                  <div className="text-right text-sm text-gray-400">
                    {Math.round(progressPercentage)}% complete
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {challenge.participants} participants
                    </span>
                    <span className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {challenge.timeLeft} left
                    </span>
                  </div>
                </div>

                {/* Reward */}
                <div className="flex items-center space-x-2 p-3 bg-slate-700/30 rounded-lg">
                  <Award className="h-5 w-5 text-yellow-400" />
                  <span className="text-sm text-gray-300">
                    <span className="font-medium text-yellow-400">Reward:</span> {challenge.reward}
                  </span>
                </div>

                {/* Action Button */}
                <div className="flex justify-end">
                  {challenge.joined ? (
                    <Button
                      onClick={() => leaveChallenge(challenge.id)}
                      variant="outline"
                      className="border-red-500/50 text-red-400 hover:bg-red-500/10"
                    >
                      Leave Challenge
                    </Button>
                  ) : (
                    <Button
                      onClick={() => joinChallenge(challenge.id)}
                      className="bg-blue-500 hover:bg-blue-600"
                    >
                      Join Challenge
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default ChallengeHub;
