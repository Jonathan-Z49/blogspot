import React, { useContext, useEffect } from 'react';

import { UserContext } from '../contexts/UserContext';
import { getUserData } from '../utils/api';

const Posts = () => {
  const { user, setUser } = useContext(UserContext);

  const fetchUser = async () => {
    try {
      if (!user.logged_in) {
        const userData = (await getUserData()) as User;
        if (userData && Object.prototype.hasOwnProperty.call(userData, 'first_name')) {
          setUser({
            first_name: userData.first_name,
            last_name: userData.last_name,
            photo: userData.photo,
            comments: userData.comments,
            posts: userData.posts,
            logged_in: true,
          });
        }
        console.log(user);
        console.log(userData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return <div>Posts</div>;
};

export default Posts;
