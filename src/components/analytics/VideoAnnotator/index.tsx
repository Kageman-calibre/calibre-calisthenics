
import { useVideoProcessing } from './useVideoProcessing';
import AnnotatorControls from './AnnotatorControls';
import VideoPreview from './VideoPreview';
import { VideoAnnotatorProps } from './types';

const VideoAnnotator = ({ videoUrl, analysisResult }: VideoAnnotatorProps) => {
  const {
    videoRef,
    canvasRef,
    isProcessing,
    processedVideoUrl,
    processVideo
  } = useVideoProcessing();

  const handleCreateAnnotatedVideo = () => {
    processVideo(videoUrl, analysisResult);
  };

  const handleDownloadVideo = () => {
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

      <AnnotatorControls
        isProcessing={isProcessing}
        processedVideoUrl={processedVideoUrl}
        onCreateAnnotatedVideo={handleCreateAnnotatedVideo}
        onDownloadVideo={handleDownloadVideo}
      />

      {processedVideoUrl && (
        <VideoPreview processedVideoUrl={processedVideoUrl} />
      )}
    </div>
  );
};

export default VideoAnnotator;
