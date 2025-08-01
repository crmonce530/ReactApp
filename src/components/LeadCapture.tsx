import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  CheckCircle, 
  Clock, 
  Users, 
  Star,
  Zap,
  Shield,
  Gift
} from 'lucide-react';

const LeadCapture: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    // Here you would integrate with your email marketing service
    console.log('Lead captured:', email);
  };

  const socialProof = [
    { text: 'Join 10,000+ businesses', icon: Users },
    { text: '4.9/5 rating from customers', icon: Star },
    { text: 'Free 14-day trial', icon: Gift },
    { text: 'No credit card required', icon: Shield }
  ];

  const urgencyElements = [
    { text: 'Limited Time Offer', icon: Clock },
    { text: '50% off first 3 months', icon: Zap },
    { text: 'Setup in under 5 minutes', icon: CheckCircle }
  ];

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        className="fixed bottom-4 right-4 z-50 max-w-sm"
      >
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-6">
          {/* Close Button */}
          <button
            onClick={() => setIsVisible(false)}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          >
            ×
          </button>

          {/* Header */}
          <div className="text-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-primary-600 to-accent-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <Gift size={24} className="text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Get Your Free CRM Setup
            </h3>
            <p className="text-gray-600 text-sm">
              Transform your business in 14 days or less
            </p>
          </div>

          {/* Urgency Elements */}
          <div className="space-y-2 mb-4">
            {urgencyElements.map((item, index) => (
              <motion.div
                key={item.text}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center space-x-2 text-sm"
              >
                <item.icon size={16} className="text-primary-600" />
                <span className="text-gray-700 font-medium">{item.text}</span>
              </motion.div>
            ))}
          </div>

          {/* Lead Form */}
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your business email"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
              />
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-primary-600 to-accent-600 text-white font-semibold py-3 px-4 rounded-lg hover:from-primary-700 hover:to-accent-700 transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <span>Start Free Trial</span>
                <ArrowRight size={16} />
              </button>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-4"
            >
              <CheckCircle size={48} className="text-green-500 mx-auto mb-2" />
              <h4 className="text-lg font-semibold text-gray-900 mb-1">Thank You!</h4>
              <p className="text-gray-600 text-sm">Check your email for next steps</p>
            </motion.div>
          )}

          {/* Social Proof */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="space-y-1">
              {socialProof.map((item, index) => (
                <motion.div
                  key={item.text}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center space-x-2 text-xs text-gray-500"
                >
                  <item.icon size={12} />
                  <span>{item.text}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LeadCapture; 