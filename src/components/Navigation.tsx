
import { Menu, X, Zap, User, Settings } from "lucide-react";
import { useState } from "react";

interface NavigationProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const Navigation = ({ activeSection, setActiveSection }: NavigationProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "workouts", label: "Programs" },
    { id: "progress", label: "Progress" },
    { id: "profile", label: "Profile" },
  ];

  return (
    <nav className="bg-slate-900/95 backdrop-blur-lg border-b border-slate-700/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveSection("home")}>
            <div className="p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <div>
              <span className="text-2xl font-bold text-white">Calibre</span>
              <div className="text-xs text-orange-400 font-medium -mt-1">Elite Training</div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                  activeSection === item.id
                    ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg"
                    : "text-gray-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="p-3 text-gray-400 hover:text-white hover:bg-slate-800 rounded-xl transition-all duration-300">
              <Settings className="h-5 w-5" />
            </button>
            <button 
              onClick={() => setActiveSection("profile")}
              className="flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 text-white px-4 py-3 rounded-xl transition-all duration-300 border border-slate-700 hover:border-slate-600"
            >
              <User className="h-4 w-4" />
              <span className="text-sm font-medium">Profile</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-3 rounded-xl text-gray-400 hover:text-white hover:bg-slate-800 transition-all duration-300"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="px-2 pt-2 pb-3 space-y-2 bg-slate-800/95 backdrop-blur-lg rounded-2xl mt-4 border border-slate-700/50">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSection(item.id);
                    setIsMenuOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 ${
                    activeSection === item.id
                      ? "bg-gradient-to-r from-orange-500 to-red-500 text-white"
                      : "text-gray-300 hover:bg-slate-700 hover:text-white"
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <div className="border-t border-slate-700 mt-4 pt-4">
                <button 
                  onClick={() => {
                    setActiveSection("profile");
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center space-x-3 w-full text-left px-4 py-3 rounded-xl text-gray-300 hover:bg-slate-700 hover:text-white transition-all duration-300"
                >
                  <User className="h-5 w-5" />
                  <span className="font-medium">Profile</span>
                </button>
                <button className="flex items-center space-x-3 w-full text-left px-4 py-3 rounded-xl text-gray-300 hover:bg-slate-700 hover:text-white transition-all duration-300">
                  <Settings className="h-5 w-5" />
                  <span className="font-medium">Settings</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
