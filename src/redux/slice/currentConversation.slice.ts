import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import { ConversationState } from '../../type/other.types';


const initialState: ConversationState = {
    isGroup: false,
    groupName: '',
    groupAdmin: null,
    lastMessage: '',
    participants: [],
    unreadCount: {},
    updatedAt: '',
    _id: ''
}


const CurrentConversationSlice = createSlice({
    name: 'currentConversation',
    initialState,
    reducers: {
        setCurrentConversation: (state, action: PayloadAction<ConversationState>)=>{
            return state = action.payload
        }
    }
})

export const {setCurrentConversation} = CurrentConversationSlice.actions;
export default CurrentConversationSlice.reducer;