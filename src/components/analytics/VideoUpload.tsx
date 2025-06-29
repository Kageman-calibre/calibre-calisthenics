
import { useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Upload } from 'lucide-react';

interface VideoUploadProps {
  onVideoUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const VideoUpload = ({ onVideoUpload }: VideoUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardContent className="pt-6">
        <div 
          className="border-2 border-dashed border-slate-600 rounded-lg p-12 text-center hover:border-slate-500 transition-colors cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-white mb-2">Upload Workout Video</h3>
          <p className="text-gray-400 mb-4">
            Drag and drop your video file here, or click to browse
          </p>
          <p className="text-sm text-gray-500">
            Supports MP4, MOV, AVI files up to 100MB
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept="video/*"
            onChange={onVideoUpload}
            className="hidden"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default VideoUpload;
