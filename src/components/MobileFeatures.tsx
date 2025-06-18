
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
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-white mb-4">Mobile Features</h2>
        <p className="text-xl text-gray-300">Enhanced mobile experience with native capabilities</p>
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

      <div className="grid gap-6 md:grid-cols-2">
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
