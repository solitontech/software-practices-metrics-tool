import { render, fireEvent, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

import { Checkbox } from "../../../../../src/components/reusables/Checkbox/Checkbox";

describe("Checkbox component", () => {
  let onChange: (value: boolean) => void;

  beforeEach(() => {
    onChange = vi.fn();

    render(
      <Checkbox
        isChecked={false}
        onChange={onChange}
        title="Test Title"
        labelStyle="test-style"
      />,
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should render the checkbox with the correct initial state", () => {
    const checkbox = screen.getByRole("checkbox");

    expect(checkbox).not.toBeChecked();
  });

  it("should calls onChange method when the checkbox is clicked", () => {
    const checkbox = screen.getByRole("checkbox");

    fireEvent.click(checkbox);

    expect(onChange).toHaveBeenCalledWith(true);
  });

  it("should render the title of the checkbox", () => {
    const titleElement = screen.getByText(/test title/i);

    expect(titleElement).toBeInTheDocument();
  });

  it("should render the checkbox title with the correct style", () => {
    const label = screen.getByText(/test title/i);

    expect(label).toHaveClass("test-style");
  });

  it("should not calls the onChange method when the checkbox is not clicked", () => {
    expect(onChange).not.toHaveBeenCalled();
  });
});
