
import { Share2 } from 'lucide-react';

interface PhotoPreviewProps {
  photoTaken: string | null;
  onTakeAnother: () => void;
}

const PhotoPreview = ({ photoTaken, onTakeAnother }: PhotoPreviewProps) => {
  if (!photoTaken) return null;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My Fitness Progress',
        text: 'Check out my workout progress!'
      });
    } else {
      alert('Sharing not supported, but photo is saved to your workout history!');
    }
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
      <h3 className="text-xl font-semibold text-white mb-4">Progress Photo Saved!</h3>
      <div className="text-center">
        <img
          src={photoTaken}
          alt="Progress photo"
          className="rounded-lg max-w-full h-64 object-cover mx-auto mb-4"
        />
        <div className="space-x-4">
          <button
            onClick={onTakeAnother}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
          >
            Take Another
          </button>
          <button
            onClick={handleShare}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg inline-flex items-center"
          >
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </button>
        </div>
      </div>
    </div>
  );
};

export default PhotoPreview;
