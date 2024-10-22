import axios from "axios";
import { User } from "../types";
import { DateRange } from "react-day-picker";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URI;

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

export const login = async (email: string, password: string): Promise<User> => {
  const response = await api.post("/auth/login", { email, password });
  return response.data.user;
};

export const logout = async (): Promise<void> => {
  await api.post("/auth/logout");
};

export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const response = await api.get("/auth/me");
    return response.data.user;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return null;
  }
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

// Add more API functions as needed

export default api;
