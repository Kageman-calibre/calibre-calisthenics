
import { AnalysisType } from './types';

interface AnalysisTypeSelectorProps {
  activeType: AnalysisType;
  onTypeChange: (type: AnalysisType) => void;
}

const AnalysisTypeSelector = ({ activeType, onTypeChange }: AnalysisTypeSelectorProps) => {
  const analysisTypes = [
    { id: 'balance' as const, label: 'Push/Pull Balance' },
    { id: 'progression' as const, label: 'Skill Progression' },
    { id: 'volume' as const, label: 'Unilateral Balance' },
  ];

  return (
    <div className="flex gap-2">
      {analysisTypes.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => onTypeChange(id)}
          className={`px-4 py-2 rounded-lg transition-colors ${
            activeType === id
              ? 'bg-orange-500 text-white'
              : 'bg-slate-800 text-gray-300 hover:bg-slate-700'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default AnalysisTypeSelector;
