import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Post, PostCreate } from './types';

const baseUrl = 'https://jsonplaceholder.typicode.com';

export const postApi = createApi({
  reducerPath: 'postApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ['Posts'],
  endpoints: (builder) => ({
    fetchPosts: builder.query<Post[], number>({
      // query: () => ({ url: '/posts' }),
      query: (page) => {
        console.log('fetching posts');
        return `/posts?_page=${page}&_limit=20`;
      },
      providesTags: (result = []) => [
        ...result.map(({ id }) => ({ type: 'Posts', id } as const)),
        { type: 'Posts' as const, id: 'LIST' },
      ],
    }),
    createPost: builder.mutation<Post, PostCreate>({
      query: (body) => ({
        url: '/posts',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Posts', id: 'LIST' }],
    }),
  }),
});

export const { useFetchPostsQuery, useCreatePostMutation } = postApi;
