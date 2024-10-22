/* eslint-disable @typescript-eslint/no-unused-vars */
import api from "./api";
import { User } from "../types";

export const login = async (email: string, password: string): Promise<User> => {
  try {
    const response = await api.post("/auth/login", { email, password });
    const { user, token } = response.data;
    localStorage.setItem("token", token);
    return user;
  } catch (error) {
    throw new Error("Login failed");
  }
};

export const logout = async (): Promise<void> => {
  try {
    await api.post("/auth/logout");
    localStorage.removeItem("token");
  } catch (error) {
    console.error("Logout failed", error);
  }
};

export const register = async (
  name: string,
  email: string,
  password: string
): Promise<User> => {
  try {
    const response = await api.post("/auth/register", {
      name,
      email,
      password,
    });
    const { user, token } = response.data;
    localStorage.setItem("token", token);
    return user;
  } catch (error) {
    throw new Error("Registration failed");
  }
};

export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const response = await api.get("/auth/me");
    return response.data.user;
  } catch (error) {
    console.error("Failed to get current user", error);
    return null;
  }
};
