import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { 
  ChartBarIcon,
  ArrowTrendingUpIcon,
  UsersIcon,
  CurrencyDollarIcon,
  CalendarIcon,
  DocumentChartBarIcon,
  FunnelIcon,
  EyeIcon
} from '@heroicons/react/24/outline';
import { Button, Card, CardBody, StatCard } from '../components/ui';

const Reports: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const stats = [
    {
      title: 'Total Revenue',
      value: '$324,580',
      trend: 12.5,
      icon: <CurrencyDollarIcon className="w-6 h-6" />,
      color: 'green' as const
    },
    {
      title: 'New Leads',
      value: '142',
      trend: 8.2,
      icon: <UsersIcon className="w-6 h-6" />,
      color: 'blue' as const
    },
    {
      title: 'Conversion Rate',
      value: '18.4%',
      trend: -2.1,
      icon: <FunnelIcon className="w-6 h-6" />,
      color: 'purple' as const
    },
    {
      title: 'Avg. Deal Size',
      value: '$8,420',
      trend: 15.3,
      icon: <ArrowTrendingUpIcon className="w-6 h-6" />,
      color: 'orange' as const
    }
  ];

  const reports = [
    {
      title: 'Sales Performance',
      description: 'Track your sales team performance and revenue trends',
      icon: <ChartBarIcon className="w-8 h-8" />,
      lastUpdated: '2 hours ago',
      type: 'Dashboard'
    },
    {
      title: 'Lead Generation',
      description: 'Analyze lead sources and conversion funnel',
      icon: <UsersIcon className="w-8 h-8" />,
      lastUpdated: '1 hour ago',
      type: 'Report'
    },
    {
      title: 'Pipeline Analysis',
      description: 'Deep dive into your sales pipeline health',
      icon: <FunnelIcon className="w-8 h-8" />,
      lastUpdated: '30 minutes ago',
      type: 'Analytics'
    },
    {
      title: 'Revenue Forecast',
      description: 'Predict future revenue based on current pipeline',
      icon: <ArrowTrendingUpIcon className="w-8 h-8" />,
      lastUpdated: '4 hours ago',
      type: 'Forecast'
    },
    {
      title: 'Activity Summary',
      description: 'Overview of team activities and engagement',
      icon: <CalendarIcon className="w-8 h-8" />,
      lastUpdated: '1 day ago',
      type: 'Summary'
    },
    {
      title: 'Customer Insights',
      description: 'Understand your customer behavior and preferences',
      icon: <DocumentChartBarIcon className="w-8 h-8" />,
      lastUpdated: '6 hours ago',
      type: 'Insights'
    }
  ];

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    values: [45000, 52000, 48000, 61000, 55000, 67000]
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Dashboard':
        return 'bg-blue-100 text-blue-800';
      case 'Report':
        return 'bg-green-100 text-green-800';
      case 'Analytics':
        return 'bg-purple-100 text-purple-800';
      case 'Forecast':
        return 'bg-orange-100 text-orange-800';
      case 'Summary':
        return 'bg-indigo-100 text-indigo-800';
      case 'Insights':
        return 'bg-pink-100 text-pink-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <>
      <Helmet>
        <title>Reports - CRMOnce</title>
        <meta name="description" content="Analyze your business performance with comprehensive CRMOnce reports and analytics." />
      </Helmet>

      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
                <p className="text-gray-600 mt-1">Get insights into your business performance</p>
              </div>
              <div className="flex gap-3">
                <select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="quarter">This Quarter</option>
                  <option value="year">This Year</option>
                </select>
                <Button variant="primary" icon={<DocumentChartBarIcon className="w-5 h-5" />}>
                  Create Report
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Stats Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            {stats.map((stat, index) => (
              <StatCard
                key={index}
                title={stat.title}
                value={stat.value}
                trend={stat.trend}
                trendLabel="vs last period"
                icon={stat.icon}
                color={stat.color}
              />
            ))}
          </motion.div>

          {/* Revenue Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <Card>
              <CardBody className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Revenue Trend</h3>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">Export</Button>
                    <Button variant="ghost" size="sm">Share</Button>
                  </div>
                </div>
                
                {/* Simple Chart Visualization */}
                <div className="h-64 flex items-end justify-between space-x-2">
                  {chartData.labels.map((label, index) => (
                    <div key={label} className="flex-1 flex flex-col items-center">
                      <div
                        className="w-full bg-gradient-to-t from-primary-500 to-primary-400 rounded-t-lg transition-all duration-500 hover:from-primary-600 hover:to-primary-500"
                        style={{
                          height: `${(chartData.values[index] / Math.max(...chartData.values)) * 200}px`
                        }}
                      ></div>
                      <div className="mt-2 text-sm text-gray-600">{label}</div>
                      <div className="text-xs text-gray-500">
                        ${(chartData.values[index] / 1000).toFixed(0)}k
                      </div>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          </motion.div>

          {/* Reports Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Reports</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reports.map((report, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                >
                  <Card className="hover:shadow-lg transition-all duration-300 group">
                    <CardBody className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                          {report.icon}
                        </div>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(report.type)}`}>
                          {report.type}
                        </span>
                      </div>
                      
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{report.title}</h3>
                      <p className="text-gray-600 mb-4 text-sm">{report.description}</p>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">
                          Updated {report.lastUpdated}
                        </span>
                        <Button variant="ghost" size="sm" icon={<EyeIcon className="w-4 h-4" />}>
                          View
                        </Button>
                      </div>
                    </CardBody>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card>
              <CardBody className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Button variant="ghost" className="justify-start" icon={<ChartBarIcon className="w-5 h-5" />}>
                    Generate Custom Report
                  </Button>
                  <Button variant="ghost" className="justify-start" icon={<DocumentChartBarIcon className="w-5 h-5" />}>
                    Export Data
                  </Button>
                  <Button variant="ghost" className="justify-start" icon={<CalendarIcon className="w-5 h-5" />}>
                    Schedule Report
                  </Button>
                  <Button variant="ghost" className="justify-start" icon={<UsersIcon className="w-5 h-5" />}>
                    Team Performance
                  </Button>
                </div>
              </CardBody>
            </Card>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Reports;
