import { screen } from "@testing-library/dom";
import { render, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { describe, it, expect, vi } from "vitest";

import { SearchBox } from "../../../../../src/components/reusables/SearchBox/SearchBox";

vi.useFakeTimers();

function advanceTimersByTime(time: number) {
  act(() => {
    vi.advanceTimersByTime(time);
  });
}

describe("SearchBox component", () => {
  const defaultDelay = 400;

  it("should render with place holder", () => {
    const onChange = vi.fn();
    render(
      <SearchBox
        onChange={onChange}
        label="Test Label"
        placeHolder="Test Placeholder"
      />,
    );

    const inputElement = screen.getByPlaceholderText(/test placeholder/i);

    expect(inputElement).toBeInTheDocument();
  });

  it("should render search icon ", () => {
    const onChange = vi.fn();
    render(
      <SearchBox
        onChange={onChange}
        label="Test Label"
        placeHolder="Test Placeholder"
      />,
    );

    const searchIconElement = screen.getByTestId("SearchIcon");

    expect(searchIconElement).toBeInTheDocument();
  });

  it("render tooltip icon", () => {
    const onChange = vi.fn();
    render(
      <SearchBox
        onChange={onChange}
        label="Test Label"
        placeHolder="Test Placeholder"
      />,
    );

    const tooltipElement = screen.getByTestId("InfoIcon");

    expect(tooltipElement).toBeInTheDocument();
  });

  it("should call onChange when input changes", () => {
    const onChange = vi.fn();
    render(
      <SearchBox
        onChange={onChange}
        label="Test Label"
        placeHolder="Test Placeholder"
      />,
    );

    const inputElement = screen.getByPlaceholderText(/test placeholder/i);
    fireEvent.change(inputElement, { target: { value: "Test" } });

    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("should debounces input changes with given delay", () => {
    const delay = 500;
    const onChange = vi.fn();
    render(
      <SearchBox
        onChange={onChange}
        label="Test Label"
        placeHolder="Test Placeholder"
        isDebounced={true}
        delay={delay}
      />,
    );

    const inputElement = screen.getByPlaceholderText(/test placeholder/i);
    fireEvent.change(inputElement, { target: { value: "Test" } });

    expect(onChange).not.toHaveBeenCalled();

    advanceTimersByTime(delay);

    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("should cancel previous debounce timer when input changes", () => {
    const delay = 500;
    const onChange = vi.fn();
    render(
      <SearchBox
        onChange={onChange}
        label="Test Label"
        placeHolder="Test Placeholder"
        isDebounced={true}
        delay={delay}
      />,
    );

    const inputElement = screen.getByPlaceholderText(/test placeholder/i);
    fireEvent.change(inputElement, { target: { value: "Test 1" } });
    fireEvent.change(inputElement, { target: { value: "Test 2" } });

    advanceTimersByTime(delay);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({
          value: "Test 2",
        }) as HTMLInputElement,
        type: "change",
      }),
    );
  });

  it("should debounces input changes with custom delay", () => {
    const onChange = vi.fn();
    render(
      <SearchBox
        onChange={onChange}
        label="Test Label"
        placeHolder="Test Placeholder"
        isDebounced={true}
      />,
    );

    const inputElement = screen.getByPlaceholderText(/test placeholder/i);
    fireEvent.change(inputElement, { target: { value: "Test" } });

    expect(onChange).not.toHaveBeenCalled();

    advanceTimersByTime(defaultDelay);

    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('should not debounce input changes when "isDebounced" is false', () => {
    const onChange = vi.fn();
    render(
      <SearchBox
        onChange={onChange}
        label="Test Label"
        placeHolder="Test Placeholder"
        isDebounced={false}
      />,
    );

    const inputElement = screen.getByPlaceholderText(/test placeholder/i);
    fireEvent.change(inputElement, { target: { value: "Test" } });

    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("should not debounce input changes when input event is not fired", () => {
    const onChange = vi.fn();
    render(
      <SearchBox
        onChange={onChange}
        label="Test Label"
        placeHolder="Test Placeholder"
        isDebounced={true}
      />,
    );

    expect(onChange).not.toHaveBeenCalled();

    advanceTimersByTime(defaultDelay);

    expect(onChange).not.toHaveBeenCalled();
  });

  it("should calls onClick when input is clicked", () => {
    const onChange = vi.fn();
    const onClick = vi.fn();
    render(
      <SearchBox
        onChange={onChange}
        label="Test Label"
        placeHolder="Test Placeholder"
        onClick={onClick}
      />,
    );

    const inputElement = screen.getByPlaceholderText(/test placeholder/i);
    fireEvent.click(inputElement);

    expect(onClick).toHaveBeenCalledOnce();
  });

  it("should not call onClick when input not clicked", () => {
    const onChange = vi.fn();
    const onClick = vi.fn();
    render(
      <SearchBox
        onChange={onChange}
        label="Test Label"
        placeHolder="Test Placeholder"
        onClick={onClick}
      />,
    );

    expect(onClick).not.toHaveBeenCalled();
  });
});
