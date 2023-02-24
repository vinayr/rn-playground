import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User, UserCreate } from './types';

const baseUrl = 'https://jsonplaceholder.typicode.com';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ['Users'],
  endpoints: (builder) => ({
    fetchUsers: builder.query<User[], void>({
      // query: () => ({ url: '/users' }),
      query: () => {
        console.log('fetching users');
        return '/users';
      },
      providesTags: (result = []) => [
        ...result.map(({ id }) => ({ type: 'Users', id } as const)),
        { type: 'Users' as const, id: 'LIST' },
      ],
    }),
    createUser: builder.mutation<User, UserCreate>({
      query: (body) => ({
        url: '/users',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Users', id: 'LIST' }],
    }),
    updateUser: builder.mutation<void, { id: string; body: UserCreate }>({
      query: ({ id, body }) => ({
        url: `/users/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: (_, _err, { id }) => [{ type: 'Users', id }],
    }),
    deleteUser: builder.mutation<void, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_, _err, id) => [{ type: 'Users', id }],
    }),
  }),
});

export const { useFetchUsersQuery, useCreateUserMutation, useUpdateUserMutation, useDeleteUserMutation } = userApi;
