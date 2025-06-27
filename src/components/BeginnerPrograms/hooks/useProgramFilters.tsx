
import { useState, useEffect } from "react";
import { beginnerPrograms } from "../../../data/beginnerPrograms";
import { useProgramProgress } from "../../../hooks/useProgramProgress";

export const useProgramFilters = () => {
  const [filteredPrograms, setFilteredPrograms] = useState(beginnerPrograms);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFocus, setSelectedFocus] = useState("all");
  const [selectedDuration, setSelectedDuration] = useState("all");
  const [selectedEquipment, setSelectedEquipment] = useState("all");
  const [selectedTimeRange, setSelectedTimeRange] = useState("all");
  const [showCompletedOnly, setShowCompletedOnly] = useState(false);
  const { programProgress } = useProgramProgress();

  // Filter options
  const focusAreas = ["all", "Strength", "Cardio", "Flexibility", "Full Body"];
  const durations = ["all", "4 weeks", "6 weeks", "8 weeks", "12 weeks"];
  const equipment = ["all", "Bodyweight", "Dumbbells", "Gym", "Minimal Equipment"];
  const timeRanges = ["all", "20-30 min", "30-45 min", "45-60 min", "60+ min"];

  // Apply filters to programs
  const applyFilters = () => {
    let filtered = [...beginnerPrograms];

    if (searchTerm) {
      filtered = filtered.filter(program => 
        program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        program.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (Array.isArray(program.focus) 
          ? program.focus.some((f: string) => f.toLowerCase().includes(searchTerm.toLowerCase()))
          : (program.focus as string).toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (selectedFocus !== "all") {
      filtered = filtered.filter(program => 
        Array.isArray(program.focus) 
          ? (program.focus as string[]).includes(selectedFocus)
          : program.focus === selectedFocus
      );
    }

    if (selectedDuration !== "all") {
      filtered = filtered.filter(program => program.duration === selectedDuration);
    }

    if (selectedEquipment !== "all") {
      filtered = filtered.filter(program => 
        Array.isArray(program.equipment) 
          ? (program.equipment as string[]).includes(selectedEquipment)
          : program.equipment === selectedEquipment
      );
    }

    if (selectedTimeRange !== "all") {
      // Use workoutsPerWeek or another available property since timePerWorkout doesn't exist
      filtered = filtered.filter(program => {
        // For now, we'll skip this filter since the property doesn't exist in the type
        // In a real implementation, we'd need to add this property to the BeginnerProgram type
        return true;
      });
    }

    if (showCompletedOnly) {
      filtered = filtered.filter(program => 
        programProgress[program.id]?.isCompleted === true
      );
    }

    setFilteredPrograms(filtered);
  };

  // Apply filters whenever filter state changes
  useEffect(() => {
    applyFilters();
  }, [searchTerm, selectedFocus, selectedDuration, selectedEquipment, selectedTimeRange, showCompletedOnly, programProgress]);

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedFocus("all");
    setSelectedDuration("all");
    setSelectedEquipment("all");
    setSelectedTimeRange("all");
    setShowCompletedOnly(false);
  };

  return {
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
  };
};
