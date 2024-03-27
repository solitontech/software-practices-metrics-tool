import { render, fireEvent, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

import { TabToggle } from "./TabToggle";

describe("TabToggle component", () => {
  const metricsViews = [
    { label: "View 1", value: "view1", icon: null },
    { label: "View 2", value: "view2", icon: null },
  ];

  let handleTabChange: (view: string) => void;

  beforeEach(() => {
    handleTabChange = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should render toggle tabs", () => {
    render(<TabToggle tabs={metricsViews} selectedTab="view1" handleTabChange={handleTabChange} />);

    // user should see the two toggle tabs
    const view1Element = screen.getByText(/view 1/i);
    expect(view1Element).toBeInTheDocument();

    const view2Element = screen.getByText(/view 2/i);
    expect(view2Element).toBeInTheDocument();
  });

  it("should calls onViewChange method when a view is selected", () => {
    render(<TabToggle tabs={metricsViews} selectedTab="view1" handleTabChange={handleTabChange} />);

    const view2Element = screen.getByText(/view 2/i);

    // user clicks the view 2 tab
    fireEvent.click(view2Element);

    expect(handleTabChange).toHaveBeenCalledWith("view2");
  });

  it("should not call onViewChange method when the selected view is clicked", () => {
    render(<TabToggle tabs={metricsViews} selectedTab="view1" handleTabChange={handleTabChange} />);

    const view1Element = screen.getByText(/view 1/i);

    // user clicks the view 1 tab which is already active tab
    fireEvent.click(view1Element);

    expect(handleTabChange).not.toHaveBeenCalled();
  });

  it("should render icon when provided", () => {
    const metricsViews = [{ value: "view1", label: "View 1", icon: <div>Icon</div> }];

    render(<TabToggle tabs={metricsViews} selectedTab="view1" handleTabChange={handleTabChange} />);

    const iconElement = screen.getByText(/icon/i);
    const view1Element = screen.getByText(/view 1/i);

    // user should see the icon along with the tab name
    expect(iconElement).toBeInTheDocument();
    expect(view1Element).toBeInTheDocument();
  });
});
