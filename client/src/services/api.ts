import axios from "axios";
import { User } from "../types";
import { DateRange } from "react-day-picker";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URI;

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

export const login = async (email: string, password: string): Promise<User> => {
  const response = await api.post("/auth/login", { email, password });
  localStorage.setItem("userId", response.data.user.id);
  localStorage.setItem("token", response.data.token);
  return response.data.user;
};

export const logout = async (): Promise<void> => {
  localStorage.removeItem("userId");
  localStorage.removeItem("token");
};

export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const response = await api.get("/users/profile", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
    return response.data.user;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return null;
  }
};

export const getTrackingInfo = async (bookingId: string) => {
  const response = await api.get(`/tracking/${bookingId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

export const updateTracking = async (
  bookingId: string,
  data: { status: string; latitude: number; longitude: number }
) => {
  const response = await api.put(`/tracking/${bookingId}`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

export const fetchAdminDashboardData = async (dateRange: DateRange | undefined) => {
  const response = await api.get("/admin/dashboard", {
    params: {
      startDate: dateRange?.from?.toISOString(),
      endDate: dateRange?.to?.toISOString(),
    },
  });
  return response.data;
};

export default api;
