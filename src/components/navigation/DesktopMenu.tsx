
import { Link, useLocation } from "react-router-dom";
import { NavigationItem } from "./types";

interface DesktopMenuProps {
  items: NavigationItem[];
}

const DesktopMenu = ({ items }: DesktopMenuProps) => {
  const location = useLocation();

  return (
    <div className="hidden md:block">
      <div className="ml-10 flex items-baseline space-x-2">
        {items.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`
                px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 relative group overflow-hidden
                ${isActive 
                  ? 'bg-white/20 text-white shadow-lg backdrop-blur-sm border border-white/20' 
                  : 'text-white/80 hover:text-white hover:bg-white/10 hover:backdrop-blur-sm'
                }
              `}
            >
              <div className="flex items-center space-x-2 relative z-10">
                {item.icon && <item.icon className="h-4 w-4" />}
                <span>{item.name}</span>
              </div>
              
              {/* Floating glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity -z-10"></div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default DesktopMenu;
