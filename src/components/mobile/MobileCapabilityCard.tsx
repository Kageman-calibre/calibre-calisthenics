
import { LucideIcon } from 'lucide-react';
import HapticControls from './HapticControls';

interface MobileCapability {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  available: boolean;
  action: () => void;
}

interface MobileCapabilityCardProps {
  capability: MobileCapability;
  isActive: boolean;
  onTriggerHaptic: (pattern: number | number[]) => void;
}

const MobileCapabilityCard = ({ capability, isActive, onTriggerHaptic }: MobileCapabilityCardProps) => {
  const Icon = capability.icon;

  const getButtonText = () => {
    switch (capability.id) {
      case 'haptic':
        return (isActive ? 'Disable' : 'Enable') + ' Haptics';
      case 'voice':
        return (isActive ? 'Stop' : 'Start') + ' Voice Commands';
      case 'camera':
        return (isActive ? 'Stop' : 'Start') + ' Camera';
      case 'notifications':
        return isActive ? 'Enabled' : 'Enable';
      default:
        return 'Activate';
    }
  };

  return (
    <div
      className={`bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 sm:p-6 border transition-all duration-300 ${
        capability.available 
          ? 'border-slate-700/50 hover:border-blue-500/50' 
          : 'border-red-500/30 opacity-60'
      }`}
    >
      <div className="flex items-start justify-between mb-3 sm:mb-4">
        <div className="flex items-center">
          <Icon className={`h-6 w-6 sm:h-8 sm:w-8 mr-2 sm:mr-3 ${
            capability.available ? 'text-blue-400' : 'text-gray-500'
          }`} />
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-white">{capability.name}</h3>
            <p className="text-gray-400 text-xs sm:text-sm">{capability.description}</p>
          </div>
        </div>
        {!capability.available && (
          <span className="text-xs text-red-400 bg-red-500/20 px-2 py-1 rounded whitespace-nowrap">
            Not Available
          </span>
        )}
      </div>

      {capability.available && (
        <button
          onClick={capability.action}
          className={`w-full py-2 sm:py-3 px-3 sm:px-4 rounded-lg font-medium transition-colors text-sm sm:text-base ${
            isActive
              ? 'bg-green-500 hover:bg-green-600 text-white'
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
        >
          {getButtonText()}
        </button>
      )}

      {capability.id === 'haptic' && capability.available && (
        <HapticControls onTriggerHaptic={onTriggerHaptic} />
      )}
    </div>
  );
};

export default MobileCapabilityCard;
