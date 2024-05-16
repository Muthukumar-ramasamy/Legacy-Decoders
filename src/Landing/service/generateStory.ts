import { axiosInstance } from "../../common/http";

const BASE_URL = 'http://192.168.22.207:8080'; 

export const generateStory = async (payload: {
  userName: string;
  legacyTech: string;
  legacy_code: any;
}) => {
  const token = localStorage.getItem('token')
  const url = `/api/legacy/generate-story-brd?username=${payload.userName}&legacyTech=${payload.legacyTech}`;
  const config = {
    headers: {
      'content-type': 'multipart/form-data',
      Accept: "*/*",
      Authorization: `Bearer ${token}`
    }
  }
  try {
    const response = await axiosInstance.post(`${BASE_URL}${url}`, payload.legacy_code, config);

    if (response) {
      return response;
    }
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
