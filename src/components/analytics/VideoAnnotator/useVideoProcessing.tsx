
import { useState, useRef } from 'react';
import { AnalysisResult } from './types';

export const useVideoProcessing = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedVideoUrl, setProcessedVideoUrl] = useState<string | null>(null);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [estimatedTimeRemaining, setEstimatedTimeRemaining] = useState<number | null>(null);

  const processVideo = async (videoUrl: string, analysisResult: AnalysisResult) => {
    if (!videoRef.current || !canvasRef.current) {
      console.error('Video or canvas ref not available');
      return;
    }

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      console.error('Canvas context not available');
      return;
    }

    setIsProcessing(true);
    setProcessingProgress(0);
    setEstimatedTimeRemaining(null);

    try {
      // Set video source and wait for it to load
      video.src = videoUrl;
      video.crossOrigin = 'anonymous';
      video.muted = true;
      video.preload = 'metadata';

      console.log('Loading video...');
      
      // Wait for video metadata to load with proper error handling
      await new Promise<void>((resolve, reject) => {
        const timeout = setTimeout(() => {
          reject(new Error('Video metadata loading timeout'));
        }, 15000);

        const onLoadedMetadata = () => {
          console.log('Video metadata loaded successfully');
          clearTimeout(timeout);
          video.removeEventListener('loadedmetadata', onLoadedMetadata);
          video.removeEventListener('error', onError);
          resolve();
        };

        const onError = (e: Event) => {
          console.error('Video loading error:', e);
          clearTimeout(timeout);
          video.removeEventListener('loadedmetadata', onLoadedMetadata);
          video.removeEventListener('error', onError);
          reject(new Error('Failed to load video'));
        };

        video.addEventListener('loadedmetadata', onLoadedMetadata);
        video.addEventListener('error', onError);
      });

      // Set canvas dimensions based on video
      const videoWidth = video.videoWidth || 640;
      const videoHeight = video.videoHeight || 480;
      canvas.width = videoWidth;
      canvas.height = videoHeight;

      console.log('Video dimensions:', videoWidth, 'x', videoHeight);
      console.log('Video duration:', video.duration);

      // Check MediaRecorder support
      const supportedTypes = ['video/webm;codecs=vp9', 'video/webm;codecs=vp8', 'video/webm'];
      let mimeType = 'video/webm';
      
      for (const type of supportedTypes) {
        if (MediaRecorder.isTypeSupported(type)) {
          mimeType = type;
          console.log('Using MIME type:', mimeType);
          break;
        }
      }

      const chunks: Blob[] = [];
      const stream = canvas.captureStream(30);
      const recorder = new MediaRecorder(stream, { 
        mimeType,
        videoBitsPerRate: 1000000 // 1 Mbps
      });

      const startTime = Date.now();
      let animationId: number;
      let currentRep = 0;

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
          console.log('Recorded chunk:', event.data.size, 'bytes');
        }
      };

      recorder.onstop = () => {
        console.log('Recording stopped, creating blob...');
        const blob = new Blob(chunks, { type: mimeType });
        const url = URL.createObjectURL(blob);
        setProcessedVideoUrl(url);
        setIsProcessing(false);
        setProcessingProgress(100);
        setEstimatedTimeRemaining(0);
        console.log('Recording complete, blob size:', blob.size);
      };

      recorder.onerror = (event) => {
        console.error('MediaRecorder error:', event);
        setIsProcessing(false);
        setProcessingProgress(0);
      };

      const updateProgress = () => {
        if (video.duration && video.currentTime >= 0) {
          const progress = Math.min((video.currentTime / video.duration) * 100, 99);
          setProcessingProgress(progress);

          // Calculate time estimation
          const now = Date.now();
          const elapsed = now - startTime;
          const processingRate = progress / elapsed;
          
          if (progress > 1 && processingRate > 0) {
            const remainingProgress = 100 - progress;
            const estimatedRemainingMs = remainingProgress / processingRate;
            setEstimatedTimeRemaining(Math.ceil(estimatedRemainingMs / 1000));
          }
        }
      };

      const drawFrame = () => {
        if (!isProcessing || video.ended) {
          console.log('Stopping animation - processing:', isProcessing, 'ended:', video.ended);
          cancelAnimationFrame(animationId);
          recorder.stop();
          return;
        }

        const currentTime = video.currentTime;
        updateProgress();
        
        // Clear canvas and draw video frame
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        try {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        } catch (error) {
          console.warn('Failed to draw video frame:', error);
        }

        // Draw overlay background
        ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        ctx.fillRect(20, 20, 320, 140);

        // Draw form score
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 28px Arial';
        ctx.fillText(`Form Score: ${analysisResult.formScore}/100`, 30, 55);

        // Update rep count based on current time
        const newRep = analysisResult.keyFrames.filter(frame => frame <= currentTime).length;
        if (newRep > currentRep) {
          currentRep = newRep;
        }

        // Draw rep counter
        ctx.fillStyle = '#4ade80';
        ctx.font = 'bold 24px Arial';
        ctx.fillText(`Reps: ${currentRep}/${analysisResult.repCount}`, 30, 90);

        // Draw exercise name
        ctx.fillStyle = '#60a5fa';
        ctx.font = '20px Arial';
        ctx.fillText(analysisResult.exercise, 30, 120);

        // Draw tempo
        ctx.fillStyle = '#fbbf24';
        ctx.font = '18px Arial';
        ctx.fillText(`Tempo: ${analysisResult.tempo}`, 30, 145);

        // Show feedback at intervals
        if (currentTime > 1 && analysisResult.feedback.length > 0) {
          const feedbackIndex = Math.floor(currentTime / 4) % analysisResult.feedback.length;
          const feedback = analysisResult.feedback[feedbackIndex];
          
          if (feedback) {
            // Feedback background
            ctx.fillStyle = 'rgba(34, 197, 94, 0.9)';
            ctx.fillRect(canvas.width - 380, 20, 360, 100);
            
            // Feedback text with word wrapping
            ctx.fillStyle = '#ffffff';
            ctx.font = '16px Arial';
            const words = feedback.split(' ');
            let line = '';
            let y = 45;
            
            for (let n = 0; n < words.length; n++) {
              const testLine = line + words[n] + ' ';
              const metrics = ctx.measureText(testLine);
              
              if (metrics.width > 340 && n > 0) {
                ctx.fillText(line.trim(), canvas.width - 370, y);
                line = words[n] + ' ';
                y += 22;
                if (y > 105) break;
              } else {
                line = testLine;
              }
            }
            if (line.trim() && y <= 105) {
              ctx.fillText(line.trim(), canvas.width - 370, y);
            }
          }
        }

        // Draw rep markers at key frames
        analysisResult.keyFrames.forEach((frame, index) => {
          if (Math.abs(frame - currentTime) < 0.5) {
            ctx.fillStyle = '#ef4444';
            ctx.fillRect(canvas.width / 2 - 60, canvas.height - 70, 120, 40);
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 18px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(`Rep ${index + 1}`, canvas.width / 2, canvas.height - 45);
            ctx.textAlign = 'left';
          }
        });

        animationId = requestAnimationFrame(drawFrame);
      };

      // Start recording
      console.log('Starting recording...');
      recorder.start(200); // Collect data every 200ms
      
      // Reset video to beginning
      video.currentTime = 0;
      
      // Wait for seek to complete
      await new Promise<void>((resolve) => {
        const onSeeked = () => {
          video.removeEventListener('seeked', onSeeked);
          resolve();
        };
        video.addEventListener('seeked', onSeeked);
      });

      // Start playback and drawing
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

  const formatTime = (seconds: number): string => {
    if (seconds < 60) {
      return `${seconds}s`;
    } else {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${minutes}m ${remainingSeconds}s`;
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
