import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { UserContext } from '../contexts/UserContext';

interface Props {
  post: Post;
  handleClickDelete: (_id: string) => void;
  handleClickEdit: (post: Post) => void;
}

const PostDetails = (props: Props) => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleClickDeletePost = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    props.handleClickDelete(props.post._id);
  };

  const handleClickEditPost = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    props.handleClickEdit(props.post);
  };

  const handleClickToView = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    navigate(`/posts/${props.post._id}`);
  };

  return (
    <div className="post-item" onClick={handleClickToView}>
      <img
        src={props.post.author.photo}
        alt="Author"
        referrerPolicy="no-referrer"
        className="post-item-photo"
      />
      <section className="post-details">
        <p className="post-item-title">{props.post.title}</p>
        <p className="post-item-body">{props.post.body}</p>
        {user._id == props.post.author._id && (
          <div className="post-item-controls">
            <button className="post-item-edit" onClick={handleClickEditPost}>
              Edit
            </button>
            <button className="post-item-delete" onClick={handleClickDeletePost}>
              Delete
            </button>
          </div>
        )}
        <div className="post-item-info">
          <p className="post-item-author">
            {props.post.author.first_name + ' ' + props.post.author.last_name.slice(0, 1)}
          </p>
          <p className="post-item-date">{props.post.date.slice(0, 10)}</p>
          <p className="post-item-comments">
            {props.post.comments.length.toString() + ' Comments'}
          </p>
        </div>
      </section>
    </div>
  );
};

export default PostDetails;
