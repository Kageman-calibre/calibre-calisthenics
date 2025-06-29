
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
      // Ensure video is loaded
      if (video.readyState < 2) {
        await new Promise<void>((resolve, reject) => {
          const timeout = setTimeout(() => {
            reject(new Error('Video loading timeout'));
          }, 10000);

          const onLoadedData = () => {
            clearTimeout(timeout);
            video.removeEventListener('loadeddata', onLoadedData);
            resolve();
          };

          video.addEventListener('loadeddata', onLoadedData);
          video.load();
        });
      }

      // Set canvas dimensions to match video
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 360;

      console.log('Video dimensions:', canvas.width, 'x', canvas.height);
      console.log('Video duration:', video.duration);

      const chunks: Blob[] = [];
      const stream = canvas.captureStream(30);
      
      // Check if MediaRecorder is supported
      if (!MediaRecorder.isTypeSupported('video/webm')) {
        throw new Error('WebM recording not supported');
      }

      const recorder = new MediaRecorder(stream, { 
        mimeType: 'video/webm',
        videoBitsPerSecond: 2500000 // 2.5 Mbps
      });

      const startTime = Date.now();
      let animationId: number;
      let currentRep = 0;
      let lastKeyFrame = 0;

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
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
      };

      const updateProgress = () => {
        if (video.duration && video.currentTime) {
          const progress = (video.currentTime / video.duration) * 100;
          setProcessingProgress(Math.min(progress, 99)); // Cap at 99% until complete

          // Calculate time estimation
          const now = Date.now();
          const elapsed = now - startTime;
          const processingRate = progress / elapsed; // progress per millisecond
          
          if (progress > 5 && processingRate > 0) {
            const remainingProgress = 100 - progress;
            const estimatedRemainingMs = remainingProgress / processingRate;
            setEstimatedTimeRemaining(Math.ceil(estimatedRemainingMs / 1000));
          }
        }
      };

      const drawFrame = () => {
        if (video.paused || video.ended || !isProcessing) {
          cancelAnimationFrame(animationId);
          recorder.stop();
          return;
        }

        const currentTime = video.currentTime;
        updateProgress();
        
        // Clear canvas and draw video frame
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Draw overlay background
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(20, 20, 300, 120);

        // Draw form score
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 24px Arial';
        ctx.fillText(`Form Score: ${analysisResult.formScore}/100`, 30, 50);

        // Update rep count based on current time
        const newRep = analysisResult.keyFrames.filter(frame => frame <= currentTime).length;
        if (newRep > currentRep) {
          currentRep = newRep;
        }

        // Draw rep counter
        ctx.fillStyle = '#4ade80';
        ctx.font = 'bold 20px Arial';
        ctx.fillText(`Reps: ${currentRep}/${analysisResult.repCount}`, 30, 80);

        // Draw exercise name
        ctx.fillStyle = '#60a5fa';
        ctx.font = '18px Arial';
        ctx.fillText(analysisResult.exercise, 30, 105);

        // Draw tempo
        ctx.fillStyle = '#fbbf24';
        ctx.font = '16px Arial';
        ctx.fillText(`Tempo: ${analysisResult.tempo}`, 30, 125);

        // Show feedback at intervals
        if (currentTime > 2) {
          const feedbackIndex = Math.floor((currentTime - 2) / 3) % analysisResult.feedback.length;
          const feedback = analysisResult.feedback[feedbackIndex];
          
          if (feedback) {
            // Feedback background
            ctx.fillStyle = 'rgba(34, 197, 94, 0.9)';
            ctx.fillRect(canvas.width - 350, 20, 330, 80);
            
            // Feedback text with word wrapping
            ctx.fillStyle = '#ffffff';
            ctx.font = '16px Arial';
            const words = feedback.split(' ');
            let line = '';
            let y = 45;
            
            for (let n = 0; n < words.length; n++) {
              const testLine = line + words[n] + ' ';
              const metrics = ctx.measureText(testLine);
              
              if (metrics.width > 310 && n > 0) {
                ctx.fillText(line.trim(), canvas.width - 340, y);
                line = words[n] + ' ';
                y += 20;
                if (y > 85) break; // Prevent overflow
              } else {
                line = testLine;
              }
            }
            if (line.trim() && y <= 85) {
              ctx.fillText(line.trim(), canvas.width - 340, y);
            }
          }
        }

        // Draw rep markers at key frames
        analysisResult.keyFrames.forEach((frame, index) => {
          if (Math.abs(frame - currentTime) < 0.3) {
            ctx.fillStyle = '#ef4444';
            ctx.fillRect(canvas.width / 2 - 50, canvas.height - 60, 100, 30);
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 16px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(`Rep ${index + 1}`, canvas.width / 2, canvas.height - 40);
            ctx.textAlign = 'left'; // Reset alignment
          }
        });

        animationId = requestAnimationFrame(drawFrame);
      };

      // Start recording
      recorder.start(100); // Collect data every 100ms
      
      // Reset and start video
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
      await video.play();
      drawFrame();

    } catch (error) {
      console.error('Video processing error:', error);
      setIsProcessing(false);
      setProcessingProgress(0);
      // You might want to show a toast notification here
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
