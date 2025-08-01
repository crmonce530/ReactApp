import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  CheckCircle, 
  Star, 
  Users, 
  TrendingUp, 
  Award,
  Play,
  Building2,
  Settings,
  BookOpen,
  Users2,
  Globe,
  Shield,
  Zap,
  Target,
  Rocket
} from 'lucide-react';
import AnimatedStats from '../components/AnimatedStats';
import AnimatedChart from '../components/AnimatedChart';

const Home: React.FC = () => {
  const features = [
    {
      icon: Building2,
      title: "Dynamics 365 Implementation",
      description: "Complete CRM and ERP solutions tailored to your business needs",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Settings,
      title: "Power Platform Development",
      description: "Custom applications and automation to streamline operations",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: BookOpen,
      title: "Professional Training",
      description: "Comprehensive training programs for your team",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Users2,
      title: "Consulting Services",
      description: "Expert guidance to optimize your business processes",
      color: "from-orange-500 to-red-500"
    }
  ];

  const stats = [
    {
      label: "Happy Clients",
      value: 500,
      suffix: "+",
      color: "text-blue-600",
      icon: <Users className="w-6 h-6" />
    },
    {
      label: "Projects Completed",
      value: 1000,
      suffix: "+",
      color: "text-purple-600",
      icon: <Target className="w-6 h-6" />
    },
    {
      label: "Success Rate",
      value: 98,
      suffix: "%",
      color: "text-green-600",
      icon: <TrendingUp className="w-6 h-6" />
    },
    {
      label: "Years Experience",
      value: 15,
      suffix: "+",
      color: "text-orange-600",
      icon: <Award className="w-6 h-6" />
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CEO, TechCorp",
      content: "CRMONCE transformed our business with their Dynamics 365 implementation. The results exceeded our expectations!",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Michael Chen",
      role: "CTO, InnovateLab",
      content: "Professional, knowledgeable, and results-driven. CRMONCE delivered exactly what we needed.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Emily Rodriguez",
      role: "Operations Director, GlobalTech",
      content: "The training program was exceptional. Our team is now fully equipped to leverage Dynamics 365.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    }
  ];

  const benefits = [
    "24/7 Support & Maintenance",
    "Custom Development",
    "Data Migration",
    "User Training",
    "Performance Optimization",
    "Security Implementation"
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient particle-bg relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container-custom relative z-10">
          <div className="flex flex-col lg:flex-row items-center min-h-screen py-20">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2 text-center lg:text-left"
            >
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-5xl md:text-7xl font-bold gradient-text mb-6 leading-tight"
              >
                Transform Your Business with{' '}
                <span className="gradient-text">Dynamics 365</span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-xl text-white/90 mb-8 leading-relaxed"
              >
                Expert implementation, customization, and training services to help your organization leverage the full power of Microsoft Dynamics 365 and Power Platform.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <Link to="/contact">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-primary text-lg px-8 py-4"
                  >
                    Get Started Today
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </motion.button>
                </Link>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-outline text-lg px-8 py-4 flex items-center justify-center"
                >
                  <Play className="mr-2 w-5 h-5" />
                  Watch Demo
                </motion.button>
              </motion.div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="lg:w-1/2 mt-12 lg:mt-0"
            >
              <div className="relative">
                <div className="floating-animation">
                  <div className="bg-white/20 backdrop-blur-xl rounded-3xl p-8 border border-white/30 shadow-2xl">
                    <AnimatedChart 
                      data={[
                        { label: 'Sales', value: 65, color: '#3b82f6' },
                        { label: 'Marketing', value: 45, color: '#8b5cf6' },
                        { label: 'Service', value: 80, color: '#10b981' },
                        { label: 'Operations', value: 55, color: '#f59e0b' }
                      ]}
                      type="pie"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white/95 backdrop-blur-xl">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              <span className="gradient-text">Trusted by Leading Companies</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We've helped hundreds of organizations transform their business operations with our expertise.
            </p>
          </motion.div>

          <AnimatedStats stats={stats} />
        </div>
      </section>

      {/* Features Section */}
      <section className="section-gradient py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
             <span className="gradient-text">Our Services</span>
            </h2>
            <p className="text-xl max-w-3xl mx-auto" style={{ color: 'rgb(65 67 199 / 90%)' }}>
              Comprehensive solutions to help you succeed with Microsoft Dynamics 365 and Power Platform.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                className="feature-card"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 shadow-2xl`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white/95 backdrop-blur-xl">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                <span className="gradient-text">Why Choose CRMONCE</span>?
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                We combine deep technical expertise with business acumen to deliver solutions that drive real results for your organization.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="flex items-center space-x-3"
                  >
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 font-medium">{benefit}</span>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="mt-8"
              >
                <Link to="/services">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-primary"
                  >
                    Explore Services
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="floating-animation">
                <div className="bg-gradient-to-br from-primary-500 to-accent-500 rounded-3xl p-8 shadow-2xl">
                  <AnimatedChart 
                    data={[
                      { label: 'Implementation', value: 40, color: '#3b82f6' },
                      { label: 'Customization', value: 30, color: '#8b5cf6' },
                      { label: 'Training', value: 20, color: '#10b981' },
                      { label: 'Support', value: 10, color: '#f59e0b' }
                    ]}
                    type="area"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-gradient py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
               <span className="gradient-text">What Our Clients Say</span>
            </h2>
            <p className="text-xl text-black/90 max-w-3xl mx-auto">
              Don't just take our word for it. Here's what our clients have to say about working with us.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                className="testimonial-card"
              >
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <p className="text-gray-700 leading-relaxed">{testimonial.content}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-accent-600">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Let's discuss how CRMONCE can help you leverage the full power of Dynamics 365 and Power Platform.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-accent text-lg px-8 py-4"
                >
                  Get Free Consultation
                  <ArrowRight className="ml-2 w-5 h-5" />
                </motion.button>
              </Link>
              
              <Link to="/register">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-outline text-lg px-8 py-4"
                >
                  Start Your Journey
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home; 