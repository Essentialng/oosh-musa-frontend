import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ConversationState } from '../../type/other.types';



type ConversationSliceState = {
  conversations: ConversationState[];
};

const initialState: ConversationSliceState = {
  conversations: [],
};

const conversationSlice = createSlice({
  name: 'conversation',
  initialState,
  reducers: {
    setConversations: {
      prepare: (conversations: ConversationState[]) => ({
        payload: conversations
      }),
      reducer: (state, action: PayloadAction<ConversationState[]>) => {
        return {
          ...state,
          conversations: [...action.payload]
        }
      }
    },
    addConversation: {
      prepare: (conversation: ConversationState) => ({
        payload: conversation
      }),
      reducer: (state, action: PayloadAction<ConversationState>) => {
        return {
          ...state,
          conversations: [...state.conversations, action.payload]
        }
      }
    },
  }
});

export const { 
  setConversations, 
  addConversation, 
} = conversationSlice.actions;

export default conversationSlice.reducer;