
import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import VideoAnalyticsHeader from './VideoAnalyticsHeader';
import VideoUpload from './VideoUpload';
import VideoPlayer from './VideoPlayer';
import QuickAnalysis from './QuickAnalysis';
import AdvancedMovementAnalysis from './AdvancedMovementAnalysis';
import EnhancedFeedbackSystem from './EnhancedFeedbackSystem';
import VideoAnnotator from './VideoAnnotator';
import { useVideoAnalysis } from './useVideoAnalysis';

const VideoAnalytics = () => {
  const [uploadedVideo, setUploadedVideo] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const {
    isAnalyzing,
    analysisProgress,
    analysisResult,
    advancedAnalysis,
    enhancedFeedback,
    analyzeVideo,
    resetAnalysis
  } = useVideoAnalysis();

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const videoUrl = URL.createObjectURL(file);
      setUploadedVideo(videoUrl);
      resetAnalysis();
    }
  };

  const handlePlayback = (timestamp: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = timestamp;
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const resetVideo = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  const handleUploadNew = () => {
    setUploadedVideo(null);
    resetAnalysis();
  };

  return (
    <div className="space-y-8">
      <VideoAnalyticsHeader />

      {!uploadedVideo && <VideoUpload onVideoUpload={handleVideoUpload} />}

      {uploadedVideo && (
        <div className="grid lg:grid-cols-2 gap-8">
          <VideoPlayer
            ref={videoRef}
            videoUrl={uploadedVideo}
            isPlaying={isPlaying}
            isAnalyzing={isAnalyzing}
            onTogglePlayPause={togglePlayPause}
            onReset={resetVideo}
            onAnalyze={analyzeVideo}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />

          <QuickAnalysis
            isAnalyzing={isAnalyzing}
            analysisProgress={analysisProgress}
            analysisResult={analysisResult}
          />
        </div>
      )}

      {advancedAnalysis && (
        <AdvancedMovementAnalysis analysisResult={advancedAnalysis} />
      )}

      {enhancedFeedback && (
        <EnhancedFeedbackSystem 
          feedbackData={enhancedFeedback} 
          onPlayback={handlePlayback}
        />
      )}

      {analysisResult && uploadedVideo && (
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Video Annotation & Download</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300 mb-4">
              Create an annotated version of your video with comprehensive analysis overlays including form scores, 
              movement analysis, real-time feedback, and visual indicators.
            </p>
            <VideoAnnotator videoUrl={uploadedVideo} analysisResult={analysisResult} />
          </CardContent>
        </Card>
      )}

      {uploadedVideo && (
        <div className="text-center">
          <Button onClick={handleUploadNew} variant="outline">
            Upload New Video
          </Button>
        </div>
      )}
    </div>
  );
};

export default VideoAnalytics;
