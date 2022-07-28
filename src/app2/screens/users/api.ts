import axios from 'axios';
import { User, UserCreate } from './types';

const baseURL = 'https://jsonplaceholder.typicode.com';

export const fetchUsers = async () => {
  try {
    const res = await axios.get<User[]>(`${baseURL}/users`);
    return res.data;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const createUser = async (params: UserCreate) => {
  try {
    await axios.post(`${baseURL}/users`, params);
  } catch (err) {
    console.log(err);
  }
};

export const updateUser = async (id: string, params: UserCreate) => {
  try {
    await axios.put(`${baseURL}/users/${id}`, params);
  } catch (err) {
    console.log(err);
  }
};

export const deleteUser = async (id: string) => {
  try {
    await axios.delete(`${baseURL}/users/${id}`);
  } catch (err) {
    console.log(err);
  }
};
