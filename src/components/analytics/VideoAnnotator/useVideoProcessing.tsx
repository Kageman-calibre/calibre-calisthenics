
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
      // Set video source and load metadata
      video.src = videoUrl;
      video.crossOrigin = 'anonymous';
      video.muted = true;
      video.preload = 'metadata';

      console.log('Loading video...');
      await loadVideoMetadata(video);

      // Set canvas dimensions
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

      const drawFrame = () => {
        if (!isProcessing || video.ended) {
          console.log('Stopping animation - processing:', isProcessing, 'ended:', video.ended);
          cancelAnimationFrame(animationId);
          stopRecording();
          
          // Set the processed video URL
          const recordedUrl = getRecordedUrl();
          if (recordedUrl) {
            setProcessedVideoUrl(recordedUrl);
            setProcessingProgress(100);
            setEstimatedTimeRemaining(0);
          }
          setIsProcessing(false);
          return;
        }

        progressTracker.updateProgress(video);
        
        const shouldContinue = renderer.drawFrame();
        if (!shouldContinue) {
          setIsProcessing(false);
          return;
        }

        animationId = requestAnimationFrame(drawFrame);
      };

      // Start recording
      await startRecording(canvas);
      
      // Reset video and start playback
      await seekToBeginning(video);
      console.log('Starting video playback...');
      await video.play();
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
