
import { Volume2, Mic } from 'lucide-react';

interface AudioControlsProps {
  onTriggerHaptic: (pattern: number | number[]) => void;
}

const AudioControls = ({ onTriggerHaptic }: AudioControlsProps) => {
  const playRestTimerSound = () => {
    const audio = new Audio();
    audio.src = 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+LyvGQdAzeL1O/SeToGHm3A7N6XRAsOUaPg8MljHgU+ltryxnkpBSl+zvLZiTUIG2m98OScTwwOVqfg8LNmHAU4kdX1zXwsTyFz';
    audio.play().catch(() => console.log('Audio play failed'));
    onTriggerHaptic(50);
  };

  const playVoiceCoaching = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance('Great job! Time for your next set.');
      speechSynthesis.speak(utterance);
    } else {
      alert('Text-to-speech not supported');
    }
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
      <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
        <Volume2 className="h-6 w-6 text-green-500 mr-2" />
        Audio Features
      </h3>
      <div className="grid md:grid-cols-2 gap-4">
        <button
          onClick={playRestTimerSound}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-lg flex items-center justify-center"
        >
          <Volume2 className="h-5 w-5 mr-2" />
          Rest Timer Sound
        </button>
        <button
          onClick={playVoiceCoaching}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-lg flex items-center justify-center"
        >
          <Mic className="h-5 w-5 mr-2" />
          Voice Coaching
        </button>
      </div>
    </div>
  );
};

export default AudioControls;
