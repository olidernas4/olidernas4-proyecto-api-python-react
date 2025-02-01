import axios from 'axios';

const API_URLCREATE = 'http://127.0.0.1:8000/profesores/create/';
const API_URLCONECT = 'http://127.0.0.1:8000/profesores_conect/';

const API_URLUPDATE = 'http://127.0.0.1:8000/profesores/update/{id}';
const API_URL = 'http://127.0.0.1:8000/profesores/';

export const fetchProfesores = async () => {
  const response = await axios.get(`${API_URLCONECT}conect/`);
  return response.data;
};

export const createProfesor = async (profesor) => {
  await axios.post(API_URLCREATE, profesor);
};

export const updateProfesor = async (id, profesor) => {
  await axios.put(`${API_URLUPDATE}${id}/`, profesor);
};

export const deleteProfesor = async (id) => {
  await axios.delete(`${API_URL}${id}/`);
};