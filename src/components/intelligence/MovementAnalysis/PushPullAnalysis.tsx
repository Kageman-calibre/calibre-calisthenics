
import { BarChart3, TrendingUp, CheckCircle, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { PushPullData } from './types';

interface PushPullAnalysisProps {
  data: PushPullData[];
}

const PushPullAnalysis = ({ data }: PushPullAnalysisProps) => {
  return (
    <div className="space-y-6">
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-orange-400" />
            Push/Pull Ratio Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="week" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#F9FAFB'
                  }} 
                />
                <Line type="monotone" dataKey="push" stroke="#EF4444" strokeWidth={2} name="Push Volume" />
                <Line type="monotone" dataKey="pull" stroke="#3B82F6" strokeWidth={2} name="Pull Volume" />
                <Line type="monotone" dataKey="ratio" stroke="#F59E0B" strokeWidth={2} name="Push/Pull Ratio" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-700/30 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-orange-400" />
                <span className="text-white font-medium">Current Ratio</span>
              </div>
              <p className="text-2xl font-bold text-orange-400">1.13:1</p>
              <p className="text-gray-400 text-sm">Push:Pull</p>
            </div>
            
            <div className="bg-slate-700/30 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span className="text-white font-medium">Status</span>
              </div>
              <Badge className="bg-green-500/20 text-green-400">Well Balanced</Badge>
              <p className="text-gray-400 text-sm mt-1">Ideal range: 1:1 to 1.2:1</p>
            </div>
            
            <div className="bg-slate-700/30 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="h-4 w-4 text-blue-400" />
                <span className="text-white font-medium">Recommendation</span>
              </div>
              <p className="text-blue-400 text-sm">Maintain current balance</p>
              <p className="text-gray-400 text-sm">Good shoulder health</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PushPullAnalysis;
