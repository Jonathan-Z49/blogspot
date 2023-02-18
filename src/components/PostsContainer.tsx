import React, { useContext, useEffect, useRef, useState } from 'react';

import { UserContext } from '../contexts/UserContext';
import { getAllPosts, getUserData } from '../utils/api';
import PostModal from './PostModal';

const Posts = () => {
  const { user, setUser } = useContext(UserContext);
  const [posts, setPosts] = useState<Post[]>();
  const overlayRef = useRef<HTMLDivElement>(null);

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
        console.log(user.photo);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleClickOffOverlay = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    overlayRef.current?.classList.remove('active');
  };

  const handleClickAddPost = () => {
    overlayRef.current?.classList.add('active');
  };

  useEffect(() => {
    fetchUser();
    getAllPosts().then((posts) => {
      setPosts(posts);
    });
  }, []);

  return (
    <main className="posts-container">
      <section className="posts-controls">
        <button className="posts-add-btn" onClick={handleClickAddPost}>
          Add Blog
        </button>
      </section>
      <section className="posts"></section>
      <div className="modal-overlay" ref={overlayRef} onClick={handleClickOffOverlay}>
        <PostModal clickOffOverlay={handleClickOffOverlay} />
      </div>
    </main>
  );
};

export default Posts;
