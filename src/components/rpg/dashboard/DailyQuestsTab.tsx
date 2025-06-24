
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Target, Info, CheckCircle, Circle } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const DailyQuestsTab = () => {
  const { toast } = useToast();
  const [quests, setQuests] = useState([
    { 
      id: 1, 
      name: 'Morning Push-ups', 
      description: 'Do 5 push-ups',
      type: 'GTG',
      xp: 25, 
      completed: false 
    },
    { 
      id: 2, 
      name: 'Squat Break', 
      description: 'Perform 10 bodyweight squats',
      type: 'GTG',
      xp: 20, 
      completed: true 
    },
    { 
      id: 3, 
      name: 'Pull-up Practice', 
      description: 'Complete 3 pull-ups or assisted pull-ups',
      type: 'GTG',
      xp: 35, 
      completed: false 
    },
    { 
      id: 4, 
      name: 'Deadhang Challenge', 
      description: 'Hold a deadhang for 30 seconds',
      type: 'GTG',
      xp: 30, 
      completed: false 
    },
    { 
      id: 5, 
      name: 'Plank Hold', 
      description: 'Hold a plank for 45 seconds',
      type: 'GTG',
      xp: 25, 
      completed: true 
    },
    { 
      id: 6, 
      name: 'L-sit Practice', 
      description: 'Hold an L-sit or tuck L-sit for 15 seconds',
      type: 'GTG',
      xp: 40, 
      completed: false 
    }
  ]);

  const [showPhilosophy, setShowPhilosophy] = useState(false);

  const completeQuest = (questId: number) => {
    setQuests(prev => prev.map(quest => 
      quest.id === questId 
        ? { ...quest, completed: true }
        : quest
    ));
    
    const quest = quests.find(q => q.id === questId);
    if (quest) {
      toast({
        title: "Quest Completed! 🎯",
        description: `You earned ${quest.xp} XP for completing "${quest.name}"!`,
      });
    }
  };

  const completedCount = quests.filter(q => q.completed).length;
  const totalXP = quests.filter(q => q.completed).reduce((sum, q) => sum + q.xp, 0);

  return (
    <div className="space-y-6">
      {/* Philosophy Card */}
      <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/30">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white flex items-center">
              <Info className="h-5 w-5 mr-2 text-blue-400" />
              Grease the Groove Philosophy
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowPhilosophy(!showPhilosophy)}
              className="text-blue-400 hover:text-blue-300"
            >
              {showPhilosophy ? 'Hide' : 'Learn More'}
            </Button>
          </div>
        </CardHeader>
        {showPhilosophy && (
          <CardContent className="text-gray-300 space-y-3">
            <p>
              <strong className="text-blue-400">Grease the Groove (GTG)</strong> is a training method popularized by Pavel Tsatsouline that focuses on frequent practice of a specific movement throughout the day.
            </p>
            <div className="space-y-2">
              <h4 className="text-white font-semibold">Key Principles:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li><strong>High Frequency:</strong> Practice the same exercise multiple times per day</li>
                <li><strong>Low Intensity:</strong> Stay well below your maximum effort (50-80% of max reps)</li>
                <li><strong>Never to Failure:</strong> Stop while you still feel fresh and strong</li>
                <li><strong>Motor Learning:</strong> Builds neural pathways and movement efficiency</li>
                <li><strong>Strength Endurance:</strong> Improves your ability to perform the movement repeatedly</li>
              </ul>
            </div>
            <p className="text-sm italic">
              "Practice makes permanent. Perfect practice makes perfect." - The goal is to reinforce proper movement patterns through frequent, quality repetitions.
            </p>
          </CardContent>
        )}
      </Card>

      {/* Progress Summary */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-white text-lg font-semibold">Today's Progress</h3>
              <p className="text-gray-400">Complete simple GTG challenges throughout your day</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-white">{completedCount}/6</div>
              <div className="text-sm text-gray-400">Quests</div>
            </div>
          </div>
          <div className="flex items-center space-x-4 text-sm text-gray-400">
            <span>Total XP Earned: <span className="text-yellow-400 font-semibold">{totalXP}</span></span>
          </div>
        </CardContent>
      </Card>

      {/* Daily Quests */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Target className="h-6 w-6 mr-2 text-purple-400" />
            Grease the Groove Challenges
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {quests.map((quest) => (
            <div
              key={quest.id}
              className={`flex items-center justify-between p-4 rounded-lg transition-all ${
                quest.completed 
                  ? 'bg-green-500/20 border border-green-500/30' 
                  : 'bg-slate-700/30 hover:bg-slate-700/50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  {quest.completed ? (
                    <CheckCircle className="w-6 h-6 text-green-400" />
                  ) : (
                    <Circle className="w-6 h-6 text-gray-500" />
                  )}
                </div>
                <div>
                  <h4 className={`font-medium ${quest.completed ? 'text-green-400' : 'text-white'}`}>
                    {quest.name}
                  </h4>
                  <p className="text-sm text-gray-400">{quest.description}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Badge className={`${
                  quest.completed 
                    ? 'bg-green-500/20 text-green-400' 
                    : 'bg-blue-500/20 text-blue-400'
                }`}>
                  +{quest.xp} XP
                </Badge>
                {!quest.completed && (
                  <Button
                    size="sm"
                    onClick={() => completeQuest(quest.id)}
                    className="bg-purple-500 hover:bg-purple-600"
                  >
                    Complete
                  </Button>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* GTG Tips */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white text-lg">GTG Tips for Success</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300">
            <div>
              <h4 className="text-white font-semibold mb-2">Do's:</h4>
              <ul className="space-y-1">
                <li>• Spread sessions throughout the day</li>
                <li>• Focus on perfect form</li>
                <li>• Stay consistent daily</li>
                <li>• Listen to your body</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Don'ts:</h4>
              <ul className="space-y-1">
                <li>• Don't train to failure</li>
                <li>• Don't rush the movements</li>
                <li>• Don't skip rest days if needed</li>
                <li>• Don't ignore proper warm-up</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DailyQuestsTab;
