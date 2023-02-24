import axios from 'axios';
import { Post, PostCreate } from './types';

const baseURL = 'https://jsonplaceholder.typicode.com';

export const fetchPosts = async (page: number) => {
  try {
    const res = await axios.get<Post[]>(`${baseURL}/posts?_page=${page}&_limit=20`);
    return res.data;
  } catch (err) {
    console.log(err);
    // return [];
    throw err;
  }
};

export const createPost = async (params: PostCreate) => {
  try {
    await axios.post(`${baseURL}/posts`, params);
  } catch (err) {
    console.log(err);
  }
};
