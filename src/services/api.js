import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Interceptor: tự động gắn token vào header Authorization cho MỌI request
// (giống cách bạn gắn "Bearer <token>" thủ công trong Thunder Client, nhưng tự động)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
