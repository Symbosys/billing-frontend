import { useState, useRef, useEffect } from 'react';
import { Menu, X, ArrowRight, User, LogIn, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { user, isLoading, logout } = useAuth();
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
    setIsOpen(false);
    navigate('/');
  };

  const displayName = user ? user.email.split('@')[0] : 'Admin User';
  const avatarLetter = displayName.charAt(0).toUpperCase();

  return (
    <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:bg-blue-700 transition-colors">
                <span className="text-white font-bold text-2xl">S</span>
              </div>
              <span className="font-bold text-2xl tracking-tight text-slate-900">Symbosys</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Features</a>
            <Link to="/solutions" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Solutions</Link>
            <a href="#pricing" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Pricing</a>
            <Link to="/about" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">About Us</Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {/* Profile / Auth dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 focus:outline-none group"
                aria-label="User menu"
              >
                {isLoading ? (
                  <div className="w-10 h-10 rounded-full bg-slate-200 animate-pulse ring-2 ring-slate-100" />
                ) : user ? (
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center border-2 border-transparent group-hover:border-blue-600 transition-all shadow-sm ring-2 ring-slate-100">
                    <span className="text-sm font-bold text-white">{avatarLetter}</span>
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center border-2 border-transparent group-hover:border-blue-600 transition-all shadow-sm ring-2 ring-slate-100">
                    <User className="w-5 h-5 text-slate-400" />
                  </div>
                )}
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-3 w-52 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-50 transform origin-top-right transition-all">
                  <div className="px-4 py-2 border-b border-slate-100 mb-1">
                    <p className="text-sm font-semibold text-slate-800 truncate">{user ? user.email : 'Not signed in'}</p>
                    {user && <p className="text-xs text-blue-600 font-medium">{user.role}</p>}
                  </div>

                  {user ? (
                    <>
                      <Link 
                        to="/profile" 
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors"
                      >
                        <User className="w-4 h-4 mr-3" /> Profile
                      </Link>
                      <div className="h-px bg-slate-100 my-1"></div>
                      <button 
                        onClick={handleLogout}
                        className="flex w-full items-center px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="w-4 h-4 mr-3" /> Logout
                      </button>
                    </>
                  ) : (
                    <Link 
                      to="/login" 
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors"
                    >
                      <LogIn className="w-4 h-4 mr-3" /> Login
                    </Link>
                  )}
                </div>
              )}
            </div>

            <Link to="/signup" className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-all shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30">
              Get Started <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-600 hover:text-slate-900 cursor-pointer">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-200">
          <div className="px-4 pt-2 pb-6 space-y-1">
            <a href="#features" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-50">Features</a>
            <Link to="/solutions" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-50">Solutions</Link>
            <a href="#pricing" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-50">Pricing</a>
            <Link to="/about" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-50">About Us</Link>
            
            <hr className="my-4 border-slate-200" />
            
            {user ? (
              <>
                <div className="px-3 py-2 flex items-center mb-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mr-3">
                    <span className="text-sm font-bold text-white">{avatarLetter}</span>
                  </div>
                  <div>
                    <p className="text-base font-medium text-slate-900 truncate">{displayName}</p>
                    <p className="text-xs text-blue-600 font-medium">{user.role}</p>
                  </div>
                </div>
                <Link to="/profile" onClick={() => setIsOpen(false)} className="flex items-center px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-50">
                  <User className="w-5 h-5 mr-3 text-slate-400" /> Profile
                </Link>
                <button onClick={handleLogout} className="flex w-full items-center px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50">
                  <LogOut className="w-5 h-5 mr-3 text-red-400" /> Logout
                </button>
              </>
            ) : (
              <Link to="/login" onClick={() => setIsOpen(false)} className="flex items-center px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-50">
                <LogIn className="w-5 h-5 mr-3 text-slate-400" /> Login
              </Link>
            )}

            <Link to="/signup" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-center rounded-lg bg-blue-600 text-white font-medium mt-4">Get Started</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
