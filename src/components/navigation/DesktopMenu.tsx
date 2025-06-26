
import { Link } from "react-router-dom";
import { NavigationItem } from "./types";

interface DesktopMenuProps {
  items: NavigationItem[];
}

const DesktopMenu = ({ items }: DesktopMenuProps) => {
  return (
    <div className="hidden md:block">
      <div className="ml-10 flex items-baseline space-x-4">
        {items.map((item) => {
          const IconComponent = item.icon;
          return (
            <Link
              key={item.name}
              to={item.href}
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2"
            >
              {IconComponent && <IconComponent className="h-4 w-4" />}
              {item.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default DesktopMenu;
