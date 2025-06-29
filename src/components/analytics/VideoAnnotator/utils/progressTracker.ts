
export class ProgressTracker {
  private startTime: number;
  private onProgressUpdate: (progress: number) => void;
  private onTimeUpdate: (timeRemaining: number | null) => void;

  constructor(
    onProgressUpdate: (progress: number) => void,
    onTimeUpdate: (timeRemaining: number | null) => void
  ) {
    this.startTime = Date.now();
    this.onProgressUpdate = onProgressUpdate;
    this.onTimeUpdate = onTimeUpdate;
  }

  updateProgress(video: HTMLVideoElement) {
    if (video.duration && video.currentTime >= 0) {
      const progress = Math.min((video.currentTime / video.duration) * 100, 99);
      this.onProgressUpdate(progress);

      // Calculate time estimation
      const now = Date.now();
      const elapsed = now - this.startTime;
      const processingRate = progress / elapsed;
      
      if (progress > 1 && processingRate > 0) {
        const remainingProgress = 100 - progress;
        const estimatedRemainingMs = remainingProgress / processingRate;
        this.onTimeUpdate(Math.ceil(estimatedRemainingMs / 1000));
      }
    }
  }

  reset() {
    this.startTime = Date.now();
    this.onProgressUpdate(0);
    this.onTimeUpdate(null);
  }
}
