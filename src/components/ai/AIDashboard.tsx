
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Brain, BarChart3, Crystal, TrendingUp } from 'lucide-react';
import AdvancedAnalytics from './AdvancedAnalytics';
import AIInsights from './AIInsights';
import PredictiveAnalytics from './PredictiveAnalytics';

const AIDashboard = () => {
  const [activeTab, setActiveTab] = useState('analytics');

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-full px-4 py-2 mb-6">
          <Brain className="h-4 w-4 text-purple-400" />
          <span className="text-purple-400 text-sm font-medium">AI-Powered Platform</span>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
          Intelligent
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400">
            Fitness Analytics
          </span>
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Advanced AI analytics, personalized insights, and predictive modeling for optimal training results
        </p>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-slate-800/50">
          <TabsTrigger value="analytics" className="text-white flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Advanced Analytics
          </TabsTrigger>
          <TabsTrigger value="insights" className="text-white flex items-center gap-2">
            <Brain className="h-4 w-4" />
            AI Insights
          </TabsTrigger>
          <TabsTrigger value="predictions" className="text-white flex items-center gap-2">
            <Crystal className="h-4 w-4" />
            Predictions
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="analytics" className="mt-8">
          <AdvancedAnalytics />
        </TabsContent>
        
        <TabsContent value="insights" className="mt-8">
          <AIInsights />
        </TabsContent>
        
        <TabsContent value="predictions" className="mt-8">
          <PredictiveAnalytics />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AIDashboard;
