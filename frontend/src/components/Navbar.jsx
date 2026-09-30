import { useContext, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, User, LogOut, Search, Menu, X, Zap } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Check if we are on the home page where hero image is at the top
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const cartItemCount = cart?.products?.reduce((acc, item) => acc + item.quantity, 0) || 0;

  // Determine colors based on scroll and page
  const isTransparent = isHome && !isScrolled;
  const textColor = isTransparent ? 'text-white' : 'text-dark';
  const hoverTextColor = isTransparent ? 'hover:text-slate-300' : 'hover:text-primary';
  const iconColor = isTransparent ? 'text-white' : 'text-dark';

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled || !isHome ? 'bg-white/95 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/" className={`text-2xl font-bold tracking-tighter flex items-center group ${textColor}`}>
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center mr-2 transition-transform group-hover:scale-105 ${isTransparent ? 'bg-white text-primary' : 'bg-primary text-white'}`}>
            <div className="relative flex items-center justify-center">
              <ShoppingCart size={20} className="mr-1" />
              <Zap size={12} className="absolute top-0 right-0 text-accent fill-current" />
            </div>
          </div>
          SwiftCart
        </Link>

        {/* Desktop Links */}
        <div className={`hidden md:flex items-center space-x-8 font-medium text-[15px] ${textColor}`}>
          <Link to="/" className={`${hoverTextColor} transition-colors`}>Home</Link>
          <a href="/#shop-section" onClick={(e) => {
            if (isHome) {
              e.preventDefault();
              document.getElementById('shop-section')?.scrollIntoView({ behavior: 'smooth' });
            }
          }} className={`${hoverTextColor} transition-colors cursor-pointer`}>Shop</a>
          <a href="/#shop-section" onClick={(e) => {
            if (isHome) {
              e.preventDefault();
              document.getElementById('shop-section')?.scrollIntoView({ behavior: 'smooth' });
            }
          }} className={`${hoverTextColor} transition-colors cursor-pointer`}>Categories</a>
          {user?.role === 'admin' && (
            <Link to="/admin" className={`${isTransparent ? 'text-blue-300 hover:text-white' : 'text-primary hover:text-blue-800'} transition-colors`}>Admin</Link>
          )}
        </div>

        {/* Right Icons */}
        <div className="flex items-center space-x-6">
          {/* Search Bar */}
          <div className="hidden lg:flex items-center relative">
            <input 
              type="text" 
              placeholder="Search products..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`pl-10 pr-4 py-2 rounded-full text-sm outline-none transition-all w-48 focus:w-64 ${isTransparent ? 'bg-white/20 text-white placeholder-white/70 focus:bg-white/30 border border-white/30' : 'bg-slate-100 text-dark focus:bg-white border border-transparent focus:border-primary/30 focus:ring-2 focus:ring-primary/20'}`}
            />
            <Search className={`w-4 h-4 absolute left-3 ${isTransparent ? 'text-white/70' : 'text-slate-400'}`} />
          </div>

          <button aria-label="Search mobile" className={`lg:hidden ${iconColor} ${hoverTextColor} transition-colors`}>
            <Search className="w-5 h-5" />
          </button>
          
          <Link to="/cart" aria-label="Shopping Cart" className={`${iconColor} ${hoverTextColor} transition-colors relative group`}>
            <ShoppingCart className="w-6 h-6 group-hover:scale-110 transition-transform" />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-accent text-white text-[11px] font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-sm">
                {cartItemCount}
              </span>
            )}
          </Link>

          {user ? (
            <div className="hidden sm:flex items-center space-x-4">
              <Link to="/orders" className={`${textColor} ${hoverTextColor} transition-colors text-[15px] font-medium`}>Orders</Link>
              <div className="group relative">
                <button aria-label="User Profile" aria-haspopup="true" className={`flex items-center justify-center w-9 h-9 rounded-full ${isTransparent ? 'bg-white/20 hover:bg-white/30 text-white' : 'bg-slate-100 hover:bg-slate-200 text-dark'} transition-colors`}>
                  <User className="w-5 h-5" />
                </button>
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 p-2 text-dark transform origin-top-right scale-95 group-hover:scale-100">
                  <div className="px-4 py-3 border-b border-slate-50 mb-2 bg-slate-50 rounded-xl">
                    <p className="text-sm font-semibold text-dark truncate">{user.name}</p>
                    <p className="text-xs text-slate-500 truncate mt-0.5">{user.email}</p>
                  </div>
                  <button onClick={handleLogout} className="w-full text-left px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-xl flex items-center transition-colors">
                    <LogOut className="w-4 h-4 mr-2.5" /> Sign Out
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <Link to="/login" className={`hidden sm:flex items-center justify-center text-sm font-semibold px-6 py-2.5 rounded-full transition-all duration-200 shadow-sm hover:shadow-md ${isTransparent ? 'bg-white text-primary hover:bg-slate-100' : 'bg-primary text-white hover:bg-blue-700'}`}>
              Sign In
            </Link>
          )}

          {/* Mobile Menu Button */}
          <button aria-label="Open Mobile Menu" className={`${iconColor} md:hidden`} onClick={() => setMobileMenuOpen(true)}>
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-dark/40 backdrop-blur-sm z-40"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-4/5 max-w-sm bg-white z-50 p-6 flex flex-col shadow-2xl"
            >
              <div className="flex justify-between items-center mb-8">
                <span className="text-xl font-bold tracking-tighter text-dark flex items-center">
                  <ShoppingCart className="mr-2 text-primary" size={24} />
                  SwiftCart
                </span>
                <button aria-label="Close Menu" onClick={() => setMobileMenuOpen(false)} className="p-2 bg-slate-100 rounded-full text-slate-500 hover:bg-slate-200 hover:text-dark transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="flex flex-col space-y-1 text-lg font-medium text-dark flex-grow">
                <Link to="/" onClick={() => setMobileMenuOpen(false)} className="px-4 py-3 hover:bg-slate-50 rounded-xl transition-colors">Home</Link>
                <a href="/#shop-section" onClick={(e) => {
                  setMobileMenuOpen(false);
                  if (isHome) {
                    e.preventDefault();
                    setTimeout(() => document.getElementById('shop-section')?.scrollIntoView({ behavior: 'smooth' }), 100);
                  }
                }} className="px-4 py-3 hover:bg-slate-50 rounded-xl transition-colors">Shop</a>
                <a href="/#shop-section" onClick={(e) => {
                  setMobileMenuOpen(false);
                  if (isHome) {
                    e.preventDefault();
                    setTimeout(() => document.getElementById('shop-section')?.scrollIntoView({ behavior: 'smooth' }), 100);
                  }
                }} className="px-4 py-3 hover:bg-slate-50 rounded-xl transition-colors">Categories</a>
                {user && <Link to="/orders" onClick={() => setMobileMenuOpen(false)} className="px-4 py-3 hover:bg-slate-50 rounded-xl transition-colors">My Orders</Link>}
                {user?.role === 'admin' && <Link to="/admin" onClick={() => setMobileMenuOpen(false)} className="px-4 py-3 text-primary hover:bg-blue-50 rounded-xl transition-colors">Admin Dashboard</Link>}
              </div>

              <div className="mt-auto border-t border-slate-100 pt-6">
                {user ? (
                  <div className="flex items-center justify-between bg-slate-50 p-4 rounded-2xl">
                    <div className="flex items-center overflow-hidden">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                        <User className="w-5 h-5 text-primary" />
                      </div>
                      <div className="truncate">
                        <p className="text-sm font-semibold text-dark truncate">{user.name}</p>
                        <p className="text-xs text-slate-500 truncate">{user.email}</p>
                      </div>
                    </div>
                    <button onClick={() => { handleLogout(); setMobileMenuOpen(false); }} className="p-2.5 text-red-500 bg-white shadow-sm hover:bg-red-50 rounded-full transition-colors ml-2 flex-shrink-0">
                      <LogOut className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="w-full flex items-center justify-center bg-primary text-white py-3.5 rounded-xl font-semibold shadow-md hover:bg-blue-700 transition-colors">
                    Sign In
                  </Link>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
