
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { User, Trophy, Star, Save, RotateCcw } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/auth/AuthProvider';
import { useToast } from '@/hooks/use-toast';
import AvatarPreview from './avatar/AvatarPreview';
import CustomizationOptions from './avatar/CustomizationOptions';

interface AvatarConfig {
  gender: 'male' | 'female';
  skinTone: string;
  hairstyle: string;
  bodyType: string;
  height: number;
  clothing: string;
  accessories: string[];
  background: string;
}

interface EnhancedAvatarCustomizerProps {
  onAvatarUpdate?: () => void;
}

const DEFAULT_CONFIG: AvatarConfig = {
  gender: 'male',
  skinTone: 'medium',
  hairstyle: 'short-brown',
  bodyType: 'average',
  height: 175,
  clothing: 'casual',
  accessories: [],
  background: 'gradient-blue'
};

const EnhancedAvatarCustomizer = ({ onAvatarUpdate }: EnhancedAvatarCustomizerProps) => {
  const [avatarConfig, setAvatarConfig] = useState<AvatarConfig>(DEFAULT_CONFIG);
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
      // Try to parse existing avatar data or use defaults
      const savedConfig = {
        ...DEFAULT_CONFIG,
        background: data.avatar_background || DEFAULT_CONFIG.background
      };
      
      setAvatarConfig(savedConfig);
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
    
    // Store the full avatar configuration as JSON
    const { error } = await supabase
      .from('profiles')
      .update({
        avatar_background: avatarConfig.background,
        avatar_badges: userBadges,
        // Store full config in a new column (we'll add this via migration if needed)
        // For now, we'll use the existing avatar_background field
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
      // Trigger a page refresh to update the navigation avatar
      window.location.reload();
    }
    setLoading(false);
  };

  const resetToDefault = () => {
    setAvatarConfig(DEFAULT_CONFIG);
    toast({
      title: "Avatar Reset",
      description: "Avatar has been reset to default settings"
    });
  };

  const generateRandomAvatar = () => {
    const randomConfig: AvatarConfig = {
      gender: Math.random() > 0.5 ? 'male' : 'female',
      skinTone: ['light', 'medium', 'tan', 'olive', 'brown', 'dark'][Math.floor(Math.random() * 6)],
      hairstyle: ['short-black', 'short-brown', 'short-blonde', 'long-black', 'long-brown', 'curly-black'][Math.floor(Math.random() * 6)],
      bodyType: ['slim', 'average', 'athletic', 'muscular'][Math.floor(Math.random() * 4)],
      height: Math.floor(Math.random() * 50) + 150, // 150-200cm
      clothing: ['casual', 'athletic', 'formal', 'workout'][Math.floor(Math.random() * 4)],
      accessories: Math.random() > 0.5 ? ['glasses'] : [],
      background: ['gradient-blue', 'gradient-purple', 'gradient-green', 'gradient-red', 'gradient-gold', 'gradient-dark'][Math.floor(Math.random() * 6)]
    };
    
    setAvatarConfig(randomConfig);
    toast({
      title: "Random Avatar Generated! 🎲",
      description: "Your avatar has been randomized"
    });
  };

  return (
    <div className="space-y-6">
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <User className="h-6 w-6 mr-2 text-blue-400" />
            Enhanced Avatar Customization
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Avatar Preview */}
            <div className="space-y-4">
              <AvatarPreview config={avatarConfig} />
              
              {/* Action Buttons */}
              <div className="flex gap-2 justify-center">
                <Button 
                  onClick={generateRandomAvatar}
                  variant="outline"
                  size="sm"
                  className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
                >
                  🎲 Random
                </Button>
                <Button 
                  onClick={resetToDefault}
                  variant="outline"
                  size="sm"
                  className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
                >
                  <RotateCcw className="h-4 w-4 mr-1" />
                  Reset
                </Button>
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
            </div>

            {/* Customization Options */}
            <div className="max-h-96 overflow-y-auto pr-2">
              <CustomizationOptions 
                config={avatarConfig}
                onConfigChange={setAvatarConfig}
              />
            </div>
          </div>

          {/* Save Button */}
          <Button 
            onClick={saveAvatar}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            <Save className="h-4 w-4 mr-2" />
            {loading ? 'Saving Avatar...' : 'Save Avatar'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedAvatarCustomizer;
