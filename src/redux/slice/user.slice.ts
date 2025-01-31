import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IUserState {
  _id: string;
  fullname: string;
  username: string;
  email: string;
  avatar: string;
  profile: string;
  accessToken: string;
  followers: string[];
  followings: string[];
  friendRequest: string[];
  friends: string[];
  status: string[];
}

export const initialState: IUserState = {
  _id: "",
  fullname: "",
  username: "",
  email: "",
  avatar: "",
  profile: "",
  accessToken: "",
  followers: [],
  followings: [],
  friendRequest: [],
  friends: [],
  status: [],
};

const UserSlice = createSlice({
  name: "userProfile",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUserState>) => {
      return action.payload;
    },

    updateUserProfile: (state, action: PayloadAction<Partial<IUserState>>) => {
      return { ...state, ...action.payload };
    },

    removeRequest: (state, action: PayloadAction<Partial<IUserState>>) => {
      return {
        ...state,
        ...state.friendRequest.filter(
          (eachRequest: any) => eachRequest._id === action.payload
        ),
      };
    },

    // addFollower: (state, action: PayloadAction<string>) => {
    //     if (!state.followers) state.followers = [];
    //     state.followers.push(action.payload);
    // },

    // removeFollower: (state, action: PayloadAction<string>) => {
    //     if (state.followers) {
    //         state.followers = state.followers.filter(id => id !== action.payload);
    //     }
    // },

    // addFollowing: (state, action: PayloadAction<string>) => {
    //     if (!state.following) state.following = [];
    //     state.following.push(action.payload);
    // },

    // removeFollowing: (state, action: PayloadAction<string>) => {
    //     if (state.following) {
    //         state.following = state.following.filter(id => id !== action.payload);
    //     }
    // },

    // addPost: (state, action: PayloadAction<string>) => {
    //     if (!state.posts) state.posts = [];
    //     state.posts.push(action.payload);
    // },

    // removePost: (state, action: PayloadAction<string>) => {
    //     if (state.posts) {
    //         state.posts = state.posts.filter(id => id !== action.payload);
    //     }
    // },
  },
});

export const {
  setUser,
  updateUserProfile,
  // addFollower,
  // removeFollower,
  // addFollowing,
  // removeFollowing,
  // addPost,
  // removePost
} = UserSlice.actions;

export default UserSlice.reducer;
