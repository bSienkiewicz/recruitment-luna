import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from 'vitest';
import Dashboard from "./Dashboard";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { PropsWithChildren } from "react";

vi.mock('react-helmet-async', () => ({
  Helmet: ({ children }: PropsWithChildren) => children,
  HelmetProvider: ({ children }: PropsWithChildren) => children,
}));

describe("Dashboard", () => {
  it("should render the Dashboard with header", () => {
    render(
      <HelmetProvider>
        <BrowserRouter>
          <Dashboard />
        </BrowserRouter>
      </HelmetProvider>
    );

    expect(screen.getByText("Your modules")).toBeInTheDocument();
  });
});