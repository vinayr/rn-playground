import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { User } from '@/app1/screens/users/types';

export type RootStackParamList = {
  Home: undefined;
  UserList: undefined;
  UserProfile: { user: User };
};

export type RootStackScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<RootStackParamList, T>;
