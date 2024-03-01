import { render, screen } from "@testing-library/react";

import { DisplayError } from "../../../../../src/components/reusables/DisplayError/DisplayError";

describe("DisplayError component", () => {
  it("should render the error message", () => {
    render(<DisplayError error="Test Error" />);

    const errorMessage = screen.getByText(/test error/i);

    expect(errorMessage).toBeInTheDocument();
  });

  it("should not render the error message if error is undefined", () => {
    render(<DisplayError error={undefined} />);

    const errorMessage = screen.queryByText(/test error/i);

    expect(errorMessage).not.toBeInTheDocument();
  });
});
