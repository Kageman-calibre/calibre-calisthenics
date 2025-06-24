
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { User, Palette, Trophy, Star } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/auth/AuthProvider';
import { useToast } from '@/hooks/use-toast';

interface AvatarCustomizerProps {
  onAvatarUpdate?: () => void;
}

const AVATAR_BACKGROUNDS = [
  { id: 'gradient-blue', name: 'Ocean Depths', class: 'bg-gradient-to-br from-blue-600 to-blue-900' },
  { id: 'gradient-purple', name: 'Mystic Purple', class: 'bg-gradient-to-br from-purple-600 to-purple-900' },
  { id: 'gradient-green', name: 'Forest Guardian', class: 'bg-gradient-to-br from-green-600 to-green-900' },
  { id: 'gradient-red', name: 'Fire Warrior', class: 'bg-gradient-to-br from-red-600 to-red-900' },
  { id: 'gradient-gold', name: 'Golden Champion', class: 'bg-gradient-to-br from-yellow-500 to-orange-600' },
  { id: 'gradient-dark', name: 'Shadow Master', class: 'bg-gradient-to-br from-gray-700 to-gray-900' }
];

const AvatarCustomizer = ({ onAvatarUpdate }: AvatarCustomizerProps) => {
  const [selectedBackground, setSelectedBackground] = useState('gradient-blue');
  const [userBadges, setUserBadges] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      fetchUserProfile();
      fetchUserBadges();
    }
  }, [user]);

  const fetchUserProfile = async () => {
    if (!user) return;

    const { data } = await supabase
      .from('profiles')
      .select('avatar_background, avatar_badges')
      .eq('id', user.id)
      .single();

    if (data) {
      setSelectedBackground(data.avatar_background || 'gradient-blue');
      setUserBadges(data.avatar_badges || []);
    }
  };

  const fetchUserBadges = async () => {
    if (!user) return;

    const { data } = await supabase
      .from('user_badges')
      .select('badge_id, badge_name, rarity')
      .eq('user_id', user.id);

    if (data) {
      setUserBadges(data.map(badge => badge.badge_id));
    }
  };

  const saveAvatar = async () => {
    if (!user) return;

    setLoading(true);
    const { error } = await supabase
      .from('profiles')
      .update({
        avatar_background: selectedBackground,
        avatar_badges: userBadges
      })
      .eq('id', user.id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to save avatar changes",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Avatar Updated! ✨",
        description: "Your character has been customized successfully"
      });
      onAvatarUpdate?.();
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <User className="h-6 w-6 mr-2 text-blue-400" />
            Avatar Customization
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Avatar Preview */}
          <div className="text-center">
            <div className={`w-32 h-32 mx-auto rounded-full border-4 border-white/20 flex items-center justify-center ${AVATAR_BACKGROUNDS.find(bg => bg.id === selectedBackground)?.class}`}>
              <User className="h-16 w-16 text-white" />
            </div>
            <p className="text-gray-300 mt-2">
              {AVATAR_BACKGROUNDS.find(bg => bg.id === selectedBackground)?.name}
            </p>
          </div>

          {/* Background Selection */}
          <div>
            <h3 className="text-white font-medium mb-3 flex items-center">
              <Palette className="h-4 w-4 mr-2" />
              Background Theme
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {AVATAR_BACKGROUNDS.map((background) => (
                <button
                  key={background.id}
                  onClick={() => setSelectedBackground(background.id)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    selectedBackground === background.id
                      ? 'border-blue-400 bg-blue-500/20'
                      : 'border-slate-600 hover:border-slate-500'
                  }`}
                >
                  <div className={`w-12 h-12 mx-auto rounded-full ${background.class}`} />
                  <p className="text-xs text-gray-300 mt-2">{background.name}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Badge Display */}
          <div>
            <h3 className="text-white font-medium mb-3 flex items-center">
              <Trophy className="h-4 w-4 mr-2" />
              Earned Badges ({userBadges.length})
            </h3>
            {userBadges.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {userBadges.slice(0, 6).map((badgeId, index) => (
                  <Badge key={index} className="bg-yellow-500/20 text-yellow-400">
                    <Star className="h-3 w-3 mr-1" />
                    Badge {index + 1}
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 text-sm">Complete workouts to earn badges!</p>
            )}
          </div>

          <Button 
            onClick={saveAvatar}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            {loading ? 'Saving...' : 'Save Avatar'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AvatarCustomizer;
