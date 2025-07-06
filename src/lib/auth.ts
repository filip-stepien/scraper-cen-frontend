import { axiosInstance } from './axios';

export async function signIn(password: string) {
    await axiosInstance.post(`/auth/signIn`, { password });
}

export async function signOut() {
    await axiosInstance.post(`/auth/signOut`);
}

export async function checkAuth() {
    await axiosInstance.get(`/auth/check`);
}
