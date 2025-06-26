
import { Link } from "react-router-dom";
import { User, LogOut } from "lucide-react";
import { User as UserType } from "@supabase/supabase-js";
import RealisticAvatarDisplay from "../rpg/avatar/RealisticAvatarDisplay";
import { AvatarConfig } from "@/hooks/useUserAvatar";

interface UserMenuProps {
  user: UserType | null;
  avatarConfig: AvatarConfig;
  onSignOut: () => void;
}

const UserMenu = ({ user, avatarConfig, onSignOut }: UserMenuProps) => {
  return (
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
            onClick={onSignOut}
            className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors"
          >
            <LogOut className="h-4 w-4" />
            <span>Sign Out</span>
          </button>
        </div>
      ) : (
        <Link
          to="/auth"
          className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors"
        >
          <User className="h-4 w-4" />
          <span>Sign In</span>
        </Link>
      )}
    </div>
  );
};

export default UserMenu;
