import { Link } from 'react-router-dom';
import { ShoppingBag, Facebook, Twitter, Instagram, Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-dark text-slate-300 pt-20 pb-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          <div className="space-y-6">
            <Link to="/" className="text-2xl font-bold tracking-tight text-white flex items-center group">
              <ShoppingBag size={24} className="mr-2" />
              SwiftCart
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
              Redefining the premium ecommerce experience. Quality products, seamless shopping, and unmatched customer service.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" aria-label="Facebook" className="text-slate-400 hover:text-white transition-colors"><Facebook className="w-5 h-5" /></a>
              <a href="#" aria-label="Twitter" className="text-slate-400 hover:text-white transition-colors"><Twitter className="w-5 h-5" /></a>
              <a href="#" aria-label="Instagram" className="text-slate-400 hover:text-white transition-colors"><Instagram className="w-5 h-5" /></a>
              <a href="#" aria-label="Github" className="text-slate-400 hover:text-white transition-colors"><Github className="w-5 h-5" /></a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Shop</h3>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link to="/" className="text-slate-400 hover:text-white transition-colors">Men's Collection</Link></li>
              <li><Link to="/" className="text-slate-400 hover:text-white transition-colors">Women's Collection</Link></li>
              <li><Link to="/" className="text-slate-400 hover:text-white transition-colors">Accessories</Link></li>
              <li><Link to="/" className="text-slate-400 hover:text-white transition-colors">New Arrivals</Link></li>
              <li><Link to="/" className="text-slate-400 hover:text-white transition-colors">Discounts & Sale</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Support</h3>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link to="/" className="text-slate-400 hover:text-white transition-colors">Help Center</Link></li>
              <li><Link to="/" className="text-slate-400 hover:text-white transition-colors">Shipping Info</Link></li>
              <li><Link to="/" className="text-slate-400 hover:text-white transition-colors">Returns & Exchanges</Link></li>
              <li><Link to="/" className="text-slate-400 hover:text-white transition-colors">Order Tracking</Link></li>
              <li><Link to="/" className="text-slate-400 hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Company</h3>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link to="/" className="text-slate-400 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/" className="text-slate-400 hover:text-white transition-colors">Careers</Link></li>
              <li><Link to="/" className="text-slate-400 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/" className="text-slate-400 hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
          
        </div>
        
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 uppercase tracking-wider">
          <p>&copy; {new Date().getFullYear()} SwiftCart. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <span className="hover:text-white cursor-pointer transition-colors">India</span>
            <span className="hover:text-white cursor-pointer transition-colors">English</span>
            <span className="hover:text-white cursor-pointer transition-colors">USD</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
