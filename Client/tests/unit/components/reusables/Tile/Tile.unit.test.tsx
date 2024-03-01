import { render, screen } from "@testing-library/react";

import { Tile } from "../../../../../src/components/reusables/Tile/Tile";

const MockChildComponent = () => <div>Test Children</div>;

describe("Tile component - render tile with title & children", () => {
  it("should renders the tile's title and children", () => {
    render(
      <Tile title="Test Title">
        <MockChildComponent />
      </Tile>,
    );

    const titleElement = screen.getByText(/test title/i);
    expect(titleElement).toBeInTheDocument();

    const childrenElement = screen.getByText(/test children/i);
    expect(childrenElement).toBeInTheDocument();
  });
});
