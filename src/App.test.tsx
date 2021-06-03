import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders app name", () => {
  render(<App />);
  const appName = screen.getByText(/Ex-Tra/i);
  expect(appName).toBeInTheDocument();
});
