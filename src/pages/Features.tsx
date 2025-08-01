import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  BarChart3, 
  Zap, 
  Shield, 
  Globe, 
  Smartphone, 
  Monitor, 
  Target,
  CheckCircle,
  ArrowRight,
  Play,
  Star,
  Award,
  TrendingUp,
  Database,
  Workflow,
  Cloud,
  Lock,
  RefreshCw,
  Eye,
  Settings,
  Bell,
  Calendar,
  FileText,
  MessageSquare,
  Phone,
  Mail,
  MapPin,
  Clock,
  DollarSign,
  PieChart,
  LineChart,
  Activity
} from 'lucide-react';
import AnimatedChart from '../components/AnimatedChart';

const Features: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState('crm');

  const features = [
    {
      id: 'crm',
      title: 'Customer Relationship Management',
      icon: Users,
      color: 'from-blue-500 to-cyan-500',
      description: 'Comprehensive CRM solution to manage customer relationships, sales processes, and customer service.',
      benefits: [
        '360° Customer View',
        'Sales Pipeline Management',
        'Lead & Opportunity Tracking',
        'Customer Service Automation',
        'Marketing Campaign Management',
        'Real-time Analytics'
      ],
      chartData: [
        { label: 'Leads', value: 45, color: '#3b82f6' },
        { label: 'Opportunities', value: 30, color: '#8b5cf6' },
        { label: 'Closed Deals', value: 25, color: '#10b981' }
      ]
    },
    {
      id: 'erp',
      title: 'Enterprise Resource Planning',
      icon: Database,
      color: 'from-purple-500 to-pink-500',
      description: 'Complete ERP solution for finance, operations, supply chain, and human resources management.',
      benefits: [
        'Financial Management',
        'Supply Chain Optimization',
        'Inventory Management',
        'Human Resources',
        'Project Management',
        'Business Intelligence'
      ],
      chartData: [
        { label: 'Revenue', value: 60, color: '#3b82f6' },
        { label: 'Expenses', value: 35, color: '#ef4444' },
        { label: 'Profit', value: 25, color: '#10b981' }
      ]
    },
    {
      id: 'powerapps',
      title: 'Power Apps Development',
      icon: Workflow,
      color: 'from-green-500 to-emerald-500',
      description: 'Build custom business applications without code or with minimal coding requirements.',
      benefits: [
        'No-Code Development',
        'Custom Business Apps',
        'Mobile & Web Apps',
        'Integration Capabilities',
        'Rapid Prototyping',
        'Scalable Solutions'
      ],
      chartData: [
        { label: 'Web Apps', value: 40, color: '#3b82f6' },
        { label: 'Mobile Apps', value: 35, color: '#8b5cf6' },
        { label: 'Canvas Apps', value: 25, color: '#f59e0b' }
      ]
    },
    {
      id: 'powerautomate',
      title: 'Power Automate',
      icon: Zap,
      color: 'from-orange-500 to-red-500',
      description: 'Automate workflows and business processes to increase efficiency and reduce manual tasks.',
      benefits: [
        'Workflow Automation',
        'Process Optimization',
        'Integration Flows',
        'Scheduled Tasks',
        'Approval Workflows',
        'Data Synchronization'
      ],
      chartData: [
        { label: 'Automated Tasks', value: 70, color: '#3b82f6' },
        { label: 'Manual Tasks', value: 30, color: '#6b7280' }
      ]
    }
  ];

  const capabilities = [
    {
      icon: Globe,
      title: "Global Accessibility",
      description: "Access your data and applications from anywhere in the world with cloud-based solutions.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-level security with advanced encryption, compliance, and data protection measures.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Smartphone,
      title: "Mobile First",
      description: "Optimized for mobile devices with responsive design and native mobile applications.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Powerful reporting and analytics tools to gain insights and make data-driven decisions.",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: RefreshCw,
      title: "Real-time Sync",
      description: "Automatic synchronization across all devices and users in real-time.",
      color: "from-indigo-500 to-purple-500"
    },
    {
      icon: Settings,
      title: "Customizable",
      description: "Highly customizable solutions tailored to your specific business requirements.",
      color: "from-teal-500 to-cyan-500"
    }
  ];

  const integrations = [
    { name: "Microsoft Office 365", icon: "📧" },
    { name: "SharePoint", icon: "📁" },
    { name: "Teams", icon: "💬" },
    { name: "Azure", icon: "☁️" },
    { name: "Power BI", icon: "📊" },
    { name: "Outlook", icon: "📮" },
    { name: "Excel", icon: "📈" },
    { name: "Word", icon: "📄" }
  ];

  const activeFeatureData = features.find(f => f.id === activeFeature);

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
               <span className="gradient-text">Powerful Features</span>
            </h1>
            <p className="text-xl text-black/90 max-w-3xl mx-auto mb-8">
              Discover the comprehensive capabilities of Microsoft Dynamics 365 and Power Platform that will transform your business operations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Feature Navigation */}
      <section className="py-8 bg-white/95 backdrop-blur-xl border-b border-white/20">
        <div className="container-custom">
          <div className="flex flex-wrap justify-center gap-4">
            {features.map((feature) => (
              <motion.button
                key={feature.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveFeature(feature.id)}
                className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 flex items-center space-x-2 ${
                  activeFeature === feature.id
                    ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-2xl'
                    : 'bg-white/20 text-gray-700 hover:bg-white/30 backdrop-blur-sm'
                }`}
              >
                <feature.icon className="w-5 h-5" />
                <span>{feature.title}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Details */}
      {activeFeatureData && (
        <section className="py-20 bg-white/95 backdrop-blur-xl">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className={`w-20 h-20 bg-gradient-to-br ${activeFeatureData.color} rounded-3xl flex items-center justify-center mb-8 shadow-2xl`}>
                  <activeFeatureData.icon className="w-10 h-10 text-white" />
                </div>
                
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  {activeFeatureData.title}
                </h2>
                
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  {activeFeatureData.description}
                </p>

                <div className="grid gap-4">
                  {activeFeatureData.benefits.map((benefit, index) => (
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
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-primary"
                  >
                    Learn More
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </motion.button>
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
                      data={activeFeatureData.chartData}
                      type="pie"
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* Capabilities Section */}
      <section className="section-gradient py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
               <span className="gradient-text">Core Capabilities</span>
            </h2>
            <p className="text-xl text-black/90 max-w-3xl mx-auto">
              Built with enterprise-grade technology to meet the demands of modern businesses.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {capabilities.map((capability, index) => (
              <motion.div
                key={capability.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                className="feature-card text-center"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${capability.color} rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-2xl`}>
                  <capability.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{capability.title}</h3>
                <p className="text-gray-600 leading-relaxed">{capability.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Analytics Dashboard Preview */}
      <section className="py-20 bg-white/95 backdrop-blur-xl">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              <span className="gradient-text">Advanced Analytics</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get real-time insights into your business performance with powerful analytics and reporting tools.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="space-y-6">
                {[
                  {
                    icon: BarChart3,
                    title: "Sales Analytics",
                    description: "Track sales performance, pipeline health, and revenue forecasting with detailed analytics."
                  },
                  {
                    icon: PieChart,
                    title: "Customer Insights",
                    description: "Understand customer behavior, preferences, and lifetime value with advanced analytics."
                  },
                  {
                    icon: TrendingUp,
                    title: "Performance Metrics",
                    description: "Monitor key performance indicators and business metrics in real-time dashboards."
                  }
                ].map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="flex items-start space-x-4"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
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
                      { label: 'Sales', value: 65, color: '#3b82f6' },
                      { label: 'Marketing', value: 45, color: '#8b5cf6' },
                      { label: 'Service', value: 80, color: '#10b981' },
                      { label: 'Operations', value: 55, color: '#f59e0b' }
                    ]}
                    type="area"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Integrations Section */}
      <section className="section-gradient py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
               <span className="gradient-text">Seamless Integrations</span>
            </h2>
            <p className="text-xl text-black/90 max-w-3xl mx-auto">
              Connect with your favorite Microsoft applications and third-party tools for a unified experience.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {integrations.map((integration, index) => (
              <motion.div
                key={integration.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                className="feature-card text-center"
              >
                <div className="text-4xl mb-4">{integration.icon}</div>
                <h3 className="text-lg font-bold text-gray-900">{integration.name}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-20 bg-white/95 backdrop-blur-xl">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              <span className="gradient-text">See It In Action</span>
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Watch a live demonstration of our powerful features and see how they can transform your business.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary text-lg px-8 py-4"
              >
                <Play className="mr-2 w-5 h-5" />
                Watch Demo
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-outline text-lg px-8 py-4"
              >
                Schedule Live Demo
                <Calendar className="ml-2 w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
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
              Ready to Experience These Features?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Start your journey with CRMONCE and discover how our powerful features can transform your business operations.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-accent text-lg px-8 py-4"
              >
                Start Free Trial
                <ArrowRight className="ml-2 w-5 h-5" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-outline text-lg px-8 py-4"
              >
                Contact Sales
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Features; 