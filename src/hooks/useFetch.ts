import { useState, useCallback } from "react";
import { api } from "../services/api";
import { Module, ModuleHistoryItem } from "../types";
import { getSafeTemperatureRanges } from "../utils/temperatureUtils";
import toast from "react-hot-toast";

export const useFetch = (id?: string | undefined) => {
  const [module, setModule] = useState<Module | undefined>();
  const [modules, setModules] = useState<Module[]>([]);
  const [readings, setReadings] = useState<ModuleHistoryItem[]>([]);
  const [safeTemperatureRanges, setSafeTemperatureRanges] = useState({
    min: 0,
    max: 0,
    warnMin: 0,
    warnMax: 0,
  });

  const fetchModule = useCallback(async () => {
    if (!id) return;
    try {
      const data = await api.getModule(id);
      setModule(data);
      setSafeTemperatureRanges(
        getSafeTemperatureRanges(data.targetTemperature)
      );
    } catch (error) {
      console.error("Failed to fetch module:", error);
      toast.error("Failed to fetch module");
    }
  }, [id]);

  const fetchModules = useCallback(async () => {
    try {
      await api.getAllModules().then((data) => setModules(data));
    } catch (error) {
      console.error("Failed to fetch modules:", error);
      toast.error("Failed to fetch modules");
    }
  }, []);

  const fetchHistoricalReadings = useCallback(
    async (start: string, stop: string, mode: string) => {
      if (!id) return;
      try {
        const data: ModuleHistoryItem[] = await api.getModuleHistory(
          id,
          start,
          stop,
          mode
        )
        setReadings(data);
      } catch (error) {
        console.error("Error fetching module readings:", error);
        toast.error("Failed to fetch module readings");
      }
    },
    [id]
  );

  const patchModule = async (updatedData: Partial<Module>) => {
    if (!id) return;
    try {
      await toast.promise(api.patchModule({ id, ...updatedData }), {
        loading: "Updating module...",
        success: "Module updated successfully",
        error: "Failed to update module",
      });
      fetchModule();
    } catch (error) {
      console.error("Error updating module:", error);
      toast.error("Failed to fetch module");
    }
  };

  const postModule = useCallback(
    async (body: any) => {
      try {
        await toast
          .promise(api.postModule(body), {
            loading: "Adding new module...",
            success: "Module added successfully",
            error: "Failed to add module",
          })
          .then(() => fetchModules());
      } catch (error) {
        console.error("Failed to post new module:", error);
      }
    },
    [fetchModules]
  );

  return {
    module,
    modules,
    readings,
    safeTemperatureRanges,
    fetchModule,
    fetchModules,
    postModule,
    fetchHistoricalReadings,
    editModule: patchModule,
  };
};
