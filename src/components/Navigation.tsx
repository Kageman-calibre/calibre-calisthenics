
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, LogIn, Zap } from "lucide-react";
import { useAuth } from "./auth/AuthProvider";

const Navigation = ({ activeSection, setActiveSection }: { activeSection: string; setActiveSection: (section: string) => void }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Handle navigation with proper base path
  const handleNavigation = (section: string, path?: string) => {
    setActiveSection(section);
    if (path && path !== "/") {
      navigate(path);
    } else {
      // For home navigation, scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    closeMenu();
  };

  const navItems = [
    { id: "home", label: "Home", path: "/" },
    { id: "workouts", label: "Workouts" },
    { id: "exercises", label: "Exercises" },
    { id: "skills", label: "Skills" },
    { id: "templates", label: "Templates" },
    { id: "programming", label: "Programming" },
    { id: "intelligence", label: "Intelligence" },
    { id: "progress", label: "Progress" },
    { id: "analytics", label: "Analytics" },
    { id: "ai", label: "AI Insights" },
    { id: "nutrition", label: "Nutrition" },
    { id: "social", label: "Community" },
    { id: "gamification", label: "Rewards" },
    { id: "profile", label: "Profile" },
  ];

  return (
    <header className="bg-black/95 backdrop-blur-md fixed top-0 left-0 w-full z-50 border-b border-gold/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
            <Zap className="h-6 w-6 sm:h-7 sm:w-7 text-gold" />
            <span className="text-gold font-bold text-xl sm:text-2xl tracking-wider">CALIBRE</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-6 xl:space-x-8">
            {navItems.slice(0, 8).map((item) => (
              <button
                key={item.id}
                className={`text-white hover:text-gold transition-colors font-medium text-sm xl:text-base whitespace-nowrap ${activeSection === item.id ? "text-gold" : ""}`}
                onClick={() => handleNavigation(item.id, item.path)}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Desktop Profile Section */}
          <div className="hidden md:flex items-center space-x-3 flex-shrink-0">
            {user ? (
              <>
                <span className="text-white font-medium text-sm truncate max-w-32 xl:max-w-48">
                  {user.email}
                </span>
                <button
                  onClick={signOut}
                  className="bg-burgundy hover:bg-burgundy/80 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm whitespace-nowrap"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/auth"
                className="bg-gold hover:bg-gold/80 text-black font-medium py-2 px-4 rounded-lg transition-colors flex items-center space-x-2 text-sm whitespace-nowrap"
              >
                <LogIn className="h-4 w-4" />
                <span>Sign In</span>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMenu} 
              className="text-white hover:text-gold focus:outline-none focus:text-gold p-2"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-black/98 backdrop-blur-md border-t border-gold/20 absolute top-full left-0 w-full max-h-[calc(100vh-4rem)] overflow-y-auto">
          <nav className="px-4 py-6 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                className={`block w-full text-left text-white hover:text-gold hover:bg-white/5 py-4 px-4 rounded-lg transition-colors font-medium text-base ${activeSection === item.id ? "text-gold bg-gold/10" : ""}`}
                onClick={() => handleNavigation(item.id, item.path)}
              >
                {item.label}
              </button>
            ))}
            
            {/* Mobile Profile Section */}
            <div className="border-t border-gold/20 pt-6 mt-6">
              {user ? (
                <>
                  <div className="text-white/80 text-sm px-4 py-3 truncate bg-white/5 rounded-lg mb-3">
                    {user.email}
                  </div>
                  <button
                    onClick={() => {
                      signOut();
                      closeMenu();
                    }}
                    className="w-full bg-burgundy hover:bg-burgundy/80 text-white font-medium py-4 px-4 rounded-lg transition-colors text-base"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/auth"
                  onClick={closeMenu}
                  className="flex items-center justify-center space-x-3 w-full bg-gold hover:bg-gold/80 text-black font-medium py-4 px-4 rounded-lg transition-colors text-base"
                >
                  <LogIn className="h-5 w-5" />
                  <span>Sign In</span>
                </Link>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navigation;
