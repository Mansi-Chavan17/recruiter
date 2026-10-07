// api/apiClient.ts
import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || "",
  timeout: 60000,
  headers: { "Content-Type": "application/json" },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((p) => (error ? p.reject(error) : p.resolve(token)));
  failedQueue = [];
};

apiClient.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;

    if (error.response) {
        console.log("Interceptor caught error:", error.response.status, error.config.url);
    } else {
        console.log("Interceptor caught error (no response):", error.message);
    }

    if (error.response?.status === 401 && !original._retry) {
      console.log("Interceptor: 401 detected, attempting refresh...");
      if (isRefreshing) {
        console.log("Interceptor: Already refreshing, queuing request...");
        return new Promise((resolve, reject) => failedQueue.push({ resolve, reject })).then(
          (newToken) => {
            original.headers.Authorization = `Bearer ${newToken}`;
            return apiClient(original);
          }
        );
      }

      original._retry = true;
      isRefreshing = true;

      try {
        console.log("Interceptor: calling refresh endpoint...");
        const refreshToken = localStorage.getItem("refreshToken");
        const refreshRes = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/auth/refresh`,
          { refreshToken }
        );

        console.log("Interceptor: refresh successful", refreshRes.data);

        const { token: newToken, refreshToken: newRefreshToken } = refreshRes.data;
        localStorage.setItem("token", newToken);
        if (newRefreshToken) {
          localStorage.setItem("refreshToken", newRefreshToken);
        }

        processQueue(null, newToken);
        isRefreshing = false;

        original.headers.Authorization = `Bearer ${newToken}`;
        return apiClient(original);
      } catch (err) {
        console.error("Interceptor: refresh failed", err);
        processQueue(err, null);
        isRefreshing = false;

        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");

        // Debugging: Alert user before redirect to preserve logs
        alert("Session expired. Please check the console logs now. Click OK to redirect to signup.");

        window.location.href = "/signup"; // redirect to signup
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;