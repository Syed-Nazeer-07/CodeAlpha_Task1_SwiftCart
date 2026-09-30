import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../api/axios';
import ProductCard from '../components/ProductCard';
import { Search, ArrowRight, ShieldCheck, Truck, Clock, Star, RefreshCw } from 'lucide-react';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  
  const keywordParam = searchParams.get('keyword') || '';
  const categoryParam = searchParams.get('category') || '';
  
  const [keyword, setKeyword] = useState(keywordParam);
  const [category, setCategory] = useState(categoryParam);
  const [collection, setCollection] = useState('All');
  const [categories, setCategories] = useState([]);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Sync state with URL params on mount or when URL changes
  useEffect(() => {
    setKeyword(searchParams.get('keyword') || '');
    setCategory(searchParams.get('category') || '');
  }, [searchParams]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        let url = `/products?keyword=${keyword}&category=${category}`;
        if (collection === 'Best Sellers') url += '&bestseller=true';
        if (collection === 'Featured') url += '&featured=true';
        
        const { data } = await api.get(url);
        
        // Handle Top Rated client-side since API doesn't support sorting yet
        let processedData = data;
        if (collection === 'Top Rated') {
          processedData = [...data].sort((a, b) => b.rating - a.rating);
        }
        
        setProducts(processedData);
        
        // Dynamically extract categories only if we haven't yet, or if we have full data
        if (!keyword && !category && categories.length === 0) {
          const catCounts = {};
          data.forEach(p => {
            catCounts[p.category] = (catCounts[p.category] || 0) + 1;
          });
          const uniqueCategories = Object.keys(catCounts).map(cat => ({
            name: cat,
            count: catCounts[cat]
          }));
          setCategories(uniqueCategories);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    
    // Add simple debounce
    const timeoutId = setTimeout(() => {
      fetchProducts();
      setCurrentPage(1);
    }, 300);
    
    return () => clearTimeout(timeoutId);
  }, [keyword, category, collection]);

  const handleSearch = (e) => {
    e.preventDefault();
    updateParams(keyword, category);
  };

  const updateParams = (newKeyword, newCategory) => {
    const params = new URLSearchParams();
    if (newKeyword) params.set('keyword', newKeyword);
    if (newCategory) params.set('category', newCategory);
    setSearchParams(params);
  };

  const resetFilters = () => {
    setKeyword('');
    setCategory('');
    setCollection('All');
    setSearchParams({});
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="w-full bg-white pt-20">
      {/* Minimal Hero Section */}
      <section className="bg-slate-50 border-b border-slate-100">
        <div className="container mx-auto px-4 md:px-8 py-16 md:py-24 flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-6xl font-extrabold text-dark tracking-tight mb-4 leading-tight">
              Elevate Your <br/> Everyday Style
            </h1>
            <p className="text-lg text-slate-500 mb-8 max-w-md">
              Discover our latest collection of premium products. Clean designs, uncompromising quality.
            </p>
            <div className="flex gap-4">
              <button onClick={() => document.getElementById('shop-section')?.scrollIntoView({ behavior: 'smooth' })} className="bg-dark text-white px-8 py-3.5 rounded-full font-bold hover:bg-slate-800 transition-colors">
                Shop Now
              </button>
              <button onClick={() => document.getElementById('categories-section')?.scrollIntoView({ behavior: 'smooth' })} className="bg-white text-dark border border-slate-200 px-8 py-3.5 rounded-full font-bold hover:bg-slate-50 transition-colors">
                Categories
              </button>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-end">
            <img 
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800" 
              alt="Premium lifestyle" 
              className="w-full max-w-lg aspect-[4/3] object-cover rounded-2xl shadow-sm"
            />
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="border-b border-slate-100">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-x divide-slate-100">
            <div className="flex flex-col items-center p-2">
              <Truck className="w-6 h-6 text-dark mb-2" />
              <h3 className="font-semibold text-dark text-sm">Free Fast Delivery</h3>
              <p className="text-xs text-slate-500">Orders over $150</p>
            </div>
            <div className="flex flex-col items-center p-2">
              <ShieldCheck className="w-6 h-6 text-dark mb-2" />
              <h3 className="font-semibold text-dark text-sm">Secure Payments</h3>
              <p className="text-xs text-slate-500">256-bit encryption</p>
            </div>
            <div className="flex flex-col items-center p-2">
              <RefreshCw className="w-6 h-6 text-dark mb-2" />
              <h3 className="font-semibold text-dark text-sm">Easy Returns</h3>
              <p className="text-xs text-slate-500">30-day return policy</p>
            </div>
            <div className="flex flex-col items-center p-2">
              <Clock className="w-6 h-6 text-dark mb-2" />
              <h3 className="font-semibold text-dark text-sm">24/7 Support</h3>
              <p className="text-xs text-slate-500">Always here to help</p>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Categories */}
      {categories.length > 0 && (
        <section id="categories-section" className="container mx-auto px-4 md:px-8 py-16 scroll-mt-20 border-b border-slate-100">
          <h2 className="text-2xl md:text-3xl font-bold text-dark mb-8">Top Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat, idx) => {
              const coverImages = {
                'Electronics': 'https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&q=80&w=600',
                'Fashion': 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=600',
                'Home & Living': 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=600',
                'Beauty': 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=600',
                'Sports': 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=600',
                'Books': 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=600',
              };
              const bgImg = coverImages[cat.name] || 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=600';

              return (
                <div 
                  key={cat.name} 
                  onClick={() => {
                    setCategory(cat.name);
                    updateParams(keyword, cat.name);
                    document.getElementById('shop-section')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="group relative h-40 md:h-56 rounded-2xl overflow-hidden cursor-pointer bg-dark flex items-end justify-center shadow-sm"
                >
                  <img src={bgImg} alt={cat.name} className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 group-hover:scale-110 transition-all duration-700" />
                  <div className="relative z-20 text-center w-full p-4 bg-gradient-to-t from-dark/90 to-transparent">
                    <h3 className="text-white text-lg font-bold tracking-tight capitalize group-hover:-translate-y-1 transition-transform">{cat.name.replace('-', ' ')}</h3>
                    <p className="text-white/80 text-xs font-medium uppercase tracking-widest mt-1 opacity-0 group-hover:opacity-100 group-hover:-translate-y-1 transition-all">{cat.count} Items</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Shop / Products Section */}
      <div id="shop-section" className="container mx-auto px-4 md:px-8 py-12 scroll-mt-20 border-t border-slate-100">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-10 gap-6">
          <div className="w-full lg:w-1/3">
            <h2 className="text-2xl md:text-3xl font-bold text-dark mb-2">
              {keyword || category ? 'Search Results' : 'Featured Collections'}
            </h2>
            <p className="text-sm text-slate-500">
              {products.length} {products.length === 1 ? 'product' : 'products'} available
            </p>
          </div>

          <div className="w-full lg:w-2/3 flex flex-col sm:flex-row gap-4 justify-end">
            <form onSubmit={handleSearch} className="relative w-full sm:w-80">
              <input
                type="text"
                aria-label="Search products"
                placeholder="Search products, brands..."
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-dark focus:ring-1 focus:ring-dark text-sm transition-all text-dark"
                value={keyword}
                onChange={(e) => {
                  setKeyword(e.target.value);
                  updateParams(e.target.value, category);
                }}
              />
              <Search className="absolute left-4 top-3.5 text-slate-400 w-4 h-4" />
            </form>

            <select 
              aria-label="Filter by category"
              className="w-full sm:w-48 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-dark focus:ring-1 focus:ring-dark text-sm appearance-none cursor-pointer text-dark transition-all"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                updateParams(keyword, e.target.value);
              }}
              style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%230F172A\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'%3E%3C/path%3E%3C/svg%3E")', backgroundPosition: 'right 1rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1em' }}
            >
              <option value="">All Categories</option>
              {categories.map(cat => (
                <option key={cat.name} value={cat.name} className="capitalize">{cat.name.replace('-', ' ')}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Collection Tabs */}
        {!keyword && !category && (
          <div className="flex space-x-2 sm:space-x-4 mb-10 overflow-x-auto pb-2 scrollbar-hide">
            {['All', 'Featured', 'Best Sellers', 'Top Rated'].map(tab => (
              <button
                key={tab}
                onClick={() => { setCollection(tab); setCurrentPage(1); }}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-colors ${collection === tab ? 'bg-dark text-white shadow-sm' : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'}`}
              >
                {tab}
              </button>
            ))}
          </div>
        )}

        {/* Product Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="relative w-10 h-10">
              <div className="absolute inset-0 rounded-full border-2 border-slate-100"></div>
              <div className="absolute inset-0 rounded-full border-2 border-dark border-t-transparent animate-spin"></div>
            </div>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-24 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
            <Search className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-dark mb-2">No products found</h3>
            <p className="text-slate-500 mb-6 text-sm">We couldn't find anything matching your criteria.</p>
            <button onClick={resetFilters} className="bg-white border border-slate-200 text-dark px-6 py-2 rounded-full text-sm font-semibold hover:bg-slate-50 transition-colors shadow-sm">
              Clear all filters
            </button>
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 mb-12">
              {currentProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
            
            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 pt-8 border-t border-slate-100">
                <button 
                  onClick={() => paginate(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  aria-label="Previous page"
                  className="px-4 py-2 rounded-lg border border-slate-200 text-dark text-sm font-medium hover:bg-slate-50 disabled:opacity-50 transition-all"
                >
                  Prev
                </button>
                
                <div className="flex gap-1 hidden sm:flex">
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => paginate(i + 1)}
                      className={`w-9 h-9 rounded-lg flex items-center justify-center text-sm font-semibold transition-all ${currentPage === i + 1 ? 'bg-dark text-white' : 'text-slate-600 hover:bg-slate-100'}`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>

                <button 
                  onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  aria-label="Next page"
                  className="px-4 py-2 rounded-lg border border-slate-200 text-dark text-sm font-medium hover:bg-slate-50 disabled:opacity-50 transition-all"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        )}
      </div>

    </div>
  );
};

export default Home;
