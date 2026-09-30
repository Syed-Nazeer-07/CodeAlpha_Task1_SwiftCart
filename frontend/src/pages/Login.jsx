import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="flex justify-center items-center h-full my-20 px-4">
      <div className="w-full max-w-md">
        <button aria-label="Back" onClick={() => navigate(-1)} className="flex items-center text-dark font-semibold text-sm hover:underline mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg> Back
        </button>
        <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100">
          <h2 className="text-3xl font-bold text-center mb-8 text-dark tracking-tight">Login to SwiftCart</h2>
          {error && <div className="bg-red-50 text-red-600 border border-red-100 p-4 rounded-xl mb-6 text-sm font-medium text-center">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label className="block text-slate-700 mb-2 font-medium text-sm" htmlFor="email">Email Address</label>
              <input 
                type="email" 
                id="email" 
                className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-dark focus:ring-1 focus:ring-dark transition-all text-dark"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-8">
              <label className="block text-slate-700 mb-2 font-medium text-sm" htmlFor="password">Password</label>
              <input 
                type="password" 
                id="password" 
                className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-dark focus:ring-1 focus:ring-dark transition-all text-dark"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button 
              type="submit" 
              className="w-full bg-dark text-white p-3.5 rounded-full hover:bg-black transition-all duration-200 shadow-md font-bold text-base"
            >
              Sign In
            </button>
          </form>
          <p className="mt-6 text-center text-slate-500 text-sm">
            New Customer? <Link to="/register" className="text-dark font-bold hover:underline">Create an account</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
