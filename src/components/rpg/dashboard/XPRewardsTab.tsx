
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Gift } from 'lucide-react';

interface XPReward {
  action_type: string;
  base_xp: number;
  description: string;
}

interface XPRewardsTabProps {
  xpRewards: XPReward[];
  onTestXP: (actionType: string) => void;
}

const XPRewardsTab = ({ xpRewards, onTestXP }: XPRewardsTabProps) => {
  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Gift className="h-6 w-6 mr-2 text-green-400" />
          XP Reward System
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {xpRewards.map((reward) => (
          <div
            key={reward.action_type}
            className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg"
          >
            <div>
              <h3 className="text-white font-medium">{reward.description}</h3>
              <p className="text-sm text-gray-400">Action: {reward.action_type}</p>
            </div>
            <div className="flex items-center space-x-3">
              <Badge className="bg-blue-500/20 text-blue-400">
                +{reward.base_xp} XP
              </Badge>
              <button
                onClick={() => onTestXP(reward.action_type)}
                className="text-xs bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md transition-colors"
              >
                Test
              </button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default XPRewardsTab;
