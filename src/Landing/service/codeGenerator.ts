import axios from "axios";
import { axiosInstance } from "../../common/http";

const BASE_URL = "http://192.168.22.207:8080/api/legacy/"; // Replace this with your API base URL

const storyToCode = {
  generateProjectStructure: async (payload: {
    story: string;
    tech: string;
    user_name: string;
    brdFile: FormData;
  }) => {
    const url = `generate-structure?story=${payload.story}&tech=${payload.tech}&user_name=${payload.user_name}`;

    try {
      const response = await axiosInstance.post(url, payload.brdFile);
      if (response) {
        return response;
      }
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  generateBrd: async (payload: {
    story: string;
    tech: string;
    user_name: string;
  }) => {
    const url = `generate-brd`;
    try {
      const response = await axiosInstance.post(url, payload);
      if (response) {
        return response;
      }
    } catch (error) {
      throw error.response.data;
    }
  },

  getStructureByProjectId: async (projectId: string) => {
    const url = `/project/generate-structure/${projectId}`;

    try {
      const response = await axiosInstance.get(url);
      if (response) {
        return response;
      }
    } catch (error) {
      throw error.response.data;
    }
  },

  getProjectZip: async (projectId: number) => {
    const url = `generate-code/${projectId}`;
    try {
      const response = await axiosInstance.get(url);
      if (response) {
        return response;
      }
    } catch (error) {
      throw error.response.data;
    }
  },

  getHealth: async () => {
    const url = `get-data`;
    const config = {
      headers: {
        "content-type": "application/json",
        accept: "*/*",
      },
    };
    try {
      const response = await axios.get(`${BASE_URL}/${url}`, config);
      if (response) {
        return response;
      }
    } catch (error) {
      throw error.response.data;
    }
  },
};

export default storyToCode;

