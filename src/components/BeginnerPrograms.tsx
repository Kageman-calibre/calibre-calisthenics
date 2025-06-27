
import ProgramFilters from "./programs/ProgramFilters";
import ProgramsHeader from "./BeginnerPrograms/components/ProgramsHeader";
import ProgramsGrid from "./BeginnerPrograms/components/ProgramsGrid";
import ProgramModals from "./BeginnerPrograms/components/ProgramModals";
import { useProgramFilters } from "./BeginnerPrograms/hooks/useProgramFilters";
import { useProgramActions } from "./BeginnerPrograms/hooks/useProgramActions";
import { beginnerPrograms } from "../data/beginnerPrograms";

const BeginnerPrograms = () => {
  const {
    filteredPrograms,
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
    handleClearFilters
  } = useProgramFilters();

  const {
    showPreparation,
    showAdjustments,
    selectedProgram,
    handleStartProgram,
    handleWorkoutStart,
    handleAdjustExercises,
    handleSaveAdjustments,
    handleCancelPreparation,
    handleCancelAdjustments,
    getExercisesForAdjustment
  } = useProgramActions();

  return (
    <>
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <ProgramsHeader />

          <ProgramFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
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
            filteredCount={filteredPrograms.length}
            totalCount={beginnerPrograms.length}
            onClearFilters={handleClearFilters}
          />

          <ProgramsGrid
            programs={filteredPrograms}
            onStartProgram={handleStartProgram}
          />
        </div>
      </section>

      <ProgramModals
        showPreparation={showPreparation}
        showAdjustments={showAdjustments}
        selectedProgram={selectedProgram}
        onStartWorkout={handleWorkoutStart}
        onAdjustExercises={handleAdjustExercises}
        onCancelPreparation={handleCancelPreparation}
        onSaveAdjustments={handleSaveAdjustments}
        onCancelAdjustments={handleCancelAdjustments}
        getExercisesForAdjustment={getExercisesForAdjustment}
      />
    </>
  );
};

export default BeginnerPrograms;
