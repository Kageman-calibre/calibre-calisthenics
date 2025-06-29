
interface VideoPreviewProps {
  processedVideoUrl: string;
}

const VideoPreview = ({ processedVideoUrl }: VideoPreviewProps) => {
  return (
    <div className="mt-4">
      <h4 className="text-white font-medium mb-2">Preview Annotated Video:</h4>
      <video
        src={processedVideoUrl}
        controls
        className="w-full max-w-md rounded-lg"
      />
    </div>
  );
};

export default VideoPreview;
