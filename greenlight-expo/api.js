import axios from 'axios';

const api = axios.create({
  //baseURL: 'http://192.168.4.47:5000' // ip address expo go sees - Anuj
   baseURL: 'http://10.0.0.135:5000' // ip address expo go sees - Andrew
  // baseURL: 'http://3.210.178.84:5000', // Replace <YOUR_SERVER_IP> with your backend server's IP address.
  // baseURL: 'http://3.210.35.245:5000'
  // baseURL: 'http://3.210.75.51:5000' <- Primary
});

export const getItems = async () => {
  const response = await api.get('/items');
  return response.data;
};

export const addItem = async (formData) => {
  const response = await api.post('/items', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

/* cURL command backend call

able to post to collection when running this curl command with the port of the local server

curl -X POST http://localhost:5000/items \
-H "Content-Type: application/json" \
-d '{"user": "swagmeout"}'


*/
