
import CameraInterface from './mobile/CameraInterface';
import PhotoPreview from './mobile/PhotoPreview';
import MobileCapabilityCard from './mobile/MobileCapabilityCard';
import AudioControls from './mobile/AudioControls';
import { useMobileCapabilities } from './mobile/useMobileCapabilities';

const MobileFeatures = () => {
  const {
    cameraActive,
    photoTaken,
    notificationsEnabled,
    hapticEnabled,
    voiceCommands,
    capabilities,
    handlePhotoTaken,
    stopCamera,
    triggerHaptic,
    setPhotoTaken
  } = useMobileCapabilities();

  const getCapabilityActiveState = (capabilityId: string) => {
    switch (capabilityId) {
      case 'haptic':
        return hapticEnabled;
      case 'voice':
        return voiceCommands;
      case 'camera':
        return cameraActive;
      case 'notifications':
        return notificationsEnabled;
      default:
        return false;
    }
  };

  return (
    <div className="space-y-8 sm:space-y-12 px-4 sm:px-6 lg:px-0">
      <div className="text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">Mobile Features</h2>
        <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Enhanced mobile experience with native capabilities
        </p>
      </div>

      <CameraInterface
        cameraActive={cameraActive}
        onPhotoTaken={handlePhotoTaken}
        onCancel={stopCamera}
        hapticEnabled={hapticEnabled}
      />

      <PhotoPreview
        photoTaken={photoTaken}
        onTakeAnother={() => setPhotoTaken(null)}
      />

      <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {capabilities.map(capability => (
          <MobileCapabilityCard
            key={capability.id}
            capability={capability}
            isActive={getCapabilityActiveState(capability.id)}
            onTriggerHaptic={triggerHaptic}
          />
        ))}
      </div>

      <AudioControls onTriggerHaptic={triggerHaptic} />
    </div>
  );
};

export default MobileFeatures;
