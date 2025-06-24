
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
      className={`bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 sm:p-8 border transition-all duration-300 ${
        capability.available 
          ? 'border-slate-700/50 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10' 
          : 'border-red-500/30 opacity-60'
      }`}
    >
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center flex-1">
          <Icon className={`h-8 w-8 sm:h-10 sm:w-10 mr-4 flex-shrink-0 ${
            capability.available ? 'text-blue-400' : 'text-gray-500'
          }`} />
          <div className="min-w-0 flex-1">
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">{capability.name}</h3>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed">{capability.description}</p>
          </div>
        </div>
        {!capability.available && (
          <span className="text-xs sm:text-sm text-red-400 bg-red-500/20 px-3 py-1 rounded-full whitespace-nowrap ml-3 flex-shrink-0">
            Not Available
          </span>
        )}
      </div>

      {capability.available && (
        <button
          onClick={capability.action}
          className={`w-full py-3 sm:py-4 px-4 sm:px-6 rounded-lg font-medium transition-all duration-200 text-base sm:text-lg ${
            isActive
              ? 'bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-green-500/25'
              : 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg hover:shadow-blue-500/25'
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
