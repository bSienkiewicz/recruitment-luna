import { fireEvent, render, screen } from "@testing-library/react";
import ModuleCard from "./ModuleCard";
import { BrowserRouter } from "react-router-dom";

describe("ModuleCard", () => {
  const mockModule = {
    id: "test-id-string",
    name: "Module name",
    description: "This is a module card",
    available: true,
    targetTemperature: 20,
  };

  it("renders module name", () => {
    render(<ModuleCard module={mockModule} />, { wrapper: BrowserRouter });

    expect(screen.getByText("Module name")).toBeInTheDocument();
  });

  it("navigates to module page on click", () => {
    render(<ModuleCard module={mockModule} />, { wrapper: BrowserRouter });

    fireEvent.click(screen.getByText("Module name"));
    expect(window.location.pathname).toBe("/module/test-id-string");
  });

  it("displays target temperature when module is available", () => {
    render(<ModuleCard module={mockModule} />, { wrapper: BrowserRouter });
    expect(screen.getByText("20°C")).toBeInTheDocument();
  });

  it("displays target temperature when module is available", () => {
    render(<ModuleCard module={mockModule} />, { wrapper: BrowserRouter });
    expect(screen.getByText("20°C")).toBeInTheDocument();
  });

  it('does not display target temperature when module is unavailable', () => {
    const unavailableModule = { ...mockModule, available: false };
    render(
        <ModuleCard module={unavailableModule} />, { wrapper: BrowserRouter }
    );
    expect(screen.queryByText('20°C')).not.toBeInTheDocument();
  });
});
