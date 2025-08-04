import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';

const plans = [
  {
    name: 'Starter',
    price: '$29',
    period: 'mo',
    annual: '$290/yr',
    features: [
      'Up to 5 users',
      'Basic CRM features',
      'Email support',
      'Standard analytics'
    ],
    cta: 'Get Started'
  },
  {
    name: 'Professional',
    price: '$79',
    period: 'mo',
    annual: '$790/yr',
    features: [
      'Up to 25 users',
      'Advanced CRM features',
      'Priority support',
      'Advanced analytics',
      'Dynamics 365 integration'
    ],
    cta: 'Start Free Trial',
    highlight: true
  },
  {
    name: 'Enterprise',
    price: 'Contact Us',
    period: '',
    annual: '',
    features: [
      'Unlimited users',
      'All CRM features',
      'Dedicated account manager',
      'Custom integrations',
      'Premium support'
    ],
    cta: 'Contact Sales'
  }
];

const featureTable = [
  { feature: 'Users', starter: 'Up to 5', professional: 'Up to 25', enterprise: 'Unlimited' },
  { feature: 'CRM Features', starter: 'Basic', professional: 'Advanced', enterprise: 'All' },
  { feature: 'Analytics', starter: 'Standard', professional: 'Advanced', enterprise: 'Enterprise' },
  { feature: 'Support', starter: 'Email', professional: 'Priority', enterprise: 'Premium' },
  { feature: 'Dynamics 365 Integration', starter: '—', professional: '✔', enterprise: '✔' },
  { feature: 'Custom Integrations', starter: '—', professional: '—', enterprise: '✔' },
  { feature: 'Account Manager', starter: '—', professional: '—', enterprise: '✔' },
];

const Pricing: React.FC = () => (
  <>
    <Helmet>
      <title>Pricing - CRMOnce</title>
      <meta name="description" content="Simple, transparent pricing for CRMOnce." />
    </Helmet>
    <section className="py-20 bg-white border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center mb-12">Pricing Plans</h1>
        <div className="grid gap-8 md:grid-cols-3">
          {plans.map((plan, idx) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`rounded-xl shadow-lg p-8 flex flex-col items-center text-center border-2 ${plan.name === 'Professional' ? 'border-primary-600 bg-primary-50' : 'border-gray-100 bg-gray-50'}`}
            >
              <h2 className="text-2xl font-semibold mb-2">{plan.name}</h2>
              <div className="text-4xl font-bold mb-2">{plan.price}<span className="text-lg font-normal">{plan.period && `/${plan.period}`}</span></div>
              <ul className="mb-6 text-gray-700 text-left w-full max-w-xs mx-auto">
                {plan.features.map(f => (
                  <li key={f} className="flex items-center mb-2">
                    <span className="w-2 h-2 rounded-full bg-primary-600 mr-2"></span>{f}
                  </li>
                ))}
              </ul>
              <button className={`btn-primary w-full ${plan.name === 'Professional' ? 'bg-primary-700 hover:bg-primary-800' : ''}`}>{plan.cta}</button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
    <section className="py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-center mb-6">Compare Features</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-lg bg-white">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">Feature</th>
                <th className="px-4 py-2 text-center">Starter</th>
                <th className="px-4 py-2 text-center">Professional</th>
                <th className="px-4 py-2 text-center">Enterprise</th>
              </tr>
            </thead>
            <tbody>
              {featureTable.map(row => (
                <tr key={row.feature}>
                  <td className="border-t px-4 py-2 font-medium text-gray-700">{row.feature}</td>
                  <td className="border-t px-4 py-2 text-center">{row.starter}</td>
                  <td className="border-t px-4 py-2 text-center font-bold text-primary-700 bg-primary-50">{row.professional}</td>
                  <td className="border-t px-4 py-2 text-center">{row.enterprise}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="text-center mt-4 text-sm text-gray-500">
          <span>Annual billing saves 2 months. Add-ons available for extra users, storage, and integrations.</span>
        </div>
      </div>
    </section>
  </>
);

export default Pricing;
