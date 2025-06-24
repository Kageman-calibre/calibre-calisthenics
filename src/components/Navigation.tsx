
import { useState } from 'react';
import { Menu, X, Zap, ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from './auth/AuthProvider';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Skill Guides', path: '/skill-guides' },
    { name: 'Programs', path: '/programs', protected: true },
    { name: 'Studio', path: '/studio', protected: true },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleSignOut = async () => {
    await signOut();
    setShowDropdown(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-md border-b border-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 sm:space-x-3 group">
            <Zap className="h-6 w-6 sm:h-8 sm:w-8 text-gold group-hover:text-orange-400 transition-colors" />
            <span className="text-xl sm:text-2xl font-bold text-gold tracking-wider group-hover:text-orange-400 transition-colors">
              CALIBRE
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => {
              if (link.protected && !user) return null;
              
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-3 lg:px-4 py-2 rounded-lg text-sm lg:text-base font-medium transition-all duration-200 ${
                    isActive(link.path)
                      ? 'text-gold bg-gold/10 shadow-lg shadow-gold/20'
                      : 'text-white hover:text-gold hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            {/* User Menu */}
            {user ? (
              <div className="relative ml-4">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg text-white hover:text-gold hover:bg-white/5 transition-all duration-200"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-gold to-orange-500 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-black">
                      {user.email?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <ChevronDown className="h-4 w-4" />
                </button>

                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-slate-800 rounded-lg shadow-xl border border-slate-700 py-1">
                    <div className="px-4 py-2 border-b border-slate-700">
                      <p className="text-sm text-gray-300 truncate">{user.email}</p>
                    </div>
                    <button
                      onClick={handleSignOut}
                      className="w-full text-left px-4 py-2 text-sm text-white hover:bg-slate-700 transition-colors"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/auth"
                className="ml-4 px-4 py-2 bg-gradient-to-r from-gold to-orange-500 text-black font-medium rounded-lg hover:from-gold/90 hover:to-orange-400 transition-all duration-200 shadow-lg hover:shadow-gold/25"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-white hover:text-gold hover:bg-white/5 transition-colors"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-black/98 backdrop-blur-md border-t border-gold/20">
          <div className="px-4 py-4 space-y-2">
            {navLinks.map((link) => {
              if (link.protected && !user) return null;
              
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                    isActive(link.path)
                      ? 'text-gold bg-gold/10 shadow-lg shadow-gold/20'
                      : 'text-white hover:text-gold hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            {user ? (
              <div className="pt-4 border-t border-slate-700 mt-4">
                <div className="px-4 py-2 mb-2">
                  <p className="text-sm text-gray-300 truncate">{user.email}</p>
                </div>
                <button
                  onClick={() => {
                    handleSignOut();
                    setIsOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 text-base text-white hover:text-gold hover:bg-white/5 rounded-lg transition-colors"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link
                to="/auth"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 mt-4 bg-gradient-to-r from-gold to-orange-500 text-black font-medium rounded-lg text-center hover:from-gold/90 hover:to-orange-400 transition-all duration-200"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
