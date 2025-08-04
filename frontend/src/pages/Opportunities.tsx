import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { 
  MagnifyingGlassIcon,
  PlusIcon,
  FunnelIcon,
  CurrencyDollarIcon,
  CalendarIcon,
  UserIcon,
  BuildingOfficeIcon,
  ChartBarIcon,
  ClockIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';
import { Button, Card, CardBody, Input, StatCard } from '../components/ui';

interface Opportunity {
  id: number;
  title: string;
  company: string;
  contact: string;
  value: number;
  stage: 'prospecting' | 'qualification' | 'proposal' | 'negotiation' | 'closed-won' | 'closed-lost';
  probability: number;
  expectedCloseDate: string;
  assignee: string;
  createdAt: string;
  lastActivity: string;
  description: string;
}

const Opportunities: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [stageFilter, setStageFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('value');

  const opportunities: Opportunity[] = [
    {
      id: 1,
      title: 'Enterprise CRM Implementation',
      company: 'TechCorp Inc.',
      contact: 'John Doe',
      value: 85000,
      stage: 'proposal',
      probability: 75,
      expectedCloseDate: '2024-02-15',
      assignee: 'Sarah Wilson',
      createdAt: '2024-01-05',
      lastActivity: '2024-01-15',
      description: 'Full CRM implementation for 500+ users with custom integrations'
    },
    {
      id: 2,
      title: 'Sales Automation Platform',
      company: 'StartupXYZ',
      contact: 'Alice Cooper',
      value: 45000,
      stage: 'negotiation',
      probability: 85,
      expectedCloseDate: '2024-01-30',
      assignee: 'Mike Brown',
      createdAt: '2024-01-02',
      lastActivity: '2024-01-14',
      description: 'Automated sales workflow solution with email marketing integration'
    },
    {
      id: 3,
      title: 'Customer Analytics Suite',
      company: 'Global Solutions',
      contact: 'Bob Johnson',
      value: 120000,
      stage: 'qualification',
      probability: 45,
      expectedCloseDate: '2024-03-01',
      assignee: 'Sarah Wilson',
      createdAt: '2024-01-08',
      lastActivity: '2024-01-13',
      description: 'Advanced analytics platform with AI-powered insights'
    },
    {
      id: 4,
      title: 'Mobile CRM Solution',
      company: 'Innovate Co.',
      contact: 'Carol Davis',
      value: 32000,
      stage: 'prospecting',
      probability: 25,
      expectedCloseDate: '2024-02-28',
      assignee: 'John Smith',
      createdAt: '2024-01-10',
      lastActivity: '2024-01-12',
      description: 'Mobile-first CRM solution for field sales teams'
    },
    {
      id: 5,
      title: 'Integration Services',
      company: 'Enterprise Tech',
      contact: 'David Miller',
      value: 18000,
      stage: 'closed-won',
      probability: 100,
      expectedCloseDate: '2024-01-20',
      assignee: 'Mike Brown',
      createdAt: '2023-12-15',
      lastActivity: '2024-01-11',
      description: 'Custom API integrations with existing systems'
    }
  ];

  const filteredOpportunities = opportunities.filter(opp => {
    const matchesSearch = opp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         opp.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         opp.contact.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStage = stageFilter === 'all' || opp.stage === stageFilter;
    return matchesSearch && matchesStage;
  });

  const sortedOpportunities = [...filteredOpportunities].sort((a, b) => {
    switch (sortBy) {
      case 'value':
        return b.value - a.value;
      case 'probability':
        return b.probability - a.probability;
      case 'close-date':
        return new Date(a.expectedCloseDate).getTime() - new Date(b.expectedCloseDate).getTime();
      case 'recent':
      default:
        return new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime();
    }
  });

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'prospecting':
        return 'bg-gray-100 text-gray-800';
      case 'qualification':
        return 'bg-blue-100 text-blue-800';
      case 'proposal':
        return 'bg-yellow-100 text-yellow-800';
      case 'negotiation':
        return 'bg-orange-100 text-orange-800';
      case 'closed-won':
        return 'bg-green-100 text-green-800';
      case 'closed-lost':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getProbabilityColor = (probability: number) => {
    if (probability >= 75) return 'text-green-600';
    if (probability >= 50) return 'text-yellow-600';
    if (probability >= 25) return 'text-orange-600';
    return 'text-red-600';
  };

  // Calculate stats
  const totalValue = opportunities.reduce((sum, opp) => sum + opp.value, 0);
  const weightedValue = opportunities.reduce((sum, opp) => sum + (opp.value * opp.probability / 100), 0);
  const avgDealSize = totalValue / opportunities.length;
  const avgProbability = opportunities.reduce((sum, opp) => sum + opp.probability, 0) / opportunities.length;

  return (
    <>
      <Helmet>
        <title>Opportunities - CRMOnce</title>
        <meta name="description" content="Track and manage your sales opportunities with CRMOnce opportunity management." />
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
                <h1 className="text-3xl font-bold text-gray-900">Opportunities</h1>
                <p className="text-gray-600 mt-1">Track and manage your sales pipeline</p>
              </div>
              <Button variant="primary" icon={<PlusIcon className="w-5 h-5" />}>
                New Opportunity
              </Button>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            <StatCard
              title="Total Pipeline Value"
              value={`$${totalValue.toLocaleString()}`}
              icon={<CurrencyDollarIcon className="w-6 h-6" />}
              trend={15}
              trendLabel="vs last month"
              color="green"
            />
            <StatCard
              title="Weighted Pipeline"
              value={`$${Math.round(weightedValue).toLocaleString()}`}
              icon={<ChartBarIcon className="w-6 h-6" />}
              trend={8}
              trendLabel="vs last month"
              color="blue"
            />
            <StatCard
              title="Avg Deal Size"
              value={`$${Math.round(avgDealSize).toLocaleString()}`}
              icon={<ArrowRightIcon className="w-6 h-6" />}
              trend={12}
              trendLabel="vs last month"
              color="purple"
            />
            <StatCard
              title="Avg Probability"
              value={`${avgProbability.toFixed(1)}%`}
              icon={<ChartBarIcon className="w-6 h-6" />}
              trend={-3}
              trendLabel="vs last month"
              color="orange"
            />
          </motion.div>

          {/* Filters and Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-6"
          >
            <Card>
              <CardBody className="p-6">
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <Input
                        type="text"
                        placeholder="Search opportunities..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <select
                      value={stageFilter}
                      onChange={(e) => setStageFilter(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    >
                      <option value="all">All Stages</option>
                      <option value="prospecting">Prospecting</option>
                      <option value="qualification">Qualification</option>
                      <option value="proposal">Proposal</option>
                      <option value="negotiation">Negotiation</option>
                      <option value="closed-won">Closed Won</option>
                      <option value="closed-lost">Closed Lost</option>
                    </select>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    >
                      <option value="value">Highest Value</option>
                      <option value="probability">Highest Probability</option>
                      <option value="close-date">Close Date</option>
                      <option value="recent">Recent Activity</option>
                    </select>
                    <Button variant="ghost" icon={<FunnelIcon className="w-5 h-5" />}>
                      More Filters
                    </Button>
                  </div>
                </div>
              </CardBody>
            </Card>
          </motion.div>

          {/* Opportunities List */}
          <div className="space-y-4">
            {sortedOpportunities.map((opportunity, index) => (
              <motion.div
                key={opportunity.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
              >
                <Card className="hover:shadow-lg transition-all duration-300">
                  <CardBody className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-1">
                              {opportunity.title}
                            </h3>
                            <p className="text-gray-600 text-sm mb-2">{opportunity.description}</p>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <div className="flex items-center">
                                <BuildingOfficeIcon className="w-4 h-4 mr-1" />
                                {opportunity.company}
                              </div>
                              <div className="flex items-center">
                                <UserIcon className="w-4 h-4 mr-1" />
                                {opportunity.contact}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-green-600">
                              ${opportunity.value.toLocaleString()}
                            </div>
                            <div className={`text-sm font-medium ${getProbabilityColor(opportunity.probability)}`}>
                              {opportunity.probability}% probability
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-3">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStageColor(opportunity.stage)}`}>
                            {opportunity.stage.split('-').map(word => 
                              word.charAt(0).toUpperCase() + word.slice(1)
                            ).join(' ')}
                          </span>
                          <span className="text-sm text-gray-500">
                            Assigned to: {opportunity.assignee}
                          </span>
                          <div className="flex items-center text-sm text-gray-500">
                            <ClockIcon className="w-4 h-4 mr-1" />
                            Expected: {new Date(opportunity.expectedCloseDate).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <div className="text-right text-sm text-gray-500">
                          <div className="flex items-center">
                            <CalendarIcon className="w-4 h-4 mr-1" />
                            {new Date(opportunity.lastActivity).toLocaleDateString()}
                          </div>
                          <div>Last activity</div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            Edit
                          </Button>
                          <Button variant="primary" size="sm">
                            Update Stage
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Empty State */}
          {sortedOpportunities.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-center py-12"
            >
              <ChartBarIcon className="w-24 h-24 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No opportunities found</h3>
              <p className="text-gray-600 mb-6">
                {searchTerm || stageFilter !== 'all' 
                  ? 'Try adjusting your search or filters'
                  : 'Start tracking your sales opportunities by creating your first one'
                }
              </p>
              {!searchTerm && stageFilter === 'all' && (
                <Button variant="primary" icon={<PlusIcon className="w-5 h-5" />}>
                  Create Your First Opportunity
                </Button>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
};

export default Opportunities;
