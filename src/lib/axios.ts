import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL;

if (!baseURL) {
    console.error('Nie udało się odczytać adresu serwera z produktami.');
}

export const axiosInstance = axios.create({
    baseURL,
    timeout: 5000
});

let onUnauthorizedCallback: (() => void) | null = null;

export const registerUnauthorizedHandler = (cb: () => void) => {
    onUnauthorizedCallback = cb;
};

axiosInstance.interceptors.response.use(
    response => response,
    error => {
        if (error?.response?.status === 401 && onUnauthorizedCallback) {
            onUnauthorizedCallback();
        }
        return Promise.reject(error);
    }
);
