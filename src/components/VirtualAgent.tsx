import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  User, 
  Phone, 
  Mail, 
  Calendar,
  Clock,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Zap,
  Shield,
  Star,
  Upload,
  File,
  Globe,
  MapPin,
  Clock3,
  Users,
  Building2,
  Settings,
  BookOpen,
  Award,
  TrendingUp,
  Target,
  Rocket,
  Lightbulb,
  Code,
  Database,
  Cloud,
  Smartphone,
  Monitor,
  Workflow,
  BarChart3,
  Video,
  Headphones,
  LifeBuoy,
  Wrench,
  GraduationCap,
  Briefcase,
  DollarSign,
  CreditCard,
  FileText,
  Image,
  Download,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Plus,
  Minus
} from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type?: 'text' | 'quick-reply' | 'lead-capture' | 'file' | 'appointment' | 'language-select';
  quickReplies?: string[];
  files?: File[];
  appointmentData?: AppointmentData;
}

interface LeadData {
  name: string;
  email: string;
  company: string;
  phone: string;
  interest: string;
  budget: string;
  timeline: string;
  teamSize: string;
  requirements: string;
}

interface AppointmentData {
  date: string;
  time: string;
  timezone: string;
  type: string;
  notes: string;
}

interface Language {
  code: string;
  name: string;
  flag: string;
}

const VirtualAgent: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
  const [showFileUpload, setShowFileUpload] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [leadData, setLeadData] = useState<LeadData>({
    name: '',
    email: '',
    company: '',
    phone: '',
    interest: '',
    budget: '',
    timeline: '',
    teamSize: '',
    requirements: ''
  });
  const [appointmentData, setAppointmentData] = useState<AppointmentData>({
    date: '',
    time: '',
    timezone: 'UTC',
    type: '',
    notes: ''
  });
  const [showLeadForm, setShowLeadForm] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Supported languages
  const languages: Language[] = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' }
  ];

  // Timezone options
  const timezones = [
    { value: 'UTC', label: 'UTC (Coordinated Universal Time)' },
    { value: 'EST', label: 'EST (Eastern Standard Time)' },
    { value: 'PST', label: 'PST (Pacific Standard Time)' },
    { value: 'CET', label: 'CET (Central European Time)' },
    { value: 'IST', label: 'IST (Indian Standard Time)' },
    { value: 'JST', label: 'JST (Japan Standard Time)' },
    { value: 'AEST', label: 'AEST (Australian Eastern Standard Time)' }
  ];

  // Business hours by timezone
  const businessHours = {
    'UTC': '9:00 AM - 6:00 PM UTC',
    'EST': '9:00 AM - 6:00 PM EST',
    'PST': '9:00 AM - 6:00 PM PST',
    'CET': '9:00 AM - 6:00 PM CET',
    'IST': '9:00 AM - 6:00 PM IST',
    'JST': '9:00 AM - 6:00 PM JST',
    'AEST': '9:00 AM - 6:00 PM AEST'
  };

  // Multi-language content
  const content = {
    en: {
      welcome: "Hi! I'm your CRMONCE assistant. How can I help you today?",
      services: "Tell me about your services",
      quote: "Get a quote",
      consultation: "Schedule a consultation",
      support: "Technical support",
      upload: "Upload files",
      language: "Change language",
      appointment: "Schedule appointment",
      contact: "Contact information",
      pricing: "Pricing & packages",
      demo: "Request demo",
      caseStudies: "Case studies",
      training: "Training programs",
      implementation: "Implementation process",
      integration: "Integration services",
      customization: "Custom development",
      maintenance: "Support & maintenance",
      security: "Security & compliance",
      migration: "Data migration",
      consulting: "Business consulting",
      audit: "System audit",
      optimization: "Performance optimization",
      backup: "Backup & recovery",
      api: "API development",
      mobile: "Mobile solutions",
      cloud: "Cloud services",
      onPremise: "On-premise solutions",
      hybrid: "Hybrid solutions"
    },
    es: {
      welcome: "¡Hola! Soy tu asistente CRMONCE. ¿Cómo puedo ayudarte hoy?",
      services: "Cuéntame sobre tus servicios",
      quote: "Obtener cotización",
      consultation: "Programar consulta",
      support: "Soporte técnico",
      upload: "Subir archivos",
      language: "Cambiar idioma",
      appointment: "Programar cita",
      contact: "Información de contacto",
      pricing: "Precios y paquetes",
      demo: "Solicitar demo",
      caseStudies: "Casos de estudio",
      training: "Programas de entrenamiento",
      implementation: "Proceso de implementación",
      integration: "Servicios de integración",
      customization: "Desarrollo personalizado",
      maintenance: "Soporte y mantenimiento",
      security: "Seguridad y cumplimiento",
      migration: "Migración de datos",
      consulting: "Consultoría empresarial",
      audit: "Auditoría del sistema",
      optimization: "Optimización de rendimiento",
      backup: "Respaldo y recuperación",
      api: "Desarrollo de API",
      mobile: "Soluciones móviles",
      cloud: "Servicios en la nube",
      onPremise: "Soluciones locales",
      hybrid: "Soluciones híbridas"
    },
    fr: {
      welcome: "Bonjour ! Je suis votre assistant CRMONCE. Comment puis-je vous aider aujourd'hui ?",
      services: "Parlez-moi de vos services",
      quote: "Obtenir un devis",
      consultation: "Planifier une consultation",
      support: "Support technique",
      upload: "Télécharger des fichiers",
      language: "Changer de langue",
      appointment: "Planifier un rendez-vous",
      contact: "Informations de contact",
      pricing: "Tarifs et forfaits",
      demo: "Demander une démo",
      caseStudies: "Études de cas",
      training: "Programmes de formation",
      implementation: "Processus d'implémentation",
      integration: "Services d'intégration",
      customization: "Développement personnalisé",
      maintenance: "Support et maintenance",
      security: "Sécurité et conformité",
      migration: "Migration de données",
      consulting: "Conseil en entreprise",
      audit: "Audit du système",
      optimization: "Optimisation des performances",
      backup: "Sauvegarde et récupération",
      api: "Développement d'API",
      mobile: "Solutions mobiles",
      cloud: "Services cloud",
      onPremise: "Solutions sur site",
      hybrid: "Solutions hybrides"
    }
  };

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Initialize with welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        addBotMessage(content[currentLanguage as keyof typeof content]?.welcome || content.en.welcome, [
          content[currentLanguage as keyof typeof content]?.services || content.en.services,
          content[currentLanguage as keyof typeof content]?.quote || content.en.quote,
          content[currentLanguage as keyof typeof content]?.consultation || content.en.consultation,
          content[currentLanguage as keyof typeof content]?.support || content.en.support,
          content[currentLanguage as keyof typeof content]?.upload || content.en.upload,
          content[currentLanguage as keyof typeof content]?.language || content.en.language
        ]);
      }, 500);
    }
  }, [isOpen, messages.length, currentLanguage]);

  const addBotMessage = (text: string, quickReplies?: string[]) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'bot',
      timestamp: new Date(),
      type: quickReplies ? 'quick-reply' : 'text',
      quickReplies
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const addUserMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const addFileMessage = (files: File[]) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text: `Uploaded ${files.length} file(s): ${files.map(f => f.name).join(', ')}`,
      sender: 'user',
      timestamp: new Date(),
      type: 'file',
      files
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const simulateTyping = () => {
    setIsTyping(true);
    setTimeout(() => setIsTyping(false), 1500);
  };

  const handleQuickReply = (reply: string) => {
    addUserMessage(reply);
    simulateTyping();
    
    setTimeout(() => {
      const lang = content[currentLanguage as keyof typeof content] || content.en;
      
      switch (reply) {
        case lang.services:
        case "Tell me about your services":
        case "Cuéntame sobre tus servicios":
        case "Parlez-moi de vos services":
          addBotMessage("We offer comprehensive Dynamics 365 and Power Platform services:", [
            "Dynamics 365 Implementation",
            "Power Platform Development", 
            "Consulting Services",
            "Training Programs",
            "Custom Development",
            "Integration Services",
            "Support & Maintenance"
          ]);
          break;
        case lang.quote:
        case "Get a quote":
        case "Obtener cotización":
        case "Obtenir un devis":
          setShowLeadForm(true);
          addBotMessage("I'd be happy to help you get a quote! Please share your details:", [
            "Fill out form",
            "Talk to sales",
            "Schedule demo"
          ]);
          break;
        case lang.consultation:
        case "Schedule a consultation":
        case "Programar consulta":
        case "Planifier une consultation":
          setShowAppointmentForm(true);
          addBotMessage("Great! I can help you schedule a consultation. Please select your preferred time:", [
            "This week",
            "Next week", 
            "Call me",
            "Send calendar link"
          ]);
          break;
        case lang.upload:
        case "Upload files":
        case "Subir archivos":
        case "Télécharger des fichiers":
          setShowFileUpload(true);
          addBotMessage("You can upload documents, screenshots, or any files you'd like to share with us. Supported formats: PDF, DOC, DOCX, PNG, JPG, ZIP (max 10MB each).");
          break;
        case lang.language:
        case "Change language":
        case "Cambiar idioma":
        case "Changer de langue":
          setShowLanguageSelector(true);
          addBotMessage("Please select your preferred language:");
          break;
        case "Dynamics 365 Implementation":
          addBotMessage("Our Dynamics 365 implementation includes:\n\n🏢 **CRM Modules:** Sales, Marketing, Customer Service\n📊 **ERP Modules:** Finance, Operations, Supply Chain\n🤖 **AI Features:** Predictive analytics, intelligent insights\n📱 **Mobile Access:** Anywhere, anytime access\n🔒 **Security:** Enterprise-grade security & compliance\n\n**Timeline:** 8-12 weeks\n**Starting Price:** $25,000\n\nWould you like to learn more?", [
            "Get implementation quote",
            "See case studies",
            "Schedule demo",
            "Talk to expert",
            "View implementation process"
          ]);
          break;
        case "Power Platform Development":
          addBotMessage("We build custom Power Platform solutions:\n\n⚡ **Power Apps:** Custom business applications\n🔄 **Power Automate:** Workflow automation\n📈 **Power BI:** Data visualization & analytics\n🤖 **Power Virtual Agents:** AI chatbots\n🔗 **Custom Connectors:** Third-party integrations\n\n**Timeline:** 4-8 weeks\n**Starting Price:** $15,000\n\nWhat type of solution do you need?", [
            "Custom app development",
            "Workflow automation",
            "Data visualization",
            "AI chatbot",
            "Get quote"
          ]);
          break;
        case "Custom Development":
          addBotMessage("Our custom development services include:\n\n💻 **Web Applications:** React, Angular, Node.js\n📱 **Mobile Apps:** iOS, Android, React Native\n🔧 **API Development:** RESTful APIs, GraphQL\n☁️ **Cloud Solutions:** Azure, AWS, Google Cloud\n🔄 **Legacy Modernization:** System upgrades\n\n**Timeline:** 6-16 weeks\n**Starting Price:** $20,000\n\nWhat type of custom solution do you need?", [
            "Web application",
            "Mobile app",
            "API development",
            "Cloud migration",
            "Legacy modernization"
          ]);
          break;
        case "Integration Services":
          addBotMessage("We provide comprehensive integration services:\n\n🔗 **CRM Integration:** Salesforce, HubSpot, Pipedrive\n💼 **ERP Integration:** SAP, Oracle, NetSuite\n📧 **Email Integration:** Outlook, Gmail, Mailchimp\n💳 **Payment Integration:** Stripe, PayPal, Square\n📊 **Analytics Integration:** Google Analytics, Mixpanel\n\n**Timeline:** 2-6 weeks\n**Starting Price:** $10,000\n\nWhat systems do you need to integrate?", [
            "CRM integration",
            "ERP integration",
            "Email integration",
            "Payment integration",
            "Analytics integration"
          ]);
          break;
        case "Support & Maintenance":
          addBotMessage("Our support and maintenance services include:\n\n🛠️ **Technical Support:** 24/7 helpdesk\n🔧 **System Maintenance:** Regular updates & patches\n📊 **Performance Monitoring:** Proactive monitoring\n🔒 **Security Updates:** Latest security patches\n📚 **Documentation:** User guides & training\n\n**Plans Available:**\n• Basic: $500/month\n• Professional: $1,200/month\n• Enterprise: $2,500/month\n\nWhich plan interests you?", [
            "Basic support",
            "Professional support",
            "Enterprise support",
            "Custom plan",
            "Learn more"
          ]);
          break;
        default:
          addBotMessage("I understand you're interested in " + reply + ". Let me connect you with our team. Would you like to schedule a call or receive more information?", [
            "Schedule call",
            "Send information",
            "Get quote",
            "Talk to expert"
          ]);
      }
    }, 2000);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    addUserMessage(inputValue);
    setInputValue('');
    simulateTyping();
    
    // Enhanced AI-like response logic
    setTimeout(() => {
      const userInput = inputValue.toLowerCase();
      
      if (userInput.includes('price') || userInput.includes('cost') || userInput.includes('quote') || userInput.includes('pricing')) {
        addBotMessage("Our pricing varies based on your specific needs:\n\n**Dynamics 365 Implementation:** $25,000 - $100,000+\n**Power Platform Development:** $15,000 - $50,000+\n**Custom Development:** $20,000 - $75,000+\n**Consulting Services:** $150 - $300/hour\n**Training Programs:** $2,000 - $10,000\n\nFor a personalized quote, I'd be happy to connect you with our sales team. Would you like to share your requirements?", [
          "Get personalized quote",
          "Schedule consultation",
          "See pricing guide",
          "Compare packages"
        ]);
      } else if (userInput.includes('contact') || userInput.includes('phone') || userInput.includes('email') || userInput.includes('reach')) {
        addBotMessage("You can reach us at:\n\n📞 **Phone:** +1 (555) 123-4567\n📧 **Email:** info@crmonce.com\n🌐 **Website:** www.crmonce.com\n📍 **Address:** 123 Business Ave, Suite 100, City, State 12345\n\n**Business Hours:**\nMonday - Friday: 9:00 AM - 6:00 PM EST\nSaturday: 10:00 AM - 2:00 PM EST\n\nWould you like me to schedule a call?", [
          "Schedule call",
          "Send email",
          "Visit website",
          "Get directions"
        ]);
      } else if (userInput.includes('time') || userInput.includes('duration') || userInput.includes('how long') || userInput.includes('timeline')) {
        addBotMessage("Project timelines vary by complexity:\n\n⏱️ **Quick Start:** 2-4 weeks\n📊 **Standard Implementation:** 8-12 weeks\n🏗️ **Complex Projects:** 16-24 weeks\n🔄 **Custom Development:** 6-16 weeks\n📚 **Training Programs:** 1-4 weeks\n\n**Factors affecting timeline:**\n• Project scope & complexity\n• Customization requirements\n• Data migration needs\n• User training requirements\n\nWhat type of project are you considering?", [
          "Quick start project",
          "Standard implementation",
          "Complex project",
          "Custom development",
          "Training program"
        ]);
      } else if (userInput.includes('demo') || userInput.includes('show') || userInput.includes('presentation')) {
        addBotMessage("I'd be happy to arrange a personalized demo for you!\n\n🎯 **Demo Options:**\n• Live system walkthrough\n• Custom scenario demonstration\n• ROI calculator presentation\n• Case study review\n\n**Duration:** 30-60 minutes\n**Format:** Video call or in-person\n**Preparation:** We'll customize based on your needs\n\nWhen would you like to schedule your demo?", [
          "Schedule demo",
          "Request case studies",
          "ROI calculator",
          "Talk to sales"
        ]);
      } else if (userInput.includes('security') || userInput.includes('compliance') || userInput.includes('data protection')) {
        addBotMessage("Security and compliance are our top priorities:\n\n🔒 **Security Features:**\n• SOC 2 Type II Certified\n• GDPR Compliance\n• HIPAA Compliance\n• End-to-end encryption\n• Multi-factor authentication\n• Regular security audits\n\n🛡️ **Data Protection:**\n• Automated backups\n• Disaster recovery\n• Data residency options\n• Access controls\n• Audit trails\n\nWould you like to learn more about our security measures?", [
          "Security documentation",
          "Compliance certificates",
            "Data protection policy",
            "Security audit report"
        ]);
      } else {
        addBotMessage("Thank you for your message! I'd be happy to help you further. Would you like to speak with one of our experts or get more information?", [
          "Talk to expert",
          "Get more info",
          "Schedule consultation",
          "Request quote",
          "Upload files"
        ]);
      }
    }, 2000);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length > 0) {
      setSelectedFiles(files);
      addFileMessage(files);
      simulateTyping();
      
      setTimeout(() => {
        addBotMessage(`Thank you for uploading ${files.length} file(s)! Our team will review them and get back to you within 24 hours.`, [
          "Schedule follow-up call",
          "Upload more files",
          "Ask questions",
          "Get quote"
        ]);
        setShowFileUpload(false);
        setSelectedFiles([]);
      }, 2000);
    }
  };

  const handleAppointmentSubmit = async () => {
    if (!appointmentData.date || !appointmentData.time || !appointmentData.type) {
      addBotMessage("Please provide the date, time, and type of appointment.");
      return;
    }

    addUserMessage(`Appointment Request: ${appointmentData.type} on ${appointmentData.date} at ${appointmentData.time} ${appointmentData.timezone}`);
    simulateTyping();
    
    setTimeout(() => {
      addBotMessage(`Perfect! I've scheduled your ${appointmentData.type} appointment for ${appointmentData.date} at ${appointmentData.time} ${appointmentData.timezone}. You'll receive a calendar invitation and confirmation email shortly.`, [
        "Reschedule appointment",
        "Add to calendar",
        "Send reminder",
        "Ask questions"
      ]);
      setShowAppointmentForm(false);
      setAppointmentData({ date: '', time: '', timezone: 'UTC', type: '', notes: '' });
    }, 2000);
  };

  const handleLanguageChange = (languageCode: string) => {
    setCurrentLanguage(languageCode);
    setShowLanguageSelector(false);
    addBotMessage(`Language changed to ${languages.find(l => l.code === languageCode)?.name}. How can I help you?`, [
      content[languageCode as keyof typeof content]?.services || content.en.services,
      content[languageCode as keyof typeof content]?.quote || content.en.quote,
      content[languageCode as keyof typeof content]?.consultation || content.en.consultation
    ]);
  };

  const handleLeadSubmit = async () => {
    if (!leadData.name || !leadData.email) {
      addBotMessage("Please provide at least your name and email address.");
      return;
    }

    addUserMessage(`Lead Information: ${leadData.name}, ${leadData.email}, ${leadData.company}, Interest: ${leadData.interest}, Budget: ${leadData.budget}, Timeline: ${leadData.timeline}`);
    simulateTyping();
    
    // Here you would integrate with your Dynamics 365 CRM
    try {
      // Simulate CRM integration
      console.log('Sending lead to Dynamics 365:', leadData);
      
      setTimeout(() => {
        addBotMessage(`Thank you ${leadData.name}! I've captured your information and sent it to our team. You'll receive a personalized quote for ${leadData.interest} within 24 hours.`, [
          "Schedule immediate call",
          "Send more information",
          "Ask another question",
          "Upload requirements"
        ]);
        setShowLeadForm(false);
        setLeadData({ name: '', email: '', company: '', phone: '', interest: '', budget: '', timeline: '', teamSize: '', requirements: '' });
      }, 2000);
    } catch (error) {
      addBotMessage("I apologize, but there was an issue processing your request. Please try again or contact us directly.");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
            >
              <MessageCircle className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-24 right-6 z-40 w-96 h-[600px] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 text-white p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Bot className="w-8 h-8" />
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold">CRMONCE Assistant</h3>
                    <p className="text-sm opacity-90">Online • Ready to help</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setShowLanguageSelector(!showLanguageSelector)}
                    className="text-white/80 hover:text-white transition-colors"
                    title="Change Language"
                  >
                    <Globe className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 h-[400px]">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-2 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.sender === 'user' 
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500' 
                        : 'bg-gradient-to-r from-green-500 to-teal-500'
                    }`}>
                      {message.sender === 'user' ? (
                        <User className="w-4 h-4 text-white" />
                      ) : (
                        <Bot className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <div className={`rounded-2xl px-4 py-2 ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                      {message.files && (
                        <div className="mt-2 space-y-1">
                          {message.files.map((file, index) => (
                            <div key={index} className="flex items-center space-x-2 bg-white/20 rounded p-2">
                              <File className="w-4 h-4" />
                              <span className="text-xs">{file.name}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      {message.quickReplies && (
                        <div className="mt-3 space-y-2">
                          {message.quickReplies.map((reply, index) => (
                            <button
                              key={index}
                              onClick={() => handleQuickReply(reply)}
                              className="block w-full text-left px-3 py-2 bg-white/90 hover:bg-white rounded-lg text-sm transition-colors border border-gray-200 hover:border-blue-300"
                            >
                              {reply}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="flex items-start space-x-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-teal-500 flex items-center justify-center">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-gray-100 rounded-2xl px-4 py-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Language Selector */}
            {showLanguageSelector && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-gray-50 border-t border-gray-200"
              >
                <div className="grid grid-cols-2 gap-2">
                  {languages.map((language) => (
                    <button
                      key={language.code}
                      onClick={() => handleLanguageChange(language.code)}
                      className={`flex items-center space-x-2 p-2 rounded-lg border transition-colors ${
                        currentLanguage === language.code
                          ? 'bg-blue-500 text-white border-blue-500'
                          : 'bg-white hover:bg-gray-50 border-gray-200'
                      }`}
                    >
                      <span className="text-lg">{language.flag}</span>
                      <span className="text-sm">{language.name}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* File Upload */}
            {showFileUpload && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-gray-50 border-t border-gray-200"
              >
                <div className="space-y-3">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600 mb-2">Drop files here or click to upload</p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.zip"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600 transition-colors"
                    >
                      Choose Files
                    </button>
                  </div>
                  <p className="text-xs text-gray-500">
                    Supported formats: PDF, DOC, DOCX, PNG, JPG, ZIP (max 10MB each)
                  </p>
                </div>
              </motion.div>
            )}

            {/* Appointment Form */}
            {showAppointmentForm && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-gray-50 border-t border-gray-200"
              >
                <div className="space-y-3">
                  <select
                    value={appointmentData.type}
                    onChange={(e) => setAppointmentData({...appointmentData, type: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select appointment type</option>
                    <option value="Consultation">Consultation</option>
                    <option value="Demo">Product Demo</option>
                    <option value="Technical Review">Technical Review</option>
                    <option value="Project Planning">Project Planning</option>
                    <option value="Training Session">Training Session</option>
                  </select>
                  <input
                    type="date"
                    value={appointmentData.date}
                    onChange={(e) => setAppointmentData({...appointmentData, date: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="time"
                    value={appointmentData.time}
                    onChange={(e) => setAppointmentData({...appointmentData, time: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <select
                    value={appointmentData.timezone}
                    onChange={(e) => setAppointmentData({...appointmentData, timezone: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {timezones.map((tz) => (
                      <option key={tz.value} value={tz.value}>{tz.label}</option>
                    ))}
                  </select>
                  <textarea
                    placeholder="Additional notes (optional)"
                    value={appointmentData.notes}
                    onChange={(e) => setAppointmentData({...appointmentData, notes: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={2}
                  />
                  <button
                    onClick={handleAppointmentSubmit}
                    className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 text-white py-2 px-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                  >
                    Schedule Appointment
                  </button>
                </div>
              </motion.div>
            )}

            {/* Enhanced Lead Form */}
            {showLeadForm && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-gray-50 border-t border-gray-200"
              >
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Your name *"
                    value={leadData.name}
                    onChange={(e) => setLeadData({...leadData, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="email"
                    placeholder="Email address *"
                    value={leadData.email}
                    onChange={(e) => setLeadData({...leadData, email: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="text"
                    placeholder="Company name"
                    value={leadData.company}
                    onChange={(e) => setLeadData({...leadData, company: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="tel"
                    placeholder="Phone number"
                    value={leadData.phone}
                    onChange={(e) => setLeadData({...leadData, phone: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <select
                    value={leadData.interest}
                    onChange={(e) => setLeadData({...leadData, interest: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select your interest</option>
                    <option value="Dynamics 365 Implementation">Dynamics 365 Implementation</option>
                    <option value="Power Platform Development">Power Platform Development</option>
                    <option value="Custom Development">Custom Development</option>
                    <option value="Consulting Services">Consulting Services</option>
                    <option value="Training Programs">Training Programs</option>
                    <option value="Integration Services">Integration Services</option>
                    <option value="Support & Maintenance">Support & Maintenance</option>
                  </select>
                  <select
                    value={leadData.budget}
                    onChange={(e) => setLeadData({...leadData, budget: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Budget range</option>
                    <option value="Under $10,000">Under $10,000</option>
                    <option value="$10,000 - $25,000">$10,000 - $25,000</option>
                    <option value="$25,000 - $50,000">$25,000 - $50,000</option>
                    <option value="$50,000 - $100,000">$50,000 - $100,000</option>
                    <option value="Over $100,000">Over $100,000</option>
                  </select>
                  <select
                    value={leadData.timeline}
                    onChange={(e) => setLeadData({...leadData, timeline: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Project timeline</option>
                    <option value="Immediate">Immediate</option>
                    <option value="1-3 months">1-3 months</option>
                    <option value="3-6 months">3-6 months</option>
                    <option value="6+ months">6+ months</option>
                  </select>
                  <textarea
                    placeholder="Project requirements (optional)"
                    value={leadData.requirements}
                    onChange={(e) => setLeadData({...leadData, requirements: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={3}
                  />
                  <button
                    onClick={handleLeadSubmit}
                    className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 text-white py-2 px-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                  >
                    Submit & Get Quote
                  </button>
                </div>
              </motion.div>
            )}

            {/* Input */}
            {!showLeadForm && !showAppointmentForm && !showFileUpload && !showLanguageSelector && (
              <div className="p-4 border-t border-gray-200">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim()}
                    className="bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 text-white p-2 rounded-full hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default VirtualAgent; 