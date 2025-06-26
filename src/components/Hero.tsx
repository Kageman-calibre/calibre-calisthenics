
import { Play, ArrowRight, Star, Users, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "./auth/AuthProvider";

const Hero = () => {
  const { user } = useAuth();

  return (
    <section className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background gradient with subtle pattern */}
      <div className="absolute inset-0 gradient-black-burgundy"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,215,0,0.1),transparent_50%)]"></div>
      
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-gold/10 border border-gold/30 rounded-full px-4 py-2 mb-8 animate-fade-in">
            <Star className="h-4 w-4 text-gold" />
            <span className="text-gold text-sm font-medium">Professional Calisthenics Training</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 leading-tight animate-fade-in">
            Build Your
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-gold via-gold to-burgundy">
              Ultimate Body
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed animate-fade-in">
            Master calisthenics with structured programs, expert guidance, and a supportive community. 
            Transform your strength, flexibility, and skills—no gym required.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in">
            {user ? (
              <>
                <button className="group gradient-gold-burgundy hover:opacity-90 text-black font-bold py-5 px-10 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-gold/25 flex items-center space-x-3">
                  <Play className="h-6 w-6 group-hover:scale-110 transition-transform" />
                  <span className="text-lg">Start Your Journey</span>
                </button>
                
                <Link
                  to="/programs"
                  className="group border-2 border-gold hover:border-white text-gold hover:text-white font-bold py-5 px-10 rounded-2xl transition-all duration-300 transform hover:scale-105 flex items-center space-x-3"
                >
                  <span className="text-lg">Explore Programs</span>
                  <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
                </Link>
              </>
            ) : (
              <>
                <button className="group gradient-gold-burgundy hover:opacity-90 text-black font-bold py-5 px-10 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-gold/25 flex items-center space-x-3">
                  <Play className="h-6 w-6 group-hover:scale-110 transition-transform" />
                  <span className="text-lg">Start Your Journey</span>
                </button>
                
                <button className="group border-2 border-gold hover:border-white text-gold hover:text-white font-bold py-5 px-10 rounded-2xl transition-all duration-300 transform hover:scale-105 flex items-center space-x-3">
                  <span className="text-lg">Explore Programs</span>
                  <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
                </button>
              </>
            )}
          </div>
        </div>
        
        {/* Features Grid - honest information */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center group">
            <div className="bg-black/40 backdrop-blur-lg rounded-2xl p-8 border border-gold/20 hover:border-gold/40 transition-all duration-500 hover:transform hover:scale-105">
              <div className="inline-flex items-center justify-center w-16 h-16 gradient-gold-burgundy rounded-2xl mb-6 group-hover:scale-110 transition-transform">
                <Users className="h-8 w-8 text-black" />
              </div>
              <div className="text-4xl font-bold text-white mb-2">Growing</div>
              <div className="text-white/80 text-lg">Community</div>
            </div>
          </div>
          
          <div className="text-center group">
            <div className="bg-black/40 backdrop-blur-lg rounded-2xl p-8 border border-gold/20 hover:border-gold/40 transition-all duration-500 hover:transform hover:scale-105">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-burgundy rounded-2xl mb-6 group-hover:scale-110 transition-transform">
                <Award className="h-8 w-8 text-white" />
              </div>
              <div className="text-4xl font-bold text-white mb-2">Expert</div>
              <div className="text-white/80 text-lg">Programs</div>
            </div>
          </div>
          
          <div className="text-center group">
            <div className="bg-black/40 backdrop-blur-lg rounded-2xl p-8 border border-gold/20 hover:border-gold/40 transition-all duration-500 hover:transform hover:scale-105">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gold rounded-2xl mb-6 group-hover:scale-110 transition-transform">
                <Star className="h-8 w-8 text-black" />
              </div>
              <div className="text-4xl font-bold text-white mb-2">Quality</div>
              <div className="text-white/80 text-lg">Training</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
