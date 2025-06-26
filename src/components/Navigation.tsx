import { useState, useEffect } from "react";
import { Menu, X, User, LogOut, Gamepad2 } from "lucide-react";
import { useAuth } from "./auth/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useUserAvatar } from "@/hooks/useUserAvatar";
import RealisticAvatarDisplay from "./rpg/avatar/RealisticAvatarDisplay";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const { user } = useAuth();
  const { toast } = useToast();
  const { avatarConfig } = useUserAvatar();

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'workouts', 'exercises', 'templates', 'programming', 'progress', 'profile', 'nutrition', 'community', 'gamification', 'mobile', 'analytics', 'ai', 'integrations', 'premium', 'trainers', 'skills', 'intelligence', 'permissions'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Error signing out",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const navigationItems = [
    { name: "Home", href: "/" },
    { name: "Programs", href: "/programs" },
    { name: "Studio", href: "/studio" },
    { name: "Skills", href: "/skill-guides" },
    { name: "RPG System", href: "/rpg", icon: Gamepad2 },
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <a href="/" className="flex items-center">
                <img 
                  src="/lovable-uploads/b99fef11-6aaf-4783-9d1e-a21e1985649b.png" 
                  alt="Calibre Calisthenics Logo" 
                  className="h-10 w-auto"
                />
              </a>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navigationItems.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2"
                    >
                      {IconComponent && <IconComponent className="h-4 w-4" />}
                      {item.name}
                    </a>
                  );
                })}
              </div>
            </div>

            {/* User Menu */}
            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-3">
                  {/* User Avatar */}
                  <div className="flex items-center space-x-2">
                    <RealisticAvatarDisplay 
                      config={avatarConfig} 
                      size="small" 
                      showBackground={true}
                    />
                    <span className="text-gray-300 text-sm">
                      {user.email?.split('@')[0]}
                    </span>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              ) : (
                <a
                  href="/auth"
                  className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors"
                >
                  <User className="h-4 w-4" />
                  <span>Sign In</span>
                </a>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              >
                {isOpen ? (
                  <X className="block h-6 w-6" />
                ) : (
                  <Menu className="block h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-slate-900/95 backdrop-blur-sm">
              {navigationItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors flex items-center gap-2"
                    onClick={() => setIsOpen(false)}
                  >
                    {IconComponent && <IconComponent className="h-4 w-4" />}
                    {item.name}
                  </a>
                );
              })}
              
              {/* Mobile User Menu */}
              <div className="border-t border-slate-700 pt-4">
                {user ? (
                  <>
                    <div className="flex items-center px-3 py-2 space-x-2">
                      <RealisticAvatarDisplay 
                        config={avatarConfig} 
                        size="small" 
                        showBackground={true}
                      />
                      <div className="text-gray-300 text-sm">
                        {user.email?.split('@')[0]}
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        handleSignOut();
                        setIsOpen(false);
                      }}
                      className="flex items-center space-x-2 text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors w-full text-left"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Sign Out</span>
                    </button>
                  </>
                ) : (
                  <a
                    href="/auth"
                    className="flex items-center space-x-2 text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <User className="h-4 w-4" />
                    <span>Sign In</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navigation;
