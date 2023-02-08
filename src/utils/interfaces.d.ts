interface User {
  first_name: string;
  last_name: string;
  photo: string;
  posts: Post[];
  comments: Comment[];
  logged_in: boolean;
}

interface Comment {
  author: User;
  body: string;
  date: Date;
}

interface Post {
  title: string;
  body: string;
  author: User;
  date: Date;
  comments: Comment[];
}
