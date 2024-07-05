import { create } from "zustand";

interface Reading {
  id: string;
  temperature: number;
}

interface TemperatureState {
  recentReadings: Reading[];
  setRecentReadings: (readings: Reading[]) => void;
  getDeviceReading: (id: string) => Reading | undefined;
}

const useTemperatureStore = create<TemperatureState>((set, get) => ({
  recentReadings: [],
  setRecentReadings: (readings) => set({ recentReadings: readings }),
  getDeviceReading: (id) => get().recentReadings.find(reading => reading.id === id),
}));

export default useTemperatureStore;