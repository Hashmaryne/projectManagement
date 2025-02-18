import axios from 'axios';

const API_URL = 'http://localhost:8080';

export const login = async (username, password) => {
  const response = await axios.post(`${API_URL}/auth/login`, { username, password });
  return response.data;
};
