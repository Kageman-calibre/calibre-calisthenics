
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Brain, Target, BarChart3, AlertTriangle } from 'lucide-react';
import WeaknessDetection from './WeaknessDetection';
import MovementAnalysis from './MovementAnalysis';

const SmartWorkoutIntelligence = () => {
  const [activeTab, setActiveTab] = useState('weaknesses');

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-full px-4 py-2 mb-6">
          <Brain className="h-4 w-4 text-cyan-400" />
          <span className="text-cyan-400 text-sm font-medium">Workout Intelligence</span>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
          Smart Training
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
            Intelligence
          </span>
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
          AI-powered analysis to identify weaknesses, optimize movement patterns, and accelerate your calisthenics progress
        </p>
      </div>

      {/* Intelligence Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-slate-800/50">
          <TabsTrigger value="weaknesses" className="text-white flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            Weakness Detection
          </TabsTrigger>
          <TabsTrigger value="analysis" className="text-white flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Movement Analysis
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="weaknesses" className="mt-8">
          <WeaknessDetection />
        </TabsContent>
        
        <TabsContent value="analysis" className="mt-8">
          <MovementAnalysis />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SmartWorkoutIntelligence;
