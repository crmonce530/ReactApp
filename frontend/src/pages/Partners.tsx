import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';

const partners = [
  {
    logo: '/logo.png',
    name: 'Microsoft',
    description: 'Official Dynamics 365 ISV Partner.'
  },
  {
    logo: '/logo.png',
    name: 'Azure Cloud',
    description: 'Seamless cloud hosting and integration.'
  },
  {
    logo: '/logo.png',
    name: 'Zapier',
    description: 'Automate workflows with 5,000+ apps.'
  },
  {
    logo: '/logo.png',
    name: 'Twilio',
    description: 'Integrated SMS and voice communications.'
  },
  {
    logo: '/logo.png',
    name: 'Power BI',
    description: 'Advanced analytics and reporting.'
  },
  {
    logo: '/logo.png',
    name: 'DocuSign',
    description: 'E-signature and document automation.'
  },
  {
    logo: '/logo.png',
    name: 'Slack',
    description: 'Team collaboration and messaging.'
  },
  {
    logo: '/logo.png',
    name: 'Mailchimp',
    description: 'Email marketing automation.'
  },
  {
    logo: '/logo.png',
    name: 'Google Workspace',
    description: 'Productivity and collaboration tools.'
  },
  {
    logo: '/logo.png',
    name: 'Stripe',
    description: 'Online payments and billing.'
  }
];

const Partners: React.FC = () => (
  <>
    <Helmet>
      <title>Partners - CRMOnce</title>
      <meta name="description" content="Our trusted technology and solution partners." />
    </Helmet>
    <section className="py-20 bg-white border-b border-gray-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center mb-12">Our Partners</h1>
        <div className="grid gap-8 md:grid-cols-3">
          {partners.map((p, idx) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ scale: 1.05, boxShadow: '0 8px 32px rgba(0,0,0,0.18)' }}
              whileTap={{ scale: 0.98 }}
              className="bg-gray-50 rounded-xl shadow-lg p-8 flex flex-col items-center text-center transition-all duration-200 cursor-pointer"
            >
              {/* To use a real logo, upload it to public/partners/ and set p.logo to '/partners/your-logo.png' */}
              <motion.img
                src={p.logo}
                alt={p.name + ' logo'}
                className="w-16 h-16 mb-4 object-contain"
                whileHover={{ rotate: 8, scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 300 }}
              />
              <h2 className="text-xl font-semibold mb-2">{p.name}</h2>
              <div className="text-sm text-gray-600">{p.description}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </>
);

export default Partners;