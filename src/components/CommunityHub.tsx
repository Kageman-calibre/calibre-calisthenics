
import { useState, useEffect } from 'react';
import { Users, Trophy, Share2, MessageCircle, Heart, Calendar, Target, Award } from 'lucide-react';

interface WorkoutShare {
  id: string;
  userId: string;
  username: string;
  workoutName: string;
  exercises: string[];
  duration: number;
  calories: number;
  date: string;
  likes: number;
  comments: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

interface Challenge {
  id: string;
  name: string;
  description: string;
  type: 'weekly' | 'monthly';
  target: number;
  unit: 'workouts' | 'minutes' | 'calories';
  startDate: string;
  endDate: string;
  participants: number;
  userProgress: number;
  reward: string;
}

interface LeaderboardEntry {
  id: string;
  username: string;
  score: number;
  rank: number;
  streak: number;
  workoutsCompleted: number;
}

const CommunityHub = () => {
  const [activeTab, setActiveTab] = useState<'feed' | 'challenges' | 'leaderboard'>('feed');
  const [workoutShares, setWorkoutShares] = useState<WorkoutShare[]>([]);
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

  // Load mock data
  useEffect(() => {
    // Mock workout shares
    setWorkoutShares([
      {
        id: '1',
        userId: 'user1',
        username: 'FitnessFan23',
        workoutName: 'Morning Push Workout',
        exercises: ['Push-ups', 'Pike Push-ups', 'Diamond Push-ups'],
        duration: 25,
        calories: 180,
        date: new Date().toISOString(),
        likes: 12,
        comments: 3,
        difficulty: 'intermediate'
      },
      {
        id: '2',
        userId: 'user2',
        username: 'StrengthSeeker',
        workoutName: 'Full Body Blast',
        exercises: ['Pull-ups', 'Squats', 'Plank', 'Burpees'],
        duration: 40,
        calories: 320,
        date: new Date(Date.now() - 86400000).toISOString(),
        likes: 8,
        comments: 5,
        difficulty: 'advanced'
      }
    ]);

    // Mock challenges
    setChallenges([
      {
        id: '1',
        name: '30-Day Consistency Challenge',
        description: 'Complete at least one workout every day for 30 days',
        type: 'monthly',
        target: 30,
        unit: 'workouts',
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + 30 * 86400000).toISOString(),
        participants: 156,
        userProgress: 5,
        reward: 'Consistency Master Badge'
      },
      {
        id: '2',
        name: 'Weekly Calorie Burn',
        description: 'Burn 2000 calories this week through workouts',
        type: 'weekly',
        target: 2000,
        unit: 'calories',
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + 7 * 86400000).toISOString(),
        participants: 89,
        userProgress: 450,
        reward: 'Calorie Crusher Badge'
      }
    ]);

    // Mock leaderboard
    setLeaderboard([
      { id: '1', username: 'WorkoutWarrior', score: 2850, rank: 1, streak: 15, workoutsCompleted: 47 },
      { id: '2', username: 'FitnessPhoenix', score: 2720, rank: 2, streak: 12, workoutsCompleted: 43 },
      { id: '3', username: 'StrengthStar', score: 2580, rank: 3, streak: 8, workoutsCompleted: 39 },
      { id: '4', username: 'You', score: 1950, rank: 8, streak: 5, workoutsCompleted: 28 }
    ]);
  }, []);

  const shareWorkout = (workoutData: Omit<WorkoutShare, 'id' | 'userId' | 'username' | 'likes' | 'comments'>) => {
    const newShare: WorkoutShare = {
      ...workoutData,
      id: Date.now().toString(),
      userId: 'current-user',
      username: 'You',
      likes: 0,
      comments: 0
    };
    setWorkoutShares(prev => [newShare, ...prev]);
  };

  const joinChallenge = (challengeId: string) => {
    setChallenges(prev => prev.map(challenge => 
      challenge.id === challengeId 
        ? { ...challenge, participants: challenge.participants + 1 }
        : challenge
    ));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    return `${diffDays} days ago`;
  };

  const tabs = [
    { key: 'feed', name: 'Community Feed', icon: Users },
    { key: 'challenges', name: 'Challenges', icon: Trophy },
    { key: 'leaderboard', name: 'Leaderboard', icon: Award }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-4xl font-bold text-white mb-4">Community Hub</h2>
        <p className="text-xl text-gray-300">Connect, compete, and celebrate together</p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center">
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-2 border border-slate-700/50">
          {tabs.map(({ key, name, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key as any)}
              className={`flex items-center px-6 py-3 rounded-lg transition-all duration-300 ${
                activeTab === key
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Icon className="h-5 w-5 mr-2" />
              {name}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      {activeTab === 'feed' && (
        <div className="space-y-6">
          {workoutShares.map(share => (
            <div key={share.id} className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-white">{share.username}</h3>
                  <p className="text-gray-400 text-sm">{formatDate(share.date)}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  share.difficulty === 'beginner' ? 'bg-green-500/20 text-green-400' :
                  share.difficulty === 'intermediate' ? 'bg-orange-500/20 text-orange-400' :
                  'bg-red-500/20 text-red-400'
                }`}>
                  {share.difficulty}
                </span>
              </div>

              <div className="mb-4">
                <h4 className="text-white font-medium mb-2">{share.workoutName}</h4>
                <div className="flex flex-wrap gap-2 mb-3">
                  {share.exercises.map((exercise, index) => (
                    <span key={index} className="bg-slate-700 text-gray-300 px-2 py-1 rounded text-sm">
                      {exercise}
                    </span>
                  ))}
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-400">
                  <span className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {share.duration} min
                  </span>
                  <span className="flex items-center">
                    <Target className="h-4 w-4 mr-1" />
                    {share.calories} cal
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                <div className="flex items-center space-x-4">
                  <button className="flex items-center text-gray-400 hover:text-red-400 transition-colors">
                    <Heart className="h-5 w-5 mr-1" />
                    {share.likes}
                  </button>
                  <button className="flex items-center text-gray-400 hover:text-blue-400 transition-colors">
                    <MessageCircle className="h-5 w-5 mr-1" />
                    {share.comments}
                  </button>
                </div>
                <button className="flex items-center text-gray-400 hover:text-green-400 transition-colors">
                  <Share2 className="h-5 w-5 mr-1" />
                  Share
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'challenges' && (
        <div className="space-y-6">
          {challenges.map(challenge => {
            const progressPercentage = (challenge.userProgress / challenge.target) * 100;
            const timeLeft = Math.ceil((new Date(challenge.endDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24));

            return (
              <div key={challenge.id} className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">{challenge.name}</h3>
                    <p className="text-gray-400 mb-3">{challenge.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <span>{challenge.participants} participants</span>
                      <span>{timeLeft} days left</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-400">
                      {challenge.userProgress}/{challenge.target}
                    </div>
                    <div className="text-sm text-gray-400">{challenge.unit}</div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-400 mb-2">
                    <span>Progress</span>
                    <span>{Math.round(progressPercentage)}%</span>
                  </div>
                  <div className="bg-slate-700 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center text-yellow-400">
                    <Trophy className="h-5 w-5 mr-2" />
                    <span className="text-sm">{challenge.reward}</span>
                  </div>
                  <button
                    onClick={() => joinChallenge(challenge.id)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                  >
                    Join Challenge
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {activeTab === 'leaderboard' && (
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
          <h3 className="text-xl font-semibold text-white mb-6">Monthly Leaderboard</h3>
          <div className="space-y-4">
            {leaderboard.map((entry, index) => (
              <div
                key={entry.id}
                className={`flex items-center justify-between p-4 rounded-lg transition-all duration-300 ${
                  entry.username === 'You' 
                    ? 'bg-blue-500/20 border border-blue-500/50' 
                    : 'bg-slate-700/30'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                    entry.rank === 1 ? 'bg-yellow-500 text-black' :
                    entry.rank === 2 ? 'bg-gray-400 text-black' :
                    entry.rank === 3 ? 'bg-amber-600 text-black' :
                    'bg-slate-600 text-white'
                  }`}>
                    {entry.rank}
                  </div>
                  <div>
                    <div className="text-white font-medium">{entry.username}</div>
                    <div className="text-gray-400 text-sm">
                      {entry.workoutsCompleted} workouts • {entry.streak} day streak
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-white">{entry.score}</div>
                  <div className="text-sm text-gray-400">points</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunityHub;
