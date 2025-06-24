
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Star } from 'lucide-react';

interface BadgeData {
  badge_id: string;
  badge_name: string;
  badge_description: string;
  rarity: string;
  earned_at: string;
}

interface BadgesTabProps {
  userBadges: BadgeData[];
  loading: boolean;
}

const BadgesTab = ({ userBadges, loading }: BadgesTabProps) => {
  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'epic': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'rare': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'uncommon': return 'bg-green-500/20 text-green-400 border-green-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Trophy className="h-6 w-6 mr-2 text-yellow-400" />
          Badge Collection ({userBadges.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="text-white">Loading badges...</div>
        ) : userBadges.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {userBadges.map((badge) => (
              <div
                key={badge.badge_id}
                className={`p-4 rounded-lg border ${getRarityColor(badge.rarity)}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <Star className="h-5 w-5" />
                  <Badge className={getRarityColor(badge.rarity)}>
                    {badge.rarity}
                  </Badge>
                </div>
                <h3 className="font-semibold text-white mb-1">{badge.badge_name}</h3>
                <p className="text-sm text-gray-300 mb-2">{badge.badge_description}</p>
                <p className="text-xs text-gray-400">
                  Earned: {new Date(badge.earned_at).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Trophy className="h-12 w-12 text-gray-500 mx-auto mb-4" />
            <p className="text-gray-400">No badges earned yet!</p>
            <p className="text-sm text-gray-500">Complete workouts and achievements to earn badges.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BadgesTab;
