import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { INewUser, IUser } from './interfaces';

// https://github.com/axios/axios/issues/1510
declare module 'axios' {
  export interface AxiosResponse<T = any> extends Promise<T> {}
}

class Api {
  constructor() {
    axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';
    axios.interceptors.request.use(this.handleRequest);
    axios.interceptors.response.use(this.handleResponse, this.handleResponseError);
  }

  private handleRequest = (request: AxiosRequestConfig) => {
    // await refreshToken();
    // request.headers.Authorization = `Bearer ${keycloak.token}`;
    return request;
  };

  private handleResponse = (response: AxiosResponse) => response.data;

  private handleResponseError = (error: AxiosError) => {
    // if (error.response) {
    //   dispatch(showError(error.response.data.error));
    //   return;
    // }
    if (error.message) {
      // dispatch(showError(error.message));
      console.log('API error', error.message);
    }
  };

  public getUsers = () => axios.get<IUser[]>('/users');
  public createUser = (params: INewUser) => axios.post('/users', params);
  public updateUser = (id: number, params: INewUser) => axios.put(`/users/${id}`, params);
  public deleteUser = (id: number) => axios.delete(`/users/${id}`);
}

export default new Api();
