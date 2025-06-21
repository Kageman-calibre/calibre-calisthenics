
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Share2, Heart, MessageCircle, Trophy, Clock, Target } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface WorkoutShareProps {
  workoutData?: {
    name: string;
    exercises: string[];
    duration: number;
    calories: number;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
  };
}

const WorkoutShare = ({ workoutData }: WorkoutShareProps) => {
  const [caption, setCaption] = useState('');
  const [isSharing, setIsSharing] = useState(false);
  const { toast } = useToast();

  const handleShare = async () => {
    setIsSharing(true);
    
    // Simulate API call to share workout
    setTimeout(() => {
      toast({
        title: "Workout Shared! 🎉",
        description: "Your workout has been shared with the community",
      });
      setIsSharing(false);
      setCaption('');
    }, 1000);
  };

  if (!workoutData) {
    return (
      <Card className="bg-slate-800/50 border-slate-700">
        <CardContent className="p-6 text-center">
          <Share2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">No Workout to Share</h3>
          <p className="text-gray-400">Complete a workout to share it with the community!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Workout Preview */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Share2 className="h-6 w-6 mr-2 text-blue-400" />
            Share Your Workout
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-slate-700/50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-white">{workoutData.name}</h3>
              <Badge className={
                workoutData.difficulty === 'beginner' ? 'bg-green-500/20 text-green-400' :
                workoutData.difficulty === 'intermediate' ? 'bg-orange-500/20 text-orange-400' :
                'bg-red-500/20 text-red-400'
              }>
                {workoutData.difficulty}
              </Badge>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-3">
              {workoutData.exercises.map((exercise, index) => (
                <Badge key={index} variant="secondary" className="bg-slate-600/50">
                  {exercise}
                </Badge>
              ))}
            </div>
            
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                {workoutData.duration} min
              </span>
              <span className="flex items-center">
                <Target className="h-4 w-4 mr-1" />
                {workoutData.calories} cal
              </span>
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Add a caption (optional)</label>
            <Textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Share your thoughts about this workout..."
              className="bg-slate-700/50 border-slate-600 text-white"
              rows={3}
            />
          </div>
          
          <Button 
            onClick={handleShare}
            disabled={isSharing}
            className="w-full bg-blue-500 hover:bg-blue-600"
          >
            {isSharing ? 'Sharing...' : 'Share Workout'}
          </Button>
        </CardContent>
      </Card>

      {/* Recent Community Shares */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Community Activity</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { user: 'FitnessFan23', workout: 'HIIT Blast', likes: 15, comments: 3 },
            { user: 'StrengthSeeker', workout: 'Upper Body Power', likes: 12, comments: 5 },
            { user: 'CardioQueen', workout: 'Morning Run', likes: 8, comments: 2 }
          ].map((share, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
              <div>
                <p className="text-white font-medium">{share.user}</p>
                <p className="text-sm text-gray-400">shared "{share.workout}"</p>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-400">
                <span className="flex items-center">
                  <Heart className="h-4 w-4 mr-1" />
                  {share.likes}
                </span>
                <span className="flex items-center">
                  <MessageCircle className="h-4 w-4 mr-1" />
                  {share.comments}
                </span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default WorkoutShare;
