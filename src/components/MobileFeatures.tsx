
import { useState, useRef, useCallback } from 'react';
import { Camera, Vibrate, Bell, Download, Share2, Mic, Volume2 } from 'lucide-react';

interface MobileCapability {
  id: string;
  name: string;
  description: string;
  icon: any;
  available: boolean;
  action: () => void;
}

const MobileFeatures = () => {
  const [cameraActive, setCameraActive] = useState(false);
  const [photoTaken, setPhotoTaken] = useState<string | null>(null);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [hapticEnabled, setHapticEnabled] = useState(true);
  const [voiceCommands, setVoiceCommands] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Camera functionality
  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user' },
        audio: false 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraActive(true);
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Camera access denied or not available');
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setCameraActive(false);
  }, []);

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
        setPhotoTaken(photoData);
        
        // Save photo to workout history
        const workoutPhotos = JSON.parse(localStorage.getItem('workoutPhotos') || '[]');
        workoutPhotos.push({
          id: Date.now().toString(),
          photo: photoData,
          date: new Date().toISOString(),
          type: 'progress'
        });
        localStorage.setItem('workoutPhotos', JSON.stringify(workoutPhotos));
        
        stopCamera();
        
        // Haptic feedback if available
        if (hapticEnabled && 'vibrate' in navigator) {
          navigator.vibrate(100);
        }
      }
    }
  }, [hapticEnabled]);

  // Push notifications
  const enableNotifications = useCallback(async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        setNotificationsEnabled(true);
        new Notification('Workout Reminder', {
          body: 'Time for your daily workout! Stay consistent!',
          icon: '/favicon.ico'
        });
      }
    } else {
      alert('Notifications not supported in this browser');
    }
  }, []);

  // Haptic feedback
  const triggerHaptic = useCallback((pattern: number | number[]) => {
    if ('vibrate' in navigator && hapticEnabled) {
      navigator.vibrate(pattern);
    }
  }, [hapticEnabled]);

  // Voice commands (mock implementation)
  const startVoiceCommands = useCallback(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      setVoiceCommands(true);
      // Mock voice command recognition
      setTimeout(() => {
        alert('Voice command recognized: "Start workout"');
        triggerHaptic([100, 50, 100]);
      }, 2000);
    } else {
      alert('Speech recognition not supported in this browser');
    }
  }, [triggerHaptic]);

  // Install PWA
  const installApp = useCallback(() => {
    // This would typically use a beforeinstallprompt event
    if ('serviceWorker' in navigator) {
      alert('This app can be installed! Look for the "Add to Home Screen" option in your browser menu.');
    }
  }, []);

  const capabilities: MobileCapability[] = [
    {
      id: 'camera',
      name: 'Progress Photos',
      description: 'Take photos to track your fitness progress',
      icon: Camera,
      available: 'mediaDevices' in navigator,
      action: cameraActive ? stopCamera : startCamera
    },
    {
      id: 'notifications',
      name: 'Workout Reminders',
      description: 'Get push notifications for workout reminders',
      icon: Bell,
      available: 'Notification' in window,
      action: enableNotifications
    },
    {
      id: 'haptic',
      name: 'Haptic Feedback',
      description: 'Feel vibrations during workouts and achievements',
      icon: Vibrate,
      available: 'vibrate' in navigator,
      action: () => {
        setHapticEnabled(!hapticEnabled);
        if (!hapticEnabled) triggerHaptic([200, 100, 200]);
      }
    },
    {
      id: 'voice',
      name: 'Voice Commands',
      description: 'Control workouts with voice commands',
      icon: Mic,
      available: 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window,
      action: startVoiceCommands
    },
    {
      id: 'install',
      name: 'Install App',
      description: 'Install as a native app on your device',
      icon: Download,
      available: 'serviceWorker' in navigator,
      action: installApp
    }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-white mb-4">Mobile Features</h2>
        <p className="text-xl text-gray-300">Enhanced mobile experience with native capabilities</p>
      </div>

      {/* Camera Interface */}
      {cameraActive && (
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
                  onClick={stopCamera}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Photo Preview */}
      {photoTaken && (
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
          <h3 className="text-xl font-semibold text-white mb-4">Progress Photo Saved!</h3>
          <div className="text-center">
            <img
              src={photoTaken}
              alt="Progress photo"
              className="rounded-lg max-w-full h-64 object-cover mx-auto mb-4"
            />
            <div className="space-x-4">
              <button
                onClick={() => setPhotoTaken(null)}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
              >
                Take Another
              </button>
              <button
                onClick={() => {
                  // Mock share functionality
                  if (navigator.share) {
                    navigator.share({
                      title: 'My Fitness Progress',
                      text: 'Check out my workout progress!',
                      files: [new File([photoTaken], 'progress.jpg', { type: 'image/jpeg' })]
                    });
                  } else {
                    alert('Sharing not supported, but photo is saved to your workout history!');
                  }
                }}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Canvas for photo capture */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />

      {/* Mobile Capabilities */}
      <div className="grid gap-6 md:grid-cols-2">
        {capabilities.map(capability => {
          const Icon = capability.icon;
          return (
            <div
              key={capability.id}
              className={`bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border transition-all duration-300 ${
                capability.available 
                  ? 'border-slate-700/50 hover:border-blue-500/50' 
                  : 'border-red-500/30 opacity-60'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <Icon className={`h-8 w-8 mr-3 ${
                    capability.available ? 'text-blue-400' : 'text-gray-500'
                  }`} />
                  <div>
                    <h3 className="text-lg font-semibold text-white">{capability.name}</h3>
                    <p className="text-gray-400 text-sm">{capability.description}</p>
                  </div>
                </div>
                {!capability.available && (
                  <span className="text-xs text-red-400 bg-red-500/20 px-2 py-1 rounded">
                    Not Available
                  </span>
                )}
              </div>

              {capability.available && (
                <button
                  onClick={capability.action}
                  className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                    (capability.id === 'haptic' && hapticEnabled) ||
                    (capability.id === 'voice' && voiceCommands) ||
                    (capability.id === 'camera' && cameraActive)
                      ? 'bg-green-500 hover:bg-green-600 text-white'
                      : 'bg-blue-500 hover:bg-blue-600 text-white'
                  }`}
                >
                  {capability.id === 'haptic' ? (hapticEnabled ? 'Disable' : 'Enable') + ' Haptics' :
                   capability.id === 'voice' ? (voiceCommands ? 'Stop' : 'Start') + ' Voice Commands' :
                   capability.id === 'camera' ? (cameraActive ? 'Stop' : 'Start') + ' Camera' :
                   capability.id === 'notifications' ? (notificationsEnabled ? 'Enabled' : 'Enable') :
                   'Activate'}
                </button>
              )}

              {/* Feature demos */}
              {capability.id === 'haptic' && capability.available && (
                <div className="mt-3 space-x-2">
                  <button
                    onClick={() => triggerHaptic(100)}
                    className="text-xs bg-slate-700 hover:bg-slate-600 text-gray-300 px-3 py-1 rounded"
                  >
                    Light
                  </button>
                  <button
                    onClick={() => triggerHaptic(200)}
                    className="text-xs bg-slate-700 hover:bg-slate-600 text-gray-300 px-3 py-1 rounded"
                  >
                    Medium
                  </button>
                  <button
                    onClick={() => triggerHaptic([100, 50, 100])}
                    className="text-xs bg-slate-700 hover:bg-slate-600 text-gray-300 px-3 py-1 rounded"
                  >
                    Pattern
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Audio Controls */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
          <Volume2 className="h-6 w-6 text-green-500 mr-2" />
          Audio Features
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <button
            onClick={() => {
              const audio = new Audio();
              audio.src = 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+LyvGQdAzeL1O/SeToGHm3A7N6XRAsOUaPg8MljHgU+ltryxnkpBSl+zvLZiTUIG2m98OScTwwOVqfg8LNmHAU4kdX1zXwsTyFz'};
              audio.play().catch(() => console.log('Audio play failed'));
              triggerHaptic(50);
            }}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-lg flex items-center justify-center"
          >
            <Volume2 className="h-5 w-5 mr-2" />
            Rest Timer Sound
          </button>
          <button
            onClick={() => {
              // Mock text-to-speech
              if ('speechSynthesis' in window) {
                const utterance = new SpeechSynthesisUtterance('Great job! Time for your next set.');
                speechSynthesis.speak(utterance);
              } else {
                alert('Text-to-speech not supported');
              }
            }}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-lg flex items-center justify-center"
          >
            <Mic className="h-5 w-5 mr-2" />
            Voice Coaching
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileFeatures;
