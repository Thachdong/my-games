import axios, { AxiosInstance } from 'axios';
const dotenv = require('dotenv');

dotenv.config()

class ApiService {
  private static instance: ApiService;
  private axiosInstance: AxiosInstance;

  private constructor() {
    this.axiosInstance = axios.create({
      baseURL: process.env.REACT_APP_API_URL || "http://localhost:3000/api",
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
      (response) => response,
      (error) => {
        // Handle errors globally
        console.error('API Error:', error);
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
