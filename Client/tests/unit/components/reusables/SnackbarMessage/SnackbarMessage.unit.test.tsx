import { render, screen, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { describe, it, expect, vi } from "vitest";

import { SnackbarMessage } from "../../../../../src/components/reusables/SnackbarMessage/SnackbarMessage";

vi.useFakeTimers();

function advanceTimersByTime(time: number) {
  act(() => {
    vi.advanceTimersByTime(time);
  });
}

describe("SnackbarMessage component", () => {
  let onClose: () => void;

  beforeEach(() => {
    onClose = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should render with message when open", () => {
    render(
      <SnackbarMessage open={true} onClose={onClose} message="Test message" />,
    );

    const snackbarElement = screen.getByRole("alert");

    expect(snackbarElement).toBeInTheDocument();
    expect(snackbarElement).toHaveTextContent(/test message/i);
  });

  it("should not render when the toast is not open", () => {
    render(
      <SnackbarMessage open={false} onClose={onClose} message="Test message" />,
    );

    const snackbarElement = screen.queryByRole("alert");

    expect(snackbarElement).not.toBeInTheDocument();
  });

  it("should call onClose method when close button is clicked", () => {
    render(
      <SnackbarMessage open={true} onClose={onClose} message="Test message" />,
    );

    const closeButton = screen.getByRole("button");
    fireEvent.click(closeButton);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("should call onClose method when autoHideDuration is reached", () => {
    const duration = 100;

    render(
      <SnackbarMessage
        open={true}
        onClose={onClose}
        message="Test message"
        duration={duration}
      />,
    );

    advanceTimersByTime(duration);

    expect(onClose).toHaveBeenCalledOnce();
  });

  it("should take default duration when duration is not provided", () => {
    const interval = 2000;

    render(
      <SnackbarMessage open={true} onClose={onClose} message="Test message" />,
    );

    advanceTimersByTime(interval);
    expect(onClose).not.toHaveBeenCalled();

    advanceTimersByTime(interval);
    expect(onClose).not.toHaveBeenCalled();

    advanceTimersByTime(interval);
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("should not call onClose method when autoHideDuration is not reached", () => {
    const duration = 100;
    const timeToAdvance = duration - 1;

    render(
      <SnackbarMessage
        open={true}
        onClose={onClose}
        message="Test message"
        duration={duration}
      />,
    );

    advanceTimersByTime(timeToAdvance);
    expect(onClose).not.toHaveBeenCalled();
  });

  it("Should not call onClose method when the default duration is not reached", () => {
    const timeLessThanDefault = 99;

    render(
      <SnackbarMessage open={true} onClose={onClose} message="Test message" />,
    );

    advanceTimersByTime(timeLessThanDefault);
    expect(onClose).not.toHaveBeenCalled();
  });
});
