import { render, screen } from "@testing-library/react";

import { DisplayError } from "../../../../../src/components/reusables/DisplayError/DisplayError";

describe("DisplayError component", () => {
  it("should render the error message", () => {
    render(<DisplayError error="Test Error" />);

    const errorMessage = screen.getByText(/test error/i);

    // user should see the error message displayed
    expect(errorMessage).toBeInTheDocument();
  });

  it("should not render the error message if error is not defined", () => {
    render(<DisplayError error={undefined} />);

    const errorMessage = screen.queryByText(/test error/i);

    // user should not see the error message
    expect(errorMessage).not.toBeInTheDocument();
  });
});
