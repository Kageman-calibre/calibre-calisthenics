
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UnilateralBalance } from './types';

interface UnilateralAnalysisProps {
  data: UnilateralBalance[];
}

const UnilateralAnalysis = ({ data }: UnilateralAnalysisProps) => {
  const getImbalanceColor = (imbalance: number) => {
    if (imbalance > 30) return 'text-red-400';
    if (imbalance > 15) return 'text-orange-400';
    return 'text-green-400';
  };

  return (
    <div className="space-y-4">
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Unilateral Strength Balance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.map((movement) => (
              <div key={movement.movement} className="bg-slate-700/30 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-white font-medium">{movement.movement}</h4>
                  <span className={`font-medium ${getImbalanceColor(movement.imbalance)}`}>
                    {movement.imbalance}% imbalance
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <p className="text-gray-400 text-sm">Left</p>
                    <p className="text-white text-lg font-bold">{movement.left}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-400 text-sm">Right</p>
                    <p className="text-white text-lg font-bold">{movement.right}</p>
                  </div>
                </div>
                
                {movement.imbalance > 20 && (
                  <div className="mt-3 text-orange-400 text-sm">
                    ⚠ Focus on weaker side training
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UnilateralAnalysis;
