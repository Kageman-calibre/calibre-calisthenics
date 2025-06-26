
import { useState, useEffect } from "react";
import { useAuth } from "../auth/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useUserAvatar } from "@/hooks/useUserAvatar";

export const useNavigation = () => {
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

  const toggleMobileMenu = () => setIsOpen(!isOpen);
  const closeMobileMenu = () => setIsOpen(false);

  return {
    isOpen,
    activeSection,
    user,
    avatarConfig,
    handleSignOut,
    toggleMobileMenu,
    closeMobileMenu,
  };
};
