import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  calculateTemperatureBarWidth,
  getSafeTemperatureRanges,
} from "../utils/temperatureUtils";
import { ModuleType } from "../types";
import { Link } from "react-router-dom";

interface ModuleCardProps {
  module: ModuleType;
  latestReading?: number;
  idx: number;
}

const ModuleCard = ({ module, latestReading, idx }: ModuleCardProps) => {
  const MODULE_BASE_URL = "/module/";

  const safeRanges = getSafeTemperatureRanges(module.targetTemperature);
  const temperatureWidth =
    latestReading !== undefined
      ? calculateTemperatureBarWidth(
          latestReading,
          safeRanges.min,
          safeRanges.max
        )
      : 0;

  const isReadingSafe = () => {
    if (!latestReading) return true;
    return latestReading >= safeRanges.warnMin && latestReading <= safeRanges.warnMax;
  };

  return (
    <div className="flex flex-col items-center group cursor-pointer animate-fade-in opacity-0" style={{ animationDelay: `${idx * 100}ms` }}>
      <Link
        to={`${MODULE_BASE_URL}${module.id}`}
        className="button_dark relative rounded-xl p-8 px-4 pt-8 pb-4 transition-all overflow-hidden w-full"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-2 items-center">
            <div
              className={`w-2 h-2 rounded-full ${
                module.available ? "bg-green_main" : "bg-gray-400"
              }`}
            ></div>
            <h4 className="text-lg font-semibold line-clamp-1">
              {module.name}
            </h4>
          </div>
        </div>

        <div className="grid grid-cols-2 justify-between items-center mt-4">
          <div className="text-sm flex items-center justify-center border border-lighter_dark rounded-full place-self-end text-neutral-400 col-start-2">
            {module.available && (
              <span
                className="px-3 py-1  font-semibold border-r border-lighter_dark"
                style={{
                  color:
                    isReadingSafe()
                      ? "#33d999"
                      : "#ef4444",
                }}
              >
                {latestReading ? latestReading : "..."}°C
              </span>
            )}
            <FontAwesomeIcon
              icon={["fas", "arrow-right"]}
              className="px-3 py-2"
            />
          </div>
        </div>

        {module.available && (
          <>
            <div className="absolute bottom-0 left-0 w-full flex flex-col items-center text-xs text-neutral-400">
              <div className="h-[5px] w-[1px] bg-neutral-400 relative z-10"></div>
            </div>
            <div
              className="absolute bottom-0 left-0 flex flex-col transition-all"
              style={{ width: `${temperatureWidth}%` }}
            >
              <div className="w-full h-[3px]"
                style={{
                  background: 
                    isReadingSafe()
                      ? "#33d999"
                      : "#ef4444",
                }}
              ></div>
            </div>
          </>
        )}
      </Link>

      {module.available && (
        <p className="text-xs text-neutral-400">{module.targetTemperature}°C</p>
      )}
    </div>
  );
};

export default ModuleCard;
