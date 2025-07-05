
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
      console.log('Starting video processing for:', videoUrl);
      
      // Reset video state
      video.currentTime = 0;
      video.muted = true;
      video.preload = 'metadata';
      
      // Set video source
      video.src = videoUrl;
      if (!videoUrl.startsWith('blob:')) {
        video.crossOrigin = 'anonymous';
      }

      // Wait for video to be ready
      console.log('Loading video metadata...');
      await new Promise<void>((resolve, reject) => {
        const timeout = setTimeout(() => {
          cleanup();
          reject(new Error('Video loading timeout'));
        }, 10000);

        const cleanup = () => {
          clearTimeout(timeout);
          video.removeEventListener('loadedmetadata', onLoaded);
          video.removeEventListener('canplay', onLoaded);
          video.removeEventListener('error', onError);
        };

        const onLoaded = () => {
          if (video.readyState >= 2) {
            cleanup();
            resolve();
          }
        };

        const onError = (error: Event) => {
          cleanup();
          reject(new Error('Failed to load video'));
        };

        video.addEventListener('loadedmetadata', onLoaded);
        video.addEventListener('canplay', onLoaded);
        video.addEventListener('error', onError);

        if (video.readyState >= 2) {
          onLoaded();
        } else {
          video.load();
        }
      });

      console.log('Video loaded successfully');
      console.log('Video dimensions:', video.videoWidth, 'x', video.videoHeight);
      console.log('Video duration:', video.duration, 'seconds');

      // Validate video properties
      if (!video.duration || video.duration <= 0) {
        throw new Error('Invalid video duration');
      }

      // Set canvas dimensions
      const videoWidth = video.videoWidth || 640;
      const videoHeight = video.videoHeight || 480;
      canvas.width = videoWidth;
      canvas.height = videoHeight;

      // Initialize utilities
      const renderer = new CanvasRenderer(canvas, video, analysisResult);
      const progressTracker = new ProgressTracker(
        setProcessingProgress,
        setEstimatedTimeRemaining
      );

      // Start recording first
      console.log('Starting canvas recording...');
      await startRecording(canvas);
      console.log('Recording started successfully');

      // Reset video to beginning
      await seekToBeginning(video);

      // Start video playback
      console.log('Starting video playback...');
      const playPromise = video.play();
      if (playPromise) {
        await playPromise;
      }

      // Animation loop
      let animationId: number;
      let isComplete = false;

      const processFrame = () => {
        if (isComplete || !isProcessing) {
          return;
        }

        // Check if video has ended
        if (video.ended || video.currentTime >= video.duration) {
          console.log('Video playback complete');
          isComplete = true;
          
          // Stop recording and finalize
          console.log('Video ended, stopping recording...');
          stopRecording();
          
          // Wait for recording to finalize, then get URL
          const checkForRecordedVideo = () => {
            console.log('Checking for recorded video...');
            const recordedUrl = getRecordedUrl();
            console.log('Recorded URL:', recordedUrl);
            
            if (recordedUrl) {
              console.log('Processed video URL ready:', recordedUrl);
              setProcessedVideoUrl(recordedUrl);
              setProcessingProgress(100);
              setEstimatedTimeRemaining(0);
              setIsProcessing(false);
            } else {
              console.log('No recorded URL yet, will retry...');
              setTimeout(checkForRecordedVideo, 200);
            }
          };
          
          // Start checking after a brief delay
          setTimeout(checkForRecordedVideo, 300);
          return;
        }

        // Update progress
        progressTracker.updateProgress(video);
        
        // Draw frame
        const shouldContinue = renderer.drawFrame();
        if (!shouldContinue) {
          isComplete = true;
          return;
        }

        // Continue animation
        animationId = requestAnimationFrame(processFrame);
      };

      // Start the animation loop
      animationId = requestAnimationFrame(processFrame);

      // Cleanup function
      const cleanup = () => {
        if (animationId) {
          cancelAnimationFrame(animationId);
        }
        video.pause();
        video.currentTime = 0;
      };

      // Handle video end event
      video.addEventListener('ended', () => {
        console.log('Video ended event fired');
        isComplete = true;
      });

    } catch (error) {
      console.error('Video processing error:', error);
      setIsProcessing(false);
      setProcessingProgress(0);
      setEstimatedTimeRemaining(null);
      
      // Clean up on error
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
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
