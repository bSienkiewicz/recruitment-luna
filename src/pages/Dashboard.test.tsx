import { render, screen } from "@testing-library/react";
import Dashboard from "./Dashboard";
import { BrowserRouter } from "react-router-dom";

describe("Dashboard", () => {

  it("should render the Dashboard with header", () => {
    render(<Dashboard />, { wrapper: BrowserRouter });

    expect(screen.getByText("Your modules")).toBeInTheDocument();

    const addModuleButton = screen.getByText("Add module");
    expect(addModuleButton).toBeInTheDocument();
  });
});
