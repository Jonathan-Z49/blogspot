import React, { forwardRef, useContext, useEffect, useState } from 'react';

import { UserContext } from '../contexts/UserContext';
import { createPost, updatePost } from '../utils/api';

interface Props {
  mode: {
    status: 'CREATE' | 'EDIT';
    postToEdit: Post | null;
  };
  clickOffOverlay: (e: React.MouseEvent<HTMLElement>) => void;
}

const PostModal = forwardRef<HTMLFormElement, Props>(function PostModal(props, ref) {
  const [form, setForm] = useState({ title: '', body: '' });
  const [error, setError] = useState('');
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    if (props.mode.status == 'EDIT') {
      setForm({
        title: props.mode.postToEdit?.title as string,
        body: props.mode.postToEdit?.body as string,
      });
    } else {
      setForm({ title: '', body: '' });
    }
  }, [props.mode.postToEdit]);

  const handleCreatePost = async (e: React.MouseEvent<HTMLFormElement, MouseEvent>) => {
    try {
      if (!user.logged_in) {
        setError('Error! You are not signed in!');
      }
      if (form.title.length == 0 || form.body.length == 0) {
        setError('One or more of the fields are empty!');
      }
      if (form.title.length > 0 && form.body.length > 0 && user.logged_in) {
        await createPost(form);
        setForm({ title: '', body: '' });
        setError('');
        props.clickOffOverlay(e);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditPost = async (e: React.MouseEvent<HTMLFormElement, MouseEvent>) => {
    try {
      if (!user.logged_in) {
        setError('Error! You are not signed in!');
      }
      if (form.title.length == 0 || form.body.length == 0) {
        setError('One or more of the fields are empty!');
      }
      if (form.title.length > 0 && form.body.length > 0 && user.logged_in) {
        await updatePost(
          { title: form.title, body: form.body },
          props.mode.postToEdit?._id as string,
        );
        setForm({ title: '', body: '' });
        setError('');
        props.clickOffOverlay(e);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleClickSubmit = (e: React.MouseEvent<HTMLFormElement, MouseEvent>) => {
    e.preventDefault();
    switch (props.mode.status) {
      case 'CREATE':
        handleCreatePost(e);
        break;
      case 'EDIT':
        handleEditPost(e);
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
      className="post-form"
      onSubmit={handleClickSubmit}
      onClick={handleClick}
      ref={ref}
    >
      <span className="form-exit" onClick={props.clickOffOverlay}>
        &#10005;
      </span>
      <input
        type="text"
        required
        placeholder="Title"
        name="title"
        id="title-text-post"
        value={form.title}
        onChange={handleChangeInput}
      />
      <input
        type="text"
        required
        name="body"
        placeholder="Description"
        id="body-text-post"
        onChange={handleChangeInput}
        value={form.body}
      />
      {props.mode.status === 'CREATE' ? (
        <button type="submit">Create Post</button>
      ) : (
        <button type="submit">Edit Post</button>
      )}
      {error.length > 0 && <span className="form-error">{error}</span>}
    </form>
  );
});

export default PostModal;
