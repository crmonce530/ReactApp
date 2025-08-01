import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  Settings, 
  BookOpen, 
  Users2, 
  ArrowRight, 
  CheckCircle, 
  Star, 
  Clock, 
  Target, 
  Zap, 
  Shield, 
  Globe,
  Database,
  BarChart3,
  Workflow,
  Cloud,
  Smartphone,
  Monitor,
  Lightbulb,
  TestTube,
  Rocket,
  Award,
  Briefcase,
  Calendar,
  MapPin,
  Phone,
  Mail
} from 'lucide-react';

const Services: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dynamics365');

  const services = [
    {
      id: 'dynamics365',
      title: 'Dynamics 365 Implementation',
      icon: Building2,
      color: 'from-blue-500 to-cyan-500',
      description: 'Complete CRM and ERP solutions tailored to your business needs',
      features: [
        'Sales Force Automation',
        'Customer Service Management',
        'Marketing Automation',
        'Field Service Management',
        'Project Operations',
        'Finance & Operations',
        'Supply Chain Management',
        'Human Resources'
      ],
      benefits: [
        '360° Customer View',
        'Automated Workflows',
        'Real-time Analytics',
        'Mobile Accessibility',
        'Integration Capabilities',
        'Scalable Architecture'
      ],
      duration: '8-12 weeks',
      price: 'From $25,000'
    },
    {
      id: 'powerplatform',
      title: 'Power Platform Development',
      icon: Settings,
      color: 'from-purple-500 to-pink-500',
      description: 'Custom applications and automation to streamline operations',
      features: [
        'Power Apps Development',
        'Power Automate Flows',
        'Power BI Dashboards',
        'Power Virtual Agents',
        'Custom Connectors',
        'Data Integration',
        'Workflow Automation',
        'Business Process Optimization'
      ],
      benefits: [
        'Rapid Development',
        'No-Code/Low-Code Solutions',
        'Seamless Integration',
        'Cost-Effective',
        'User-Friendly',
        'Scalable Solutions'
      ],
      duration: '4-8 weeks',
      price: 'From $15,000'
    },
    {
      id: 'consulting',
      title: 'Consulting Services',
      icon: Users2,
      color: 'from-green-500 to-emerald-500',
      description: 'Expert guidance to optimize your business processes',
      features: [
        'Business Process Analysis',
        'Technology Assessment',
        'Digital Transformation Strategy',
        'Change Management',
        'Best Practices Implementation',
        'Performance Optimization',
        'Security Audits',
        'Compliance Reviews'
      ],
      benefits: [
        'Expert Guidance',
        'Industry Best Practices',
        'Risk Mitigation',
        'Cost Optimization',
        'Performance Improvement',
        'Future-Proof Solutions'
      ],
      duration: '2-6 weeks',
      price: 'From $150/hour'
    },
    {
      id: 'training',
      title: 'Professional Training',
      icon: BookOpen,
      color: 'from-orange-500 to-red-500',
      description: 'Comprehensive training programs for your team',
      features: [
        'Dynamics 365 User Training',
        'Power Platform Workshops',
        'Administrator Training',
        'Developer Bootcamps',
        'Custom Training Programs',
        'Certification Preparation',
        'Hands-on Workshops',
        'Ongoing Support'
      ],
      benefits: [
        'Certified Instructors',
        'Hands-on Experience',
        'Customized Content',
        'Flexible Scheduling',
        'Post-Training Support',
        'Certification Paths'
      ],
      duration: '1-5 days',
      price: 'From $2,500/day'
    }
  ];

  const testimonials = [
    {
      name: "David Thompson",
      role: "IT Director, Manufacturing Corp",
      content: "The Dynamics 365 implementation was seamless. Our productivity increased by 40% within the first quarter.",
      rating: 5,
      service: "Dynamics 365"
    },
    {
      name: "Lisa Chen",
      role: "Operations Manager, Retail Chain",
      content: "Power Platform solutions automated our manual processes. We saved 25 hours per week!",
      rating: 5,
      service: "Power Platform"
    },
    {
      name: "Robert Wilson",
      role: "CEO, Startup Inc",
      content: "The consulting services helped us make the right technology decisions. Excellent strategic guidance.",
      rating: 5,
      service: "Consulting"
    }
  ];

  const processSteps = [
    {
      step: "01",
      title: "Discovery & Analysis",
      description: "We analyze your business requirements and current systems to understand your needs.",
      icon: Target
    },
    {
      step: "02",
      title: "Solution Design",
      description: "Our experts design a customized solution that aligns with your business objectives.",
      icon: Lightbulb
    },
    {
      step: "03",
      title: "Implementation",
      description: "We implement the solution with best practices and ensure smooth deployment.",
      icon: Rocket
    },
    {
      step: "04",
      title: "Training & Support",
      description: "We provide comprehensive training and ongoing support to ensure success.",
      icon: Award
    }
  ];

  const activeService = services.find(service => service.id === activeTab);

  return (
    <div className="min-h-screen pt-32">
      {/* Hero Section */}
      <section className="hero-gradient particle-bg relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container-custom relative z-10 py-20">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
               <span className="gradient-text">Our Services</span>
            </h1>
            <p className="text-xl text-black/90 max-w-3xl mx-auto mb-8">
              Comprehensive Microsoft Dynamics 365 and Power Platform solutions to transform your business operations and drive growth.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {services.map((service) => (
                <motion.button
                  key={service.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTab(service.id)}
                  className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                    activeTab === service.id
                      ? 'bg-white text-primary-700 shadow-2xl'
                      : 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm'
                  }`}
                >
                  {service.title}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Service Details */}
      {activeService && (
        <section className="py-20 bg-white/95 backdrop-blur-xl">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className={`w-20 h-20 bg-gradient-to-br ${activeService.color} rounded-3xl flex items-center justify-center mb-8 shadow-2xl`}>
                  <activeService.icon className="w-10 h-10 text-white" />
                </div>
                
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  {activeService.title}
                </h2>
                
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  {activeService.description}
                </p>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div className="flex items-center space-x-3">
                    <Clock className="w-6 h-6 text-primary-500" />
                    <div>
                      <p className="font-semibold text-gray-900">Duration</p>
                      <p className="text-gray-600">{activeService.duration}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Target className="w-6 h-6 text-primary-500" />
                    <div>
                      <p className="font-semibold text-gray-900">Starting Price</p>
                      <p className="text-gray-600">{activeService.price}</p>
                    </div>
                  </div>
                </div>

                <Link to="/contact">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-primary"
                  >
                    Get Started
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </motion.button>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                <div className="feature-card">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Key Features</h3>
                  <div className="grid gap-4">
                    {activeService.features.map((feature, index) => (
                      <motion.div
                        key={feature}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        className="flex items-center space-x-3"
                      >
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="feature-card">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Benefits</h3>
                  <div className="grid gap-4">
                    {activeService.benefits.map((benefit, index) => (
                      <motion.div
                        key={benefit}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        className="flex items-center space-x-3"
                      >
                        <Zap className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                        <span className="text-gray-700">{benefit}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* Process Section */}
      <section className="section-gradient py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
               <span className="gradient-text">Our Process</span>
            </h2>
            <p className="text-xl text-black/90 max-w-3xl mx-auto">
              We follow a proven methodology to ensure successful project delivery and maximum value for your business.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                className="feature-card text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-2xl">
                  <step.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-primary-500 mb-4">{step.step}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white/95 backdrop-blur-xl">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
              Client <span className="gradient-text">Success Stories</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how our services have transformed businesses across different industries.
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
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold text-lg">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
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
                
                <p className="text-gray-700 leading-relaxed mb-4">{testimonial.content}</p>
                
                <div className="inline-block bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
                  {testimonial.service}
                </div>
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
              Ready to Get Started?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Let's discuss your project requirements and create a customized solution for your business.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-accent text-lg px-8 py-4"
                >
                  Schedule Consultation
                  <ArrowRight className="ml-2 w-5 h-5" />
                </motion.button>
              </Link>
              
              <div className="flex items-center space-x-4 text-white">
                <div className="flex items-center space-x-2">
                  <Phone className="w-5 h-5" />
                  <span>+91 80965 56344</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-5 h-5" />
                  <span>info@crmonce.com</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Services; 