import client from './client';

export const getFiles = (params) => client.get('/files', { params });
export const uploadFile = (formData) => client.post('/files/upload', formData, {
  headers: { 'Content-Type': 'multipart/form-data' }
});
export const getLinks = (params) => client.get('/files/links', { params });
export const addLink = (data) => client.post('/files/links', data);
export const downloadFile = (id) => `${client.defaults.baseURL}/files/${id}/download`;
