import { createContext } from 'react';

export const initUser: User = {
  first_name: '',
  last_name: '',
  photo: '',
  posts: [],
  comments: [],
  logged_in: false,
};

export const UserContext = createContext<{
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  // eslint-disable-next-line @typescript-eslint/no-empty-function
}>({ user: initUser, setUser: () => {} });
