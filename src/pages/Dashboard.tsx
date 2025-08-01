import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  ShoppingCart, 
  Calendar, 
  Bell, 
  Settings, 
  LogOut,
  Plus,
  Search,
  Filter,
  Download,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import AnimatedChart from '../components/AnimatedChart';

interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phone: string;
  jobTitle: string;
  city: string;
  country: string;
  interests: string;
  signupDate: string;
  signupSource: string;
  source: string;
}

const Dashboard: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Get user data from localStorage
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (!storedUser || !token) {
      // No user data or token, redirect to login
      navigate('/login');
      return;
    }

    try {
      const user = JSON.parse(storedUser);
      setUserData(user);
    } catch (error) {
      console.error('Error parsing user data:', error);
      navigate('/login');
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    
    // Redirect to login
    navigate('/login');
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  // Show error state if no user data
  if (!userData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Unable to load user data</p>
          <button 
            onClick={() => navigate('/login')}
            className="bg-accent-600 text-white px-4 py-2 rounded-lg hover:bg-accent-700 transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }


  const stats = [
    {
      label: 'Total Revenue',
      value: 124500,
      prefix: '$',
      suffix: '',
      change: '+12.5%',
      isPositive: true,
      icon: DollarSign,
      color: 'from-green-500 to-green-600'
    },
    {
      label: 'Active Users',
      value: 2847,
      prefix: '',
      suffix: '',
      change: '+8.2%',
      isPositive: true,
      icon: Users,
      color: 'from-blue-500 to-blue-600'
    },
    {
      label: 'Sales',
      value: 156,
      prefix: '',
      suffix: '',
      change: '+23.1%',
      isPositive: true,
      icon: ShoppingCart,
      color: 'from-purple-500 to-purple-600'
    },
    {
      label: 'Conversion Rate',
      value: 3.24,
      prefix: '',
      suffix: '%',
      change: '-2.1%',
      isPositive: false,
      icon: TrendingUp,
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'sale',
      title: 'New sale completed',
      description: 'Product A sold to John Doe',
      amount: '$1,250',
      time: '2 minutes ago',
      status: 'completed'
    },
    {
      id: 2,
      type: 'user',
      title: 'New user registered',
      description: 'Sarah Johnson joined the platform',
      amount: '',
      time: '5 minutes ago',
      status: 'completed'
    },
    {
      id: 3,
      type: 'payment',
      title: 'Payment received',
      description: 'Monthly subscription payment',
      amount: '$299',
      time: '1 hour ago',
      status: 'completed'
    },
    {
      id: 4,
      type: 'alert',
      title: 'System alert',
      description: 'High server load detected',
      amount: '',
      time: '2 hours ago',
      status: 'warning'
    }
  ];

  const chartData = [
    { label: 'Jan', value: 4000, color: '#3b82f6' },
    { label: 'Feb', value: 3000, color: '#3b82f6' },
    { label: 'Mar', value: 2000, color: '#3b82f6' },
    { label: 'Apr', value: 2780, color: '#3b82f6' },
    { label: 'May', value: 1890, color: '#3b82f6' },
    { label: 'Jun', value: 2390, color: '#3b82f6' },
    { label: 'Jul', value: 3490, color: '#3b82f6' }
  ];
 // Format signup date from D365
const formatSignupDate = (dateString: string) => {
  try {
    console.log('📅 Raw signup date from D365:', dateString);
    
    if (!dateString) {
      return 'Not available';
    }
    
    // D365 might send dates in different formats
    let date;
    
    // Try parsing as ISO string first
    if (typeof dateString === 'string' && dateString.includes('T')) {
      date = new Date(dateString);
    } else if (typeof dateString === 'string' && dateString.includes('/')) {
      // Handle US date format
      date = new Date(dateString);
    } else if (typeof dateString === 'string' && dateString.includes('-')) {
      // Handle date-only format
      date = new Date(dateString + 'T00:00:00');
    } else {
      // Try direct parsing
      date = new Date(dateString);
    }
    
    // Check if date is valid
    if (isNaN(date.getTime())) {
      console.log('❌ Invalid date format:', dateString);
      return 'Date format error';
    }
    
    const formattedDate = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    console.log('✅ Formatted date:', formattedDate);
    return formattedDate;
    
  } catch (error) {
    console.error('❌ Date parsing error:', error, 'for date:', dateString);
    return 'Date parsing error';
  }
};

  // Format location
  const formatLocation = () => {
    const city = userData.city || '';
    const country = userData.country || '';
    if (city && country) {
      return `${city}, ${country}`;
    } else if (city) {
      return city;
    } else if (country) {
      return country;
    }
    return 'Not specified';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container-custom">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <span>Welcome back,</span>
                <span className="font-semibold text-primary-600">John Doe</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative">
                <Bell size={20} className="text-gray-600" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
              <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <Settings size={20} className="text-gray-600" />
              </button>
              <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors">
                <LogOut size={20} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container-custom py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center`}>
                  <stat.icon size={24} className="text-white" />
                </div>
                <div className={`flex items-center space-x-1 text-sm font-medium ${
                  stat.isPositive ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.isPositive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                  <span>{stat.change}</span>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stat.prefix}{stat.value.toLocaleString()}{stat.suffix}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contact Information Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Your Contact Information</h2>
            <div className="flex items-center space-x-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                Synced with Dynamics 365
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <p className="text-gray-900 font-medium">{userData.fullName}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <p className="text-gray-900">{userData.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <p className="text-gray-900">{userData.phone}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                <p className="text-gray-900">{userData.jobTitle}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <p className="text-gray-900">{formatLocation()}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Interests</label>
                <p className="text-gray-900">{userData.interests || 'Not specified'}</p>
              </div>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="text-sm text-gray-600">
                <span className="font-medium">Dynamics 365 Contact ID:</span> {userData.id}
              </div>
              <div className="text-sm text-gray-600">
                <span className="font-medium">Signup Date:</span> {formatSignupDate(userData.signupDate)}
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div className="text-sm text-gray-600">
                <span className="font-medium">Source:</span> {userData.source}
              </div>
              <button className="text-accent-600 hover:text-accent-700 text-sm font-medium transition-colors">
                Update Information
              </button>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Chart Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Revenue Analytics</h2>
                <div className="flex items-center space-x-2">
                  <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                    <Download size={16} className="text-gray-600" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                    <Filter size={16} className="text-gray-600" />
                  </button>
                </div>
              </div>
              
              <AnimatedChart 
                type="line" 
                data={chartData} 
                height={300} 
                title=""
              />
            </motion.div>

            {/* Recent Activities */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Recent Activities</h2>
                <button className="text-primary-600 hover:text-primary-700 font-medium">
                  View All
                </button>
              </div>
              
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                    className="flex items-center space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      activity.type === 'sale' ? 'bg-green-100' :
                      activity.type === 'user' ? 'bg-blue-100' :
                      activity.type === 'payment' ? 'bg-purple-100' :
                      'bg-orange-100'
                    }`}>
                      {activity.type === 'sale' && <ShoppingCart size={20} className="text-green-600" />}
                      {activity.type === 'user' && <Users size={20} className="text-blue-600" />}
                      {activity.type === 'payment' && <DollarSign size={20} className="text-purple-600" />}
                      {activity.type === 'alert' && <Bell size={20} className="text-orange-600" />}
                    </div>
                    
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{activity.title}</p>
                      <p className="text-sm text-gray-600">{activity.description}</p>
                    </div>
                    
                    <div className="text-right">
                      {activity.amount && (
                        <p className="font-semibold text-gray-900">{activity.amount}</p>
                      )}
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
              
              <div className="space-y-3">
                <button className="w-full flex items-center space-x-3 p-4 rounded-xl hover:bg-gray-50 transition-colors text-left">
                  <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center">
                    <Plus size={20} className="text-primary-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Add New Customer</p>
                    <p className="text-sm text-gray-600">Create a new customer profile</p>
                  </div>
                </button>
                
                <button className="w-full flex items-center space-x-3 p-4 rounded-xl hover:bg-gray-50 transition-colors text-left">
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                    <ShoppingCart size={20} className="text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Create Sale</p>
                    <p className="text-sm text-gray-600">Record a new sale transaction</p>
                  </div>
                </button>
                
                <button className="w-full flex items-center space-x-3 p-4 rounded-xl hover:bg-gray-50 transition-colors text-left">
                  <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                    <Calendar size={20} className="text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Schedule Meeting</p>
                    <p className="text-sm text-gray-600">Book a meeting with client</p>
                  </div>
                </button>
              </div>
            </motion.div>

            {/* Search */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-6">Search</h2>
              
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search customers, sales..."
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none transition-all duration-300"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 