'use client';

import { useState } from 'react';
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, Github, Chrome } from 'lucide-react';

export default function AuthPage() {
  const [isSignIn, setIsSignIn] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-200 via-pink-200 to-blue-200 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Main card */}
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl w-full max-w-md p-8 relative z-10 border border-white/20">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-violet-600 to-pink-600 rounded-2xl mb-4 shadow-lg">
            <span className="text-2xl font-bold text-white">A</span>
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent">
            {isSignIn ? 'Welcome Back' : 'Join Us Today'}
          </h2>
          <p className="text-gray-600 mt-2">
            {isSignIn ? 'Sign in to continue your journey' : 'Create an account to get started'}
          </p>
        </div>

        {/* Toggle Buttons */}
        <div className="flex p-1 bg-gray-100 rounded-2xl mb-8">
          <button
            onClick={() => setIsSignIn(true)}
            className={`flex-1 py-3 text-sm font-medium rounded-xl transition-all duration-300 ${
              isSignIn 
                ? 'bg-white text-violet-600 shadow-md' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setIsSignIn(false)}
            className={`flex-1 py-3 text-sm font-medium rounded-xl transition-all duration-300 ${
              !isSignIn 
                ? 'bg-white text-pink-600 shadow-md' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Form */}
        <form className="space-y-5">
          {!isSignIn && (
            <div className="group">
              <label className="block text-sm font-medium text-gray-700 mb-2 ml-1">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-violet-600 transition-colors" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-violet-600 focus:outline-none transition-all bg-white/50"
                />
              </div>
            </div>
          )}

          <div className="group">
            <label className="block text-sm font-medium text-gray-700 mb-2 ml-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-violet-600 transition-colors" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="hello@example.com"
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-violet-600 focus:outline-none transition-all bg-white/50"
              />
            </div>
          </div>

          <div className="group">
            <label className="block text-sm font-medium text-gray-700 mb-2 ml-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-violet-600 transition-colors" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="••••••••"
                className="w-full pl-10 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:border-violet-600 focus:outline-none transition-all bg-white/50"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {!isSignIn && (
            <div className="group">
              <label className="block text-sm font-medium text-gray-700 mb-2 ml-1">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-pink-600 transition-colors" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-600 focus:outline-none transition-all bg-white/50"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
          )}

          {isSignIn && (
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="w-4 h-4 text-violet-600 border-gray-300 rounded focus:ring-violet-500" />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <a href="#" className="text-sm text-violet-600 hover:text-violet-800 hover:underline">
                Forgot password?
              </a>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-violet-600 to-pink-600 text-white font-semibold rounded-xl hover:from-violet-700 hover:to-pink-700 transform hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
          >
            {isSignIn ? 'Sign In' : 'Create Account'}
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white/80 text-gray-600">Or continue with</span>
          </div>
        </div>

        {/* Social Login - Fixed icons */}
        <div className="grid grid-cols-2 gap-4">
          <button className="flex items-center justify-center gap-3 py-3 border-2 border-gray-200 rounded-xl hover:border-gray-300 hover:bg-gray-50 transition-all group">
            <Chrome className="w-5 h-5 text-gray-600 group-hover:text-blue-500 transition-colors" />
            <span className="text-sm font-medium text-gray-700">Google</span>
          </button>
          <button className="flex items-center justify-center gap-3 py-3 border-2 border-gray-200 rounded-xl hover:border-gray-300 hover:bg-gray-50 transition-all group">
            <Github className="w-5 h-5 text-gray-600 group-hover:text-black transition-colors" />
            <span className="text-sm font-medium text-gray-700">GitHub</span>
          </button>
        </div>

        {/* Terms */}
        <p className="text-xs text-center text-gray-500 mt-8">
          By continuing, you agree to our{' '}
          <a href="#" className="text-violet-600 hover:underline">Terms of Service</a>
          {' '}and{' '}
          <a href="#" className="text-pink-600 hover:underline">Privacy Policy</a>
        </p>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}