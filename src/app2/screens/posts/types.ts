export interface Post {
  id: string;
  userId: string;
  title: string;
  body: string;
}

export type PostCreate = Omit<Post, 'id'>;

export interface PostState {
  byId: Record<string, Post>;
  byUserId: Record<string, string[]>;
  allIds: string[];
  loading: boolean;
}
