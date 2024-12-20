// components/Notifications.tsx
import React, { useState, useEffect } from 'react';
import { useSocket } from '../../context/socket.context';
import { useSocketEvent } from '../../hooks/useSocketEvent';
import { INotification, IUser } from '../../type/notification.types'; 

const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const { socket, isConnected } = useSocket();

  // Using the generic socket event hook
  useSocketEvent<INotification>('notification:new', (notification) => {
    setNotifications(prev => [notification, ...prev]);
  });

  useEffect(() => {
    // Fetch initial notifications when component mounts
    const fetchNotifications = async () => {
      try {
        const response = await fetch('/api/notifications');
        const data = await response.json();
        setNotifications(data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    if (isConnected) {
      fetchNotifications();
    }
  }, [isConnected]);

  const markAsRead = async (id: string) => {
    try {
      await fetch(`/api/notifications/${id}/read`, {
        method: 'PUT',
      });
      setNotifications(prev =>
        prev.map(notif =>
          notif._id === id ? { ...notif, isRead: true } : notif
        )
      );
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  return (
    <div className="notifications-container">
      {!isConnected && (
        <div className="connection-status">
          Connecting to notification service...
        </div>
      )}
      {notifications.map((notification: any) => (
        <div
          key={notification._id}
          className={`notification-item ${notification.isRead ? 'read' : 'unread'}`}
          onClick={() => markAsRead(notification._id)}
        >
          <img 
            src={notification.sender.avatar} 
            alt="sender avatar" 
            className="w-10 h-10 rounded-full"
          />
          <div className="notification-content">
            <p>
              <strong>{notification.sender.name}</strong> {notification.content}
            </p>
            <span className="notification-time">
              {new Date(notification.createdAt).toLocaleString()}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};


export default Notifications