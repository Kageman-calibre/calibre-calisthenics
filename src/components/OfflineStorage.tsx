
import { useState, useEffect } from 'react';
import { Wifi, WifiOff, Download, Check } from 'lucide-react';

interface OfflineData {
  workouts: any[];
  exercises: any[];
  progress: any[];
  lastSync: string;
}

const OfflineStorage = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [offlineData, setOfflineData] = useState<OfflineData | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Load offline data
    const savedOfflineData = localStorage.getItem('offlineData');
    if (savedOfflineData) {
      setOfflineData(JSON.parse(savedOfflineData));
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const downloadForOffline = async () => {
    setIsDownloading(true);
    
    try {
      // Simulate downloading workout data
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const offlineContent: OfflineData = {
        workouts: JSON.parse(localStorage.getItem('workoutHistory') || '[]'),
        exercises: [], // Would include exercise database
        progress: [], // Would include progress data
        lastSync: new Date().toISOString()
      };
      
      localStorage.setItem('offlineData', JSON.stringify(offlineContent));
      setOfflineData(offlineContent);
    } catch (error) {
      console.error('Failed to download offline data:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  const syncData = async () => {
    if (!isOnline) return;
    
    // Simulate syncing data when back online
    console.log('Syncing offline data...');
    
    const updatedData = {
      ...offlineData,
      lastSync: new Date().toISOString()
    };
    
    localStorage.setItem('offlineData', JSON.stringify(updatedData));
    setOfflineData(updatedData as OfflineData);
  };

  useEffect(() => {
    if (isOnline && offlineData) {
      syncData();
    }
  }, [isOnline]);

  return (
    <div className="bg-gradient-to-br from-slate-800/60 to-slate-700/40 backdrop-blur-lg rounded-2xl p-6 border border-slate-600/30">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white flex items-center">
          {isOnline ? (
            <Wifi className="h-5 w-5 text-green-500 mr-2" />
          ) : (
            <WifiOff className="h-5 w-5 text-red-500 mr-2" />
          )}
          Offline Mode
        </h3>
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
          isOnline ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
        }`}>
          {isOnline ? 'Online' : 'Offline'}
        </div>
      </div>

      <div className="space-y-4">
        <p className="text-gray-400 text-sm">
          Download your workouts and exercises to use the app without an internet connection.
        </p>

        {offlineData ? (
          <div className="bg-slate-700/30 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white font-medium">Offline Content Ready</span>
              <Check className="h-5 w-5 text-green-500" />
            </div>
            <div className="text-sm text-gray-400">
              Last synced: {new Date(offlineData.lastSync).toLocaleDateString()}
            </div>
            <div className="text-sm text-gray-400">
              {offlineData.workouts.length} workouts available offline
            </div>
          </div>
        ) : (
          <button
            onClick={downloadForOffline}
            disabled={isDownloading || !isOnline}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-slate-600 disabled:to-slate-600 text-white font-medium py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 disabled:cursor-not-allowed"
          >
            <Download className="h-5 w-5" />
            <span>{isDownloading ? 'Downloading...' : 'Download for Offline'}</span>
          </button>
        )}

        {!isOnline && offlineData && (
          <div className="bg-orange-500/20 border border-orange-500/30 rounded-lg p-4">
            <p className="text-orange-400 text-sm">
              You're currently offline. Your progress will be saved locally and synced when you're back online.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OfflineStorage;
