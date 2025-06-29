
export const getVideoSupport = () => {
  const supportedTypes = ['video/webm;codecs=vp9', 'video/webm;codecs=vp8', 'video/webm'];
  let mimeType = 'video/webm';
  
  for (const type of supportedTypes) {
    if (MediaRecorder.isTypeSupported(type)) {
      mimeType = type;
      console.log('Using MIME type:', mimeType);
      break;
    }
  }
  
  return { mimeType };
};

export const formatTime = (seconds: number): string => {
  if (seconds < 60) {
    return `${seconds}s`;
  } else {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  }
};

export const loadVideoMetadata = (video: HTMLVideoElement): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    const timeout = setTimeout(() => {
      reject(new Error('Video metadata loading timeout'));
    }, 15000);

    const onLoadedMetadata = () => {
      console.log('Video metadata loaded successfully');
      clearTimeout(timeout);
      video.removeEventListener('loadedmetadata', onLoadedMetadata);
      video.removeEventListener('error', onError);
      resolve();
    };

    const onError = (e: Event) => {
      console.error('Video loading error:', e);
      clearTimeout(timeout);
      video.removeEventListener('loadedmetadata', onLoadedMetadata);
      video.removeEventListener('error', onError);
      reject(new Error('Failed to load video'));
    };

    video.addEventListener('loadedmetadata', onLoadedMetadata);
    video.addEventListener('error', onError);
  });
};

export const seekToBeginning = (video: HTMLVideoElement): Promise<void> => {
  return new Promise<void>((resolve) => {
    const onSeeked = () => {
      video.removeEventListener('seeked', onSeeked);
      resolve();
    };
    video.addEventListener('seeked', onSeeked);
    video.currentTime = 0;
  });
};
