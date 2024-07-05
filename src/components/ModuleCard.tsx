import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ModuleCardProps {
  module: {
    name: string;
    description: string;
    available: boolean;
    targetTemperature: number;
    id: string;
  };
  latestReading?: number;
}

const ModuleCard = ({ module, latestReading }: ModuleCardProps) => {
  const MODULE_BASE_URL = "/module/";

  // calculate the width percentage of the temperature bar
  const calculateWidthPercentage = (
    current: number,
    target: number
  ): number => {
    const minTemp = target - 10;
    const maxTemp = target + 10;
    const percentage = ((current - minTemp) / (maxTemp - minTemp)) * 100;
    return Math.min(Math.max(percentage, 0), 100); // Clamp
  };

  const temperatureWidth =
    latestReading !== undefined
      ? calculateWidthPercentage(latestReading, module.targetTemperature)
      : 0; // Default to 50% if no reading

  return (
    <div className="flex flex-col items-center group">
      <a
        href={`${MODULE_BASE_URL}${module.id}`}
        className="relative rounded-xl bg-white p-8 px-4 pt-8 pb-4 border border-gray_border transition-all overflow-hidden w-full"
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

        {module.description && module.description?.length > 0 && (
          <p className="line-clamp-3 text-sm min-h-[60px]">
            {module.description}
          </p>
        )}

        <div className="grid grid-cols-2 justify-between items-center mt-4">
          <div className="text-sm flex items-center justify-center border border-gray_border rounded-full place-self-end text-neutral-400 col-start-2">
            {module.available && (
              <span className="px-3 py-1 text-dark_green_main font-semibold border-r border-gray_border">
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
              <div className="w-full h-[3px] bg-green_main"></div>
            </div>
          </>
        )}
      </a>
      {module.available && (
        <p className="text-xs text-neutral-400">{module.targetTemperature}°C</p>
      )}
    </div>
  );
};

export default ModuleCard;
