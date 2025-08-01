import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  MessageSquare, 
  Phone, 
  Mail, 
  Clock, 
  Users, 
  BookOpen, 
  Video,
  FileText,
  Download,
  Play,
  ArrowRight,
  CheckCircle,
  Star,
  HelpCircle,
  Settings,
  Zap,
  Shield,
  Globe,
  Smartphone,
  Monitor,
  Target,
  Heart,
  Award,
  TrendingUp,
  Database,
  Workflow,
  Cloud,
  Lock,
  RefreshCw,
  Eye,
  Bell,
  Calendar,
  MapPin,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Headphones,
  LifeBuoy,
  Lightbulb,
  Code,
  Wrench,
  GraduationCap,
  Book,
  FileVideo,
  FileCode,
  FileImage,
  Rocket,
  BarChart3
} from 'lucide-react';

const Support: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('getting-started');
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);

  const categories = [
    {
      id: 'getting-started',
      name: 'Getting Started',
      icon: Rocket,
      description: 'Learn the basics and set up your Dynamics 365 environment.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'user-guide',
      name: 'User Guide',
      icon: BookOpen,
      description: 'Comprehensive guides for using Dynamics 365 features.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'administration',
      name: 'Administration',
      icon: Settings,
      description: 'System administration and configuration guides.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'development',
      name: 'Development',
      icon: Code,
      description: 'Custom development and integration resources.',
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 'troubleshooting',
      name: 'Troubleshooting',
      icon: Wrench,
      description: 'Common issues and their solutions.',
      color: 'from-indigo-500 to-purple-500'
    },
    {
      id: 'training',
      name: 'Training',
      icon: GraduationCap,
      description: 'Training materials and certification courses.',
      color: 'from-teal-500 to-cyan-500'
    }
  ];

  const articles = {
    'getting-started': [
      {
        title: 'Quick Start Guide',
        description: 'Get up and running with Dynamics 365 in 30 minutes.',
        readTime: '5 min read',
        difficulty: 'Beginner',
        icon: Play
      },
      {
        title: 'System Requirements',
        description: 'Check if your system meets the requirements for Dynamics 365.',
        readTime: '3 min read',
        difficulty: 'Beginner',
        icon: Monitor
      },
      {
        title: 'User Setup & Permissions',
        description: 'Learn how to set up users and configure permissions.',
        readTime: '8 min read',
        difficulty: 'Intermediate',
        icon: Users
      },
      {
        title: 'Data Migration Guide',
        description: 'Migrate your existing data to Dynamics 365.',
        readTime: '15 min read',
        difficulty: 'Advanced',
        icon: Database
      }
    ],
    'user-guide': [
      {
        title: 'Sales Module Guide',
        description: 'Complete guide to using the Sales module effectively.',
        readTime: '12 min read',
        difficulty: 'Intermediate',
        icon: Target
      },
      {
        title: 'Marketing Automation',
        description: 'Set up and manage marketing campaigns.',
        readTime: '10 min read',
        difficulty: 'Intermediate',
        icon: Zap
      },
      {
        title: 'Customer Service',
        description: 'Manage customer service cases and tickets.',
        readTime: '8 min read',
        difficulty: 'Intermediate',
        icon: MessageSquare
      },
      {
        title: 'Reporting & Analytics',
        description: 'Create reports and analyze your data.',
        readTime: '15 min read',
        difficulty: 'Advanced',
        icon: BarChart3
      }
    ]
  };

  const faqs = [
    {
      question: "How do I reset my password?",
      answer: "You can reset your password by clicking the 'Forgot Password' link on the login page. You'll receive an email with instructions to create a new password.",
      category: "Account"
    },
    {
      question: "Can I customize the dashboard?",
      answer: "Yes, you can customize your dashboard by adding, removing, or rearranging widgets. Go to Settings > Personalization to configure your dashboard.",
      category: "User Interface"
    },
    {
      question: "How do I export data to Excel?",
      answer: "To export data, navigate to any list view, click the 'Export' button, and select 'Export to Excel'. The file will be downloaded to your device.",
      category: "Data Management"
    },
    {
      question: "What browsers are supported?",
      answer: "Dynamics 365 supports Chrome, Firefox, Safari, and Edge. For the best experience, we recommend using the latest version of Chrome.",
      category: "Technical"
    },
    {
      question: "How do I create a new workflow?",
      answer: "Go to Settings > Processes > Workflows to create new workflows. You can automate business processes based on specific triggers and conditions.",
      category: "Automation"
    },
    {
      question: "Can I integrate with other systems?",
      answer: "Yes, Dynamics 365 offers extensive integration capabilities through APIs, Power Automate, and custom connectors.",
      category: "Integration"
    }
  ];

  const supportChannels = [
    {
      name: 'Live Chat',
      description: 'Get instant help from our support team',
      icon: MessageSquare,
      availability: '24/7',
      responseTime: '< 5 minutes',
      color: 'from-green-500 to-emerald-500'
    },
    {
      name: 'Phone Support',
      description: 'Speak directly with our technical experts',
      icon: Phone,
      availability: 'Mon-Fri 9AM-6PM EST',
      responseTime: 'Immediate',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      name: 'Email Support',
      description: 'Send us detailed questions and get comprehensive answers',
      icon: Mail,
      availability: '24/7',
      responseTime: '< 4 hours',
      color: 'from-purple-500 to-pink-500'
    },
    {
      name: 'Video Call',
      description: 'Schedule a screen sharing session for complex issues',
      icon: Video,
      availability: 'Mon-Fri 9AM-6PM EST',
      responseTime: '< 2 hours',
      color: 'from-orange-500 to-red-500'
    }
  ];

  const resources = [
    {
      name: 'Documentation',
      description: 'Comprehensive technical documentation',
      icon: FileText,
      count: '500+ articles'
    },
    {
      name: 'Video Tutorials',
      description: 'Step-by-step video guides',
      icon: FileVideo,
      count: '200+ videos'
    },
    {
      name: 'API Reference',
      description: 'Complete API documentation',
      icon: FileCode,
      count: '100+ endpoints'
    },
    {
      name: 'Sample Code',
      description: 'Ready-to-use code examples',
      icon: Code,
      count: '50+ samples'
    }
  ];

  const filteredFAQs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
             <span className="gradient-text"> How Can We Help?</span>
            </h1>
            <p className="text-xl text-black/90 max-w-3xl mx-auto mb-8">
              Find answers to your questions, access documentation, and get support from our expert team.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for help articles, FAQs, or documentation..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white/95 backdrop-blur-xl rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 shadow-2xl"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-12 bg-white/95 backdrop-blur-xl border-b border-white/20">
        <div className="container-custom">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { label: 'Help Articles', value: '500+', icon: FileText },
              { label: 'Video Tutorials', value: '200+', icon: Video },
              { label: 'Support Team', value: '24/7', icon: Users },
              { label: 'Response Time', value: '< 5min', icon: Clock }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="flex items-center justify-center space-x-3"
              >
                <stat.icon className="w-6 h-6 text-primary-600" />
                <div>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Help Categories */}
      <section className="py-20 bg-white/95 backdrop-blur-xl">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
               <span className="gradient-text">Help Categories</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Browse our comprehensive help resources organized by topic and skill level.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                onClick={() => setActiveCategory(category.id)}
                className={`feature-card cursor-pointer transition-all duration-300 ${
                  activeCategory === category.id ? 'ring-4 ring-primary-500' : ''
                }`}
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-2xl`}>
                  <category.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{category.name}</h3>
                <p className="text-gray-600 leading-relaxed mb-4">{category.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    {articles[category.id as keyof typeof articles]?.length || 0} articles
                  </span>
                  <ArrowRight className="w-5 h-5 text-primary-600" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Section */}
      {articles[activeCategory as keyof typeof articles] && (
        <section className="section-gradient py-20">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                 <span className="gradient-text">{categories.find(c => c.id === activeCategory)?.name} Articles</span>
              </h2>
              <p className="text-xl text-black/90 max-w-3xl mx-auto">
                Explore our comprehensive guides and tutorials for {categories.find(c => c.id === activeCategory)?.name.toLowerCase()}.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {articles[activeCategory as keyof typeof articles].map((article, index) => (
                <motion.div
                  key={article.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.8 }}
                  className="feature-card"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                      <article.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{article.title}</h3>
                      <p className="text-gray-600 mb-4 leading-relaxed">{article.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>{article.readTime}</span>
                          <span>•</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            article.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                            article.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {article.difficulty}
                          </span>
                        </div>
                        <ArrowRight className="w-5 h-5 text-primary-600" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Support Channels */}
      <section className="py-20 bg-white/95 backdrop-blur-xl">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
               <span className="gradient-text">Get Support</span>
            </h2>
            <p className="text-xl text-black-600 max-w-3xl mx-auto">
              Choose your preferred way to get help from our expert support team.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {supportChannels.map((channel, index) => (
              <motion.div
                key={channel.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                className="feature-card text-center"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${channel.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl`}>
                  <channel.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{channel.name}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{channel.description}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-center space-x-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">{channel.availability}</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-gray-600">{channel.responseTime}</span>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary w-full mt-6"
                >
                  Get Help
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-gradient py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              <span className="gradient-text">Frequently Asked Questions</span>
            </h2>
            <p className="text-xl text-black/90 max-w-3xl mx-auto">
              Find quick answers to the most common questions about Dynamics 365.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-4">
            {filteredFAQs.map((faq, index) => (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="feature-card"
              >
                <button
                  onClick={() => setExpandedFAQ(expandedFAQ === faq.question ? null : faq.question)}
                  className="w-full flex items-center justify-between text-left"
                >
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{faq.question}</h3>
                    <span className="text-sm text-primary-600 font-medium">{faq.category}</span>
                  </div>
                  {expandedFAQ === faq.question ? (
                    <ChevronUp className="w-6 h-6 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-gray-400" />
                  )}
                </button>
                {expandedFAQ === faq.question && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 pt-4 border-t border-gray-200"
                  >
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="py-20 bg-white/95 backdrop-blur-xl">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              <span className="gradient-text">Additional Resources</span>
            </h2>
            <p className="text-xl text-black-600 max-w-3xl mx-auto">
              Access our comprehensive library of documentation, tutorials, and development resources.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {resources.map((resource, index) => (
              <motion.div
                key={resource.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                className="feature-card text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
                  <resource.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{resource.name}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{resource.description}</p>
                <div className="text-sm text-primary-600 font-medium mb-4">{resource.count}</div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-outline w-full"
                >
                  Browse Resources
                  <ExternalLink className="ml-2 w-4 h-4" />
                </motion.button>
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
              Still Need Help?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Our expert support team is here to help you succeed with Dynamics 365. Contact us anytime.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-accent text-lg px-8 py-4"
              >
                Start Live Chat
                <MessageSquare className="ml-2 w-5 h-5" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-outline text-lg px-8 py-4"
              >
                Contact Support
                <Phone className="ml-2 w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Support; 