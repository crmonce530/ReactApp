import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { 
  ChartBarIcon, 
  UserGroupIcon, 
  CogIcon, 
  ShieldCheckIcon,
  CheckCircleIcon,
  StarIcon,
  ArrowRightIcon,
  PlayIcon,
  SparklesIcon,
  LightBulbIcon,
  RocketLaunchIcon
} from '@heroicons/react/24/outline';
import { Button, Card, CardBody } from '../components/ui';

const Home: React.FC = () => {
  const features = [
    {
      icon: ChartBarIcon,
      title: 'Advanced Analytics',
      description: 'Get deep insights into your business performance with comprehensive analytics and reporting.'
    },
    {
      icon: UserGroupIcon,
      title: 'Contact Management',
      description: 'Organize and manage all your contacts, leads, and customers in one centralized platform.'
    },
    {
      icon: CogIcon,
      title: 'Workflow Automation',
      description: 'Automate repetitive tasks and streamline your business processes for maximum efficiency.'
    },
    {
      icon: ShieldCheckIcon,
      title: 'Enterprise Security',
      description: 'Bank-grade security with role-based access control and data encryption.'
    }
  ];

  const benefits = [
    'Increase sales productivity by 30%',
    'Reduce manual data entry by 80%',
    'Improve customer satisfaction scores',
    'Real-time collaboration across teams',
    'Mobile-first responsive design',
    '24/7 customer support'
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Sales Director',
      company: 'TechCorp Inc.',
      content: 'CRMOnce transformed our sales process. We\'ve seen a 40% increase in our conversion rates.',
      rating: 5
    },
    {
      name: 'Michael Chen',
      role: 'CEO',
      company: 'StartupXYZ',
      content: 'The integration with Dynamics 365 is seamless. It\'s exactly what we needed for our growing business.',
      rating: 5
    },
    {
      name: 'Emily Rodriguez',
      role: 'Marketing Manager',
      company: 'Global Solutions',
      content: 'The analytics and reporting features give us insights we never had before. Highly recommended!',
      rating: 5
    }
  ];

  return (
    <>
      <Helmet>
        <title>CRMOnce - Transform Your Business with Smart CRM</title>
        <meta name="description" content="CRMOnce is a comprehensive CRM solution that helps businesses streamline operations, boost productivity, and drive growth with advanced analytics and automation." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-72 h-72 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-500/10 rounded-full translate-x-1/2 translate-y-1/2"></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-secondary-500/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <div className="text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-6"
              >
                <span className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm font-medium mb-6">
                  <SparklesIcon className="w-4 h-4 mr-2" />
                  New Features Available
                </span>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
              >
                Transform Your
                <br />
                <span className="bg-gradient-to-r from-accent-400 to-accent-300 bg-clip-text text-transparent">
                  Business
                </span>
                <br />
                With Smart CRM
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl md:text-2xl mb-8 text-gray-100 leading-relaxed"
              >
                Streamline operations, boost productivity, and drive growth with our comprehensive CRM solution. 
                Seamlessly integrated with Dynamics 365 for enterprise-grade performance.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <Button 
                  variant="accent" 
                  size="xl"
                  icon={<RocketLaunchIcon className="w-6 h-6" />}
                  as="link"
                  to="/register"
                >
                  Start Free Trial
                </Button>
                <Button 
                  variant="ghost" 
                  size="xl"
                  icon={<PlayIcon className="w-6 h-6" />}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white"
                >
                  Watch Demo
                </Button>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-8 flex items-center justify-center lg:justify-start space-x-6 text-sm text-gray-300"
              >
                <div className="flex items-center">
                  <CheckCircleIcon className="w-5 h-5 mr-2 text-green-400" />
                  Free 14-day trial
                </div>
                <div className="flex items-center">
                  <CheckCircleIcon className="w-5 h-5 mr-2 text-green-400" />
                  No credit card required
                </div>
              </motion.div>
            </div>
            
            {/* Hero Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-white/10 rounded-2xl">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                        <UserGroupIcon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="h-3 bg-white/20 rounded w-20 mb-1"></div>
                        <div className="h-2 bg-white/10 rounded w-16"></div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-400">+23%</div>
                      <div className="text-xs text-gray-300">Growth</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-white/5 rounded-2xl">
                      <div className="w-8 h-8 bg-blue-500 rounded-lg mb-3"></div>
                      <div className="h-2 bg-white/20 rounded w-full mb-2"></div>
                      <div className="h-2 bg-white/10 rounded w-3/4"></div>
                    </div>
                    <div className="p-4 bg-white/5 rounded-2xl">
                      <div className="w-8 h-8 bg-purple-500 rounded-lg mb-3"></div>
                      <div className="h-2 bg-white/20 rounded w-full mb-2"></div>
                      <div className="h-2 bg-white/10 rounded w-2/3"></div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-4"
            >
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-sm font-medium">
                <LightBulbIcon className="w-4 h-4 mr-2" />
                Powerful Features
              </span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl md:text-5xl font-bold text-gray-900 mb-6"
            >
              Everything You Need for
              <br />
              <span className="bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent">
                Modern Business
              </span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Comprehensive tools to manage customer relationships, sales pipeline, and business operations.
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={feature.title} hover gradient>
                <CardBody className="text-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg"
                  >
                    <feature.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Why Choose CRMOnce?
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Join thousands of businesses that have transformed their operations with CRMOnce.
              </p>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex items-center space-x-3"
                  >
                    <CheckCircleIcon className="w-6 h-6 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white p-8 rounded-lg shadow-lg"
            >
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                Customer Testimonials
              </h3>
              <div className="space-y-6">
                {testimonials.map((testimonial, index) => (
                  <div key={testimonial.name} className="border-l-4 border-primary-500 pl-4">
                    <div className="flex items-center mb-2">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <StarIcon key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-600 mb-2">"{testimonial.content}"</p>
                    <div>
                      <p className="font-semibold text-gray-900">{testimonial.name}</p>
                      <p className="text-sm text-gray-500">{testimonial.role}, {testimonial.company}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Case Studies Preview Section */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-4"
            >
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-sm font-medium">
                Customer Success
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl md:text-5xl font-bold text-gray-900 mb-6"
            >
              Real Results, Real Customers
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              See how businesses like yours are succeeding with CRMOnce.
            </motion.p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {/* Preview 3 case studies */}
            {[{
              logo: '/logo.png',
              customer: 'TechCorp Inc.',
              quote: 'CRMOnce transformed our sales process and helped us close deals 30% faster.'
            }, {
              logo: '/logo.png',
              customer: 'Global Solutions',
              quote: 'The integration with Dynamics 365 was seamless and our support team is now more productive than ever.'
            }, {
              logo: '/logo.png',
              customer: 'StartupXYZ',
              quote: 'CRMOnce gave us the insights we needed to scale our business quickly.'
            }].map((cs, idx) => (
              <motion.div
                key={cs.customer}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-gray-50 rounded-xl shadow-lg p-8 flex flex-col items-center text-center"
              >
                <img src={cs.logo} alt={cs.customer + ' logo'} className="w-12 h-12 mb-4 object-contain" />
                <h3 className="text-lg font-semibold mb-2">{cs.customer}</h3>
                <blockquote className="italic text-primary-700 mb-2">“{cs.quote}”</blockquote>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/case-studies" className="btn-secondary inline-block">See All Case Studies</Link>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-4"
            >
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-accent-100 text-accent-700 text-sm font-medium">
                <RocketLaunchIcon className="w-4 h-4 mr-2" />
                Solutions for Every Team
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl md:text-5xl font-bold text-gray-900 mb-6"
            >
              Empower Sales, Service, and Marketing
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              CRMOnce delivers tailored solutions for every department—drive more sales, deliver world-class service, and run smarter marketing campaigns.
            </motion.p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card hover className="h-full">
              <CardBody className="text-center">
                <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <UserGroupIcon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Sales Teams</h3>
                <p className="text-gray-600 mb-2">Close more deals with pipeline management, forecasting, and automation.</p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>Deal tracking & automation</li>
                  <li>Sales analytics</li>
                  <li>Lead scoring</li>
                </ul>
              </CardBody>
            </Card>
            <Card hover className="h-full">
              <CardBody className="text-center">
                <div className="w-14 h-14 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <ShieldCheckIcon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Service Teams</h3>
                <p className="text-gray-600 mb-2">Deliver exceptional support with case management and knowledge base tools.</p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>Case tracking</li>
                  <li>Knowledge base</li>
                  <li>Customer satisfaction surveys</li>
                </ul>
              </CardBody>
            </Card>
            <Card hover className="h-full">
              <CardBody className="text-center">
                <div className="w-14 h-14 bg-gradient-to-br from-accent-500 to-accent-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <LightBulbIcon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Marketing Teams</h3>
                <p className="text-gray-600 mb-2">Run smarter campaigns and track ROI with built-in marketing automation.</p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>Email & SMS campaigns</li>
                  <li>Campaign analytics</li>
                  <li>Lead nurturing</li>
                </ul>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      {/* Partners Preview Section */}
      <section className="py-20 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-4"
            >
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-accent-100 text-accent-700 text-sm font-medium">
                Our Partners
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl md:text-5xl font-bold text-gray-900 mb-6"
            >
              Trusted by Industry Leaders
            </motion.h2>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            {[{
              logo: '/logo.png',
              name: 'Microsoft'
            }, {
              logo: '/logo.png',
              name: 'Azure Cloud'
            }, {
              logo: '/logo.png',
              name: 'Zapier'
            }, {
              logo: '/logo.png',
              name: 'Twilio'
            }, {
              logo: '/logo.png',
              name: 'Power BI'
            }].map((p, idx) => (
              <div key={p.name} className="flex flex-col items-center">
                <img src={p.logo} alt={p.name + ' logo'} className="w-16 h-16 object-contain mb-2" />
                <span className="text-gray-700 font-medium text-sm">{p.name}</span>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/partners" className="btn-secondary inline-block">See All Partners</Link>
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
            Ready to Transform Your Business?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl mb-8 max-w-2xl mx-auto"
          >
            Join thousands of businesses that have already transformed their operations with CRMOnce.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Button
              variant="accent"
              size="xl"
              as="link"
              to="/register"
              icon={<ArrowRightIcon className="w-6 h-6" />}
              iconPosition="right"
            >
              Start Your Free Trial
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Home; 