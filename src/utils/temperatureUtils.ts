// calculate the width percentage of the temperature bar
export const calculateTemperaturePosition = (
  currentTemperature: number,
  minTemperature: number,
  maxTemperature: number
) => {
  const position = ((currentTemperature - minTemperature) / (maxTemperature - minTemperature)) * 100;
  return Math.min(Math.max(position, 0), 100).toFixed(1); // Clamp between 0 and 100
};

export const getSafeTemperatureRanges = (targetTemperature: number) => {
  return {
    min: targetTemperature - 2,
    max: targetTemperature + 2,
    warnMin: targetTemperature - 0.5,
    warnMax: targetTemperature + 0.5,
  };
};

export const calculateTempDiff = (current: number, target: number): number => {
  return current - target;
};
