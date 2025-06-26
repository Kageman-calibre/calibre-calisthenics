
import { Zap } from "lucide-react";

interface FilterControlsProps {
  selectedFocus: string;
  setSelectedFocus: (focus: string) => void;
  selectedDuration: string;
  setSelectedDuration: (duration: string) => void;
  selectedEquipment: string;
  setSelectedEquipment: (equipment: string) => void;
  selectedTimeRange: string;
  setSelectedTimeRange: (timeRange: string) => void;
  showCompletedOnly: boolean;
  setShowCompletedOnly: (show: boolean) => void;
  focusAreas: string[];
  durations: string[];
  equipment: string[];
  timeRanges: string[];
}

const FilterControls = ({
  selectedFocus,
  setSelectedFocus,
  selectedDuration,
  setSelectedDuration,
  selectedEquipment,
  setSelectedEquipment,
  selectedTimeRange,
  setSelectedTimeRange,
  showCompletedOnly,
  setShowCompletedOnly,
  focusAreas,
  durations,
  equipment,
  timeRanges
}: FilterControlsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      {/* Focus Filter */}
      <div className="relative">
        <select
          value={selectedFocus}
          onChange={(e) => setSelectedFocus(e.target.value)}
          className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600/30 rounded-xl text-white focus:outline-none focus:border-emerald-500/50 focus:bg-slate-800/70 transition-all duration-300 appearance-none cursor-pointer hover:bg-slate-800/60"
        >
          <option value="all">🎯 All Focus Areas</option>
          {focusAreas.map(focus => (
            <option key={focus} value={focus}>{focus}</option>
          ))}
        </select>
        {selectedFocus !== "all" && (
          <div className="absolute top-1 right-1 w-2 h-2 bg-emerald-500 rounded-full"></div>
        )}
      </div>
      
      {/* Duration Filter */}
      <div className="relative">
        <select
          value={selectedDuration}
          onChange={(e) => setSelectedDuration(e.target.value)}
          className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600/30 rounded-xl text-white focus:outline-none focus:border-emerald-500/50 focus:bg-slate-800/70 transition-all duration-300 appearance-none cursor-pointer hover:bg-slate-800/60"
        >
          <option value="all">📅 All Durations</option>
          {durations.map(duration => (
            <option key={duration} value={duration}>{duration}</option>
          ))}
        </select>
        {selectedDuration !== "all" && (
          <div className="absolute top-1 right-1 w-2 h-2 bg-emerald-500 rounded-full"></div>
        )}
      </div>

      {/* Equipment Filter */}
      <div className="relative">
        <select
          value={selectedEquipment}
          onChange={(e) => setSelectedEquipment(e.target.value)}
          className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600/30 rounded-xl text-white focus:outline-none focus:border-emerald-500/50 focus:bg-slate-800/70 transition-all duration-300 appearance-none cursor-pointer hover:bg-slate-800/60"
        >
          <option value="all">🏋️ All Equipment</option>
          {equipment.map(eq => (
            <option key={eq} value={eq}>{eq}</option>
          ))}
        </select>
        {selectedEquipment !== "all" && (
          <div className="absolute top-1 right-1 w-2 h-2 bg-emerald-500 rounded-full"></div>
        )}
      </div>

      {/* Time Range Filter */}
      <div className="relative">
        <select
          value={selectedTimeRange}
          onChange={(e) => setSelectedTimeRange(e.target.value)}
          className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600/30 rounded-xl text-white focus:outline-none focus:border-emerald-500/50 focus:bg-slate-800/70 transition-all duration-300 appearance-none cursor-pointer hover:bg-slate-800/60"
        >
          <option value="all">⏱️ All Time Ranges</option>
          {timeRanges.map(time => (
            <option key={time} value={time}>{time}</option>
          ))}
        </select>
        {selectedTimeRange !== "all" && (
          <div className="absolute top-1 right-1 w-2 h-2 bg-emerald-500 rounded-full"></div>
        )}
      </div>

      {/* Completion Filter */}
      <label className="relative flex items-center space-x-3 px-4 py-3 bg-slate-800/50 border border-slate-600/30 rounded-xl text-white cursor-pointer hover:bg-slate-800/60 transition-all duration-300 group">
        <input
          type="checkbox"
          checked={showCompletedOnly}
          onChange={(e) => setShowCompletedOnly(e.target.checked)}
          className="sr-only"
        />
        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200 ${
          showCompletedOnly 
            ? 'bg-emerald-500 border-emerald-500' 
            : 'border-gray-500 group-hover:border-emerald-400'
        }`}>
          {showCompletedOnly && (
            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          )}
        </div>
        <span className="text-sm font-medium flex items-center space-x-1">
          <span>Completed Only</span>
          {showCompletedOnly && <Zap className="h-3 w-3 text-emerald-400" />}
        </span>
      </label>
    </div>
  );
};

export default FilterControls;
