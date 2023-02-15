import React, { useContext, useState } from 'react';

import { UserContext } from '../contexts/UserContext';
import { createPost } from '../utils/api';

interface Props {
  clickOffOverlay: (e: React.MouseEvent<HTMLElement>) => void;
}

const PostModal = (props: Props) => {
  const [form, setForm] = useState({ title: '', body: '' });
  const [error, setError] = useState('');
  const { user, setUser } = useContext(UserContext);

  const handleClickSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (form.title.length > 0 && form.body.length > 0 && user.logged_in) {
        await createPost(form);
        setForm({ title: '', body: '' });
        setError('');
      }
      if (!user.logged_in) {
        setError('Error! You are not signed in!');
      }
      if (form.title.length == 0 || form.body.length == 0) {
        setError('One or more of the fields are empty!');
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
    <form className="post-form" onSubmit={handleClickSubmit} onClick={handleClick}>
      <span className="post-form-exit" onClick={props.clickOffOverlay}>
        &#10005;
      </span>
      <input
        type="text"
        required
        placeholder="Title"
        name="title"
        id="title-text"
        value={form.title}
        onChange={handleChangeInput}
      />
      <input
        type="text"
        required
        name="body"
        placeholder="Description"
        id="body-text"
        onChange={handleChangeInput}
        value={form.body}
      />
      <button type="submit">Create Post</button>
      {error.length > 0 && <span className="form-error">{error}</span>}
    </form>
  );
};

export default PostModal;
