// import React, { createContext, useContext, useEffect, useState } from 'react';
// import { io } from 'socket.io-client';
// import { Socket } from 'socket.io-client';

// interface SocketContextType {
//   socket: Socket | null;
//   isConnected: boolean;
// }

// const SocketContext = createContext<SocketContextType>({
//   socket: null,
//   isConnected: false
// });

// interface SocketProviderProps {
//   children: React.ReactNode;
// }

// export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
//   const [socket, setSocket] = useState<Socket | null>(null);
//   const [isConnected, setIsConnected] = useState(false);

//   useEffect(() => {
//     // Initialize socket connection
//     const socketInstance = io(process.env.REACT_APP_SOCKET_URL || 'http://localhost:5000', {
//       withCredentials: true, // If you're using cookies for auth
//       transports: ['websocket']
//     });

//     // Connection event handlers
//     socketInstance.on('connect', () => {
//       setIsConnected(true);
//       console.log('Socket connected');
      
//       // If you have user authentication, you can emit the join event here
//       const userId = localStorage.getItem('userId'); // Or get from your auth context
//       if (userId) {
//         socketInstance.emit('user:join', userId);
//       }
//     });

//     socketInstance.on('disconnect', () => {
//       setIsConnected(false);
//       console.log('Socket disconnected');
//     });

//     socketInstance.on('connect_error', (error:any) => {
//       console.error('Socket connection error:', error);
//       setIsConnected(false);
//     });

//     setSocket(socketInstance);

//     // Cleanup on unmount
//     return () => {
//       socketInstance.disconnect();
//     };
//   }, []);

//   return (
//     <SocketContext.Provider value={{ socket, isConnected }}>
//       {children}
//     </SocketContext.Provider>
//   );
// };

// // Custom hook to use socket
// export const useSocket = () => {
//   const context = useContext(SocketContext);
//   if (context === undefined) {
//     throw new Error('useSocket must be used within a SocketProvider');
//   }
//   return context;
// };

// -------- version 2 -----------
// contexts/SocketContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Socket, io as socketIO } from 'socket.io-client';

interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false
});

interface SocketProviderProps {
  children: React.ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Initialize socket connection
    const socketInstance = socketIO(process.env.REACT_APP_SOCKET_URL || 'http://localhost:5000', {
      withCredentials: true, // If you're using cookies for auth
      transports: ['websocket']
    });

    // Connection event handlers
    socketInstance.on('connect', () => {
      setIsConnected(true);
      console.log('Socket connected');
      
      // If you have user authentication, you can emit the join event here
      const userId = localStorage.getItem('userId'); // Or get from your auth context
      if (userId) {
        socketInstance.emit('user:join', userId);
      }
    });

    socketInstance.on('disconnect', () => {
      setIsConnected(false);
      console.log('Socket disconnected');
    });

    socketInstance.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
      setIsConnected(false);
    });

    setSocket(socketInstance);

    // Cleanup on unmount
    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};

// Custom hook to use socket
export const useSocket = () => {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};

// hooks/useSocketEvent.ts
export function useSocketEvent<T>(
  eventName: string,
  handler: (data: T) => void,
  dependencies: any[] = []
) {
  const { socket } = useSocket();

  useEffect(() => {
    if (!socket) return;

    socket.on(eventName, handler);

    return () => {
      socket.off(eventName, handler);
    };
  }, [socket, eventName, handler, ...dependencies]);
}