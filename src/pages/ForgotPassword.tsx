import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle, Shield, Lock } from 'lucide-react';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 2000);
  };

  const features = [
    {
      icon: Shield,
      title: 'Secure Reset',
      description: 'Your password reset link is encrypted and secure'
    },
    {
      icon: Lock,
      title: 'Quick Process',
      description: 'Reset your password in just a few minutes'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 py-8">
      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Side - Form */}
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
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  Forgot Password?
                </h1>
                <p className="text-gray-600">
                  No worries! Enter your email and we'll send you reset instructions.
                </p>
              </motion.div>

              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-md focus:border-accent-500 focus:outline-none transition-all duration-200 bg-white"
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                  </motion.div>

                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-accent-600 hover:bg-accent-700 text-white font-semibold py-3 px-6 rounded-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Reset Link</span>
                      </>
                    )}
                  </motion.button>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  className="text-center space-y-6"
                >
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle size={32} className="text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Check Your Email
                    </h3>
                    <p className="text-gray-600">
                      We've sent password reset instructions to <strong>{email}</strong>
                    </p>
                  </div>
                  <div className="bg-blue-50 rounded-2xl p-4">
                    <p className="text-sm text-blue-800">
                      Didn't receive the email? Check your spam folder or{' '}
                      <button 
                        onClick={() => setIsSubmitted(false)}
                        className="text-blue-600 hover:text-blue-700 font-medium underline"
                      >
                        try again
                      </button>
                    </p>
                  </div>
                </motion.div>
              )}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="mt-8 text-center"
              >
                <Link 
                  to="/login" 
                  className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium transition-colors"
                >
                  <ArrowLeft size={16} />
                  <span>Back to Sign In</span>
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Right Side - Features */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="hidden lg:block order-1 lg:order-2"
        >
          <div className="space-y-6 lg:space-y-8">
            <div className="text-center lg:text-left">
                              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Secure Password Recovery
                </h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  We take your security seriously. Our password reset process is 
                  encrypted and designed to keep your account safe.
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
              className="bg-accent-50 rounded-lg p-6 border border-accent-200"
            >
              <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-3 lg:mb-4">
                Need Help?
              </h3>
              <p className="text-sm lg:text-base text-gray-600 mb-4 lg:mb-6">
                If you're still having trouble accessing your account, 
                our support team is here to help.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center space-x-2 bg-white text-accent-600 hover:bg-accent-50 font-semibold py-2 px-4 rounded-md transition-all duration-200"
              >
                <span>Contact Support</span>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ForgotPassword; 