
export const loadVideoMetadata = (video: HTMLVideoElement): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (video.readyState >= 1) {
      resolve();
      return;
    }

    const handleLoadedMetadata = () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('error', handleError);
      resolve();
    };

    const handleError = (error: Event) => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('error', handleError);
      reject(new Error('Failed to load video metadata'));
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('error', handleError);
  });
};

export const seekToBeginning = (video: HTMLVideoElement): Promise<void> => {
  return new Promise((resolve) => {
    if (video.currentTime === 0) {
      resolve();
      return;
    }

    const handleSeeked = () => {
      video.removeEventListener('seeked', handleSeeked);
      resolve();
    };

    video.addEventListener('seeked', handleSeeked);
    video.currentTime = 0;
  });
};

export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export const getVideoSupport = () => {
  const canvas = document.createElement('canvas');
  const canCaptureStream = 'captureStream' in canvas;
  
  if (!canCaptureStream) {
    throw new Error('Canvas capture stream not supported');
  }

  // Check for MediaRecorder support and preferred mime types
  const mimeTypes = [
    'video/webm;codecs=vp9',
    'video/webm;codecs=vp8',
    'video/webm',
    'video/mp4'
  ];

  let supportedMimeType = '';
  for (const mimeType of mimeTypes) {
    if (MediaRecorder.isTypeSupported(mimeType)) {
      supportedMimeType = mimeType;
      break;
    }
  }

  if (!supportedMimeType) {
    supportedMimeType = 'video/webm'; // fallback
  }

  return {
    canCaptureStream,
    mimeType: supportedMimeType
  };
};
