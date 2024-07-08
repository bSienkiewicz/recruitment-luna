import { api } from "./api";

const testId = "0a0f77eb1-50a0-4d98-8116-064fc5a84693"; // ID of first module

describe("API", () => {
  it("should fetch modules", async () => {
    const modules = await api.getAllModules();

    expect(modules.length).toBeGreaterThanOrEqual(3);
  });

  it("should fetch a module", async () => {
    const module = await api.getModule(testId);

    expect(module.id).toBe(testId);
  });

  it("should fetch module history", async () => {
    const history = await api.getModuleHistory(
      testId,
      "2021-01-01",
      "2021-01-02",
      "hourly"
    );

    expect(history.length).toBeGreaterThanOrEqual(20);
  });

  it("should create a module", async () => {
    const newModule = await api.postModule({
      id: "0a0f77eb1-50a0-4d98-8116-064fc5a84693",
      name: "Test module",
      description: "Test description",
      available: true,
      targetTemperature: 20,
    });

    expect(newModule.id).toBeDefined();
  });

  it("should update a module", async () => {
    const updatedModule = await api.patchModule({
      id: testId,
      name: "Updated module",
    });

    expect(updatedModule.name).toBe("Updated module");
  });
});
