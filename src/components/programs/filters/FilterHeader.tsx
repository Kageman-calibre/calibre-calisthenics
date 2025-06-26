
import { SlidersHorizontal, X } from "lucide-react";

interface FilterHeaderProps {
  activeFilterCount: number;
  hasActiveFilters: boolean;
  onClearFilters: () => void;
}

const FilterHeader = ({ activeFilterCount, hasActiveFilters, onClearFilters }: FilterHeaderProps) => {
  return (
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
  );
};

export default FilterHeader;
