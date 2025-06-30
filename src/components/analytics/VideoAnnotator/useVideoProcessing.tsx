
import { useState, useRef } from 'react';
import { AnalysisResult } from './types';
import { loadVideoMetadata, seekToBeginning, formatTime } from './utils/videoUtils';
import { CanvasRenderer } from './utils/canvasRenderer';
import { ProgressTracker } from './utils/progressTracker';
import { useVideoRecorder } from './hooks/useVideoRecorder';

export const useVideoProcessing = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedVideoUrl, setProcessedVideoUrl] = useState<string | null>(null);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [estimatedTimeRemaining, setEstimatedTimeRemaining] = useState<number | null>(null);

  const { startRecording, stopRecording, getRecordedUrl, reset: resetRecorder } = useVideoRecorder();

  const processVideo = async (videoUrl: string, analysisResult: AnalysisResult) => {
    if (!videoRef.current || !canvasRef.current) {
      console.error('Video or canvas ref not available');
      return;
    }

    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    setIsProcessing(true);
    setProcessingProgress(0);
    setEstimatedTimeRemaining(null);
    resetRecorder();

    try {
      // Set video source - don't set crossOrigin for blob URLs
      video.src = videoUrl;
      if (!videoUrl.startsWith('blob:')) {
        video.crossOrigin = 'anonymous';
      }
      video.muted = true;
      video.preload = 'metadata';

      console.log('Loading video...', videoUrl);
      
      // Improved video loading with better error handling
      await new Promise<void>((resolve, reject) => {
        const handleLoadedData = () => {
          console.log('Video loaded successfully');
          video.removeEventListener('loadeddata', handleLoadedData);
          video.removeEventListener('error', handleError);
          resolve();
        };

        const handleError = (error: Event) => {
          console.error('Video loading error:', error);
          video.removeEventListener('loadeddata', handleLoadedData);
          video.removeEventListener('error', handleError);
          reject(new Error('Failed to load video'));
        };

        video.addEventListener('loadeddata', handleLoadedData);
        video.addEventListener('error', handleError);

        // Force load if not already loading
        if (video.readyState < 2) {
          video.load();
        } else {
          handleLoadedData();
        }
      });

      // Set canvas dimensions based on video
      const videoWidth = video.videoWidth || 640;
      const videoHeight = video.videoHeight || 480;
      canvas.width = videoWidth;
      canvas.height = videoHeight;

      console.log('Video dimensions:', videoWidth, 'x', videoHeight);
      console.log('Video duration:', video.duration);

      // Initialize utilities
      const renderer = new CanvasRenderer(canvas, video, analysisResult);
      const progressTracker = new ProgressTracker(
        setProcessingProgress,
        setEstimatedTimeRemaining
      );

      let animationId: number;
      let isComplete = false;

      const drawFrame = () => {
        if (!isProcessing || video.ended || isComplete) {
          console.log('Stopping animation - processing:', isProcessing, 'ended:', video.ended, 'complete:', isComplete);
          cancelAnimationFrame(animationId);
          
          if (!isComplete) {
            isComplete = true;
            stopRecording();
            
            // Set the processed video URL
            setTimeout(() => {
              const recordedUrl = getRecordedUrl();
              if (recordedUrl) {
                setProcessedVideoUrl(recordedUrl);
                setProcessingProgress(100);
                setEstimatedTimeRemaining(0);
                console.log('Video processing complete, URL:', recordedUrl);
              }
              setIsProcessing(false);
            }, 100);
          }
          return;
        }

        progressTracker.updateProgress(video);
        
        const shouldContinue = renderer.drawFrame();
        if (!shouldContinue) {
          isComplete = true;
          return;
        }

        animationId = requestAnimationFrame(drawFrame);
      };

      // Start recording
      console.log('Starting canvas recording...');
      await startRecording(canvas);
      
      // Reset video and start playback
      await seekToBeginning(video);
      console.log('Starting video playback...');
      
      // Ensure video plays
      const playPromise = video.play();
      if (playPromise !== undefined) {
        await playPromise;
      }
      
      drawFrame();

    } catch (error) {
      console.error('Video processing error:', error);
      setIsProcessing(false);
      setProcessingProgress(0);
      setEstimatedTimeRemaining(null);
    }
  };

  return {
    videoRef,
    canvasRef,
    isProcessing,
    processedVideoUrl,
    processingProgress,
    estimatedTimeRemaining,
    formatTime,
    processVideo
  };
};
