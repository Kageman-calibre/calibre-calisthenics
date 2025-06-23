
import { useRef, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Loader2 } from 'lucide-react';

interface AnalysisResult {
  exercise: string;
  formScore: number;
  repCount: number;
  tempo: string;
  feedback: string[];
  suggestions: string[];
  keyFrames: number[];
}

interface VideoAnnotatorProps {
  videoUrl: string;
  analysisResult: AnalysisResult;
}

const VideoAnnotator = ({ videoUrl, analysisResult }: VideoAnnotatorProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedVideoUrl, setProcessedVideoUrl] = useState<string | null>(null);

  const annotateAndDownload = async () => {
    if (!videoRef.current || !canvasRef.current) return;

    setIsProcessing(true);
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d')!;

    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const chunks: Blob[] = [];
    const stream = canvas.captureStream(30); // 30 FPS
    const recorder = new MediaRecorder(stream, { mimeType: 'video/webm' });

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
    };

    // Start recording
    recorder.start();
    video.currentTime = 0;
    video.play();

    let currentRep = 0;
    let lastKeyFrame = 0;

    const drawFrame = () => {
      if (video.paused || video.ended) {
        recorder.stop();
        return;
      }

      const currentTime = video.currentTime;
      
      // Draw video frame
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Draw overlay background
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.fillRect(20, 20, 300, 120);

      // Draw form score
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 24px Arial';
      ctx.fillText(`Form Score: ${analysisResult.formScore}/100`, 30, 50);

      // Determine rep count based on current time
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

      // Show feedback at key moments
      const nearKeyFrame = analysisResult.keyFrames.find(frame => 
        Math.abs(frame - currentTime) < 0.5
      );

      if (nearKeyFrame && nearKeyFrame !== lastKeyFrame) {
        lastKeyFrame = nearKeyFrame;
      }

      // Draw feedback text
      if (currentTime > 2) { // Show feedback after 2 seconds
        const feedbackIndex = Math.floor((currentTime - 2) / 3) % analysisResult.feedback.length;
        const feedback = analysisResult.feedback[feedbackIndex];
        
        if (feedback) {
          // Feedback background
          ctx.fillStyle = 'rgba(34, 197, 94, 0.9)';
          ctx.fillRect(canvas.width - 350, 20, 330, 60);
          
          // Feedback text
          ctx.fillStyle = '#ffffff';
          ctx.font = '16px Arial';
          const words = feedback.split(' ');
          let line = '';
          let y = 45;
          
          for (let n = 0; n < words.length; n++) {
            const testLine = line + words[n] + ' ';
            const metrics = ctx.measureText(testLine);
            const testWidth = metrics.width;
            
            if (testWidth > 310 && n > 0) {
              ctx.fillText(line, canvas.width - 340, y);
              line = words[n] + ' ';
              y += 20;
            } else {
              line = testLine;
            }
          }
          ctx.fillText(line, canvas.width - 340, y);
        }
      }

      // Draw rep markers at key frames
      analysisResult.keyFrames.forEach((frame, index) => {
        if (Math.abs(frame - currentTime) < 0.2) {
          ctx.fillStyle = '#ef4444';
          ctx.fillRect(canvas.width / 2 - 50, canvas.height - 60, 100, 30);
          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 16px Arial';
          ctx.fillText(`Rep ${index + 1}`, canvas.width / 2 - 25, canvas.height - 40);
        }
      });

      requestAnimationFrame(drawFrame);
    };

    // Start drawing frames
    video.addEventListener('loadedmetadata', () => {
      drawFrame();
    });

    if (video.readyState >= 1) {
      drawFrame();
    }
  };

  const downloadAnnotatedVideo = () => {
    if (!processedVideoUrl) return;
    
    const link = document.createElement('a');
    link.href = processedVideoUrl;
    link.download = `${analysisResult.exercise}_analyzed.webm`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-4">
      <div className="hidden">
        <video
          ref={videoRef}
          src={videoUrl}
          muted
          preload="metadata"
        />
        <canvas ref={canvasRef} />
      </div>

      <div className="flex gap-4">
        <Button
          onClick={annotateAndDownload}
          disabled={isProcessing}
          className="bg-blue-500 hover:bg-blue-600"
        >
          {isProcessing ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              Processing...
            </>
          ) : (
            'Create Annotated Video'
          )}
        </Button>

        {processedVideoUrl && (
          <Button
            onClick={downloadAnnotatedVideo}
            className="bg-green-500 hover:bg-green-600"
          >
            <Download className="h-4 w-4 mr-2" />
            Download Annotated Video
          </Button>
        )}
      </div>

      {processedVideoUrl && (
        <div className="mt-4">
          <h4 className="text-white font-medium mb-2">Preview Annotated Video:</h4>
          <video
            src={processedVideoUrl}
            controls
            className="w-full max-w-md rounded-lg"
          />
        </div>
      )}
    </div>
  );
};

export default VideoAnnotator;
