
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Target, TrendingUp, Users, Trophy } from 'lucide-react';
import SkillTree from './SkillTree';

const SkillMastery = () => {
  const [activeCategory, setActiveCategory] = useState('pushing');

  const categories = [
    { id: 'pushing', label: 'Pushing', icon: Target },
    { id: 'pulling', label: 'Pulling', icon: TrendingUp },
    { id: 'core', label: 'Core', icon: Trophy },
    { id: 'legs', label: 'Legs', icon: Users }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-full px-4 py-2 mb-6">
          <Trophy className="h-4 w-4 text-blue-400" />
          <span className="text-blue-400 text-sm font-medium">Skill Mastery</span>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
          Master Your
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400">
            Calisthenics Skills
          </span>
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Progress through skill trees, unlock advanced movements, and track your journey from beginner to expert
        </p>
      </div>

      {/* Skill Categories */}
      <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-slate-800/50">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <TabsTrigger 
                key={category.id}
                value={category.id} 
                className="text-white flex items-center gap-2"
              >
                <IconComponent className="h-4 w-4" />
                {category.label}
              </TabsTrigger>
            );
          })}
        </TabsList>
        
        {categories.map((category) => (
          <TabsContent key={category.id} value={category.id} className="mt-8">
            <SkillTree category={category.id as any} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default SkillMastery;
