import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Shield, Users, Zap, CheckCircle } from 'lucide-react';
import CRMONCELogo from '../components/CRMONCELogo';

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    company: '',
    phone: '',
    jobTitle: '',
    city: '',
    country: '',
    agreeToTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
          company: formData.company,
          jobTitle: formData.jobTitle,
          city: formData.city,
          country: formData.country,
          interests: [] // Add interests field if needed
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store the token in localStorage
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('user', JSON.stringify(data.data.user));
        
        // Dispatch login event to update header
        window.dispatchEvent(new Event('userLogin'));
        
        // Navigate to dashboard
        navigate('/dashboard');
      } else {
        // Handle error
        alert(data.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const features = [
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Bank-level security with encryption and compliance'
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Work seamlessly with your entire team'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Optimized for speed and performance'
    }
  ];

  const benefits = [
    'Free 14-day trial',
    'No credit card required',
    'Full access to all features',
    '24/7 customer support',
    'Cancel anytime'
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 py-8">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Side - Registration Form */}
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
                  Create Your Account
                </h1>
                <p className="text-gray-600">
                  Start your journey with CRMONCE today
                </p>
              </motion.div>

              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                {/* Step 1: Basic Information */}
                {currentStep === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                          First Name
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            required
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-colors duration-200"
                            placeholder="John"
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                          Last Name
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            required
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-colors duration-200"
                            placeholder="Doe"
                          />
                        </div>
                      </div>
                    </div>

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
                          placeholder="john@company.com"
                        />
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      disabled={!formData.firstName || !formData.lastName || !formData.email}
                      className="w-full bg-gradient-to-r from-accent-500 to-accent-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-accent-600 hover:to-accent-700 focus:ring-4 focus:ring-accent-500/20 transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      Continue
                      <ArrowRight className="ml-2 w-5 h-5 inline" />
                    </button>
                  </motion.div>
                )}

                {/* Step 2: Security & Company */}
                {currentStep === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-4"
                  >
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
                          placeholder="Create a strong password"
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

                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                        Confirm Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          id="confirmPassword"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-colors duration-200"
                          placeholder="Confirm your password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                        >
                          {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                        Company Name
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-colors duration-200"
                        placeholder="Your Company"
                      />
                    </div>

                    <div>
                      <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700 mb-2">
                        Job Title
                      </label>
                      <input
                        type="text"
                        id="jobTitle"
                        name="jobTitle"
                        value={formData.jobTitle}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-colors duration-200"
                        placeholder="e.g., IT Manager, CEO, Developer"
                      />
                    </div>

                    <div className="flex space-x-4">
                      <button
                        type="button"
                        onClick={() => setCurrentStep(1)}
                        className="flex-1 bg-gray-100 text-gray-700 font-semibold py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                      >
                        Back
                      </button>
                      <button
                        type="button"
                        onClick={() => setCurrentStep(3)}
                        disabled={!formData.password || !formData.confirmPassword || formData.password !== formData.confirmPassword}
                        className="flex-1 bg-gradient-to-r from-accent-500 to-accent-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-accent-600 hover:to-accent-700 focus:ring-4 focus:ring-accent-500/20 transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                      >
                        Continue
                        <ArrowRight className="ml-2 w-5 h-5 inline" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Final Details */}
                {currentStep === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-4"
                  >
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-colors duration-200"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                          City
                        </label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-colors duration-200"
                          placeholder="New York"
                        />
                      </div>
                      <div>
                        <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">
                          Country
                        </label>
                        <input
                          type="text"
                          id="country"
                          name="country"
                          value={formData.country}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-colors duration-200"
                          placeholder="United States"
                        />
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        id="agreeToTerms"
                        name="agreeToTerms"
                        checked={formData.agreeToTerms}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-accent-600 border-gray-300 rounded focus:ring-accent-500 mt-1"
                      />
                      <label htmlFor="agreeToTerms" className="text-sm text-gray-600">
                        I agree to the{' '}
                        <Link to="/terms" className="text-accent-600 hover:text-accent-700 font-medium">
                          Terms of Service
                        </Link>{' '}
                        and{' '}
                        <Link to="/privacy" className="text-accent-600 hover:text-accent-700 font-medium">
                          Privacy Policy
                        </Link>
                      </label>
                    </div>

                    <div className="flex space-x-4">
                      <button
                        type="button"
                        onClick={() => setCurrentStep(2)}
                        className="flex-1 bg-gray-100 text-gray-700 font-semibold py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={isLoading || !formData.agreeToTerms}
                        className="flex-1 bg-gradient-to-r from-accent-500 to-accent-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-accent-600 hover:to-accent-700 focus:ring-4 focus:ring-accent-500/20 transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                      >
                        {isLoading ? (
                          <div className="flex items-center justify-center">
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                            Creating account...
                          </div>
                        ) : (
                          <div className="flex items-center justify-center">
                            Create Account
                            <ArrowRight className="ml-2 w-5 h-5" />
                          </div>
                        )}
                      </button>
                    </div>
                  </motion.div>
                )}

                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    Already have an account?{' '}
                    <Link
                      to="/login"
                      className="text-accent-600 hover:text-accent-700 font-semibold transition-colors duration-200"
                    >
                      Sign in
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
                Join Thousands of Businesses Using{' '}
                <span className="text-accent-600">CRMONCE</span>
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Transform your business operations with our comprehensive CRM solution. 
                Streamline processes, boost productivity, and drive growth.
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
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                What you get with your free trial:
              </h3>
              <div className="space-y-2">
                {benefits.map((benefit, index) => (
                  <div key={benefit} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Register; 