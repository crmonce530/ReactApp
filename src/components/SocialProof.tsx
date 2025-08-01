import React from 'react';
import { motion } from 'framer-motion';
import { 
  Star, 
  Quote, 
  Award, 
  Shield, 
  Users,
  TrendingUp,
  CheckCircle
} from 'lucide-react';

const SocialProof: React.FC = () => {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'CEO, TechStart Inc.',
      company: 'TechStart Inc.',
      content: 'CRMONCE transformed our sales process. We saw a 40% increase in conversions within the first month.',
      rating: 5,
      avatar: '/api/placeholder/60/60'
    },
    {
      name: 'Michael Chen',
      role: 'Sales Director',
      company: 'GrowthCo',
      content: 'The automation features alone saved us 20 hours per week. The ROI was immediate and significant.',
      rating: 5,
      avatar: '/api/placeholder/60/60'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Marketing Manager',
      company: 'InnovateCorp',
      content: 'Finally, a CRM that actually makes our team more productive instead of slowing us down.',
      rating: 5,
      avatar: '/api/placeholder/60/60'
    }
  ];

  const trustIndicators = [
    { icon: Shield, text: 'SOC 2 Type II Certified', color: 'text-blue-600' },
    { icon: Award, text: 'G2 Crowd Leader 2024', color: 'text-green-600' },
    { icon: Users, text: '10,000+ Happy Customers', color: 'text-purple-600' },
    { icon: TrendingUp, text: '99.9% Uptime Guarantee', color: 'text-orange-600' }
  ];

  const customerLogos = [
    'TechCorp', 'InnovateCo', 'GrowthLabs', 'FutureTech', 'SmartBiz', 'NextGen'
  ];

  return (
    <div className="bg-white">
      {/* Customer Logos */}
      <section className="py-12 border-b border-gray-200">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <p className="text-gray-600 font-medium">Trusted by leading companies worldwide</p>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
            {customerLogos.map((logo, index) => (
              <motion.div
                key={logo}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center justify-center"
              >
                <div className="w-32 h-12 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-600 font-semibold text-sm">{logo}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-12">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {trustIndicators.map((indicator, index) => (
              <motion.div
                key={indicator.text}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className={`w-12 h-12 ${indicator.color} bg-opacity-10 rounded-lg flex items-center justify-center mx-auto mb-3`}>
                  <indicator.icon size={24} className={indicator.color} />
                </div>
                <p className="text-sm font-medium text-gray-700">{indicator.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join thousands of satisfied customers who have transformed their business with CRMONCE
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} className="text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <Quote className="text-gray-300 mb-4" size={24} />
                
                <p className="text-gray-700 mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>
                
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary-100 to-accent-100 rounded-full flex items-center justify-center">
                    <Users size={20} className="text-primary-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                    <div className="text-sm text-primary-600 font-medium">{testimonial.company}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">10,000+</div>
              <div className="text-gray-600">Happy Customers</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">4.9/5</div>
              <div className="text-gray-600">Customer Rating</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">99.9%</div>
              <div className="text-gray-600">Uptime</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">24/7</div>
              <div className="text-gray-600">Support</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-accent-600 text-white">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Join 10,000+ Successful Businesses
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Start your free trial today and see why leading companies choose CRMONCE
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 flex items-center space-x-2">
                <CheckCircle size={20} />
                <span>Start Free Trial</span>
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105">
                Schedule Demo
              </button>
            </div>
            
            <div className="mt-6 text-sm opacity-80">
              No credit card required • 14-day free trial • Cancel anytime
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default SocialProof; 