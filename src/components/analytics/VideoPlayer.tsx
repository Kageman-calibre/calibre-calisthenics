
import { forwardRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw } from 'lucide-react';

interface VideoPlayerProps {
  videoUrl: string;
  isPlaying: boolean;
  isAnalyzing: boolean;
  onTogglePlayPause: () => void;
  onReset: () => void;
  onAnalyze: () => void;
  onPlay: () => void;
  onPause: () => void;
}

const VideoPlayer = forwardRef<HTMLVideoElement, VideoPlayerProps>(({
  videoUrl,
  isPlaying,
  isAnalyzing,
  onTogglePlayPause,
  onReset,
  onAnalyze,
  onPlay,
  onPause
}, ref) => {
  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white">Video Player</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <video
            ref={ref}
            src={videoUrl}
            className="w-full rounded-lg"
            onPlay={onPlay}
            onPause={onPause}
          />
          <div className="flex items-center justify-center space-x-4 mt-4">
            <Button onClick={onTogglePlayPause} variant="outline">
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
            <Button onClick={onReset} variant="outline">
              <RotateCcw className="h-4 w-4" />
            </Button>
            <Button 
              onClick={onAnalyze} 
              disabled={isAnalyzing}
              className="bg-green-500 hover:bg-green-600"
            >
              {isAnalyzing ? 'Analyzing...' : 'Comprehensive Analysis'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

VideoPlayer.displayName = 'VideoPlayer';

export default VideoPlayer;
