
import { Settings, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CardHeader, CardTitle } from '@/components/ui/card';

interface AdjustmentHeaderProps {
  onResetToDefaults: () => void;
}

const AdjustmentHeader = ({ onResetToDefaults }: AdjustmentHeaderProps) => {
  return (
    <>
      <CardHeader>
        <CardTitle className="text-2xl text-white flex items-center space-x-2">
          <Settings className="h-6 w-6 text-orange-400" />
          <span>Adjust Your Workout</span>
        </CardTitle>
        <p className="text-gray-300">
          Customize each exercise to match your fitness level and goals
        </p>
      </CardHeader>
      
      <div className="flex justify-between items-center p-4 bg-slate-700/30 rounded-xl mx-6">
        <span className="text-white font-medium">Quick Actions</span>
        <Button
          variant="outline"
          onClick={onResetToDefaults}
          className="border-slate-600 text-gray-300 hover:bg-slate-700"
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          Reset All
        </Button>
      </div>
    </>
  );
};

export default AdjustmentHeader;
