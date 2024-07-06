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
    min: Math.max(0, targetTemperature - 5),
    max: targetTemperature + 5,
    warnMin: targetTemperature - 3,
    warnMax: targetTemperature + 3,
  };
};

export const calculateDeviation = (current: number, target: number): number => {
  return current - target;
};
