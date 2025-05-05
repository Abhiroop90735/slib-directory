import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from './firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiUser, FiArrowRight, FiLogIn, FiUserPlus } from 'react-icons/fi';

function Login() {
  const [showRegister, setShowRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [isTransitioning, setIsTransitioning] = useState(false);


  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      setIsTransitioning(true);
      setTimeout(() => {
        if (user.email === 'abhiroop.m6@gmail.com') {
          navigate('/admin'); // Redirect to admin
        } else {
          navigate('/home'); // Normal users go to Home
        }
      }, 500);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  
  

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setShowRegister(false);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Left Side - Branding & Features */}
      <motion.div 
      initial={{ opacity: 1 }}
      animate={{ opacity: isTransitioning ? 0 : 1 }}
      transition={{ duration: 0.5 }}
      className="w-full md:w-1/2 bg-white p-8 md:p-12 lg:p-16 flex flex-col justify-center relative overflow-hidden"
    >
    
        <div className="max-w-md mx-auto">
          <motion.div 
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center mb-8"
          >
            <div className="w-12 h-12 rounded-lg bg-blue-600 flex items-center justify-center mr-4">
              <FiArrowRight className="text-white text-2xl" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800">SLIB Directory</h1>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-2xl font-semibold text-gray-700 mb-6"
          >
            Your Gateway to Software Libraries
          </motion.h2>

          <motion.ul 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, staggerChildren: 0.1 }}
            className="space-y-4 mb-10"
          >
            {[
              "🔍 Search thousands of libraries by name, category, or platform",
              "📊 Compare technical specs side-by-side",
              "💡 Get code samples and implementation guides",
              "🔔 Stay updated with version changes",
              "📱 Access anywhere, anytime"
            ].map((feature, index) => (
              <motion.li 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-start text-gray-600"
              >
                <span className="mr-3 mt-1 text-blue-500">•</span>
                <span>{feature}</span>
              </motion.li>
            ))}
          </motion.ul>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="bg-white/50 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-white"
          >
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                <FiUser className="text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-700">Join our community</h3>
                <p className="text-sm text-gray-500">1,000+ developers already exploring</p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Right Side - Auth Forms */}
      <div className="w-full md:w-1/2 bg-white p-8 md:p-12 lg:p-16 flex flex-col justify-center relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-blue-100/30"></div>
        <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-indigo-100/30"></div>
        
        <motion.div 
          key={showRegister ? 'register' : 'login'}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="max-w-md w-full mx-auto relative z-10"
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              {showRegister ? 'Create Account' : 'Welcome'}
            </h2>
            <p className="text-gray-500">
              {showRegister ? 'Join our community today' : 'Sign in to continue'}
            </p>
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg text-sm"
            >
              {error}
            </motion.div>
          )}

          {showRegister ? (
            <form onSubmit={handleRegister} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiUser className="text-gray-400" />
                  </div>
                  <input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className="text-gray-400" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="text-gray-400" />
                  </div>
                  <input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength="6"
                    className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  At least 6 characters
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className={`w-full flex items-center justify-center px-6 py-3 rounded-lg text-white font-medium transition-all ${isLoading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'}`}
              >
                {isLoading ? (
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <>
                    <FiUserPlus className="mr-2" />
                    Register
                  </>
                )}
              </motion.button>

              <p className="text-center text-sm text-gray-500">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setShowRegister(false)}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Sign in
                </button>
              </p>
            </form>
          ) : (
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label htmlFor="login-email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className="text-gray-400" />
                  </div>
                  <input
                    id="login-email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="login-password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="text-gray-400" />
                  </div>
                  <input
                    id="login-password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                <button
  type="button"
  onClick={() => alert('Password reset functionality coming soon!')}
  className="font-medium text-blue-600 hover:text-blue-500 text-sm"
>
  Forgot password?
</button>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className={`w-full flex items-center justify-center px-6 py-3 rounded-lg text-white font-medium transition-all ${isLoading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'}`}
              >
                {isLoading ? (
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <>
                    <FiLogIn className="mr-2" />
                    Sign in
                  </>
                )}
              </motion.button>

              <p className="text-center text-sm text-gray-500">
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => setShowRegister(true)}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Register now
                </button>
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default Login;