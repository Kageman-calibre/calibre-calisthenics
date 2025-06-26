
import { Link } from "react-router-dom";
import { User, LogOut } from "lucide-react";
import { User as UserType } from "@supabase/supabase-js";
import { NavigationItem } from "./types";
import RealisticAvatarDisplay from "../rpg/avatar/RealisticAvatarDisplay";
import { AvatarConfig } from "@/hooks/useUserAvatar";

interface MobileMenuProps {
  isOpen: boolean;
  items: NavigationItem[];
  user: UserType | null;
  avatarConfig: AvatarConfig;
  onClose: () => void;
  onSignOut: () => void;
}

const MobileMenu = ({ isOpen, items, user, avatarConfig, onClose, onSignOut }: MobileMenuProps) => {
  if (!isOpen) return null;

  return (
    <div className="md:hidden">
      <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-slate-900/95 backdrop-blur-sm">
        {items.map((item) => {
          const IconComponent = item.icon;
          return (
            <Link
              key={item.name}
              to={item.href}
              className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors flex items-center gap-2"
              onClick={onClose}
            >
              {IconComponent && <IconComponent className="h-4 w-4" />}
              {item.name}
            </Link>
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
                  onSignOut();
                  onClose();
                }}
                className="flex items-center space-x-2 text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors w-full text-left"
              >
                <LogOut className="h-4 w-4" />
                <span>Sign Out</span>
              </button>
            </>
          ) : (
            <Link
              to="/auth"
              className="flex items-center space-x-2 text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors"
              onClick={onClose}
            >
              <User className="h-4 w-4" />
              <span>Sign In</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
