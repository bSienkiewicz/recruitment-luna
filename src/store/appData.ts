import { create } from "zustand";

type ErrorWithTimestamp = {
  message: string;
  timestamp: number;
};

type AppDataState = {
  recentError: ErrorWithTimestamp | null;
  setRecentError: (error: string) => void;
  clearRecentError: () => void;
};

const useAppDataStore = create<AppDataState>((set) => ({
  recentError: null,
  setRecentError: (error: string) => set({ 
    recentError: { message: error, timestamp: Date.now() } 
  }),
  clearRecentError: () => set({ recentError: null }),
}));

export default useAppDataStore;