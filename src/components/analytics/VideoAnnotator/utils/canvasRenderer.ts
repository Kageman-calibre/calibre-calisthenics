
import { AnalysisResult } from '../types';

export class CanvasRenderer {
  private ctx: CanvasRenderingContext2D;
  private canvas: HTMLCanvasElement;
  private video: HTMLVideoElement;
  private analysisResult: AnalysisResult;
  private currentRep: number = 0;

  constructor(
    canvas: HTMLCanvasElement, 
    video: HTMLVideoElement, 
    analysisResult: AnalysisResult
  ) {
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw new Error('Canvas context not available');
    }
    
    this.ctx = ctx;
    this.canvas = canvas;
    this.video = video;
    this.analysisResult = analysisResult;
  }

  drawFrame(): boolean {
    const currentTime = this.video.currentTime;
    
    // Clear canvas and draw video frame
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    try {
      this.ctx.drawImage(this.video, 0, 0, this.canvas.width, this.canvas.height);
    } catch (error) {
      console.warn('Failed to draw video frame:', error);
    }

    this.drawOverlays(currentTime);
    
    return !this.video.ended;
  }

  private drawOverlays(currentTime: number) {
    this.drawInfoPanel();
    this.drawFeedback(currentTime);
    this.drawRepMarkers(currentTime);
  }

  private drawInfoPanel() {
    const currentTime = this.video.currentTime;
    
    // Update rep count based on current time
    const newRep = this.analysisResult.keyFrames.filter(frame => frame <= currentTime).length;
    if (newRep > this.currentRep) {
      this.currentRep = newRep;
    }

    // Draw overlay background
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    this.ctx.fillRect(20, 20, 320, 140);

    // Draw form score
    this.ctx.fillStyle = '#ffffff';
    this.ctx.font = 'bold 28px Arial';
    this.ctx.fillText(`Form Score: ${this.analysisResult.formScore}/100`, 30, 55);

    // Draw rep counter
    this.ctx.fillStyle = '#4ade80';
    this.ctx.font = 'bold 24px Arial';
    this.ctx.fillText(`Reps: ${this.currentRep}/${this.analysisResult.repCount}`, 30, 90);

    // Draw exercise name
    this.ctx.fillStyle = '#60a5fa';
    this.ctx.font = '20px Arial';
    this.ctx.fillText(this.analysisResult.exercise, 30, 120);

    // Draw tempo
    this.ctx.fillStyle = '#fbbf24';
    this.ctx.font = '18px Arial';
    this.ctx.fillText(`Tempo: ${this.analysisResult.tempo}`, 30, 145);
  }

  private drawFeedback(currentTime: number) {
    if (currentTime > 1 && this.analysisResult.feedback.length > 0) {
      const feedbackIndex = Math.floor(currentTime / 4) % this.analysisResult.feedback.length;
      const feedback = this.analysisResult.feedback[feedbackIndex];
      
      if (feedback) {
        // Feedback background
        this.ctx.fillStyle = 'rgba(34, 197, 94, 0.9)';
        this.ctx.fillRect(this.canvas.width - 380, 20, 360, 100);
        
        // Feedback text with word wrapping
        this.ctx.fillStyle = '#ffffff';
        this.ctx.font = '16px Arial';
        this.wrapText(feedback, this.canvas.width - 370, 45, 340, 22);
      }
    }
  }

  private wrapText(text: string, x: number, y: number, maxWidth: number, lineHeight: number) {
    const words = text.split(' ');
    let line = '';
    let currentY = y;
    
    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = this.ctx.measureText(testLine);
      
      if (metrics.width > maxWidth && n > 0) {
        this.ctx.fillText(line.trim(), x, currentY);
        line = words[n] + ' ';
        currentY += lineHeight;
        if (currentY > y + 60) break; // Limit to 3 lines
      } else {
        line = testLine;
      }
    }
    if (line.trim() && currentY <= y + 60) {
      this.ctx.fillText(line.trim(), x, currentY);
    }
  }

  private drawRepMarkers(currentTime: number) {
    this.analysisResult.keyFrames.forEach((frame, index) => {
      if (Math.abs(frame - currentTime) < 0.5) {
        this.ctx.fillStyle = '#ef4444';
        this.ctx.fillRect(this.canvas.width / 2 - 60, this.canvas.height - 70, 120, 40);
        this.ctx.fillStyle = '#ffffff';
        this.ctx.font = 'bold 18px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(`Rep ${index + 1}`, this.canvas.width / 2, this.canvas.height - 45);
        this.ctx.textAlign = 'left';
      }
    });
  }
}
