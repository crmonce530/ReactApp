import React from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Lightbulb, 
  Code, 
  TestTube, 
  Rocket,
  Users,
  ArrowRight,
  CheckCircle,
  Clock,
  Target,
  Zap,
  Shield
} from 'lucide-react';

const DevelopmentProcess: React.FC = () => {
  const processSteps = [
    {
      step: 1,
      title: 'Discovery & Analysis',
      icon: Search,
      description: 'Understanding your business requirements and technical needs',
      color: 'from-blue-500 to-blue-600',
      details: [
        'Business requirement gathering',
        'Technical feasibility analysis',
        'Stakeholder interviews',
        'Competitive analysis',
        'Project scope definition'
      ],
      duration: '1-2 weeks'
    },
    {
      step: 2,
      title: 'Planning & Design',
      icon: Lightbulb,
      description: 'Creating detailed project plans and system architecture',
      color: 'from-green-500 to-green-600',
      details: [
        'System architecture design',
        'Database schema planning',
        'UI/UX wireframing',
        'Technology stack selection',
        'Project timeline creation'
      ],
      duration: '1-2 weeks'
    },
    {
      step: 3,
      title: 'Development',
      icon: Code,
      description: 'Agile development with regular iterations and feedback',
      color: 'from-purple-500 to-purple-600',
      details: [
        'Agile development methodology',
        'Regular sprint deliveries',
        'Code review processes',
        'Version control management',
        'Continuous integration'
      ],
      duration: '4-12 weeks'
    },
    {
      step: 4,
      title: 'Testing & QA',
      icon: TestTube,
      description: 'Comprehensive testing to ensure quality and reliability',
      color: 'from-orange-500 to-orange-600',
      details: [
        'Unit and integration testing',
        'User acceptance testing',
        'Performance testing',
        'Security testing',
        'Bug fixing and optimization'
      ],
      duration: '1-2 weeks'
    },
    {
      step: 5,
      title: 'Deployment',
      icon: Rocket,
      description: 'Smooth deployment and go-live with minimal downtime',
      color: 'from-red-500 to-red-600',
      details: [
        'Production environment setup',
        'Data migration',
        'User training',
        'Go-live support',
        'Performance monitoring'
      ],
      duration: '1 week'
    },
    {
      step: 6,
      title: 'Support & Maintenance',
      icon: Users,
      description: 'Ongoing support and maintenance to ensure optimal performance',
      color: 'from-indigo-500 to-indigo-600',
      details: [
        '24/7 technical support',
        'Regular maintenance updates',
        'Performance optimization',
        'Feature enhancements',
        'Security patches'
      ],
      duration: 'Ongoing'
    }
  ];

  const methodologies = [
    {
      title: 'Agile Development',
      icon: Zap,
      description: 'Iterative development with regular feedback and continuous improvement',
      benefits: ['Faster delivery', 'Better quality', 'Customer satisfaction', 'Adaptability']
    },
    {
      title: 'DevOps Integration',
      icon: Rocket,
      description: 'Seamless integration of development and operations for faster deployment',
      benefits: ['Automated deployment', 'Faster releases', 'Better collaboration', 'Reduced errors']
    },
    {
      title: 'Quality Assurance',
      icon: Shield,
      description: 'Comprehensive testing strategies to ensure software reliability',
      benefits: ['Bug-free software', 'Better performance', 'User satisfaction', 'Cost savings']
    }
  ];

  return (
    <div className="bg-white py-16">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Development Process
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We follow a proven development methodology that ensures high-quality, 
            scalable solutions delivered on time and within budget.
          </p>
        </motion.div>

        {/* Process Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {processSteps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Step Number */}
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-sm z-10">
                {step.step}
              </div>

              {/* Process Card */}
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 h-full">
                <div className={`w-12 h-12 bg-gradient-to-r ${step.color} rounded-lg flex items-center justify-center mb-4`}>
                  <step.icon size={24} className="text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {step.title}
                </h3>
                
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {step.description}
                </p>

                <div className="mb-4">
                  <span className="inline-flex items-center text-sm text-gray-500">
                    <Clock size={16} className="mr-1" />
                    Duration: {step.duration}
                  </span>
                </div>

                <ul className="space-y-2">
                  {step.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex items-center text-sm text-gray-600">
                      <CheckCircle size={16} className="text-green-500 mr-2 flex-shrink-0" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Arrow for connection */}
              {index < processSteps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-5">
                  <ArrowRight size={24} className="text-gray-300" />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Methodologies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-12">
            Our Methodologies
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {methodologies.map((methodology, index) => (
              <motion.div
                key={methodology.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-200"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg flex items-center justify-center mb-4">
                  <methodology.icon size={24} className="text-white" />
                </div>
                
                <h4 className="text-lg font-bold text-gray-900 mb-3">
                  {methodology.title}
                </h4>
                
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {methodology.description}
                </p>

                <ul className="space-y-2">
                  {methodology.benefits.map((benefit, benefitIndex) => (
                    <li key={benefitIndex} className="flex items-center text-sm text-gray-600">
                      <Target size={16} className="text-primary-500 mr-2 flex-shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-primary-600 to-accent-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Start Your Project?
            </h3>
            <p className="text-xl mb-6 opacity-90 max-w-2xl mx-auto">
              Let's discuss your project requirements and create a custom development plan tailored to your needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105">
                Get Free Consultation
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105">
                View Our Portfolio
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DevelopmentProcess; 