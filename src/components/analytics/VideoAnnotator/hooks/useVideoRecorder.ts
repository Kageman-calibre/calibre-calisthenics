
import { useState, useRef } from 'react';
import { getVideoSupport } from '../utils/videoUtils';

export const useVideoRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);

  const startRecording = (canvas: HTMLCanvasElement): Promise<void> => {
    return new Promise((resolve, reject) => {
      try {
        const { mimeType } = getVideoSupport();
        const chunks: Blob[] = [];
        const stream = canvas.captureStream(30);
        const recorder = new MediaRecorder(stream, { 
          mimeType,
          videoBitsPerSecond: 1000000 // Corrected property name
        });

        recorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            chunks.push(event.data);
            console.log('Recorded chunk:', event.data.size, 'bytes');
          }
        };

        recorder.onstop = () => {
          console.log('Recording stopped, creating blob...');
          const blob = new Blob(chunks, { type: mimeType });
          setRecordedBlob(blob);
          setIsRecording(false);
          console.log('Recording complete, blob size:', blob.size);
          resolve();
        };

        recorder.onerror = (event) => {
          console.error('MediaRecorder error:', event);
          setIsRecording(false);
          reject(new Error('Recording failed'));
        };

        recorderRef.current = recorder;
        recorder.start(200);
        setIsRecording(true);
        console.log('Recording started...');
        resolve();
      } catch (error) {
        console.error('Failed to start recording:', error);
        reject(error);
      }
    });
  };

  const stopRecording = () => {
    if (recorderRef.current && isRecording) {
      recorderRef.current.stop();
    }
  };

  const getRecordedUrl = (): string | null => {
    return recordedBlob ? URL.createObjectURL(recordedBlob) : null;
  };

  const reset = () => {
    setRecordedBlob(null);
    setIsRecording(false);
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
