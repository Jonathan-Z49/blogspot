interface User {
  _id: string;
  first_name: string;
  last_name: string;
  photo: string;
  posts: Post[];
  comments: Comments[];
  logged_in: boolean;
}

interface Comments {
  _id: string;
  author: User;
  body: string;
  date: string;
}

interface Post {
  _id: string;
  title: string;
  body: string;
  author: User;
  date: string;
  comments: Comments[];
}
