// src/axios.js
import axios from 'axios';

const baseApi = axios.create({
    baseURL: 'http://52.207.220.199:8080',
});

baseApi.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default baseApi;

