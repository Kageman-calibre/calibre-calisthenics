
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { beginnerPrograms } from "../data/beginnerPrograms";
import ProgramCard from "./programs/ProgramCard";
import ProgramFilters from "./programs/ProgramFilters";
import { useProgramProgress } from "../hooks/useProgramProgress";
import { useRPGSystem } from "@/hooks/useRPGSystem";
import { useToast } from "@/hooks/use-toast";
import WorkoutPreparation from "./workout/WorkoutPreparation";
import ExerciseAdjustment from "./workout/ExerciseAdjustment";

const BeginnerPrograms = () => {
  const [filteredPrograms, setFilteredPrograms] = useState(beginnerPrograms);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFocus, setSelectedFocus] = useState("all");
  const [selectedDuration, setSelectedDuration] = useState("all");
  const [selectedEquipment, setSelectedEquipment] = useState("all");
  const [selectedTimeRange, setSelectedTimeRange] = useState("all");
  const [showCompletedOnly, setShowCompletedOnly] = useState(false);
  const [showPreparation, setShowPreparation] = useState(false);
  const [showAdjustments, setShowAdjustments] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<any>(null);
  const { programProgress, updateProgress } = useProgramProgress();
  const { awardXP, awardBadge } = useRPGSystem();
  const { toast } = useToast();
  const navigate = useNavigate();

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
          ? program.focus.some(f => f.toLowerCase().includes(searchTerm.toLowerCase()))
          : program.focus.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (selectedFocus !== "all") {
      filtered = filtered.filter(program => 
        Array.isArray(program.focus) 
          ? program.focus.includes(selectedFocus)
          : program.focus === selectedFocus
      );
    }

    if (selectedDuration !== "all") {
      filtered = filtered.filter(program => program.duration === selectedDuration);
    }

    if (selectedEquipment !== "all") {
      filtered = filtered.filter(program => 
        Array.isArray(program.equipment) 
          ? program.equipment.includes(selectedEquipment)
          : program.equipment === selectedEquipment
      );
    }

    if (selectedTimeRange !== "all") {
      // Use the correct property name from the program data
      filtered = filtered.filter(program => program.timePerWorkout === selectedTimeRange);
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

  const handleStartProgram = (programId: string) => {
    const program = beginnerPrograms.find(p => p.id === programId);
    if (!program) return;

    setSelectedProgram(program);
    setShowPreparation(true);

    // Award XP for starting a new program
    awardXP('new_exercise');
    
    toast({
      title: "Program Selected! 🎯",
      description: `Get ready to start ${program.name}. Complete your preparation checklist!`,
    });
  };

  const handleWorkoutStart = async () => {
    if (!selectedProgram) return;
    
    // Award XP for actually starting the workout
    awardXP('workout_complete', 0.3);
    
    // Check if this is their first program
    const hasAnyProgress = Object.keys(programProgress).length > 0;
    if (!hasAnyProgress) {
      awardBadge('program_starter', 'Program Starter', 'Started your first fitness program!', 'common');
    }
    
    // Update program progress
    await updateProgress(selectedProgram.id, selectedProgram.name);
    
    setShowPreparation(false);
    
    toast({
      title: "Program Started! 🚀",
      description: `${selectedProgram.name} is now active. You've earned XP for starting!`,
    });
    
    // Navigate to program detail page
    navigate(`/programs/${selectedProgram.id}`);
  };

  const handleAdjustExercises = () => {
    setShowPreparation(false);
    setShowAdjustments(true);
  };

  const handleSaveAdjustments = (adjustments: any) => {
    console.log('Program adjustments saved:', adjustments);
    
    // Award XP for customizing program
    awardXP('new_exercise', 0.2);
    
    toast({
      title: "Program Customized! ⚙️",
      description: "Your program adjustments have been saved. You earned XP for personalization!",
    });
    
    setShowAdjustments(false);
    setShowPreparation(true);
  };

  const handleCancelPreparation = () => {
    setShowPreparation(false);
    setSelectedProgram(null);
  };

  const handleCancelAdjustments = () => {
    setShowAdjustments(false);
    setShowPreparation(true);
  };

  // Mock exercise data for adjustments from selected program
  const getExercisesForAdjustment = () => {
    if (!selectedProgram?.weeklySchedule?.[0]?.workouts?.[0]?.exercises) return [];
    
    return selectedProgram.weeklySchedule[0].workouts[0].exercises.map((ex: any) => ({
      id: ex.id || ex.name.toLowerCase().replace(/\s+/g, '-'),
      name: ex.name,
      defaultSets: ex.sets || 3,
      defaultReps: ex.reps || '10-12',
      defaultRest: ex.restTime || '60s'
    }));
  };

  return (
    <>
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-emerald-500/10 to-green-500/10 border border-emerald-500/20 rounded-full px-4 py-2 mb-6">
              <span className="text-emerald-400 text-sm font-medium">Beginner Friendly</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Start Your
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400">
                Fitness Journey
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Carefully designed programs that grow with you. Each workout earns XP and unlocks achievements in your fitness RPG journey.
            </p>
          </div>

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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPrograms.map((program) => (
              <ProgramCard
                key={program.id}
                program={program}
                progress={programProgress[program.id]}
                onStartProgram={handleStartProgram}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Preparation and Adjustment Modals */}
      {showPreparation && selectedProgram && (
        <WorkoutPreparation
          programName={selectedProgram.name}
          onStartWorkout={handleWorkoutStart}
          onAdjustExercises={handleAdjustExercises}
          onCancel={handleCancelPreparation}
        />
      )}

      {showAdjustments && selectedProgram && (
        <ExerciseAdjustment
          exercises={getExercisesForAdjustment()}
          onSave={handleSaveAdjustments}
          onCancel={handleCancelAdjustments}
        />
      )}
    </>
  );
};

export default BeginnerPrograms;
