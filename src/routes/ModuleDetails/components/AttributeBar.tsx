import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { useEffect, useState } from "react";
import useTemperatureStore from "../../../store/temperatures";

type AttributeBarProps = {
  text: string;
  color: string;
  accent: string;
  icon?: IconProp;
};

const AttributeBar = ({ text, color, accent, icon }: AttributeBarProps) => {
  const recentReadings = useTemperatureStore((state) => state.recentReadings);
  const [simulatedReading, setSimulatedReading] = useState<number | null>(null);
  const [target, _setTarget] = useState<number>(() => Math.floor(Math.random() * (70 - 30 + 1) + 30))

  const simulateReading = () => {
    // Simulating a reading to add some variation to layout
    const deviation = Math.floor(Math.random() * 4);
    const reading = target + deviation;
    setSimulatedReading(reading);
  };

  useEffect(() => {
    simulateReading();
  }, [recentReadings]);

  return (
    <div className="flex flex-col mt-5 gap-2">
      <div className="flex justify-between text-xs px-2">
        <label className="">{text}</label>
        <p>{simulatedReading}%</p>
      </div>
      <div
        className={`w-full h-4 rounded-md relative overflow-hidden`}
        style={{ backgroundColor: color }}
      >
        <div
          className={`absolute top-0 left-0 h-full rounded-md z-10 transition-all duration-1000`}
          style={{ width: simulatedReading + "%", backgroundColor: accent }}
        ></div>
      </div>
    </div>
  );
};

export default AttributeBar;
