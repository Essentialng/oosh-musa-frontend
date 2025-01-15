import { ReactNode } from "react";
export interface KeyValueObj {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  }

  type Participant = {
    _id: string;
    fullname: string;
    avatar: string;
  };

  export interface ConversationState {
    isGroup: boolean;
    groupName?: string;
    groupAdmin?: any;
    lastMessage: string;
    participants: Participant[];
    unreadCount: Record<string, number>;
    updatedAt: string;
    _id: string;
  };



export interface IStat {
  title: string;
  icon: ReactNode,
  value: string,
  color: string;
}