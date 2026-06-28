import { create } from "zustand";
import axios from "axios";
import { toast } from "react-hot-toast";

axios.defaults.withCredentials = true;
const API_URL = import.meta.env.MODE === "development"
  ? "http://localhost:3000/api/analytics"
  : "/api/analytics";



export const analyticsStore = create((set) => ({
  isLoading: false,
  error: null,
  resumeSkills: [],
  missingSkills: [],
  strongSkills: [],
  score: [],

  getAnalytics: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/resume-analytics`);
      console.log(response);
      set({ isLoading: false, error: null,resumeSkills:response?.data?.resumeSkill||[],missingSkills:response?.data?.missingSkills||[],strongSkills:response?.data?.strongSkills||[],score:response?.data?.score||[] });
    } catch (error) {
      console.logO(error);
      set({ isLoading: false, error: error.response?.data?.message });
    }
  },
}));




