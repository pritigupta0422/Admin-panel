import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff, ShieldCheck, Lock, Mail } from 'lucide-react';

export default function Login() {
  const { user, login, error, loading } = useAuth();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [validationError, setValidationError] = useState('');

  // Redirect if user is already logged in
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationError('');

    if (!email.trim() || !password.trim()) {
      setValidationError('Please fill in both fields.');
      return;
    }

    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      // Error handled inside AuthContext and exposed via error variable
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F9FB] px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-premium border border-slate-200">
        
        {/* Branding header */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#0a0a0a]/5 text-[#0a0a0a] mb-4">
            <ShieldCheck className="w-6 h-6 stroke-[2]" />
          </div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">
            Sign in to Nexix Admin
          </h2>
          <p className="mt-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Enter your tech workspace credentials
          </p>
        </div>

        {/* Login Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          
          {/* Error notifications */}
          {(error || validationError) && (
            <div className="p-3.5 bg-[#fafafa] border border-[#e4e4e7] rounded-lg text-xs text-black flex items-center">
              {validationError || error}
            </div>
          )}

          <div className="space-y-4">
            {/* Email Field */}
            <div>
              <label htmlFor="email-address" className="text-[10px] font-bold text-slate-450 uppercase tracking-wider block mb-1.5">
                Work Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full pl-10 pr-3 h-10 border border-slate-200 rounded-lg placeholder-slate-400 text-xs text-slate-700 bg-white focus:outline-none focus:border-[#0a0a0a] focus:ring-2 focus:ring-[#0a0a0a]/10 transition-all"
                  placeholder="admin@nexix.tech"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="text-[10px] font-bold text-slate-455 uppercase tracking-wider block mb-1.5">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full pl-10 pr-10 h-10 border border-slate-200 rounded-lg placeholder-slate-400 text-xs text-slate-700 bg-white focus:outline-none focus:border-[#0a0a0a] focus:ring-2 focus:ring-[#0a0a0a]/10 transition-all"
                  placeholder="••••••••"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-655 transition-colors cursor-pointer"
                  disabled={loading}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          {/* Submit Action */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full h-10 flex justify-center items-center border border-transparent text-xs font-bold uppercase tracking-wider rounded-lg text-white bg-[#0a0a0a] hover:bg-[#1f1f1f] active:scale-[0.97] disabled:opacity-50 transition-all cursor-pointer shadow-sm"
            >
              {loading ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Authenticating...
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </div>

        </form>

        {/* Demo Credentials Help */}
        <div className="mt-6 pt-4 border-t border-slate-100 text-center">
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
            Demo Credentials: <span className="text-slate-655 font-bold font-mono lowercase">admin@nexix.tech</span> / <span className="text-slate-655 font-bold font-mono">admin123</span>
          </p>
        </div>

      </div>
    </div>
  );
}
