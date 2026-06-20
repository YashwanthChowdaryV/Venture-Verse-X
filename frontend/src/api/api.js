import axios from 'axios';

const API_BASE_URL = 'https://ventureversex-backend-deploy.onrender.com/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Automatically inject Authorization Header
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle session expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear all user data on unauthorized
      localStorage.removeItem('token');
      localStorage.removeItem('email');
      localStorage.removeItem('fullName');
      localStorage.removeItem('username');
      localStorage.removeItem('userId');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  // Login with email OR username
  login: async (login, password) => {
    const response = await api.post('/auth/login', { login, password });
    return response.data; // { token, id, fullName, username, email, emailVerified }
  },

  // Register with username
  register: async (fullName, username, email, password) => {
    const response = await api.post('/auth/register', {
      fullName,
      username,
      email,
      password
    });
    return response.data; // { token, id, fullName, username, email, emailVerified }
  },

  // Get current authenticated user
  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    return response.data; // { id, fullName, username, email, emailVerified, createdAt }
  },

  // Check username availability
  checkUsername: async (username) => {
    const response = await api.get(`/auth/check-username?username=${encodeURIComponent(username)}`);
    return response.data; // { available: true/false }
  },

  // Check email availability
  checkEmail: async (email) => {
    const response = await api.get(`/auth/check-email?email=${encodeURIComponent(email)}`);
    return response.data; // { available: true/false }
  },

  // Legacy: Get profile (alternative endpoint)
  getProfile: async () => {
    const response = await api.get('/auth/me');
    return response.data; // { id, fullName, username, email }
  },
};

export const startupAPI = {
  createStartup: async (startupData) => {
    // startupData: { startupName, ideaDescription, industry, targetMarket }
    const response = await api.post('/startups', startupData);
    return response.data;
  },
  getMyStartups: async () => {
    const response = await api.get('/startups');
    return response.data;
  },
  getStartupById: async (id) => {
    const response = await api.get(`/startups/${id}`);
    return response.data;
  },
};

export const orchestratorAPI = {
  analyzeStartup: async (startupId) => {
    const response = await api.post(`/orchestrator/${startupId}`);
    return response.data; // StartupFullAnalysisResponse
  },
  getReportHistory: async (startupId) => {
    const response = await api.get(`/orchestrator/history/${startupId}`);
    return response.data; // List<StartupReportHistoryResponse>
  },
  getReport: async (reportId) => {
    const response = await api.get(`/orchestrator/report/${reportId}`);
    return response.data; // StartupFullAnalysisResponse
  },
};

export const knowledgeAPI = {
  uploadDocument: async (title, content) => {
    const response = await api.post('/knowledge/upload', { title, content });
    return response.data;
  },
  searchKnowledge: async (query) => {
    const response = await api.get(`/knowledge/search?query=${encodeURIComponent(query)}`);
    return response.data;
  },
};

export const agentAPI = {
  analyzeInvestor: async (startupId) => {
    const response = await api.post('/ai/validate', { startupId });
    return response.data;
  },
  analyzeCompetitor: async (startupId) => {
    const response = await api.post('/competitor/analyze', { startupId });
    return response.data;
  },
  analyzeCustomer: async (startupId) => {
    const response = await api.post('/customer/analyze', { startupId });
    return response.data;
  },
  analyzeFinance: async (startupId) => {
    const response = await api.post('/finance/analyze', { startupId });
    return response.data;
  },
  analyzeRisk: async (startupId) => {
    const response = await api.post('/risk/analyze', { startupId });
    return response.data;
  },
  analyzeProductStrategy: async (startupId) => {
    const response = await api.post('/product-strategy/analyze', { startupId });
    return response.data;
  },

  // Download report
  downloadReport: (reportId) => {
    return api.get(`/reports/export/${reportId}`, {
      responseType: 'blob'
    });
  },
};

export default api;