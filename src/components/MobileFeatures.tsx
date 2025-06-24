
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
    <div className="space-y-6 sm:space-y-8 px-3 sm:px-0">
      <div className="text-center">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-4">Mobile Features</h2>
        <p className="text-lg sm:text-xl text-gray-300">Enhanced mobile experience with native capabilities</p>
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

      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2">
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
