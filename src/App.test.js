import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders App correctly", () => {
  render(<App />);
});

test("renders DocumentDetails as first view by App", () => {
  render(<App />);
  const linkElement = screen.getByText(/Document Details/i);
  expect(linkElement).toBeInTheDocument();
});
