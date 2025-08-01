import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios'; // Add this import
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  CheckCircle, 
  Building2, 
  Globe,
  MessageSquare,
  Calendar,
  User,
  FileText,
  ArrowRight
} from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    messageTo: 'general', // Add this field
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(''); // Add error state

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(''); // Clear any previous errors
    
    try {
      // Call the real API endpoint
      const response = await axios.post('/api/contacts/contact', formData);
      
      if (response.data.success) {
        setIsSubmitted(true);
        
        // Reset form after 3 seconds
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            company: '',
            service: '',
            messageTo: 'general',
            message: ''
          });
        }, 3000);
      } else {
        setError(response.data.message || 'Failed to send message');
      }
    } catch (error: any) {
      console.error('Contact form error:', error);
      setError(error.response?.data?.message || 'Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      details: ['+91 80965 56344'],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['info@crmonce.com'],
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: MapPin,
      title: 'Office',
      details: ['8-112, Gamallapalem, Kodurupadu, Nellore', 'Andhra Pradesh, India'],
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Clock,
      title: 'Hours',
      details: ['Mon-Fri: 9:00 AM - 6:00 PM', 'Sat: 10:00 AM - 2:00 PM'],
      color: 'from-orange-500 to-red-500'
    }
  ];

  const services = [
    'Dynamics 365 Implementation',
    'Power Platform Development',
    'Consulting Services',
    'Professional Training',
    'Custom Development',
    'System Integration'
  ];

  const officeLocations = [
    {
      city: 'Nellore',
      country: 'India',
      address: '8-112, Gamallapalem, Kodurupadu',
      phone: '+91  80965 56344',
      email: 'info@crmonce.com',
      hours: '9:00 AM - 11:00 PM IST'
    }
  ];

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
             <span className="gradient-text">Get in Touch</span>
            </h1>
            <p className="text-xl text-black/90 max-w-3xl mx-auto mb-8">
              Ready to transform your business? Let's discuss how CRMONCE can help you leverage the full power of Microsoft Dynamics 365 and Power Platform.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 bg-white/95 backdrop-blur-xl">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                <span className="gradient-text">Let's Start a Conversation</span>
            </h2>
            <p className="text-xl text-black-600 max-w-3xl mx-auto">
              We're here to help you succeed. Reach out to us through any of these channels or fill out the form below.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                className="feature-card text-center"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${info.color} rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-2xl`}>
                  <info.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{info.title}</h3>
                <div className="space-y-2">
                  {info.details.map((detail, detailIndex) => (
                    <p key={detailIndex} className="text-gray-600">{detail}</p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="section-gradient py-20">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="feature-card">
                <h3 className="text-3xl font-bold gradient-text mb-6">Send us a Message</h3>
                
                {/* Error Message */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg"
                  >
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      {error}
                    </div>
                  </motion.div>
                )}

                {/* Success Message */}
                {isSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg"
                  >
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Message sent successfully! We'll get back to you soon.
                    </div>
                  </motion.div>
                )}
                
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h4>
                    <p className="text-gray-600">Thank you for reaching out. We'll get back to you within 24 hours.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="form-label">First Name *</label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          required
                          className="form-input"
                          placeholder="Enter your first name"
                        />
                      </div>
                      <div>
                        <label className="form-label">Last Name *</label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          required
                          className="form-input"
                          placeholder="Enter your last name"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="form-label">Email *</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="form-input"
                          placeholder="Enter your email"
                        />
                      </div>
                      <div>
                        <label className="form-label">Phone</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="form-input"
                          placeholder="Enter your phone number"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="form-label">Company</label>
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          className="form-input"
                          placeholder="Enter your company name"
                        />
                      </div>
                      <div>
                        <label className="form-label">Service Interest</label>
                        <select
                          name="service"
                          value={formData.service}
                          onChange={handleInputChange}
                          className="form-input"
                        >
                          <option value="">Select a service</option>
                          {services.map((service) => (
                            <option key={service} value={service}>{service}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="form-label">Message To</label>
                        <select
                          name="messageTo"
                          value={formData.messageTo}
                          onChange={handleInputChange}
                          className="form-input"
                        >
                          <option value="general">General Inquiry</option>
                          <option value="sales">Sales Team</option>
                          <option value="support">Support Team</option>
                          <option value="consulting">Consulting Team</option>
                          <option value="training">Training Team</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="form-label">Message *</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={6}
                        className="form-input"
                        placeholder="Tell us about your project or inquiry..."
                      />
                    </div>

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="btn-primary w-full text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Sending Message...
                        </span>
                      ) : (
                        <span className="flex items-center justify-center">
                          Send Message
                          <Send className="ml-2 w-5 h-5" />
                        </span>
                      )}
                    </motion.button>
                  </form>
                )}
              </div>
            </motion.div>

            {/* Office Locations */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-3xl font-bold gradient-text mb-8">Our Office Location</h3>
              <div className="space-y-6">
                {officeLocations.map((office, index) => (
                  <motion.div
                    key={office.city}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="feature-card"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Building2 className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-gray-900 mb-2">
                          {office.city}, {office.country}
                        </h4>
                        <div className="space-y-2 text-gray-600">
                          <div className="flex items-center space-x-2">
                            <MapPin className="w-4 h-4 text-primary-500" />
                            <span>{office.address}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Phone className="w-4 h-4 text-primary-500" />
                            <span>{office.phone}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Mail className="w-4 h-4 text-primary-500" />
                            <span>{office.email}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4 text-primary-500" />
                            <span>{office.hours}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 feature-card">
                <h4 className="text-xl font-bold gradient-text mb-4">Schedule a Meeting</h4>
                <p className="text-gray-600 mb-4">
                  Prefer to schedule a call? We're available for virtual meetings and can accommodate your timezone.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full px-6 py-3 border-2 border-primary-500 text-primary-600 rounded-lg font-semibold transition-all duration-300 hover:bg-primary-50 hover:border-primary-400 hover:text-primary-700"
                >
                  <Calendar className="mr-2 w-5 h-5" />
                  Schedule a Call
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white/95 backdrop-blur-xl">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
             <span className="gradient-text">Frequently Asked Questions</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get quick answers to common questions about our services and process.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                question: "What is the typical project timeline?",
                answer: "Project timelines vary based on complexity. Simple implementations take 4-8 weeks, while complex enterprise solutions may take 12-16 weeks. We'll provide a detailed timeline during our initial consultation."
              },
              {
                question: "Do you provide ongoing support?",
                answer: "Yes, we offer comprehensive support packages including maintenance, updates, training, and 24/7 technical support to ensure your solution continues to perform optimally."
              },
              {
                question: "What industries do you specialize in?",
                answer: "We work across various industries including manufacturing, retail, healthcare, financial services, and professional services. Our solutions are tailored to meet industry-specific requirements."
              },
              {
                question: "How do you ensure data security?",
                answer: "We follow Microsoft's security best practices and implement enterprise-grade security measures including encryption, access controls, and regular security audits to protect your data."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="feature-card"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4">{faq.question}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
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
              Join hundreds of organizations that have already revolutionized their operations with CRMONCE.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-accent text-lg px-8 py-4"
              >
                Start Your Project
                <ArrowRight className="ml-2 w-5 h-5" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-outline text-lg px-8 py-4"
              >
                Download Brochure
                <FileText className="ml-2 w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact; 