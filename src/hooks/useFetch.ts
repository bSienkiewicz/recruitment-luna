import { useState, useCallback } from "react";
import { api } from "../services/api";
import { ModuleType, ModuleHistoryItem } from "../types";
import { getSafeTemperatureRanges } from "../utils/temperatureUtils";
import toast from "react-hot-toast";
import { useErrorHandler } from "./useErrorHandler";

export const useModule = (id?: string) => {
  const [module, setModule] = useState<ModuleType | undefined>();
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

  const patchModule = async (updatedData: Partial<ModuleType>) => {
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
  const [modules, setModules] = useState<ModuleType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { error, handleError, clearError } = useErrorHandler();

  const fetchModules = useCallback(async () => {
    clearError();
    try {
      await api
        .getAllModules()
        .then((data) => setModules(data))
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
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
      } finally {
        setIsLoading(false);
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
        if (data.length > 100) {
          // Keep only the first 100 items
          setReadings(data.slice(-300));
          toast.error("Too many readings to display. Showing the last 300.");
        } else {
          setReadings(data);
        }
      } catch (error) {
        console.error("Error fetching module readings:", error);
      }
    },
    [id]
  );
  return { readings, fetchHistoricalReadings };
};
