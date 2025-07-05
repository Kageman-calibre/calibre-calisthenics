
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
    <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-border">
      <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        {items.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground hover:bg-muted block px-4 py-3 rounded-xl text-base font-medium transition-all duration-300"
          >
            <div className="flex items-center space-x-3">
              {item.icon && <item.icon className="h-5 w-5" />}
              <span>{item.name}</span>
            </div>
          </Link>
        ))}
        
        {user && (
          <div className="border-t border-border pt-4 mt-4">
            <button
              onClick={onSignOut}
              className="text-muted-foreground hover:text-foreground hover:bg-muted block w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-all duration-300"
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
