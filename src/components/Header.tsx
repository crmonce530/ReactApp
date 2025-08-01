import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Phone, 
  Mail, 
  MapPin, 
  ChevronDown, 
  Menu, 
  X,
  ChevronRight,
  User,
  LogOut
} from 'lucide-react';
import CRMONCELogo from './CRMONCELogo';

interface UserData {
  fullName: string;
  email: string;
  id: string;
}

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Check for logged in user on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (storedUser && token) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    }

    // Listen for login events
    const handleLogin = () => {
      const storedUser = localStorage.getItem('user');
      const token = localStorage.getItem('token');
      
      if (storedUser && token) {
        try {
          const userData = JSON.parse(storedUser);
          setUser(userData);
        } catch (error) {
          console.error('Error parsing user data:', error);
        }
      }
    };

    // Listen for logout events
    const handleLogoutEvent = () => {
      setUser(null);
      setShowUserMenu(false);
    };

    // Add event listeners
    window.addEventListener('userLogin', handleLogin);
    window.addEventListener('userLogout', handleLogoutEvent);

    // Cleanup event listeners
    return () => {
      window.removeEventListener('userLogin', handleLogin);
      window.removeEventListener('userLogout', handleLogoutEvent);
    };
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    setShowUserMenu(false);
    
    // Dispatch logout event
    window.dispatchEvent(new Event('userLogout'));
    
    navigate('/');
  };

  // Throttled scroll handler to prevent glitches
  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    
    // Only update if scroll difference is significant (prevents micro-movements)
    if (Math.abs(currentScrollY - lastScrollY) < 10) return;
    
    // Show header when scrolling up, hide when scrolling down
    if (currentScrollY > lastScrollY && currentScrollY > 150) {
      // Scrolling down - hide header
      setIsHeaderVisible(false);
    } else if (currentScrollY < lastScrollY || currentScrollY < 100) {
      // Scrolling up or near top - show header
      setIsHeaderVisible(true);
    }
    
    // Update scroll state for background
    setIsScrolled(currentScrollY > 50);
    setLastScrollY(currentScrollY);
  }, [lastScrollY]);

  useEffect(() => {
    let ticking = false;

    const throttledScrollHandler = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScrollHandler, { passive: true });
    return () => window.removeEventListener('scroll', throttledScrollHandler);
  }, [handleScroll]);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { 
      name: 'Services', 
      path: '/services',
      submenu: [
        { name: 'Dynamics 365 Implementation', path: '/services', icon: '' },
        { name: 'Power Platform Development', path: '/services', icon: '⚡' },
        { name: 'Custom Development', path: '/services', icon: '' },
        { name: 'Consulting & Training', path: '/services', icon: '🎓' },
      ]
    },
    { name: 'Features', path: '/features' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'About', path: '/about' },
    { name: 'Support', path: '/support' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <AnimatePresence mode="wait">
      {isHeaderVisible && (
        <motion.header
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          exit={{ y: -100 }}
          transition={{ 
            duration: 0.4, 
            ease: [0.4, 0.0, 0.2, 1] // Custom easing for smoother animation
          }}
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            isScrolled 
              ? 'bg-white/95 backdrop-blur-xl shadow-lg border-b border-primary-200/50' 
              : 'bg-transparent'
          }`}
        >
          {/* Top Bar */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.3 }}
            className="bg-gradient-to-r from-primary-100 to-accent-100 text-primary-700 py-2"
          >
            <div className="container-custom">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-accent-600" />
                    <span>+91 80965 56344</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-accent-600" />
                    <span>info@crmonce.com</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-accent-600" />
                  <span>Global Services</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Main Navigation */}
          <motion.nav 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className="py-4"
          >
            <div className="container-custom">
              <div className="flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center">
                  <CRMONCELogo size="md" variant="full" /> {/* Changed from size="sm" to size="md" */}
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden lg:flex items-center space-x-8">
                  {navItems.map((item) => (
                    <div key={item.name} className="relative group">
                      <Link
                        to={item.path}
                        className={`nav-link flex items-center space-x-1 ${
                          isActive(item.path) 
                            ? 'text-accent-600 font-semibold' 
                            : 'text-gray-700 hover:text-accent-600'
                        } transition-colors duration-200`}
                      >
                        <span>{item.name}</span>
                        {item.submenu && <ChevronDown className="w-4 h-4" />}
                      </Link>
                      
                      {/* Submenu */}
                      {item.submenu && (
                        <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top">
                          <div className="p-4 space-y-2">
                            {item.submenu.map((subItem) => (
                              <Link
                                key={subItem.name}
                                to={subItem.path}
                                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                              >
                                <span className="text-lg">{subItem.icon}</span>
                                <span className="text-gray-700 hover:text-accent-600 transition-colors duration-200">
                                  {subItem.name}
                                </span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* CTA Button - Show user info if logged in, otherwise show login/register */}
                <div className="hidden lg:flex items-center space-x-8">
                  {user ? (
                    // User is logged in - show user menu
                    <div className="relative">
                      <button
                        onClick={() => setShowUserMenu(!showUserMenu)}
                        className="flex items-center space-x-2 text-gray-700 hover:text-accent-600 transition-colors duration-200"
                      >
                        <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-medium">{user.fullName}</span>
                        <ChevronDown className="w-4 h-4" />
                      </button>
                      
                      {/* User Dropdown Menu */}
                      <AnimatePresence>
                        {showUserMenu && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100"
                          >
                            <div className="p-4">
                              <div className="border-b border-gray-100 pb-3 mb-3">
                                <p className="font-semibold text-gray-900">{user.fullName}</p>
                                <p className="text-sm text-gray-600">{user.email}</p>
                              </div>
                              <div className="space-y-2">
                                <Link
                                  to="/dashboard"
                                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-gray-700"
                                  onClick={() => setShowUserMenu(false)}
                                >
                                  <User className="w-4 h-4" />
                                  <span>Dashboard</span>
                                </Link>
                                <button
                                  onClick={handleLogout}
                                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-gray-700 w-full text-left"
                                >
                                  <LogOut className="w-4 h-4" />
                                  <span>Logout</span>
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    // User is not logged in - show login/register buttons
                    <>
                      <Link
                        to="/login"
                        className="text-gray-700 hover:text-accent-600 transition-colors duration-200"
                      >
                        Login
                      </Link>
                      <Link
                        to="/register"
                        className="bg-gradient-to-r from-accent-500 to-accent-600 text-white px-6 py-2 rounded-lg hover:from-accent-600 hover:to-accent-700 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
                      >
                        Get Started
                      </Link>
                    </>
                  )}
                </div>

                {/* Mobile Menu Button */}
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>
          </motion.nav>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="lg:hidden bg-white border-t border-gray-200"
              >
                <div className="container-custom py-4 space-y-4">
                  {navItems.map((item) => (
                    <div key={item.name}>
                      <Link
                        to={item.path}
                        className={`block py-2 ${
                          isActive(item.path) 
                            ? 'text-accent-600 font-semibold' 
                            : 'text-gray-700 hover:text-accent-600'
                        } transition-colors duration-200`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                      
                      {/* Mobile Submenu */}
                      {item.submenu && (
                        <div className="ml-4 mt-2 space-y-2">
                          {item.submenu.map((subItem) => (
                            <Link
                              key={subItem.name}
                              to={subItem.path}
                              className="flex items-center space-x-3 py-2 text-gray-600 hover:text-accent-600 transition-colors duration-200"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              <span className="text-lg">{subItem.icon}</span>
                              <span>{subItem.name}</span>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                  
                  <div className="pt-4 border-t border-gray-200 space-y-2">
                    {user ? (
                      // Mobile user menu
                      <>
                        <div className="py-2 border-b border-gray-100">
                          <p className="font-semibold text-gray-900">{user.fullName}</p>
                          <p className="text-sm text-gray-600">{user.email}</p>
                        </div>
                        <Link
                          to="/dashboard"
                          className="block py-2 text-gray-700 hover:text-accent-600 transition-colors duration-200"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          Dashboard
                        </Link>
                        <button
                          onClick={() => {
                            handleLogout();
                            setIsMobileMenuOpen(false);
                          }}
                          className="block w-full text-left py-2 text-gray-700 hover:text-accent-600 transition-colors duration-200"
                        >
                          Logout
                        </button>
                      </>
                    ) : (
                      // Mobile login/register buttons
                      <>
                        <Link
                          to="/login"
                          className="block py-2 text-gray-700 hover:text-accent-600 transition-colors duration-200"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          Login
                        </Link>
                        <Link
                          to="/register"
                          className="block bg-gradient-to-r from-accent-500 to-accent-600 text-white px-6 py-3 rounded-lg text-center hover:from-accent-600 hover:to-accent-700 transition-all duration-300"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          Get Started
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.header>
      )}
    </AnimatePresence>
  );
};

export default Header;