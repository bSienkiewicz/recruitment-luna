import { useState, useCallback } from "react";
import { api } from "../services/api";
import { Module, ModuleHistoryItem } from "../types";
import { getSafeTemperatureRanges } from "../utils/temperatureUtils";
import toast from "react-hot-toast";
import { useErrorHandler } from "./useErrorHandler";

export const useModule = (id?: string) => {
  const [module, setModule] = useState<Module | undefined>();
  const [safeTemperatureRanges, setSafeTemperatureRanges] = useState({
    min: 0,
    max: 0,
    warnMin: 0,
    warnMax: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const { error, handleError, clearError } = useErrorHandler();

  const fetchModule = useCallback(async () => {
    if (!id) return;
    setIsLoading(true);
    clearError();
    try {
      const data = await api.getModule(id);
      setModule(data);
      setSafeTemperatureRanges(
        getSafeTemperatureRanges(data.targetTemperature)
      );
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  }, [id, clearError, handleError]);

  const patchModule = async (updatedData: Partial<Module>) => {
    if (!id) return;
    clearError();
    try {
      await toast.promise(api.patchModule({ id, ...updatedData }), {
        loading: "Updating module...",
        success: "Module updated successfully",
        error: "Failed to update module",
      });
      fetchModule(); // re-fetch module data after successful update
    } catch (error) {
      handleError(error);
    }
  };

  return {
    module,
    safeTemperatureRanges,
    fetchModule,
    patchModule,
    error,
    isLoading,
  };
};

export const useModules = () => {
  const [modules, setModules] = useState<Module[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { error, handleError, clearError } = useErrorHandler();

  const fetchModules = useCallback(async () => {
    clearError();
    try {
      await api
        .getAllModules()
        .then((data) => setModules(data))
        .then(() => setIsLoading(false));
    } catch (error) {
      handleError(error);
    }
  }, [clearError, handleError]);

  const postModule = useCallback(
    async (body: any) => {
      clearError();
      try {
        await toast
          .promise(api.postModule(body), {
            loading: "Adding new module...",
            success: "Module added successfully",
            error: "Failed to add module",
          })
          .then(() => fetchModules())
          .then(() => setIsLoading(false));
      } catch (error) {
        handleError(error);
      }
    },
    [fetchModules, clearError, handleError]
  );

  return { modules, fetchModules, postModule, error, isLoading };
};

export const useModuleHistory = (id?: string) => {
  const [readings, setReadings] = useState<ModuleHistoryItem[]>([]);

  const fetchHistoricalReadings = useCallback(
    async (start: string, stop: string, mode: string) => {
      if (!id) return;
      try {
        const data: ModuleHistoryItem[] = await api.getModuleHistory(
          id,
          start,
          stop,
          mode
        );
        setReadings(data);
      } catch (error) {
        console.error("Error fetching module readings:", error);
      }
    },
    [id]
  );

  return { readings, fetchHistoricalReadings };
};
