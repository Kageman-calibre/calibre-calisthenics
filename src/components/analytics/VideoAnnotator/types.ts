
export interface AnalysisResult {
  exercise: string;
  formScore: number;
  repCount: number;
  tempo: string;
  feedback: string[];
  suggestions: string[];
  keyFrames: number[];
}

export interface VideoAnnotatorProps {
  videoUrl: string;
  analysisResult: AnalysisResult;
}
