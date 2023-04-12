export async function getAllPosts() {
  try {
    const response = await fetch(
      'https://blog-server-production-82ec.up.railway.app/posts',
      {
        method: 'GET',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      },
    );
    const json_response: Post[] = await response.json();
    return json_response;
  } catch (error) {
    console.error(error);
  }
}

export async function getPostById(id: string) {
  try {
    const response = await fetch(
      `https://blog-server-production-82ec.up.railway.app/posts/${id}`,
      {
        method: 'GET',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      },
    );
    const json_response: Post = await response.json();
    return json_response;
  } catch (error) {
    console.error(error);
  }
}

export async function getPostsByUser(id: string) {
  try {
    const response = await fetch(
      `https://blog-server-production-82ec.up.railway.app/posts/user/${id}`,
      {
        method: 'GET',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      },
    );
    const json_response: Post[] = await response.json();
    return json_response;
  } catch (error) {
    console.error(error);
  }
}

export async function createPost(post: { title: string; body: string }) {
  try {
    const response = await fetch(
      'https://blog-server-production-82ec.up.railway.app/posts',
      {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(post),
      },
    );
    const json_response = await response.json();
    return json_response;
  } catch (error) {
    console.error(error);
  }
}

export async function updatePost(post: { title?: string; body?: string }, id: string) {
  try {
    const response = await fetch(
      `https://blog-server-production-82ec.up.railway.app/posts/${id}`,
      {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(post),
      },
    );
    const json_response = await response.json();
    return json_response;
  } catch (error) {
    console.error(error);
  }
}

export async function deletePost(id: string) {
  try {
    if (id) {
      const response = await fetch(
        `https://blog-server-production-82ec.up.railway.app/posts/${id}`,
        {
          method: 'DELETE',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
        },
      );
      const json_response = await response.json();
      return json_response;
    }
    return;
  } catch (error) {
    console.error(error);
  }
}

export async function commentsByPost(postId: string) {
  try {
    const response = await fetch(
      `https://blog-server-production-82ec.up.railway.app/comments/posts/${postId}`,
      {
        method: 'GET',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      },
    );
    const json_response: Comment[] = await response.json();
    return json_response;
  } catch (error) {
    console.error(error);
  }
}

export async function createComment(obj: { body: string }, postId: string) {
  try {
    const response = await fetch(
      `https://blog-server-production-82ec.up.railway.app/comments/posts/${postId}`,
      {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj),
      },
    );
    const json_response = await response.json();
    return json_response;
  } catch (error) {
    console.error(error);
  }
}

export async function updateComment(obj: { body: string }, id: string) {
  try {
    const response = await fetch(
      `https://blog-server-production-82ec.up.railway.app/comments/${id}`,
      {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj),
      },
    );
    const json_response = await response.json();
    return json_response;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteComment(id: string) {
  try {
    const response = await fetch(
      `https://blog-server-production-82ec.up.railway.app/comments/${id}`,
      {
        method: 'DELETE',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      },
    );
    const json_response = await response.json();
    return json_response;
  } catch (error) {
    console.error(error);
  }
}

export async function getUserData() {
  try {
    const response = await fetch(
      `https://blog-server-production-82ec.up.railway.app/login/success`,
      {
        method: 'GET',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      },
    );
    const json_response: User | { status: string } = await response.json();
    return json_response;
  } catch (error) {
    console.error(error);
  }
}

export async function userLogout() {
  try {
    const response = await fetch(
      `https://blog-server-production-82ec.up.railway.app/logout`,
      {
        method: 'GET',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      },
    );
    const json_response: { status: string } = await response.json();
    console.log(json_response);

    return json_response;
  } catch (error) {
    console.error(error);
  }
}
