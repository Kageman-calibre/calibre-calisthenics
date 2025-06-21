
import { useState } from 'react';
import { Trophy, Lock, CheckCircle, Play, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Skill {
  id: string;
  name: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  prerequisites: string[];
  isUnlocked: boolean;
  isCompleted: boolean;
  isStatic: boolean;
  holdTime?: number; // for static holds in seconds
  reps?: number; // for dynamic movements
  videoUrl?: string;
  tips: string[];
}

interface SkillTreeProps {
  category: 'pushing' | 'pulling' | 'core' | 'legs';
}

const SkillTree = ({ category }: SkillTreeProps) => {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);

  const skillTrees = {
    pushing: [
      {
        id: 'knee-pushup',
        name: 'Knee Push-up',
        description: 'Foundation pushing movement',
        difficulty: 'beginner' as const,
        prerequisites: [],
        isUnlocked: true,
        isCompleted: true,
        isStatic: false,
        reps: 15,
        tips: ['Keep straight line from knees to head', 'Control the movement']
      },
      {
        id: 'regular-pushup',
        name: 'Push-up',
        description: 'Standard bodyweight push',
        difficulty: 'beginner' as const,
        prerequisites: ['knee-pushup'],
        isUnlocked: true,
        isCompleted: true,
        isStatic: false,
        reps: 20,
        tips: ['Full range of motion', 'Engage core throughout']
      },
      {
        id: 'archer-pushup',
        name: 'Archer Push-up',
        description: 'Unilateral strength builder',
        difficulty: 'intermediate' as const,
        prerequisites: ['regular-pushup'],
        isUnlocked: true,
        isCompleted: false,
        isStatic: false,
        reps: 8,
        tips: ['Shift weight to working arm', 'Keep hips square']
      },
      {
        id: 'handstand-pushup',
        name: 'Handstand Push-up',
        description: 'Vertical pushing power',
        difficulty: 'advanced' as const,
        prerequisites: ['archer-pushup', 'handstand-hold'],
        isUnlocked: false,
        isCompleted: false,
        isStatic: false,
        reps: 5,
        tips: ['Master handstand first', 'Start with wall support']
      }
    ],
    pulling: [
      {
        id: 'dead-hang',
        name: 'Dead Hang',
        description: 'Grip and shoulder stability',
        difficulty: 'beginner' as const,
        prerequisites: [],
        isUnlocked: true,
        isCompleted: true,
        isStatic: true,
        holdTime: 60,
        tips: ['Active shoulders', 'Full grip engagement']
      },
      {
        id: 'pullup',
        name: 'Pull-up',
        description: 'Fundamental pulling movement',
        difficulty: 'intermediate' as const,
        prerequisites: ['dead-hang'],
        isUnlocked: true,
        isCompleted: false,
        isStatic: false,
        reps: 8,
        tips: ['Pull chest to bar', 'Control the descent']
      },
      {
        id: 'muscle-up',
        name: 'Muscle-up',
        description: 'Pull and push combination',
        difficulty: 'advanced' as const,
        prerequisites: ['pullup'],
        isUnlocked: false,
        isCompleted: false,
        isStatic: false,
        reps: 3,
        tips: ['Explosive pull', 'Quick transition']
      }
    ],
    core: [
      {
        id: 'plank',
        name: 'Plank',
        description: 'Core stability foundation',
        difficulty: 'beginner' as const,
        prerequisites: [],
        isUnlocked: true,
        isCompleted: true,
        isStatic: true,
        holdTime: 60,
        tips: ['Straight body line', 'Breathe normally']
      },
      {
        id: 'l-sit',
        name: 'L-Sit',
        description: 'Advanced core hold',
        difficulty: 'intermediate' as const,
        prerequisites: ['plank'],
        isUnlocked: true,
        isCompleted: false,
        isStatic: true,
        holdTime: 15,
        tips: ['Press down through arms', 'Lift legs parallel to ground']
      },
      {
        id: 'front-lever',
        name: 'Front Lever',
        description: 'Elite core and pulling strength',
        difficulty: 'expert' as const,
        prerequisites: ['l-sit', 'pullup'],
        isUnlocked: false,
        isCompleted: false,
        isStatic: true,
        holdTime: 5,
        tips: ['Master tuck progression first', 'Hollow body position']
      }
    ],
    legs: [
      {
        id: 'squat',
        name: 'Bodyweight Squat',
        description: 'Basic leg strength',
        difficulty: 'beginner' as const,
        prerequisites: [],
        isUnlocked: true,
        isCompleted: true,
        isStatic: false,
        reps: 25,
        tips: ['Full depth', 'Knees track over toes']
      },
      {
        id: 'pistol-squat',
        name: 'Pistol Squat',
        description: 'Single leg strength',
        difficulty: 'advanced' as const,
        prerequisites: ['squat'],
        isUnlocked: true,
        isCompleted: false,
        isStatic: false,
        reps: 5,
        tips: ['Build up with assistance', 'Control the descent']
      }
    ]
  };

  const skills = skillTrees[category] || [];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-500/20 text-green-400 border-green-500/50';
      case 'intermediate': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
      case 'advanced': return 'bg-orange-500/20 text-orange-400 border-orange-500/50';
      case 'expert': return 'bg-red-500/20 text-red-400 border-red-500/50';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
  };

  const getSkillIcon = (skill: Skill) => {
    if (!skill.isUnlocked) return <Lock className="h-5 w-5 text-gray-500" />;
    if (skill.isCompleted) return <CheckCircle className="h-5 w-5 text-green-400" />;
    return <Play className="h-5 w-5 text-orange-400" />;
  };

  return (
    <div className="space-y-6">
      {/* Skill Tree Visualization */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {skills.map((skill, index) => (
          <Card
            key={skill.id}
            className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
              skill.isUnlocked 
                ? 'bg-slate-800/50 border-slate-700 hover:border-orange-500/40' 
                : 'bg-slate-900/50 border-slate-800'
            } ${selectedSkill?.id === skill.id ? 'ring-2 ring-orange-500/50' : ''}`}
            onClick={() => setSelectedSkill(skill)}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                {getSkillIcon(skill)}
                <Badge className={getDifficultyColor(skill.difficulty)}>
                  {skill.difficulty}
                </Badge>
              </div>
              
              <h3 className={`font-medium mb-2 ${
                skill.isUnlocked ? 'text-white' : 'text-gray-500'
              }`}>
                {skill.name}
              </h3>
              
              <p className={`text-sm mb-3 ${
                skill.isUnlocked ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {skill.description}
              </p>

              {skill.isStatic ? (
                <div className="flex items-center text-xs text-gray-400">
                  <Clock className="h-3 w-3 mr-1" />
                  Hold: {skill.holdTime}s
                </div>
              ) : (
                <div className="flex items-center text-xs text-gray-400">
                  <Trophy className="h-3 w-3 mr-1" />
                  Target: {skill.reps} reps
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Skill Detail Panel */}
      {selectedSkill && (
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-3">
              {getSkillIcon(selectedSkill)}
              {selectedSkill.name}
              <Badge className={getDifficultyColor(selectedSkill.difficulty)}>
                {selectedSkill.difficulty}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-300">{selectedSkill.description}</p>
            
            {selectedSkill.prerequisites.length > 0 && (
              <div>
                <h4 className="text-white font-medium mb-2">Prerequisites:</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedSkill.prerequisites.map((prereq) => (
                    <Badge key={prereq} variant="outline" className="text-gray-400">
                      {skills.find(s => s.id === prereq)?.name || prereq}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h4 className="text-white font-medium mb-2">Tips:</h4>
              <ul className="space-y-1">
                {selectedSkill.tips.map((tip, index) => (
                  <li key={index} className="text-gray-300 text-sm flex">
                    <span className="text-orange-400 mr-2">•</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex gap-3">
              <Button 
                className="bg-orange-500 hover:bg-orange-600"
                disabled={!selectedSkill.isUnlocked}
              >
                Start Training
              </Button>
              <Button variant="outline" className="border-slate-600 text-gray-300">
                View Tutorial
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SkillTree;
