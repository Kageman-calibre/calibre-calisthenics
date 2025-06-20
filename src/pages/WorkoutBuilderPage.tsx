
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import WorkoutBuilder from '@/components/workout/WorkoutBuilder';
import AchievementSystem from '@/components/achievements/AchievementSystem';
import Navigation from '@/components/Navigation';

const WorkoutBuilderPage = () => {
  const [activeTab, setActiveTab] = useState('builder');
  const [activeSection, setActiveSection] = useState('workouts');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />
      
      <div className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Workout Studio
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Create custom workouts and track your achievements
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-slate-800/50">
              <TabsTrigger value="builder" className="text-white">Workout Builder</TabsTrigger>
              <TabsTrigger value="achievements" className="text-white">Achievements</TabsTrigger>
            </TabsList>
            
            <TabsContent value="builder" className="mt-8">
              <WorkoutBuilder />
            </TabsContent>
            
            <TabsContent value="achievements" className="mt-8">
              <AchievementSystem />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default WorkoutBuilderPage;
