import React, { useContext, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import { UserContext } from '../contexts/UserContext';
import {
  deleteComment,
  deletePost,
  getAllPosts,
  getPostById,
  getUserData,
} from '../utils/api';
import Comment from './Comment';
import CommentModalForm from './CommentModalForm';
import PostDetails from './PostDetails';
import PostModalForm from './PostModalForm';

interface Props {
  single_post: boolean;
  all_posts: boolean;
}

const PostsContainer = (props: Props) => {
  const { user, setUser } = useContext(UserContext);
  const [posts, setPosts] = useState<Post[]>();
  const [mode, setMode] = useState<{
    status: 'CREATE' | 'EDIT';
    postToEdit: Post | null;
  }>({
    status: 'CREATE',
    postToEdit: null,
  });

  const { id } = useParams();
  const [reload, setReload] = useState(false);

  const overlayRef = useRef<HTMLDivElement>(null);
  const postFormRef = useRef<HTMLFormElement>(null);
  const commentFormRef = useRef<HTMLFormElement>(null);

  const fetchUser = async () => {
    try {
      if (!user.logged_in) {
        const userData = (await getUserData()) as User;
        if (userData && Object.prototype.hasOwnProperty.call(userData, 'first_name')) {
          setUser({
            _id: userData._id,
            first_name: userData.first_name,
            last_name: userData.last_name,
            photo: userData.photo,
            comments: userData.comments,
            posts: userData.posts,
            logged_in: true,
          });
        }
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
    postFormRef.current?.classList.add('active');
    commentFormRef.current?.classList.remove('active');
    setMode({ status: 'CREATE', postToEdit: null });
  };

  const handleClickDeletePost = async (_id: string) => {
    try {
      await deletePost(_id);
      setReload((prevState) => !prevState);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClickEditPost = async (post: Post) => {
    try {
      overlayRef.current?.classList.add('active');
      postFormRef.current?.classList.add('active');
      commentFormRef.current?.classList.remove('active');
      setMode({ status: 'EDIT', postToEdit: post });
    } catch (error) {
      console.error(error);
    }
  };

  const handleClickAddComment = () => {
    overlayRef.current?.classList.add('active');
    commentFormRef.current?.classList.add('active');
    postFormRef.current?.classList.remove('active');
  };

  const handleClickDeleteComment = async (_id: string) => {
    try {
      await deleteComment(_id);
      setReload((prevState) => !prevState);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUser();
    if (props.all_posts) {
      getAllPosts().then((posts) => {
        setPosts(posts);
      });
    }
    if (props.single_post) {
      getPostById(id as string).then((post) => {
        const obj = post as Post;
        setPosts([obj]);
      });
    }
  }, [id, reload]);

  return (
    <main className="posts-container">
      <section className="controls">
        {props.all_posts && (
          <button className="posts-add-btn" onClick={handleClickAddPost}>
            Add Blog
          </button>
        )}
        {props.single_post && (
          <button className="comments-add-btn" onClick={handleClickAddComment}>
            Add Comment
          </button>
        )}
      </section>
      <section className="posts">
        {posts?.map((item) => (
          <PostDetails
            key={item._id}
            post={item}
            handleClickDelete={handleClickDeletePost}
            handleClickEdit={handleClickEditPost}
          />
        ))}
      </section>
      {props.single_post && (
        <section className="comments">
          {posts &&
            posts.length > 0 &&
            posts[0].comments &&
            posts[0].comments.length > 0 && <h1 className="comments-header">Comments</h1>}
          {posts &&
            posts.length > 0 &&
            posts[0].comments.map((cmt) => (
              <Comment
                comment={cmt}
                handleDelete={handleClickDeleteComment}
                key={cmt._id}
              />
            ))}
        </section>
      )}
      <div className="modal-overlay" ref={overlayRef} onClick={handleClickOffOverlay}>
        <PostModalForm
          ref={postFormRef}
          clickOffOverlay={handleClickOffOverlay}
          mode={mode}
        />
        {props.single_post && (
          <CommentModalForm
            ref={commentFormRef}
            clickOffOverlay={handleClickOffOverlay}
          />
        )}
      </div>
    </main>
  );
};

export default PostsContainer;
