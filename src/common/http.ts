import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Cross-Origin-Resource-Policy": "cross-origin",
    "Access-Control-Allow-Origin": "*"
}

export const getAuthToken = () => {
    const token = localStorage.getItem("token")
    return token
}


export const axiosInstance = axios.create({
    baseURL: 'http://legacy-alb-669407586.us-east-1.elb.amazonaws.com/api/legacy',
    headers: headers
});

const onRequest = (config) => {
    const token = getAuthToken()
    if (config && config.headers && token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
}

const onResponse = (response) => {
    return response
}

const onResponseError = (error) => {
    console.log(error)
    const { status } = error?.response
    switch (status) {
        case 403:
        case 401: {
            localStorage.removeItem("token")
            window.location.href = "/auth"
            break
        }
        default: {
            console.log(error)
            break
        }
    }
    return error
}

const onRequestError = (error) => {
    console.log(error)
    return error
}

axiosInstance.interceptors.request.use(onRequest, onRequestError)
axiosInstance.interceptors.response.use(onResponse, onResponseError)

