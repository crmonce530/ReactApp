export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  company?: string;
  phone?: string;
  role: 'user' | 'admin' | 'manager';
  d365ContactId?: string;
  d365AccountId?: string;
  d365SyncStatus?: 'pending' | 'synced' | 'failed';
  d365LastSync?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (userData: RegisterData) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<{ success: boolean; error?: string }>;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  company?: string;
  phone?: string;
  role?: 'user' | 'admin' | 'manager';
}

export interface LoginData {
  email: string;
  password: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface DashboardStats {
  totalLeads: number;
  totalDeals: number;
  totalRevenue: number;
  conversionRate: number;
}

export interface RecentActivity {
  id: string;
  type: 'lead' | 'deal' | 'contact' | 'task' | 'opportunity';
  title: string;
  description: string;
  timestamp: Date;
  status: 'pending' | 'completed' | 'cancelled';
}

export interface TopDeal {
  id: string;
  title: string;
  value: number;
  probability: number;
  stage: string;
  customer: string;
} 