// import React, { createContext, useContext, useEffect, useState } from 'react';
// import { default as io, Socket } from 'socket.io-client';

// interface SocketContextType {
//   socket: typeof Socket | null;
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
//   const [socket, setSocket] = useState<typeof Socket | null>(null);
//   const [isConnected, setIsConnected] = useState(false);

//   useEffect(() => {
//     // Initialize socket connection using 'io' instead of socketIO
//     const socketInstance = io(process.env.REACT_APP_SOCKET_URL || 'http://localhost:4040', {
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

//     socketInstance.on('connect_error', (error: Error) => {
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

// // hooks/useSocketEvent.ts
// export function useSocketEvent<T>(
//   eventName: string,
//   handler: (data: T) => void,
//   dependencies: any[] = []
// ) {
//   const { socket } = useSocket();

//   useEffect(() => {
//     if (!socket) return;

//     socket.on(eventName, handler);

//     return () => {
//       socket.off(eventName, handler);
//     };
//   }, [socket, eventName, handler, ...dependencies]);
// }

// -------- version 2 ---------
import React, { createContext, useContext, useEffect, useState } from 'react';
import { default as io, Socket } from 'socket.io-client';

interface SocketContextType {
  socket: typeof Socket | null;
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
  const [socket, setSocket] = useState<typeof Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || 'http://localhost:4040'; // Match backend port
    
    const socketInstance = io(SOCKET_URL, {
      transports: ['websocket'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000
    });

    socketInstance.on('connect', () => {
      console.log('Socket connected with ID:', socketInstance.id);
      setIsConnected(true);
      
      const userId = localStorage.getItem('userId');
      if (userId) {
        socketInstance.emit('user:join', userId);
      }
    });

    socketInstance.on('disconnect', () => {
      console.log('Socket disconnected');
      setIsConnected(false);
    });

    socketInstance.on('connect_error', (error:any) => {
      console.error('Socket connection error:', error);
      setIsConnected(false);
    });

    setSocket(socketInstance);

    return () => {
      if (socketInstance) {
        socketInstance.disconnect();
      }
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};

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