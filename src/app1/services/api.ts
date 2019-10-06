import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { NewUser, User, NewPost, Post } from 'app1/types';
import { alert } from 'app1/utils';

// https://github.com/axios/axios/issues/1510
declare module 'axios' {
  export interface AxiosResponse<T = any> extends Promise<T> {}
}

class Api {
  constructor() {
    axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';
    axios.interceptors.request.use(this.handleRequest);
    axios.interceptors.response.use(this.handleResponse, this.handleError);
  }

  private handleRequest = (request: AxiosRequestConfig) => {
    // await refreshToken();
    // request.headers.Authorization = `Bearer ${keycloak.token}`;
    return request;
  };

  private handleResponse = (response: AxiosResponse) => response.data;

  private handleError = (error: AxiosError) => {
    if (error.response) {
      // server error
      switch (error.response.status) {
        case 401:
          alert('Error', 'Unauthorized');
          break;
        case 403:
          alert('Error', 'Forbidden');
          break;
        case 404:
          alert('Error', 'Server error. Please try again later.');
          break;
        case 409:
          alert('Error', 'Account already exists');
          break;
        default:
          console.log('Unknown server error', error);
      }
    } else if (error.message) {
      // client error
      switch (error.message) {
        case 'Network Error':
          alert('Error', 'Connection failed');
          break;
        default:
          console.log('Unknown client error', error);
      }
    } else {
      console.log('Unknown error', error);
    }
    return null;
  };

  public fetchUsers = () => axios.get<User[]>('/users');
  public createUser = (params: NewUser) => axios.post('/users', params);
  public updateUser = (id: number, params: NewUser) => axios.put(`/users/${id}`, params);
  public deleteUser = (id: number) => axios.delete(`/users/${id}`);

  public fetchPosts = (page: number) => axios.get<Post[]>(`/posts?_page=${page}&_limit=20`);
  public createPost = (params: NewPost) => axios.post('/posts', params);
}

export default new Api();
