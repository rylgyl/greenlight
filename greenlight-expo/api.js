import axios from 'axios';

const api = axios.create({
  baseURL: '3.210.178.84:5000', // Replace <YOUR_SERVER_IP> with your backend server's IP address.
});

export const getItems = async () => {
  const response = await api.get('/items');
  return response.data;
};

export const addItem = async (item) => {
  const response = await api.post('/items', item);
  return response.data;
};