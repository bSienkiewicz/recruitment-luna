import useAppDataStore from "../store/appData";

const API_BASE_URL = import.meta.env.VITE_BASE_URL;

export interface Module {
  id: string;
  name: string;
  description: string;
  available: boolean;
  targetTemperature: number;
}

export const api = {
  async getAllModules(): Promise<Module[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/modules`);
      if (!response.ok) {
        throw new Error("Failed to fetch modules");
      }
      return response.json();
    } catch (error: any) {
      useAppDataStore.getState().setRecentError(error.message);
      throw error;
    }
  },

  async getModule(id: string): Promise<Module> {
    const response = await fetch(`${API_BASE_URL}/modules/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch module with id ${id}`);
    }
    return response.json();
  },

  async postModule(module: Module): Promise<Module> {
    const response = await fetch(`${API_BASE_URL}/modules`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(module),
    });
    if (!response.ok) {
      throw new Error("Failed to create module");
    }
    return response.json();
  },

  async getModuleHistory(
    id: string,
    start: string,
    stop: string,
    mode: "hourly" | "daily"
  ): Promise<any> {
    const response = await fetch(
      `${API_BASE_URL}/modules/${id}/history?start=${start}&stop=${stop}&mode=${mode}`
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch history for module with id ${id}`);
    }
    return response.json();
  },
};
