import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { 
  LightBulbIcon, 
  HeartIcon, 
  ShieldCheckIcon, 
  UserGroupIcon,
  AcademicCapIcon,
  BriefcaseIcon
} from '@heroicons/react/24/outline';

const About: React.FC = () => {
  const values = [
    {
      icon: LightBulbIcon,
      title: 'Innovation',
      description: 'We constantly push the boundaries of what\'s possible in CRM technology.'
    },
    {
      icon: HeartIcon,
      title: 'Customer First',
      description: 'Every decision we make is driven by what\'s best for our customers.'
    },
    {
      icon: ShieldCheckIcon,
      title: 'Trust & Security',
      description: 'Your data security and privacy are our top priorities.'
    },
    {
      icon: UserGroupIcon,
      title: 'Collaboration',
      description: 'We believe in the power of teamwork and partnership.'
    }
  ];

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      bio: 'Former VP of Sales at TechCorp with 15+ years in CRM industry.',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    {
      name: 'Michael Chen',
      role: 'CTO',
      bio: 'Expert in cloud architecture and enterprise software development.',
      image: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    {
      name: 'Emily Rodriguez',
      role: 'VP of Product',
      bio: 'Product strategist with deep expertise in user experience and market research.',
      image: 'https://images.unsplash.com/photo-1517841905240-472988babbf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    }
  ];

  return (
    <>
      <Helmet>
        <title>About Us - CRMOnce</title>
        <meta name="description" content="Learn about CRMOnce - our mission, values, and the team behind the leading CRM solution." />
      </Helmet>

      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary via-secondary to-accent text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl md:text-6xl font-bold mb-6"
              >
                About CRMOnce
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-100"
              >
                We're on a mission to transform how businesses manage customer relationships 
                and drive growth through intelligent CRM solutions.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Our Story
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Founded by CRM industry veterans, CRMOnce was created to empower businesses of all sizes to build lasting customer relationships. Our journey began with a vision: to make enterprise-grade CRM accessible, intuitive, and affordable for everyone.
                </p>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 mt-10">
                  Our Mission
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  We believe every business deserves powerful, easy-to-use CRM tools that drive real results. Our mission is to democratize CRM technology and help you focus on what matters most—your customers.
                </p>
                <p className="text-lg text-gray-600">
                  Whether you're a startup or an enterprise, CRMOnce provides the insights, automation, and support you need to succeed in today's competitive landscape.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-gradient-to-br from-primary to-secondary rounded-lg p-8 text-white"
              >
                <h3 className="text-2xl font-bold mb-4">Why Choose CRMOnce?</h3>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <AcademicCapIcon className="w-5 h-5 mr-3" />
                    <span>15+ years of CRM industry expertise</span>
                  </li>
                  <li className="flex items-center">
                    <BriefcaseIcon className="w-5 h-5 mr-3" />
                    <span>Trusted by 10,000+ businesses worldwide</span>
                  </li>
                  <li className="flex items-center">
                    <ShieldCheckIcon className="w-5 h-5 mr-3" />
                    <span>Enterprise-grade security and compliance</span>
                  </li>
                  <li className="flex items-center">
                    <UserGroupIcon className="w-5 h-5 mr-3" />
                    <span>24/7 customer support and training</span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Our Core Values
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                These principles guide everything we do, from product development to customer support.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center p-6 bg-white rounded-lg shadow-lg"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {value.title}
                  </h3>
                  <p className="text-gray-600">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Meet Our Team
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                The passionate individuals behind CRMOnce who are dedicated to your success.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="mb-4">
                    <img
                      className="w-32 h-32 rounded-full mx-auto object-cover"
                      src={member.image}
                      alt={member.name}
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-primary font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
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
              <a
                href="/register"
                className="btn-accent text-lg px-8 py-4 inline-block"
              >
                Start Your Free Trial
              </a>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default About; 