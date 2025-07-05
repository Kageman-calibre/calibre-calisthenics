
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
                px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 relative group
                ${isActive 
                  ? 'bg-primary text-primary-foreground' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }
              `}
            >
              <div className="flex items-center space-x-2">
                {item.icon && <item.icon className="h-4 w-4" />}
                <span>{item.name}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default DesktopMenu;
