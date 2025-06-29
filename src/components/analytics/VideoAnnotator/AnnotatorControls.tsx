
import { Button } from '@/components/ui/button';
import { Download, Loader2 } from 'lucide-react';

interface AnnotatorControlsProps {
  isProcessing: boolean;
  processedVideoUrl: string | null;
  onCreateAnnotatedVideo: () => void;
  onDownloadVideo: () => void;
}

const AnnotatorControls = ({ 
  isProcessing, 
  processedVideoUrl, 
  onCreateAnnotatedVideo, 
  onDownloadVideo 
}: AnnotatorControlsProps) => {
  return (
    <div className="flex gap-4">
      <Button
        onClick={onCreateAnnotatedVideo}
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
          onClick={onDownloadVideo}
          className="bg-green-500 hover:bg-green-600"
        >
          <Download className="h-4 w-4 mr-2" />
          Download Annotated Video
        </Button>
      )}
    </div>
  );
};

export default AnnotatorControls;
