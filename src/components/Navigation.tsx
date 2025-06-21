
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
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
    { id: "templates", label: "Templates" },
    { id: "programming", label: "Programming" },
    { id: "progress", label: "Progress" },
    { id: "analytics", label: "Analytics" },
    { id: "ai", label: "AI Insights" },
    { id: "nutrition", label: "Nutrition" },
    { id: "social", label: "Community" },
    { id: "profile", label: "Profile" },
  ];

  return (
    <header className="bg-slate-900/80 backdrop-blur-md fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="text-white font-bold text-xl">
            FitnessAI
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.id}
                to="/"
                className={`text-gray-300 hover:text-white transition-colors ${activeSection === item.id ? "text-white" : ""}`}
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
            <button onClick={toggleMenu} className="text-gray-300 hover:text-white focus:outline-none focus:text-white">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Profile Section */}
          <div className="hidden md:flex items-center space-x-4">
            <span className="text-gray-300">
              {user?.email ? user.email : "Guest"}
            </span>
            <button
              onClick={signOut}
              className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-full transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <nav className="px-4 py-3">
            {navItems.map((item) => (
              <Link
                key={item.id}
                to="/"
                className={`block text-gray-300 hover:text-white py-2 transition-colors ${activeSection === item.id ? "text-white" : ""}`}
                onClick={() => {
                  setActiveSection(item.id);
                  closeMenu();
                }}
              >
                {item.label}
              </Link>
            ))}
            <button
              onClick={() => {
                signOut();
                closeMenu();
              }}
              className="block bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-full transition-colors mt-3 w-full text-center"
            >
              Logout
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navigation;
