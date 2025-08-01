import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, ArrowRight, Shield, Users, Zap } from 'lucide-react';
import CRMONCELogo from '../components/CRMONCELogo';
import axios from 'axios';

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');
    
    try {
      const response = await axios.post('/api/auth/login', formData);
      
      if (response.data.success) {
        setSuccess('Login successful!');
        // Store token in localStorage
        localStorage.setItem('token', response.data.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.data.user));
        
        // Dispatch login event to update header
        window.dispatchEvent(new Event('userLogin'));
        
        // Navigate to dashboard after a short delay
        setTimeout(() => {
          navigate('/dashboard');
        }, 1000);
      }
    } catch (error: any) {
      if (error.response) {
        // Server responded with error
        if (error.response.data && error.response.data.message) {
          setError(error.response.data.message);
        } else if (error.response.data && error.response.data.errors) {
          setError(error.response.data.errors.join(', '));
        } else {
          setError('Login failed. Please try again.');
        }
      } else if (error.request) {
        // Network error
        setError('Network error. Please check your connection.');
      } else {
        // Other error
        setError('An unexpected error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const features = [
    {
      icon: Shield,
      title: 'Secure Authentication',
      description: 'Enterprise-grade security with multi-factor authentication'
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Work seamlessly with your team members'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Optimized performance for the best user experience'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 py-8">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Side - Login Form */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center order-2 lg:order-1"
        >
          <div className="w-full max-w-md">
            <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-center mb-8"
              >
                <div className="flex justify-center mb-4">
                  <CRMONCELogo size="md" variant="full" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  Welcome Back
                </h1>
                <p className="text-gray-600">
                  Sign in to your CRMONCE account
                </p>
              </motion.div>

              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-colors duration-200"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-colors duration-200"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                    {error}
                  </div>
                )}

                {/* Success Message */}
                {success && (
                  <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                    {success}
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-accent-600 border-gray-300 rounded focus:ring-accent-500"
                    />
                    <span className="ml-2 text-sm text-gray-600">Remember me</span>
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-sm text-accent-600 hover:text-accent-700 transition-colors duration-200"
                  >
                    Forgot password?
                  </Link>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-accent-500 to-accent-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-accent-600 hover:to-accent-700 focus:ring-4 focus:ring-accent-500/20 transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Signing in...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      Sign In
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </div>
                  )}
                </button>

                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    Don't have an account?{' '}
                    <Link
                      to="/register"
                      className="text-accent-600 hover:text-accent-700 font-semibold transition-colors duration-200"
                    >
                      Sign up
                    </Link>
                  </p>
                </div>
              </motion.form>
            </div>
          </div>
        </motion.div>

        {/* Right Side - Branding */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="order-1 lg:order-2"
        >
          <div className="space-y-6 lg:space-y-8">
            <div className="text-center lg:text-left">
              <div className="flex justify-center lg:justify-start mb-6">
                <CRMONCELogo size="lg" variant="full" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Transform Your Business with{' '}
                <span className="text-accent-600">CRMONCE</span>
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Access powerful tools and insights to streamline your operations, 
                enhance customer relationships, and drive growth.
              </p>
            </div>

            <div className="space-y-4 lg:space-y-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  className="flex items-start space-x-3 lg:space-x-4"
                >
                  <div className="w-10 h-10 bg-accent-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <feature.icon size={20} className="text-accent-600" />
                  </div>
                  <div>
                    <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-1 lg:mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm lg:text-base text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="bg-gradient-to-r from-accent-50 to-secondary-50 rounded-xl p-6 border border-accent-100"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Ready to get started?
              </h3>
              <p className="text-gray-600 mb-4">
                Join thousands of businesses already using CRMONCE to grow their operations.
              </p>
              <Link
                to="/register"
                className="inline-flex items-center text-accent-600 hover:text-accent-700 font-semibold transition-colors duration-200"
              >
                Create your account
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login; 