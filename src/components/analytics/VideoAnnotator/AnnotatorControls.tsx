
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Download, Loader2 } from 'lucide-react';

interface AnnotatorControlsProps {
  isProcessing: boolean;
  processedVideoUrl: string | null;
  processingProgress?: number;
  estimatedTimeRemaining?: number | null;
  formatTime?: (seconds: number) => string;
  onCreateAnnotatedVideo: () => void;
  onDownloadVideo: () => void;
}

const AnnotatorControls = ({ 
  isProcessing, 
  processedVideoUrl, 
  processingProgress = 0,
  estimatedTimeRemaining,
  formatTime,
  onCreateAnnotatedVideo, 
  onDownloadVideo 
}: AnnotatorControlsProps) => {
  return (
    <div className="space-y-4">
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

      {isProcessing && (
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm text-gray-300">
            <span>Processing video...</span>
            <span>{Math.round(processingProgress)}%</span>
          </div>
          <Progress value={processingProgress} className="w-full" />
          {estimatedTimeRemaining !== null && estimatedTimeRemaining > 0 && formatTime && (
            <div className="text-sm text-gray-400 text-center">
              Estimated time remaining: {formatTime(estimatedTimeRemaining)}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AnnotatorControls;
