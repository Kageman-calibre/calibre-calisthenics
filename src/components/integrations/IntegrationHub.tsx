
import { useState } from 'react';
import { Watch, Smartphone, Wifi, Bluetooth, Activity, Heart, Zap } from 'lucide-react';

interface Integration {
  id: string;
  name: string;
  type: 'wearable' | 'app' | 'device';
  icon: React.ReactNode;
  connected: boolean;
  description: string;
  features: string[];
  lastSync?: string;
}

const IntegrationHub = () => {
  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: 'apple-watch',
      name: 'Apple Watch',
      type: 'wearable',
      icon: <Watch className="h-6 w-6" />,
      connected: true,
      description: 'Sync heart rate, workouts, and activity data',
      features: ['Heart Rate', 'Workout Detection', 'Steps', 'Calories'],
      lastSync: '2 minutes ago'
    },
    {
      id: 'garmin',
      name: 'Garmin Connect',
      type: 'wearable',
      icon: <Activity className="h-6 w-6" />,
      connected: false,
      description: 'Advanced fitness metrics and GPS tracking',
      features: ['GPS Routes', 'VO2 Max', 'Training Load', 'Recovery']
    },
    {
      id: 'fitbit',
      name: 'Fitbit',
      type: 'wearable',
      icon: <Heart className="h-6 w-6" />,
      connected: false,
      description: 'Sleep tracking and daily activity monitoring',
      features: ['Sleep Analysis', 'Heart Rate Zones', 'Step Goals', 'Active Minutes']
    },
    {
      id: 'myfitnesspal',
      name: 'MyFitnessPal',
      type: 'app',
      icon: <Smartphone className="h-6 w-6" />,
      connected: true,
      description: 'Nutrition and calorie tracking integration',
      features: ['Food Logging', 'Macro Tracking', 'Recipe Import', 'Barcode Scanner'],
      lastSync: '1 hour ago'
    },
    {
      id: 'strava',
      name: 'Strava',
      type: 'app',
      icon: <Zap className="h-6 w-6" />,
      connected: false,
      description: 'Social fitness tracking and challenges',
      features: ['Activity Sharing', 'Segments', 'Kudos', 'Group Challenges']
    },
    {
      id: 'polar',
      name: 'Polar Flow',
      type: 'wearable',
      icon: <Bluetooth className="h-6 w-6" />,
      connected: false,
      description: 'Professional heart rate and training analysis',
      features: ['Training Load Pro', 'Recovery Pro', 'Running Index', 'Orthostatic Test']
    }
  ]);

  const toggleConnection = (id: string) => {
    setIntegrations(prev => prev.map(integration => 
      integration.id === id 
        ? { 
            ...integration, 
            connected: !integration.connected,
            lastSync: integration.connected ? undefined : 'Just now'
          }
        : integration
    ));
  };

  const connectedCount = integrations.filter(i => i.connected).length;
  const totalDataPoints = connectedCount * 1234; // Mock calculation

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-white mb-4">Integration Hub</h2>
        <p className="text-xl text-gray-300">Connect your devices and apps for a complete fitness picture</p>
      </div>

      {/* Connection Overview */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-sm rounded-xl p-6 border border-blue-500/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-400 text-sm font-medium">Connected Devices</p>
              <p className="text-3xl font-bold text-white">{connectedCount}</p>
            </div>
            <Wifi className="h-8 w-8 text-blue-400" />
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-sm rounded-xl p-6 border border-green-500/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-400 text-sm font-medium">Data Points/Day</p>
              <p className="text-3xl font-bold text-white">{totalDataPoints.toLocaleString()}</p>
            </div>
            <Activity className="h-8 w-8 text-green-400" />
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-400 text-sm font-medium">Sync Status</p>
              <p className="text-3xl font-bold text-white">Live</p>
            </div>
            <Heart className="h-8 w-8 text-purple-400" />
          </div>
        </div>
      </div>

      {/* Available Integrations */}
      <div className="space-y-6">
        <h3 className="text-2xl font-semibold text-white">Available Integrations</h3>
        <div className="grid lg:grid-cols-2 gap-6">
          {integrations.map((integration) => (
            <div
              key={integration.id}
              className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 transition-all duration-300 hover:border-slate-600/50"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-3 rounded-lg ${integration.connected ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}`}>
                    {integration.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white">{integration.name}</h4>
                    <p className="text-sm text-gray-400 capitalize">{integration.type}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {integration.connected && (
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-green-400 text-xs">Connected</span>
                    </div>
                  )}
                </div>
              </div>
              
              <p className="text-gray-300 mb-4">{integration.description}</p>
              
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-400 mb-2">Features:</p>
                <div className="flex flex-wrap gap-2">
                  {integration.features.map((feature) => (
                    <span
                      key={feature}
                      className="px-2 py-1 bg-slate-700/50 text-gray-300 rounded-md text-xs"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
              
              {integration.lastSync && (
                <p className="text-xs text-gray-400 mb-4">Last synced: {integration.lastSync}</p>
              )}
              
              <button
                onClick={() => toggleConnection(integration.id)}
                className={`w-full py-2 px-4 rounded-lg font-medium transition-all duration-300 ${
                  integration.connected
                    ? 'bg-red-500 hover:bg-red-600 text-white'
                    : 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white'
                }`}
              >
                {integration.connected ? 'Disconnect' : 'Connect'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Sync Status */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
        <h3 className="text-xl font-semibold text-white mb-6">Recent Sync Activity</h3>
        <div className="space-y-3">
          {integrations.filter(i => i.connected).map((integration) => (
            <div key={integration.id} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-500/20 text-green-400 rounded-lg">
                  {integration.icon}
                </div>
                <div>
                  <p className="text-white font-medium">{integration.name}</p>
                  <p className="text-sm text-gray-400">Synced {integration.lastSync}</p>
                </div>
              </div>
              <div className="text-green-400 text-sm">✓ Up to date</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IntegrationHub;
