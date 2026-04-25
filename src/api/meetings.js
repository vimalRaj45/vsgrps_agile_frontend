import client from './client';

export const getMeetings = (params) => client.get('/meetings', { params });
export const getMeeting = (id) => client.get(`/meetings/${id}`);
export const createMeeting = (data) => client.post('/meetings', data);
export const updateMeeting = (id, data) => client.patch(`/meetings/${id}`, data);
export const getNotes = (id) => client.get(`/meetings/${id}/notes`);
export const addNote = (id, data) => client.post(`/meetings/${id}/notes`, data);
export const updateNote = (id, data) => client.patch(`/meetings/notes/${id}`, data);
