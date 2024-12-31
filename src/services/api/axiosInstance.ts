import axios from 'axios';

const baseURL =
  process.env.NODE_ENV === 'production'
    ? 'https://my-json-server.typicode.com/hiennt186/arent-test'
    : 'http://localhost:3001';

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;
