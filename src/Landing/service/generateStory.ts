import { axiosInstance } from "../../common/http";

export const generateStory = async (payload: {
  userName: string;
  legacyTech: string;
  legacy_code: any;
}) => {
  const token = localStorage.getItem("token");
  const url = `/generate-story-brd?username=${payload.userName}&legacyTech=${payload.legacyTech}`;
  const config = {
    headers: {
      "content-type": "multipart/form-data",
      Accept: "*/*",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await axiosInstance.post(
      `${url}`,
      payload.legacy_code,
      config
    );

    if (response) {
      return response;
    }
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

