import axios from 'axios';

const createAxiosInstance = (token?: string) => {

    const instance = axios.create({
        baseURL: 'http://127.0.0.1:8000/api',
        timeout: 10000,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    instance.interceptors.request.use(
        (config) => {
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    instance.interceptors.response.use(
        (response) => response,
        (error) => {
            return Promise.reject(error);
        }
    );

    return instance;
};

const axiosWrapper = {
    createAxiosInstance,
    get: (url: string, config = {}) => createAxiosInstance().get(url, config),
    post: (url: string, data: any, config = {}) => createAxiosInstance().post(url, data, config),
    put: (url: string, data: any, config = {}) => createAxiosInstance().put(url, data, config),
};

export default axiosWrapper;