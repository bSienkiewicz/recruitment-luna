interface ModuleData {
  name: string;
  description: string;
  targetTemperature: number;
}

export const getValidationErrors = (data: ModuleData): string[] => {
  const errors: string[] = [];
  const targetTemp: number[] = [0, 40];

  if (data.name.trim() === "") {
    errors.push("Module name is required.");
  }

  if (data.description.trim() === "") {
    errors.push("Module description is required.");
  }

  if (
    data.targetTemperature < targetTemp[0] ||
    data.targetTemperature > targetTemp[1]
  ) {
    errors.push(
      `Target temperature must be between ${targetTemp[0]}°C and ${targetTemp[1]}°C.`
    );
  }

  return errors;
};
