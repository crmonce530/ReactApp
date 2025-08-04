import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { 
  MagnifyingGlassIcon,
  PlusIcon,
  FunnelIcon,
  StarIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  UserIcon,
  ArrowTrendingUpIcon
} from '@heroicons/react/24/outline';
import { Button, Card, CardBody, Input, StatCard } from '../components/ui';

interface Lead {
  id: number;
  name: string;
  email: string;
  company: string;
  source: string;
  status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'closed';
  value: number;
  probability: number;
  assignee: string;
  createdAt: string;
  lastActivity: string;
}

const Leads: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('recent');

  const leads: Lead[] = [
    {
      id: 1,
      name: 'Alice Cooper',
      email: 'alice@newtech.com',
      company: 'NewTech Solutions',
      source: 'Website',
      status: 'qualified',
      value: 15000,
      probability: 75,
      assignee: 'John Smith',
      createdAt: '2024-01-10',
      lastActivity: '2024-01-15'
    },
    {
      id: 2,
      name: 'Bob Johnson',
      email: 'bob@innovate.co',
      company: 'Innovate Co.',
      source: 'Referral',
      status: 'proposal',
      value: 25000,
      probability: 60,
      assignee: 'Sarah Wilson',
      createdAt: '2024-01-08',
      lastActivity: '2024-01-14'
    },
    {
      id: 3,
      name: 'Carol Davis',
      email: 'carol@digitalflow.io',
      company: 'Digital Flow',
      source: 'LinkedIn',
      status: 'new',
      value: 8000,
      probability: 20,
      assignee: 'Mike Brown',
      createdAt: '2024-01-12',
      lastActivity: '2024-01-12'
    },
    {
      id: 4,
      name: 'David Miller',
      email: 'david@smartsys.com',
      company: 'Smart Systems',
      source: 'Cold Email',
      status: 'contacted',
      value: 18000,
      probability: 40,
      assignee: 'John Smith',
      createdAt: '2024-01-09',
      lastActivity: '2024-01-13'
    },
    {
      id: 5,
      name: 'Eva Thompson',
      email: 'eva@futuretech.net',
      company: 'Future Tech',
      source: 'Trade Show',
      status: 'closed',
      value: 30000,
      probability: 100,
      assignee: 'Sarah Wilson',
      createdAt: '2024-01-05',
      lastActivity: '2024-01-11'
    }
  ];

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const sortedLeads = [...filteredLeads].sort((a, b) => {
    switch (sortBy) {
      case 'value':
        return b.value - a.value;
      case 'probability':
        return b.probability - a.probability;
      case 'recent':
      default:
        return new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime();
    }
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800';
      case 'contacted':
        return 'bg-yellow-100 text-yellow-800';
      case 'qualified':
        return 'bg-purple-100 text-purple-800';
      case 'proposal':
        return 'bg-orange-100 text-orange-800';
      case 'closed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getSourceColor = (source: string) => {
    switch (source) {
      case 'Website':
        return 'bg-blue-50 text-blue-600';
      case 'Referral':
        return 'bg-green-50 text-green-600';
      case 'LinkedIn':
        return 'bg-indigo-50 text-indigo-600';
      case 'Cold Email':
        return 'bg-gray-50 text-gray-600';
      case 'Trade Show':
        return 'bg-purple-50 text-purple-600';
      default:
        return 'bg-gray-50 text-gray-600';
    }
  };

  // Calculate stats
  const totalValue = leads.reduce((sum, lead) => sum + lead.value, 0);
  const averageProbability = leads.reduce((sum, lead) => sum + lead.probability, 0) / leads.length;
  const qualifiedLeads = leads.filter(lead => lead.status === 'qualified' || lead.status === 'proposal').length;
  const conversionRate = (leads.filter(lead => lead.status === 'closed').length / leads.length) * 100;

  return (
    <>
      <Helmet>
        <title>Leads - CRMOnce</title>
        <meta name="description" content="Manage and track your sales leads with CRMOnce lead management system." />
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
                <h1 className="text-3xl font-bold text-gray-900">Leads</h1>
                <p className="text-gray-600 mt-1">Track and nurture your sales opportunities</p>
              </div>
              <Button variant="primary" icon={<PlusIcon className="w-5 h-5" />}>
                Add Lead
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
              trend={12}
              trendLabel="vs last month"
            />
            <StatCard
              title="Qualified Leads"
              value={qualifiedLeads}
              icon={<StarIcon className="w-6 h-6" />}
              trend={8}
              trendLabel="vs last month"
            />
            <StatCard
              title="Avg. Probability"
              value={`${averageProbability.toFixed(1)}%`}
              icon={<ArrowTrendingUpIcon className="w-6 h-6" />}
              trend={5}
              trendLabel="vs last month"
            />
            <StatCard
              title="Conversion Rate"
              value={`${conversionRate.toFixed(1)}%`}
              icon={<UserIcon className="w-6 h-6" />}
              trend={-2}
              trendLabel="vs last month"
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
                        placeholder="Search leads..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    >
                      <option value="all">All Status</option>
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="qualified">Qualified</option>
                      <option value="proposal">Proposal</option>
                      <option value="closed">Closed</option>
                    </select>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    >
                      <option value="recent">Recent Activity</option>
                      <option value="value">Highest Value</option>
                      <option value="probability">Highest Probability</option>
                    </select>
                    <Button variant="ghost" icon={<FunnelIcon className="w-5 h-5" />}>
                      More Filters
                    </Button>
                  </div>
                </div>
              </CardBody>
            </Card>
          </motion.div>

          {/* Leads List */}
          <div className="space-y-4">
            {sortedLeads.map((lead, index) => (
              <motion.div
                key={lead.id}
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
                            <h3 className="text-lg font-semibold text-gray-900">{lead.name}</h3>
                            <p className="text-gray-600">{lead.email}</p>
                            <p className="text-sm text-gray-500">{lead.company}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-green-600">
                              ${lead.value.toLocaleString()}
                            </div>
                            <div className="text-sm text-gray-500">Pipeline Value</div>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-3">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(lead.status)}`}>
                            {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                          </span>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSourceColor(lead.source)}`}>
                            {lead.source}
                          </span>
                          <span className="text-sm text-gray-500">
                            {lead.probability}% probability
                          </span>
                          <span className="text-sm text-gray-500">
                            Assigned to: {lead.assignee}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <div className="text-right text-sm text-gray-500">
                          <div className="flex items-center">
                            <CalendarIcon className="w-4 h-4 mr-1" />
                            {new Date(lead.lastActivity).toLocaleDateString()}
                          </div>
                          <div>Last activity</div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                          <Button variant="primary" size="sm">
                            Follow Up
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
          {sortedLeads.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-center py-12"
            >
              <ArrowTrendingUpIcon className="w-24 h-24 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No leads found</h3>
              <p className="text-gray-600 mb-6">
                {searchTerm || statusFilter !== 'all' 
                  ? 'Try adjusting your search or filters'
                  : 'Start building your sales pipeline by adding your first lead'
                }
              </p>
              {!searchTerm && statusFilter === 'all' && (
                <Button variant="primary" icon={<PlusIcon className="w-5 h-5" />}>
                  Add Your First Lead
                </Button>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
};

export default Leads;
