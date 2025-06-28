
import { Button } from '@/components/ui/button';

interface AdjustmentActionsProps {
  onCancel: () => void;
  onSave: () => void;
}

const AdjustmentActions = ({ onCancel, onSave }: AdjustmentActionsProps) => {
  return (
    <div className="flex space-x-3 pt-4 px-6 pb-6">
      <Button
        variant="outline"
        onClick={onCancel}
        className="flex-1 border-white/20 text-white/80 hover:bg-white/10 hover:text-white shadow-lg backdrop-blur-sm"
      >
        Cancel
      </Button>
      
      <Button
        onClick={onSave}
        className="flex-1 bg-gradient-to-r from-purple-500/30 to-blue-500/30 hover:from-purple-500/40 hover:to-blue-500/40 text-white border border-purple-500/30 hover:border-purple-500/50 shadow-lg"
      >
        Save Adjustments
      </Button>
    </div>
  );
};

export default AdjustmentActions;
