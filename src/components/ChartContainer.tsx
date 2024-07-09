import { ModuleType, ModuleHistoryItem } from "../types";
import LineChart from "./LineChart";
import ToggleButton from "./ui/ToggleButton";

interface ChartContainerProps {
  showRealtime: boolean;
  chartDateRange: { start: Date; end: Date };
  module: ModuleType;
  setShowRealtime: React.Dispatch<React.SetStateAction<boolean>>;
  showSafeZone: boolean;
  setShowSafeZone: React.Dispatch<React.SetStateAction<boolean>>;
  readings: ModuleHistoryItem[];
  realtimeReadings: ModuleHistoryItem[];
  safeTemperatureRanges: {
    min: number;
    max: number;
    warnMin: number;
    warnMax: number;
  };
}

const ChartContainer: React.FC<ChartContainerProps> = ({
  showRealtime,
  chartDateRange,
  module,
  setShowRealtime,
  showSafeZone,
  setShowSafeZone,
  readings,
  realtimeReadings,
  safeTemperatureRanges,
}) => {
  return (
    <>
      <div className="section_dark flex flex-col bg-dark p-5 h-full min-h-[500px] lg:hidden rounded-md">
        <LineChart
          data={readings}
          targetTemperature={module.targetTemperature}
          safeTemperatureRanges={safeTemperatureRanges}
          small={true}
        />
      </div>
      <div className="section_dark col-span-6 flex-col bg-dark p-5 h-full min-h-[500px] lg:min-h-full hidden lg:flex relative rounded-md opacity-0 animate-fade-in" style={{ animationDelay: "200ms" }}>
        <div className="flex justify-between items-center mb-2">
          <p className="font-semibold">
            {showRealtime
              ? "Live updates"
              : `History: ${chartDateRange.start.toDateString()} - ${chartDateRange.end.toDateString()}`}
          </p>
          <div className="flex gap-2">
            {module.available && (
              <ToggleButton
                label="Realtime updates"
                isActive={showRealtime}
                onClick={() => setShowRealtime(!showRealtime)}
              />
            )}
            <ToggleButton
              label="Show safe zone"
              isActive={showSafeZone}
              onClick={() => setShowSafeZone(!showSafeZone)}
            />
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

export default ChartContainer;
