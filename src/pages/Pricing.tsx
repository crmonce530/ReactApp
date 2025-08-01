import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Check, 
  X, 
  Star, 
  ArrowRight, 
  Zap, 
  Shield, 
  Users, 
  Database,
  Globe,
  Clock,
  MessageSquare,
  Phone,
  Mail,
  Calendar,
  TrendingUp,
  Award,
  Building2,
  Settings,
  BarChart3,
  Workflow,
  Cloud,
  Lock,
  RefreshCw,
  Eye,
  Bell,
  FileText,
  PieChart,
  LineChart,
  Activity,
  Crown,
  Rocket,
  Target,
  Heart
} from 'lucide-react';

const Pricing: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      icon: Rocket,
      color: 'from-blue-500 to-cyan-500',
      monthlyPrice: 99,
      yearlyPrice: 990,
      description: 'Perfect for small businesses getting started with Dynamics 365.',
      features: [
        'Dynamics 365 Sales Basic',
        'Up to 10 Users',
        'Basic Reporting',
        'Email Support',
        'Mobile App Access',
        'Standard Integrations'
      ],
      notIncluded: [
        'Advanced Analytics',
        'Custom Workflows',
        'Priority Support',
        'Advanced Security'
      ],
      popular: false
    },
    {
      id: 'professional',
      name: 'Professional',
      icon: Target,
      color: 'from-purple-500 to-pink-500',
      monthlyPrice: 299,
      yearlyPrice: 2990,
      description: 'Ideal for growing businesses that need advanced features and scalability.',
      features: [
        'Dynamics 365 Sales Professional',
        'Up to 50 Users',
        'Advanced Analytics',
        'Custom Workflows',
        'Priority Support',
        'Advanced Security',
        'Power Platform Integration',
        'API Access'
      ],
      notIncluded: [
        'Enterprise Features',
        'Dedicated Account Manager'
      ],
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      icon: Crown,
      color: 'from-orange-500 to-red-500',
      monthlyPrice: 599,
      yearlyPrice: 5990,
      description: 'Complete solution for large enterprises with complex requirements.',
      features: [
        'Full Dynamics 365 Suite',
        'Unlimited Users',
        'Enterprise Analytics',
        'Custom Development',
        'Dedicated Support',
        'Advanced Security',
        'Power Platform Premium',
        'Custom Integrations',
        'Dedicated Account Manager',
        'Training & Consulting'
      ],
      notIncluded: [],
      popular: false
    }
  ];

  const addOns = [
    {
      name: 'Custom Development',
      description: 'Tailored solutions built specifically for your business needs.',
      price: 150,
      icon: Settings
    },
    {
      name: 'Training & Consulting',
      description: 'Expert guidance to maximize your Dynamics 365 investment.',
      price: 200,
      icon: Users
    },
    {
      name: 'Data Migration',
      description: 'Seamless migration from your existing systems to Dynamics 365.',
      price: 100,
      icon: Database
    },
    {
      name: '24/7 Support',
      description: 'Round-the-clock technical support for critical business operations.',
      price: 300,
      icon: Phone
    }
  ];

  const features = [
    {
      category: 'Core Features',
      items: [
        { name: 'User Management', starter: true, professional: true, enterprise: true },
        { name: 'Sales Pipeline', starter: true, professional: true, enterprise: true },
        { name: 'Lead Management', starter: true, professional: true, enterprise: true },
        { name: 'Opportunity Tracking', starter: true, professional: true, enterprise: true },
        { name: 'Contact Management', starter: true, professional: true, enterprise: true }
      ]
    },
    {
      category: 'Advanced Features',
      items: [
        { name: 'Advanced Analytics', starter: false, professional: true, enterprise: true },
        { name: 'Custom Workflows', starter: false, professional: true, enterprise: true },
        { name: 'Power Platform Integration', starter: false, professional: true, enterprise: true },
        { name: 'API Access', starter: false, professional: true, enterprise: true },
        { name: 'Custom Development', starter: false, professional: false, enterprise: true }
      ]
    },
    {
      category: 'Support & Services',
      items: [
        { name: 'Email Support', starter: true, professional: true, enterprise: true },
        { name: 'Priority Support', starter: false, professional: true, enterprise: true },
        { name: 'Dedicated Account Manager', starter: false, professional: false, enterprise: true },
        { name: 'Training & Consulting', starter: false, professional: false, enterprise: true },
        { name: '24/7 Support', starter: false, professional: false, enterprise: true }
      ]
    }
  ];

  const getPrice = (plan: any) => {
    return billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;
  };

  const getSavings = (plan: any) => {
    if (billingCycle === 'yearly') {
      return plan.monthlyPrice * 12 - plan.yearlyPrice;
    }
    return 0;
  };

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
               <span className="gradient-text">Simple Pricing</span>
            </h1>
            <p className="text-xl text-black/90 max-w-3xl mx-auto mb-8">
              Choose the perfect plan for your business. All plans include our core features with flexible options to scale as you grow.
            </p>
            
            {/* Billing Toggle */}
            <div className="flex items-center justify-center space-x-4 mb-8">
              <span className="text-black font-medium">Monthly</span>
              <button
                onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
                className={`relative inline-flex h-12 w-24 items-center rounded-full transition-colors ${
                  billingCycle === 'yearly' ? 'bg-primary-500' : 'bg-black/20'
                }`}
              >
                <span
                  className={`inline-block h-8 w-8 transform rounded-full bg-white transition-transform ${
                    billingCycle === 'yearly' ? 'translate-x-12' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className="text-black font-medium">Yearly</span>
              {billingCycle === 'yearly' && (
                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Save 20%
                </span>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-20 bg-white/95 backdrop-blur-xl">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                className={`relative ${plan.popular ? 'scale-105' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-primary-500 to-accent-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-2xl">
                      Most Popular
                    </div>
                  </div>
                )}
                
                <div className={`feature-card h-full ${plan.popular ? 'ring-4 ring-primary-500' : ''}`}>
                  <div className="text-center mb-8">
                    <div className={`w-16 h-16 bg-gradient-to-br ${plan.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-2xl`}>
                      <plan.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <p className="text-gray-600 mb-6">{plan.description}</p>
                    
                    <div className="mb-6">
                      <div className="text-4xl font-bold text-gray-900">
                        ${getPrice(plan)}
                        <span className="text-lg text-gray-500">/{billingCycle === 'monthly' ? 'mo' : 'year'}</span>
                      </div>
                      {getSavings(plan) > 0 && (
                        <div className="text-green-600 font-medium mt-2">
                          Save ${getSavings(plan)} per year
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4 mb-8">
                    <h4 className="font-bold text-gray-900 mb-4">What's Included:</h4>
                    {plan.features.map((feature, featureIndex) => (
                      <motion.div
                        key={feature}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: featureIndex * 0.05, duration: 0.5 }}
                        className="flex items-center space-x-3"
                      >
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </motion.div>
                    ))}
                    
                    {plan.notIncluded.length > 0 && (
                      <>
                        <h4 className="font-bold text-gray-900 mb-4 mt-6">Not Included:</h4>
                        {plan.notIncluded.map((feature, featureIndex) => (
                          <motion.div
                            key={feature}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: (featureIndex + plan.features.length) * 0.05, duration: 0.5 }}
                            className="flex items-center space-x-3"
                          >
                            <X className="w-5 h-5 text-red-500 flex-shrink-0" />
                            <span className="text-gray-500">{feature}</span>
                          </motion.div>
                        ))}
                      </>
                    )}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedPlan(plan.id)}
                    className={`w-full py-4 px-6 rounded-2xl font-bold transition-all duration-300 ${
                      plan.popular
                        ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-2xl hover:shadow-primary-500/25'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    Get Started
                    <ArrowRight className="ml-2 w-5 h-5 inline" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="section-gradient py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
               <span className="gradient-text">Feature Comparison</span>
            </h2>
            <p className="text-xl text-black/90 max-w-3xl mx-auto">
              Compare our plans side by side to find the perfect fit for your business needs.
            </p>
          </motion.div>

          <div className="overflow-x-auto">
            <table className="w-full bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="p-6 text-left font-bold text-gray-900">Features</th>
                  <th className="p-6 text-center font-bold text-gray-900">Starter</th>
                  <th className="p-6 text-center font-bold text-gray-900">Professional</th>
                  <th className="p-6 text-center font-bold text-gray-900">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {features.map((category, categoryIndex) => (
                  <React.Fragment key={category.category}>
                    <tr className="bg-gray-50">
                      <td colSpan={4} className="p-4 font-bold text-gray-900">
                        {category.category}
                      </td>
                    </tr>
                    {category.items.map((item, itemIndex) => (
                      <motion.tr
                        key={item.name}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: (categoryIndex * 5 + itemIndex) * 0.1, duration: 0.5 }}
                        className="border-b border-gray-100"
                      >
                        <td className="p-6 text-gray-700">{item.name}</td>
                        <td className="p-6 text-center">
                          {item.starter ? (
                            <Check className="w-6 h-6 text-green-500 mx-auto" />
                          ) : (
                            <X className="w-6 h-6 text-red-500 mx-auto" />
                          )}
                        </td>
                        <td className="p-6 text-center">
                          {item.professional ? (
                            <Check className="w-6 h-6 text-green-500 mx-auto" />
                          ) : (
                            <X className="w-6 h-6 text-red-500 mx-auto" />
                          )}
                        </td>
                        <td className="p-6 text-center">
                          {item.enterprise ? (
                            <Check className="w-6 h-6 text-green-500 mx-auto" />
                          ) : (
                            <X className="w-6 h-6 text-red-500 mx-auto" />
                          )}
                        </td>
                      </motion.tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Add-ons Section */}
      <section className="py-20 bg-white/95 backdrop-blur-xl">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
               <span className="gradient-text">Additional Services</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Enhance your Dynamics 365 experience with our professional services and add-ons.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {addOns.map((addon, index) => (
              <motion.div
                key={addon.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                className="feature-card text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
                  <addon.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{addon.name}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{addon.description}</p>
                <div className="text-2xl font-bold text-primary-600 mb-4">
                  ${addon.price}/month
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary w-full"
                >
                  Add Service
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enterprise Solutions */}
      <section className="section-gradient py-20">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                 <span className="gradient-text">Enterprise Solutions</span>
              </h2>
              <p className="text-xl text-black/90 mb-8 leading-relaxed">
                For large organizations with complex requirements, we offer custom enterprise solutions tailored to your specific needs.
              </p>
              
              <div className="space-y-6">
                {[
                  {
                    icon: Building2,
                    title: "Custom Development",
                    description: "Tailored solutions built specifically for your business processes and requirements."
                  },
                  {
                    icon: Users,
                    title: "Dedicated Team",
                    description: "Your own team of Dynamics 365 experts working exclusively on your projects."
                  },
                  {
                    icon: Shield,
                    title: "Enterprise Security",
                    description: "Advanced security features and compliance solutions for enterprise environments."
                  }
                ].map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="flex items-start space-x-4"
                  >
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-6 h-6 text-black" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-4 gradient-text">{item.title}</h3>
                      <p className="text-black/80 leading-relaxed">{item.description}</p>
                    </div>
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
                  className="btn-accent text-lg px-8 py-4"
                >
                  Contact Enterprise Sales
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
                <div className="bg-white/20 backdrop-blur-xl rounded-3xl p-8 border border-white/30 shadow-2xl">
                  <div className="text-center text-black">
                    <Crown className="w-16 h-16 mx-auto mb-6 text-gold-400" />
                    <h3 className="text-2xl font-bold mb-4 gradient-text">Enterprise Package</h3>
                    <div className="text-4xl font-bold mb-4 text-blue">Custom Pricing</div>
                    <p className="text-lg leading-relaxed mb-6">
                      Contact us for a personalized quote based on your specific requirements and scale.
                    </p>
                    <div className="space-y-3 text-left">
                      <div className="flex items-center space-x-3">
                        <Check className="w-5 h-5 text-green-400" />
                        <span>Unlimited Users</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Check className="w-5 h-5 text-green-400" />
                        <span>Custom Development</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Check className="w-5 h-5 text-green-400" />
                        <span>Dedicated Support</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Check className="w-5 h-5 text-green-400" />
                        <span>SLA Guarantees</span>
                      </div>
                    </div>
                  </div>
                </div>
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
              Get answers to common questions about our pricing and services.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                question: "Can I change my plan later?",
                answer: "Yes, you can upgrade or downgrade your plan at any time. Changes will be prorated based on your billing cycle."
              },
              {
                question: "Is there a setup fee?",
                answer: "No setup fees for our standard plans. Custom enterprise solutions may have implementation costs."
              },
              {
                question: "What payment methods do you accept?",
                answer: "We accept all major credit cards, PayPal, and bank transfers for annual plans."
              },
              {
                question: "Do you offer refunds?",
                answer: "We offer a 30-day money-back guarantee for all new subscriptions."
              },
              {
                question: "Is training included?",
                answer: "Basic training is included with Professional and Enterprise plans. Additional training is available as an add-on."
              },
              {
                question: "Can I cancel anytime?",
                answer: "Yes, you can cancel your subscription at any time with no cancellation fees."
              }
            ].map((faq, index) => (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
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
            <h2 className="text-4xl md:text-5xl font-bold text-black 6">
            Ready to Get Started?
            </h2>
            <p className="text-xl text-black/90 mb-8 max-w-2xl mx-auto">
              Choose the perfect plan for your business and start transforming your operations with Dynamics 365.
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

export default Pricing; 