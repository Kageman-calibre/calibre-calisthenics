
import { Calendar } from "lucide-react";
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { beginnerPrograms, BeginnerProgram } from "../data/beginnerPrograms";
import { useProgramProgress } from "../hooks/useProgramProgress";
import ProgramFilters from "./programs/ProgramFilters";
import ProgramCard from "./programs/ProgramCard";

const BeginnerPrograms = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFocus, setSelectedFocus] = useState("all");
  const [selectedDuration, setSelectedDuration] = useState("all");
  const [selectedEquipment, setSelectedEquipment] = useState("all");
  const [selectedTimeRange, setSelectedTimeRange] = useState("all");
  const [showCompletedOnly, setShowCompletedOnly] = useState(false);
  
  const { programProgress, loading, updateProgress } = useProgramProgress();

  // Get unique filter options
  const filterOptions = useMemo(() => ({
    focusAreas: [...new Set(beginnerPrograms.flatMap(p => p.focus))],
    durations: [...new Set(beginnerPrograms.map(p => p.duration))].sort(),
    equipment: [...new Set(beginnerPrograms.flatMap(p => p.equipment))],
    timeRanges: ["15 min", "30 min", "45 min", "60+ min"]
  }), []);

  // Enhanced filtering logic
  const filteredPrograms = useMemo(() => {
    return beginnerPrograms.filter(program => {
      const matchesSearch = program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           program.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           program.focus.some(f => f.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesFocus = selectedFocus === "all" || program.focus.includes(selectedFocus);
      const matchesDuration = selectedDuration === "all" || program.duration === selectedDuration;
      const matchesEquipment = selectedEquipment === "all" || program.equipment.includes(selectedEquipment);
      
      // Time range matching based on typical workout duration
      const matchesTimeRange = selectedTimeRange === "all" || (() => {
        const avgWorkoutTime = program.weeklySchedule?.[0]?.workouts?.[0]?.duration || 30;
        switch (selectedTimeRange) {
          case "15 min": return avgWorkoutTime <= 15;
          case "30 min": return avgWorkoutTime > 15 && avgWorkoutTime <= 30;
          case "45 min": return avgWorkoutTime > 30 && avgWorkoutTime <= 45;
          case "60+ min": return avgWorkoutTime > 45;
          default: return true;
        }
      })();

      const progress = programProgress[program.id];
      const matchesCompletion = !showCompletedOnly || (progress?.isCompleted || false);
      
      return matchesSearch && matchesFocus && matchesDuration && matchesEquipment && matchesTimeRange && matchesCompletion;
    });
  }, [searchTerm, selectedFocus, selectedDuration, selectedEquipment, selectedTimeRange, showCompletedOnly, programProgress]);

  const clearAllFilters = () => {
    setSearchTerm("");
    setSelectedFocus("all");
    setSelectedDuration("all");
    setSelectedEquipment("all");
    setSelectedTimeRange("all");
    setShowCompletedOnly(false);
  };

  const handleStartProgram = async (programId: string) => {
    const program = beginnerPrograms.find(p => p.id === programId);
    if (program) {
      try {
        await updateProgress(programId, program.name);
        
        // Show success toast
        toast({
          title: "Program Started! 🎯",
          description: `You've started "${program.name}". Let's begin your fitness journey!`,
        });
        
        // Navigate to the program detail page or workout studio
        navigate(`/programs/${programId}`);
      } catch (error) {
        console.error('Error starting program:', error);
        toast({
          title: "Error",
          description: "Failed to start the program. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-2 mb-6">
            <Calendar className="h-4 w-4 text-emerald-400" />
            <span className="text-emerald-400 text-sm font-medium">{beginnerPrograms.length} Beginner Programs</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Beginner
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-500">
              Programs
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Start your fitness journey with our comprehensive collection of beginner-friendly programs designed to build strength, flexibility, and confidence
          </p>
        </div>

        {/* Enhanced Filters */}
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
          focusAreas={filterOptions.focusAreas}
          durations={filterOptions.durations}
          equipment={filterOptions.equipment}
          timeRanges={filterOptions.timeRanges}
          filteredCount={filteredPrograms.length}
          totalCount={beginnerPrograms.length}
          onClearFilters={clearAllFilters}
        />

        {/* Programs Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg">Loading your progress...</div>
          </div>
        ) : (
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
        )}

        {/* No Results */}
        {!loading && filteredPrograms.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg mb-4">No programs found matching your criteria</div>
            <button
              onClick={clearAllFilters}
              className="text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default BeginnerPrograms;
