export interface IPostsListPayload {
  limit: number;
  skip?: number;
}

export interface IPost {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: {
    likes: number;
    dislikes: number;
  },
  views: number;
  userId: number;
}

export interface IPostsListResponse {
  posts: IPost[];
  total: number;
  skip: number;
  limit: number;
}

// Post's comments
export interface IPostCommentPayload {
  postId: number;
  limit: number;
  skip?: number;
}
export interface IPostComment {
  id: number;
  body: string;
  postId: number;
  likes: number;
  user: {
    id: number;
    username: string;
    fullName: string;
  }
}

export interface IPostCommentsResponse {
  comments: IPostComment[];
  total: number;
  skip: number;
  limit: number;
}

// Get User by userId
export interface IOtherUser {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  address: {
    address: string;
    city: string;
    country: string;
    postalCode: string;
    state: string;
  }
  age: number;
  university: string;
}
