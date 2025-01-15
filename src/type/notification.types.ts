export interface IUser {
    _id: string;
    name: string;
    avatar: string;
  }
  
  // Different types of notifications
  export type NotificationType = 
    | 'FRIEND_REQUEST' 
    | 'MESSAGE' 
    | 'CHAT' 
    | 'POST' 
    | 'LIKE' 
    | 'COMMENT';
  
  // Related item models
  export type ItemModelType = 'Post' | 'Message' | 'ChatMessage' | 'Comment';
  
  // Base notification interface
  export interface INotification {
    _id: string;
    recipient: string | IUser;
    sender: string | IUser;
    type: NotificationType;
    content: string;
    relatedItem?: string;
    itemModel?: ItemModelType;
    isRead: boolean;
    createdAt: Date;
  }
  
  // Type for API response
  export interface INotificationResponse {
    notifications: INotification[];
    totalCount: number;
    unreadCount: number;
  }
  
  // Type for notification actions
  export type NotificationAction = 
    | { type: 'ADD_NOTIFICATION'; payload: INotification }
    | { type: 'MARK_AS_READ'; payload: string }
    | { type: 'SET_NOTIFICATIONS'; payload: INotification[] }
    | { type: 'CLEAR_NOTIFICATIONS' };
  
  // Type guard to check if user field is populated
  export function isPopulatedUser(user: string | IUser): user is IUser {
    return typeof user !== 'string' && user.hasOwnProperty('name');
  }
  
  // Utility type for creating new notifications
  export interface ICreateNotification {
    type: NotificationType;
    recipient: string;
    content: string;
    relatedItem?: string;
    itemModel?: ItemModelType;
  }
  
  // Specific notification type interfaces
  export interface IFriendRequestNotification extends INotification {
    type: 'FRIEND_REQUEST';
    // Add any friend request specific fields
  }
  
  export interface IMessageNotification extends INotification {
    type: 'MESSAGE';
    relatedItem: string; // messageId
    itemModel: 'Message';
    // Add any message specific fields
  }
  
  export interface IPostNotification extends INotification {
    type: 'POST';
    relatedItem: string; // postId
    itemModel: 'Post';
    // Add any post specific fields
  }
  
  // Type guard functions for specific notification types
  export function isFriendRequestNotification(
    notification: INotification
  ): notification is IFriendRequestNotification {
    return notification.type === 'FRIEND_REQUEST';
  }
  
  export function isMessageNotification(
    notification: INotification
  ): notification is IMessageNotification {
    return notification.type === 'MESSAGE';
  }
  
  export function isPostNotification(
    notification: INotification
  ): notification is IPostNotification {
    return notification.type === 'POST';
  }
  
  // Notification context state interface
  export interface INotificationState {
    notifications: INotification[];
    unreadCount: number;
    loading: boolean;
    error: string | null;
  }
  
  // Notification settings interface
  export interface INotificationSettings {
    enablePush: boolean;
    enableEmail: boolean;
    mutedUsers: string[];
    mutedTypes: NotificationType[];
  }
  
  // Notification groups for organizing in UI
  export interface INotificationGroup {
    date: string;
    notifications: INotification[];
  }
  
  // Helper function to group notifications by date
  export const groupNotificationsByDate = (
    notifications: INotification[]
  ): INotificationGroup[] => {
    const groups = notifications.reduce((acc, notification) => {
      const date = new Date(notification.createdAt).toDateString();
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(notification);
      return acc;
    }, {} as Record<string, INotification[]>);
  
    return Object.entries(groups).map(([date, notifications]) => ({
      date,
      notifications
    }));
  };
  
  // Helper function to format notification content
  export const formatNotificationContent = (notification: INotification): string => {
    if (!isPopulatedUser(notification.sender)) {
      return notification.content;
    }
  
    switch (notification.type) {
      case 'FRIEND_REQUEST':
        return `${notification.sender.name} sent you a friend request`;
      case 'MESSAGE':
        return `${notification.sender.name} sent you a message`;
      case 'POST':
        return `${notification.sender.name} made a new post`;
      case 'LIKE':
        return `${notification.sender.name} liked your post`;
      case 'COMMENT':
        return `${notification.sender.name} commented on your post`;
      default:
        return notification.content;
    }
  };