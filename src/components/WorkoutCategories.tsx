
import { Users, Zap, Trophy, Target } from "lucide-react";

const WorkoutCategories = () => {
  const categories = [
    {
      id: "beginner",
      title: "Beginner",
      description: "Start your calisthenics journey with foundational movements",
      icon: Users,
      color: "from-green-500 to-green-600",
      exercises: ["Push-ups", "Squats", "Planks", "Pull-ups"],
      duration: "15-30 min"
    },
    {
      id: "intermediate",
      title: "Intermediate",
      description: "Progress to more challenging compound movements",
      icon: Zap,
      color: "from-orange-500 to-orange-600",
      exercises: ["Archer Push-ups", "Pistol Squats", "L-sits", "Muscle-ups"],
      duration: "30-45 min"
    },
    {
      id: "advanced",
      title: "Advanced",
      description: "Master elite-level skills and strength movements",
      icon: Trophy,
      color: "from-red-500 to-red-600",
      exercises: ["One-arm Push-ups", "Human Flag", "Planche", "Front Lever"],
      duration: "45-60 min"
    },
    {
      id: "skills",
      title: "Skills",
      description: "Learn impressive calisthenics skills and flow",
      icon: Target,
      color: "from-purple-500 to-purple-600",
      exercises: ["Handstand", "Backflip", "Kip-up", "Flow Combos"],
      duration: "20-40 min"
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Choose Your Path
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Select your skill level and start building strength, mobility, and impressive skills
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <div
                key={category.id}
                className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-orange-500/50 transition-all duration-300 transform hover:scale-105 cursor-pointer group"
              >
                <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${category.color} mb-4`}>
                  <IconComponent className="h-6 w-6 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">
                  {category.title}
                </h3>
                
                <p className="text-gray-400 mb-4 text-sm">
                  {category.description}
                </p>
                
                <div className="mb-4">
                  <div className="text-sm text-gray-500 mb-2">Featured Exercises:</div>
                  <div className="flex flex-wrap gap-1">
                    {category.exercises.map((exercise, index) => (
                      <span
                        key={index}
                        className="text-xs bg-slate-700 text-gray-300 px-2 py-1 rounded-full"
                      >
                        {exercise}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="text-sm text-orange-400 font-medium">
                  Duration: {category.duration}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WorkoutCategories;
