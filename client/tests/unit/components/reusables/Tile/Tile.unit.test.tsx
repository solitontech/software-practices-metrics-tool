import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import { Tile } from "../../../../../src/components/reusables/Tile/Tile";

const ChildComponent = () => <div>Test Children</div>;

describe("Tile component", () => {
  it("should render the tile's title and children", () => {
    render(
      <Tile title="Test Title">
        <ChildComponent />
      </Tile>,
    );

    const titleElement = screen.getByText(/test title/i);
    expect(titleElement).toBeInTheDocument();

    const childrenElement = screen.getByText(/test children/i);
    expect(childrenElement).toBeInTheDocument();
  });
});
