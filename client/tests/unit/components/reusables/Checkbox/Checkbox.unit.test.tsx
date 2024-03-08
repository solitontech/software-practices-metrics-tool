import { render, fireEvent, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

import { Checkbox } from "../../../../../src/components/reusables/Checkbox/Checkbox";

describe("Checkbox component", () => {
  let onChange: (value: boolean) => void;

  beforeEach(() => {
    onChange = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should render the checkbox with the correct initial state", () => {
    render(<Checkbox isChecked={false} onChange={onChange} title="Test Title" labelStyle="test-style" />);

    const checkbox = screen.getByRole("checkbox");

    // user should see the checkbox as not checked
    expect(checkbox).not.toBeChecked();
  });

  it("should calls onChange method when the checkbox is clicked", () => {
    render(<Checkbox isChecked={false} onChange={onChange} title="Test Title" labelStyle="test-style" />);

    expect(onChange).not.toHaveBeenCalled();

    const checkbox = screen.getByRole("checkbox");

    // user clicks the checkbox
    fireEvent.click(checkbox);

    expect(onChange).toHaveBeenCalledWith(true);
  });

  it("should render the title of the checkbox", () => {
    render(<Checkbox isChecked={false} onChange={onChange} title="Test Title" labelStyle="test-style" />);

    const titleElement = screen.getByText(/test title/i);

    // user should see the title of the checkbox
    expect(titleElement).toBeInTheDocument();
  });

  it("should render the checkbox title with the correct style", () => {
    render(<Checkbox isChecked={false} onChange={onChange} title="Test Title" labelStyle="test-style" />);

    const label = screen.getByText(/test title/i);

    expect(label).toHaveClass("test-style");
  });
});
