import { axiosInstance } from '../common/http';


export const registerUser = async (payload) => {
    const url = `/auth/register`
    try {
        const response = await axiosInstance.post(url, payload);
        if (response?.status === 200) {
            console.log(response)
            return response
        } else {
            throw response
        }
    } catch (error) {
        throw error.response.data;
    }
}

export const loginUser = async (payload) => {
    const url = `/auth/login`
    try {
        const response = await axiosInstance.post(url, payload)
        if (response?.status === 200) {
            console.log(response)
            return response
        } else {
            throw response
        }
    } catch (error) {
        throw error;
    }
}