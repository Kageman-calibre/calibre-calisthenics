
import { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, SkipForward } from 'lucide-react';

interface WorkoutTimerProps {
  initialTime: number;
  onComplete?: () => void;
  onTimeUpdate?: (timeLeft: number) => void;
  autoStart?: boolean;
  showControls?: boolean;
}

const WorkoutTimer = ({ 
  initialTime, 
  onComplete, 
  onTimeUpdate, 
  autoStart = false,
  showControls = true 
}: WorkoutTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(autoStart);
  const [isMuted, setIsMuted] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Create audio context for beep sounds
  const createBeep = (frequency: number, duration: number) => {
    if (isMuted) return;
    
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      
      const oscillator = audioContextRef.current.createOscillator();
      const gainNode = audioContextRef.current.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContextRef.current.destination);
      
      oscillator.frequency.value = frequency;
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0.1, audioContextRef.current.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContextRef.current.currentTime + duration);
      
      oscillator.start();
      oscillator.stop(audioContextRef.current.currentTime + duration);
    } catch (error) {
      console.log('Audio not supported');
    }
  };

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          const newTime = prev - 1;
          
          // Audio cues
          if (newTime === 3 || newTime === 2 || newTime === 1) {
            createBeep(800, 0.1);
          } else if (newTime === 0) {
            createBeep(1000, 0.3);
          }
          
          onTimeUpdate?.(newTime);
          
          if (newTime === 0) {
            setIsRunning(false);
            onComplete?.();
          }
          
          return newTime;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeLeft, onComplete, onTimeUpdate, isMuted]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePlayPause = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(initialTime);
  };

  const handleSkip = () => {
    setIsRunning(false);
    setTimeLeft(0);
    onComplete?.();
  };

  const getTimerColor = () => {
    if (timeLeft <= 3) return 'text-red-400';
    if (timeLeft <= 10) return 'text-orange-400';
    return 'text-green-400';
  };

  return (
    <div className="bg-gradient-to-br from-slate-800/60 to-slate-700/40 backdrop-blur-lg rounded-2xl p-6 border border-slate-600/30">
      <div className="text-center mb-6">
        <div className={`text-6xl font-bold mb-2 transition-colors ${getTimerColor()}`}>
          {formatTime(timeLeft)}
        </div>
        <div className="text-gray-400">
          {timeLeft === 0 ? 'Complete!' : isRunning ? 'Running...' : 'Paused'}
        </div>
      </div>

      {showControls && (
        <div className="flex space-x-3">
          <button
            onClick={handlePlayPause}
            disabled={timeLeft === 0}
            className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 disabled:from-slate-600 disabled:to-slate-600 text-white font-medium py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 disabled:cursor-not-allowed"
          >
            {isRunning ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            <span>{isRunning ? 'Pause' : 'Start'}</span>
          </button>
          
          <button
            onClick={handleReset}
            className="bg-slate-700 hover:bg-slate-600 text-white font-medium py-3 px-4 rounded-xl transition-all duration-300"
          >
            <RotateCcw className="h-5 w-5" />
          </button>
          
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="bg-slate-700 hover:bg-slate-600 text-white font-medium py-3 px-4 rounded-xl transition-all duration-300"
          >
            {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
          </button>
          
          <button
            onClick={handleSkip}
            disabled={timeLeft === 0}
            className="bg-slate-700 hover:bg-slate-600 disabled:bg-slate-800/50 disabled:text-gray-500 text-white font-medium py-3 px-4 rounded-xl transition-all duration-300 disabled:cursor-not-allowed"
          >
            <SkipForward className="h-5 w-5" />
          </button>
        </div>
      )}

      {/* Progress Bar */}
      <div className="mt-4">
        <div className="bg-slate-700 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-1000 ${
              timeLeft <= 3 ? 'bg-red-500' : 
              timeLeft <= 10 ? 'bg-orange-500' : 
              'bg-green-500'
            }`}
            style={{ width: `${((initialTime - timeLeft) / initialTime) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutTimer;
