import { jwtDecode } from "jwt-decode";
import { axiosInstance, getAuthToken } from "../common/http";

export const registerUser = async (payload) => {
  const url = `auth/register`;
  try {
    const response = await axiosInstance.post(url, payload);
    if (response?.status === 200) {
      return response;
    } else {
      throw response;
    }
  } catch (error) {
    throw error.response.data;
  }
};

export const loginUser = async (payload) => {
  const url = `auth/login`;
  try {
    const response = await axiosInstance.post(url, payload);
    if (response?.status === 200) {
      return response;
    } else {
      throw response;
    }
  } catch (error) {
    throw error.response.data;
  }
};

export const getUser = async () => {
  let username = jwtDecode(getAuthToken()).sub;
  const url = `auth/user?userName=${username}`;
  try {
    const response = await axiosInstance.get(url);
    if (response) {
      return response;
    }
  } catch (error) {
    throw error.response.data;
  }
};
