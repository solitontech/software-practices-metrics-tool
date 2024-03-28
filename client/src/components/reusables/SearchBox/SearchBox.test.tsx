import { screen } from "@testing-library/dom";
import { render, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { describe, it, expect, vi } from "vitest";

import { SearchBox } from "./SearchBox";

vi.useFakeTimers();

function advanceTimersByTime(time: number) {
  act(() => {
    vi.advanceTimersByTime(time);
  });
}

describe("SearchBox component", () => {
  const defaultDelay = 400;

  it("should render search box with place holder, search icon & tooltip", () => {
    const onChange = vi.fn();

    render(<SearchBox onChange={onChange} label="Test Label" placeHolder="Test Placeholder" />);

    // user should see input field with placeholder
    const inputElement = screen.getByPlaceholderText(/test placeholder/i);
    expect(inputElement).toBeInTheDocument();

    // user should see search icon
    const searchIconElement = screen.getByTestId(/SearchIcon/i);
    expect(searchIconElement).toBeInTheDocument();

    // user should see tooltip
    const tooltipElement = screen.getByTestId(/test placeholder/i);
    expect(tooltipElement).toBeInTheDocument();
  });

  it("should call onChange when input of search box changes", () => {
    const onChange = vi.fn();

    render(<SearchBox onChange={onChange} label="Test Label" placeHolder="Test Placeholder" />);

    const inputElement = screen.getByPlaceholderText(/test placeholder/i);

    // when user is typing in the input field, onChange method should be called
    fireEvent.change(inputElement, { target: { value: "Test" } });

    expect(onChange).toHaveBeenCalledOnce();

    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({
          value: "Test",
        }) as HTMLInputElement,
        type: "change",
      }),
    );
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

    // when user is typing in the input field, onChange method should not be called
    fireEvent.change(inputElement, { target: { value: "Test" } });

    expect(onChange).not.toHaveBeenCalled();

    // after given delay, onChange method should be called
    advanceTimersByTime(delay);

    expect(onChange).toHaveBeenCalledOnce();

    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({
          value: "Test",
        }) as HTMLInputElement,
        type: "change",
      }),
    );
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

    // when user is typing in the input field, onChange method should not be called
    fireEvent.change(inputElement, { target: { value: "Test 1" } });

    fireEvent.change(inputElement, { target: { value: "Test 2" } });

    // after given delay, onChange method should be called only once with latest value
    advanceTimersByTime(delay);

    expect(onChange).toHaveBeenCalledOnce();

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

    render(<SearchBox onChange={onChange} label="Test Label" placeHolder="Test Placeholder" isDebounced={true} />);

    const inputElement = screen.getByPlaceholderText(/test placeholder/i);

    // when user is typing in the input field, onChange method should not be called
    fireEvent.change(inputElement, { target: { value: "Test" } });

    expect(onChange).not.toHaveBeenCalled();

    // after default delay, onChange method should be called
    advanceTimersByTime(defaultDelay);

    expect(onChange).toHaveBeenCalledOnce();

    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({
          value: "Test",
        }) as HTMLInputElement,
        type: "change",
      }),
    );
  });

  it('should not debounce input changes when "isDebounced" is false', () => {
    const onChange = vi.fn();

    render(<SearchBox onChange={onChange} label="Test Label" placeHolder="Test Placeholder" isDebounced={false} />);

    const inputElement = screen.getByPlaceholderText(/test placeholder/i);

    // when user is typing in the input field, onChange method should be called immediately
    fireEvent.change(inputElement, { target: { value: "Test" } });

    expect(onChange).toHaveBeenCalledOnce();

    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({
          value: "Test",
        }) as HTMLInputElement,
        type: "change",
      }),
    );
  });

  it("should not debounce input changes when input event is not fired", () => {
    const onChange = vi.fn();

    render(<SearchBox onChange={onChange} label="Test Label" placeHolder="Test Placeholder" isDebounced={true} />);

    // when user is not typing in the input field, onChange method should not be called
    expect(onChange).not.toHaveBeenCalled();

    // even after default delay, onChange method should not be called
    advanceTimersByTime(defaultDelay);

    expect(onChange).not.toHaveBeenCalled();
  });

  it("should calls onClick when input is clicked", () => {
    const onChange = vi.fn();
    const onClick = vi.fn();

    render(<SearchBox onChange={onChange} label="Test Label" placeHolder="Test Placeholder" onClick={onClick} />);

    const inputElement = screen.getByPlaceholderText(/test placeholder/i);

    // when user clicks on the input field, onClick method should be called
    fireEvent.click(inputElement);

    expect(onClick).toHaveBeenCalledOnce();
  });

  it("should not call onClick when input not clicked", () => {
    const onChange = vi.fn();
    const onClick = vi.fn();

    render(<SearchBox onChange={onChange} label="Test Label" placeHolder="Test Placeholder" onClick={onClick} />);

    // when user does not click on the input field, onClick method should not be called
    expect(onClick).not.toHaveBeenCalled();
  });
});
