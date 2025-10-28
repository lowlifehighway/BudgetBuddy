import axios from 'axios';

const devURL = 'http://localhost:5000';
const buildURL =
  'https://budgetbuddy-backend-317312360411.us-central1.run.app/';
const api = axios.create({
  baseURL: buildURL,
  withCredentials: true, // send cookies automatically
});
export default api;
