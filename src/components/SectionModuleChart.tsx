import { useEffect, useState } from "react";
import LineChart from "./LineChart";
import DatePicker from "react-datepicker";
import toast from "react-hot-toast";
import { Module, ModuleHistoryItem } from "../types";
import { useModuleHistory } from "../hooks/useFetch";

interface SectionChartInfoProps {
  safeTemperatureRanges: {
    min: number;
    max: number;
    warnMin: number;
    warnMax: number;
  };
  recentTemperature: number;
  module: Module;
  id: string;
}

const SectionModuleChart = ({
  safeTemperatureRanges,
  recentTemperature,
  module,
  id,
}: SectionChartInfoProps) => {
  const [chartDateStart, setChartDateStart] = useState<Date>(
    new Date(new Date().getTime() - 24 * 60 * 60 * 1000)
  );
  const [chartDateEnd, setChartDateEnd] = useState<Date>(
    new Date(new Date().getTime())
  );
  const { readings, fetchHistoricalReadings } = useModuleHistory(id);
  const [realtimeReadings, setRealtimeReadings] = useState<ModuleHistoryItem[]>(
    []
  );
  const [showRealtime, setShowRealtime] = useState<boolean>(false);
  const [showSafeZone, setShowSafeZone] = useState<boolean>(false);

  const handleDateFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchHistoricalReadings(
      chartDateStart.toISOString(),
      chartDateEnd.toISOString(),
      e.currentTarget.range_mode.value
    );
    setShowRealtime(false);
  };

  useEffect(() => {
    const timestamp = new Date();
    const reading = { timestamp, temperature: recentTemperature };
    setRealtimeReadings((prev: ModuleHistoryItem[]) => {
      const updatedReadings: ModuleHistoryItem[] = [
        ...prev,
        {
          timestamp: reading.timestamp.toISOString(),
          temperature: reading.temperature,
        },
      ];
      if (updatedReadings.length > 40) {
        updatedReadings.shift();
      }
      return updatedReadings;
    });
  }, [recentTemperature]);

  const compareDates = (startDate: Date | null, endDate: Date | null) => {
    if (!startDate || !endDate) return false;
    if (startDate > endDate) {
      toast.error("Start date cannot be greater than end date.");
      setChartDateStart(new Date());
      return false;
    }
    return true;
  };

  useEffect(() => {
    fetchHistoricalReadings(
      chartDateStart.toISOString(),
      chartDateEnd.toISOString(),
      "hourly"
    );
  }, [fetchHistoricalReadings]);

  return (
    <>
      <div className="col-span-6 bg-dark p-5">
        <form
          className="w-auto grid grid-cols-1 lg:grid-cols-4 gap-3"
          onSubmit={handleDateFormSubmit}
        >
          <div className="text-sm">
            Start date:
            <DatePicker
              shouldCloseOnSelect
              showTimeInput
              timeInputLabel="Time:"
              selected={chartDateStart}
              className="bg-transparent border border-lighter_dark focus:outline-none px-4 py-2 rounded-md text-xs w-full"
              onChange={(date) => {
                if (date && compareDates(date, chartDateEnd)) {
                  setChartDateStart(date);
                }
              }}
              maxDate={chartDateEnd}
              withPortal
              dateFormat="MMM dd yyyy - HH:mm"
            />
          </div>
          <div className="text-sm">
            <span>End date:</span>
            <DatePicker
              shouldCloseOnSelect
              showTimeInput
              timeInputLabel="Time:"
              selected={chartDateEnd}
              className="bg-transparent border border-lighter_dark focus:outline-none px-4 py-2 rounded-md text-xs w-full"
              onChange={(date) => {
                if (date && compareDates(chartDateStart, date)) {
                  setChartDateEnd(date);
                }
              }}
              minDate={chartDateStart}
              withPortal
              dateFormat="MMM dd yyyy - HH:mm"
            />
          </div>
          <select
            className="self-end px-4 py-2 text-xs bg-transparent border border-lighter_dark rounded-md"
            name="range_mode"
          >
            <option value="hourly" className="bg-dark">
              Hourly
            </option>
            <option value="daily" className="bg-dark">
              Daily
            </option>
          </select>
          <button
            className="bg-darker border border-lighter_dark  rounded-md px-4 py-2 font-semibold text-xs self-end"
            type="submit"
          >
            Show
          </button>
        </form>
        <div className="mt-3 select-none"></div>
      </div>
      <div className="flex flex-col bg-dark p-5 h-full min-h-[500px] lg:hidden">
        <LineChart
          data={readings}
          targetTemperature={module.targetTemperature}
          safeTemperatureRanges={safeTemperatureRanges}
          small={true}
        />
      </div>
      <div className="col-span-6 flex-col bg-dark p-5 h-full min-h-[500px] lg:min-h-full hidden lg:flex relative">
        <div className="flex justify-between items-center">
          {showRealtime ? (
            <p className="font-semibold mb-2">Live updates</p>
          ) : (
            <p className="font-semibold mb-2">
              History: {chartDateStart.toDateString()} -{" "}
              {chartDateEnd.toDateString()}
            </p>
          )}
          <div className="flex gap-2">
            {module.available && (
              <button
                className={`px-4 py-1 bg-darker border border-lighter_dark rounded-md text-xs cursor-pointer transition-all select-none ${
                  showRealtime ? "bg-green_main/50" : ""
                }`}
                onClick={() => setShowRealtime(!showRealtime)}
              >
                Realtime updates
              </button>
            )}
            <button
              className={`px-4 py-1 bg-darker border border-lighter_dark rounded-md text-xs cursor-pointer transition-all select-none ${
                showSafeZone ? "bg-green_main/50" : ""
              }`}
              onClick={() => setShowSafeZone(!showSafeZone)}
            >
              Show safe zone
            </button>
          </div>
        </div>
        <div className="flex-1">
          <LineChart
            data={readings}
            realTimeData={realtimeReadings}
            showRealTime={showRealtime}
            showSafeZone={showSafeZone}
            targetTemperature={module.targetTemperature}
            safeTemperatureRanges={safeTemperatureRanges}
          />
        </div>
      </div>
    </>
  );
};

export default SectionModuleChart;
