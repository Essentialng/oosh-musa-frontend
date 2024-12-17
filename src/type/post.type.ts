export type Post = {
    id: string;
    author: string;
    content: string;
    likes: string[];
    comments: { id: string; userId: string; content: string }[];
    createdAt?: string;
  };


  export interface IPostFormInputs {
    content: string;
    author: string;
    media?: string | any;
  }