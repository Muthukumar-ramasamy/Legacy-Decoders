import { axiosInstance } from "../../common/http";

const BASE_URL = "http://192.168.22.207:8080/api/legacy/";

export const getProjects = async () => {
  const url = BASE_URL + `projects`;
  try {
    const response = await axiosInstance.get(url);
    if (response) {
      return response;
    }
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

