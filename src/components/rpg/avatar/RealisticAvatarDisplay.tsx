
import React from 'react';

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

interface RealisticAvatarDisplayProps {
  config: AvatarConfig;
  size?: 'small' | 'medium' | 'large';
  showBackground?: boolean;
}

const RealisticAvatarDisplay = ({ config, size = 'medium', showBackground = true }: RealisticAvatarDisplayProps) => {
  const getSkinToneColor = (tone: string) => {
    const tones = {
      'light': '#FDBCB4',
      'medium': '#E0AC69',
      'tan': '#C68642',
      'olive': '#A0785A',
      'brown': '#8D5524',
      'dark': '#5D4037'
    };
    return tones[tone as keyof typeof tones] || tones['medium'];
  };

  const getHairColor = (hairstyle: string) => {
    if (hairstyle.includes('blonde')) return '#F4D03F';
    if (hairstyle.includes('brown')) return '#8B4513';
    if (hairstyle.includes('black')) return '#2C2C2C';
    if (hairstyle.includes('red')) return '#CD853F';
    return '#8B4513';
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

  const sizeClasses = {
    small: { container: 'w-8 h-8', head: 'w-5 h-6', body: 'w-4 h-3' },
    medium: { container: 'w-12 h-12', head: 'w-7 h-8', body: 'w-6 h-4' },
    large: { container: 'w-24 h-24', head: 'w-14 h-16', body: 'w-12 h-8' }
  };

  const currentSize = sizeClasses[size];
  const skinColor = getSkinToneColor(config.skinTone);
  const hairColor = getHairColor(config.hairstyle);

  const getBodyWidth = () => {
    const baseWidth = size === 'small' ? 4 : size === 'medium' ? 6 : 12;
    const multiplier = {
      'slim': 0.8,
      'average': 1.0,
      'athletic': 1.1,
      'muscular': 1.3
    }[config.bodyType] || 1.0;
    
    return Math.round(baseWidth * multiplier);
  };

  return (
    <div 
      className={`${currentSize.container} rounded-full flex items-center justify-center relative overflow-hidden ${
        showBackground ? getBackgroundClass(config.background) : 'bg-gray-200'
      } border-2 border-white/20`}
    >
      {/* Human Figure */}
      <div className="relative flex flex-col items-center justify-center">
        {/* Hair (behind head) */}
        {!config.hairstyle.includes('bald') && (
          <div 
            className={`absolute top-0 rounded-full ${
              config.hairstyle.includes('long') ? 'w-8 h-10' : 'w-6 h-8'
            } ${size === 'small' ? 'w-4 h-5' : size === 'large' ? 'w-12 h-16' : ''}`}
            style={{ backgroundColor: hairColor, zIndex: 1 }}
          />
        )}
        
        {/* Head */}
        <div 
          className={`${currentSize.head} rounded-full relative z-10`}
          style={{ backgroundColor: skinColor }}
        >
          {/* Eyes */}
          <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 flex space-x-1">
            <div className={`${size === 'small' ? 'w-0.5 h-0.5' : 'w-1 h-1'} bg-black rounded-full`} />
            <div className={`${size === 'small' ? 'w-0.5 h-0.5' : 'w-1 h-1'} bg-black rounded-full`} />
          </div>
          
          {/* Nose */}
          <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 ${size === 'small' ? 'w-0.5 h-1' : 'w-1 h-2'} bg-black/20 rounded`} />
          
          {/* Mouth */}
          <div className={`absolute bottom-1/4 left-1/2 transform -translate-x-1/2 ${size === 'small' ? 'w-1 h-0.5' : 'w-2 h-1'} bg-red-400 rounded-full`} />
        </div>

        {/* Body */}
        <div 
          className={`${currentSize.body} rounded-lg mt-1`}
          style={{ 
            backgroundColor: config.gender === 'female' ? '#FFB6C1' : '#87CEEB',
            width: `${getBodyWidth() * 0.25}rem`
          }}
        />

        {/* Accessories */}
        {config.accessories.includes('glasses') && (
          <div 
            className={`absolute ${size === 'small' ? 'top-2' : 'top-3'} left-1/2 transform -translate-x-1/2 ${
              size === 'small' ? 'w-3 h-1' : 'w-5 h-2'
            } border border-black rounded-full bg-transparent z-20`}
          />
        )}
        
        {config.accessories.includes('hat') && (
          <div 
            className={`absolute ${size === 'small' ? '-top-1' : '-top-2'} left-1/2 transform -translate-x-1/2 ${
              size === 'small' ? 'w-4 h-2' : 'w-6 h-3'
            } bg-gray-800 rounded-t-full z-20`}
          />
        )}
      </div>
    </div>
  );
};

export default RealisticAvatarDisplay;
