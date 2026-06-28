import { create } from "zustand";
import axios from "axios";
import { toast } from "react-hot-toast";

axios.defaults.withCredentials = true;
const API_URL = import.meta.env.MODE === "development"
  ? "http://localhost:3000/api/resume"
  : "/api/resume";


const AI_URL = import.meta.env.MODE === "development"
  ? "http://localhost:3000/api/ai"
  : "/api/ai";



export const resumeStore = create((set) => ({
  resumeFile: null,
  isResumeLoading: false,
  error: null,
  jobDescriptionData: null,
  resumeLink:null,
  ragAnswer:null,

  resumeUpload: async (file) => {
    const formData = new FormData();
    formData.append("resume", file);
    set({ isResumeLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/upload`, formData);
      set({
        isResumeLoading: false,
        error: null,
        resumeFile: response?.data?.resumeData,
        resumeLink:response?.data?.resumeData?.secureUrl
      });
      toast.success(response?.data?.message);
    } catch (error) {
      console.log(error);
      set({ isResumeLoading: false, error: error.response?.data?.message });
    }
  },
  extractSkillsFromDescription: async ({ description }) => {
    set({ isResumeLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/extract-skills`, {
        description,
      });
      set({
        isResumeLoading: false,
        error: null,
        jobDescriptionData: response?.data?.data,
      });
    } catch (error) {
      console.log(error);
      set({ isResumeLoading: false, error: error?.response?.data?.message });
    }
  },
  ragQuestion :async({question})=>{
    set({isResumeLoading:true,error:null})
    try {
      const response = await axios.post(`${AI_URL}/ask-question`,{
        question
      })
      set({isResumeLoading:false,error:null,ragAnswer:response?.data?.answer})
    } catch (error) {
      console.log(error)
      set({isResumeLoading:false,error:error?.response?.data?.message})
    }
  }
}));
