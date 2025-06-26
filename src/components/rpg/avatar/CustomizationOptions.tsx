
import { User, Palette, Ruler, Shirt } from 'lucide-react';
import { Slider } from '@/components/ui/slider';

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

interface CustomizationOptionsProps {
  config: AvatarConfig;
  onConfigChange: (newConfig: AvatarConfig) => void;
}

const SKIN_TONES = [
  { id: 'light', name: 'Light', color: 'bg-orange-100' },
  { id: 'medium', name: 'Medium', color: 'bg-orange-200' },
  { id: 'tan', name: 'Tan', color: 'bg-orange-300' },
  { id: 'olive', name: 'Olive', color: 'bg-yellow-600' },
  { id: 'brown', name: 'Brown', color: 'bg-amber-700' },
  { id: 'dark', name: 'Dark', color: 'bg-amber-900' }
];

const HAIRSTYLES = [
  { id: 'short-black', name: 'Short Black' },
  { id: 'short-brown', name: 'Short Brown' },
  { id: 'short-blonde', name: 'Short Blonde' },
  { id: 'long-black', name: 'Long Black' },
  { id: 'long-brown', name: 'Long Brown' },
  { id: 'long-blonde', name: 'Long Blonde' },
  { id: 'curly-black', name: 'Curly Black' },
  { id: 'curly-brown', name: 'Curly Brown' },
  { id: 'red-wavy', name: 'Red Wavy' },
  { id: 'bald', name: 'Bald' }
];

const BODY_TYPES = [
  { id: 'slim', name: 'Slim' },
  { id: 'average', name: 'Average' },
  { id: 'athletic', name: 'Athletic' },
  { id: 'muscular', name: 'Muscular' }
];

const CLOTHING_OPTIONS = [
  { id: 'casual', name: 'Casual' },
  { id: 'athletic', name: 'Athletic Wear' },
  { id: 'formal', name: 'Formal' },
  { id: 'workout', name: 'Workout Gear' }
];

const ACCESSORIES = [
  { id: 'glasses', name: 'Glasses' },
  { id: 'hat', name: 'Hat' },
  { id: 'watch', name: 'Watch' },
  { id: 'necklace', name: 'Necklace' }
];

const BACKGROUNDS = [
  { id: 'gradient-blue', name: 'Ocean Depths', class: 'bg-gradient-to-br from-blue-600 to-blue-900' },
  { id: 'gradient-purple', name: 'Mystic Purple', class: 'bg-gradient-to-br from-purple-600 to-purple-900' },
  { id: 'gradient-green', name: 'Forest Guardian', class: 'bg-gradient-to-br from-green-600 to-green-900' },
  { id: 'gradient-red', name: 'Fire Warrior', class: 'bg-gradient-to-br from-red-600 to-red-900' },
  { id: 'gradient-gold', name: 'Golden Champion', class: 'bg-gradient-to-br from-yellow-500 to-orange-600' },
  { id: 'gradient-dark', name: 'Shadow Master', class: 'bg-gradient-to-br from-gray-700 to-gray-900' },
  { id: 'gradient-pink', name: 'Rose Warrior', class: 'bg-gradient-to-br from-pink-500 to-rose-600' },
  { id: 'gradient-cyan', name: 'Cyan Storm', class: 'bg-gradient-to-br from-cyan-500 to-blue-600' }
];

const CustomizationOptions = ({ config, onConfigChange }: CustomizationOptionsProps) => {
  const updateConfig = (key: keyof AvatarConfig, value: any) => {
    onConfigChange({ ...config, [key]: value });
  };

  const toggleAccessory = (accessoryId: string) => {
    const accessories = config.accessories.includes(accessoryId)
      ? config.accessories.filter(id => id !== accessoryId)
      : [...config.accessories, accessoryId];
    updateConfig('accessories', accessories);
  };

  return (
    <div className="space-y-8">
      {/* Gender Selection */}
      <div>
        <h3 className="text-white font-medium mb-3 flex items-center">
          <User className="h-4 w-4 mr-2" />
          Gender
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {['male', 'female'].map((gender) => (
            <button
              key={gender}
              onClick={() => updateConfig('gender', gender)}
              className={`p-3 rounded-lg border-2 transition-all capitalize ${
                config.gender === gender
                  ? 'border-blue-400 bg-blue-500/20'
                  : 'border-slate-600 hover:border-slate-500'
              }`}
            >
              <span className="text-white">{gender}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Skin Tone */}
      <div>
        <h3 className="text-white font-medium mb-3">Skin Tone</h3>
        <div className="grid grid-cols-3 gap-3">
          {SKIN_TONES.map((tone) => (
            <button
              key={tone.id}
              onClick={() => updateConfig('skinTone', tone.id)}
              className={`p-3 rounded-lg border-2 transition-all ${
                config.skinTone === tone.id
                  ? 'border-blue-400 bg-blue-500/20'
                  : 'border-slate-600 hover:border-slate-500'
              }`}
            >
              <div className={`w-8 h-8 mx-auto rounded-full ${tone.color} mb-2`} />
              <p className="text-xs text-gray-300">{tone.name}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Hairstyle */}
      <div>
        <h3 className="text-white font-medium mb-3">Hairstyle</h3>
        <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto">
          {HAIRSTYLES.map((style) => (
            <button
              key={style.id}
              onClick={() => updateConfig('hairstyle', style.id)}
              className={`p-2 rounded-lg border transition-all text-sm ${
                config.hairstyle === style.id
                  ? 'border-blue-400 bg-blue-500/20 text-white'
                  : 'border-slate-600 hover:border-slate-500 text-gray-300'
              }`}
            >
              {style.name}
            </button>
          ))}
        </div>
      </div>

      {/* Body Type */}
      <div>
        <h3 className="text-white font-medium mb-3">Body Type</h3>
        <div className="grid grid-cols-2 gap-3">
          {BODY_TYPES.map((type) => (
            <button
              key={type.id}
              onClick={() => updateConfig('bodyType', type.id)}
              className={`p-3 rounded-lg border-2 transition-all ${
                config.bodyType === type.id
                  ? 'border-blue-400 bg-blue-500/20'
                  : 'border-slate-600 hover:border-slate-500'
              }`}
            >
              <span className="text-white">{type.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Height */}
      <div>
        <h3 className="text-white font-medium mb-3 flex items-center">
          <Ruler className="h-4 w-4 mr-2" />
          Height: {config.height}cm
        </h3>
        <Slider
          value={[config.height]}
          onValueChange={(value) => updateConfig('height', value[0])}
          min={150}
          max={200}
          step={1}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>150cm</span>
          <span>200cm</span>
        </div>
      </div>

      {/* Clothing */}
      <div>
        <h3 className="text-white font-medium mb-3 flex items-center">
          <Shirt className="h-4 w-4 mr-2" />
          Clothing Style
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {CLOTHING_OPTIONS.map((clothing) => (
            <button
              key={clothing.id}
              onClick={() => updateConfig('clothing', clothing.id)}
              className={`p-3 rounded-lg border-2 transition-all ${
                config.clothing === clothing.id
                  ? 'border-blue-400 bg-blue-500/20'
                  : 'border-slate-600 hover:border-slate-500'
              }`}
            >
              <span className="text-white text-sm">{clothing.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Accessories */}
      <div>
        <h3 className="text-white font-medium mb-3">Accessories</h3>
        <div className="grid grid-cols-2 gap-2">
          {ACCESSORIES.map((accessory) => (
            <button
              key={accessory.id}
              onClick={() => toggleAccessory(accessory.id)}
              className={`p-2 rounded-lg border transition-all text-sm ${
                config.accessories.includes(accessory.id)
                  ? 'border-blue-400 bg-blue-500/20 text-white'
                  : 'border-slate-600 hover:border-slate-500 text-gray-300'
              }`}
            >
              {accessory.name}
            </button>
          ))}
        </div>
      </div>

      {/* Background */}
      <div>
        <h3 className="text-white font-medium mb-3 flex items-center">
          <Palette className="h-4 w-4 mr-2" />
          Background Theme
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {BACKGROUNDS.map((background) => (
            <button
              key={background.id}
              onClick={() => updateConfig('background', background.id)}
              className={`p-3 rounded-lg border-2 transition-all ${
                config.background === background.id
                  ? 'border-blue-400 bg-blue-500/20'
                  : 'border-slate-600 hover:border-slate-500'
              }`}
            >
              <div className={`w-10 h-10 mx-auto rounded-full ${background.class} mb-2`} />
              <p className="text-xs text-gray-300">{background.name}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomizationOptions;
