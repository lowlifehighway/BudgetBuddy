import axios from 'axios';

const devURL = 'http://localhost:5000';
const buildURL = 'https://fleet-diagram-476213-v8.uc.r.appspot.com/';
const api = axios.create({
  baseURL: buildURL,
  withCredentials: true, // send cookies automatically
});
export default api;
