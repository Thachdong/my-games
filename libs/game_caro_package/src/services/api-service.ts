import axios, { AxiosInstance } from 'axios';

export const apiEndpoints = {
  login: {
    path: '/auth/login',
    method: 'POST',
  },
  register: {
    path: '/auth/register',
    method: 'POST',
  },
  logout: {
    path: '/auth/logout',
    method: 'POST',
  },
  activate: {
    path: '/auth/activate',
    method: 'POST',
  },
  forgotPassword: {
    path: '/auth/forgot-password',
    method: 'POST',
  },
  changePassword: {
    path: '/auth/change-password',
    method: 'POST',
  },
  getUsers: {
    path: '/user',
    method: 'GET',
  },
  getUserById: {
    path: '/user/:id',
    method: 'GET',
    getPath: (id: string) => `/user/${id}`,
  },
  updateUser: {
    path: '/user/:id',
    method: 'PATCH',
    getPatch: (id: string) => `/user/${id}`,
  },
  createGame: {
    path: '/game',
    method: 'POST',
  },
  getGames: {
    path: '/game',
    method: 'GET',
  },
  getGameById: {
    path: '/game/:id',
    method: 'GET',
    getPath: (id: string) => `/game/${id}`,
  },
  updateGame: {
    path: '/game/:id',
    method: 'PATCH',
    getPatch: (id: string) => `/game/${id}`,
  },
  addMoveToGame: {
    path: '/game/:id/move',
    method: 'POST',
    getPath: (id: string) => `/game/${id}/move`,
  },
  createTournament: {
    path: '/tournament',
    method: 'POST'
  },
  getAllTournament: {
    path: '/tournament',
    method: 'GET'
  },
  getTournamentById: {
    path: '/tournament/:id',
    method: 'GET',
    getPath: (id: string) => `/tournament/${id}`,
  },
  updateTournamentTitle: {
    path: '/tournament/:id/title',
    method: 'PATCH',
    getPatch: (id: string) => `/tournament/${id}/title`,
  },
  joinTournament: {
    path: '/tournament/:id/join',
    method: 'PATCH',
    getPatch: (id: string) => `/tournament/${id}/join`,
  },
  leaveTournament: {
    path: '/tournament/:id/leave',
    method: 'PATCH',
    getPatch: (id: string) => `/tournament/${id}/leave`,
  },
  getRank: {
    path: '/tournament-rank',
    method: 'GET',
  },
  updateRank: {
    path: '/tournament-rank/:id',
    method: 'PATCH',
    getPatch: (id: string) => `/tournament-rank/${id}`,
  },
};

class ApiService {
  private static instance: ApiService;
  private axiosInstance: AxiosInstance;

  private constructor() {
    this.axiosInstance = axios.create({
      baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3000/api',
      timeout: parseInt(process.env.REACT_APP_API_TIMEOUT || '10000'), // default 10s
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Optionally setup interceptors
    this.axiosInstance.interceptors.request.use((config) => {
      // Add token here if needed
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    this.axiosInstance.interceptors.response.use(
      (response) => response.data,
      (error) => {
        if (error instanceof axios.AxiosError) {
          // Handle specific error codes
          if (error.response) {
            const status = error.response.status;
            if (status === 401) {
              // Handle unauthorized access
              console.error('Unauthorized access - redirecting to login');
              // Redirect to login or show a message
            } else if (status === 403) {
              // Handle forbidden access
              console.error('Forbidden access - you do not have permission');
            } else if (status >= 500) {
              // Handle server errors
              console.error('Server error - please try again later');
            }
          }
        }

        return Promise.reject(error);
      }
    );
  }

  public static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }

  public get<T, K>(url: string, params?: T) {
    return this.axiosInstance.get<K>(url, { params });
  }

  public post<T, K>(url: string, data: T) {
    return this.axiosInstance.post<K>(url, data);
  }

  public put<T, K>(url: string, data: T) {
    return this.axiosInstance.put<K>(url, data);
  }

  public delete<T>(url: string) {
    return this.axiosInstance.delete<T>(url);
  }
}

export default ApiService.getInstance();
