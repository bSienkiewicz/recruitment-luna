import {create} from "zustand";
import { ModuleType, ModuleHistoryItem } from "../types";

interface ModuleStore {
  modules: ModuleType[];
  setModules: (modules: ModuleType[]) => void;
  module: ModuleType | undefined;
  setModule: (module: ModuleType | undefined) => void;
  readings: ModuleHistoryItem[];
  setReadings: (readings: ModuleHistoryItem[]) => void;
}

export const useModuleStore = create<ModuleStore>((set) => ({
  modules: [],
  setModules: (modules) => set({ modules }),
  module: undefined,
  setModule: (module) => set({ module }),
  readings: [],
  setReadings: (readings) => set({ readings }),
}));