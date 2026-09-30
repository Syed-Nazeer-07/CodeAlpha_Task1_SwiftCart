import { useContext, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingBag, User, LogOut, Search, Menu, X } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // check active route
  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?keyword=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  const cartItemCount = cart?.products?.reduce((acc, item) => acc + item.quantity, 0) || 0;

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white border-b border-slate-100 py-4 transition-all duration-300">
      <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/" className="text-xl md:text-2xl font-bold tracking-tight flex items-center text-dark">
          <ShoppingBag size={24} className="mr-2 text-dark" />
          SwiftCart
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8 font-medium text-sm text-dark">
          <Link to="/" className={`relative hover:text-dark transition-colors pb-1 ${isActive('/') ? 'text-dark font-bold' : 'text-slate-500'}`}>
            Home
            {isActive('/') && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-dark"></span>}
          </Link>
          <a href="/#shop-section" onClick={(e) => {
            if (window.location.pathname === '/') {
              e.preventDefault();
              document.getElementById('shop-section')?.scrollIntoView({ behavior: 'smooth' });
            }
          }} className="text-slate-500 hover:text-dark transition-colors cursor-pointer">Shop</a>
          <a href="/#categories-section" onClick={(e) => {
            if (window.location.pathname === '/') {
              e.preventDefault();
              document.getElementById('categories-section')?.scrollIntoView({ behavior: 'smooth' });
            }
          }} className="text-slate-500 hover:text-dark transition-colors cursor-pointer">Categories</a>
          {user?.role === 'admin' && (
            <Link to="/admin" className={`relative hover:text-dark transition-colors pb-1 ${isActive('/admin') ? 'text-dark font-bold' : 'text-slate-500'}`}>
              Admin
              {isActive('/admin') && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-dark"></span>}
            </Link>
          )}
        </div>

        {/* Right Icons */}
        <div className="flex items-center space-x-5 lg:space-x-6 text-dark">
          {/* Search Bar */}
          <form onSubmit={handleSearchSubmit} className="hidden lg:flex items-center relative">
            <input 
              type="text" 
              placeholder="Search..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-sm outline-none transition-all w-48 focus:w-64 focus:bg-white focus:border-dark focus:ring-1 focus:ring-dark text-dark"
            />
            <Search className="w-4 h-4 absolute left-3 text-slate-400" />
          </form>

          <button aria-label="Search mobile" onClick={() => document.getElementById('mobile-search')?.focus()} className="lg:hidden hover:text-dark transition-colors text-slate-500">
            <Search className="w-5 h-5" />
          </button>
          
          <Link to="/cart" aria-label="Shopping Cart" className={`flex items-center hover:text-dark transition-colors group ${isActive('/cart') ? 'text-dark font-bold' : 'text-slate-500'}`}>
            <div className="relative">
              <ShoppingBag className="w-6 h-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-dark text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center shadow-sm">
                  {cartItemCount}
                </span>
              )}
            </div>
            <span className="hidden sm:block ml-2 text-sm">Cart</span>
          </Link>

          {user ? (
            <div className="hidden sm:flex items-center space-x-4">
              <Link to="/orders" className={`hover:text-dark transition-colors text-sm font-medium ${isActive('/orders') ? 'text-dark font-bold' : 'text-slate-500'}`}>Orders</Link>
              <div className="group relative">
                <button aria-label="User Profile" className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors">
                  <User className="w-4 h-4 text-dark" />
                </button>
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 p-2 transform origin-top-right scale-95 group-hover:scale-100">
                  <div className="px-3 py-2 border-b border-slate-100 mb-1 bg-slate-50 rounded-lg">
                    <p className="text-sm font-semibold truncate text-dark">{user.name}</p>
                    <p className="text-xs text-slate-500 truncate mt-0.5">{user.email}</p>
                  </div>
                  <button onClick={handleLogout} className="w-full text-left px-3 py-2 text-sm font-medium text-dark hover:bg-slate-100 rounded-lg flex items-center transition-colors">
                    <LogOut className="w-4 h-4 mr-2" /> Sign Out
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <Link to="/login" className="hidden sm:flex items-center justify-center text-sm font-semibold px-5 py-2 rounded-full transition-all bg-dark text-white hover:bg-black">
              Sign In
            </Link>
          )}

          {/* Mobile Menu Button */}
          <button aria-label="Open Mobile Menu" className="md:hidden text-slate-500 hover:text-dark" onClick={() => setMobileMenuOpen(true)}>
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
              <div className="flex justify-between items-center mb-6">
                <span className="text-xl font-bold tracking-tight flex items-center text-dark">
                  <ShoppingBag className="mr-2 text-dark" size={24} />
                  SwiftCart
                </span>
                <button aria-label="Close Menu" onClick={() => setMobileMenuOpen(false)} className="p-2 bg-slate-50 rounded-full text-slate-500 hover:bg-slate-200 transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <form onSubmit={(e) => { handleSearchSubmit(e); setMobileMenuOpen(false); }} className="relative mb-6">
                <input 
                  id="mobile-search"
                  type="text" 
                  placeholder="Search products..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-dark focus:ring-1 focus:ring-dark text-dark"
                />
                <Search className="w-4 h-4 absolute left-4 top-3.5 text-slate-400" />
              </form>
              
              <div className="flex flex-col space-y-1 text-base font-medium text-dark flex-grow">
                <Link to="/" onClick={() => setMobileMenuOpen(false)} className={`px-4 py-3 rounded-xl transition-colors ${isActive('/') ? 'bg-slate-100 font-bold' : 'hover:bg-slate-50'}`}>Home</Link>
                <a href="/#shop-section" onClick={(e) => {
                  setMobileMenuOpen(false);
                  if (window.location.pathname === '/') {
                    e.preventDefault();
                    setTimeout(() => document.getElementById('shop-section')?.scrollIntoView({ behavior: 'smooth' }), 100);
                  }
                }} className="px-4 py-3 hover:bg-slate-50 rounded-xl transition-colors">Shop</a>
                <a href="/#categories-section" onClick={(e) => {
                  setMobileMenuOpen(false);
                  if (window.location.pathname === '/') {
                    e.preventDefault();
                    setTimeout(() => document.getElementById('categories-section')?.scrollIntoView({ behavior: 'smooth' }), 100);
                  }
                }} className="px-4 py-3 hover:bg-slate-50 rounded-xl transition-colors">Categories</a>
                {user && <Link to="/orders" onClick={() => setMobileMenuOpen(false)} className={`px-4 py-3 rounded-xl transition-colors ${isActive('/orders') ? 'bg-slate-100 font-bold' : 'hover:bg-slate-50'}`}>My Orders</Link>}
                {user?.role === 'admin' && <Link to="/admin" onClick={() => setMobileMenuOpen(false)} className={`px-4 py-3 rounded-xl transition-colors ${isActive('/admin') ? 'bg-slate-100 font-bold' : 'hover:bg-slate-50'}`}>Admin Dashboard</Link>}
              </div>

              <div className="mt-auto border-t border-slate-100 pt-6">
                {user ? (
                  <div className="flex items-center justify-between bg-slate-50 p-4 rounded-xl">
                    <div className="flex items-center overflow-hidden">
                      <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                        <User className="w-5 h-5 text-dark" />
                      </div>
                      <div className="truncate">
                        <p className="text-sm font-semibold text-dark truncate">{user.name}</p>
                        <p className="text-xs text-slate-500 truncate">{user.email}</p>
                      </div>
                    </div>
                    <button onClick={() => { handleLogout(); setMobileMenuOpen(false); }} className="p-2 text-dark hover:bg-slate-200 rounded-lg transition-colors flex-shrink-0">
                      <LogOut className="w-5 h-5" />
                    </button>
                  </div>
                ) : (
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="w-full flex items-center justify-center bg-dark text-white py-3.5 rounded-full font-semibold hover:bg-black transition-colors">
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
