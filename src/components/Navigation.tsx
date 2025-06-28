
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useNavigation } from "./navigation/useNavigation";
import { navigationItems } from "./navigation/constants";
import DesktopMenu from "./navigation/DesktopMenu";
import MobileMenu from "./navigation/MobileMenu";
import UserMenu from "./navigation/UserMenu";

const Navigation = () => {
  const {
    isOpen,
    user,
    avatarConfig,
    handleSignOut,
    toggleMobileMenu,
    closeMobileMenu,
  } = useNavigation();

  return (
    <>
      {/* Glass-morphic Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/5 backdrop-blur-xl border-b border-white/10 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center group">
                <div className="relative">
                  <img 
                    src="/lovable-uploads/b99fef11-6aaf-4783-9d1e-a21e1985649b.png" 
                    alt="Calibre Calisthenics Logo" 
                    className="h-10 w-auto transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
              </Link>
            </div>

            <DesktopMenu items={navigationItems} />

            <UserMenu 
              user={user} 
              avatarConfig={avatarConfig} 
              onSignOut={handleSignOut} 
            />

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={toggleMobileMenu}
                className="inline-flex items-center justify-center p-2 rounded-xl text-white/80 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white/20 transition-all backdrop-blur-sm"
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

        <MobileMenu
          isOpen={isOpen}
          items={navigationItems}
          user={user}
          avatarConfig={avatarConfig}
          onClose={closeMobileMenu}
          onSignOut={handleSignOut}
        />
      </nav>
    </>
  );
};

export default Navigation;
