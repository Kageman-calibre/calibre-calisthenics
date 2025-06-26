
import { Calendar, Clock, Target, Users, ChevronRight, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Program {
  id: string;
  name: string;
  description: string;
  duration: string;
  level: string;
  workoutsPerWeek: number;
  totalWorkouts: number;
  image: string;
  tags: string[];
  color: string;
  route?: string;
}

const TrainingSchedules = () => {
  const navigate = useNavigate();

  const programs: Program[] = [
    {
      id: "beginner-collection",
      name: "Beginner Collection",
      description: "Choose from 24 different beginner programs tailored to your specific goals and preferences.",
      duration: "4-12 weeks",
      level: "Beginner",
      workoutsPerWeek: 2,
      totalWorkouts: 24,
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      tags: ["Variety", "Flexible", "Comprehensive"],
      color: "from-emerald-500 to-green-600",
      route: "/beginner-programs"
    },
    {
      id: "foundation",
      name: "Foundation Builder",
      description: "Perfect for beginners starting their calisthenics journey. Build basic strength and movement patterns.",
      duration: "8 weeks",
      level: "Beginner",
      workoutsPerWeek: 3,
      totalWorkouts: 24,
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      tags: ["Push", "Pull", "Legs", "Core"],
      color: "from-emerald-500 to-green-600"
    },
    {
      id: "strength",
      name: "Strength Progression",
      description: "Intermediate program focusing on building raw strength and progressing to advanced movements.",
      duration: "12 weeks",
      level: "Intermediate",
      workoutsPerWeek: 4,
      totalWorkouts: 48,
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      tags: ["Push", "Pull", "Legs", "Skills"],
      color: "from-orange-500 to-red-600"
    },
    {
      id: "elite",
      name: "Elite Performance",
      description: "Advanced program for mastering the most challenging calisthenics movements and skills.",
      duration: "16 weeks",
      level: "Advanced",
      workoutsPerWeek: 5,
      totalWorkouts: 80,
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      tags: ["Push", "Pull", "Legs", "Skills", "Flow"],
      color: "from-purple-500 to-pink-600"
    }
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner": return "bg-emerald-500";
      case "Intermediate": return "bg-orange-500";
      case "Advanced": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const handleProgramClick = (program: Program) => {
    if (program.route) {
      navigate(program.route);
    } else {
      // Handle other program navigation
      console.log(`Navigate to program: ${program.id}`);
    }
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 mb-6">
            <Calendar className="h-4 w-4 text-blue-400" />
            <span className="text-blue-400 text-sm font-medium">Structured Training Programs</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Training
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
              Schedules
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Scientifically designed programs that systematically build your strength, skills, and physique through progressive calisthenics training
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-8">
          {programs.map((program) => (
            <div
              key={program.id}
              className="group bg-gradient-to-br from-slate-800/60 to-slate-700/40 backdrop-blur-lg rounded-3xl overflow-hidden border border-slate-600/30 hover:border-orange-500/40 transition-all duration-500 transform hover:scale-[1.02] cursor-pointer"
              onClick={() => handleProgramClick(program)}
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
                    <Play className="h-4 w-4 text-orange-400" />
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">
                  {program.name}
                </h3>
                
                <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                  {program.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {program.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="text-xs bg-slate-700/50 text-gray-300 px-2 py-1 rounded-full border border-slate-600/30"
                    >
                      {tag}
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
                </div>

                <button className="w-full bg-gradient-to-r from-orange-500/10 to-red-500/10 hover:from-orange-500 hover:to-red-500 border border-orange-500/30 hover:border-transparent text-orange-400 hover:text-white font-medium py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 group/btn">
                  <span>View Program</span>
                  <ChevronRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrainingSchedules;
