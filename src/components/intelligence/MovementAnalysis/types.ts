
export interface PushPullData {
  week: string;
  push: number;
  pull: number;
  ratio: number;
}

export interface ProgressionData {
  exercise: string;
  current: number;
  target: number;
  progress: number;
}

export interface UnilateralBalance {
  movement: string;
  left: number;
  right: number;
  imbalance: number;
}

export type AnalysisType = 'balance' | 'progression' | 'volume';
