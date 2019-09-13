import { combineReducers, AnyAction } from 'redux';
import { IStoreState } from '../interfaces';
import user from './user';

export default combineReducers<IStoreState, AnyAction>({
  user,
});
