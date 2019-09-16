import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { NewUser, User } from './types';

// https://github.com/axios/axios/issues/1510
declare module 'axios' {
  export interface AxiosResponse<T = any> extends Promise<T> {}
}

class Api {
  constructor() {
    axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';
    axios.interceptors.request.use(this.handleRequest);
    axios.interceptors.response.use(this.handleResponse);
  }

  private handleRequest = (request: AxiosRequestConfig) => {
    // await refreshToken();
    // request.headers.Authorization = `Bearer ${keycloak.token}`;
    return request;
  };

  private handleResponse = (response: AxiosResponse) => response.data;

  public getUsers = () => axios.get<User[]>('/users');
  public createUser = (params: NewUser) => axios.post('/users', params);
  public updateUser = (id: number, params: NewUser) => axios.put(`/users/${id}`, params);
  public deleteUser = (id: number) => axios.delete(`/users/${id}`);
}

export default new Api();
