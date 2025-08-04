import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { 
  ChartBarIcon,
  UserGroupIcon,
  CogIcon,
  ShieldCheckIcon,
  ClockIcon,
  DocumentTextIcon,
  PhoneIcon,
  EnvelopeIcon,
  CalendarIcon,
  BellIcon,
  CloudIcon,
  DevicePhoneMobileIcon,
  LightBulbIcon
} from '@heroicons/react/24/outline';
import { Card, CardBody, CardHeader } from '../components/ui';

const Features: React.FC = () => {
  const features = [
    {
      icon: UserGroupIcon,
      title: 'Contact Management',
      description: 'Organize and manage all your contacts, leads, and customers in one centralized platform with advanced search and filtering.',
      benefits: ['360° customer view', 'Custom fields', 'Import/Export', 'Duplicate detection']
    },
    {
      icon: ChartBarIcon,
      title: 'Sales Pipeline',
      description: 'Visual sales pipeline management with drag-and-drop functionality to track deals from lead to close.',
      benefits: ['Visual pipeline', 'Deal tracking', 'Forecasting', 'Win/Loss analysis']
    },
    {
      icon: DocumentTextIcon,
      title: 'Lead Management',
      description: 'Capture, qualify, and nurture leads with automated scoring and intelligent assignment rules.',
      benefits: ['Lead scoring', 'Auto-assignment', 'Lead nurturing', 'Conversion tracking']
    },
    {
      icon: CalendarIcon,
      title: 'Activity Tracking',
      description: 'Track all customer interactions including calls, emails, meetings, and tasks in one timeline.',
      benefits: ['Activity timeline', 'Task management', 'Follow-up reminders', 'Team collaboration']
    },
    {
      icon: ChartBarIcon,
      title: 'Advanced Analytics',
      description: 'Comprehensive reporting and analytics to gain insights into your sales performance and customer behavior.',
      benefits: ['Custom reports', 'Real-time dashboards', 'KPI tracking', 'Data visualization']
    },
    {
      icon: CogIcon,
      title: 'Workflow Automation',
      description: 'Automate repetitive tasks and streamline your business processes with powerful workflow rules.',
      benefits: ['Process automation', 'Email templates', 'Approval workflows', 'Custom triggers']
    },
    {
      icon: EnvelopeIcon,
      title: 'Email Integration',
      description: 'Seamless email integration with popular email providers to track and manage all communications.',
      benefits: ['Email tracking', 'Template library', 'Mass email campaigns', 'Email scheduling']
    },
    {
      icon: PhoneIcon,
      title: 'Phone Integration',
      description: 'Built-in phone system with call logging, recording, and click-to-call functionality.',
      benefits: ['Click-to-call', 'Call recording', 'Call analytics', 'VoIP integration']
    },
    {
      icon: BellIcon,
      title: 'Smart Notifications',
      description: 'Intelligent notifications and alerts to keep your team informed about important events and deadlines.',
      benefits: ['Real-time alerts', 'Custom notifications', 'Mobile push', 'Email digests']
    },
    {
      icon: CloudIcon,
      title: 'Cloud-Based',
      description: 'Secure cloud infrastructure with 99.9% uptime guarantee and automatic backups.',
      benefits: ['99.9% uptime', 'Auto backups', 'Global CDN', 'Enterprise security']
    },
    {
      icon: DevicePhoneMobileIcon,
      title: 'Mobile App',
      description: 'Native mobile apps for iOS and Android with offline access and real-time synchronization.',
      benefits: ['Native apps', 'Offline access', 'Push notifications', 'Touch-optimized']
    },
    {
      icon: ShieldCheckIcon,
      title: 'Enterprise Security',
      description: 'Bank-grade security with role-based access control, data encryption, and compliance certifications.',
      benefits: ['Role-based access', 'Data encryption', 'GDPR compliant', 'SOC 2 certified']
    }
  ];

  const integrations = [
    { name: 'Microsoft Dynamics 365', logo: '🔗' },
    { name: 'Salesforce', logo: '☁️' },
    { name: 'HubSpot', logo: '🚀' },
    { name: 'Mailchimp', logo: '📧' },
    { name: 'Slack', logo: '💬' },
    { name: 'Zoom', logo: '📹' },
    { name: 'Google Workspace', logo: '🔧' },
    { name: 'Microsoft 365', logo: '📊' }
  ];

  return (
    <>
      <Helmet>
        <title>Features - CRMOnce</title>
        <meta name="description" content="Discover the powerful features of CRMOnce that help businesses manage customer relationships and drive growth." />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl md:text-6xl font-bold mb-6"
              >
                Powerful CRM Features
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-100"
              >
                Everything you need to manage customer relationships, streamline sales processes, 
                and grow your business in one powerful platform.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Complete CRM Solution
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                From lead generation to customer retention, CRMOnce provides all the tools 
                you need to build lasting customer relationships.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card hover className="h-full">
                    <CardHeader>
                      <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center mb-4">
                        <feature.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {feature.title}
                      </h3>
                    </CardHeader>
                    <CardBody>
                      <p className="text-gray-600 mb-4">
                        {feature.description}
                      </p>
                      <ul className="space-y-2">
                        {feature.benefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-center text-sm text-gray-700">
                            <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-2"></div>
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </CardBody>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="py-20 bg-gray-50 border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-4"
              >
                <span className="inline-flex items-center px-4 py-2 rounded-full bg-accent-100 text-accent-700 text-sm font-medium">
                  <ChartBarIcon className="w-4 h-4 mr-2" />
                  Use Cases
                </span>
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-3xl md:text-5xl font-bold text-gray-900 mb-6"
              >
                Built for Sales, Service, and Marketing
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl text-gray-600 max-w-3xl mx-auto"
              >
                CRMOnce adapts to your business—empowering every team to work smarter and deliver results.
              </motion.p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card hover className="h-full">
                <CardBody className="text-center">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <UserGroupIcon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Sales</h3>
                  <p className="text-gray-600 mb-2">Manage pipelines, forecast revenue, and close deals faster.</p>
                </CardBody>
              </Card>
              <Card hover className="h-full">
                <CardBody className="text-center">
                  <div className="w-14 h-14 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <ShieldCheckIcon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Service</h3>
                  <p className="text-gray-600 mb-2">Deliver world-class support with case management and automation.</p>
                </CardBody>
              </Card>
              <Card hover className="h-full">
                <CardBody className="text-center">
                  <div className="w-14 h-14 bg-gradient-to-br from-accent-500 to-accent-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <LightBulbIcon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Marketing</h3>
                  <p className="text-gray-600 mb-2">Run targeted campaigns and track ROI with built-in analytics.</p>
                </CardBody>
              </Card>
            </div>
            <div className="flex justify-center mt-12">
              <span className="inline-flex items-center px-6 py-3 rounded-full bg-blue-50 text-blue-700 text-lg font-semibold border border-blue-200 shadow-sm">
                <span className="mr-2">Works seamlessly with</span>
                <span className="font-bold">Microsoft Dynamics 365</span>
              </span>
            </div>
          </div>
        </section>

        {/* Integrations Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Seamless Integrations
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Connect CRMOnce with your favorite tools and platforms for a unified workflow.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8">
              {integrations.map((integration, index) => (
                <motion.div
                  key={integration.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center mb-3 mx-auto hover:bg-primary-50 transition-colors duration-200">
                    <span className="text-2xl">{integration.logo}</span>
                  </div>
                  <p className="text-sm font-medium text-gray-700">{integration.name}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-700 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              Ready to Get Started?
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl mb-8 max-w-2xl mx-auto"
            >
              Join thousands of businesses that trust CRMOnce to manage their customer relationships.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <a
                href="/register"
                className="btn-accent text-lg px-8 py-4 inline-block"
              >
                Start Free Trial
              </a>
              <a
                href="/contact"
                className="btn-secondary text-lg px-8 py-4 inline-block"
              >
                Schedule Demo
              </a>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Features;
