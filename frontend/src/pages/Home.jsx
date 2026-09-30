import { useState, useEffect } from 'react';
import api from '../api/axios';
import ProductCard from '../components/ProductCard';
import { Search, ArrowRight, TrendingUp, ShieldCheck, Truck, Clock, Zap, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const url = `/products?keyword=${keyword}&category=${category}`;
        const { data } = await api.get(url);
        setProducts(data);
        
        if (categories.length === 0) {
          const uniqueCategories = [...new Set(data.map(p => p.category))];
          setCategories(uniqueCategories.slice(0, 8));
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
    setCurrentPage(1);
  }, [keyword, category]);

  const handleSearch = (e) => {
    e.preventDefault();
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="w-full bg-light">
      {/* Hero Section */}
      <section className="relative h-[95vh] min-h-[600px] max-h-[900px] bg-dark overflow-hidden flex items-center -mt-24">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80" alt="Premium lifestyle background" loading="eager" className="w-full h-full object-cover opacity-30 mix-blend-overlay" />
          <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/80 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-4 md:px-8 relative z-10 pt-24">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-3xl text-white"
          >
            <span className="inline-block py-1 px-3 rounded-full bg-primary/20 text-blue-300 text-sm font-semibold mb-6 border border-primary/30">
              New Collection Available
            </span>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-4 sm:mb-6 leading-tight">
              Welcome to <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">SwiftCart</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-slate-300 mb-8 sm:mb-12 leading-relaxed max-w-2xl font-light">
              Shop Smarter. Checkout Faster. Discover premium products with uncompromising quality and modern design.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button aria-label="Shop Now" onClick={() => document.getElementById('shop-section')?.scrollIntoView({ behavior: 'smooth' })} className="bg-primary text-white px-8 py-4 rounded-full font-bold hover:bg-blue-700 transition-all flex items-center justify-center shadow-lg shadow-primary/30 w-full sm:w-auto text-base hover:scale-105 active:scale-95">
                Shop Now <Zap className="w-5 h-5 ml-2 fill-current text-accent" />
              </button>
              <button aria-label="Explore Collection" onClick={() => document.getElementById('categories-section')?.scrollIntoView({ behavior: 'smooth' })} className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/20 transition-all w-full sm:w-auto text-base hover:scale-105 active:scale-95">
                Explore Collection
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Banner */}
      <section className="bg-white border-b border-slate-100">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-x divide-slate-100">
            <div className="flex flex-col items-center p-4">
              <Truck className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-semibold text-dark mb-1 text-sm md:text-base">Free Fast Delivery</h3>
              <p className="text-xs text-slate-500">Orders over $150</p>
            </div>
            <div className="flex flex-col items-center p-4">
              <ShieldCheck className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-semibold text-dark mb-1 text-sm md:text-base">Secure Checkout</h3>
              <p className="text-xs text-slate-500">256-bit encryption</p>
            </div>
            <div className="flex flex-col items-center p-4">
              <Clock className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-semibold text-dark mb-1 text-sm md:text-base">24/7 Support</h3>
              <p className="text-xs text-slate-500">Always here to help</p>
            </div>
            <div className="flex flex-col items-center p-4">
              <Star className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-semibold text-dark mb-1 text-sm md:text-base">Premium Quality</h3>
              <p className="text-xs text-slate-500">Top brands guaranteed</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section id="categories-section" className="container mx-auto px-4 md:px-8 py-16">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-dark mb-2">Shop by Category</h2>
            <p className="text-slate-500">Find exactly what you are looking for.</p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {['Electronics', 'Fashion', 'Beauty', 'Home & Lifestyle'].map((cat, idx) => (
            <div key={idx} className="group relative h-48 md:h-64 rounded-2xl overflow-hidden cursor-pointer" onClick={() => { setCategory(cat.toLowerCase()); document.getElementById('shop-section')?.scrollIntoView({ behavior: 'smooth' }); }}>
              <div className="absolute inset-0 bg-dark/20 group-hover:bg-dark/40 transition-colors z-10"></div>
              <img src={`https://images.unsplash.com/photo-${idx === 0 ? '1498049794561-7780e7231661' : idx === 1 ? '1445205170230-053b83016050' : idx === 2 ? '1596462502278-27bf85033e54' : '1616486029423-aaa4789e8c9a'}?auto=format&fit=crop&q=80&w=600`} alt={cat} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 z-20 flex items-center justify-center">
                <h3 className="text-white text-xl md:text-2xl font-bold tracking-wide drop-shadow-md">{cat}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trending Products */}
      <div id="shop-section" className="container mx-auto px-4 md:px-8 py-12 scroll-mt-24">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-10 gap-6">
          <div className="w-full lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-dark mb-2 flex items-center">
              Trending Products <Zap className="ml-3 w-8 h-8 text-accent fill-current" />
            </h2>
            <p className="text-slate-500">Discover the most sought-after items this week.</p>
          </div>

          <div className="w-full lg:w-1/2 flex flex-col sm:flex-row gap-4 justify-end">
            <form onSubmit={handleSearch} className="relative w-full sm:w-72">
              <input
                type="text"
                aria-label="Search products"
                placeholder="Search for anything..."
                className="w-full pl-12 pr-4 py-3.5 bg-white border-2 border-slate-100 rounded-full focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 text-sm transition-all shadow-sm text-dark font-medium placeholder-slate-400"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
              <Search className="absolute left-5 top-4 text-slate-400 w-4 h-4" />
            </form>

            <select 
              aria-label="Filter by category"
              className="w-full sm:w-48 p-3.5 bg-white border-2 border-slate-100 rounded-full focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 text-sm appearance-none shadow-sm cursor-pointer text-dark font-medium transition-all"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%230F172A\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'%3E%3C/path%3E%3C/svg%3E")', backgroundPosition: 'right 1.2rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1em' }}
            >
              <option value="">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat} className="capitalize">{cat.replace('-', ' ')}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="flex justify-center py-32">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 rounded-full border-4 border-slate-200"></div>
              <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
            </div>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-32 bg-white rounded-3xl border border-slate-100 shadow-sm mx-4 sm:mx-0">
            <Search className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-dark mb-2">No products found</h3>
            <p className="text-slate-500 max-w-md mx-auto">We couldn't find any products matching your current search. Try different keywords or categories.</p>
            <button onClick={() => {setKeyword(''); setCategory('');}} className="mt-6 text-primary font-semibold hover:underline">Clear Filters</button>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid grid-cols-1 min-[450px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-12">
              {currentProducts.map((product, index) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
            
            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 pt-8 border-t border-slate-200">
                <button 
                  onClick={() => paginate(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  aria-label="Previous page"
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-dark font-medium hover:bg-slate-50 hover:border-slate-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  Prev
                </button>
                
                <div className="flex gap-1">
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => paginate(i + 1)}
                      aria-label={`Page ${i + 1}`}
                      className={`w-10 h-10 rounded-xl flex items-center justify-center font-semibold transition-all ${currentPage === i + 1 ? 'bg-primary text-white shadow-md' : 'text-slate-600 hover:bg-slate-100'}`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>

                <button 
                  onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  aria-label="Next page"
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-dark font-medium hover:bg-slate-50 hover:border-slate-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  Next
                </button>
              </div>
            )}
          </motion.div>
        )}
      </div>

      {/* Best Sellers Promo */}
      <section className="container mx-auto px-4 md:px-8 py-16">
        <div className="relative rounded-[2rem] overflow-hidden bg-dark h-[450px] flex items-center shadow-2xl">
           <img src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80" alt="Best Sellers Promo" loading="lazy" className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay" />
           <div className="absolute inset-0 bg-gradient-to-r from-dark to-transparent"></div>
           <div className="relative z-10 p-8 md:p-16 max-w-2xl">
             <span className="flex items-center text-accent font-bold tracking-wider uppercase text-sm mb-4">
               <Star className="w-4 h-4 mr-2 fill-current" /> Best Sellers
             </span>
             <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">Upgrade Your <br/>Everyday Life</h2>
             <p className="text-lg text-slate-300 mb-8 max-w-lg">Shop our highest-rated products loved by thousands of customers worldwide.</p>
             <button aria-label="Explore Best Sellers" onClick={() => document.getElementById('shop-section')?.scrollIntoView({ behavior: 'smooth' })} className="bg-white text-dark px-8 py-4 rounded-full font-bold hover:bg-slate-100 transition-all hover:scale-105 active:scale-95 shadow-xl flex items-center">
               Shop Best Sellers <ArrowRight className="w-5 h-5 ml-2" />
             </button>
           </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-white py-24 border-t border-slate-100">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <Zap className="w-12 h-12 text-primary mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4 tracking-tight">Join the SwiftCart Club</h2>
          <p className="text-lg text-slate-500 mb-10 px-4">Subscribe to get special offers, early access to new collections, and once-in-a-lifetime deals.</p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <input 
              type="email" 
              aria-label="Email address"
              placeholder="Enter your email address" 
              className="flex-grow px-6 py-4 rounded-full border-2 border-slate-100 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 text-dark font-medium shadow-sm"
              required
            />
            <button type="submit" aria-label="Subscribe" className="bg-dark text-white px-8 py-4 rounded-full font-bold hover:bg-slate-800 transition-all shadow-md hover:shadow-lg whitespace-nowrap">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;
