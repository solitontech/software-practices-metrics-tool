import { render, screen, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { describe, it, expect, vi } from "vitest";

import { SnackbarMessage } from "../../../../../src/components/reusables/SnackbarMessage/SnackbarMessage";

vi.useFakeTimers();

describe("SnackbarMessage component", () => {
  it("should render with message when open", () => {
    render(
      <SnackbarMessage open={true} onClose={() => {}} message="Test message" />,
    );

    const snackbarElement = screen.getByRole("alert");

    expect(snackbarElement).toBeInTheDocument();
    expect(snackbarElement).toHaveTextContent(/test message/i);
  });

  it("should not render when not open", () => {
    render(
      <SnackbarMessage
        open={false}
        onClose={() => {}}
        message="Test message"
      />,
    );

    const snackbarElement = screen.queryByRole("alert");

    expect(snackbarElement).not.toBeInTheDocument();
  });

  it("should call onClose when close button is clicked", () => {
    const onClose = vi.fn();

    render(
      <SnackbarMessage open={true} onClose={onClose} message="Test message" />,
    );

    const closeButton = screen.getByRole("button");
    fireEvent.click(closeButton);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("should call onClose when autoHideDuration is reached", () => {
    const onClose = vi.fn();

    render(
      <SnackbarMessage
        open={true}
        onClose={onClose}
        message="Test message"
        duration={100}
      />,
    );

    act(() => {
      vi.advanceTimersByTime(100);
    });

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("should take default duration when duration is not provided", () => {
    const onClose = vi.fn();

    render(
      <SnackbarMessage open={true} onClose={onClose} message="Test message" />,
    );

    act(() => {
      vi.advanceTimersByTime(6000);
    });

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("should not call onClose when autoHideDuration is not reached", () => {
    const onClose = vi.fn();

    render(
      <SnackbarMessage
        open={true}
        onClose={onClose}
        message="Test message"
        duration={100}
      />,
    );

    act(() => {
      vi.advanceTimersByTime(99);
    });

    expect(onClose).not.toHaveBeenCalled();
  });

  it("should not call onClose when default is not reached", () => {
    const onClose = vi.fn();

    render(
      <SnackbarMessage open={true} onClose={onClose} message="Test message" />,
    );

    act(() => {
      vi.advanceTimersByTime(99);
    });

    expect(onClose).not.toHaveBeenCalled();
  });
});
