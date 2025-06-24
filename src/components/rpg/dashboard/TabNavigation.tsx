
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Trophy, Target, Gift } from 'lucide-react';

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (value: string) => void;
}

const TabNavigation = ({ activeTab, onTabChange }: TabNavigationProps) => {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
      <TabsList className="grid w-full grid-cols-5 bg-slate-800/50">
        <TabsTrigger value="character" className="text-white flex items-center gap-2">
          <User className="h-4 w-4" />
          Character
        </TabsTrigger>
        <TabsTrigger value="skills" className="text-white flex items-center gap-2">
          <Target className="h-4 w-4" />
          Skills
        </TabsTrigger>
        <TabsTrigger value="badges" className="text-white flex items-center gap-2">
          <Trophy className="h-4 w-4" />
          Badges
        </TabsTrigger>
        <TabsTrigger value="rewards" className="text-white flex items-center gap-2">
          <Gift className="h-4 w-4" />
          XP Rewards
        </TabsTrigger>
        <TabsTrigger value="quests" className="text-white flex items-center gap-2">
          <Target className="h-4 w-4" />
          Daily Quests
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default TabNavigation;
