
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/auth/AuthProvider';

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

const DEFAULT_AVATAR: AvatarConfig = {
  gender: 'male',
  skinTone: 'medium',
  hairstyle: 'short-brown',
  bodyType: 'average',
  height: 175,
  clothing: 'casual',
  accessories: [],
  background: 'gradient-blue'
};

export const useUserAvatar = () => {
  const [avatarConfig, setAvatarConfig] = useState<AvatarConfig>(DEFAULT_AVATAR);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchUserAvatar();
    } else {
      setLoading(false);
    }
  }, [user]);

  const fetchUserAvatar = async () => {
    if (!user) return;

    setLoading(true);
    
    const { data } = await supabase
      .from('profiles')
      .select('avatar_background')
      .eq('id', user.id)
      .single();

    if (data) {
      // For now, we only store background in the database
      // In a full implementation, you'd store the complete avatar config
      setAvatarConfig({
        ...DEFAULT_AVATAR,
        background: data.avatar_background || DEFAULT_AVATAR.background
      });
    }
    
    setLoading(false);
  };

  return { avatarConfig, loading, refetch: fetchUserAvatar };
};
