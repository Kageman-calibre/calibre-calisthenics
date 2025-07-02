
import { useState, useRef } from 'react';
import { getVideoSupport } from '../utils/videoUtils';

export const useVideoRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const startRecording = (canvas: HTMLCanvasElement): Promise<void> => {
    return new Promise((resolve, reject) => {
      try {
        console.log('Initializing MediaRecorder...');
        
        // Reset chunks
        chunksRef.current = [];
        
        const { mimeType } = getVideoSupport();
        console.log('Using MIME type:', mimeType);
        
        // Get canvas stream with higher frame rate
        const stream = canvas.captureStream(60); // Increased from 30 to 60 FPS
        console.log('Canvas stream created:', stream);
        console.log('Stream tracks:', stream.getTracks().map(t => ({ kind: t.kind, enabled: t.enabled, readyState: t.readyState })));
        
        // Check if stream has video tracks
        if (!stream.getVideoTracks().length) {
          throw new Error('No video tracks in canvas stream');
        }

        const options: MediaRecorderOptions = {
          mimeType,
          videoBitsPerSecond: 2500000 // Increased bitrate for better quality
        };

        // Check if the MIME type is supported
        if (!MediaRecorder.isTypeSupported(mimeType)) {
          console.warn('MIME type not supported, using default');
          delete options.mimeType;
        }

        const recorder = new MediaRecorder(stream, options);
        console.log('MediaRecorder created with state:', recorder.state);

        recorder.ondataavailable = (event) => {
          console.log('Data available:', event.data.size, 'bytes');
          if (event.data && event.data.size > 0) {
            chunksRef.current.push(event.data);
          }
        };

        recorder.onstop = () => {
          console.log('Recording stopped, creating blob from', chunksRef.current.length, 'chunks');
          
          if (chunksRef.current.length === 0) {
            console.error('No chunks recorded - this is the main issue!');
            setIsRecording(false);
            return;
          }

          // Check chunk sizes
          const totalSize = chunksRef.current.reduce((size, chunk) => size + chunk.size, 0);
          console.log('Total recorded data size:', totalSize, 'bytes');

          const finalMimeType = recorder.mimeType || mimeType;
          const blob = new Blob(chunksRef.current, { type: finalMimeType });
          console.log('Created blob:', blob.size, 'bytes, type:', blob.type);
          
          if (blob.size === 0) {
            console.error('Created blob has zero size - recording failed!');
            return;
          }
          
          setRecordedBlob(blob);
          setIsRecording(false);
        };

        recorder.onerror = (event) => {
          console.error('MediaRecorder error:', event);
          setIsRecording(false);
          reject(new Error(`Recording failed: ${(event as any).error?.message || 'Unknown error'}`));
        };

        recorder.onstart = () => {
          console.log('Recording started');
          setIsRecording(true);
        };

        recorderRef.current = recorder;
        
        // Start recording with smaller timeslice for more frequent data events
        console.log('Starting MediaRecorder...');
        recorder.start(250); // Reduced from 100 to 250ms for more stable recording
        
        // Resolve immediately after starting
        resolve();
        
      } catch (error) {
        console.error('Failed to start recording:', error);
        setIsRecording(false);
        reject(error);
      }
    });
  };

  const stopRecording = () => {
    console.log('Stopping recording...');
    if (recorderRef.current && recorderRef.current.state === 'recording') {
      recorderRef.current.stop();
      
      // Stop all tracks in the stream
      const stream = recorderRef.current.stream;
      if (stream) {
        stream.getTracks().forEach(track => {
          track.stop();
        });
      }
    } else {
      console.log('Recorder not in recording state:', recorderRef.current?.state);
    }
  };

  const getRecordedUrl = (): string | null => {
    console.log('getRecordedUrl called, recordedBlob:', recordedBlob);
    if (recordedBlob) {
      console.log('Creating URL from blob - size:', recordedBlob.size, 'type:', recordedBlob.type);
      const url = URL.createObjectURL(recordedBlob);
      console.log('Generated recorded URL:', url);
      return url;
    }
    console.log('No recorded blob available');
    return null;
  };

  const reset = () => {
    console.log('Resetting recorder');
    setRecordedBlob(null);
    setIsRecording(false);
    chunksRef.current = [];
    recorderRef.current = null;
  };

  return {
    isRecording,
    startRecording,
    stopRecording,
    getRecordedUrl,
    reset
  };
};
