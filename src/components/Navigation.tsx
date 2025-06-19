
import { useState } from "react";
import { Menu, X, Dumbbell, User, BarChart3, Users, Apple, Zap, BookOpen, Smartphone, Settings, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "./auth/AuthProvider";

interface NavigationProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const Navigation = ({ activeSection, setActiveSection }: NavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { signOut } = useAuth();

  const navigationItems = [
    { id: "home", label: "Home", icon: Dumbbell },
    { id: "templates", label: "Templates", icon: BookOpen },
    { id: "workouts", label: "Workouts", icon: Zap },
    { id: "progress", label: "Progress", icon: BarChart3 },
    { id: "profile", label: "Profile", icon: User },
    { id: "nutrition", label: "Nutrition", icon: Apple },
    { id: "social", label: "Social", icon: Users },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "mobile", label: "Mobile", icon: Smartphone },
    { id: "premium", label: "Premium", icon: Crown },
  ];

  const handleNavClick = (sectionId: string) => {
    setActiveSection(sectionId);
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Dumbbell className="h-8 w-8 text-orange-500" />
            <span className="ml-2 text-xl font-bold text-white">FitnessPro</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navigationItems.slice(0, 6).map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center space-x-1 ${
                      activeSection === item.id
                        ? "bg-orange-500 text-white"
                        : "text-gray-300 hover:text-white hover:bg-slate-700"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" size="sm" onClick={signOut}>
              Sign Out
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-400 hover:text-white hover:bg-slate-700 px-3 py-2 rounded-md"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-slate-900/98 backdrop-blur-sm border-t border-slate-700">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 flex items-center space-x-2 ${
                    activeSection === item.id
                      ? "bg-orange-500 text-white"
                      : "text-gray-300 hover:text-white hover:bg-slate-700"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
            <div className="pt-4 border-t border-slate-700">
              <Button variant="outline" size="sm" onClick={signOut} className="w-full">
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
