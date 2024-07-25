import axios from 'axios';

const API_URL = 'http://localhost:8080';

export const getLeads = async (username, password) => {
  const response = await axios.post(`${API_URL}/leads`);
  return response.data;
};
