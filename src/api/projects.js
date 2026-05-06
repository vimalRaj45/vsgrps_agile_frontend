import client from './client';

export const getProjects = (params) => client.get('/projects', { params });
export const getProject = (id) => client.get(`/projects/${id}`);
export const createProject = (data) => client.post('/projects', data);
export const updateProject = (id, data) => client.patch(`/projects/${id}`, data);
export const getMembers = (id) => client.get(`/projects/${id}/members`);
export const addMember = (id, userId) => client.post(`/projects/${id}/members`, { user_id: userId });
export const removeMember = (id, userId) => client.delete(`/projects/${id}/members/${userId}`);
