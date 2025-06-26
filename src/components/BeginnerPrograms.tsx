
import { Calendar, Clock, Target, Users, ChevronRight, Play, Filter, Search } from "lucide-react";
import { useState } from "react";
import { beginnerPrograms, BeginnerProgram } from "../data/beginnerPrograms";

const BeginnerPrograms = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFocus, setSelectedFocus] = useState("all");
  const [selectedDuration, setSelectedDuration] = useState("all");

  // Get unique focus areas and durations for filters
  const focusAreas = [...new Set(beginnerPrograms.flatMap(p => p.focus))];
  const durations = [...new Set(beginnerPrograms.map(p => p.duration))].sort();

  // Filter programs based on search and filters
  const filteredPrograms = beginnerPrograms.filter(program => {
    const matchesSearch = program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         program.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFocus = selectedFocus === "all" || program.focus.includes(selectedFocus);
    const matchesDuration = selectedDuration === "all" || program.duration === selectedDuration;
    
    return matchesSearch && matchesFocus && matchesDuration;
  });

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner": return "bg-emerald-500";
      case "Intermediate": return "bg-orange-500";
      case "Advanced": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-2 mb-6">
            <Calendar className="h-4 w-4 text-emerald-400" />
            <span className="text-emerald-400 text-sm font-medium">24 Beginner Programs</span>
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

        {/* Search and Filters */}
        <div className="mb-12 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search programs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-800/50 border border-slate-600/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500/50"
              />
            </div>
            
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
          </div>
          
          <div className="text-sm text-gray-400">
            Showing {filteredPrograms.length} of {beginnerPrograms.length} programs
          </div>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPrograms.map((program) => (
            <div
              key={program.id}
              className="group bg-gradient-to-br from-slate-800/60 to-slate-700/40 backdrop-blur-lg rounded-3xl overflow-hidden border border-slate-600/30 hover:border-emerald-500/40 transition-all duration-500 transform hover:scale-[1.02] cursor-pointer"
            >
              <div className="relative">
                <img
                  src={program.image}
                  alt={program.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent"></div>
                
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold text-white ${getLevelColor(program.level)}`}>
                    {program.level}
                  </span>
                </div>

                <div className="absolute top-4 right-4">
                  <div className="bg-slate-900/70 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Play className="h-4 w-4 text-emerald-400" />
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                  {program.name}
                </h3>
                
                <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                  {program.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {program.focus.slice(0, 3).map((focus, index) => (
                    <span
                      key={index}
                      className="text-xs bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded-full border border-emerald-500/20"
                    >
                      {focus}
                    </span>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                  <div className="flex items-center space-x-2 text-gray-400">
                    <Clock className="h-4 w-4" />
                    <span>{program.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-400">
                    <Target className="h-4 w-4" />
                    <span>{program.workoutsPerWeek}/week</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-400">
                    <Users className="h-4 w-4" />
                    <span>{program.totalWorkouts} workouts</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-400">
                    <Filter className="h-4 w-4" />
                    <span>{program.equipment.join(", ")}</span>
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-emerald-500/10 to-green-500/10 hover:from-emerald-500 hover:to-green-500 border border-emerald-500/30 hover:border-transparent text-emerald-400 hover:text-white font-medium py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 group/btn">
                  <span>Start Program</span>
                  <ChevronRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredPrograms.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg mb-4">No programs found matching your criteria</div>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedFocus("all");
                setSelectedDuration("all");
              }}
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
