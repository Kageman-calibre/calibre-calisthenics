
import { TrendingUp } from 'lucide-react';

const VideoAnalyticsHeader = () => {
  return (
    <div className="text-center">
      <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-full px-4 py-2 mb-6">
        <TrendingUp className="h-4 w-4 text-green-400" />
        <span className="text-green-400 text-sm font-medium">Advanced Video Analytics</span>
      </div>
      
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
        Comprehensive
        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
          Movement Analysis
        </span>
      </h1>
      <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
        AI-powered comprehensive analysis with advanced movement tracking, injury risk assessment, and personalized feedback
      </p>
    </div>
  );
};

export default VideoAnalyticsHeader;
