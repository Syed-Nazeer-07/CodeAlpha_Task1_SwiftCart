import { Link } from 'react-router-dom';
import { ShoppingCart, Zap, Facebook, Twitter, Instagram, Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-dark text-slate-300 pt-20 pb-10 border-t border-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          <div className="space-y-6">
            <Link to="/" className="text-2xl font-bold tracking-tighter text-white flex items-center group">
              <div className="w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center mr-3 group-hover:scale-105 transition-transform">
                <div className="relative flex items-center justify-center">
                  <ShoppingCart size={20} className="mr-1" />
                  <Zap size={12} className="absolute top-0 right-0 text-accent fill-current" />
                </div>
              </div>
              SwiftCart
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
              Redefining the premium ecommerce experience. Quality products, seamless shopping, and unmatched customer service.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-colors"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-colors"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-colors"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-colors"><Github className="w-5 h-5" /></a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Shop</h3>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link to="/" className="text-slate-400 hover:text-primary transition-colors flex items-center group"><span className="w-0 group-hover:w-2 h-[2px] bg-primary mr-0 group-hover:mr-2 transition-all"></span>Men's Collection</Link></li>
              <li><Link to="/" className="text-slate-400 hover:text-primary transition-colors flex items-center group"><span className="w-0 group-hover:w-2 h-[2px] bg-primary mr-0 group-hover:mr-2 transition-all"></span>Women's Collection</Link></li>
              <li><Link to="/" className="text-slate-400 hover:text-primary transition-colors flex items-center group"><span className="w-0 group-hover:w-2 h-[2px] bg-primary mr-0 group-hover:mr-2 transition-all"></span>Accessories</Link></li>
              <li><Link to="/" className="text-slate-400 hover:text-primary transition-colors flex items-center group"><span className="w-0 group-hover:w-2 h-[2px] bg-primary mr-0 group-hover:mr-2 transition-all"></span>New Arrivals</Link></li>
              <li><Link to="/" className="text-slate-400 hover:text-primary transition-colors flex items-center group"><span className="w-0 group-hover:w-2 h-[2px] bg-primary mr-0 group-hover:mr-2 transition-all"></span>Discounts & Sale</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Support</h3>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link to="/" className="text-slate-400 hover:text-primary transition-colors flex items-center group"><span className="w-0 group-hover:w-2 h-[2px] bg-primary mr-0 group-hover:mr-2 transition-all"></span>Help Center</Link></li>
              <li><Link to="/" className="text-slate-400 hover:text-primary transition-colors flex items-center group"><span className="w-0 group-hover:w-2 h-[2px] bg-primary mr-0 group-hover:mr-2 transition-all"></span>Shipping Info</Link></li>
              <li><Link to="/" className="text-slate-400 hover:text-primary transition-colors flex items-center group"><span className="w-0 group-hover:w-2 h-[2px] bg-primary mr-0 group-hover:mr-2 transition-all"></span>Returns & Exchanges</Link></li>
              <li><Link to="/" className="text-slate-400 hover:text-primary transition-colors flex items-center group"><span className="w-0 group-hover:w-2 h-[2px] bg-primary mr-0 group-hover:mr-2 transition-all"></span>Order Tracking</Link></li>
              <li><Link to="/" className="text-slate-400 hover:text-primary transition-colors flex items-center group"><span className="w-0 group-hover:w-2 h-[2px] bg-primary mr-0 group-hover:mr-2 transition-all"></span>Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Company</h3>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link to="/" className="text-slate-400 hover:text-primary transition-colors flex items-center group"><span className="w-0 group-hover:w-2 h-[2px] bg-primary mr-0 group-hover:mr-2 transition-all"></span>About Us</Link></li>
              <li><Link to="/" className="text-slate-400 hover:text-primary transition-colors flex items-center group"><span className="w-0 group-hover:w-2 h-[2px] bg-primary mr-0 group-hover:mr-2 transition-all"></span>Careers</Link></li>
              <li><Link to="/" className="text-slate-400 hover:text-primary transition-colors flex items-center group"><span className="w-0 group-hover:w-2 h-[2px] bg-primary mr-0 group-hover:mr-2 transition-all"></span>Privacy Policy</Link></li>
              <li><Link to="/" className="text-slate-400 hover:text-primary transition-colors flex items-center group"><span className="w-0 group-hover:w-2 h-[2px] bg-primary mr-0 group-hover:mr-2 transition-all"></span>Terms of Service</Link></li>
            </ul>
          </div>
          
        </div>
        
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} SwiftCart. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <span className="hover:text-white cursor-pointer transition-colors">India</span>
            <span className="hover:text-white cursor-pointer transition-colors">English (US)</span>
            <span className="hover:text-white cursor-pointer transition-colors">$ USD</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
