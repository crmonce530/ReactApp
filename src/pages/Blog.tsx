import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Calendar, 
  Clock, 
  User, 
  Tag, 
  ArrowRight, 
  BookOpen, 
  TrendingUp,
  Star,
  Heart,
  Share2,
  Filter,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  MessageSquare,
  Eye,
  ThumbsUp,
  Bookmark,
  Play,
  FileText,
  Code,
  Settings,
  Database,
  Workflow,
  Cloud,
  Shield,
  Zap,
  Target,
  Users,
  Globe,
  Smartphone,
  Monitor,
  BarChart3,
  PieChart,
  LineChart,
  Activity,
  Award,
  Building2,
  Rocket,
  Crown,
  Lightbulb,
  Wrench,
  GraduationCap,
  LifeBuoy,
  Headphones,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Twitter,
  Facebook,
  Instagram
} from 'lucide-react';

const Blog: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('latest');

  const categories = [
    { id: 'all', name: 'All Posts', count: 45 },
    { id: 'dynamics365', name: 'Dynamics 365', count: 15 },
    { id: 'powerplatform', name: 'Power Platform', count: 12 },
    { id: 'implementation', name: 'Implementation', count: 8 },
    { id: 'best-practices', name: 'Best Practices', count: 10 },
    { id: 'case-studies', name: 'Case Studies', count: 5 }
  ];





  const featuredArticles = [
    {
      id: 1,
      title: "The Complete Guide to Dynamics 365 Implementation in 2024",
      excerpt: "Learn the essential steps, best practices, and common pitfalls to avoid when implementing Dynamics 365 in your organization.",
      author: {
        name: "Sarah Johnson",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
        title: "CEO & Founder"
      },
      category: "implementation",
      readTime: "12 min read",
      publishDate: "2024-01-15",
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=400&fit=crop",
      tags: ["Dynamics 365", "Implementation", "Best Practices"],
      views: 2847,
      likes: 156,
      featured: true
    },
    {
      id: 2,
      title: "Power Platform vs Traditional Development: When to Choose What",
      excerpt: "Discover the advantages and limitations of Power Platform compared to traditional development approaches.",
      author: {
        name: "Michael Chen",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
        title: "CTO"
      },
      category: "powerplatform",
      readTime: "8 min read",
      publishDate: "2024-01-12",
      image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=800&h=400&fit=crop",
      tags: ["Power Platform", "Development", "Comparison"],
      views: 1923,
      likes: 98,
      featured: true
    }
  ];

  const articles = [
    {
      id: 3,
      title: "10 Essential Dynamics 365 Sales Features You're Not Using",
      excerpt: "Unlock the full potential of your sales team with these often-overlooked Dynamics 365 features.",
      author: {
        name: "Emily Rodriguez",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
        title: "Head of Consulting"
      },
      category: "dynamics365",
      readTime: "6 min read",
      publishDate: "2024-01-10",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop",
      tags: ["Sales", "Features", "Productivity"],
      views: 1456,
      likes: 87
    },
    {
      id: 4,
      title: "How to Build Custom Workflows with Power Automate",
      excerpt: "Step-by-step guide to creating powerful automated workflows that streamline your business processes.",
      author: {
        name: "David Thompson",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
        title: "Lead Developer"
      },
      category: "powerplatform",
      readTime: "15 min read",
      publishDate: "2024-01-08",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop",
      tags: ["Power Automate", "Workflows", "Automation"],
      views: 1234,
      likes: 76
    },
    {
      id: 5,
      title: "Data Migration Best Practices for Dynamics 365",
      excerpt: "Ensure a smooth transition to Dynamics 365 with these proven data migration strategies.",
      author: {
        name: "Sarah Johnson",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
        title: "CEO & Founder"
      },
      category: "implementation",
      readTime: "10 min read",
      publishDate: "2024-01-05",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop",
      tags: ["Data Migration", "Implementation", "Best Practices"],
      views: 987,
      likes: 54
    },
    {
      id: 6,
      title: "Case Study: How Company X Increased Sales by 300% with Dynamics 365",
      excerpt: "Real-world example of how proper Dynamics 365 implementation transformed a company's sales performance.",
      author: {
        name: "Emily Rodriguez",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
        title: "Head of Consulting"
      },
      category: "case-studies",
      readTime: "7 min read",
      publishDate: "2024-01-03",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop",
      tags: ["Case Study", "Sales", "ROI"],
      views: 2156,
      likes: 134
    }
  ];

  const allArticles = [...featuredArticles, ...articles];

  const filteredArticles = allArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedArticles = [...filteredArticles].sort((a, b) => {
    switch (sortBy) {
      case 'latest':
        return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
      case 'popular':
        return b.views - a.views;
      case 'likes':
        return b.likes - a.likes;
      default:
        return 0;
    }
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
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
              <span className="gradient-text">CRMONCE Blog</span>
            </h1>
            <p className="text-xl text-black/90 max-w-3xl mx-auto mb-8">
              Insights, tips, and best practices for Dynamics 365 and Power Platform success.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search articles, topics, or authors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white/95 backdrop-blur-xl rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 shadow-2xl"
                />
              </div>
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category.id
                      ? 'bg-white text-primary-600 shadow-2xl'
                      : 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm'
                  }`}
                >
                  {category.name} ({category.count})
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="py-20 bg-white/95 backdrop-blur-xl">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
               <span className="gradient-text">Featured Articles</span>
            </h2>
            <p className="text-xl text-black-600 max-w-3xl mx-auto">
              Our most popular and insightful content to help you succeed with Dynamics 365.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {featuredArticles.map((article, index) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                className="feature-card overflow-hidden group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-2xl mb-6">
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Featured
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                    >
                      <Heart className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(article.publishDate)}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4" />
                      <span>{article.readTime}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Eye className="w-4 h-4" />
                      <span>{article.views.toLocaleString()}</span>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                    {article.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {article.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <img 
                        src={article.author.avatar} 
                        alt={article.author.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <div className="font-medium text-gray-900">{article.author.name}</div>
                        <div className="text-sm text-gray-500">{article.author.title}</div>
                      </div>
                    </div>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="btn-primary"
                    >
                      Read More
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </motion.button>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex space-x-2">
                      {article.tags.map((tag) => (
                        <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <ThumbsUp className="w-4 h-4" />
                        <span>{article.likes}</span>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="hover:text-primary-600 transition-colors"
                      >
                        <Share2 className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* All Articles */}
      <section className="section-gradient py-20">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                 <span className="gradient-text">Latest Articles</span>
              </h2>
              <p className="text-xl text-black/90">
                {filteredArticles.length} articles found
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex items-center space-x-4 mt-6 lg:mt-0"
            >
              <span className="text-white font-medium">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white/20 backdrop-blur-sm text-white border border-white/30 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/50"
              >
                <option value="latest">Latest</option>
                <option value="popular">Most Popular</option>
                <option value="likes">Most Liked</option>
              </select>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedArticles.map((article, index) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                className="feature-card overflow-hidden group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-2xl mb-6">
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                    >
                      <Bookmark className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(article.publishDate)}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4" />
                      <span>{article.readTime}</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <img 
                        src={article.author.avatar} 
                        alt={article.author.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div>
                        <div className="font-medium text-gray-900 text-sm">{article.author.name}</div>
                        <div className="text-xs text-gray-500">{article.author.title}</div>
                      </div>
                    </div>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="btn-primary text-sm px-4 py-2"
                    >
                      Read
                      <ArrowRight className="ml-1 w-4 h-4" />
                    </motion.button>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex space-x-2">
                      {article.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center space-x-3 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Eye className="w-4 h-4" />
                        <span>{article.views.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <ThumbsUp className="w-4 h-4" />
                        <span>{article.likes}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-white/95 backdrop-blur-xl">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                <span className="gradient-text"> Stay Updated</span>
              </h2>
              <p className="text-xl text-black-600 mb-8 max-w-2xl mx-auto">
                Get the latest insights, tips, and best practices delivered directly to your inbox.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-6 py-4 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary px-8 py-4"
                >
                  Subscribe
                </motion.button>
              </div>
              
              <p className="text-sm text-black-500 mt-4">
                No spam, unsubscribe at any time. We respect your privacy.
              </p>
            </motion.div>
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
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-black/90 mb-8 max-w-2xl mx-auto">
              Let our experts help you implement Dynamics 365 and Power Platform solutions that drive real results.
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
                Contact Our Team
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Blog; 