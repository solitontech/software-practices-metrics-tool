import { render, screen, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { describe, it, expect, vi } from "vitest";

import { SnackbarMessage } from "../../../../../src/components/reusables/SnackbarMessage/SnackbarMessage";

vi.useFakeTimers();

describe("SnackbarMessage component", () => {
  it("should render with message when open", () => {
    const onClose = vi.fn();

    render(
      <SnackbarMessage open={true} onClose={onClose} message="Test message" />,
    );

    const snackbarElement = screen.getByRole("alert");

    expect(snackbarElement).toBeInTheDocument();
    expect(snackbarElement).toHaveTextContent(/test message/i);
  });

  it("should not render when the toast is not open", () => {
    const onClose = vi.fn();

    render(
      <SnackbarMessage open={false} onClose={onClose} message="Test message" />,
    );

    const snackbarElement = screen.queryByRole("alert");

    expect(snackbarElement).not.toBeInTheDocument();
  });

  it("should call onClose method when close button is clicked", () => {
    const onClose = vi.fn();

    render(
      <SnackbarMessage open={true} onClose={onClose} message="Test message" />,
    );

    const closeButton = screen.getByRole("button");
    fireEvent.click(closeButton);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("should call onClose method when autoHideDuration is reached", () => {
    const onClose = vi.fn();
    const duration = 100;

    render(
      <SnackbarMessage
        open={true}
        onClose={onClose}
        message="Test message"
        duration={duration}
      />,
    );

    act(() => {
      vi.advanceTimersByTime(duration);
    });

    expect(onClose).toHaveBeenCalledOnce();
  });

  it("should take default duration when duration is not provided", () => {
    const onClose = vi.fn();
    const interval = 2000;

    render(
      <SnackbarMessage open={true} onClose={onClose} message="Test message" />,
    );

    act(() => {
      vi.advanceTimersByTime(interval);
    });

    expect(onClose).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(interval);
    });

    expect(onClose).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(interval);
    });

    expect(onClose).toHaveBeenCalledOnce();
  });

  it("should not call onClose method when autoHideDuration is not reached", () => {
    const onClose = vi.fn();
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

    act(() => {
      vi.advanceTimersByTime(timeToAdvance);
    });

    expect(onClose).not.toHaveBeenCalled();
  });

  it("Should not call onClose method when the default duration is not reached", () => {
    const onClose = vi.fn();
    const timeLessThanDefault = 99;

    render(
      <SnackbarMessage open={true} onClose={onClose} message="Test message" />,
    );

    act(() => {
      vi.advanceTimersByTime(timeLessThanDefault);
    });

    expect(onClose).not.toHaveBeenCalled();
  });
});
