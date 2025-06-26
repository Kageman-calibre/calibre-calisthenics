
import SearchBar from "./filters/SearchBar";
import FilterHeader from "./filters/FilterHeader";
import FilterControls from "./filters/FilterControls";
import FilterSummary from "./filters/FilterSummary";

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
      <SearchBar 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <FilterHeader 
        activeFilterCount={activeFilterCount}
        hasActiveFilters={hasActiveFilters}
        onClearFilters={onClearFilters}
      />

      <FilterControls
        selectedFocus={selectedFocus}
        setSelectedFocus={setSelectedFocus}
        selectedDuration={selectedDuration}
        setSelectedDuration={setSelectedDuration}
        selectedEquipment={selectedEquipment}
        setSelectedEquipment={setSelectedEquipment}
        selectedTimeRange={selectedTimeRange}
        setSelectedTimeRange={setSelectedTimeRange}
        showCompletedOnly={showCompletedOnly}
        setShowCompletedOnly={setShowCompletedOnly}
        focusAreas={focusAreas}
        durations={durations}
        equipment={equipment}
        timeRanges={timeRanges}
      />
      
      <FilterSummary
        filteredCount={filteredCount}
        totalCount={totalCount}
        hasActiveFilters={hasActiveFilters}
        activeFilterCount={activeFilterCount}
      />
    </div>
  );
};

export default ProgramFilters;
