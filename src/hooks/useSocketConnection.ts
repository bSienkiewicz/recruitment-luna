import { useEffect } from 'react';
import io from 'socket.io-client';
import useTemperatureStore from "../store/temperatures";

export const useSocketConnection = () => {
  const setRecentReadings = useTemperatureStore(state => state.setRecentReadings);

  useEffect(() => {
    const socket = io("http://localhost:3001");

    socket.on("moduleUpdate", (data: { id: string; temperature: number }[]) => {
      setRecentReadings(data);
    });

    return () => {
      socket.disconnect();
    };
  }, [setRecentReadings]);
};