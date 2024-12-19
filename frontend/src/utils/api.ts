import axios from 'axios';

export const apiClient = axios.create({
  baseURL: "http://localhost:5000", // Set your API base URL here
  withCredentials: true, // This ensures that cookies are sent with requests
});