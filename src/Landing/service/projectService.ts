import { axiosInstance } from "../../common/http";

const BASE_URL = 'http://192.168.22.207:8080';

   export const getProjects = async () => {
        const url = BASE_URL+`/api/legacy/projects`;
        try {
            const response = await axiosInstance.get(url);
            if (response) {
                return response;
            }
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }
