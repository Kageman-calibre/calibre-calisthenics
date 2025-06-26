
import { useState, useEffect } from 'react';
import { Users, Heart, MessageCircle, Share2, Trophy, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface WorkoutPost {
  id: string;
  user: {
    name: string;
    avatar: string;
    level: string;
  };
  workout: string;
  duration: number;
  calories: number;
  likes: number;
  comments: number;
  timestamp: string;
  achievements?: string[];
}

const SocialHub = () => {
  const [posts, setPosts] = useState<WorkoutPost[]>([
    {
      id: '1',
      user: { name: 'Sarah Johnson', avatar: '/api/placeholder/40/40', level: 'Advanced' },
      workout: 'HIIT Circuit Training',
      duration: 45,
      calories: 380,
      likes: 24,
      comments: 8,
      timestamp: '2 hours ago',
      achievements: ['First 45min workout', 'Calorie Crusher']
    },
    {
      id: '2',
      user: { name: 'Mike Chen', avatar: '/api/placeholder/40/40', level: 'Intermediate' },
      workout: 'Upper Body Strength',
      duration: 35,
      calories: 220,
      likes: 18,
      comments: 5,
      timestamp: '4 hours ago'
    },
    {
      id: '3',
      user: { name: 'Emma Davis', avatar: '/api/placeholder/40/40', level: 'Beginner' },
      workout: 'Morning Yoga Flow',
      duration: 30,
      calories: 120,
      likes: 12,
      comments: 3,
      timestamp: '6 hours ago',
      achievements: ['Early Bird']
    }
  ]);

  const [following, setFollowing] = useState<string[]>([]);

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, likes: post.likes + 1 }
        : post
    ));
  };

  const handleFollow = (userName: string) => {
    setFollowing(prev => 
      prev.includes(userName) 
        ? prev.filter(name => name !== userName)
        : [...prev, userName]
    );
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Fitness Community</h2>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Connect with fellow fitness enthusiasts, share your achievements, and get motivated by others' progress
        </p>
      </div>

      {/* Community Stats - Updated with honest numbers */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-slate-800/60 to-slate-700/40 border-slate-600/30">
          <CardContent className="p-6 text-center">
            <Users className="h-8 w-8 text-blue-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">Growing</div>
            <div className="text-sm text-gray-400">Community</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-slate-800/60 to-slate-700/40 border-slate-600/30">
          <CardContent className="p-6 text-center">
            <Trophy className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">Daily</div>
            <div className="text-sm text-gray-400">Workouts</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-slate-800/60 to-slate-700/40 border-slate-600/30">
          <CardContent className="p-6 text-center">
            <Heart className="h-8 w-8 text-red-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">Support</div>
            <div className="text-sm text-gray-400">& Motivation</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-slate-800/60 to-slate-700/40 border-slate-600/30">
          <CardContent className="p-6 text-center">
            <Star className="h-8 w-8 text-purple-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">Quality</div>
            <div className="text-sm text-gray-400">Programs</div>
          </CardContent>
        </Card>
      </div>

      {/* Activity Feed */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-white">Recent Activity</h3>
        {posts.map((post) => (
          <Card key={post.id} className="bg-gradient-to-br from-slate-800/60 to-slate-700/40 border-slate-600/30">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <Avatar>
                  <AvatarImage src={post.user.avatar} />
                  <AvatarFallback>{post.user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-white">{post.user.name}</h4>
                      <p className="text-sm text-gray-400">{post.timestamp}</p>
                    </div>
                    <Button
                      variant={following.includes(post.user.name) ? "secondary" : "outline"}
                      size="sm"
                      onClick={() => handleFollow(post.user.name)}
                    >
                      {following.includes(post.user.name) ? 'Following' : 'Follow'}
                    </Button>
                  </div>
                  
                  <div className="mb-3">
                    <p className="text-white mb-2">
                      Completed <span className="font-semibold text-orange-400">{post.workout}</span>
                    </p>
                    <div className="flex space-x-4 text-sm text-gray-400">
                      <span>{post.duration} minutes</span>
                      <span>{post.calories} calories burned</span>
                    </div>
                  </div>

                  {post.achievements && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.achievements.map((achievement, index) => (
                        <Badge key={index} variant="secondary" className="bg-yellow-500/20 text-yellow-400">
                          <Trophy className="h-3 w-3 mr-1" />
                          {achievement}
                        </Badge>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center space-x-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleLike(post.id)}
                      className="text-gray-400 hover:text-red-400"
                    >
                      <Heart className="h-4 w-4 mr-1" />
                      {post.likes}
                    </Button>
                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-blue-400">
                      <MessageCircle className="h-4 w-4 mr-1" />
                      {post.comments}
                    </Button>
                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-green-400">
                      <Share2 className="h-4 w-4 mr-1" />
                      Share
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SocialHub;
