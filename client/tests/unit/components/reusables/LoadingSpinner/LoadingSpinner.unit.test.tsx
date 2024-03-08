import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import { LoadingSpinner } from "../../../../../src/components/reusables/LoadingSpinner/LoadingSpinner";

describe("LoadingSpinner component", () => {
  it("should render the loading image & content for the spinner", () => {
    render(<LoadingSpinner content="Loading..." />);

    // user should see the loading spinner image
    const image = screen.getByRole("img", { name: /loading./i });
    expect(image).toBeInTheDocument();

    // user should see the loading spinner content
    const content = screen.getByText(/loading.../i);
    expect(content).toBeInTheDocument();
  });
});
