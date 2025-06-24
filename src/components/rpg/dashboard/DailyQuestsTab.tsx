
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Target } from 'lucide-react';

const DailyQuestsTab = () => {
  const quests = [
    { name: 'Complete a workout', xp: 50, completed: false },
    { name: 'Try a new exercise', xp: 25, completed: true },
    { name: 'Login to the app', xp: 10, completed: true },
    { name: 'Share your progress', xp: 25, completed: false }
  ];

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Target className="h-6 w-6 mr-2 text-purple-400" />
          Daily Quests
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {quests.map((quest, index) => (
          <div
            key={index}
            className={`flex items-center justify-between p-4 rounded-lg ${
              quest.completed 
                ? 'bg-green-500/20 border border-green-500/30' 
                : 'bg-slate-700/30'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className={`w-4 h-4 rounded-full border-2 ${
                quest.completed 
                  ? 'bg-green-500 border-green-500' 
                  : 'border-gray-500'
              }`}>
                {quest.completed && (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </div>
                )}
              </div>
              <span className={`${quest.completed ? 'text-green-400' : 'text-white'}`}>
                {quest.name}
              </span>
            </div>
            <Badge className={`${
              quest.completed 
                ? 'bg-green-500/20 text-green-400' 
                : 'bg-blue-500/20 text-blue-400'
            }`}>
              +{quest.xp} XP
            </Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default DailyQuestsTab;
