import { render, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

import { MetricsToggleTab } from "../../../../../src/components/reusables/MetricsToggleTab/MetricsToggleTab";

describe("MetricsToggleTab component", () => {
  it("should render toggle tabs", () => {
    const onViewChange = vi.fn();
    const metricsViews = [
      { value: "view1", displayName: "View 1", icon: null },
      { value: "view2", displayName: "View 2", icon: null },
    ];

    const { getByText } = render(
      <MetricsToggleTab
        metricsViews={metricsViews}
        selectedView="view1"
        onViewChange={onViewChange}
      />,
    );

    const view1Element = getByText(/view 1/i);
    expect(view1Element).toBeInTheDocument();

    const view2Element = getByText(/view 2/i);
    expect(view2Element).toBeInTheDocument();
  });

  it("should calls onViewChange when a view is selected", () => {
    const onViewChange = vi.fn();
    const metricsViews = [
      { value: "view1", displayName: "View 1", icon: null },
      { value: "view2", displayName: "View 2", icon: null },
    ];

    const { getByText } = render(
      <MetricsToggleTab
        metricsViews={metricsViews}
        selectedView="view1"
        onViewChange={onViewChange}
      />,
    );

    const view2Element = getByText(/view 2/i);
    fireEvent.click(view2Element);

    expect(onViewChange).toHaveBeenCalledWith("view2");
  });

  it("should not call onViewChange when the selected view is clicked", () => {
    const onViewChange = vi.fn();
    const metricsViews = [
      { value: "view1", displayName: "View 1", icon: null },
      { value: "view2", displayName: "View 2", icon: null },
    ];

    const { getByText } = render(
      <MetricsToggleTab
        metricsViews={metricsViews}
        selectedView="view1"
        onViewChange={onViewChange}
      />,
    );

    const view1Element = getByText(/view 1/i);
    fireEvent.click(view1Element);

    expect(onViewChange).not.toHaveBeenCalled();
  });

  it("should render icon when provided", () => {
    const onViewChange = vi.fn();
    const metricsViews = [
      { value: "view1", displayName: "View 1", icon: <div>Icon</div> },
    ];

    const { getByText } = render(
      <MetricsToggleTab
        metricsViews={metricsViews}
        selectedView="view1"
        onViewChange={onViewChange}
      />,
    );

    const iconElement = getByText(/icon/i);
    expect(iconElement).toBeInTheDocument();
  });
});
