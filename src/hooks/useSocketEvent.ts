// hooks/useSocketEvent.ts
import { useEffect, useCallback } from 'react';
import { useSocket } from '../context/socket.context';

// Generic hook for socket events
export function useSocketEvent<T>(
  eventName: string,
  handler: (data: T) => void,
  dependencies: any[] = []
) {
  const { socket } = useSocket();

  const memoizedHandler = useCallback(handler, dependencies);

  useEffect(() => {
    if (!socket) return;

    socket.on(eventName, memoizedHandler);

    return () => {
      socket.off(eventName, memoizedHandler);
    };
  }, [socket, eventName, memoizedHandler]);
}
