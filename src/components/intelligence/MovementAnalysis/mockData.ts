
import { PushPullData, ProgressionData, UnilateralBalance } from './types';

export const mockPushPullData: PushPullData[] = [
  { week: 'Week 1', push: 120, pull: 80, ratio: 1.5 },
  { week: 'Week 2', push: 140, pull: 90, ratio: 1.56 },
  { week: 'Week 3', push: 130, pull: 100, ratio: 1.3 },
  { week: 'Week 4', push: 150, pull: 120, ratio: 1.25 },
  { week: 'Week 5', push: 160, pull: 140, ratio: 1.14 },
  { week: 'Week 6', push: 170, pull: 150, ratio: 1.13 }
];

export const mockProgressionData: ProgressionData[] = [
  { exercise: 'Push-ups', current: 15, target: 20, progress: 75 },
  { exercise: 'Pull-ups', current: 6, target: 10, progress: 60 },
  { exercise: 'Handstand', current: 20, target: 60, progress: 33 },
  { exercise: 'L-Sit', current: 8, target: 30, progress: 27 },
  { exercise: 'Pistol Squat', current: 3, target: 8, progress: 38 }
];

export const mockUnilateralBalance: UnilateralBalance[] = [
  { movement: 'Single Arm Push-up Prep', left: 5, right: 8, imbalance: 37.5 },
  { movement: 'Pistol Squat', left: 2, right: 4, imbalance: 50 },
  { movement: 'Single Arm Hang', left: 15, right: 20, imbalance: 25 },
  { movement: 'Archer Push-up', left: 6, right: 9, imbalance: 33 }
];
