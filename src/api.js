import axios from 'axios';

const API_BASE_URL = 'https://backend-722144796089.us-central1.run.app';

export const getAllNotes = () => axios.get(`${API_BASE_URL}/note`);
export const getNoteById = (id) => axios.get(`${API_BASE_URL}/note/${id}`);
export const saveNote = (data) => axios.post(`${API_BASE_URL}/note`, data);
export const updateNote = (id, data) => axios.patch(`${API_BASE_URL}/note/${id}`, data);
export const deleteNote = (id) => axios.delete(`${API_BASE_URL}/note/${id}`);
