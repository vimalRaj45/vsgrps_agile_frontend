import client from './client';

export const getTasks = (params) => client.get('/tasks', { params });
export const createTask = (data) => client.post('/tasks', data);
export const updateTask = (id, data) => client.patch(`/tasks/${id}`, data);
export const getComments = (id) => client.get(`/tasks/${id}/comments`);
export const addComment = (id, content) => client.post(`/tasks/${id}/comments`, { content });
export const getSubtasks = (id) => client.get(`/tasks/${id}/subtasks`);
export const addSubtask = (id, title) => client.post(`/tasks/${id}/subtasks`, { title });
export const updateSubtask = (id, data) => client.patch(`/tasks/subtasks/${id}`, data);
