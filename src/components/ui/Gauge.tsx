import GaugeComponent from "react-gauge-component";
import { Module } from "../../types";

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

const Gauge = ({
  safeTemperatureRanges,
  recentTemperature,
  module,
}: ModuleGaugeProps) => {
  const getLabelColor = (temperature: number) => {
    if (
      temperature < safeTemperatureRanges.warnMin ||
      temperature > safeTemperatureRanges.warnMax
    ) {
      return "#e31a0b";
    }
    return "#33D999";
  };
  const labelColor = getLabelColor(recentTemperature);

  return (
    <GaugeComponent
      type="radial"
      marginInPercent={0.04}
      arc={{
        padding: 0.02,
        cornerRadius: 3,
        subArcs: [
          {
            limit: safeTemperatureRanges.warnMin,
            color: "#991a11",
            showTick: false,
          },
          {
            limit: safeTemperatureRanges.warnMax,
            color: "#33D999",
            showTick: false,
          },
          {
            limit: safeTemperatureRanges.max,
            color: "#991a11",
          },
        ],
      }}
      labels={{
        valueLabel: {
          formatTextValue: () => recentTemperature + "ºC",
          style: {
            fill: labelColor,
            fontWeight: "bold",
          },
        },
        tickLabels: {
          type: "inner",
          ticks: [
            { value: module.targetTemperature },
            ...(0 > module.targetTemperature - 2 && 0 < safeTemperatureRanges.warnMin ? [{
              value: 0,
              lineConfig: {
                length: 2,
                color: "#33D999",
                width: 2,
              },
            }] : []),
          ],
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

export default Gauge;
