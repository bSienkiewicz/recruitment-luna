import { calculateTemperatureBarWidth, getSafeTemperatureRanges } from "./temperatureUtils";

describe('Temperature Utils', () => {
  it('should calculate temperature bar width', () => {
    const width = calculateTemperatureBarWidth(20, 10, 30);

    expect(width).toBe("50.0");
  })
  
  it('should calculate temperature bar width with negative values', () => {
    const width = calculateTemperatureBarWidth(-20, -30, -10);

    expect(width).toBe("50.0");
  })

  it('should not be able to go below 0', () => {
    const width = calculateTemperatureBarWidth(5, 10, 30);

    expect(width).toBe("0.0");
  })

  it('should calculate safe temperature ranges', () => {
    const ranges = getSafeTemperatureRanges(20);

    expect(ranges).toEqual({
      min: 18,
      max: 22,
      warnMin: 19.5,
      warnMax: 20.5,
    });
  })
})