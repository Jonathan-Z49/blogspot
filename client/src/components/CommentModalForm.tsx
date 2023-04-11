import React, { forwardRef, useContext, useState } from 'react';
import { useParams } from 'react-router-dom';

import { UserContext } from '../contexts/UserContext';
import { createComment } from '../utils/api';
interface Props {
  clickOffOverlay: (e: React.MouseEvent<HTMLElement>) => void;
}

const CommentModalForm = forwardRef<HTMLFormElement, Props>(function CommentModalForm(
  props,
  ref,
) {
  const [form, setForm] = useState({ body: '' });
  const [error, setError] = useState('');
  const { user, setUser } = useContext(UserContext);

  const { id } = useParams();

  const handleCreateComment = async (
    e: React.MouseEvent<HTMLFormElement, MouseEvent>,
  ) => {
    e.preventDefault();
    try {
      if (!user.logged_in) {
        setError('Error! You are not signed in!');
      }
      if (form.body.length == 0) {
        setError('One or more of the fields are empty!');
      }
      if (form.body.length > 0 && user.logged_in) {
        await createComment(form, id as string);
        setForm({ body: '' });
        setError('');
        props.clickOffOverlay(e);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = (e.target as HTMLInputElement).name;
    const val = (e.target as HTMLInputElement).value;
    setForm({ ...form, [name]: val });
  };

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
  };

  return (
    <form
      className="comment-form"
      onSubmit={handleCreateComment}
      onClick={handleClick}
      ref={ref}
    >
      <span className="form-exit" onClick={props.clickOffOverlay}>
        &#10005;
      </span>
      <input
        type="text"
        required
        placeholder="Comment"
        name="body"
        id="body-text-comment"
        value={form.body}
        onChange={handleChangeInput}
      />
      <button type="submit">Create Comment</button>
      {error.length > 0 && <span className="form-error">{error}</span>}
    </form>
  );
});

export default CommentModalForm;
