import GaugeComponent from "react-gauge-component";
import { Module } from "../../../types";

interface ModuleGaugeProps {
  safeTemperatureRanges: {
    min: number;
    max: number;
    warnMin: number;
    warnMax: number;
  };
  recentTemperature: number;
  module: Module;
}

const ModuleGauge = ({
  safeTemperatureRanges,
  recentTemperature,
  module,
}: ModuleGaugeProps) => {
  return (
    <GaugeComponent
      type="semicircle"
      marginInPercent={0.04}
      arc={{
        padding: 0.02,
        cornerRadius: 3,
        subArcs: [
          {
            limit: safeTemperatureRanges.warnMin,
            color: "#2E8B57",
            showTick: false,
          },
          {
            limit: safeTemperatureRanges.warnMax,
            color: "#33D999",
            showTick: false,
          },
          {
            limit: safeTemperatureRanges.max,
            color: "#2E8B57",
          },
        ],
      }}
      labels={{
        valueLabel: {
          formatTextValue: () => recentTemperature + "ºC",
        },
        tickLabels: {
          type: "inner",
          ticks: [{ value: module.targetTemperature }],
          defaultTickValueConfig: {
            formatTextValue: (value) => value + "ºC",
          },
        },
      }}
      pointer={{ type: "arrow", elastic: false }}
      value={recentTemperature ?? 0}
      minValue={safeTemperatureRanges.min}
      maxValue={safeTemperatureRanges.max}
    />
  );
};

export default ModuleGauge;
