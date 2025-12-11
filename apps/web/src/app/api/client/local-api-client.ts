import axios from 'axios';
import { config } from '../../config/config';

// Shared axios instance for internal app API
export const localApiClient = axios.create({
  baseURL: config.apiBaseUrl,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// localApiClient.interceptors.request.use(...)
// localApiClient.interceptors.response.use(...)
