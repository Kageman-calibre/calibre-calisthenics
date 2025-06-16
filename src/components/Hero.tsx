
import { Play, ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-blue-600/10 rounded-3xl"></div>
      
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in">
            Master Your
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
              {" "}Body
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto animate-fade-in">
            Transform your physique with bodyweight training. No gym needed - just dedication, consistency, and the right guidance.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in">
            <button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-orange-500/25 flex items-center space-x-2">
              <Play className="h-5 w-5" />
              <span>Start Training</span>
            </button>
            
            <button className="border-2 border-slate-400 hover:border-white text-slate-300 hover:text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center space-x-2">
              <span>View Workouts</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-orange-500/50 transition-all duration-300">
            <div className="text-3xl font-bold text-orange-500 mb-2">500+</div>
            <div className="text-gray-300">Exercises</div>
          </div>
          
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-orange-500/50 transition-all duration-300">
            <div className="text-3xl font-bold text-orange-500 mb-2">50+</div>
            <div className="text-gray-300">Workout Programs</div>
          </div>
          
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-orange-500/50 transition-all duration-300">
            <div className="text-3xl font-bold text-orange-500 mb-2">100K+</div>
            <div className="text-gray-300">Community Members</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
