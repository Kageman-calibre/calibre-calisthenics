
import { Search, Filter } from "lucide-react";

interface ProgramFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
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
  filteredCount: number;
  totalCount: number;
  onClearFilters: () => void;
}

const ProgramFilters = ({
  searchTerm,
  setSearchTerm,
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
  timeRanges,
  filteredCount,
  totalCount,
  onClearFilters
}: ProgramFiltersProps) => {
  const hasActiveFilters = searchTerm || selectedFocus !== "all" || selectedDuration !== "all" || selectedEquipment !== "all" || selectedTimeRange !== "all" || showCompletedOnly;

  return (
    <div className="mb-12 space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search programs, exercises, or focus areas..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-600/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500/50 text-lg"
        />
      </div>

      {/* Filter Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Focus Filter */}
        <select
          value={selectedFocus}
          onChange={(e) => setSelectedFocus(e.target.value)}
          className="px-4 py-2 bg-slate-800/50 border border-slate-600/30 rounded-xl text-white focus:outline-none focus:border-emerald-500/50"
        >
          <option value="all">All Focus Areas</option>
          {focusAreas.map(focus => (
            <option key={focus} value={focus}>{focus}</option>
          ))}
        </select>
        
        {/* Duration Filter */}
        <select
          value={selectedDuration}
          onChange={(e) => setSelectedDuration(e.target.value)}
          className="px-4 py-2 bg-slate-800/50 border border-slate-600/30 rounded-xl text-white focus:outline-none focus:border-emerald-500/50"
        >
          <option value="all">All Durations</option>
          {durations.map(duration => (
            <option key={duration} value={duration}>{duration}</option>
          ))}
        </select>

        {/* Equipment Filter */}
        <select
          value={selectedEquipment}
          onChange={(e) => setSelectedEquipment(e.target.value)}
          className="px-4 py-2 bg-slate-800/50 border border-slate-600/30 rounded-xl text-white focus:outline-none focus:border-emerald-500/50"
        >
          <option value="all">All Equipment</option>
          {equipment.map(eq => (
            <option key={eq} value={eq}>{eq}</option>
          ))}
        </select>

        {/* Time Range Filter */}
        <select
          value={selectedTimeRange}
          onChange={(e) => setSelectedTimeRange(e.target.value)}
          className="px-4 py-2 bg-slate-800/50 border border-slate-600/30 rounded-xl text-white focus:outline-none focus:border-emerald-500/50"
        >
          <option value="all">All Time Ranges</option>
          {timeRanges.map(time => (
            <option key={time} value={time}>{time}</option>
          ))}
        </select>

        {/* Completion Filter */}
        <label className="flex items-center space-x-2 px-4 py-2 bg-slate-800/50 border border-slate-600/30 rounded-xl text-white cursor-pointer">
          <input
            type="checkbox"
            checked={showCompletedOnly}
            onChange={(e) => setShowCompletedOnly(e.target.checked)}
            className="rounded text-emerald-500 focus:ring-emerald-500"
          />
          <span className="text-sm">Completed Only</span>
        </label>
      </div>
      
      {/* Filter Summary */}
      <div className="flex items-center justify-between text-sm text-gray-400">
        <div>
          Showing {filteredCount} of {totalCount} programs
        </div>
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="text-emerald-400 hover:text-emerald-300 transition-colors flex items-center space-x-1"
          >
            <Filter className="h-3 w-3" />
            <span>Clear all filters</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default ProgramFilters;
