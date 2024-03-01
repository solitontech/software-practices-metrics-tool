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

    const titleElement = screen.getByText(/Test Title/i);
    expect(titleElement).toBeInTheDocument();

    const childrenElement = screen.getByText(/Test Children/i);
    expect(childrenElement).toBeInTheDocument();
  });
});
