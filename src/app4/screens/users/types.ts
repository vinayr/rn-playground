export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
}

export type UserCreate = Omit<User, 'id'>;

export interface UserState {
  byId: Record<string, User>;
  allIds: string[];
  loading: boolean;
}
