import axios from 'axios';
import { baseURL, headers } from '@/networking/config';
import { resInterceptor } from '@/networking/interceptors';
import AsyncStorage from '@react-native-async-storage/async-storage';

export class NetworkService {
  constructor() {
    this.client = axios.create({ baseURL, headers });
    this.client.interceptors.response.use(resInterceptor.onFulfill, resInterceptor.onReject);

    this.client.interceptors.request.use(
      async (config) => {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          config.headers.authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  setAccessToken(token) {
    this.client.defaults.headers.common.authorization = `Bearer ${token}`;
  }

  clearAccessToken() {
    delete this.client.defaults.headers.common.authorization;
  }

  request({ method, url, data, ...config }) {
    return this.client.request({ method, url, data, ...config });
  }
}

export const networkService = new NetworkService();
