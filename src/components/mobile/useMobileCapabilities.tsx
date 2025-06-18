
import { useState, useCallback } from 'react';
import { Camera, Vibrate, Bell, Download, Mic } from 'lucide-react';

interface MobileCapability {
  id: string;
  name: string;
  description: string;
  icon: any;
  available: boolean;
  action: () => void;
}

export const useMobileCapabilities = () => {
  const [cameraActive, setCameraActive] = useState(false);
  const [photoTaken, setPhotoTaken] = useState<string | null>(null);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [hapticEnabled, setHapticEnabled] = useState(true);
  const [voiceCommands, setVoiceCommands] = useState(false);

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user' },
        audio: false 
      });
      // Note: The actual video element assignment is handled in CameraInterface
      setCameraActive(true);
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Camera access denied or not available');
    }
  }, []);

  const stopCamera = useCallback(() => {
    setCameraActive(false);
  }, []);

  const handlePhotoTaken = useCallback((photoData: string) => {
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
  }, [stopCamera]);

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

  const triggerHaptic = useCallback((pattern: number | number[]) => {
    if ('vibrate' in navigator && hapticEnabled) {
      navigator.vibrate(pattern);
    }
  }, [hapticEnabled]);

  const startVoiceCommands = useCallback(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      setVoiceCommands(true);
      setTimeout(() => {
        alert('Voice command recognized: "Start workout"');
        triggerHaptic([100, 50, 100]);
      }, 2000);
    } else {
      alert('Speech recognition not supported in this browser');
    }
  }, [triggerHaptic]);

  const installApp = useCallback(() => {
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

  return {
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
  };
};
