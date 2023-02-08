export async function getAllPosts() {
  try {
    const response = await fetch('localhost:5000/posts', {
      method: 'GET',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    });
    const json_response = await response.json();
    return json_response;
  } catch (error) {
    console.error(error);
  }
}

export async function getPostsById(id: string) {
  try {
    const response = await fetch(`localhost:5000/posts/${id}`, {
      method: 'GET',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    });
    const json_response = await response.json();
    return json_response;
  } catch (error) {
    console.error(error);
  }
}

export async function getPostsByUser(id: string) {
  try {
    const response = await fetch(`localhost:5000/posts/user/${id}`, {
      method: 'GET',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    });
    const json_response = await response.json();
    return json_response;
  } catch (error) {
    console.error(error);
  }
}

export async function createPost(post: { title: string; body: string }) {
  try {
    const response = await fetch('localhost:5000/posts', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(post),
    });
    const json_response = await response.json();
    return json_response;
  } catch (error) {
    console.error(error);
  }
}

export async function updatePost(post: { title?: string; body?: string }, id: string) {
  try {
    const response = await fetch(`localhost:5000/posts/${id}`, {
      method: 'PUT',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(post),
    });
    const json_response = await response.json();
    return json_response;
  } catch (error) {
    console.error(error);
  }
}

export async function deletePost(id: string) {
  try {
    const response = await fetch(`localhost:5000/posts/${id}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    });
    const json_response = await response.json();
    return json_response;
  } catch (error) {
    console.error(error);
  }
}

export async function commentsByPost(postId: string) {
  try {
    const response = await fetch(`localhost:5000/comments/posts/${postId}`, {
      method: 'GET',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    });
    const json_response = await response.json();
    return json_response;
  } catch (error) {
    console.error(error);
  }
}

export async function createComment(obj: { body: string }, postId: string) {
  try {
    const response = await fetch(`localhost:5000/comments/posts/${postId}`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(obj),
    });
    const json_response = await response.json();
    return json_response;
  } catch (error) {
    console.error(error);
  }
}

export async function updateComment(obj: { body: string }, id: string) {
  try {
    const response = await fetch(`localhost:5000/comments/${id}`, {
      method: 'PUT',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(obj),
    });
    const json_response = await response.json();
    return json_response;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteComment(id: string) {
  try {
    const response = await fetch(`localhost:5000/comments/${id}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    });
    const json_response = await response.json();
    return json_response;
  } catch (error) {
    console.error(error);
  }
}
