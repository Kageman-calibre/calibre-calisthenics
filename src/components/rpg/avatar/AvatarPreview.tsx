
import RealisticAvatarDisplay from './RealisticAvatarDisplay';

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
  return (
    <div className="text-center">
      <div className="mx-auto mb-4 flex justify-center">
        <RealisticAvatarDisplay 
          config={config} 
          size="large" 
          showBackground={true}
        />
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
