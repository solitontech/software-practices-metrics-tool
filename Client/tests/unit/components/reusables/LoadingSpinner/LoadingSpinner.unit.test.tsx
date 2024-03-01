import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import { LoadingSpinner } from "../../../../../src/components/reusables/LoadingSpinner/LoadingSpinner";

describe("LoadingSpinner component", () => {
  it("should render the loading image for the spinner", () => {
    render(<LoadingSpinner content="Loading..." />);

    const image = screen.getByRole("img", { name: /loading./i });

    expect(image).toBeInTheDocument();
  });

  it("should render the content for loading spinner", () => {
    render(<LoadingSpinner content="Loading..." />);

    const content = screen.getByText(/loading.../i);

    expect(content).toBeInTheDocument();
  });
});
