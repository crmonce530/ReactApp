import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { 
  EnvelopeIcon, 
  PhoneIcon, 
  MapPinIcon, 
  ClockIcon 
} from '@heroicons/react/24/outline';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const Contact: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Contact form submitted:', data);
    setSubmitSuccess(true);
    setIsSubmitting(false);
    reset();
    
    // Reset success message after 5 seconds
    setTimeout(() => setSubmitSuccess(false), 5000);
  };

  const contactInfo = [
    {
      icon: EnvelopeIcon,
      title: 'Email',
      content: 'contact@crmonce.com',
      link: 'mailto:contact@crmonce.com'
    },
    {
      icon: PhoneIcon,
      title: 'Phone',
      content: '+1 (555) 123-4567',
      link: 'tel:+15551234567'
    },
    {
      icon: MapPinIcon,
      title: 'Office',
      content: '123 Business Ave, Suite 100<br />New York, NY 10001',
      link: null
    },
    {
      icon: ClockIcon,
      title: 'Office Hours',
      content: 'Monday - Friday<br />9:00 AM - 6:00 PM EST',
      link: null
    }
  ];

  return (
    <>
      <Helmet>
        <title>Contact Us - CRMOnce</title>
        <meta name="description" content="Get in touch with the CRMOnce team. We're here to help with any questions about our CRM solution." />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary via-secondary to-accent text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl md:text-6xl font-bold mb-6"
              >
                Contact Us
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-100"
              >
                Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
              </motion.p>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-lg shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a message</h2>
              
              {submitSuccess && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md">
                  <p className="text-green-800">
                    Thank you for your message! We'll get back to you as soon as possible.
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      {...register('name', {
                        required: 'Name is required',
                        minLength: {
                          value: 2,
                          message: 'Name must be at least 2 characters'
                        }
                      })}
                      className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm ${
                        errors.name ? 'border-red-500' : ''
                      }`}
                      placeholder="Your name"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      {...register('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address'
                        }
                      })}
                      className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm ${
                        errors.email ? 'border-red-500' : ''
                      }`}
                      placeholder="your.email@example.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                    Subject
                  </label>
                  <input
                    id="subject"
                    type="text"
                    {...register('subject', {
                      required: 'Subject is required',
                      minLength: {
                        value: 5,
                        message: 'Subject must be at least 5 characters'
                      }
                    })}
                    className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm ${
                      errors.subject ? 'border-red-500' : ''
                    }`}
                    placeholder="What can we help you with?"
                  />
                  {errors.subject && (
                    <p className="mt-1 text-sm text-red-600">{errors.subject.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    {...register('message', {
                      required: 'Message is required',
                      minLength: {
                        value: 10,
                        message: 'Message must be at least 10 characters'
                      }
                    })}
                    className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm ${
                      errors.message ? 'border-red-500' : ''
                    }`}
                    placeholder="Tell us more about your inquiry..."
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
                  )}
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                  >
                    {isSubmitting ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                </div>
              </form>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in touch</h2>
                <p className="text-gray-600 mb-8">
                  We're here to help and answer any questions you might have. 
                  We look forward to hearing from you.
                </p>
              </div>

              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex items-start space-x-4"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
                        <info.icon className="w-5 h-5 text-white" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{info.title}</h3>
                      {info.link ? (
                        <a
                          href={info.link}
                          className="text-gray-600 hover:text-primary transition-colors duration-200"
                          dangerouslySetInnerHTML={{ __html: info.content }}
                        />
                      ) : (
                        <p
                          className="text-gray-600"
                          dangerouslySetInnerHTML={{ __html: info.content }}
                        />
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="bg-gradient-to-r from-primary to-secondary rounded-lg p-6 text-white">
                <h3 className="text-lg font-semibold mb-2">Need immediate assistance?</h3>
                <p className="text-gray-100 mb-4">
                  For urgent matters or technical support, please call our support line.
                </p>
                <a
                  href="tel:+15551234567"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-primary bg-white hover:bg-gray-50 transition-colors duration-200"
                >
                  <PhoneIcon className="w-4 h-4 mr-2" />
                  Call Support
                </a>
              </div>
            </motion.div>
          </div>

          {/* Help Center & Live Chat Links */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12 mb-8">
            <a href="https://www.crmonce.com/help-center" target="_blank" rel="noopener noreferrer" className="btn-secondary text-lg px-8 py-4 inline-block">Help Center</a>
            <a href="https://www.crmonce.com/live-chat" target="_blank" rel="noopener noreferrer" className="btn-accent text-lg px-8 py-4 inline-block">Live Chat</a>
          </div>
          {/* Map Visual */}
          <div className="flex justify-center mb-12">
            <div className="w-full max-w-2xl h-64 bg-gray-200 rounded-lg overflow-hidden shadow-lg">
              <iframe
                title="CRMOnce Office Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3023.858258232747!2d-74.0059416845937!3d40.71277597933016!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzTCsDQyJzQ2LjAiTiA3NMKwMDAnMjAuMCJX!5e0!3m2!1sen!2sus!4v1610000000000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                frameBorder="0"
                style={{ border: 0 }}
                allowFullScreen={false}
                aria-hidden="false"
                tabIndex={0}
              />
            </div>
          </div>
          {/* FAQ Section - now with expand/collapse */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-20"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Can't find what you're looking for? Check out our FAQ section for quick answers.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[{
                question: 'How do I get started with CRMOnce?',
                answer: 'Getting started is easy! Simply sign up for a free trial, and our team will guide you through the setup process. We offer comprehensive onboarding and training to ensure you\'re up and running quickly.'
              }, {
                question: 'What integrations are available?',
                answer: 'CRMOnce integrates with popular tools like Dynamics 365, Salesforce, HubSpot, and many more. We also offer a robust API for custom integrations to fit your specific needs.'
              }, {
                question: 'Is my data secure?',
                answer: 'Absolutely! We use enterprise-grade security measures including encryption, regular backups, and compliance with industry standards like SOC 2 and GDPR to protect your data.'
              }, {
                question: 'Do you offer training and support?',
                answer: 'Yes! We provide comprehensive training, documentation, and 24/7 customer support. Our team is always available to help you succeed with CRMOnce.'
              }].map((faq, idx) => (
                <FAQItem key={idx} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Contact; 

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 cursor-pointer" onClick={() => setOpen(o => !o)}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">{question}</h3>
        <span className="text-primary-600 text-2xl">{open ? '-' : '+'}</span>
      </div>
      {open && <p className="text-gray-600 transition-all duration-200">{answer}</p>}
    </div>
  );
} 