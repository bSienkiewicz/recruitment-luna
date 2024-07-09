import AttributeBar from "./ui/AttributeBar";
import { calculateTempDiff } from "../utils/temperatureUtils";
import Gauge from "./ui/Gauge";
import { ModuleType } from "../types";

interface SectionModuleInfoInfoProps {
  module: ModuleType;
  safeTemperatureRanges: {
    min: number;
    max: number;
    warnMin: number;
    warnMax: number;
  };
  recentTemperature: number | null;
}

const SectionModuleGauge = ({
  module,
  safeTemperatureRanges,
  recentTemperature,
}: SectionModuleInfoInfoProps) => {
  return (
    <div className={`section_dark col-span-2 row-span-2 bg-dark p-5 rounded-md ${!module.available && "border lg:border-0 border-red-500/50"} animate-fade-in`}>
      {module.available ? (
        <div className="flex flex-col justify-between h-full">
          <div className="flex flex-col">
            <p className="font-semibold mb-8">Module readings</p>
            <p className="text-xs">Current temperature</p>
            <Gauge
              safeTemperatureRanges={safeTemperatureRanges}
              recentTemperature={recentTemperature ?? 0}
              module={module}
            />
            <div className="flex justify-between mt-5">
              <p className="text-sm">Target temperature</p>
              <span className="font-semibold">
                {module.targetTemperature}ºC
              </span>
            </div>
            <div className="flex justify-between mt-3">
              <p className="text-sm">Difference</p>
              <span className="font-semibold">
                {calculateTempDiff(
                  recentTemperature ?? 0,
                  module.targetTemperature
                ).toFixed(1)}
                ºC
              </span>
            </div>
          </div>
          <div className="">
            <AttributeBar text="CO₂" />
            <AttributeBar text="pH" />
            <AttributeBar text="EC" />
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center h-full">
          <p className="text-center text-gray-400 font-semibold mb-3">
            Module is offline.
          </p>
          <p className="text-center text-sm text-gray-400">
            You can only see historical data.
          </p>
          <p className="text-center text-sm text-gray-400">
            Live preview is disabled.
          </p>
        </div>
      )}
    </div>
  );
};

export default SectionModuleGauge;
