
import { Search, Filter, X, SlidersHorizontal, Zap } from "lucide-react";

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

  const activeFilterCount = [
    searchTerm,
    selectedFocus !== "all",
    selectedDuration !== "all",
    selectedEquipment !== "all",
    selectedTimeRange !== "all",
    showCompletedOnly
  ].filter(Boolean).length;

  return (
    <div className="mb-12 space-y-6">
      {/* Enhanced Search Bar */}
      <div className="relative group">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-emerald-400 transition-colors" />
        <input
          type="text"
          placeholder="Search programs, exercises, or focus areas..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-12 py-4 bg-slate-800/50 border border-slate-600/30 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500/50 focus:bg-slate-800/70 text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm("")}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Filter Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <SlidersHorizontal className="h-5 w-5 text-emerald-400" />
          <h3 className="text-lg font-semibold text-white">Filters</h3>
          {activeFilterCount > 0 && (
            <div className="bg-emerald-500 text-white text-xs px-2 py-1 rounded-full font-medium">
              {activeFilterCount}
            </div>
          )}
        </div>
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="text-emerald-400 hover:text-emerald-300 transition-colors flex items-center space-x-1 text-sm font-medium"
          >
            <X className="h-4 w-4" />
            <span>Clear all</span>
          </button>
        )}
      </div>

      {/* Enhanced Filter Grid */}
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
      
      {/* Enhanced Filter Summary */}
      <div className="flex items-center justify-between p-4 bg-slate-800/30 rounded-xl border border-slate-600/20">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-300">
              Showing <span className="font-semibold text-white">{filteredCount}</span> of <span className="font-semibold text-white">{totalCount}</span> programs
            </span>
          </div>
          {filteredCount !== totalCount && (
            <div className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full">
              Filtered
            </div>
          )}
        </div>
        
        {hasActiveFilters && (
          <div className="flex items-center space-x-2 text-xs text-gray-400">
            <Filter className="h-3 w-3" />
            <span>{activeFilterCount} filter{activeFilterCount !== 1 ? 's' : ''} active</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgramFilters;
