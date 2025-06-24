
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Lock, Target, Timer, Trophy } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/auth/AuthProvider';
import { useToast } from '@/hooks/use-toast';

interface SkillRequirement {
  id: string;
  name: string;
  description: string;
  type: 'hold' | 'reps';
  targetValue: number;
  unit: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}

interface LevelRequirement {
  level: number;
  title: string;
  skills: SkillRequirement[];
}

const LEVEL_REQUIREMENTS: LevelRequirement[] = [
  {
    level: 11,
    title: 'Skill Initiate',
    skills: [
      {
        id: 'l-sit',
        name: 'L-Sit Hold',
        description: 'Demonstrate core strength with an L-sit',
        type: 'hold',
        targetValue: 15,
        unit: 'seconds',
        difficulty: 'intermediate'
      },
      {
        id: 'pistol-squat',
        name: 'Pistol Squat',
        description: 'Single-leg squat demonstrating leg strength and balance',
        type: 'reps',
        targetValue: 1,
        unit: 'per leg',
        difficulty: 'intermediate'
      }
    ]
  },
  {
    level: 21,
    title: 'Strength Adept',
    skills: [
      {
        id: 'strict-pullup',
        name: 'Strict Pull-ups',
        description: 'Dead hang to chin over bar with strict form',
        type: 'reps',
        targetValue: 10,
        unit: 'reps',
        difficulty: 'intermediate'
      },
      {
        id: 'parallel-dips',
        name: 'Parallel Bar Dips',
        description: 'Full range of motion dips',
        type: 'reps',
        targetValue: 15,
        unit: 'reps',
        difficulty: 'intermediate'
      }
    ]
  },
  {
    level: 31,
    title: 'Movement Master',
    skills: [
      {
        id: 'muscle-up',
        name: 'Muscle-up',
        description: 'Transition from pull-up to dip in one fluid motion',
        type: 'reps',
        targetValue: 3,
        unit: 'reps',
        difficulty: 'advanced'
      },
      {
        id: 'handstand-pushup',
        name: 'Handstand Push-up',
        description: 'Inverted push-up against wall',
        type: 'reps',
        targetValue: 5,
        unit: 'reps',
        difficulty: 'advanced'
      },
      {
        id: 'front-lever',
        name: 'Front Lever',
        description: 'Horizontal body hold parallel to ground',
        type: 'hold',
        targetValue: 5,
        unit: 'seconds',
        difficulty: 'advanced'
      }
    ]
  },
  {
    level: 41,
    title: 'Elite Performer',
    skills: [
      {
        id: 'one-arm-pullup',
        name: 'One-Arm Pull-up',
        description: 'Ultimate pulling strength demonstration',
        type: 'reps',
        targetValue: 1,
        unit: 'per arm',
        difficulty: 'expert'
      },
      {
        id: 'planche',
        name: 'Planche Hold',
        description: 'Advanced static hold requiring extreme strength',
        type: 'hold',
        targetValue: 10,
        unit: 'seconds',
        difficulty: 'expert'
      },
      {
        id: 'human-flag',
        name: 'Human Flag',
        description: 'Lateral body hold on vertical pole',
        type: 'hold',
        targetValue: 8,
        unit: 'seconds',
        difficulty: 'expert'
      }
    ]
  },
  {
    level: 51,
    title: 'Legendary Master',
    skills: [
      {
        id: 'iron-cross',
        name: 'Iron Cross',
        description: 'Rings gymnastics strength move',
        type: 'hold',
        targetValue: 3,
        unit: 'seconds',
        difficulty: 'expert'
      },
      {
        id: 'one-arm-handstand',
        name: 'One-Arm Handstand',
        description: 'Ultimate balance and strength display',
        type: 'hold',
        targetValue: 10,
        unit: 'seconds',
        difficulty: 'expert'
      }
    ]
  }
];

interface SkillRequirementsProps {
  currentLevel: number;
}

const SkillRequirements = ({ currentLevel }: SkillRequirementsProps) => {
  const [completedSkills, setCompletedSkills] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      fetchCompletedSkills();
    }
  }, [user]);

  const fetchCompletedSkills = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('skill_completions')
        .select('skill_id')
        .eq('user_id', user.id);

      if (error) {
        console.error('Error fetching skill completions:', error);
      } else if (data) {
        setCompletedSkills(new Set(data.map(item => item.skill_id)));
      }
    } catch (error) {
      console.error('Error in fetchCompletedSkills:', error);
    }
    
    setLoading(false);
  };

  const markSkillComplete = async (skillId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('skill_completions')
        .insert({
          user_id: user.id,
          skill_id: skillId
        });

      if (!error) {
        setCompletedSkills(prev => new Set([...prev, skillId]));
        toast({
          title: "Skill Completed! 🎉",
          description: "Great job! You've mastered this movement.",
        });
      } else {
        console.error('Error marking skill complete:', error);
      }
    } catch (error) {
      console.error('Error in markSkillComplete:', error);
    }
  };

  const getNextRequirement = () => {
    return LEVEL_REQUIREMENTS.find(req => req.level > currentLevel);
  };

  const getCurrentRequirement = () => {
    return LEVEL_REQUIREMENTS.find(req => req.level <= currentLevel + 10 && req.level > currentLevel);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-500/20 text-green-400 border-green-500/50';
      case 'intermediate': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
      case 'advanced': return 'bg-orange-500/20 text-orange-400 border-orange-500/50';
      case 'expert': return 'bg-red-500/20 text-red-400 border-red-500/50';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
  };

  const nextReq = getNextRequirement();
  const currentReq = getCurrentRequirement();

  if (loading) {
    return <div className="text-white">Loading skill requirements...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Current Level Requirements */}
      {currentReq && (
        <Card className="bg-slate-800/50 border-orange-500/30">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Target className="h-5 w-5 text-orange-400" />
              Level {currentReq.level} Requirements - {currentReq.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-300">
              Complete these skills to unlock Level {currentReq.level}:
            </p>
            
            <div className="grid gap-4">
              {currentReq.skills.map((skill) => {
                const isCompleted = completedSkills.has(skill.id);
                return (
                  <div
                    key={skill.id}
                    className={`p-4 rounded-lg border ${
                      isCompleted 
                        ? 'bg-green-500/10 border-green-500/30' 
                        : 'bg-slate-700/30 border-slate-600'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {isCompleted ? (
                          <CheckCircle className="h-5 w-5 text-green-400" />
                        ) : (
                          <Lock className="h-5 w-5 text-gray-500" />
                        )}
                        <h3 className="text-white font-medium">{skill.name}</h3>
                      </div>
                      <Badge className={getDifficultyColor(skill.difficulty)}>
                        {skill.difficulty}
                      </Badge>
                    </div>
                    
                    <p className="text-gray-300 text-sm mb-3">{skill.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        {skill.type === 'hold' ? (
                          <Timer className="h-4 w-4" />
                        ) : (
                          <Trophy className="h-4 w-4" />
                        )}
                        Target: {skill.targetValue} {skill.unit}
                      </div>
                      
                      {!isCompleted && (
                        <Button
                          size="sm"
                          onClick={() => markSkillComplete(skill.id)}
                          className="bg-orange-500 hover:bg-orange-600"
                        >
                          Mark Complete
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="mt-4">
              <div className="flex justify-between text-sm text-gray-400 mb-2">
                <span>Progress</span>
                <span>{completedSkills.size} / {currentReq.skills.length}</span>
              </div>
              <Progress 
                value={(completedSkills.size / currentReq.skills.length) * 100} 
                className="h-2"
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Upcoming Requirements */}
      {nextReq && (
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Lock className="h-5 w-5 text-gray-400" />
              Upcoming: Level {nextReq.level} - {nextReq.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300 mb-4">
              Future challenges to unlock at Level {nextReq.level}:
            </p>
            
            <div className="grid gap-3">
              {nextReq.skills.map((skill) => (
                <div
                  key={skill.id}
                  className="p-3 rounded-lg bg-slate-700/30 border border-slate-600"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-gray-300 font-medium">{skill.name}</h4>
                      <p className="text-sm text-gray-400">
                        {skill.targetValue} {skill.unit}
                      </p>
                    </div>
                    <Badge className={getDifficultyColor(skill.difficulty)}>
                      {skill.difficulty}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* All Requirements Overview */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">All Level Requirements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {LEVEL_REQUIREMENTS.map((req) => (
              <div
                key={req.level}
                className={`p-4 rounded-lg border ${
                  req.level <= currentLevel 
                    ? 'bg-green-500/10 border-green-500/30' 
                    : req.level === currentReq?.level
                    ? 'bg-orange-500/10 border-orange-500/30'
                    : 'bg-slate-700/30 border-slate-600'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-white font-medium">
                    Level {req.level}: {req.title}
                  </h3>
                  {req.level <= currentLevel && (
                    <CheckCircle className="h-5 w-5 text-green-400" />
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {req.skills.map((skill) => (
                    <Badge key={skill.id} variant="outline" className="text-xs">
                      {skill.name}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SkillRequirements;
