import { render, screen, waitFor } from "@testing-library/react";
import { setupServer } from "msw/node";
import { act } from "react-dom/test-utils";

import { LoadTrunkBasedComponent } from "./LoadTrunkBasedComponent";
import { ACTIVE_BRANCHES, BRANCHES } from "./TrunkBasedMetricsTiles.mock";
import {
  getActiveBranchesHandler,
  getBranchesHandler,
  getServerErrorHandler,
} from "./TrunkBasedMetricsTiles.msw-handlers";
import { queryClient } from "../../../../../../src/setup/queryClient";

describe("TrunkBasedMetricsTiles component", () => {
  let server: ReturnType<typeof setupServer>;

  beforeAll(() => {
    server = setupServer();
    server.listen();
  });

  afterEach(() => {
    // react-query's cache is cleared after each test
    queryClient.clear();

    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  it("should render trunk based tiles with repository data", async () => {
    server.use(
      getBranchesHandler(BRANCHES, 100),
      getActiveBranchesHandler(ACTIVE_BRANCHES, 100),
    );

    render(LoadTrunkBasedComponent());

    // user would see the '-' until the api call is successful
    await waitFor(async () => {
      expect(await screen.findByTestId("total-branches")).toHaveTextContent(
        "-",
      );
    });

    await waitFor(async () => {
      expect(await screen.findByTestId("active-branches")).toHaveTextContent(
        "-",
      );
    });

    await waitFor(async () => {
      expect(
        await screen.findByTestId("branches-following-naming-standard"),
      ).toHaveTextContent("-");
    });

    // user would see the data once the api call is successful
    await waitFor(async () => {
      expect(await screen.findByTestId("total-branches")).toHaveTextContent(
        "10",
      );
    });

    await waitFor(async () => {
      expect(await screen.findByTestId("active-branches")).toHaveTextContent(
        "2",
      );
    });

    await waitFor(async () => {
      expect(
        await screen.findByTestId("branches-following-naming-standard"),
      ).toHaveTextContent("50%");
    });
  });

  it("should render '-' when data is failed to fetch", async () => {
    server.use(
      getServerErrorHandler(
        "/api/v1/metrics/trunk-based-development/branches",
        250,
      ),
      getServerErrorHandler(
        "/api/v1/metrics/trunk-based-development/activeBranches",
        250,
      ),
    );

    render(LoadTrunkBasedComponent());

    // Simulate the passage of time until the network call fails
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // user should still see "-" after the network call fails
    await waitFor(async () => {
      expect(await screen.findByTestId("total-branches")).toHaveTextContent(
        "-",
      );
    });

    await waitFor(async () => {
      expect(await screen.findByTestId("active-branches")).toHaveTextContent(
        "-",
      );
    });

    await waitFor(async () => {
      expect(
        await screen.findByTestId("branches-following-naming-standard"),
      ).toHaveTextContent("-");
    });
  });

  it("should open active branches dialog upon clicking on active PR's button", async () => {
    server.use(
      getBranchesHandler(BRANCHES),
      getActiveBranchesHandler(ACTIVE_BRANCHES),
    );

    render(LoadTrunkBasedComponent());

    const activeBranchesButton = await screen.findByTestId(
      "active-branches-button",
    );

    // user expects dialog to be closed initially
    expect(screen.queryByText(/total active pr's: 2/i)).toBeNull();

    // user clicks on the button to open the dialog
    act(() => {
      activeBranchesButton.click();
    });

    // user should see the dialog opened
    expect(await screen.findByText(/total active pr's: 2/i)).toBeDefined();
  });

  it("should render table with active pull requests to the trunk branch in the dialog box", async () => {
    server.use(
      getBranchesHandler(BRANCHES),
      getActiveBranchesHandler(ACTIVE_BRANCHES),
    );

    render(LoadTrunkBasedComponent());

    const activeBranchesButton = await screen.findByTestId(
      "active-branches-button",
    );

    // user expects dialog to be closed initially
    expect(screen.queryByText(/branch1/i)).toBeNull();
    expect(screen.queryByText(/branch2/i)).toBeNull();

    // user clicks on the button to open the dialog
    act(() => {
      activeBranchesButton.click();
    });

    // user should see the dialog opened
    expect(await screen.findByText(/branch1/i)).toBeDefined();
    expect(await screen.findByText(/branch2/i)).toBeDefined();

    expect(await screen.findByText(/pull request 1/i)).toBeDefined();
    expect(await screen.findByText(/pull request 2/i)).toBeDefined();

    expect(await screen.findByText(/user1/i)).toBeDefined();
    expect(await screen.findByText(/user2/i)).toBeDefined();
  });

  it("should open branches naming convention dialog", async () => {
    server.use(
      getBranchesHandler(BRANCHES),
      getActiveBranchesHandler(ACTIVE_BRANCHES),
    );

    render(LoadTrunkBasedComponent());

    const branchesNamingConventionButton = await screen.findByTestId(
      "branches-naming-convention-button",
    );

    // user expects dialog to be closed initially
    expect(screen.queryByText(/total branches: 2/i)).toBeNull();

    // user clicks on the button to open the dialog
    act(() => {
      branchesNamingConventionButton.click();
    });

    // user should see the dialog opened
    expect(
      await screen.findByText(/branches not following naming standard/i),
    ).toBeDefined();

    expect(await screen.findByText(/total branches: 2/i)).toBeDefined();
  });

  it("should render table with branches not following naming standard in dialog box", async () => {
    server.use(
      getBranchesHandler(BRANCHES),
      getActiveBranchesHandler(ACTIVE_BRANCHES),
    );

    render(LoadTrunkBasedComponent());

    const branchesNamingConventionButton = await screen.findByTestId(
      "branches-naming-convention-button",
    );

    // user clicks on the button to open the table
    act(() => {
      branchesNamingConventionButton.click();
    });

    // user expects table should not contain the branches following naming standard
    expect(screen.queryByText(/users\/Kaya\/20_Pokmon_FY2_CW/i)).toBeNull();

    // user expects table should contain the branches not following naming standard
    expect(await screen.findByText(/20Bis2Automation/i)).toBeDefined();
    expect(await screen.findByText(/development/i)).toBeDefined();
  });
});
