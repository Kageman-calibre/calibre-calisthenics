
import { Link } from "react-router-dom";
import { NavigationItem } from "./types";
import { User } from "@supabase/supabase-js";
import { AvatarConfig } from "@/hooks/useUserAvatar";

interface MobileMenuProps {
  isOpen: boolean;
  items: NavigationItem[];
  user: User | null;
  avatarConfig: AvatarConfig | null;
  onClose: () => void;
  onSignOut: () => void;
}

const MobileMenu = ({ isOpen, items, user, avatarConfig, onClose, onSignOut }: MobileMenuProps) => {
  if (!isOpen) return null;

  return (
    <div className="md:hidden absolute top-full left-0 right-0 bg-black/20 backdrop-blur-xl border-b border-white/10 shadow-2xl">
      <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        {items.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            onClick={onClose}
            className="text-white/80 hover:text-white hover:bg-white/10 block px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 backdrop-blur-sm border border-transparent hover:border-white/10"
          >
            <div className="flex items-center space-x-3">
              {item.icon && <item.icon className="h-5 w-5" />}
              <span>{item.name}</span>
            </div>
          </Link>
        ))}
        
        {user && (
          <div className="border-t border-white/10 pt-4 mt-4">
            <button
              onClick={onSignOut}
              className="text-white/80 hover:text-white hover:bg-white/10 block w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 backdrop-blur-sm border border-transparent hover:border-white/10"
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileMenu;
