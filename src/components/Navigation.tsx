
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, LogIn } from "lucide-react";
import { useAuth } from "./auth/AuthProvider";

const Navigation = ({ activeSection, setActiveSection }: { activeSection: string; setActiveSection: (section: string) => void }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navItems = [
    { id: "home", label: "Home" },
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
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="text-gold font-bold text-2xl tracking-wider">
            CALIBRE
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.id}
                to="/"
                className={`text-white hover:text-gold transition-colors font-medium ${activeSection === item.id ? "text-gold" : ""}`}
                onClick={() => {
                  setActiveSection(item.id);
                }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-white hover:text-gold focus:outline-none focus:text-gold">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Profile Section */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-white font-medium">
                  {user.email}
                </span>
                <button
                  onClick={signOut}
                  className="bg-burgundy hover:bg-burgundy/80 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/auth"
                className="bg-gold hover:bg-gold/80 text-black font-medium py-2 px-4 rounded-lg transition-colors flex items-center space-x-2"
              >
                <LogIn className="h-4 w-4" />
                <span>Sign In</span>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-md border-t border-gold/20">
          <nav className="px-4 py-3">
            {navItems.map((item) => (
              <Link
                key={item.id}
                to="/"
                className={`block text-white hover:text-gold py-3 transition-colors font-medium ${activeSection === item.id ? "text-gold" : ""}`}
                onClick={() => {
                  setActiveSection(item.id);
                  closeMenu();
                }}
              >
                {item.label}
              </Link>
            ))}
            {user ? (
              <button
                onClick={() => {
                  signOut();
                  closeMenu();
                }}
                className="block bg-burgundy hover:bg-burgundy/80 text-white font-medium py-2 px-4 rounded-lg transition-colors mt-3 w-full text-center"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/auth"
                onClick={closeMenu}
                className="block bg-gold hover:bg-gold/80 text-black font-medium py-2 px-4 rounded-lg transition-colors mt-3 w-full text-center flex items-center justify-center space-x-2"
              >
                <LogIn className="h-4 w-4" />
                <span>Sign In</span>
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navigation;
