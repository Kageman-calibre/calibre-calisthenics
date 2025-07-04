
import { Play, ArrowRight, Star, Users, Award } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./auth/AuthProvider";

const Hero = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleStartJourney = () => {
    if (user) {
      // If user is logged in, take them to beginner programs
      navigate('/beginner-programs');
    } else {
      // If not logged in, take them to auth page
      navigate('/auth');
    }
  };

  const handleExplorePrograms = () => {
    if (user) {
      // If user is logged in, take them to programs page
      navigate('/programs');
    } else {
      // If not logged in, take them to auth page first
      navigate('/auth');
    }
  };

  return (
    <section className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Clean dark background */}
      <div className="absolute inset-0 bg-background"></div>
      
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/30 rounded-full px-4 py-2 mb-8 animate-fade-in">
            <Star className="h-4 w-4 text-primary" />
            <span className="text-primary text-sm font-medium">Professional Calisthenics Training</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-bold text-foreground mb-8 leading-tight animate-fade-in">
            Build Your
            <span className="block text-primary">
              Ultimate Body
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed animate-fade-in">
            Master calisthenics with structured programs, expert guidance, and a supportive community. 
            Transform your strength, flexibility, and skills—no gym required.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in">
            <button 
              onClick={handleStartJourney}
              className="group bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-5 px-10 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-crimson flex items-center space-x-3"
            >
              <Play className="h-6 w-6 group-hover:scale-110 transition-transform" />
              <span className="text-lg">Start Your Journey</span>
            </button>
            
            <button
              onClick={handleExplorePrograms}
              className="group border-2 border-primary hover:bg-primary hover:text-primary-foreground text-primary font-bold py-5 px-10 rounded-2xl transition-all duration-300 transform hover:scale-105 flex items-center space-x-3"
            >
              <span className="text-lg">Explore Programs</span>
              <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
        
        {/* Features Grid */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          <Link to="/beginner-programs" className="text-center group cursor-pointer">
            <div className="bg-card border border-border rounded-2xl p-8 hover:border-primary/40 transition-all duration-500 hover:transform hover:scale-105">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-2xl mb-6 group-hover:scale-110 transition-transform">
                <Users className="h-8 w-8 text-primary-foreground" />
              </div>
              <div className="text-4xl font-bold text-foreground mb-2">Growing</div>
              <div className="text-muted-foreground text-lg">Community</div>
            </div>
          </Link>
          
          <Link to="/programs" className="text-center group cursor-pointer">
            <div className="bg-card border border-border rounded-2xl p-8 hover:border-primary/40 transition-all duration-500 hover:transform hover:scale-105">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary rounded-2xl mb-6 group-hover:scale-110 transition-transform">
                <Award className="h-8 w-8 text-secondary-foreground" />
              </div>
              <div className="text-4xl font-bold text-foreground mb-2">Expert</div>
              <div className="text-muted-foreground text-lg">Programs</div>
            </div>
          </Link>
          
          <Link to="/skill-guides" className="text-center group cursor-pointer">
            <div className="bg-card border border-border rounded-2xl p-8 hover:border-primary/40 transition-all duration-500 hover:transform hover:scale-105">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-2xl mb-6 group-hover:scale-110 transition-transform">
                <Star className="h-8 w-8 text-primary-foreground" />
              </div>
              <div className="text-4xl font-bold text-foreground mb-2">Quality</div>
              <div className="text-muted-foreground text-lg">Training</div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
