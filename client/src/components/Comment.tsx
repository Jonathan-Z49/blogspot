import React, { useContext } from 'react';

import { UserContext } from '../contexts/UserContext';

interface Props {
  comment: Comments;
  handleDelete: (_id: string) => void;
}

const Comment = (props: Props) => {
  const { user, setUser } = useContext(UserContext);

  const handleClickDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    props.handleDelete(props.comment._id);
  };

  return (
    <div className="comment-item">
      <img
        src={props.comment.author.photo}
        alt="Author"
        referrerPolicy="no-referrer"
        className="comment-item-photo"
      />
      <section className="comment-item-details">
        <div className="comment-item-body">{props.comment.body}</div>
        <div className="comment-item-info">
          <span className="comment-item-author">
            {props.comment.author.first_name +
              ' ' +
              props.comment.author.last_name.slice(0, 1)}
          </span>
          <span className="comment-item-date">{props.comment.date.slice(0, 10)}</span>
          {user._id == props.comment.author._id && (
            <button className="comment-delete-btn" onClick={handleClickDelete}>
              Delete
            </button>
          )}
        </div>
      </section>
    </div>
  );
};

export default Comment;
