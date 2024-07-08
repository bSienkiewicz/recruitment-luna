// calculate the width percentage of the temperature bar
export const calculateTemperatureBarWidth = (
  currentTemperature: number,
  minTemperature: number,
  maxTemperature: number
) => {
  const position = ((currentTemperature - minTemperature) / (maxTemperature - minTemperature)) * 100;
  return Math.min(Math.max(position, 0), 100).toFixed(1); // Clamp between 0 and 100
};

export const getSafeTemperatureRanges = (targetTemperature: number) => {
  const errorRanges = {
    min: -2,
    max: 2,
    warnMin: -0.5,
    warnMax: 0.5,
  }

  return {
    min: targetTemperature + errorRanges.min,
    max: targetTemperature + errorRanges.max,
    warnMin: targetTemperature + errorRanges.warnMin,
    warnMax: targetTemperature + errorRanges.warnMax,
  };
};

export const calculateTempDiff = (current: number, target: number): number => {
  return current - target;
};
