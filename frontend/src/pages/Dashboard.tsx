import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import {
  UserGroupIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  ArrowTrendingUpIcon,
  CalendarIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationCircleIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../contexts/AuthContext';
import { DashboardStats, RecentActivity } from '../types';
import { StatCard, Card, CardHeader, CardBody } from '../components/ui';
import axios from 'axios';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dashboardData, setDashboardData] = useState<{
    totalContacts: number;
    totalLeads: number;
    totalOpportunities: number;
    totalValue: number;
    recentActivities: RecentActivity[];
  } | null>(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.get('/api/d365/dashboard');
      
      if (response.data.success) {
        setDashboardData(response.data.data);
      } else {
        setError('Failed to fetch dashboard data');
      }
    } catch (error: any) {
      console.error('Error fetching dashboard data:', error);
      setError(error.response?.data?.message || 'Failed to fetch dashboard data');
      
      // Fallback to mock data if D365 is not configured
      setDashboardData({
        totalContacts: 1247,
        totalLeads: 89,
        totalOpportunities: 45,
        totalValue: 284500,
        recentActivities: [
          {
            id: '1',
            type: 'lead',
            title: 'New Lead Added',
            description: 'John Smith from TechCorp Inc. was added as a new lead',
            timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
            status: 'pending'
          },
          {
            id: '2',
            type: 'opportunity',
            title: 'Opportunity Won',
            description: 'Enterprise CRM deal worth $45,000 was closed successfully',
            timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
            status: 'completed'
          },
          {
            id: '3',
            type: 'contact',
            title: 'Contact Updated',
            description: 'Sarah Johnson\'s contact information was updated',
            timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
            status: 'completed'
          },
          {
            id: '4',
            type: 'lead',
            title: 'Follow-up Reminder',
            description: 'Follow up with ABC Company regarding proposal',
            timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
            status: 'pending'
          }
        ]
      });
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    }).format(date);
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'lead':
        return <UserGroupIcon className="w-5 h-5 text-blue-500" />;
      case 'opportunity':
        return <CurrencyDollarIcon className="w-5 h-5 text-green-500" />;
      case 'contact':
        return <UserGroupIcon className="w-5 h-5 text-purple-500" />;
      case 'task':
        return <CheckCircleIcon className="w-5 h-5 text-orange-500" />;
      default:
        return <ClockIcon className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircleIcon className="w-4 h-4 text-green-500" />;
      case 'pending':
        return <ExclamationCircleIcon className="w-4 h-4 text-yellow-500" />;
      case 'cancelled':
        return <ExclamationCircleIcon className="w-4 h-4 text-red-500" />;
      default:
        return <ClockIcon className="w-4 h-4 text-gray-500" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  if (error && !dashboardData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <ExclamationCircleIcon className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Dashboard</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchDashboardData}
            className="btn-primary"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const stats: DashboardStats = {
    totalLeads: dashboardData?.totalLeads || 0,
    totalDeals: dashboardData?.totalOpportunities || 0,
    totalRevenue: dashboardData?.totalValue || 0,
    conversionRate: dashboardData?.totalLeads ? 
      ((dashboardData.totalOpportunities / dashboardData.totalLeads) * 100) : 0
  };

  const recentActivities = dashboardData?.recentActivities || [];

  return (
    <>
      <Helmet>
        <title>Dashboard - CRMOnce</title>
        <meta name="description" content="Your CRMOnce dashboard - manage leads, deals, and customer relationships." />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600 mt-2">
                Welcome back, {user?.firstName}! Here's what's happening with your business.
              </p>
              {error && (
                <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                  <p className="text-yellow-800 text-sm">
                    <strong>Note:</strong> {error} - Showing demo data.
                  </p>
                </div>
              )}
            </div>
            <div className="bg-gradient-to-r from-primary-100 to-accent-100 rounded-xl p-6 shadow flex flex-col items-center">
              <h2 className="text-lg font-semibold text-primary-700 mb-2">Quick Tips</h2>
              <ul className="text-sm text-primary-700 space-y-1">
                <li>• Use Quick Actions to add leads or schedule meetings fast.</li>
                <li>• Check Top Deals to focus on high-value opportunities.</li>
                <li>• Review Recent Activities for follow-ups.</li>
              </ul>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Total Leads"
              value={stats.totalLeads.toLocaleString()}
              icon={<UserGroupIcon className="w-6 h-6" />}
              color="blue"
              change={12.5}
            />
            
            <StatCard
              title="Opportunities"
              value={stats.totalDeals}
              icon={<CurrencyDollarIcon className="w-6 h-6" />}
              color="green"
              change={8.2}
            />
            
            <StatCard
              title="Total Revenue"
              value={formatCurrency(stats.totalRevenue)}
              icon={<ChartBarIcon className="w-6 h-6" />}
              color="purple"
              change={15.3}
            />
            
            <StatCard
              title="Conversion Rate"
              value={`${stats.conversionRate.toFixed(1)}%`}
              icon={<ArrowTrendingUpIcon className="w-6 h-6" />}
              color="orange"
              change={-2.1}
            />
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Activities */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold text-gray-900">Recent Activities</h3>
                </CardHeader>
                <CardBody>
                  <div className="space-y-4">
                    {recentActivities.map((activity, index) => (
                      <motion.div 
                        key={activity.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="flex items-start space-x-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200"
                      >
                        <div className="flex-shrink-0 mt-1">
                          {getActivityIcon(activity.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                            <div className="flex items-center space-x-2">
                              {getStatusIcon(activity.status)}
                              <span className="text-xs text-gray-500">{formatDate(activity.timestamp)}</span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardBody>
              </Card>
              {/* Top Deals Section */}
              <Card className="mt-8">
                <CardHeader>
                  <h3 className="text-lg font-semibold text-gray-900">Top Deals</h3>
                </CardHeader>
                <CardBody>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead>
                        <tr>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deal</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stage</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Probability</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {/* Example static data, replace with real data if available */}
                        <tr>
                          <td className="px-4 py-2 font-medium text-gray-900">Enterprise CRM Implementation</td>
                          <td className="px-4 py-2 text-green-600 font-semibold">$45,000</td>
                          <td className="px-4 py-2">Negotiation</td>
                          <td className="px-4 py-2">85%</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 font-medium text-gray-900">Sales Automation Platform</td>
                          <td className="px-4 py-2 text-green-600 font-semibold">$32,000</td>
                          <td className="px-4 py-2">Proposal</td>
                          <td className="px-4 py-2">70%</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 font-medium text-gray-900">Customer Support System</td>
                          <td className="px-4 py-2 text-green-600 font-semibold">$28,000</td>
                          <td className="px-4 py-2">Qualification</td>
                          <td className="px-4 py-2">60%</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardBody>
              </Card>
            </div>

            {/* Quick Actions */}
            <div>
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
                </CardHeader>
                <CardBody>
                  <div className="space-y-4">
                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-xl text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-sm"
                    >
                      <UserGroupIcon className="w-5 h-5 mr-2" />
                      Add Lead
                    </motion.button>
                    
                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-xl text-white bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-sm"
                    >
                      <CurrencyDollarIcon className="w-5 h-5 mr-2" />
                      Create Opportunity
                    </motion.button>
                    
                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-xl text-white bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 transition-all duration-200 shadow-sm"
                    >
                      <CalendarIcon className="w-5 h-5 mr-2" />
                      Schedule Meeting
                    </motion.button>
                    
                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-xl text-white bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 transition-all duration-200 shadow-sm"
                    >
                      <CheckCircleIcon className="w-5 h-5 mr-2" />
                      Create Task
                    </motion.button>
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard; 