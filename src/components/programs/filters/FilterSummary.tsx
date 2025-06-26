
import { Filter } from "lucide-react";

interface FilterSummaryProps {
  filteredCount: number;
  totalCount: number;
  hasActiveFilters: boolean;
  activeFilterCount: number;
}

const FilterSummary = ({ filteredCount, totalCount, hasActiveFilters, activeFilterCount }: FilterSummaryProps) => {
  return (
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
  );
};

export default FilterSummary;
