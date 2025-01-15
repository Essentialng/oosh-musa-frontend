// postSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../type/post.type';
import toast from 'react-hot-toast';


type PostState = {
  posts: Post[];
};

const initialState: PostState = {
  posts: [],
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
    },

    addPost: (state, action: PayloadAction<Post>) => {
      state.posts.push(action.payload);
    },

    updatePost: (state, action: PayloadAction<{ _id: string; updates: Partial<Post> }>) => {
      const postIndex = state.posts.findIndex((post) => post.id === action.payload._id);
      if (postIndex !== -1) {
        state.posts[postIndex] = { ...state.posts[postIndex], ...action.payload.updates };
      }
      toast.success('New!!')
    },

    deletePost: (state, action: PayloadAction<string>) => {
      state.posts = state.posts.filter((post) => post.id !== action.payload);
    },

    addLike: (state, action: PayloadAction<{ postId: string; userId: string }>) => {
      const postIndex = state.posts.findIndex((post) => post.id === action.payload.postId);
      if (postIndex !== -1) {
        state.posts[postIndex].likes.push(action.payload.userId);
      }
    },

    removeLike: (state, action: PayloadAction<{ postId: string; userId: string }>) => {
      const postIndex = state.posts.findIndex((post) => post.id === action.payload.postId);
      if (postIndex !== -1) {
        state.posts[postIndex].likes = state.posts[postIndex].likes.filter((id) => id !== action.payload.userId);
      }
    },

    addComment: (state, action: PayloadAction<any>) => {
      const postIndex = state.posts.findIndex((post) => post.id === action.payload.post);
      if (postIndex !== -1) {
        state.posts[postIndex].comments.push(action.payload);
      }
    },

    deleteComment: (state, action: PayloadAction<{ postId: string; commentId: string }>) => {
      const postIndex = state.posts.findIndex((post) => post.id === action.payload.postId);
      if (postIndex !== -1) {
        state.posts[postIndex].comments = state.posts[postIndex].comments.filter((comment) => comment.id !== action.payload.commentId);
      }
    },
    
  },
});

export const { setPosts, addPost, updatePost, deletePost, addLike, removeLike, addComment, deleteComment } = postSlice.actions;
export default postSlice.reducer;