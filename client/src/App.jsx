import React, { useState, useEffect, createContext, useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Briefcase, 
  BookOpen, 
  Users, 
  TrendingUp, 
  LogOut, 
  Bell, 
  Menu, 
  X,
  Building,
  Search,
  Plus,
  Edit2,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Eye,
  EyeOff,
  AlertCircle,
  ShieldCheck,
  Lock,
  Mail,
  Calendar,
  Clock,
  Percent,
  CheckCircle2,
  Info,
  Globe,
  ChevronDown,
  ChevronUp,
  Play,
  Pause,
  Activity,
  ArrowUpRight
} from 'lucide-react';

// ==========================================
// 1. DUMMY SEED DATA DEFINITIONS
// ==========================================

const initialLeads = [
  { id: '1', name: 'Aarav Sharma', email: 'aarav@example.com', phone: '+91 98765 43210', service: 'Web Development', source: 'LinkedIn', notes: 'First contact via LinkedIn referral.', status: 'new', created_at: '2026-06-12' },
  { id: '2', name: 'Priya Mehta', email: 'priya@example.com', phone: '+91 98765 43211', service: 'Mobile App', source: 'Referral', notes: 'Needs iOS/Android app integration.', status: 'in_progress', created_at: '2026-06-11' },
  { id: '3', name: 'Rohan Verma', email: 'rohan@example.com', phone: '+91 98765 43212', service: 'UI/UX Design', source: 'Website', notes: 'Interested in a website redesign.', status: 'done', created_at: '2026-06-10' },
  { id: '4', name: 'Sneha Patel', email: 'sneha@example.com', phone: '+91 98765 43213', service: 'SEO', source: 'Google Ads', notes: 'SEO audit request.', status: 'new', created_at: '2026-06-09' },
  { id: '5', name: 'Karan Singh', email: 'karan@example.com', phone: '+91 98765 43214', service: 'Cloud Services', source: 'LinkedIn', notes: 'Migration proposal sent.', status: 'in_progress', created_at: '2026-06-08' },
  { id: '6', name: 'Ananya Rao', email: 'ananya@example.com', phone: '+91 98765 43215', service: 'Web Development', source: 'Cold Email', notes: 'E-commerce platform inquiry.', status: 'new', created_at: '2026-06-07' },
  { id: '7', name: 'Vivek Joshi', email: 'vivek@example.com', phone: '+91 98765 43216', service: 'DevOps', source: 'Referral', notes: 'Kubernetes pipeline setup complete.', status: 'done', created_at: '2026-06-06' },
  { id: '8', name: 'Meera Nair', email: 'meera@example.com', phone: '+91 98765 43217', service: 'Mobile App', source: 'Website', notes: 'Quote request for hybrid app.', status: 'in_progress', created_at: '2026-06-05' },
  { id: '9', name: 'Arjun Kapoor', email: 'arjun@example.com', phone: '+91 98765 43218', service: 'UI/UX Design', source: 'LinkedIn', notes: 'Needs wireframes for new startup.', status: 'new', created_at: '2026-06-04' },
  { id: '10', name: 'Divya Gupta', email: 'divya@example.com', phone: '+91 98765 43219', service: 'SEO', source: 'Google Ads', notes: 'SEO campaign setup complete.', status: 'done', created_at: '2026-06-03' }
];

const initialPortfolio = [
  { id: '1', name: 'ShopNest', category: 'E-Commerce', tech_stack: 'React, Node.js, Tailwind, MongoDB', client: 'RetailCo', description: 'Next-gen online shop with secure checkout.', visible: true, created_at: '2026-05-15' },
  { id: '2', name: 'HealthPulse', category: 'Healthcare', tech_stack: 'Flutter, Firebase, Cloud Functions', client: 'MedTech Ltd', description: 'Real-time patient monitoring platform.', visible: true, created_at: '2026-05-01' },
  { id: '3', name: 'EduFlow', category: 'EdTech', tech_stack: 'Next.js, PostgreSQL, Prisma, Tailwind', client: 'LearnUp Inc', description: 'Custom student dashboard and LMS portal.', visible: false, created_at: '2026-04-20' },
  { id: '4', name: 'LogiTrack', category: 'Logistics', tech_stack: 'Vue.js, Express, Mapbox API', client: 'FreightCo', description: 'Live tracking portal for shipping fleets.', visible: true, created_at: '2026-04-10' },
  { id: '5', name: 'FinDash', category: 'FinTech', tech_stack: 'React, Python, Django, Chart.js', client: 'BankStart', description: 'Executive trading analytics dashboards.', visible: false, created_at: '2026-03-25' },
  { id: '6', name: 'CityMap', category: 'GovTech', tech_stack: 'React Native, AWS, OpenStreetMap', client: 'MunicipalCo', description: 'Local municipal map router for reporting hazards.', visible: true, created_at: '2026-03-12' }
];

const initialBlogs = [
  { id: '1', title: '10 React Patterns Every Dev Should Know', author: 'Rahul Dev', category: 'Engineering', content: 'Detailed walkthrough of design patterns including Compound Components, Render Props, and Custom Hooks...', status: 'published', published_at: '2026-06-12' },
  { id: '2', title: 'Designing for Accessibility in 2025', author: 'Sanya Khanna', category: 'Design', content: 'Practical tips to ensure contrast compliance, clean screen reader hierarchies, and robust keyboard focus mappings...', status: 'published', published_at: '2026-06-10' },
  { id: '3', title: 'Why We Moved to Supabase', author: 'Arjun Dev', category: 'Backend', content: 'A comparison review of Firebase vs Supabase, focusing on PostgreSQL schema flexibility and Row Level Security...', status: 'draft', published_at: null },
  { id: '4', title: 'Cloud Cost Optimization Tips', author: 'Neha Ops', category: 'DevOps', content: 'Analyzing container orchestration resources, auto-scaling thresholds, and multi-region network data savings...', status: 'pending', published_at: null },
  { id: '5', title: 'Building a Design System from Scratch', author: 'Sanya Khanna', category: 'Design', content: 'How to map color palettes, layout parameters, and basic components inside Storybook for unified teams...', status: 'draft', published_at: null }
];

const initialTeam = [
  { id: '1', name: 'Rahul Dev', role: 'Lead Engineer', department: 'Engineering', email: 'rahul@nexix.tech', status: 'active' },
  { id: '2', name: 'Sanya Khanna', role: 'UI/UX Designer', department: 'Design', email: 'sanya@nexix.tech', status: 'active' },
  { id: '3', name: 'Arjun Dev', role: 'Backend Developer', department: 'Engineering', email: 'arjun@nexix.tech', status: 'active' },
  { id: '4', name: 'Neha Ops', role: 'DevOps Engineer', department: 'Infrastructure', email: 'neha@nexix.tech', status: 'inactive' },
  { id: '5', name: 'Priya PM', role: 'Product Manager', department: 'Product', email: 'priya@nexix.tech', status: 'active' }
];

const initialCareers = [
  { id: '1', position: 'Senior React Developer', department: 'Engineering', type: 'full_time', applicants: 24, status: 'open', description: 'Seeking developers to build interactive frontend dashboard features.' },
  { id: '2', position: 'UI/UX Designer', department: 'Design', type: 'full_time', applicants: 17, status: 'review', description: 'Help define aesthetic directions and map clean layouts.' },
  { id: '3', position: 'Node.js Backend Engineer', department: 'Engineering', type: 'contract', applicants: 9, status: 'open', description: 'Design Express microservices and manage PostgreSQL schema updates.' },
  { id: '4', position: 'DevOps Intern', department: 'Infrastructure', type: 'internship', applicants: 31, status: 'closed', description: 'Assist in cloud security audits and automate CI/CD tasks.' },
  { id: '5', position: 'Product Manager', department: 'Product', type: 'full_time', applicants: 0, status: 'draft', description: 'Collaborate with designers and engineers to define sprint roadmaps.' }
];

// ==========================================
// 2. CONTEXTS (AUTH & MOCK DATABASE STATE)
// ==========================================

const AppStateContext = createContext(null);

export function AppStateProvider({ children }) {
  // Authentication state
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('nexix_mock_user');
    return saved ? JSON.parse(saved) : null;
  });

  // Toast / Feedback State
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 2500);
  };

  // Helper for localStorage initial seed lists
  const getSavedList = (key, defaultList) => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : defaultList;
  };

  // --- BLOG POSTS STATE ---
  const [blogs, setBlogs] = useState(() => {
    const savedIds = getSavedList('nexix_blog_published', ['1', '2']);
    return initialBlogs.map(b => ({
      ...b,
      publishedToSite: savedIds.includes(b.id) && b.status === 'published'
    }));
  });

  const updateBlogsState = (newBlogs) => {
    setBlogs(newBlogs);
    const ids = newBlogs.filter(b => b.publishedToSite).map(b => b.id);
    localStorage.setItem('nexix_blog_published', JSON.stringify(ids));
  };

  // --- PORTFOLIO STATE ---
  const [portfolio, setPortfolio] = useState(() => {
    const savedIds = getSavedList('nexix_portfolio_visible', ['1', '2', '4', '6']);
    return initialPortfolio.map(p => ({
      ...p,
      visible: savedIds.includes(p.id)
    }));
  });

  const updatePortfolioState = (newPortfolio) => {
    setPortfolio(newPortfolio);
    const ids = newPortfolio.filter(p => p.visible).map(p => p.id);
    localStorage.setItem('nexix_portfolio_visible', JSON.stringify(ids));
  };

  // --- CAREERS STATE ---
  const [careers, setCareers] = useState(() => {
    const savedIds = getSavedList('nexix_careers_published', ['1', '2', '3']);
    return initialCareers.map(c => ({
      ...c,
      publishedToSite: savedIds.includes(c.id) && (c.status === 'open' || c.status === 'review')
    }));
  });

  const updateCareersState = (newCareers) => {
    setCareers(newCareers);
    const ids = newCareers.filter(c => c.publishedToSite).map(c => c.id);
    localStorage.setItem('nexix_careers_published', JSON.stringify(ids));
  };

  // --- TEAM MEMBERS STATE ---
  const [team, setTeam] = useState(() => {
    const savedIds = getSavedList('nexix_team_published', ['1', '2', '3', '5']);
    return initialTeam.map(t => ({
      ...t,
      publishedToSite: savedIds.includes(t.id) && t.status === 'active'
    }));
  });

  const updateTeamState = (newTeam) => {
    setTeam(newTeam);
    const ids = newTeam.filter(t => t.publishedToSite).map(t => t.id);
    localStorage.setItem('nexix_team_published', JSON.stringify(ids));
  };

  // Leads state (no website publish requirement)
  const [leads, setLeads] = useState(initialLeads);

  const login = (email, password) => {
    if (email === 'admin@nexix.tech' && password === 'admin123') {
      const userData = { email, role: 'administrator', initials: 'NA' };
      setUser(userData);
      localStorage.setItem('nexix_mock_user', JSON.stringify(userData));
      addToast('Authenticated successfully as Nexix Admin', 'success');
      return true;
    } else {
      addToast('Invalid email or password credentials', 'error');
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('nexix_mock_user');
    addToast('Session closed. Goodbye!', 'info');
  };

  useEffect(() => {
    document.title = "Nexix Admin — Technology";
  }, []);

  return (
    <AppStateContext.Provider value={{
      user, login, logout,
      leads, setLeads,
      portfolio: portfolio, setPortfolio: updatePortfolioState,
      blogs: blogs, setBlogs: updateBlogsState,
      team: team, setTeam: updateTeamState,
      careers: careers, setCareers: updateCareersState,
      toasts, addToast
    }}>
      {children}

      {/* Brand Black Toast Notification Container */}
      <div className="fixed bottom-5 right-5 z-[100] flex flex-col gap-2 max-w-sm w-full">
        {toasts.map(toast => (
          <div 
            key={toast.id}
            className="p-4 rounded-[8px] bg-[#0A0A0A] text-white shadow-[0_4px_20px_rgba(0,0,0,0.3)] flex items-center justify-between border border-[#2C2C2C] animate-toast-in font-sans"
          >
            <div className="flex items-center gap-2.5">
              {toast.type === 'success' ? (
                <CheckCircle2 className="w-4.5 h-4.5 text-white flex-shrink-0" />
              ) : toast.type === 'error' ? (
                <AlertCircle className="w-4.5 h-4.5 text-white flex-shrink-0" />
              ) : (
                <Info className="w-4.5 h-4.5 text-[#0A0A0A] flex-shrink-0" />
              )}
              <span className="text-xs font-semibold tracking-wide">{toast.message}</span>
            </div>
            <button 
              onClick={() => setToasts(prev => prev.filter(t => t.id !== toast.id))}
              className="ml-3 text-zinc-400 hover:text-zinc-200 focus:outline-none"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </AppStateContext.Provider>
  );
}

export function useAppState() {
  const context = useContext(AppStateContext);
  if (!context) throw new Error('useAppState must be used inside AppStateProvider');
  return context;
}

// ==========================================
// 3. REUSABLE TOGGLE AND MODAL COMPONENTS
// ==========================================

function ToggleSwitch({ checked, onChange, disabled, tooltip, onClickDisabled }) {
  return (
    <div className="relative group inline-block">
      <div 
        onClick={(e) => {
          if (disabled && onClickDisabled) {
            e.stopPropagation();
            onClickDisabled();
          }
        }}
        className="inline-block"
      >
        <button
          type="button"
          disabled={disabled}
          onClick={(e) => {
            e.stopPropagation();
            onChange();
          }}
          className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-250 ease-in-out focus:outline-none ${
            checked ? 'bg-[#0A0A0A]' : 'bg-zinc-700'
          } ${disabled ? 'opacity-30 cursor-not-allowed' : ''}`}
        >
          <span
            className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
              checked ? 'translate-x-4' : 'translate-x-0'
            }`}
          />
        </button>
      </div>
      {tooltip && disabled && (
        <div className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 hidden group-hover:block bg-[#0A0A0A] text-white text-[10px] px-2.5 py-1 rounded whitespace-nowrap z-50 shadow-lg border border-zinc-800">
          {tooltip}
        </div>
      )}
    </div>
  );
}

function Modal({ isOpen, onClose, title, sizeClasses = 'max-w-lg', children }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />
      {/* Modal Card Box */}
      <div className={`relative bg-white rounded-[12px] shadow-[0_20px_60px_rgba(0,0,0,0.2)] border-0.5 border-gray-200 w-full ${sizeClasses} overflow-hidden flex flex-col max-h-[90vh] z-10 animate-modal-open`}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E4E4E7] bg-gray-50/20">
          <h3 className="text-md font-bold text-[#0A0A0A]">{title}</h3>
          <button 
            onClick={onClose}
            className="p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto flex-1">
          {children}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 4. PRIVATE ROUTE CONTAINER AND LAYOUT
// ==========================================

function ProtectedRoute({ children }) {
  const { user } = useAppState();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <Layout>{children}</Layout>;
}

function Layout({ children }) {
  const { user, logout, blogs, portfolio, careers, team } = useAppState();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewTab, setPreviewTab] = useState('blog');

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/': return 'Dashboard Overview';
      case '/leads': return 'Leads Management';
      case '/portfolio': return 'Portfolio Management';
      case '/blog': return 'Blog Posts Management';
      case '/team': return 'Team Directory';
      case '/careers': return 'Careers & Job Openings';
      case '/analytics': return 'Performance Analytics';
      default: return 'Nexix Admin';
    }
  };

  const menuSections = [
    {
      title: 'Overview',
      items: [{ name: 'Dashboard', path: '/', icon: LayoutDashboard }]
    },
    {
      title: 'Data',
      items: [
        { name: 'Leads', path: '/leads', icon: FileText },
        { name: 'Portfolio', path: '/portfolio', icon: Briefcase },
        { name: 'Blog Posts', path: '/blog', icon: BookOpen },
        { name: 'Team', path: '/team', icon: Users },
        { name: 'Careers', path: '/careers', icon: Building }
      ]
    },
    {
      title: 'Analytics',
      items: [{ name: 'Analytics', path: '/analytics', icon: TrendingUp }]
    }
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Filter lists for Site Preview
  const previewBlogs = blogs.filter(b => b.publishedToSite && b.status === 'published');
  const previewPortfolio = portfolio.filter(p => p.visible);
  const previewCareers = careers.filter(c => c.publishedToSite && (c.status === 'open' || c.status === 'review'));
  const previewTeam = team.filter(t => t.publishedToSite && t.status === 'active');

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-[#0a0a0a] text-[#a1a1aa] border-r border-[#1a1a1a]">
      
      {/* Sidebar logo box (compact logo2.jpeg + wordmark text) */}
      <div className="p-5 flex items-center gap-3 shrink-0">
        <img 
          src="/logo2.jpeg" 
          alt="Nexix Logo" 
          className="w-8 h-8 rounded-lg object-contain border border-[#1a1a1a] shadow-sm bg-white" 
        />
        <div className="flex flex-col">
          <span className="text-sm font-extrabold text-white tracking-tight leading-none">Nexix Admin</span>
          <span className="text-[9px] font-bold text-[#a1a1aa] tracking-widest uppercase mt-0.5">Technology</span>
        </div>
      </div>
      <div className="h-px bg-[#1a1a1a] w-full shrink-0" />

      <nav className="flex-1 overflow-y-auto py-5 space-y-5">
        {menuSections.map((section) => (
          <div key={section.title} className="space-y-1">
            <span className="px-5 text-[9px] font-bold text-[#3f3f46] uppercase tracking-[0.15em] block mb-1.5 mt-4 first:mt-0">
              {section.title}
            </span>
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const isActive = location.pathname === item.path;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setMobileSidebarOpen(false)}
                    className={`group flex items-center h-9.5 px-3.5 mx-3 rounded-lg border-l-[3px] text-xs font-semibold transition-all duration-150 ease-in-out ${
                      isActive 
                        ? 'border-l-white text-white bg-[#1a1a1a] font-bold shadow-sm' 
                        : 'border-transparent text-[#a1a1aa] hover:text-white hover:bg-[#141414]'
                    }`}
                  >
                    <Icon className={`w-4 h-4 mr-2.5 transition-transform duration-150 group-hover:translate-x-[2px] ${isActive ? 'text-white' : 'text-[#71717a] group-hover:text-white'}`} />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Sidebar bottom promo CTA card */}
      <div className="px-4 py-2 shrink-0">
        <div className="bg-[#0a0a0a] border border-[#1a1a1a] text-white p-4 rounded-xl relative overflow-hidden shadow-sm flex flex-col gap-1.5">
          <div className="absolute top-0 right-0 w-16 h-16 bg-white/5 rounded-full blur-xl pointer-events-none"></div>
          <h4 className="text-[10px] font-bold tracking-wider uppercase text-zinc-400">Site Simulation</h4>
          <p className="text-[11px] text-zinc-500 leading-snug font-medium">Preview how your data looks to web visitors.</p>
          <button 
            onClick={() => setIsPreviewOpen(true)}
            className="mt-1.5 w-full py-1.5 bg-white text-[#0a0a0a] hover:bg-[#fafafa] active:scale-[0.97] font-bold text-[10px] uppercase tracking-wider rounded-lg transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            View Public Site
          </button>
        </div>
      </div>

      {/* Sidebar bottom footer */}
      <div className="p-4 border-t border-[#1a1a1a] bg-[#0a0a0a] flex flex-col space-y-3 shrink-0">
        <div className="flex justify-center">
          <svg width="80" height="16" viewBox="0 0 80 16" fill="none" className="select-none">
            <path 
              d="M0 8H25L29 4L33 12L37 2L41 14L45 6L49 10L53 8H80" 
              stroke="#ffffff" 
              strokeOpacity="0.2"
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
            />
          </svg>
        </div>
        <div className="flex items-center space-x-2 px-1">
          <div className="w-7 h-7 rounded-full bg-white text-black text-[10px] font-extrabold flex items-center justify-center shadow-inner select-none shrink-0">
            NA
          </div>
          <div className="text-[10px] text-[#71717a] font-mono tracking-tight truncate flex-1">
            {user?.email || 'admin@nexix.tech'}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-screen flex overflow-hidden bg-[#f4f4f5]">
      
      {/* Desktop Sidebar (Fixed 220px) */}
      <aside className="hidden md:block md:flex-shrink-0 w-[220px] h-full">
        <SidebarContent />
      </aside>

      {/* Mobile Drawer Sidebar */}
      {mobileSidebarOpen && (
        <div className="md:hidden fixed inset-0 z-40 flex">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileSidebarOpen(false)} />
          <div className="relative flex-1 flex flex-col max-w-[220px] w-full h-full transform animate-slide-in-left">
            <div className="absolute top-0 right-0 -mr-12 pt-4">
              <button 
                onClick={() => setMobileSidebarOpen(false)}
                className="flex items-center justify-center h-10 w-10 rounded-full bg-slate-900 text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <SidebarContent />
          </div>
        </div>
      )}

      {/* Main content pane */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* Topbar */}
        <header className="flex-shrink-0 h-16 bg-white border-b border-[#e4e4e7] shadow-sm flex items-center justify-between px-4 sm:px-6 z-10">
          <div className="flex items-center space-x-2 flex-1">
            <button 
              onClick={() => setMobileSidebarOpen(true)}
              className="md:hidden p-2 -ml-2 text-slate-400 hover:text-slate-700"
            >
              <Menu className="w-6 h-6" />
            </button>
            
            {/* Mobile Collapsed Logo Icon */}
            <div className="md:hidden flex items-center justify-center">
              <img 
                src="/logo2.jpeg" 
                alt="Nexix Icon" 
                className="w-9 h-9 object-contain rounded-md border border-zinc-200 shadow-sm bg-white"
              />
            </div>

            <div className="flex items-center">
              <h2 className="ml-2 md:ml-0 text-[18px] font-extrabold text-[#0a0a0a] tracking-tight flex items-center">
                {getPageTitle()}
                <svg width="24" height="12" viewBox="0 0 24 12" fill="none" className="inline-block ml-2.5 select-none animate-pulse">
                  <path 
                    d="M0 6H8L10 2L12 10L14 4L16 8L18 6H24" 
                    stroke="#0a0a0a" 
                    strokeWidth="1.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
              </h2>
            </div>

            {/* Global Search Bar */}
            <div className="hidden lg:flex items-center relative w-64 xl:w-80 ml-6">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 pointer-events-none" />
              <input 
                type="text" 
                placeholder="Search leads, projects... (⌘K)" 
                className="w-full pl-9 pr-4 py-1.5 border border-[#e4e4e7] rounded-lg text-xs bg-[#f4f4f5] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0a0a0a] focus:border-[#0a0a0a] text-slate-800 transition-all placeholder-slate-400"
              />
            </div>
          </div>

          <div className="flex items-center space-x-3.5">
            {/* Site Preview Button */}
            <button 
              onClick={() => setIsPreviewOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 border border-[#0a0a0a] text-[#0a0a0a] bg-white rounded-lg text-xs font-bold hover:bg-[#fafafa] transition-all shadow-sm active:scale-[0.97] cursor-pointer"
            >
              <Eye className="w-4 h-4" />
              <span className="hidden sm:inline">Site Preview</span>
            </button>

            {/* Bell Icon */}
            <button className="p-1.5 rounded-full text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors relative active:scale-[0.97]">
              <Bell className="w-4.5 h-4.5" />
              <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-black border border-white rounded-full notification-pulse" />
            </button>

            {/* Initials Circle */}
            <div className="flex items-center space-x-2">
              <div className="w-8.5 h-8.5 rounded-full bg-[#0a0a0a] text-white text-xs font-extrabold flex items-center justify-center shadow-sm select-none">
                {user?.initials || 'NA'}
              </div>
              <span className="hidden sm:inline text-xs font-semibold text-slate-655">
                {user?.email || 'admin@nexix.tech'}
              </span>
            </div>

            <div className="h-4 w-px bg-slate-200" />

            {/* Logout button */}
            <button 
              onClick={handleLogout}
              className="flex items-center px-2 py-1.5 text-xs font-bold text-slate-500 hover:text-black rounded-md transition-all active:scale-[0.97]"
            >
              <LogOut className="w-4 h-4 sm:mr-1" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </header>

        {/* Content frame */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 bg-[#f4f4f5]">
          {children}
        </main>
      </div>


      {/* Visitor Site Preview Modal */}
      <Modal 
        isOpen={isPreviewOpen} 
        onClose={() => setIsPreviewOpen(false)} 
        title="Visitor Website Simulation" 
        sizeClasses="max-w-4xl"
      >
        <div className="space-y-6">
          
          {/* Header Banner */}
          <div className="bg-[#0A0A0A]/5 border-0.5 border-[#0A0A0A]/15 p-5 rounded-lg text-center">
            <h4 className="text-xl font-bold text-gray-800">Nexix Technology Solutions</h4>
            <p className="text-xs text-gray-400 mt-1">This panel simulates the layout of your public website, displaying only published rows.</p>
          </div>

          {/* Visitor Tabs */}
          <div className="flex border-b border-gray-200">
            {[
              { id: 'blog', label: 'Blog Listing', count: previewBlogs.length },
              { id: 'portfolio', label: 'Portfolio Grid', count: previewPortfolio.length },
              { id: 'careers', label: 'Job Board', count: previewCareers.length },
              { id: 'team', label: 'Team Profile', count: previewTeam.length }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setPreviewTab(tab.id)}
                className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider cursor-pointer border-b-2 transition-all ${
                  previewTab === tab.id 
                    ? 'border-[#0A0A0A] text-[#0A0A0A]' 
                    : 'border-transparent text-gray-400 hover:text-gray-800'
                }`}
              >
                {tab.label} <span className="ml-1 px-1.5 py-0.2 bg-gray-100 text-gray-600 rounded-full text-[10px]">{tab.count}</span>
              </button>
            ))}
          </div>

          {/* Tab Contents */}
          <div className="min-h-[350px]">
            
            {/* BLOG TAB */}
            {previewTab === 'blog' && (
              <div className="space-y-4">
                {previewBlogs.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {previewBlogs.map(post => (
                      <div key={post.id} className="bg-white p-5 rounded-lg border border-gray-150 shadow-sm flex flex-col justify-between hover:shadow transition-shadow">
                        <div>
                          <span className="text-[10px] font-bold text-[#0A0A0A] uppercase tracking-wider block mb-1">{post.category}</span>
                          <h5 className="font-bold text-gray-800 text-sm line-clamp-2">{post.title}</h5>
                          <p className="text-xs text-gray-400 mt-2 line-clamp-3 leading-relaxed">{post.content || 'No description content supplied.'}</p>
                        </div>
                        <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100 text-[10px] text-gray-400 font-semibold">
                          <span>by {post.author}</span>
                          <span>{post.published_at}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20 text-gray-400 text-xs">No content published to this section yet</div>
                )}
              </div>
            )}

            {/* PORTFOLIO TAB */}
            {previewTab === 'portfolio' && (
              <div className="space-y-4">
                {previewPortfolio.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {previewPortfolio.map(proj => (
                      <div key={proj.id} className="bg-white p-5 rounded-lg border border-gray-150 shadow-sm flex flex-col justify-between hover:shadow transition-shadow">
                        <div>
                          <span className="text-[10px] font-bold text-[#0A0A0A] uppercase tracking-wider block mb-1">{proj.category}</span>
                          <h5 className="font-bold text-gray-800 text-sm">{proj.name}</h5>
                          <p className="text-xs text-gray-400 mt-1 leading-relaxed">{proj.description || 'No project description supplied.'}</p>
                          
                          <div className="flex flex-wrap gap-1 mt-3">
                            {proj.tech_stack.split('+').map(t => (
                              <span key={t} className="px-2 py-0.5 bg-[#F4F4F5] text-[#0A0A0A] rounded-[4px] text-[11px] font-bold uppercase tracking-wider">{t.trim()}</span>
                            ))}
                          </div>
                        </div>
                        <div className="mt-4 pt-3 border-t border-gray-100 text-[10px] text-gray-400 font-semibold">
                          Client: <span className="text-gray-700">{proj.client}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20 text-gray-400 text-xs">No content published to this section yet</div>
                )}
              </div>
            )}

            {/* CAREERS TAB */}
            {previewTab === 'careers' && (
              <div className="space-y-4">
                {previewCareers.length > 0 ? (
                  <div className="space-y-3">
                    {previewCareers.map(job => (
                      <div key={job.id} className="bg-white p-5 rounded-lg border border-gray-150 shadow-sm flex flex-col sm:flex-row justify-between sm:items-center gap-4 hover:shadow transition-shadow">
                        <div className="space-y-1">
                          <h5 className="font-bold text-gray-800 text-sm">{job.position}</h5>
                          <div className="flex items-center gap-2 text-[10px] text-gray-400 font-semibold">
                            <span>{job.department}</span>
                            <span>•</span>
                            <span className="capitalize">{job.type.replace('_', ' ')}</span>
                          </div>
                          <p className="text-xs text-gray-400 mt-2 leading-relaxed">{job.description || 'No description supplied.'}</p>
                        </div>
                        <div className="flex items-center gap-3 self-end sm:self-center">
                          <span className="text-[10px] px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full font-semibold">{job.applicants} applied</span>
                          <button className="px-3.5 py-1.5 bg-[#0A0A0A] text-white text-xs font-semibold rounded hover:bg-[#2C2C2C] transition-colors shadow-sm">Apply Now</button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20 text-gray-400 text-xs">No content published to this section yet</div>
                )}
              </div>
            )}

            {/* TEAM TAB */}
            {previewTab === 'team' && (
              <div className="space-y-4">
                {previewTeam.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {previewTeam.map(member => (
                      <div key={member.id} className="bg-white p-5 rounded-lg border border-gray-150 shadow-sm text-center flex flex-col justify-center hover:shadow transition-shadow">
                        <div className="w-12 h-12 bg-[#F4F4F5] text-[#0A0A0A] rounded-full flex items-center justify-center font-bold text-sm mx-auto mb-3 shadow-premium">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <h5 className="font-bold text-gray-800 text-sm">{member.name}</h5>
                        <p className="text-xs text-gray-500 mt-0.5">{member.role}</p>
                        <span className="mt-2.5 inline-block px-2 py-0.5 bg-[#F4F4F5] text-[#0A0A0A] rounded-[4px] text-[11px] font-bold uppercase tracking-wider w-max mx-auto">
                          {member.department}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20 text-gray-400 text-xs">No content published to this section yet</div>
                )}
              </div>
            )}

          </div>

          {/* Modal Footer Actions */}
          <div className="flex justify-end pt-4 border-t border-gray-100">
            <button 
              onClick={() => setIsPreviewOpen(false)}
              className="px-4 py-2 border-[1.5px] border-[#0A0A0A] text-[#0A0A0A] bg-white rounded-md hover:bg-[#F4F4F5] text-xs font-semibold cursor-pointer font-sans"
            >
              Close Simulator
            </button>
          </div>

        </div>
      </Modal>

    </div>
  );
}

// ==========================================
// 5. LOGIN PAGE VIEW
// ==========================================

function LoginView() {
  const { user, login } = useAppState();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (user) navigate('/');
  }, [user, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = login(email, password);
    if (success) navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F4F4F5] px-4 font-sans">
      
      {/* logo2.jpeg centered above card */}
      <div className="text-center mb-6">
        <img 
          src="/logo2.jpeg" 
          alt="Nexix Technology Icon" 
          className="w-[72px] h-[72px] object-contain rounded-2xl mx-auto mb-3 shadow-lg border border-zinc-200 bg-white"
        />
        <h2 className="text-2xl font-bold text-[#0A0A0A] tracking-tight">Nexix Admin</h2>
        <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-[0.2em] mt-1.5">Technology</p>
      </div>

      <div className="max-w-md w-full bg-white p-8 rounded-[16px] shadow-2xl border border-zinc-200">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1.5">Email Address</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400"><Mail className="w-4 h-4" /></span>
              <input 
                type="email"
                required
                className="w-full pl-9 pr-3 py-2.5 border border-[#D4D4D8] rounded-[7px] text-sm focus:outline-none focus:ring-1 focus:ring-[#0A0A0A] focus:border-[#0A0A0A] text-[#0A0A0A]"
                placeholder="admin@nexix.tech"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1.5">Password</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500"><Lock className="w-4 h-4" /></span>
              <input 
                type={showPassword ? 'text' : 'password'}
                required
                className="w-full pl-9 pr-10 py-2.5 border border-[#D4D4D8] rounded-[7px] text-sm focus:outline-none focus:ring-1 focus:ring-[#0A0A0A] focus:border-[#0A0A0A] text-[#0A0A0A]"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button 
            type="submit"
            className="w-full py-2.5 bg-[#0A0A0A] hover:bg-[#1A1A1A] text-white rounded-[7px] text-sm font-semibold transition-colors shadow-md cursor-pointer"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-gray-100 text-center text-[11px] text-gray-400">
          Demo: <span className="font-semibold text-gray-500">admin@nexix.tech</span> / <span className="font-semibold text-gray-500">admin123</span>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 6. DASHBOARD PAGE VIEW
// ==========================================

function DashboardView() {
  const { leads, portfolio, blogs, team, careers } = useAppState();
  const [isStatusExpanded, setIsStatusExpanded] = useState(true);

  // Live Time Tracker State
  const [trackerTime, setTrackerTime] = useState(8075); // starts at 02:14:35
  const [trackerRunning, setTrackerRunning] = useState(true);

  useEffect(() => {
    let interval = null;
    if (trackerRunning) {
      interval = setInterval(() => {
        setTrackerTime(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [trackerRunning]);

  const formatTrackerTime = (totalSeconds) => {
    const hrs = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const mins = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    const secs = String(totalSeconds % 60).padStart(2, '0');
    return `${hrs}:${mins}:${secs}`;
  };

  // Interactive Reminders State
  const [reminders, setReminders] = useState([
    { id: 1, text: 'Review Senior React Dev applications', completed: false, due: 'Today' },
    { id: 2, text: 'Schedule UI/UX design sync with client', completed: true, due: 'Yesterday' },
    { id: 3, text: 'Approve draft posts for the blog', completed: false, due: 'Tomorrow' }
  ]);

  const toggleReminder = (id) => {
    setReminders(prev => prev.map(r => r.id === id ? { ...r, completed: !r.completed } : r));
  };

  // Metric aggregates
  const totalLeads = leads.length;
  const newThisWeek = leads.filter(l => l.status === 'new').length;
  const totalProjects = portfolio.length;
  const liveProjects = portfolio.filter(p => p.visible).length;
  const totalBlogs = blogs.length;
  const draftsPending = blogs.filter(b => b.status === 'draft' || b.status === 'pending').length;
  const totalTeam = team.length;
  const activeTeam = team.filter(t => t.status === 'active').length;

  // Recent feeds
  const recentLeads = [...leads].reverse().slice(0, 5);
  const recentBlogs = [...blogs].reverse().slice(0, 5);
  const quickProjects = [...portfolio].slice(0, 4);

  // Group top services count
  const serviceCounts = {};
  leads.forEach(l => {
    serviceCounts[l.service] = (serviceCounts[l.service] || 0) + 1;
  });
  const topServices = Object.entries(serviceCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);

  const maxServiceCount = topServices.length > 0 ? Math.max(...topServices.map(s => s.count)) : 1;

  // Donut status stats
  const leadNewCount = leads.filter(l => l.status === 'new').length;
  const leadProgressCount = leads.filter(l => l.status === 'in_progress').length;
  const leadDoneCount = leads.filter(l => l.status === 'done').length;
  const totalDonut = leadNewCount + leadProgressCount + leadDoneCount || 1;
  const pNew = (leadNewCount / totalDonut) * 100;
  const pProgress = (leadProgressCount / totalDonut) * 100;

  return (
    <div className="space-y-6 text-left">
      
      {/* 4 Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Card 1: Total Leads - Hero Inverted */}
        <div className="metric-card-bg p-5 bg-[#0a0a0a] text-white rounded-xl shadow-premium flex items-start justify-between relative transition-all duration-200 hover:-translate-y-0.5 hover:shadow-premium-card group border border-[#1a1a1a]">
          {/* Subtle white EKG line overlay */}
          <div className="absolute inset-0 opacity-5 pointer-events-none flex items-center justify-center">
            <svg width="100%" height="100%" viewBox="0 0 100 40" fill="none">
              <path d="M0 20H30L35 10L40 30L45 15L50 25L55 20H100" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          
          <div className="h-full flex flex-col justify-between z-10">
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">Total Leads</span>
            <span className="text-[32px] font-extrabold text-white tracking-tight mt-1.5 block leading-none">{totalLeads}</span>
            <div className="flex items-center gap-1.5 mt-3.5">
              <span className="inline-flex bg-white text-black font-extrabold text-[10px] px-2 py-0.5 rounded-full select-none">
                ↑ vs last month
              </span>
            </div>
          </div>
          <div className="w-10 h-10 bg-white/10 text-white rounded-lg flex items-center justify-center shadow-inner shrink-0 group-hover:scale-105 transition-transform z-10"><FileText className="w-4.5 h-4.5" /></div>
        </div>

        {/* Card 2: Active Projects */}
        <div className="metric-card-bg p-5 bg-white rounded-xl border border-[#e4e4e7] shadow-premium flex items-start justify-between relative transition-all duration-200 hover:-translate-y-0.5 hover:shadow-premium-card group">
          <div className="h-full flex flex-col justify-between">
            <span className="text-[10px] font-bold text-[#71717a] uppercase tracking-wider block">Active Projects</span>
            <span className="text-[32px] font-extrabold text-[#0a0a0a] tracking-tight mt-1.5 block leading-none">{liveProjects} / {totalProjects}</span>
            <div className="flex items-center gap-1.5 mt-3.5">
              <span className="inline-flex bg-[#f4f4f5] text-[#3f3f46] font-extrabold text-[10px] px-2 py-0.5 rounded-full border border-[#e4e4e7] select-none">
                ↑ vs last month
              </span>
            </div>
          </div>
          <div className="w-10 h-10 bg-[#f4f4f5] text-[#0a0a0a] rounded-lg flex items-center justify-center shadow-inner shrink-0 group-hover:scale-105 transition-transform border border-[#e4e4e7]"><Briefcase className="w-4.5 h-4.5" /></div>
        </div>

        {/* Card 3: Blog Posts */}
        <div className="metric-card-bg p-5 bg-white rounded-xl border border-[#e4e4e7] shadow-premium flex items-start justify-between relative transition-all duration-200 hover:-translate-y-0.5 hover:shadow-premium-card group">
          <div className="h-full flex flex-col justify-between">
            <span className="text-[10px] font-bold text-[#71717a] uppercase tracking-wider block">Blog Posts</span>
            <span className="text-[32px] font-extrabold text-[#0a0a0a] tracking-tight mt-1.5 block leading-none">{totalBlogs}</span>
            <div className="flex items-center gap-1.5 mt-3.5">
              <span className="inline-flex bg-[#f4f4f5] text-[#3f3f46] font-extrabold text-[10px] px-2 py-0.5 rounded-full border border-[#e4e4e7] select-none">
                {draftsPending} drafts pending
              </span>
            </div>
          </div>
          <div className="w-10 h-10 bg-[#f4f4f5] text-[#0a0a0a] rounded-lg flex items-center justify-center shadow-inner shrink-0 group-hover:scale-105 transition-transform border border-[#e4e4e7]"><BookOpen className="w-4.5 h-4.5" /></div>
        </div>

        {/* Card 4: Team Members */}
        <div className="metric-card-bg p-5 bg-white rounded-xl border border-[#e4e4e7] shadow-premium flex items-start justify-between relative transition-all duration-200 hover:-translate-y-0.5 hover:shadow-premium-card group">
          <div className="h-full flex flex-col justify-between">
            <span className="text-[10px] font-bold text-[#71717a] uppercase tracking-wider block">Team Members</span>
            <span className="text-[32px] font-extrabold text-[#0a0a0a] tracking-tight mt-1.5 block leading-none">{activeTeam} / {totalTeam}</span>
            <div className="flex items-center gap-1.5 mt-3.5">
              <span className="inline-flex bg-[#f4f4f5] text-[#3f3f46] font-extrabold text-[10px] px-2 py-0.5 rounded-full border border-[#e4e4e7] select-none">
                Active Directory
              </span>
            </div>
          </div>
          <div className="w-10 h-10 bg-[#f4f4f5] text-[#0a0a0a] rounded-lg flex items-center justify-center shadow-inner shrink-0 group-hover:scale-105 transition-transform border border-[#e4e4e7]"><Users className="w-4.5 h-4.5" /></div>
        </div>

      </div>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Columns - Analytics & Tables */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Charts Card */}
          <div className="bg-white rounded-xl border border-[#e4e4e7] shadow-premium p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#e4e4e7] pb-4 mb-6">
              <div>
                <h3 className="text-sm font-bold text-[#0a0a0a] uppercase tracking-wider">Analytics & Distribution</h3>
                <p className="text-[11px] text-[#71717a] mt-0.5">Performance tracking and lead allocation overview.</p>
              </div>
              <span className="text-[10px] bg-[#f4f4f5] text-[#3f3f46] px-2.5 py-1 rounded-md font-bold uppercase tracking-wider border border-[#e4e4e7] mt-2 sm:mt-0">
                Weekly Breakdown
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              
              {/* Analytics Weekly Chart */}
              <div>
                <h4 className="text-[10px] font-extrabold text-[#71717a] uppercase tracking-wider mb-2">Weekly Site Analytics</h4>
                <div className="flex justify-between items-end h-40 pt-4 px-2 bg-[#fafafa] rounded-lg border border-[#e4e4e7]">
                  {[
                    { day: 'M', val: '55%', hatched: false },
                    { day: 'T', val: '80%', hatched: true },
                    { day: 'W', val: '40%', hatched: false },
                    { day: 'T', val: '95%', hatched: true },
                    { day: 'F', val: '65%', hatched: false },
                    { day: 'S', val: '30%', hatched: true },
                    { day: 'S', val: '70%', hatched: false }
                  ].map((item, idx) => (
                    <div key={idx} className="flex flex-col items-center flex-1">
                      <div className="w-5 sm:w-6 bg-zinc-250 h-28 flex items-end overflow-hidden relative rounded-t-[4px]">
                        <div 
                          className={`w-full rounded-t-[4px] transition-all duration-500 ${item.hatched ? 'bar-hatched' : 'bg-[#0a0a0a]'}`} 
                          style={{ height: item.val }}
                        />
                      </div>
                      <span className="text-[9px] font-bold text-zinc-400 mt-1.5">{item.day}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Lead Status breakdown */}
              <div className="flex flex-col items-center">
                <h4 className="text-[10px] font-extrabold text-[#71717a] uppercase tracking-wider mb-2 self-start md:pl-6">Lead Allocation</h4>
                <div className="flex items-center justify-center w-full gap-6">
                  <div 
                    className="w-28 h-28 rounded-full relative flex items-center justify-center shadow-inner shrink-0 border border-[#e4e4e7]"
                    style={{
                      background: `conic-gradient(#0a0a0a 0% ${pNew}%, #a1a1aa ${pNew}% ${pNew + pProgress}%, #e4e4e7 ${pNew + pProgress}% 100%)`
                    }}
                  >
                    <div className="w-18 h-18 bg-white rounded-full flex flex-col items-center justify-center shadow-md border border-[#e4e4e7]">
                      <span className="text-[8px] font-bold text-zinc-400 uppercase tracking-widest leading-none">Total</span>
                      <span className="text-md font-black text-[#0a0a0a] leading-none mt-0.5">{totalLeads}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2.5 text-xs text-left">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-sm bg-[#0a0a0a] border border-[#0a0a0a]" />
                      <span className="font-medium text-slate-750">New ({leadNewCount})</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-sm bg-[#a1a1aa]" />
                      <span className="font-medium text-slate-750">In Progress ({leadProgressCount})</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-sm bg-[#e4e4e7] border border-[#d4d4d8]" />
                      <span className="font-medium text-slate-755">Done ({leadDoneCount})</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Activity Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Recent Leads */}
            <div className="bg-white rounded-xl border border-[#e4e4e7] shadow-premium p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-[#e4e4e7] pb-3 mb-4.5">
                  <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Recent Leads</h3>
                  <Link to="/leads" className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 hover:text-black transition-colors flex items-center gap-0.5">
                    View All <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
                <div className="space-y-3.5">
                  {recentLeads.map(lead => {
                    const initials = lead.name.split(' ').map(n => n[0]).join('');
                    return (
                      <div key={lead.id} className="flex items-center justify-between border-b border-dashed border-zinc-100 pb-2.5 last:border-b-0 last:pb-0">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="w-7 h-7 rounded-full bg-[#f4f4f5] text-[#0a0a0a] border border-[#e4e4e7] text-[10px] font-bold flex items-center justify-center shrink-0">
                            {initials}
                          </div>
                          <div className="min-w-0 text-left">
                            <div className="text-xs font-bold text-slate-800 truncate">{lead.name}</div>
                            <div className="text-[9px] text-zinc-400 font-bold uppercase tracking-wider truncate">{lead.service}</div>
                          </div>
                        </div>
                        <span className={`px-2 py-0.5 text-[8px] font-bold rounded-full uppercase tracking-wider shrink-0 select-none ${
                          lead.status === 'new' ? 'bg-[#fafafa] text-[#71717a] border border-[#a1a1aa]' :
                          lead.status === 'in_progress' ? 'bg-[#f4f4f5] text-[#3f3f46] border border-[#e4e4e7]' :
                          'bg-[#0a0a0a] text-white'
                        }`}>
                          {lead.status.replace('_', ' ')}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Latest Blogs */}
            <div className="bg-white rounded-xl border border-[#e4e4e7] shadow-premium p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-[#e4e4e7] pb-3 mb-4.5">
                  <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Latest Articles</h3>
                  <Link to="/blog" className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 hover:text-black transition-colors flex items-center gap-0.5">
                    View All <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
                <div className="space-y-3.5">
                  {recentBlogs.map(post => (
                    <div key={post.id} className="flex items-start gap-2 border-b border-dashed border-zinc-100 pb-2.5 last:border-b-0 last:pb-0 text-left">
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-slate-800 truncate leading-tight hover:text-black transition-colors">{post.title}</div>
                        <div className="flex items-center gap-1.5 mt-1 text-[9px] text-zinc-400 font-semibold">
                          <span>by {post.author}</span>
                          <span>•</span>
                          <span className="uppercase tracking-wider">{post.category}</span>
                        </div>
                      </div>
                      <span className={`px-1.5 py-0.2 text-[8px] font-bold rounded uppercase tracking-wider shrink-0 select-none ${
                        post.status === 'published' ? 'bg-[#0a0a0a] text-white' :
                        post.status === 'pending' ? 'bg-[#f4f4f5] text-[#3f3f46] border border-[#e4e4e7]' :
                        'bg-[#fafafa] text-[#71717a] border border-[#a1a1aa]'
                      }`}>
                        {post.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Right Column - Widgets */}
        <div className="space-y-6">
          
          {/* Widget 1: Live Time Tracker */}
          <div className="bg-[#0a0a0a] text-white p-5 rounded-xl border border-[#1a1a1a] shadow-premium relative overflow-hidden flex flex-col justify-between h-48">
            {/* Background vector EKG design */}
            <div className="absolute inset-0 opacity-10 pointer-events-none flex items-center justify-center">
              <svg width="100%" height="100%" viewBox="0 0 100 40" fill="none">
                <path d="M0 20H20L25 5L30 35L35 15L40 25L45 20H100" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="pulse-animate-once" />
              </svg>
            </div>

            <div className="z-10 flex items-center justify-between">
              <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest block">Work Session Tracker</span>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
            </div>

            <div className="z-10 text-center my-3">
              <span className="text-4xl font-extrabold font-mono tracking-wider block">{formatTrackerTime(trackerTime)}</span>
            </div>

            <div className="z-10 flex items-center justify-between pt-2 border-t border-zinc-800">
              <span className="text-[10px] text-zinc-400 font-medium font-sans">Active Session: Nexix Admin Redesign</span>
              <button 
                onClick={() => setTrackerRunning(!trackerRunning)}
                className="p-1.5 rounded-lg bg-white text-black hover:bg-zinc-200 transition-colors focus:outline-none flex items-center justify-center cursor-pointer"
              >
                {trackerRunning ? <Pause className="w-3.5 h-3.5 stroke-[2.5]" /> : <Play className="w-3.5 h-3.5 stroke-[2.5] fill-black" />}
              </button>
            </div>
          </div>

          {/* Widget 2: Up Next Reminders */}
          <div className="bg-white rounded-xl border border-[#e4e4e7] shadow-premium p-5">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider border-b border-[#e4e4e7] pb-3 mb-4 text-left">Up Next</h3>
            <div className="space-y-3.5 text-left">
              {reminders.map(rem => (
                <div key={rem.id} className="flex items-start justify-between gap-3 border-b border-dashed border-zinc-100 pb-2.5 last:border-b-0 last:pb-0">
                  <div className="flex items-start gap-2.5 min-w-0">
                    <input 
                      type="checkbox"
                      checked={rem.completed}
                      onChange={() => toggleReminder(rem.id)}
                      className="mt-1 h-3.5 w-3.5 rounded border-[#e4e4e7] text-black focus:ring-black cursor-pointer bg-white accent-black"
                    />
                    <span className={`text-xs font-medium min-w-0 truncate ${rem.completed ? 'line-through text-zinc-400 font-bold' : 'text-slate-700'}`}>
                      {rem.text}
                    </span>
                  </div>
                  <span className={`text-[9px] font-bold uppercase tracking-wider shrink-0 select-none ${
                    rem.completed ? 'text-zinc-400' :
                    rem.due === 'Today' ? 'text-black' :
                    'text-zinc-400'
                  }`}>
                    {rem.due}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Widget 3: Quick Projects */}
          <div className="bg-white rounded-xl border border-[#e4e4e7] shadow-premium p-5">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider border-b border-[#e4e4e7] pb-3 mb-4 text-left">Quick Projects</h3>
            <div className="space-y-3.5 text-left">
              {quickProjects.map(proj => (
                <div key={proj.id} className="flex items-center justify-between border-b border-dashed border-zinc-100 pb-2.5 last:border-b-0 last:pb-0">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-[#fafafa] border border-[#e4e4e7] flex items-center justify-center shrink-0">
                      <Briefcase className="w-4 h-4 text-zinc-500" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-slate-800 truncate">{proj.name}</div>
                      <div className="text-[9px] text-zinc-400 font-bold uppercase tracking-wider truncate">{proj.client}</div>
                    </div>
                  </div>
                  <span className={`px-2 py-0.5 text-[8px] font-bold rounded-full uppercase tracking-wider shrink-0 select-none ${
                    proj.visible ? 'bg-[#0a0a0a] text-white' : 'bg-[#fafafa] text-[#71717a] border border-[#a1a1aa]'
                  }`}>
                    {proj.visible ? 'Live' : 'Hidden'}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

// ==========================================
// 7. LEADS PAGE VIEW (IN-MEMORY CRUD)
// ==========================================

function LeadsView() {
  const { leads, setLeads, addToast } = useAppState();
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);

  // Modal forms
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', service: '', source: '', notes: '', status: 'new'
  });

  // Filter & Search
  const filtered = leads.filter(l => 
    l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.service.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const itemsPerPage = 10;
  const totalPages = Math.ceil(filtered.length / itemsPerPage) || 1;
  const paginated = filtered.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const handleOpenAdd = () => {
    setSelectedLead(null);
    setFormData({ name: '', email: '', phone: '', service: '', source: '', notes: '', status: 'new' });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (lead) => {
    setSelectedLead(lead);
    setFormData({ ...lead });
    setIsModalOpen(true);
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete lead ${name}?`)) {
      setLeads(prev => prev.filter(l => l.id !== id));
      addToast(`Lead "${name}" deleted successfully`, 'info');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.service.trim() || !formData.source.trim()) {
      addToast('Please fill in all mandatory fields', 'error');
      return;
    }

    if (selectedLead) {
      setLeads(prev => prev.map(l => l.id === selectedLead.id ? { ...l, ...formData } : l));
      addToast(`Lead "${formData.name}" details updated`, 'success');
    } else {
      const newLead = {
        id: Date.now().toString(),
        ...formData,
        created_at: new Date().toISOString().split('T')[0]
      };
      setLeads(prev => [newLead, ...prev]);
      addToast(`New lead "${formData.name}" created`, 'success');
    }
    setIsModalOpen(false);
  };

  const badge = {
    new: 'bg-[#fafafa] text-[#71717a] border border-[#a1a1aa] rounded-full',
    in_progress: 'bg-[#f4f4f5] text-[#3f3f46] border border-[#e4e4e7] rounded-full',
    done: 'bg-[#0a0a0a] text-white rounded-full'
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* Page Header */}
      <div className="pb-5 border-b border-slate-200">
        <h1 className="text-[22px] font-extrabold text-slate-800 tracking-tight">Leads Inquiries</h1>
        <p className="text-[12px] text-slate-500 mt-1">Manage, qualify, and update incoming corporate inquiries.</p>
      </div>

      {/* Search and Action Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400"><Search className="w-4 h-4" /></span>
          <input 
            type="text"
            placeholder="Search leads name or service..."
            value={searchTerm}
            onChange={e => { setSearchTerm(e.target.value); setPage(1); }}
            className="w-full h-10 pl-10 pr-4 border border-slate-200 rounded-lg text-xs text-slate-700 placeholder-slate-400 bg-white shadow-sm focus:outline-none focus:border-[#0a0a0a] focus:ring-2 focus:ring-[#0a0a0a]/10 transition-all"
          />
        </div>
        <button 
          onClick={handleOpenAdd}
          className="h-10 px-5 bg-[#0a0a0a] hover:bg-[#1f1f1f] active:scale-[0.97] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-all shadow-sm flex items-center justify-center cursor-pointer"
        >
          <Plus className="w-4 h-4 mr-1.5 shrink-0 stroke-[2.5]" /> Add Lead
        </button>
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-premium overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full table-container">
            <thead>
              <tr className="border-b border-slate-100 text-left bg-slate-50/50">
                <th className="px-6 py-3.5 text-[10px] font-bold text-slate-450 uppercase tracking-wider">Lead Profile</th>
                <th className="px-6 py-3.5 text-[10px] font-bold text-slate-450 uppercase tracking-wider">Requested Service</th>
                <th className="px-6 py-3.5 text-[10px] font-bold text-slate-450 uppercase tracking-wider">Referral Source</th>
                <th className="px-6 py-3.5 text-[10px] font-bold text-slate-450 uppercase tracking-wider">Date Logged</th>
                <th className="px-6 py-3.5 text-[10px] font-bold text-slate-450 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3.5 text-[10px] font-bold text-slate-450 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginated.length > 0 ? (
                paginated.map(lead => (
                  <tr key={lead.id} className="table-row">
                    <td className="px-6 py-3.5">
                      <div className="text-xs font-bold text-slate-800">{lead.name}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">{lead.email}</div>
                    </td>
                    <td className="px-6 py-3.5 text-xs font-semibold text-slate-600">{lead.service}</td>
                    <td className="px-6 py-3.5 text-xs text-slate-500">{lead.source}</td>
                    <td className="px-6 py-3.5 text-xs text-slate-400">{lead.created_at}</td>
                    <td className="px-6 py-3.5">
                      <span className={`px-2.5 py-0.8 text-[9px] font-bold rounded-full uppercase tracking-wider shadow-[0_1px_2px_rgba(0,0,0,0.01)] ${badge[lead.status]}`}>
                        {lead.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-3.5 text-right space-x-1">
                      <button onClick={() => handleOpenEdit(lead)} className="p-1.5 rounded-md text-slate-400 hover:text-[#0a0a0a] active:scale-[0.97] transition-all" title="Edit lead"><Edit2 className="w-3.5 h-3.5" /></button>
                      <button onClick={() => handleDelete(lead.id, lead.name)} className="p-1.5 rounded-md text-slate-400 hover:text-red-650 active:scale-[0.97] transition-all" title="Delete lead"><Trash2 className="w-3.5 h-3.5" /></button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-xs text-slate-400">
                    No leads found matching criteria. <button onClick={handleOpenAdd} className="text-[#0a0a0a] font-bold underline cursor-pointer">Create new entry</button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/40 flex flex-col sm:flex-row items-center justify-center gap-4 relative">
            <div className="sm:absolute sm:left-6 text-[11px] text-slate-400 font-bold">
              Showing page {page} of {totalPages} ({filtered.length} entries)
            </div>
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-3 py-1.5 border border-slate-200 text-[10px] font-bold rounded-full text-slate-500 hover:text-[#0a0a0a] hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none transition-all active:scale-[0.97] cursor-pointer"
              >
                Previous
              </button>
              
              <div className="w-7 h-7 rounded-full bg-[#0a0a0a] text-white text-[10px] font-bold flex items-center justify-center shadow-sm select-none">
                {page}
              </div>
              
              <button 
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-3 py-1.5 border border-slate-200 text-[10px] font-bold rounded-full text-slate-500 hover:text-[#0a0a0a] hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none transition-all active:scale-[0.97] cursor-pointer"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Add / Edit Form Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={selectedLead ? 'Edit Lead Details' : 'Add New Lead Entry'}>
        <form onSubmit={handleSubmit} className="space-y-4 font-sans text-left">
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Name *</label>
            <input 
              type="text" required
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-[#0a0a0a] focus:ring-1 focus:ring-[#0a0a0a] text-slate-800"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Email Address *</label>
              <input 
                type="email" required
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-[#0a0a0a] focus:ring-1 focus:ring-[#0a0a0a] text-slate-800"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Phone Number</label>
              <input 
                type="text"
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-[#0a0a0a] focus:ring-1 focus:ring-[#0a0a0a] text-slate-800"
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Requested Service *</label>
              <input 
                type="text" required placeholder="e.g. Web Development"
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-[#0a0a0a] focus:ring-1 focus:ring-[#0a0a0a] text-slate-800"
                value={formData.service}
                onChange={e => setFormData({ ...formData, service: e.target.value })}
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Referral Source *</label>
              <input 
                type="text" required placeholder="e.g. LinkedIn"
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-[#0a0a0a] focus:ring-1 focus:ring-[#0a0a0a] text-slate-800"
                value={formData.source}
                onChange={e => setFormData({ ...formData, source: e.target.value })}
              />
            </div>
          </div>
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Pipeline Status</label>
            <select 
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-[#0a0a0a] focus:ring-1 focus:ring-[#0a0a0a] text-slate-850 bg-white"
              value={formData.status}
              onChange={e => setFormData({ ...formData, status: e.target.value })}
            >
              <option value="new">New</option>
              <option value="in_progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Internal Notes</label>
            <textarea 
              rows="3"
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-[#0a0a0a] focus:ring-1 focus:ring-[#0a0a0a] text-slate-800"
              value={formData.notes}
              onChange={e => setFormData({ ...formData, notes: e.target.value })}
            />
          </div>
          <div className="flex justify-end space-x-3 pt-4 border-t border-slate-100">
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border border-slate-200 text-slate-500 bg-white rounded-lg hover:bg-slate-55 text-xs font-bold uppercase tracking-wider cursor-pointer">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-[#0a0a0a] hover:bg-[#1f1f1f] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-all shadow-sm cursor-pointer">Save Lead</button>
          </div>
        </form>
      </Modal>

    </div>
  );
}

// ==========================================
// 8. PORTFOLIO PAGE VIEW (IN-MEMORY CRUD)
// ==========================================

function PortfolioView() {
  const { portfolio, setPortfolio, addToast } = useAppState();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  // Modals & Form
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [formData, setFormData] = useState({
    name: '', category: '', tech_stack: '', client: '', description: '', visible: true
  });

  const categories = [...new Set(portfolio.map(p => p.category))].filter(Boolean);

  const filtered = portfolio.filter(p => {
    const matchesSearch = p.client.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = categoryFilter === '' || p.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  const handleOpenAdd = () => {
    setSelectedProject(null);
    setFormData({ name: '', category: '', tech_stack: '', client: '', description: '', visible: true });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (project) => {
    setSelectedProject(project);
    setFormData({ ...project });
    setIsModalOpen(true);
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to remove project "${name}"?`)) {
      setPortfolio(portfolio.filter(p => p.id !== id));
      addToast(`Project "${name}" removed`, 'info');
    }
  };

  // Quick Action row toggle visibility
  const toggleVisibility = (id) => {
    const target = portfolio.find(p => p.id === id);
    const updatedVisible = !target.visible;
    setPortfolio(portfolio.map(p => p.id === id ? { ...p, visible: updatedVisible } : p));
    
    if (updatedVisible) {
      addToast('✓ Now live on website', 'success');
    } else {
      addToast('Removed from website', 'info');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.category.trim() || !formData.tech_stack.trim() || !formData.client.trim()) {
      addToast('Please fill in all mandatory fields', 'error');
      return;
    }

    if (selectedProject) {
      setPortfolio(portfolio.map(p => p.id === selectedProject.id ? { ...p, ...formData } : p));
      addToast(`Project "${formData.name}" details updated`, 'success');
    } else {
      const newProj = {
        id: Date.now().toString(),
        ...formData,
        created_at: new Date().toISOString().split('T')[0]
      };
      setPortfolio([newProj, ...portfolio]);
      addToast(`New project "${formData.name}" added`, 'success');
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* Page Header */}
      <div className="pb-5 border-b border-slate-200">
        <h1 className="text-[22px] font-extrabold text-slate-800 tracking-tight">Portfolio</h1>
        <p className="text-[12px] text-slate-500 mt-1">Manage project case studies and showcase gallery visibility.</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1">
          <div className="relative flex-1 max-w-sm">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400"><Search className="w-4 h-4" /></span>
            <input 
              type="text"
              placeholder="Search project, category or client..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full h-10 pl-10 pr-4 border border-slate-200 rounded-lg text-xs text-slate-700 placeholder-slate-400 bg-white shadow-sm focus:outline-none focus:border-[#0a0a0a] focus:ring-2 focus:ring-[#0a0a0a]/10 transition-all"
            />
          </div>

          <select
            value={categoryFilter}
            onChange={e => setCategoryFilter(e.target.value)}
            className="h-10 px-3.5 border border-slate-200 rounded-lg text-xs bg-white text-slate-600 focus:outline-none focus:border-[#0a0a0a] focus:ring-2 focus:ring-[#0a0a0a]/10 transition-all shadow-sm"
          >
            <option value="">All Categories</option>
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>

        <button 
          onClick={handleOpenAdd}
          className="h-10 px-5 bg-[#0a0a0a] hover:bg-[#1f1f1f] active:scale-[0.97] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-all shadow-sm flex items-center justify-center cursor-pointer"
        >
          <Plus className="w-4 h-4 mr-1.5 shrink-0 stroke-[2.5]" /> Add Project
        </button>
      </div>

      {/* Portfolio Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-premium overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full table-container">
            <thead>
              <tr className="border-b border-slate-100 text-left bg-slate-50/50">
                <th className="px-6 py-3.5 text-[10px] font-bold text-slate-450 uppercase tracking-wider">Project Name</th>
                <th className="px-6 py-3.5 text-[10px] font-bold text-slate-450 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3.5 text-[10px] font-bold text-slate-450 uppercase tracking-wider">Tech Stack</th>
                <th className="px-6 py-3.5 text-[10px] font-bold text-slate-450 uppercase tracking-wider">Client</th>
                <th className="px-6 py-3.5 text-[10px] font-bold text-slate-450 uppercase tracking-wider">Show on Website</th>
                <th className="px-6 py-3.5 text-[10px] font-bold text-slate-450 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length > 0 ? (
                filtered.map(proj => (
                  <tr key={proj.id} className="table-row">
                    <td className="px-6 py-3.5 font-bold text-slate-800 text-xs">{proj.name}</td>
                    <td className="px-6 py-3.5 text-xs font-semibold text-slate-500">{proj.category}</td>
                    <td className="px-6 py-3.5 text-xs">
                      <div className="flex flex-wrap gap-1 max-w-[280px]">
                        {proj.tech_stack.split(',').map(t => (
                          <span key={t} className="px-2 py-0.5 bg-slate-50 text-slate-500 rounded-[4px] text-[10px] font-bold tracking-wide uppercase border border-slate-150">{t.trim()}</span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-3.5 text-xs text-slate-700 font-semibold">{proj.client}</td>
                    <td className="px-6 py-3.5">
                      {proj.visible ? (
                        <span className="inline-flex items-center px-2.5 py-0.8 text-[9px] font-bold rounded-full bg-[#0a0a0a] text-white shadow-[0_1px_2px_rgba(0,0,0,0.01)]">
                          Live on Site
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.8 text-[9px] font-bold rounded-full bg-slate-50 text-slate-400 border border-slate-200 shadow-[0_1px_2px_rgba(0,0,0,0.01)]">
                          Hidden
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-3.5 text-right space-x-1">
                      {/* Quick Toggle Action Eye */}
                      <button 
                        onClick={() => toggleVisibility(proj.id)}
                        className={`p-1.5 rounded-md hover:bg-slate-50 transition-colors active:scale-[0.97] ${proj.visible ? 'text-[#0a0a0a]' : 'text-slate-400 hover:text-[#0a0a0a]'}`}
                        title={proj.visible ? 'Hide from website' : 'Show on website'}
                      >
                        {proj.visible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                      </button>
                      <button onClick={() => handleOpenEdit(proj)} className="p-1.5 rounded-md text-slate-400 hover:text-[#0a0a0a] active:scale-[0.97]" title="Edit project"><Edit2 className="w-3.5 h-3.5" /></button>
                      <button onClick={() => handleDelete(proj.id, proj.name)} className="p-1.5 rounded-md text-slate-400 hover:text-red-650 active:scale-[0.97] transition-all" title="Remove project"><Trash2 className="w-3.5 h-3.5" /></button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-xs text-slate-400">
                    No projects found matching criteria. <button onClick={handleOpenAdd} className="text-[#0a0a0a] font-bold underline cursor-pointer">Add your first project</button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* FORM MODAL */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={selectedProject ? 'Edit Project Details' : 'Add New Project'}>
        <form onSubmit={handleSubmit} className="space-y-4 font-sans text-left">
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Project Name *</label>
            <input 
              type="text" required
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-[#0a0a0a] focus:ring-1 focus:ring-[#0a0a0a] text-slate-800"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Category *</label>
              <input 
                type="text" required placeholder="e.g. E-Commerce"
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-[#0a0a0a] focus:ring-1 focus:ring-[#0a0a0a] text-slate-800"
                value={formData.category}
                onChange={e => setFormData({ ...formData, category: e.target.value })}
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Client *</label>
              <input 
                type="text" required placeholder="e.g. RetailCo"
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-[#0a0a0a] focus:ring-1 focus:ring-[#0a0a0a] text-slate-800"
                value={formData.client}
                onChange={e => setFormData({ ...formData, client: e.target.value })}
              />
            </div>
          </div>
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Tech Stack * (separate tools with commas)</label>
            <input 
              type="text" required placeholder="React, Node.js, PostgreSQL"
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-[#0a0a0a] focus:ring-1 focus:ring-[#0a0a0a] text-slate-800"
              value={formData.tech_stack}
              onChange={e => setFormData({ ...formData, tech_stack: e.target.value })}
            />
          </div>
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Description</label>
            <textarea 
              rows="3"
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-[#0a0a0a] focus:ring-1 focus:ring-[#0a0a0a] text-slate-800"
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
            />
          </div>
          
          <div className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-150 rounded-lg">
            <span className="text-xs font-bold text-slate-600 uppercase tracking-wider block">Show on Website</span>
            <ToggleSwitch 
              checked={formData.visible}
              onChange={() => setFormData({ ...formData, visible: !formData.visible })}
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-slate-100">
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border border-slate-200 text-slate-500 bg-white rounded-lg hover:bg-slate-55 text-xs font-bold uppercase tracking-wider cursor-pointer">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-[#0a0a0a] hover:bg-[#1f1f1f] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-all shadow-sm cursor-pointer">Save Project</button>
          </div>
        </form>
      </Modal>

    </div>
  );
}

// ==========================================
// 9. BLOG POSTS PAGE VIEW (IN-MEMORY CRUD)
// ==========================================

function BlogView() {
  const { blogs, setBlogs, addToast } = useAppState();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // Modals & Form
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [formData, setFormData] = useState({
    title: '', author: '', category: '', content: '', status: 'draft', publishedToSite: false
  });

  const filtered = blogs.filter(b => {
    const matchesSearch = b.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          b.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          b.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === '' || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleOpenAdd = () => {
    setSelectedPost(null);
    setFormData({ title: '', author: '', category: '', content: '', status: 'draft', publishedToSite: false });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (post) => {
    setSelectedPost(post);
    setFormData({ ...post });
    setIsModalOpen(true);
  };

  const handleDelete = (id, title) => {
    if (window.confirm(`Are you sure you want to delete post "${title}"?`)) {
      setBlogs(blogs.filter(b => b.id !== id));
      addToast(`Post "${title}" deleted`, 'info');
    }
  };

  // Quick Action row toggle publish to website
  const togglePublish = (id) => {
    const post = blogs.find(b => b.id === id);
    if (post.status !== 'published') return;
    
    const updatedPublish = !post.publishedToSite;
    setBlogs(blogs.map(b => b.id === id ? { ...b, publishedToSite: updatedPublish } : b));
    
    if (updatedPublish) {
      addToast('✓ Now live on website', 'success');
    } else {
      addToast('Removed from website', 'info');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.author.trim() || !formData.category.trim()) {
      addToast('Please fill in all mandatory fields', 'error');
      return;
    }

    const statusVal = formData.status;
    const finalPublish = statusVal === 'published' ? formData.publishedToSite : false;

    if (selectedPost) {
      const updated = {
        ...formData,
        status: statusVal,
        publishedToSite: finalPublish,
        published_at: statusVal === 'published' ? (selectedPost.published_at || new Date().toISOString().split('T')[0]) : null
      };
      setBlogs(blogs.map(b => b.id === selectedPost.id ? updated : b));
      addToast(`Article "${formData.title}" updated`, 'success');
    } else {
      const newPost = {
        id: Date.now().toString(),
        ...formData,
        status: statusVal,
        publishedToSite: finalPublish,
        published_at: statusVal === 'published' ? new Date().toISOString().split('T')[0] : null
      };
      setBlogs([newPost, ...blogs]);
      addToast(`New post "${formData.title}" created`, 'success');
    }
    setIsModalOpen(false);
  };

  const badge = {
    published: 'bg-[#0a0a0a] text-white rounded-full',
    draft: 'bg-[#fafafa] text-[#71717a] border border-[#a1a1aa] rounded-full',
    pending: 'bg-[#f4f4f5] text-[#3f3f46] border border-[#e4e4e7] rounded-full'
  };

  const displayBadge = {
    live: 'bg-[#0a0a0a] text-white border border-transparent'
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* Page Header */}
      <div className="pb-5 border-b border-slate-200">
        <h1 className="text-[22px] font-extrabold text-slate-800 tracking-tight">Blog Articles</h1>
        <p className="text-[12px] text-slate-500 mt-1">Write, edit, and publish technology articles to the website.</p>
      </div>

      {/* Search & Tabs */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
        
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1">
          <div className="relative flex-1 max-w-sm">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-450"><Search className="w-4 h-4" /></span>
            <input 
              type="text"
              placeholder="Search title or author..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full h-10 pl-10 pr-4 border border-slate-200 rounded-lg text-xs text-slate-700 placeholder-slate-400 bg-white shadow-sm focus:outline-none focus:border-[#0a0a0a] focus:ring-2 focus:ring-[#0a0a0a]/10 transition-all"
            />
          </div>

          <div className="flex border border-slate-200 rounded-lg overflow-hidden bg-white shadow-sm">
            {['', 'published', 'draft', 'pending'].map((tab, idx) => (
              <button
                key={tab}
                onClick={() => setStatusFilter(tab)}
                className={`px-4 py-2 text-xs font-bold uppercase transition-all duration-150 cursor-pointer ${
                  idx > 0 ? 'border-l border-slate-200' : ''
                } ${
                  statusFilter === tab 
                    ? 'bg-[#0a0a0a] text-white' 
                    : 'bg-white text-slate-500 hover:text-slate-800 hover:bg-slate-55'
                }`}
              >
                {tab === '' ? 'All' : tab}
              </button>
            ))}
          </div>
        </div>

        <button 
          onClick={handleOpenAdd}
          className="h-10 px-5 bg-[#0a0a0a] hover:bg-[#1f1f1f] active:scale-[0.97] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-all shadow-sm flex items-center justify-center cursor-pointer"
        >
          <Plus className="w-4 h-4 mr-1.5 shrink-0 stroke-[2.5]" /> Add Post
        </button>
      </div>

      {/* Blogs Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-premium overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full table-container">
            <thead>
              <tr className="border-b border-slate-100 text-left bg-slate-50/50">
                <th className="px-6 py-3.5 text-[10px] font-bold text-slate-450 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3.5 text-[10px] font-bold text-slate-450 uppercase tracking-wider">Author</th>
                <th className="px-6 py-3.5 text-[10px] font-bold text-slate-450 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3.5 text-[10px] font-bold text-slate-450 uppercase tracking-wider">Published Date</th>
                <th className="px-6 py-3.5 text-[10px] font-bold text-slate-450 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3.5 text-[10px] font-bold text-slate-450 uppercase tracking-wider">Publish to Site</th>
                <th className="px-6 py-3.5 text-[10px] font-bold text-slate-450 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length > 0 ? (
                filtered.map(post => {
                  const isPublishedStatus = post.status === 'published';
                  return (
                    <tr key={post.id} className="table-row">
                      <td className="px-6 py-3.5">
                        <div className="font-bold text-slate-800 text-xs">{post.title}</div>
                        {post.publishedToSite && isPublishedStatus && (
                          <span className={`inline-flex mt-1.5 items-center px-2 py-0.5 text-[9px] font-bold rounded-full uppercase tracking-wider shadow-[0_1px_2px_rgba(0,0,0,0.01)] ${displayBadge.live}`}>
                            Live on Site
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-3.5 text-xs font-semibold text-slate-650">{post.author}</td>
                      <td className="px-6 py-3.5 text-xs text-slate-500">{post.category}</td>
                      <td className="px-6 py-3.5 text-xs text-slate-400">{post.published_at || <span className="text-slate-300">—</span>}</td>
                      <td className="px-6 py-3.5">
                        <span className={`px-2.5 py-0.8 text-[9px] font-bold rounded-full uppercase tracking-wider shadow-[0_1px_2px_rgba(0,0,0,0.01)] ${badge[post.status]}`}>
                          {post.status}
                        </span>
                      </td>
                      <td className="px-6 py-3.5">
                        <ToggleSwitch 
                          checked={post.publishedToSite && isPublishedStatus}
                          onChange={() => togglePublish(post.id)}
                          disabled={!isPublishedStatus}
                          tooltip="Set status to Published first"
                          onClickDisabled={() => addToast('Set status to Published first', 'error')}
                        />
                      </td>
                      <td className="px-6 py-3.5 text-right space-x-1.5">
                        <button onClick={() => handleOpenEdit(post)} className="p-1.5 rounded-md text-slate-400 hover:text-[#0a0a0a] active:scale-[0.97]" title="Edit post"><Edit2 className="w-3.5 h-3.5" /></button>
                        <button onClick={() => handleDelete(post.id, post.title)} className="p-1.5 rounded-md text-slate-400 hover:text-red-650 active:scale-[0.97]" title="Delete post"><Trash2 className="w-3.5 h-3.5" /></button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center text-xs text-slate-400">
                    No articles found matching criteria. <button onClick={handleOpenAdd} className="text-[#0a0a0a] font-bold underline cursor-pointer">Add your first article</button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* FORM MODAL */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={selectedPost ? 'Edit Blog Article' : 'Write New Article'}>
        <form onSubmit={handleSubmit} className="space-y-4 font-sans text-left">
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Title *</label>
            <input 
              type="text" required
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-[#0a0a0a] focus:ring-1 focus:ring-[#0a0a0a] text-slate-800"
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Author *</label>
              <input 
                type="text" required
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-[#0a0a0a] focus:ring-1 focus:ring-[#0a0a0a] text-slate-800"
                value={formData.author}
                onChange={e => setFormData({ ...formData, author: e.target.value })}
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Category *</label>
              <input 
                type="text" required placeholder="e.g. Design"
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-[#0a0a0a] focus:ring-1 focus:ring-[#0a0a0a] text-slate-800"
                value={formData.category}
                onChange={e => setFormData({ ...formData, category: e.target.value })}
              />
            </div>
          </div>
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Status</label>
            <select
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-[#0a0a0a] focus:ring-1 focus:ring-[#0a0a0a] text-slate-800 bg-white"
              value={formData.status}
              onChange={e => {
                const nextStatus = e.target.value;
                setFormData({ 
                  ...formData, 
                  status: nextStatus,
                  publishedToSite: nextStatus === 'published' ? formData.publishedToSite : false
                });
              }}
            >
              <option value="draft">Draft</option>
              <option value="pending">Pending</option>
              <option value="published">Published</option>
            </select>
          </div>

          {/* Publish Control */}
          <div className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-150 rounded-lg">
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-slate-655 uppercase tracking-wider block">Publish to Website</span>
              {formData.status !== 'published' && (
                <span className="text-[9px] text-slate-400 font-bold block uppercase tracking-wide">Set status to Published first</span>
              )}
            </div>
            <ToggleSwitch 
              checked={formData.publishedToSite && formData.status === 'published'}
              disabled={formData.status !== 'published'}
              onChange={() => setFormData({ ...formData, publishedToSite: !formData.publishedToSite })}
              tooltip="Set status to Published first"
              onClickDisabled={() => addToast('Set status to Published first', 'error')}
            />
          </div>

          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Content</label>
            <textarea 
              rows="5" placeholder="Write markdown content here..."
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-[#0a0a0a] focus:ring-1 focus:ring-[#0a0a0a] text-slate-800"
              value={formData.content}
              onChange={e => setFormData({ ...formData, content: e.target.value })}
            />
          </div>
          <div className="flex justify-end space-x-3 pt-4 border-t border-slate-100">
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border border-slate-200 text-slate-500 bg-white rounded-lg hover:bg-slate-55 text-xs font-bold uppercase tracking-wider cursor-pointer">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-[#0a0a0a] hover:bg-[#1f1f1f] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-all shadow-sm cursor-pointer">Save Article</button>
          </div>
        </form>
      </Modal>

    </div>
  );
}

// ==========================================
// 10. TEAM MEMBERS PAGE VIEW (IN-MEMORY CRUD)
// ==========================================
function TeamView() {
  const { team, setTeam, addToast } = useAppState();
  const [searchTerm, setSearchTerm] = useState('');

  // Modals & Form
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [formData, setFormData] = useState({
    name: '', role: '', department: '', email: '', status: 'active', publishedToSite: true
  });

  const filtered = team.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    m.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenAdd = () => {
    setSelectedMember(null);
    setFormData({ name: '', role: '', department: '', email: '', status: 'active', publishedToSite: true });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (member) => {
    setSelectedMember(member);
    setFormData({ ...member });
    setIsModalOpen(true);
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to remove ${name} from the directory?`)) {
      setTeam(team.filter(m => m.id !== id));
      addToast(`Member "${name}" removed`, 'info');
    }
  };

  const toggleTeamPublish = (id) => {
    const member = team.find(m => m.id === id);
    if (member.status !== 'active') return;
    
    const updatedPublish = !member.publishedToSite;
    setTeam(team.map(m => m.id === id ? { ...m, publishedToSite: updatedPublish } : m));
    
    if (updatedPublish) {
      addToast('✓ Now live on website', 'success');
    } else {
      addToast('Removed from website', 'info');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.role.trim() || !formData.department.trim() || !formData.email.trim()) {
      addToast('Please fill in all mandatory fields', 'error');
      return;
    }

    const isActive = formData.status === 'active';
    const finalPublish = isActive ? formData.publishedToSite : false;

    if (selectedMember) {
      setTeam(team.map(m => m.id === selectedMember.id ? { ...formData, publishedToSite: finalPublish } : m));
      addToast(`Profile for ${formData.name} updated`, 'success');
    } else {
      const newMember = {
        id: Date.now().toString(),
        ...formData,
        publishedToSite: finalPublish
      };
      setTeam([...team, newMember]);
      addToast(`${formData.name} added to directory`, 'success');
    }
    setIsModalOpen(false);
  };

  const badge = {
    active: 'bg-[#0a0a0a] text-white rounded-full',
    inactive: 'bg-[#fafafa] text-[#71717a] border border-[#a1a1aa] rounded-full'
  };

  const displayBadge = {
    visible: 'bg-[#0a0a0a] text-white rounded-full',
    hidden: 'bg-transparent text-zinc-400 border border-dashed border-zinc-300 rounded-full'
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* Page Header */}
      <div className="pb-5 border-b border-slate-200">
        <h1 className="text-[22px] font-extrabold text-slate-800 tracking-tight">Team Directory</h1>
        <p className="text-[12px] text-slate-500 mt-1">Manage corporate hierarchy and website display visibility.</p>
      </div>

      {/* Search & Add */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400"><Search className="w-4 h-4" /></span>
          <input 
            type="text"
            placeholder="Search by name or department..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full h-10 pl-10 pr-4 border border-slate-200 rounded-lg text-xs text-slate-700 placeholder-slate-400 bg-white shadow-sm focus:outline-none focus:border-[#0a0a0a] focus:ring-2 focus:ring-[#0a0a0a]/10 transition-all"
          />
        </div>

        <button 
          onClick={handleOpenAdd}
          className="h-10 px-5 bg-[#0a0a0a] hover:bg-[#1f1f1f] active:scale-[0.97] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-all shadow-sm flex items-center justify-center cursor-pointer"
        >
          <Plus className="w-4 h-4 mr-1.5 shrink-0 stroke-[2.5]" /> Add Member
        </button>
      </div>

      {/* Directory table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-premium overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full table-container">
            <thead>
              <tr className="border-b border-slate-100 text-left bg-slate-50/50">
                <th className="px-6 py-3.5 text-[10px] font-bold text-slate-450 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3.5 text-[10px] font-bold text-slate-450 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3.5 text-[10px] font-bold text-slate-450 uppercase tracking-wider">Department</th>
                <th className="px-6 py-3.5 text-[10px] font-bold text-slate-450 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3.5 text-[10px] font-bold text-slate-450 uppercase tracking-wider">Show on Website</th>
                <th className="px-6 py-3.5 text-[10px] font-bold text-slate-450 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3.5 text-[10px] font-bold text-slate-450 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length > 0 ? (
                filtered.map(member => {
                  const isActive = member.status === 'active';
                  return (
                    <tr key={member.id} className="table-row">
                      <td className="px-6 py-3.5 font-bold text-slate-800 text-xs">{member.name}</td>
                      <td className="px-6 py-3.5 text-xs text-slate-650 font-semibold">{member.role}</td>
                      <td className="px-6 py-3.5 text-xs text-slate-500">{member.department}</td>
                      <td className="px-6 py-3.5 text-xs text-slate-450">{member.email}</td>
                      <td className="px-6 py-3.5">
                        <div className="flex items-center gap-3">
                          <ToggleSwitch 
                            checked={member.publishedToSite && isActive}
                            onChange={() => toggleTeamPublish(member.id)}
                            disabled={!isActive}
                            tooltip="Member is inactive"
                            onClickDisabled={() => addToast('Member is inactive', 'error')}
                          />
                          <span className={`px-2 py-0.5 text-[9px] font-bold rounded-full uppercase tracking-wider shadow-[0_1px_2px_rgba(0,0,0,0.06)] ${
                            member.publishedToSite && isActive ? displayBadge.visible : displayBadge.hidden
                          }`}>
                            {member.publishedToSite && isActive ? 'Visible' : 'Hidden'}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-3.5">
                        <span className={`px-2.5 py-0.8 text-[9px] font-bold rounded-full uppercase tracking-wider shadow-[0_1px_2px_rgba(0,0,0,0.06)] ${badge[member.status]}`}>
                          {member.status}
                        </span>
                      </td>
                      <td className="px-6 py-3.5 text-right space-x-1">
                        <button onClick={() => handleOpenEdit(member)} className="p-1.5 rounded-md text-slate-400 hover:text-[#0a0a0a] active:scale-[0.97]" title="Edit member"><Edit2 className="w-3.5 h-3.5" /></button>
                        <button onClick={() => handleDelete(member.id, member.name)} className="p-1.5 rounded-md text-slate-400 hover:text-red-650 transition-colors duration-150 active:scale-[0.97]" title="Remove member"><Trash2 className="w-3.5 h-3.5" /></button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center text-xs text-slate-450">
                    No team members found. <button onClick={handleOpenAdd} className="text-[#0a0a0a] font-bold underline cursor-pointer">Add your first member</button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* FORM MODAL */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={selectedMember ? 'Edit Team Member Details' : 'Add Team Member'}>
        <form onSubmit={handleSubmit} className="space-y-4 font-sans text-left">
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Full Name *</label>
            <input 
              type="text" required
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-[#0a0a0a] focus:ring-1 focus:ring-[#0a0a0a] text-slate-800"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Role *</label>
              <input 
                type="text" required placeholder="e.g. Lead Engineer"
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-[#0a0a0a] focus:ring-1 focus:ring-[#0a0a0a] text-slate-800"
                value={formData.role}
                onChange={e => setFormData({ ...formData, role: e.target.value })}
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Department *</label>
              <input 
                type="text" required placeholder="e.g. Engineering"
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-[#0a0a0a] focus:ring-1 focus:ring-[#0a0a0a] text-slate-800"
                value={formData.department}
                onChange={e => setFormData({ ...formData, department: e.target.value })}
              />
            </div>
          </div>
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Email Address *</label>
            <input 
              type="email" required placeholder="dev@nexix.tech"
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-[#0a0a0a] focus:ring-1 focus:ring-[#0a0a0a] text-slate-800"
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Status</label>
              <select
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-[#0a0a0a] focus:ring-1 focus:ring-[#0a0a0a] text-slate-800 bg-white"
                value={formData.status}
                onChange={e => {
                  const val = e.target.value;
                  const isActive = val === 'active';
                  setFormData({ 
                    ...formData, 
                    status: val,
                    publishedToSite: isActive ? formData.publishedToSite : false
                  });
                }}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          {/* Toggle publish member */}
          <div className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-200 rounded-lg">
            <div className="space-y-0.5 text-left">
              <span className="text-xs font-bold text-slate-700 block">Show on Website</span>
              {formData.status !== 'active' && (
                <span className="text-[9px] text-slate-400 font-bold block uppercase tracking-wider">Member is inactive</span>
              )}
            </div>
            <ToggleSwitch 
              checked={formData.publishedToSite && formData.status === 'active'}
              disabled={formData.status !== 'active'}
              onChange={() => setFormData({ ...formData, publishedToSite: !formData.publishedToSite })}
              tooltip="Member is inactive"
              onClickDisabled={() => addToast('Member is inactive', 'error')}
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-slate-100">
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border border-slate-200 text-slate-500 bg-white rounded-lg hover:bg-slate-50 text-xs font-bold uppercase tracking-wider cursor-pointer">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-[#0a0a0a] hover:bg-[#1f1f1f] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-all shadow-sm cursor-pointer">Save Member</button>
          </div>
        </form>
      </Modal>

    </div>
  );
}

// ==========================================
// 11. CAREERS PAGE VIEW (IN-MEMORY CRUD)
// ==========================================

function CareersView() {
  const { careers, setCareers, addToast } = useAppState();
  const [searchTerm, setSearchTerm] = useState('');

  // Modals & Form
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [formData, setFormData] = useState({
    position: '', department: '', type: 'full_time', applicants: 0, status: 'draft', description: '', publishedToSite: false
  });

  const filtered = careers.filter(j => 
    j.position.toLowerCase().includes(searchTerm.toLowerCase()) || 
    j.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenAdd = () => {
    setSelectedJob(null);
    setFormData({ position: '', department: '', type: 'full_time', applicants: 0, status: 'draft', description: '', publishedToSite: false });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (job) => {
    setSelectedJob(job);
    setFormData({ ...job });
    setIsModalOpen(true);
  };

  const handleDelete = (id, title) => {
    if (window.confirm(`Are you sure you want to remove job position "${title}"?`)) {
      setCareers(careers.filter(j => j.id !== id));
      addToast(`Position "${title}" deleted`, 'info');
    }
  };

  const toggleJobPublish = (id) => {
    const job = careers.find(j => j.id === id);
    const isAllowed = job.status === 'open' || job.status === 'review';
    
    if (job.status === 'draft') {
      addToast('Change status to Open first', 'error');
      return;
    }
    if (!isAllowed) {
      addToast('Change status to Open or Review first', 'error');
      return;
    }

    const updatedPublish = !job.publishedToSite;
    setCareers(careers.map(j => j.id === id ? { ...j, publishedToSite: updatedPublish } : j));
    
    if (updatedPublish) {
      addToast('✓ Now live on website', 'success');
    } else {
      addToast('Removed from website', 'info');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.position.trim() || !formData.department.trim() || !formData.type) {
      addToast('Please fill in all mandatory fields', 'error');
      return;
    }

    const isAllowed = formData.status === 'open' || formData.status === 'review';
    const finalPublish = isAllowed ? formData.publishedToSite : false;

    if (selectedJob) {
      setCareers(careers.map(j => j.id === selectedJob.id ? { ...formData, publishedToSite: finalPublish } : j));
      addToast(`Job opening "${formData.position}" updated`, 'success');
    } else {
      const newJob = {
        id: Date.now().toString(),
        ...formData,
        publishedToSite: finalPublish
      };
      setCareers([newJob, ...careers]);
      addToast(`Job opening "${formData.position}" posted`, 'success');
    }
    setIsModalOpen(false);
  };

  const statusBadge = {
    open: 'bg-[#0a0a0a] text-white rounded-full',
    review: 'bg-[#f4f4f5] text-[#3f3f46] border border-[#e4e4e7] rounded-full',
    draft: 'bg-[#fafafa] text-[#71717a] border border-[#a1a1aa] rounded-full',
    closed: 'bg-[#fafafa] text-zinc-400 border border-zinc-200 rounded-full'
  };

  const websiteBadge = {
    live: 'bg-[#0a0a0a] text-white rounded-full',
    notListed: 'bg-transparent text-zinc-400 border border-dashed border-zinc-300 rounded-full'
  };

  const formatType = (type) => {
    switch (type) {
      case 'full_time': return 'Full-time';
      case 'contract': return 'Contract';
      case 'internship': return 'Internship';
      default: return type;
    }
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* Page Header */}
      <div className="pb-5 border-b border-slate-200">
        <h1 className="text-[22px] font-extrabold text-slate-800 tracking-tight">Careers Opening</h1>
        <p className="text-[12px] text-slate-500 mt-1">Post, update, and manage job openings and list applicants.</p>
      </div>

      {/* Search & Action */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400"><Search className="w-4 h-4" /></span>
          <input 
            type="text"
            placeholder="Search positions or departments..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full h-10 pl-10 pr-4 border border-slate-200 rounded-lg text-xs text-slate-700 placeholder-slate-400 bg-white shadow-sm focus:outline-none focus:border-[#0a0a0a] focus:ring-2 focus:ring-[#0a0a0a]/10 transition-all"
          />
        </div>

        <button 
          onClick={handleOpenAdd}
          className="h-10 px-5 bg-[#0a0a0a] hover:bg-[#1f1f1f] active:scale-[0.97] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-all shadow-sm flex items-center justify-center cursor-pointer font-sans"
        >
          <Plus className="w-4 h-4 mr-1.5 shrink-0 stroke-[2.5]" /> Add Job
        </button>
      </div>

      {/* Careers Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-premium overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full table-container">
            <thead>
              <tr className="border-b border-slate-100 text-left bg-slate-50/50">
                <th className="px-6 py-3.5 text-[10px] font-bold text-slate-450 uppercase tracking-wider">Position</th>
                <th className="px-6 py-3.5 text-[10px] font-bold text-slate-450 uppercase tracking-wider">Department</th>
                <th className="px-6 py-3.5 text-[10px] font-bold text-slate-450 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3.5 text-[10px] font-bold text-slate-450 uppercase tracking-wider">Applicants</th>
                <th className="px-6 py-3.5 text-[10px] font-bold text-slate-450 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3.5 text-[10px] font-bold text-slate-450 uppercase tracking-wider">Website</th>
                <th className="px-6 py-3.5 text-[10px] font-bold text-slate-450 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length > 0 ? (
                filtered.map(job => {
                  const isAllowed = job.status === 'open' || job.status === 'review';
                  return (
                    <tr key={job.id} className="table-row">
                      <td className="px-6 py-3.5 text-left">
                        <div className="text-xs font-bold text-slate-800">
                          <div>{job.position}</div>
                          {job.status === 'draft' && (
                            <div className="text-[9px] text-red-500 font-bold mt-1 uppercase tracking-wide">Change status to Open first</div>
                          )}
                        </div>
                        {job.description && (
                          <div className="text-[11px] text-slate-450 line-clamp-1 mt-0.5">{job.description}</div>
                        )}
                      </td>
                      <td className="px-6 py-3.5 text-xs text-slate-500">{job.department}</td>
                      <td className="px-6 py-3.5 text-xs text-slate-650 font-semibold">{formatType(job.type)}</td>
                      <td className="px-6 py-3.5 text-xs text-slate-650">
                        <div className="flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5 text-slate-400" />
                          <span>{job.applicants}</span>
                        </div>
                      </td>
                      <td className="px-6 py-3.5">
                        <span className={`px-2.5 py-0.8 text-[9px] font-bold rounded-full uppercase tracking-wider shadow-[0_1px_2px_rgba(0,0,0,0.06)] ${statusBadge[job.status]}`}>
                          {job.status}
                        </span>
                      </td>
                      <td className="px-6 py-3.5">
                        <div className="flex items-center gap-3">
                          <ToggleSwitch 
                            checked={job.publishedToSite && isAllowed}
                            onChange={() => toggleJobPublish(job.id)}
                            disabled={false}
                            onClickDisabled={null}
                          />
                          <span className={`px-2 py-0.5 text-[9px] font-bold rounded-full uppercase tracking-wider shadow-[0_1px_2px_rgba(0,0,0,0.06)] ${
                            job.publishedToSite && isAllowed ? websiteBadge.live : websiteBadge.notListed
                          }`}>
                            {job.publishedToSite && isAllowed ? 'Live' : 'Hidden'}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-3.5 text-right space-x-1">
                        <button onClick={() => handleOpenEdit(job)} className="p-1.5 rounded-md text-slate-400 hover:text-[#0a0a0a] active:scale-[0.97]" title="Edit job"><Edit2 className="w-3.5 h-3.5" /></button>
                        <button onClick={() => handleDelete(job.id, job.position)} className="p-1.5 rounded-md text-slate-400 hover:text-red-650 transition-colors duration-150 active:scale-[0.97]" title="Remove job"><Trash2 className="w-3.5 h-3.5" /></button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center text-xs text-slate-450">
                    No open career listings. <button onClick={handleOpenAdd} className="text-[#0a0a0a] font-bold underline cursor-pointer">Post first position</button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* FORM MODAL */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={selectedJob ? 'Edit Career Posting' : 'Post New Career Position'}>
        <form onSubmit={handleSubmit} className="space-y-4 font-sans text-left">
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Position Title *</label>
            <input 
              type="text" required
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-[#0a0a0a] focus:ring-1 focus:ring-[#0a0a0a] text-slate-800"
              value={formData.position}
              onChange={e => setFormData({ ...formData, position: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Department *</label>
              <input 
                type="text" required placeholder="e.g. Engineering"
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-[#0a0a0a] focus:ring-1 focus:ring-[#0a0a0a] text-slate-800"
                value={formData.department}
                onChange={e => setFormData({ ...formData, department: e.target.value })}
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Type *</label>
              <select
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-[#0a0a0a] focus:ring-1 focus:ring-[#0a0a0a] text-slate-800 bg-white"
                value={formData.type}
                onChange={e => setFormData({ ...formData, type: e.target.value })}
              >
                <option value="full_time">Full-time</option>
                <option value="contract">Contract</option>
                <option value="internship">Internship</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Status</label>
              <select
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-[#0a0a0a] focus:ring-1 focus:ring-[#0a0a0a] text-slate-800 bg-white"
                value={formData.status}
                onChange={e => {
                  const val = e.target.value;
                  const allowed = val === 'open' || val === 'review';
                  setFormData({ 
                    ...formData, 
                    status: val,
                    publishedToSite: allowed ? formData.publishedToSite : false
                  });
                }}
              >
                <option value="draft">Draft</option>
                <option value="open">Open</option>
                <option value="review">Review</option>
                <option value="closed">Closed</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Applicants count</label>
              <input 
                type="number" min="0"
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-[#0a0a0a] focus:ring-1 focus:ring-[#0a0a0a] text-slate-800"
                value={formData.applicants}
                onChange={e => setFormData({ ...formData, applicants: parseInt(e.target.value) || 0 })}
              />
            </div>
          </div>

          {/* Toggle Website Display */}
          <div className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-200 rounded-lg">
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-slate-700 block">Publish to Website</span>
              {!(formData.status === 'open' || formData.status === 'review') && (
                <span className="text-[9px] text-slate-400 font-bold block uppercase tracking-wider">Change status to Open or Review first</span>
              )}
            </div>
            <ToggleSwitch 
              checked={formData.publishedToSite && (formData.status === 'open' || formData.status === 'review')}
              disabled={!(formData.status === 'open' || formData.status === 'review')}
              onChange={() => setFormData({ ...formData, publishedToSite: !formData.publishedToSite })}
              tooltip="Change status to Open or Review first"
              onClickDisabled={() => addToast('Change status to Open first', 'error')}
            />
          </div>

          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Description</label>
            <textarea 
              rows="3"
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-[#0a0a0a] focus:ring-1 focus:ring-[#0a0a0a] text-slate-800"
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
            />
          </div>
          <div className="flex justify-end space-x-3 pt-4 border-t border-slate-100">
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border border-slate-200 text-slate-500 bg-white rounded-lg hover:bg-slate-50 text-xs font-bold uppercase tracking-wider cursor-pointer">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-[#0a0a0a] hover:bg-[#1f1f1f] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-all shadow-sm cursor-pointer">Save Position</button>
          </div>
        </form>
      </Modal>

    </div>
  );
}

// ==========================================
// 12. ANALYTICS PAGE VIEW
// ==========================================

function AnalyticsView() {
  const [dateRange, setDateRange] = useState('this_month');

  // Variations in traffic aggregates based on selected date ranges
  const variations = {
    this_week: { views: '2,840', visitors: '950', time: '1m 58s', rate: '3.9%', data: [1100, 750, 480, 290, 150, 70] },
    this_month: { views: '11,920', visitors: '3,100', time: '2m 45s', rate: '4.2%', data: [4200, 2800, 1900, 1400, 980, 640] },
    last_3_months: { views: '39,400', visitors: '10,800', time: '3m 12s', rate: '4.5%', data: [15400, 9800, 6200, 4100, 2400, 1500] }
  };

  const activeVar = variations[dateRange];

  const pages = [
    { path: '/', label: 'Home Page' },
    { path: '/services', label: 'Services Portal' },
    { path: '/portfolio', label: 'Portfolio Gallery' },
    { path: '/blog', label: 'Tech Blog' },
    { path: '/contact', label: 'Contact Inquiries' },
    { path: '/careers', label: 'Careers Listings' }
  ];

  const maxViews = Math.max(...activeVar.data);

  return (
    <div className="space-y-6 font-sans">
      
      {/* Page Header */}
      <div className="pb-5 border-b border-slate-200">
        <h1 className="text-[22px] font-extrabold text-slate-800 tracking-tight">Analytics overview</h1>
        <p className="text-[12px] text-slate-500 mt-1">Monitor site traffic, views, unique visitors and conversion metrics.</p>
      </div>

      {/* Date Range Selector */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-premium font-sans">
        <div className="flex items-center text-slate-700">
          <Calendar className="w-5 h-5 text-slate-400 mr-2" />
          <span className="text-xs font-bold uppercase tracking-wider">Reporting Window Settings</span>
        </div>
        
        <div className="flex border border-slate-200 rounded-lg overflow-hidden bg-white shadow-sm">
          {[
            { id: 'this_week', name: 'This Week' },
            { id: 'this_month', name: 'This Month' },
            { id: 'last_3_months', name: 'Last 3 Months' }
          ].map((btn, idx) => (
            <button
              key={btn.id}
              onClick={() => setDateRange(btn.id)}
              className={`px-4 py-2 text-xs font-bold transition-all duration-150 cursor-pointer ${
                idx > 0 ? 'border-l border-slate-200' : ''
              } ${
                dateRange === btn.id 
                  ? 'bg-[#0a0a0a] text-white' 
                  : 'bg-white text-slate-450 hover:text-[#0a0a0a] hover:bg-slate-50'
              }`}
            >
              {btn.name}
            </button>
          ))}
        </div>
      </div>

      {/* 4 Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 font-sans">
        
        <div className="metric-card-bg p-5 bg-white rounded-xl border-y border-r border-slate-200 border-l-[3px] border-l-[#0a0a0a] shadow-premium flex items-start justify-between transition-all duration-200 ease-out transform hover:-translate-y-0.5 hover:shadow-premium-card">
          <div className="space-y-1 text-left">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Page Views</span>
            <span className="text-[32px] font-extrabold text-slate-800 tracking-tight block leading-none">{activeVar.views}</span>
          </div>
          <div className="w-10 h-10 bg-[#f4f4f5] border border-[#e4e4e7] text-[#0a0a0a] rounded-lg flex items-center justify-center shadow-inner shrink-0"><Eye className="w-4.5 h-4.5" /></div>
        </div>

        <div className="metric-card-bg p-5 bg-white rounded-xl border-y border-r border-slate-200 border-l-[3px] border-l-[#0a0a0a] shadow-premium flex items-start justify-between transition-all duration-200 ease-out transform hover:-translate-y-0.5 hover:shadow-premium-card">
          <div className="space-y-1 text-left">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Unique Visitors</span>
            <span className="text-[32px] font-extrabold text-slate-800 tracking-tight block leading-none">{activeVar.visitors}</span>
          </div>
          <div className="w-10 h-10 bg-[#f4f4f5] border border-[#e4e4e7] text-[#0a0a0a] rounded-lg flex items-center justify-center shadow-inner shrink-0"><Users className="w-4.5 h-4.5" /></div>
        </div>

        <div className="metric-card-bg p-5 bg-white rounded-xl border-y border-r border-slate-200 border-l-[3px] border-l-[#0a0a0a] shadow-premium flex items-start justify-between transition-all duration-200 ease-out transform hover:-translate-y-0.5 hover:shadow-premium-card">
          <div className="space-y-1 text-left">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Avg. Time on Site</span>
            <span className="text-[32px] font-extrabold text-slate-800 tracking-tight block leading-none">{activeVar.time}</span>
          </div>
          <div className="w-10 h-10 bg-[#f4f4f5] border border-[#e4e4e7] text-[#0a0a0a] rounded-lg flex items-center justify-center shadow-inner shrink-0"><Clock className="w-4.5 h-4.5" /></div>
        </div>

        <div className="metric-card-bg p-5 bg-white rounded-xl border-y border-r border-slate-200 border-l-[3px] border-l-[#0a0a0a] shadow-premium flex items-start justify-between transition-all duration-200 ease-out transform hover:-translate-y-0.5 hover:shadow-premium-card">
          <div className="space-y-1 text-left">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Lead Conversion Rate</span>
            <span className="text-[32px] font-extrabold text-slate-800 tracking-tight block leading-none">{activeVar.rate}</span>
          </div>
          <div className="w-10 h-10 bg-[#f4f4f5] border border-[#e4e4e7] text-[#0a0a0a] rounded-lg flex items-center justify-center shadow-inner shrink-0"><Percent className="w-4.5 h-4.5" /></div>
        </div>

      </div>

      {/* Pages traffic list */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-premium p-6 font-sans">
        <h3 className="font-bold text-slate-800 text-xs uppercase tracking-wider mb-6 text-left">Top Pages Performance</h3>
        
        <div className="space-y-6">
          {pages.map((page, index) => {
            const count = activeVar.data[index];
            const percent = (count / maxViews) * 100;
            return (
              <div key={page.path} className="flex items-center space-x-4">
                <div className="w-36 sm:w-44 text-xs font-bold text-slate-700 truncate text-left">{page.path} <span className="text-slate-400 font-medium text-[10px] ml-1">({page.label})</span></div>
                <div className="flex-1">
                  <div className="w-full bg-[#F4F4F5] h-8 rounded-lg overflow-hidden relative flex items-center shadow-inner">
                    <div className="bg-[#0a0a0a]/10 h-full border-r-[3px] border-[#0a0a0a] transition-all duration-300 relative bar-shimmer" style={{ width: `${percent}%` }} />
                    <span className="absolute left-3.5 text-[11px] font-extrabold text-[#0a0a0a] tracking-wide">
                      {count.toLocaleString()} views
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}

// ==========================================
// 13. MAIN APP BOOTSTRAP AND ROUTES MAPS
// ==========================================

export default function App() {
  return (
    <AppStateProvider>
      <BrowserRouter>
        <Routes>
          {/* Public login */}
          <Route path="/login" element={<LoginView />} />

          {/* Protected routes */}
          <Route path="/" element={<ProtectedRoute><DashboardView /></ProtectedRoute>} />
          <Route path="/leads" element={<ProtectedRoute><LeadsView /></ProtectedRoute>} />
          <Route path="/portfolio" element={<ProtectedRoute><PortfolioView /></ProtectedRoute>} />
          <Route path="/blog" element={<ProtectedRoute><BlogView /></ProtectedRoute>} />
          <Route path="/team" element={<ProtectedRoute><TeamView /></ProtectedRoute>} />
          <Route path="/careers" element={<ProtectedRoute><CareersView /></ProtectedRoute>} />
          <Route path="/analytics" element={<ProtectedRoute><AnalyticsView /></ProtectedRoute>} />

          {/* Redirect all other hits to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AppStateProvider>
  );
}
