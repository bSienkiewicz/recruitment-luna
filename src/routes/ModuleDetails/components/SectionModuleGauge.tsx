import AttributeBar from "./AttributeBar";
import { calculateDeviation } from "../../../utils/temperatureUtils";
import ModuleGauge from "./ModuleGauge";
import { Module } from "../../../types";

interface SectionModuleInfoInfoProps {
  module: Module;
  safeTemperatureRanges: {
    min: number;
    max: number;
    warnMin: number;
    warnMax: number;
  };
  recentTemperature: number | null;
}

const SectionModuleGauge = ({module, safeTemperatureRanges, recentTemperature} : SectionModuleInfoInfoProps) => {
  return (
    <div className="col-span-2 row-span-5 bg-dark p-5">
      {module.available ? (
        <div className="flex flex-col justify-between h-full">
          <div className="flex flex-col">
            <p className="font-semibold mb-8">Module readings</p>
            <ModuleGauge
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
              <p className="text-sm">Deviation</p>
              <span className="font-semibold">
                {calculateDeviation(
                  recentTemperature ?? 0,
                  module.targetTemperature
                ).toFixed(1)}
                ºC
              </span>
            </div>
          </div>
          <div className="">
            <AttributeBar text="CO₂" color="#93CBDD" accent="#76AAD4" />
            <AttributeBar text="pH" color="#9E9BD8" accent="#A877CA" />
            <AttributeBar text="EC" color="#9FDCC5" accent="#58C098" />
            <AttributeBar text="Nutrient" color="#98D8DB" accent="#76B7D0" />
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center h-full">
          <p className="text-center text-sm text-gray-400">
            Module is offline.
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
