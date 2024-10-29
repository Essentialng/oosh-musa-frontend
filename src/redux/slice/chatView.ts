import { createSlice } from '@reduxjs/toolkit';

interface ChatViewState {
  inView: boolean;
}

const initialState: ChatViewState = {
  inView: false,
};

const ChatViewSlice = createSlice({
  name: 'chatView',
  initialState,
  reducers: {
    openView: (state) => {
      state.inView = true;
    },
    closeView: (state) => {
      state.inView = false;
    }
  },
});

export const { closeView, openView } = ChatViewSlice.actions;
export default ChatViewSlice.reducer;