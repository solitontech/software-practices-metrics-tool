import { render, screen } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";

import { LoadingSpinner } from "../../../../../src/components/reusables/LoadingSpinner/LoadingSpinner";

describe("LoadingSpinner component", () => {
  beforeEach(() => {
    render(<LoadingSpinner content="Loading..." />);
  });

  it("should render the loading image for the spinner", () => {
    const image = screen.getByRole("img", { name: /loading./i });

    expect(image).toBeInTheDocument();
  });

  it("should render the content for loading spinner", () => {
    const content = screen.getByText(/loading.../i);

    expect(content).toBeInTheDocument();
  });
});
