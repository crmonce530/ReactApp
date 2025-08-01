import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Linkedin, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import CRMONCELogo from './CRMONCELogo';
import dunsLogo from '../assets/CRMONCE-OPC-PRIVATE-LIMITED-DUNS.jpg';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { name: 'Dynamics 365', path: '/dynamics-365' },
      { name: 'Cloud Services', path: '/cloud-services' },
      { name: 'Power Platform', path: '/power-platform' },
      { name: 'Consulting', path: '/consulting' },
    ],
    company: [
      { name: 'About Us', path: '/about' },
      { name: 'Contact Us', path: '/contact' },
      { name: 'Blog', path: '/blog' },
      { name: 'Support', path: '/support' },
    ],
    support: [
      { name: 'Help Center', path: '/help' },
      { name: 'Contact Us', path: '/contact' },
      { name: 'Documentation', path: '/docs' },
      { name: 'Training', path: '/training' },
    ],
    legal: [
      { name: 'Privacy Policy', path: '/privacy' },
      
      { name: 'Terms & Conditions', path: '/terms' },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com/crmonce', label: 'Facebook' },
    { icon: Linkedin, href: 'https://in.linkedin.com/company/crmonce-opc-pvt-ltd?trk=public_profile_topcard-current-company', label: 'LinkedIn' },
    { icon: Youtube, href: 'https://youtube.com/@crmonce', label: 'YouTube' }
  ];

  return (
    <footer className="bg-[#dcfce7] text-gray-900">
      <div className="container-custom">
        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <CRMONCELogo size="md" variant="full" className="text-white" />
            </div>
            <p className="text-gray-700 mb-6 max-w-md">
              CRMONCE is a professional services firm committed to delivering business solutions 
              to small and medium sized organizations through Microsoft Dynamics 365 and cloud services.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-700">
                <Mail size={16} />
                <span>info@crmonce.com</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-700">
                <Phone size={16} />
                <span>+91 80965 56344</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-700">
                <MapPin size={16} />
                <span>8-112, Gamallapalem, Kodurupadu<br />Nellore, AP-524314, India</span>
              </div>
            </div>

            {/* Single DUNS Logo */}
            <div className="mt-6">
              <img 
                src={dunsLogo} 
                alt="CRMONCE OPC Private Limited DUNS" 
                className="h-16 w-auto opacity-80 hover:opacity-100 transition-opacity duration-200"
              />
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900">Products</h3>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-900 hover:text-gray-900 transition-colors duration-200"               >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-700 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-700 hover:text-gray-900 transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-300 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-gray-600 text-sm">
              © {currentYear} CRMONCE. All rights reserved.
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>

            {/* Legal Links */}
            <div className="flex items-center space-x-6 text-sm">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 