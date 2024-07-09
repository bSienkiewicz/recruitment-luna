import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { ModuleType, ModuleHistoryItem } from "../types";
import { useModuleHistory } from "../hooks/useFetch";
import ChartContainer from "./ChartContainer";
import DatePickerContainer from "./DatePickerContainer";

interface SectionModuleChartProps {
  safeTemperatureRanges: {
    min: number;
    max: number;
    warnMin: number;
    warnMax: number;
  };
  recentTemperature: number | null;
  module: ModuleType;
  id: string;
}

const SectionModuleChart: React.FC<SectionModuleChartProps> = ({
  safeTemperatureRanges,
  recentTemperature,
  module,
  id,
}) => {
  const [chartDateRange, setChartDateRange] = useState({
    start: new Date(Date.now() - 24 * 60 * 60 * 1000),
    end: new Date(),
  });
  const { readings, fetchHistoricalReadings } = useModuleHistory(id);
  const [realtimeReadings, setRealtimeReadings] = useState<ModuleHistoryItem[]>(
    []
  );
  const [showRealtime, setShowRealtime] = useState(false);
  const [showSafeZone, setShowSafeZone] = useState(false);

  useEffect(() => {
    /**
     * Fetch historical readings when the component mounts
     */

    fetchHistoricalReadings(
      chartDateRange.start.toISOString(),
      chartDateRange.end.toISOString(),
      "hourly"
    );
  }, [fetchHistoricalReadings, chartDateRange]);


  useEffect(() => {
    /**
     * Update the realtime readings array when the recent temperature changes
     */
    if (recentTemperature !== null) {
        setRealtimeReadings((prev) => {
          const updatedReadings = [
            ...prev,
            { timestamp: new Date().toISOString(), temperature: recentTemperature },
          ];
          return updatedReadings.slice(-40);
        })
    }
  }, [recentTemperature]);

  useEffect(() => {
    console.log(realtimeReadings)
  }, [realtimeReadings])

  const handleDateChange = (start: Date | null, end: Date | null) => {
    if (!start || !end) return;
    if (start > end) {
      toast.error("Start date cannot be greater than end date.");
      return;
    }
    setChartDateRange({ start, end });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const rangeMode = (
      form.elements.namedItem("range_mode") as HTMLSelectElement
    ).value;
    fetchHistoricalReadings(
      chartDateRange.start.toISOString(),
      chartDateRange.end.toISOString(),
      rangeMode
    );
    setShowRealtime(false);
  };

  return (
    <>
      <div className="section_dark col-span-6 p-5 rounded-md animate-fade-in opacity-0" style={{animationDelay: "100ms"}}>
        <DatePickerContainer
          handleSubmit={handleSubmit}
          handleDateChange={handleDateChange}
          chartDateRange={chartDateRange}
        />
      </div>
      <ChartContainer
        showRealtime={showRealtime}
        chartDateRange={chartDateRange}
        module={module}
        setShowRealtime={setShowRealtime}
        showSafeZone={showSafeZone}
        setShowSafeZone={setShowSafeZone}
        readings={readings}
        realtimeReadings={realtimeReadings}
        safeTemperatureRanges={safeTemperatureRanges}
      />
    </>
  );
};

export default SectionModuleChart;
