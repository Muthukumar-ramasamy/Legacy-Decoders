import axios from 'axios';
import { axiosInstance, getAuthToken } from '../common/http';
import { jwtDecode } from 'jwt-decode';


export const registerUser = async (payload) => {
    const url = `/auth/register`
    try {
        const response = await axiosInstance.post(url, payload);
        if (response) {
            console.log(response)
            return response
        }
    } catch (error) {
        throw error.response.data;
    }
}

export const loginUser = async (payload) => {
    const url = `/auth/login`
    try {
        const response = await axiosInstance.post(url, payload)
        if (response) {
            console.log(response)
            return response
        }
    } catch (error) {
        throw error.response.data;
    }
}

export const getUser = async () => {
    let username = jwtDecode(getAuthToken()).sub
    const url = `/auth/user?userName=${username}`
    try {
        const response = await axiosInstance.get(url)
        if (response) {
            console.log(response)
            return response
        }
    } catch (error) {
        throw error.response.data;
    }
}