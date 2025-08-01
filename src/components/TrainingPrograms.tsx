import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  GraduationCap, 
  BookOpen, 
  Users, 
  Clock, 
  Star,
  CheckCircle,
  Award,
  Globe,
  Zap,
  Target
} from 'lucide-react';

const TrainingPrograms: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Programs', icon: BookOpen },
    { id: 'microsoft', name: 'Microsoft', icon: Award },
    { id: 'cloud', name: 'Cloud & DevOps', icon: Globe },
    { id: 'development', name: 'Development', icon: Zap },
    { id: 'corporate', name: 'Corporate', icon: Users }
  ];

  const programs = [
    {
      id: 1,
      title: 'Microsoft Dynamics 365 Fundamentals',
      category: 'microsoft',
      duration: '5 Days',
      level: 'Beginner',
      rating: 4.8,
      students: 1250,
      price: '₹25,000',
      originalPrice: '₹35,000',
      description: 'Comprehensive training on Microsoft Dynamics 365 fundamentals including Sales, Customer Service, and Marketing modules.',
      features: [
        'Hands-on practical sessions',
        'Real-world case studies',
        'Certification preparation',
        'Lifetime access to materials',
        '24/7 support during training'
      ],
      instructor: 'Microsoft Certified Trainer',
      format: 'Instructor-led Online',
      nextBatch: '15th Dec 2024',
      certification: 'Microsoft Dynamics 365 Fundamentals'
    },
    {
      id: 2,
      title: 'Power Platform Masterclass',
      category: 'microsoft',
      duration: '4 Days',
      level: 'Intermediate',
      rating: 4.9,
      students: 890,
      price: '₹20,000',
      originalPrice: '₹28,000',
      description: 'Master Power Apps, Power Automate, Power BI, and Power Apps Portals for business automation.',
      features: [
        'Power Apps Canvas & Model-driven',
        'Power Automate flows',
        'Power BI dashboards',
        'Power Apps Portals',
        'Integration scenarios'
      ],
      instructor: 'Power Platform Expert',
      format: 'Instructor-led Online',
      nextBatch: '20th Dec 2024',
      certification: 'Power Platform App Maker'
    },
    {
      id: 3,
      title: 'Azure Cloud Fundamentals',
      category: 'cloud',
      duration: '3 Days',
      level: 'Beginner',
      rating: 4.7,
      students: 2100,
      price: '₹18,000',
      originalPrice: '₹25,000',
      description: 'Learn Azure fundamentals including compute, storage, networking, and security services.',
      features: [
        'Azure compute services',
        'Storage solutions',
        'Networking fundamentals',
        'Security & identity',
        'Cost management'
      ],
      instructor: 'Azure Solutions Architect',
      format: 'Instructor-led Online',
      nextBatch: '10th Dec 2024',
      certification: 'Azure Fundamentals (AZ-900)'
    },
    {
      id: 4,
      title: 'DevOps Engineering',
      category: 'cloud',
      duration: '6 Days',
      level: 'Advanced',
      rating: 4.9,
      students: 650,
      price: '₹30,000',
      originalPrice: '₹40,000',
      description: 'Comprehensive DevOps training covering CI/CD, containerization, and infrastructure as code.',
      features: [
        'CI/CD pipelines',
        'Docker & Kubernetes',
        'Infrastructure as Code',
        'Monitoring & logging',
        'Security in DevOps'
      ],
      instructor: 'DevOps Engineer',
      format: 'Instructor-led Online',
      nextBatch: '25th Dec 2024',
      certification: 'Azure DevOps Engineer Expert'
    },
    {
      id: 5,
      title: 'Full-Stack Web Development',
      category: 'development',
      duration: '8 Weeks',
      level: 'Beginner to Intermediate',
      rating: 4.8,
      students: 1800,
      price: '₹45,000',
      originalPrice: '₹60,000',
      description: 'Complete web development bootcamp covering frontend, backend, and database technologies.',
      features: [
        'HTML, CSS, JavaScript',
        'React.js & Node.js',
        'Database design',
        'API development',
        'Deployment strategies'
      ],
      instructor: 'Full-Stack Developer',
      format: 'Instructor-led Online',
      nextBatch: '5th Jan 2025',
      certification: 'Web Development Certificate'
    },
    {
      id: 6,
      title: 'Corporate Digital Transformation',
      category: 'corporate',
      duration: '2 Days',
      level: 'Executive',
      rating: 4.9,
      students: 320,
      price: '₹50,000',
      originalPrice: '₹75,000',
      description: 'Executive training on digital transformation strategies and implementation.',
      features: [
        'Digital strategy planning',
        'Change management',
        'Technology selection',
        'ROI measurement',
        'Risk mitigation'
      ],
      instructor: 'Digital Transformation Consultant',
      format: 'Instructor-led Online',
      nextBatch: '12th Dec 2024',
      certification: 'Digital Transformation Leadership'
    }
  ];

  const filteredPrograms = activeCategory === 'all' 
    ? programs 
    : programs.filter(program => program.category === activeCategory);

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
            Professional Training Programs
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto font-medium">
            Enhance your skills with our comprehensive training programs designed by industry experts. 
            Get certified and advance your career in technology.
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-6 mb-16">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center space-x-3 px-8 py-4 rounded-2xl font-semibold transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-xl'
                  : 'bg-white text-gray-700 hover:bg-gray-50 shadow-lg border border-gray-200'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <category.icon size={24} />
              <span>{category.name}</span>
            </motion.button>
          ))}
        </div>

        {/* Training Programs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {filteredPrograms.map((program, index) => (
            <motion.div
              key={program.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card-gradient rounded-3xl shadow-xl border border-white/30 overflow-hidden hover:shadow-2xl transition-all duration-500 card-hover"
            >
              {/* Program Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {program.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {program.description}
                    </p>
                  </div>
                  <div className="flex items-center space-x-1 text-yellow-400">
                    <Star size={16} className="fill-current" />
                    <span className="text-sm font-medium text-gray-700">{program.rating}</span>
                  </div>
                </div>

                {/* Program Stats */}
                <div className="flex items-center space-x-6 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Clock size={16} />
                    <span>{program.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users size={16} />
                    <span>{program.students} students</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Target size={16} />
                    <span>{program.level}</span>
                  </div>
                </div>
              </div>

              {/* Program Features */}
              <div className="p-6">
                <h4 className="font-semibold text-gray-900 mb-3">What you'll learn:</h4>
                <ul className="space-y-2 mb-6">
                  {program.features.slice(0, 3).map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                      <CheckCircle size={16} className="text-green-500 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Program Details */}
                <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                  <div>
                    <span className="text-gray-500">Instructor:</span>
                    <p className="font-medium text-gray-900">{program.instructor}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Format:</span>
                    <p className="font-medium text-gray-900">{program.format}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Next Batch:</span>
                    <p className="font-medium text-gray-900">{program.nextBatch}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Certification:</span>
                    <p className="font-medium text-gray-900">{program.certification}</p>
                  </div>
                </div>

                {/* Price and CTA */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-primary-600">{program.price}</span>
                      <span className="text-lg text-gray-400 line-through">{program.originalPrice}</span>
                    </div>
                    <p className="text-sm text-green-600 font-medium">Save ₹{parseInt(program.originalPrice.replace('₹', '')) - parseInt(program.price.replace('₹', ''))}</p>
                  </div>
                  <button className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-200 transform hover:scale-105">
                    Enroll Now
                  </button>
                </div>
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
          <div className="bg-gradient-to-r from-primary-600 to-accent-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Need Custom Training for Your Team?
            </h3>
            <p className="text-xl mb-6 opacity-90 max-w-2xl mx-auto">
              We offer customized corporate training programs tailored to your organization's specific needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105">
                Request Custom Training
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105">
                Download Brochure
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TrainingPrograms; 