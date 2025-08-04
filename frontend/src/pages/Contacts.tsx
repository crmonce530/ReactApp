import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { 
  MagnifyingGlassIcon,
  PlusIcon,
  UserPlusIcon,
  EnvelopeIcon,
  PhoneIcon,
  BuildingOfficeIcon,
  TagIcon,
  FunnelIcon,
  EllipsisVerticalIcon
} from '@heroicons/react/24/outline';
import { Button, Card, CardBody, Input } from '../components/ui';

interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: string;
  position: string;
  status: 'lead' | 'customer' | 'prospect';
  lastContact: string;
  avatar?: string;
}

const Contacts: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const contacts: Contact[] = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@techcorp.com',
      phone: '+1 (555) 123-4567',
      company: 'TechCorp Inc.',
      position: 'CEO',
      status: 'customer',
      lastContact: '2024-01-15'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah.j@startupxyz.com',
      phone: '+1 (555) 234-5678',
      company: 'StartupXYZ',
      position: 'Sales Director',
      status: 'lead',
      lastContact: '2024-01-14'
    },
    {
      id: 3,
      name: 'Michael Chen',
      email: 'mchen@globalsolutions.net',
      phone: '+1 (555) 345-6789',
      company: 'Global Solutions',
      position: 'Marketing Manager',
      status: 'prospect',
      lastContact: '2024-01-13'
    },
    {
      id: 4,
      name: 'Emily Rodriguez',
      email: 'emily.r@innovate.io',
      phone: '+1 (555) 456-7890',
      company: 'Innovate.io',
      position: 'Product Manager',
      status: 'customer',
      lastContact: '2024-01-12'
    },
    {
      id: 5,
      name: 'David Wilson',
      email: 'dwilson@enterprisetech.com',
      phone: '+1 (555) 567-8901',
      company: 'Enterprise Tech',
      position: 'CTO',
      status: 'lead',
      lastContact: '2024-01-11'
    }
  ];

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || contact.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'customer':
        return 'bg-green-100 text-green-800';
      case 'lead':
        return 'bg-yellow-100 text-yellow-800';
      case 'prospect':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <>
      <Helmet>
        <title>Contacts - CRMOnce</title>
        <meta name="description" content="Manage your contacts and build stronger relationships with CRMOnce." />
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
                <h1 className="text-3xl font-bold text-gray-900">Contacts</h1>
                <p className="text-gray-600 mt-1">Manage your contacts and build stronger relationships</p>
              </div>
              <Button 
                variant="primary" 
                icon={<UserPlusIcon className="w-5 h-5" />}
              >
                Add Contact
              </Button>
            </div>
          </motion.div>

          {/* Filters and Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-6"
          >
            <Card>
              <CardBody className="p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <Input
                        type="text"
                        placeholder="Search contacts..."
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
                      <option value="customer">Customers</option>
                      <option value="lead">Leads</option>
                      <option value="prospect">Prospects</option>
                    </select>
                    <Button variant="ghost" icon={<FunnelIcon className="w-5 h-5" />}>
                      Filter
                    </Button>
                  </div>
                </div>
              </CardBody>
            </Card>
          </motion.div>

          {/* Contacts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredContacts.map((contact, index) => (
              <motion.div
                key={contact.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-all duration-300">
                  <CardBody className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white font-semibold">
                          {getInitials(contact.name)}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{contact.name}</h3>
                          <p className="text-sm text-gray-600">{contact.position}</p>
                        </div>
                      </div>
                      <button className="text-gray-400 hover:text-gray-600">
                        <EllipsisVerticalIcon className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div className="flex items-center space-x-2">
                        <BuildingOfficeIcon className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{contact.company}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <EnvelopeIcon className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{contact.email}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <PhoneIcon className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{contact.phone}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(contact.status)}`}>
                        <TagIcon className="w-3 h-3 mr-1" />
                        {contact.status.charAt(0).toUpperCase() + contact.status.slice(1)}
                      </span>
                      <span className="text-xs text-gray-500">
                        Last: {new Date(contact.lastContact).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="mt-4 flex space-x-2">
                      <Button variant="ghost" size="sm" className="flex-1">
                        <EnvelopeIcon className="w-4 h-4 mr-1" />
                        Email
                      </Button>
                      <Button variant="ghost" size="sm" className="flex-1">
                        <PhoneIcon className="w-4 h-4 mr-1" />
                        Call
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Empty State */}
          {filteredContacts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-center py-12"
            >
              <UserPlusIcon className="w-24 h-24 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No contacts found</h3>
              <p className="text-gray-600 mb-6">
                {searchTerm || statusFilter !== 'all' 
                  ? 'Try adjusting your search or filters'
                  : 'Get started by adding your first contact'
                }
              </p>
              {!searchTerm && statusFilter === 'all' && (
                <Button variant="primary" icon={<PlusIcon className="w-5 h-5" />}>
                  Add Your First Contact
                </Button>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
};

export default Contacts;
