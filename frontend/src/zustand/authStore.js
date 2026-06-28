import { create } from "zustand";
import axios from "axios";
import { toast } from "react-hot-toast";

axios.defaults.withCredentials = true;
const API_URL = import.meta.env.MODE === "development"
  ? "http://localhost:3000/api/auth"
  : "/api/auth";

export const authStore = create((set) => ({
  user: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
  isCheckingAuth: false,

  signup: async ({ name, email, password }) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/signup`, {
        name,
        email,
        password,
      });
      set({
        user: response.data.user,
        isLoading: false,
        error: null,
        isAuthenticated: true,
      });
      toast.success(response?.data?.message);
    } catch (error) {
      set({
        isAuthenticated: false,
        isLoading: false,
        error: error.response?.data?.message || "Error signing up",
      });
      toast.error(error.response?.data?.message || "signup failed");
    }
  },
  login: async ({ email, password }) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });
      set({
        isLoading: false,
        error: null,
        isAuthenticated: true,
        user: response.data.user,
      });
      toast.success(response?.data?.message);
    } catch (error) {
      set({
        isAuthenticated: false,
        isLoading: false,
        error: error.response?.data?.message || "Error logging in ",
      });
      toast.error(error.response?.data?.message || "login failed");
    }
  },

  checkAuth: async () => {
    set({ isLoading: true, error: null, isCheckingAuth: true });
    try {
      const response = await axios.post(`${API_URL}/check-auth`);
      set({
        isLoading: false,
        isCheckingAuth: false,
        user: response?.data?.user,
        isAuthenticated: true,
      });
    } catch (error) {
      set({
        isAuthenticated: false,
        isLoading: false,
        error: error.response?.data?.message || "Error checking auth",
        isCheckingAuth: false,
      });
    }
  },
  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/logout`);
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
      toast.success(response?.data?.message);
    } catch (error) {
      set({
        isLoading: false,
        error: error.response?.data?.message || "logout failed",
      });
      toast.error(error?.response?.data?.message || "logout failed");
    }
  },
}));
