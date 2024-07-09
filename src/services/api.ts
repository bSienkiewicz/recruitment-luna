import { ModuleType } from "../types";

const API_BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:3001';


export const api = {
  async getAllModules(): Promise<ModuleType[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/modules`);
      if (!response.ok) {
        throw new Error("Failed to fetch modules");
      }
      return response.json();
    } catch (error: any) {
      throw error;
    }
  },

  async getModule(id: string): Promise<ModuleType> {
    const response = await fetch(`${API_BASE_URL}/modules/${id}`);
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Module not found");
      }
      throw new Error(`Failed to fetch module with id ${id}`);
    }
    return response.json();
  },

  async postModule(module: ModuleType): Promise<ModuleType> {
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
    mode: string = "hourly"
  ): Promise<any> {
    const response = await fetch(
      `${API_BASE_URL}/modules/${id}/history?start=${start}&stop=${stop}&mode=${mode}`
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch history for module with id ${id}`);
    }
    return response.json();
  },

  async patchModule(module: Partial<ModuleType>): Promise<Partial<ModuleType>> {
    const response = await fetch(`${API_BASE_URL}/modules/${module.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(module),
    });
    if (!response.ok) {
      throw new Error("Failed to update module");
    }
    return response.json();
  },
};
