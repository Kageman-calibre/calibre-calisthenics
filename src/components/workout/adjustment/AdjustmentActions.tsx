
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
        className="flex-1 border-slate-600 text-gray-300 hover:bg-slate-700"
      >
        Cancel
      </Button>
      
      <Button
        onClick={onSave}
        className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
      >
        Save Adjustments
      </Button>
    </div>
  );
};

export default AdjustmentActions;
