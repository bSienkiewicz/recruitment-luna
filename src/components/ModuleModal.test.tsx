import { fireEvent, render, screen } from "@testing-library/react";
import ModuleModal from "./ModuleModal";
import { BrowserRouter } from "react-router-dom";
import toast from "react-hot-toast";

vi.mock("react-hot-toast", () => ({
  default: {
    error: vi.fn(),
  },
}));

describe("Module Modal", () => {
  const handleShowModal = vi.fn();
  const onSubmit = vi.fn();
  it("should render the add module modal", () => {
    render(
      <ModuleModal
        showModal={true}
        handleShowModal={handleShowModal}
        onSubmit={onSubmit}
        isEditMode={false}
      />,
      { wrapper: BrowserRouter }
    );

    expect(screen.getByText("Add module")).toBeInTheDocument();
  });

  it("should initialize edit modal with module data", () => {
    render(
      <ModuleModal
        showModal={true}
        handleShowModal={handleShowModal}
        onSubmit={onSubmit}
        initialData={{
          name: "Module name",
          description: "This is a module",
          targetTemperature: 20,
        }}
        isEditMode={true}
      />,
      { wrapper: BrowserRouter }
    );

    const descriptionInput = screen.queryByDisplayValue("This is a module");
    expect(descriptionInput).toBeInTheDocument();
  });

  it("should call onSubmit with correct data when form is submitted", () => {
    render(
      <ModuleModal
        showModal={true}
        handleShowModal={handleShowModal}
        onSubmit={onSubmit}
        isEditMode={false}
      />,
      { wrapper: BrowserRouter }
    );

    const nameInput = screen.getByPlaceholderText("Module name");
    const descriptionInput = screen.getByPlaceholderText("Module description");
    const temperatureInput = screen.getByPlaceholderText(
      "Target temperature (°C)"
    );
    const submitButton = screen.getByText("Add module");

    fireEvent.change(nameInput, { target: { value: "New Module" } });
    fireEvent.change(descriptionInput, {
      target: { value: "New Description" },
    });
    fireEvent.change(temperatureInput, { target: { value: "25" } });

    fireEvent.click(submitButton);

    expect(onSubmit).toHaveBeenCalledWith({
      name: "New Module",
      description: "New Description",
      targetTemperature: 25,
    });
  });

  it("should call handleShowModal when close button is clicked", () => {
    render(
      <ModuleModal
        showModal={true}
        handleShowModal={handleShowModal}
        onSubmit={onSubmit}
        isEditMode={false}
      />,
      { wrapper: BrowserRouter }
    );

    const closeButton = screen.getByRole("button", { name: /cancel/i });
    fireEvent.click(closeButton);

    expect(handleShowModal).toHaveBeenCalledWith(false);
  });

  it("should display validation errors and not submit when form is invalid", () => {

    render(
      <ModuleModal
        showModal={true}
        handleShowModal={handleShowModal}
        onSubmit={onSubmit}
        isEditMode={false}
      />,
      { wrapper: BrowserRouter }
    );

    const submitButton = screen.getByText("Add module");
    fireEvent.click(submitButton);

    expect(toast.error).toHaveBeenCalled();
  });
});
