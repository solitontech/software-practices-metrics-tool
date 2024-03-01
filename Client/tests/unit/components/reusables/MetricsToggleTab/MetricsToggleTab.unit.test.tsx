import { render, fireEvent, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

import { MetricsToggleTab } from "../../../../../src/components/reusables/MetricsToggleTab/MetricsToggleTab";

describe("MetricsToggleTab component", () => {
  const metricsViews = [
    { value: "view1", displayName: "View 1", icon: null },
    { value: "view2", displayName: "View 2", icon: null },
  ];

  let onViewChange: (view: string) => void;

  beforeEach(() => {
    onViewChange = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should render toggle tabs", () => {
    render(
      <MetricsToggleTab
        metricsViews={metricsViews}
        selectedView="view1"
        onViewChange={onViewChange}
      />,
    );

    const view1Element = screen.getByText(/view 1/i);
    expect(view1Element).toBeInTheDocument();

    const view2Element = screen.getByText(/view 2/i);
    expect(view2Element).toBeInTheDocument();
  });

  it("should calls onViewChange method when a view is selected", () => {
    render(
      <MetricsToggleTab
        metricsViews={metricsViews}
        selectedView="view1"
        onViewChange={onViewChange}
      />,
    );

    const view2Element = screen.getByText(/view 2/i);
    fireEvent.click(view2Element);

    expect(onViewChange).toHaveBeenCalledWith("view2");
  });

  it("should not call onViewChange method when the selected view is clicked", () => {
    render(
      <MetricsToggleTab
        metricsViews={metricsViews}
        selectedView="view1"
        onViewChange={onViewChange}
      />,
    );

    const view1Element = screen.getByText(/view 1/i);
    fireEvent.click(view1Element);

    expect(onViewChange).not.toHaveBeenCalled();
  });

  it("should render icon when provided", () => {
    const metricsViews = [
      { value: "view1", displayName: "View 1", icon: <div>Icon</div> },
    ];

    render(
      <MetricsToggleTab
        metricsViews={metricsViews}
        selectedView="view1"
        onViewChange={onViewChange}
      />,
    );

    const iconElement = screen.getByText(/icon/i);
    expect(iconElement).toBeInTheDocument();
  });
});
