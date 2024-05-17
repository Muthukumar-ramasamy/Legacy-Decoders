import { axiosInstance } from "../../common/http";

export const getProjects = async () => {
  const url = `/projects`;
  try {
    const response = await axiosInstance.get(url);
    if (response) {
      return response;
    }
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

