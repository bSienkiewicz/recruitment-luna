import { useEffect } from 'react';
import io from 'socket.io-client';
import useTemperatureStore from "../store/temperatures";

export const useSocketConnection = () => {
  const setRecentReadings = useTemperatureStore(state => state.setRecentReadings);

  useEffect(() => {
    const socket = io("http://localhost:3001");

    socket.on("connect", () => {
      console.log("Connected to server");
    });

    socket.on("moduleUpdate", (data: { id: string; temperature: number }[]) => {
      console.log("Received module update:", data);
      setRecentReadings(data);
    });

    return () => {
      socket.disconnect();
    };
  }, [setRecentReadings]);
};