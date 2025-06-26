
import { User } from 'lucide-react';

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

interface AvatarPreviewProps {
  config: AvatarConfig;
}

const AvatarPreview = ({ config }: AvatarPreviewProps) => {
  const getSkinToneClass = (tone: string) => {
    const tones = {
      'light': 'text-orange-100',
      'medium': 'text-orange-200',
      'tan': 'text-orange-300',
      'olive': 'text-yellow-600',
      'brown': 'text-amber-700',
      'dark': 'text-amber-900'
    };
    return tones[tone as keyof typeof tones] || 'text-orange-200';
  };

  const getBackgroundClass = (background: string) => {
    const backgrounds = {
      'gradient-blue': 'bg-gradient-to-br from-blue-600 to-blue-900',
      'gradient-purple': 'bg-gradient-to-br from-purple-600 to-purple-900',
      'gradient-green': 'bg-gradient-to-br from-green-600 to-green-900',
      'gradient-red': 'bg-gradient-to-br from-red-600 to-red-900',
      'gradient-gold': 'bg-gradient-to-br from-yellow-500 to-orange-600',
      'gradient-dark': 'bg-gradient-to-br from-gray-700 to-gray-900',
      'gradient-pink': 'bg-gradient-to-br from-pink-500 to-rose-600',
      'gradient-cyan': 'bg-gradient-to-br from-cyan-500 to-blue-600'
    };
    return backgrounds[background as keyof typeof backgrounds] || backgrounds['gradient-blue'];
  };

  const getAvatarSize = () => {
    const sizeMultiplier = config.height / 170; // Base height 170cm
    const size = Math.max(100, Math.min(160, 130 * sizeMultiplier));
    return { width: size, height: size };
  };

  const avatarSize = getAvatarSize();

  return (
    <div className="text-center">
      <div 
        className={`mx-auto rounded-full border-4 border-white/20 flex items-center justify-center relative overflow-hidden ${getBackgroundClass(config.background)}`}
        style={avatarSize}
      >
        {/* Avatar Body */}
        <div className={`flex flex-col items-center justify-center ${getSkinToneClass(config.skinTone)}`}>
          <User className={`${config.gender === 'female' ? 'h-16 w-16' : 'h-18 w-18'}`} />
          
          {/* Hairstyle indicator */}
          <div className={`absolute top-2 ${config.hairstyle === 'long' ? 'w-8 h-8' : 'w-6 h-6'} ${config.hairstyle === 'bald' ? 'hidden' : ''}`}>
            <div className={`w-full h-full rounded-full ${
              config.hairstyle.includes('blonde') ? 'bg-yellow-400' :
              config.hairstyle.includes('brown') ? 'bg-amber-800' :
              config.hairstyle.includes('black') ? 'bg-gray-900' :
              config.hairstyle.includes('red') ? 'bg-red-600' :
              'bg-gray-700'
            } opacity-60`} />
          </div>

          {/* Body type indicator */}
          <div className={`absolute bottom-4 ${
            config.bodyType === 'slim' ? 'w-6' :
            config.bodyType === 'athletic' ? 'w-8' :
            config.bodyType === 'muscular' ? 'w-10' :
            'w-7'
          } h-8 bg-current opacity-40 rounded`} />

          {/* Accessories */}
          {config.accessories.includes('glasses') && (
            <div className="absolute top-1/3 w-6 h-2 border-2 border-gray-800 rounded-full" />
          )}
          
          {config.accessories.includes('hat') && (
            <div className="absolute top-0 w-10 h-4 bg-gray-800 rounded-t-full" />
          )}
        </div>
      </div>
      
      <div className="mt-4 space-y-1">
        <p className="text-white font-medium">
          {config.gender === 'female' ? 'Female' : 'Male'} Avatar
        </p>
        <p className="text-gray-300 text-sm">
          {config.height}cm • {config.bodyType}
        </p>
        <p className="text-gray-400 text-xs">
          {config.hairstyle} • {config.skinTone} skin
        </p>
      </div>
    </div>
  );
};

export default AvatarPreview;
