import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Award, 
  Target, 
  Heart, 
  Shield, 
  Zap, 
  Globe, 
  Building2,
  Calendar,
  TrendingUp,
  Star,
  CheckCircle,
  ArrowRight,
  MapPin,
  Phone,
  Mail,
  Linkedin,
  Twitter,
  Facebook
} from 'lucide-react';

const About: React.FC = () => {
  const values = [
    {
      icon: Target,
      title: "Excellence",
      description: "We strive for excellence in every project, delivering solutions that exceed expectations and drive measurable results.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Heart,
      title: "Customer Focus",
      description: "Our customers are at the heart of everything we do. We build lasting partnerships based on trust and mutual success.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Shield,
      title: "Integrity",
      description: "We conduct business with the highest ethical standards, ensuring transparency and reliability in all our relationships.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "We embrace cutting-edge technologies and innovative approaches to solve complex business challenges.",
      color: "from-orange-500 to-red-500"
    }
  ];

  const team = [
    {
      name: "Uma Mahesh",
      role: "CEO & Founder",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face",
      bio: "15+ years of experience in Microsoft technologies and business transformation.",
      linkedin: "#",
      twitter: "#"
    },
    {
      name: "Michael Chen",
      role: "CTO",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
      bio: "Expert in Dynamics 365 architecture and enterprise solutions.",
      linkedin: "#",
      twitter: "#"
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Consulting",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
      bio: "Specializes in business process optimization and change management.",
      linkedin: "#",
      twitter: "#"
    },
    {
      name: "David Thompson",
      role: "Lead Developer",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
      bio: "Full-stack developer with expertise in Power Platform and Azure.",
      linkedin: "#",
      twitter: "#"
    }
  ];

  const achievements = [
    {
      year: "2024",
      title: "Microsoft Gold Partner",
      description: "Achieved Microsoft Gold Partner status for Dynamics 365 and Power Platform."
    },
    {
      year: "2023",
      title: "500+ Happy Clients",
      description: "Successfully served over 500 organizations across various industries."
    },
    {
      year: "2022",
      title: "Global Expansion",
      description: "Expanded operations to Europe and Asia with new office locations."
    },
    {
      year: "2021",
      title: "Industry Recognition",
      description: "Recognized as a top Dynamics 365 implementation partner."
    },
    {
      year: "2020",
      title: "Company Founded",
      description: "CRMONCE was founded with a vision to transform businesses through technology."
    }
  ];

  const stats = [
    { label: "Years Experience", value: 15, suffix: "+" },
    { label: "Projects Completed", value: 1000, suffix: "+" },
    { label: "Happy Clients", value: 500, suffix: "+" },
    { label: "Team Members", value: 50, suffix: "+" },
    { label: "Countries Served", value: 25, suffix: "+" },
    { label: "Success Rate", value: 98, suffix: "%" }
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
               <span className="gradient-text">About CRMONCE</span>
            </h1>
            <p className="text-xl text-black/90 max-w-3xl mx-auto mb-8">
              We are a team of passionate technology experts dedicated to transforming businesses through innovative Microsoft Dynamics 365 and Power Platform solutions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20 bg-white/95 backdrop-blur-xl">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                 <span className="gradient-text">Our Story</span>
              </h2>
              <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                Founded in 2020, CRMONCE emerged from a simple yet powerful vision: to help businesses leverage the full potential of Microsoft Dynamics 365 and Power Platform to drive growth and efficiency.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                What started as a small team of passionate developers has grown into a global organization serving hundreds of clients across multiple industries. Our journey has been marked by continuous learning, innovation, and an unwavering commitment to customer success.
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                {stats.slice(0, 4).map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="text-center"
                  >
                    <div className="text-3xl font-bold text-primary-600 mb-2">
                      {stat.value}{stat.suffix}
                    </div>
                    <div className="text-gray-600 font-medium">{stat.label}</div>
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
                  <div className="text-center text-white">
                    <Building2 className="w-16 h-16 mx-auto mb-6" />
                    <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                    <p className="text-lg leading-relaxed">
                      To empower organizations with cutting-edge technology solutions that drive innovation, efficiency, and sustainable growth.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-gradient py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
             <span className="gradient-text">Our Values</span>
            </h2>
            <p className="text-xl text-black/90 max-w-3xl mx-auto">
              These core values guide everything we do and shape our relationships with clients, partners, and each other.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                className="feature-card text-center"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${value.color} rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-2xl`}>
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white/95 backdrop-blur-xl">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              <span className="gradient-text"> Meet Our Team</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our leadership team brings together decades of experience in Microsoft technologies and business transformation.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                className="feature-card text-center"
              >
                <div className="relative mb-6">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto object-cover shadow-2xl"
                  />
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-primary-600 font-semibold mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">{member.bio}</p>
                <div className="flex justify-center space-x-3">
                  <a href={member.linkedin} className="text-gray-400 hover:text-primary-600 transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a href={member.twitter} className="text-gray-400 hover:text-primary-600 transition-colors">
                    <Twitter className="w-5 h-5" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="section-gradient py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
               <span className="gradient-text">Our Journey</span>
            </h2>
            <p className="text-xl text-black/90 max-w-3xl mx-auto">
              Key milestones that have shaped our growth and success over the years.
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-white/20"></div>
            <div className="space-y-12">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.8 }}
                  className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  <div className="w-1/2 px-8">
                    <div className="feature-card">
                      <div className="text-2xl font-bold text-primary-600 mb-2">{achievement.year}</div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{achievement.title}</h3>
                      <p className="text-gray-600">{achievement.description}</p>
                    </div>
                  </div>
                  <div className="w-4 h-4 bg-white rounded-full border-4 border-primary-500 relative z-10"></div>
                  <div className="w-1/2 px-8"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white/95 backdrop-blur-xl">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
               <span className="gradient-text">By The Numbers</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our impact and reach across the global business landscape.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                className="text-center"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-2xl">
                  <TrendingUp className="w-10 h-10 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {stat.value}{stat.suffix}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
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
              Ready to Work With Us?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join hundreds of organizations that trust CRMONCE to transform their business operations and drive growth.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-accent text-lg px-8 py-4"
              >
                Get Started Today
                <ArrowRight className="ml-2 w-5 h-5" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-outline text-lg px-8 py-4"
              >
                View Our Work
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About; 