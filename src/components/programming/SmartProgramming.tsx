
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Brain, TrendingUp, Heart, BarChart3 } from 'lucide-react';
import ProgressiveOverloadTracker from './ProgressiveOverloadTracker';
import RecoveryTracker from './RecoveryTracker';
import WorkoutAnalytics from './WorkoutAnalytics';

const SmartProgramming = () => {
  const [activeTab, setActiveTab] = useState('overload');

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center space-x-2 bg-orange-500/10 border border-orange-500/20 rounded-full px-4 py-2 mb-6">
          <Brain className="h-4 w-4 text-orange-400" />
          <span className="text-orange-400 text-sm font-medium">Smart Programming</span>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
          Intelligent
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
            Workout Programming
          </span>
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
          AI-powered progressive overload, recovery optimization, and performance analytics
        </p>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-slate-800/50">
          <TabsTrigger value="overload" className="text-white flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Progressive Overload
          </TabsTrigger>
          <TabsTrigger value="recovery" className="text-white flex items-center gap-2">
            <Heart className="h-4 w-4" />
            Recovery Tracking
          </TabsTrigger>
          <TabsTrigger value="analytics" className="text-white flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Analytics
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overload" className="mt-8">
          <div className="max-w-4xl mx-auto">
            <ProgressiveOverloadTracker
              exerciseId="bench-press"
              exerciseName="Bench Press"
              onSavePerformance={(performance) => {
                console.log('Performance saved:', performance);
              }}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="recovery" className="mt-8">
          <div className="max-w-4xl mx-auto">
            <RecoveryTracker />
          </div>
        </TabsContent>
        
        <TabsContent value="analytics" className="mt-8">
          <div className="max-w-4xl mx-auto">
            <WorkoutAnalytics />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SmartProgramming;
