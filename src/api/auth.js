import client from './client';

export const login = (email, password, rememberMe) => client.post('/auth/login', { email, password, rememberMe });
export const register = (data) => client.post('/auth/register', data);
export const logout = () => client.post('/auth/logout');
export const me = () => client.get('/auth/me');
export const getUsers = () => client.get('/auth/users');
export const forgotPassword = (email) => client.post('/auth/forgot-password', { email });
export const resetPassword = (token, password) => client.post('/auth/reset-password', { token, password });
