import { UserState } from './user';

export interface AppState {
  user: UserState;
}

export const RESET_ALL = 'RESET_ALL';

export interface ResetAllAction {
  type: typeof RESET_ALL;
}
