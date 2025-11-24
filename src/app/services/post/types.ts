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
  userId: string;
}

export interface IPostsListResponse {
  posts: IPost[];
  total: number;
  skip: number;
  limit: number;
}
