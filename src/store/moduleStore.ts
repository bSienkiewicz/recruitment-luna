import {create} from "zustand";
import { Module, ModuleHistoryItem } from "../types";

interface ModuleStore {
  modules: Module[];
  setModules: (modules: Module[]) => void;
  module: Module | undefined;
  setModule: (module: Module | undefined) => void;
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