import React from 'react';
import { motion } from 'framer-motion';
import { 
  Code, 
  Users, 
  GraduationCap, 
  Database, 
  Cloud, 
  Shield,
  Zap,
  Globe,
  Smartphone,
  Monitor,
  Server,
  Cpu,
  GitBranch,
  TestTube,
  Rocket,
  Target,
  Lightbulb,
  Briefcase
} from 'lucide-react';

const ServicesShowcase: React.FC = () => {
  const services = [
    {
      category: 'Software Development',
      icon: Code,
      color: 'from-blue-500 to-blue-600',
      services: [
        {
          title: 'Custom Software Development',
          description: 'Tailored software solutions built to meet your specific business requirements',
          icon: Cpu,
          features: ['Web Applications', 'Mobile Apps', 'Desktop Software', 'API Development']
        },
        {
          title: 'Full-Stack Development',
          description: 'Complete end-to-end development from frontend to backend systems',
          icon: GitBranch,
          features: ['React/Next.js', 'Node.js/Python', 'Database Design', 'DevOps Integration']
        },
        {
          title: 'Legacy System Modernization',
          description: 'Transform outdated systems into modern, scalable applications',
          icon: Rocket,
          features: ['System Analysis', 'Migration Planning', 'Data Migration', 'Performance Optimization']
        },
        {
          title: 'Quality Assurance & Testing',
          description: 'Comprehensive testing strategies to ensure software reliability',
          icon: TestTube,
          features: ['Unit Testing', 'Integration Testing', 'Automated Testing', 'Performance Testing']
        }
      ]
    },
    {
      category: 'IT Consultancy',
      icon: Briefcase,
      color: 'from-green-500 to-green-600',
      services: [
        {
          title: 'Technology Strategy',
          description: 'Strategic technology planning aligned with your business objectives',
          icon: Target,
          features: ['Technology Assessment', 'Roadmap Planning', 'Architecture Design', 'Risk Analysis']
        },
        {
          title: 'Digital Transformation',
          description: 'Guide your organization through digital transformation initiatives',
          icon: Zap,
          features: ['Process Optimization', 'Technology Integration', 'Change Management', 'ROI Analysis']
        },
        {
          title: 'Cloud Strategy & Migration',
          description: 'Expert guidance on cloud adoption and migration strategies',
          icon: Cloud,
          features: ['Cloud Assessment', 'Migration Planning', 'Cost Optimization', 'Security Implementation']
        },
        {
          title: 'Security & Compliance',
          description: 'Comprehensive security assessments and compliance solutions',
          icon: Shield,
          features: ['Security Audits', 'Compliance Frameworks', 'Risk Management', 'Security Training']
        }
      ]
    },
    {
      category: 'Training Services',
      icon: GraduationCap,
      color: 'from-purple-500 to-purple-600',
      services: [
        {
          title: 'Microsoft Technologies',
          description: 'Comprehensive training on Microsoft Dynamics 365 and Power Platform',
          icon: Monitor,
          features: ['Dynamics 365', 'Power Apps', 'Power Automate', 'Power BI']
        },
        {
          title: 'Cloud & DevOps',
          description: 'Training programs for cloud technologies and DevOps practices',
          icon: Server,
          features: ['Azure Fundamentals', 'DevOps Practices', 'Container Technologies', 'CI/CD Pipelines']
        },
        {
          title: 'Software Development',
          description: 'Programming and development skills training for your team',
          icon: Code,
          features: ['Web Development', 'Mobile Development', 'Database Design', 'API Development']
        },
        {
          title: 'Custom Corporate Training',
          description: 'Tailored training programs designed for your organization',
          icon: Users,
          features: ['Needs Assessment', 'Custom Curriculum', 'Hands-on Workshops', 'Certification Programs']
        }
      ]
    }
  ];

  return (
    <div className="section-gradient py-20">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 text-shadow">
            Comprehensive IT Solutions
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto font-medium">
            From software development to consultancy and training, we provide end-to-end IT solutions 
            to help your business thrive in the digital age.
          </p>
        </motion.div>

        <div className="space-y-16">
          {services.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-center mb-12">
                <div className={`w-16 h-16 bg-gradient-to-r ${category.color} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                  <category.icon size={32} className="text-white" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  {category.category}
                </h3>
                <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto"></div>
              </div>

                             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                 {category.services.map((service, serviceIndex) => (
                   <motion.div
                     key={service.title}
                     initial={{ opacity: 0, y: 20 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.5, delay: serviceIndex * 0.1 }}
                     viewport={{ once: true }}
                     className="card-gradient rounded-2xl p-8 shadow-xl border border-white/30 hover:shadow-2xl transition-all duration-500 group card-hover"
                   >
                                         <div className={`w-16 h-16 bg-gradient-to-r ${category.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                       <service.icon size={28} className="text-white" />
                     </div>
                    
                                         <h4 className="text-xl font-bold text-gray-900 mb-4">
                       {service.title}
                     </h4>
                     
                     <p className="text-gray-600 text-base mb-6 leading-relaxed">
                       {service.description}
                     </p>
                    
                                         <ul className="space-y-3">
                       {service.features.map((feature, featureIndex) => (
                         <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                           <div className="w-2 h-2 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full mr-3"></div>
                           {feature}
                         </li>
                       ))}
                     </ul>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
                     <div className="bg-gradient-to-r from-primary-600 via-primary-700 to-accent-600 rounded-3xl p-12 text-white shadow-2xl">
             <h3 className="text-3xl md:text-4xl font-bold mb-6 text-shadow">
               Ready to Transform Your Business?
             </h3>
             <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto font-medium">
               Let's discuss how our comprehensive IT solutions can help you achieve your business goals.
             </p>
             <div className="flex flex-col sm:flex-row gap-6 justify-center">
               <button className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-4 px-10 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-xl">
                 Get Free Consultation
               </button>
               <button className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold py-4 px-10 rounded-2xl transition-all duration-300 transform hover:scale-105">
                 View Training Programs
               </button>
             </div>
           </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ServicesShowcase; 