import axios from 'axios';

const baseURL = 'http://localhost:5000';
const api = axios.create({
  baseURL: baseURL,
  withCredentials: true, // send cookies automatically
});
export default api;
