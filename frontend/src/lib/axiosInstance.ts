import axios from 'axios';

/**
 * Axios instance with interceptors
 * Handles authentication and token refresh
 */

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Include cookies in requests
});

// Flag to prevent infinite refresh loops
let isRefreshing = false;
let failedQueue: Array<{
  onSuccess: (token: string) => void;
  onFail: (error: any) => void;
}> = [];

const processQueue = (error?: any) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.onFail(error);
    } else {
      prom.onSuccess('');
    }
  });
  failedQueue = [];
};

/**
 * Response interceptor - Handle 401 and refresh token
 */
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config } = error;
    const status = error.response?.status;

    // Handle 401 Unauthorized
    if (status === 401 && !config._retry) {
      if (isRefreshing) {
        // Queue the request
        return new Promise((onSuccess, onFail) => {
          failedQueue.push({ onSuccess, onFail });
        }).then(() => {
          return axiosInstance(config);
        });
      }

      config._retry = true;
      isRefreshing = true;

      try {
        // Try to refresh the token
        const response = await axiosInstance.post('/auth/refresh');
        processQueue();
        return axiosInstance(config);
      } catch (err) {
        // Refresh failed - redirect to login
        processQueue(err);
        
        // Clear auth state
        sessionStorage.removeItem('auth_user');
        window.location.href = '/';
        
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
