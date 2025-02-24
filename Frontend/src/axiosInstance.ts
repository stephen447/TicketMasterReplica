import axios from "axios";

const API_BASE_URL = "http://localhost:3000/"; // Change to your actual API URL

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Include cookies (for HttpOnly JWT)
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor (Optional)
// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token"); // Get token from storage
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// Response Interceptor (Optional: Auto Logout on 401)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.log("Unauthorized! Redirecting to login...");
      localStorage.removeItem("token"); // Clear token
      //window.location.href = "/login"; // Redirect to login page
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
