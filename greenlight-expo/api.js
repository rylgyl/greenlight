/* axios api implementation

simport axios from 'axios';

const api = axios.create({
  // const baseURL = 'http://192.168.4.47:5000'; // ip address expo go sees
  const baseURL = 'http://cluster0-shard-00-00.2idxo.mongodb.net';
  baseURL: 'http://3.210.178.84:5000', // Replace <YOUR_SERVER_IP> with your backend server's IP address.
  // baseURL: 'http://3.210.35.245:5000'
  // baseURL: 'http://3.210.75.51:5000' <- Primary
});

export const getItems = async () => {
  const response = await api.get('/items');
  return response.data;
};

export const addItem = async (item) => {
  const response = await api.post('/items', item);
  return response.data;
};

*/

/* fetch api implementation */
// const baseURL = 'http://192.168.4.47:5000'; // ip address expo go sees
const baseURL = 'http://cluster0-shard-00-00.2idxo.mongodb.net';
// const baseURL = 'https://3.210.178.84'; // Replace <YOUR_SERVER_IP> with your backend server's IP address.
// const baseURL = 'http://3.210.35.245:5000';
// const baseURL = 'http://3.210.75.51:5000'; <- Primary

export const getItems = async () => {
  try {
    const response = await fetch(`${baseURL}/items`);
    
    // Check if the response is ok (status is in the range 200-299)
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching items:', error);
    throw error; // Rethrow the error for further handling if necessary
  }
};

export const addItem = async (item) => {
  try {
    const response = await fetch(`${baseURL}/items`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Set the appropriate headers
      },
      body: JSON.stringify(item), // Convert item object to JSON string
    });
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error adding item:', error);
    throw error;
  }
};

/* cURL command backend call

able to post to collection when running this curl command with the port of the local server

curl -X POST http://localhost:5000/items \
-H "Content-Type: application/json" \
-d '{"user": "swagmeout"}'


*/
