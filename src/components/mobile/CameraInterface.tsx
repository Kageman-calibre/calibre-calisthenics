
import { useRef, useCallback } from 'react';

interface CameraInterfaceProps {
  cameraActive: boolean;
  onPhotoTaken: (photoData: string) => void;
  onCancel: () => void;
  hapticEnabled: boolean;
}

const CameraInterface = ({ cameraActive, onPhotoTaken, onCancel, hapticEnabled }: CameraInterfaceProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const takePhoto = useCallback(() => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const context = canvas.getContext('2d');
      
      if (context) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0);
        
        const photoData = canvas.toDataURL('image/jpeg');
        onPhotoTaken(photoData);
        
        // Haptic feedback if available
        if (hapticEnabled && 'vibrate' in navigator) {
          navigator.vibrate(100);
        }
      }
    }
  }, [onPhotoTaken, hapticEnabled]);

  if (!cameraActive) return null;

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-white mb-4">Progress Photo</h3>
        <div className="relative inline-block">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="rounded-lg max-w-full h-64 object-cover"
          />
          <div className="mt-4 space-x-4">
            <button
              onClick={takePhoto}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium"
            >
              Take Photo
            </button>
            <button
              onClick={onCancel}
              className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
};

export default CameraInterface;
