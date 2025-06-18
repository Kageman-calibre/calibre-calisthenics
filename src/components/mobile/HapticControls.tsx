
interface HapticControlsProps {
  onTriggerHaptic: (pattern: number | number[]) => void;
}

const HapticControls = ({ onTriggerHaptic }: HapticControlsProps) => {
  return (
    <div className="mt-3 space-x-2">
      <button
        onClick={() => onTriggerHaptic(100)}
        className="text-xs bg-slate-700 hover:bg-slate-600 text-gray-300 px-3 py-1 rounded"
      >
        Light
      </button>
      <button
        onClick={() => onTriggerHaptic(200)}
        className="text-xs bg-slate-700 hover:bg-slate-600 text-gray-300 px-3 py-1 rounded"
      >
        Medium
      </button>
      <button
        onClick={() => onTriggerHaptic([100, 50, 100])}
        className="text-xs bg-slate-700 hover:bg-slate-600 text-gray-300 px-3 py-1 rounded"
      >
        Pattern
      </button>
    </div>
  );
};

export default HapticControls;
