
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
    processingProgress,
    estimatedTimeRemaining,
    formatTime,
    processVideo
  } = useVideoProcessing();

  const handleCreateAnnotatedVideo = () => {
    processVideo(videoUrl, analysisResult);
  };

  const handleDownloadVideo = () => {
    console.log('Download button clicked');
    console.log('processedVideoUrl:', processedVideoUrl);
    
    if (!processedVideoUrl) {
      console.error('No processed video URL available for download');
      
      // Fallback: try to create a single frame image if canvas has content
      if (canvasRef.current) {
        console.log('Attempting fallback image download...');
        canvasRef.current.toBlob((blob) => {
          if (blob) {
            const imageUrl = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = imageUrl;
            link.download = `${analysisResult.exercise}_frame.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(imageUrl);
            console.log('Downloaded single frame as fallback');
          }
        }, 'image/png');
      }
      return;
    }
    
    console.log('Creating download link...');
    const link = document.createElement('a');
    link.href = processedVideoUrl;
    link.download = `${analysisResult.exercise}_analyzed.webm`;
    document.body.appendChild(link);
    console.log('Triggering download...');
    link.click();
    document.body.removeChild(link);
    console.log('Download triggered successfully');
  };

  return (
    <div className="space-y-4">
      <div style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}>
        <video
          ref={videoRef}
          src={videoUrl}
          muted
          preload="metadata"
          style={{ width: '640px', height: '480px' }}
        />
        <canvas ref={canvasRef} style={{ width: '640px', height: '480px' }} />
      </div>

      <AnnotatorControls
        isProcessing={isProcessing}
        processedVideoUrl={processedVideoUrl}
        processingProgress={processingProgress}
        estimatedTimeRemaining={estimatedTimeRemaining}
        formatTime={formatTime}
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
