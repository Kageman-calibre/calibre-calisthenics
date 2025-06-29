
import { useState } from 'react';
import AnalysisTypeSelector from './AnalysisTypeSelector';
import PushPullAnalysis from './PushPullAnalysis';
import SkillProgression from './SkillProgression';
import UnilateralAnalysis from './UnilateralAnalysis';
import { AnalysisType } from './types';
import { mockPushPullData, mockProgressionData, mockUnilateralBalance } from './mockData';

const MovementAnalysis = () => {
  const [analysisType, setAnalysisType] = useState<AnalysisType>('balance');

  return (
    <div className="space-y-6">
      <AnalysisTypeSelector 
        activeType={analysisType} 
        onTypeChange={setAnalysisType} 
      />

      {analysisType === 'balance' && (
        <PushPullAnalysis data={mockPushPullData} />
      )}

      {analysisType === 'progression' && (
        <SkillProgression data={mockProgressionData} />
      )}

      {analysisType === 'volume' && (
        <UnilateralAnalysis data={mockUnilateralBalance} />
      )}
    </div>
  );
};

export default MovementAnalysis;
