import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';

const caseStudies = [
  {
    logo: '/logo.png',
    customer: 'TechCorp Inc.',
    quote: 'CRMOnce transformed our sales process and helped us close deals 30% faster.',
    challenge: 'Disorganized sales pipeline and poor lead tracking.',
    solution: 'Implemented CRMOnce for unified pipeline management and automated lead nurturing.',
    outcome: 'Increased sales velocity, improved team collaboration, and higher win rates.'
  },
  {
    logo: '/logo.png',
    customer: 'Global Solutions',
    quote: 'The integration with Dynamics 365 was seamless and our support team is now more productive than ever.',
    challenge: 'Fragmented customer data and slow support response times.',
    solution: 'Centralized all customer interactions in CRMOnce and automated ticket routing.',
    outcome: 'Faster response times, higher customer satisfaction, and better reporting.'
  },
  {
    logo: '/logo.png',
    customer: 'StartupXYZ',
    quote: 'CRMOnce gave us the insights we needed to scale our business quickly.',
    challenge: 'Lack of visibility into sales metrics and customer engagement.',
    solution: 'Deployed CRMOnce dashboards and analytics for real-time insights.',
    outcome: 'Data-driven decisions, improved forecasting, and rapid growth.'
  },
  {
    logo: '/logo.png',
    customer: 'FinServe Bank',
    quote: 'Compliance and reporting are now a breeze. CRMOnce is a game changer for financial services.',
    challenge: 'Complex compliance requirements and manual reporting.',
    solution: 'Automated compliance workflows and real-time reporting with CRMOnce.',
    outcome: 'Reduced audit times, improved accuracy, and peace of mind.'
  },
  {
    logo: '/logo.png',
    customer: 'EduSmart Academy',
    quote: 'Our admissions and student engagement are at an all-time high thanks to CRMOnce.',
    challenge: 'Manual admissions process and low student engagement.',
    solution: 'Digitized admissions and implemented engagement tracking in CRMOnce.',
    outcome: 'Faster admissions, higher engagement, and better retention.'
  },
  {
    logo: '/logo.png',
    customer: 'HealthFirst Clinics',
    quote: 'Patient follow-ups and care coordination have never been easier.',
    challenge: 'Missed follow-ups and fragmented patient data.',
    solution: 'Centralized patient records and automated reminders in CRMOnce.',
    outcome: 'Improved patient outcomes and higher satisfaction scores.'
  }
];

const CaseStudies: React.FC = () => (
  <>
    <Helmet>
      <title>Case Studies - CRMOnce</title>
      <meta name="description" content="See how real customers succeed with CRMOnce." />
    </Helmet>
    <section className="py-20 bg-white border-b border-gray-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center mb-12">Customer Success Stories</h1>
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          {caseStudies.map((cs, idx) => (
            <motion.div
              key={cs.customer}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ scale: 1.05, boxShadow: '0 8px 32px rgba(0,0,0,0.18)' }}
              whileTap={{ scale: 0.98 }}
              className="bg-gray-50 rounded-xl shadow-lg p-8 flex flex-col items-center text-center transition-all duration-200 cursor-pointer"
            >
              {/* To use a real logo, upload it to public/case-studies/ and set cs.logo to '/case-studies/your-logo.png' */}
              <motion.img
                src={cs.logo}
                alt={cs.customer + ' logo'}
                className="w-16 h-16 mb-4 object-contain"
                whileHover={{ rotate: 8, scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 300 }}
              />
              <h2 className="text-xl font-semibold mb-2">{cs.customer}</h2>
              <blockquote className="italic text-primary-700 mb-4">“{cs.quote}”</blockquote>
              <div className="text-sm text-gray-600 mb-2"><strong>Challenge:</strong> {cs.challenge}</div>
              <div className="text-sm text-gray-600 mb-2"><strong>Solution:</strong> {cs.solution}</div>
              <div className="text-sm text-gray-600"><strong>Outcome:</strong> {cs.outcome}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </>
);

export default CaseStudies;