import { message } from "antd";
import axios from "axios";

const apiClient = axios.create({
 baseURL: 'http://127.0.0.1:5000/api'
})

// 请求拦截
apiClient.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
)

// 响应拦截
apiClient.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    console.log(error, 'error===')
    const status = error.status;
    switch (status) {
      case 403:
        localStorage.removeItem('token');
        window.location.href = '/login';
        break;
      default:
        message.error(error.message);
    }
    return Promise.reject(error);
  }
)

export default apiClient;