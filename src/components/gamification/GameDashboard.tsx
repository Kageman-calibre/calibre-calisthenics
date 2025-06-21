
import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Trophy, Star, Target, Users } from 'lucide-react';
import PointsSystem from './PointsSystem';
import AchievementBadge from '../achievements/AchievementBadge';
import ChallengeHub from '../social/ChallengeHub';
import WorkoutShare from '../social/WorkoutShare';

const GameDashboard = () => {
  const [activeTab, setActiveTab] = useState('points');
  const [mockWorkout] = useState({
    name: 'HIIT Circuit Training',
    exercises: ['Burpees', 'Mountain Climbers', 'Jump Squats', 'Push-ups'],
    duration: 25,
    calories: 280,
    difficulty: 'intermediate' as const
  });

  const achievements = [
    {
      name: 'First Steps',
      description: 'Complete your first workout',
      earned: true,
      earnedDate: '2024-01-15',
      rarity: 'common' as const
    },
    {
      name: 'Streak Master',
      description: 'Maintain a 7-day workout streak',
      earned: true,
      earnedDate: '2024-01-20',
      rarity: 'rare' as const
    },
    {
      name: 'Century Club',
      description: 'Complete 100 workouts',
      earned: false,
      rarity: 'epic' as const
    },
    {
      name: 'Fitness Legend',
      description: 'Reach level 20',
      earned: false,
      rarity: 'legendary' as const
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-full px-4 py-2 mb-6">
          <Trophy className="h-4 w-4 text-purple-400" />
          <span className="text-purple-400 text-sm font-medium">Gamification Hub</span>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
          Level Up Your
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-red-400">
            Fitness Journey
          </span>
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Earn points, unlock achievements, and compete with the community
        </p>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-slate-800/50">
          <TabsTrigger value="points" className="text-white flex items-center gap-2">
            <Star className="h-4 w-4" />
            Points & Levels
          </TabsTrigger>
          <TabsTrigger value="achievements" className="text-white flex items-center gap-2">
            <Trophy className="h-4 w-4" />
            Achievements
          </TabsTrigger>
          <TabsTrigger value="challenges" className="text-white flex items-center gap-2">
            <Target className="h-4 w-4" />
            Challenges
          </TabsTrigger>
          <TabsTrigger value="social" className="text-white flex items-center gap-2">
            <Users className="h-4 w-4" />
            Social
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="points" className="mt-8">
          <PointsSystem />
        </TabsContent>
        
        <TabsContent value="achievements" className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <AchievementBadge
                key={index}
                name={achievement.name}
                description={achievement.description}
                earned={achievement.earned}
                earnedDate={achievement.earnedDate}
                rarity={achievement.rarity}
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="challenges" className="mt-8">
          <ChallengeHub />
        </TabsContent>
        
        <TabsContent value="social" className="mt-8">
          <WorkoutShare workoutData={mockWorkout} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GameDashboard;
