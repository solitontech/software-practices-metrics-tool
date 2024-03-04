import { render, screen, waitFor } from "@testing-library/react";
import { HttpResponse, delay, http } from "msw";
import { SetupServerApi, setupServer } from "msw/node";
import { act } from "react-dom/test-utils";

import { ACTIVE_BRANCHES, BRANCHES } from "./constants";
import { loadTrunkBasedComponent } from "./utils";
import { queryClient } from "../../../../../../src/setup/queryClient";

describe("TrunkBasedMetricsTiles component", () => {
  let server: SetupServerApi;

  beforeAll(() => {
    server = setupServer();
    server.listen();
  });

  afterEach(() => {
    queryClient.clear();
    server.resetHandlers();
  });

  afterAll(() => server.close());

  it("should render trunk based tiles with repository data", async () => {
    server.use(
      http.get("/api/v1/metrics/trunk-based-development/branches", async () => {
        await delay(500);

        return HttpResponse.json(BRANCHES);
      }),
      http.get(
        "/api/v1/metrics/trunk-based-development/activeBranches",
        async () => {
          await delay(500);

          return HttpResponse.json(ACTIVE_BRANCHES);
        },
      ),
    );

    render(loadTrunkBasedComponent());

    // user would see the '-' until the api call is successful
    await waitFor(async () => {
      expect(await screen.findByTestId("total-branches")).toHaveTextContent(
        "-",
      );
      expect(await screen.findByTestId("active-branches")).toHaveTextContent(
        "-",
      );
      expect(
        await screen.findByTestId("branches-following-naming-standard"),
      ).toHaveTextContent("-");
    });

    // user would see the data once the api call is successful
    await waitFor(
      async () => {
        expect(await screen.findByTestId("total-branches")).toHaveTextContent(
          "10",
        );
        expect(await screen.findByTestId("active-branches")).toHaveTextContent(
          "2",
        );
        expect(
          await screen.findByTestId("branches-following-naming-standard"),
        ).toHaveTextContent("50%");
      },
      { timeout: 550 },
    );
  });

  it("should render '-' when data is failed to fetch", async () => {
    server.use(
      http.get("/api/v1/metrics/trunk-based-development/branches", () => {
        return new HttpResponse("Server Error", { status: 500 });
      }),
      http.get("/api/v1/metrics/trunk-based-development/activeBranches", () => {
        return new HttpResponse("Server Error", { status: 500 });
      }),
    );

    render(loadTrunkBasedComponent());

    await waitFor(async () => {
      expect(await screen.findByTestId("total-branches")).toHaveTextContent(
        "-",
      );
      expect(await screen.findByTestId("active-branches")).toHaveTextContent(
        "-",
      );
      expect(
        await screen.findByTestId("branches-following-naming-standard"),
      ).toHaveTextContent("-");
    });
  });

  it("should open active branches dialog upon clicking on active PR's button", async () => {
    server.use(
      http.get("/api/v1/metrics/trunk-based-development/branches", () => {
        return HttpResponse.json(BRANCHES);
      }),
      http.get("/api/v1/metrics/trunk-based-development/activeBranches", () => {
        return HttpResponse.json(ACTIVE_BRANCHES);
      }),
    );

    render(loadTrunkBasedComponent());

    const activeBranchesButton = await screen.findByTestId(
      "active-branches-button",
    );

    // user expects dialog to be closed initially
    expect(screen.queryByText(/total active pr's: 2/i)).toBeNull();

    act(() => {
      activeBranchesButton.click();
    });

    // user expects dialog to be open after clicking on the button
    expect(await screen.findByText(/total active pr's: 2/i)).toBeDefined();
  });

  it("should render table with active pull requests to the trunk branch in the dialog box", async () => {
    server.use(
      http.get("/api/v1/metrics/trunk-based-development/branches", () => {
        return HttpResponse.json(BRANCHES);
      }),
      http.get("/api/v1/metrics/trunk-based-development/activeBranches", () => {
        return HttpResponse.json(ACTIVE_BRANCHES);
      }),
    );

    render(loadTrunkBasedComponent());

    const activeBranchesButton = await screen.findByTestId(
      "active-branches-button",
    );

    // user expects dialog to be closed initially
    expect(screen.queryByText(/branch1/i)).toBeNull();
    expect(screen.queryByText(/branch2/i)).toBeNull();

    act(() => {
      activeBranchesButton.click();
    });

    // user expects dialog to be open after clicking on the button
    expect(await screen.findAllByText(/branch1/i)).toBeDefined();
    expect(await screen.findAllByText(/branch2/i)).toBeDefined();

    expect(await screen.findAllByText(/pull request 1/i)).toBeDefined();
    expect(await screen.findAllByText(/pull request 2/i)).toBeDefined();

    expect(await screen.findAllByText(/user1/i)).toBeDefined();
    expect(await screen.findAllByText(/user2/i)).toBeDefined();
  });

  it("should open branches naming convention dialog", async () => {
    server.use(
      http.get("/api/v1/metrics/trunk-based-development/branches", () => {
        return HttpResponse.json(BRANCHES);
      }),
      http.get("/api/v1/metrics/trunk-based-development/activeBranches", () => {
        return HttpResponse.json(ACTIVE_BRANCHES);
      }),
    );

    render(loadTrunkBasedComponent());

    const branchesNamingConventionButton = await screen.findByTestId(
      "branches-naming-convention-button",
    );

    // user expects dialog to be closed initially
    expect(screen.queryByText(/total branches: 2/i)).toBeNull();

    act(() => {
      branchesNamingConventionButton.click();
    });

    // user expects dialog to be open after clicking on the button
    expect(
      await screen.findByText(/branches not following naming standard/i),
    ).toBeDefined();

    expect(await screen.findByText(/total branches: 2/i)).toBeDefined();
  });

  it("should render table with branches not following naming standard in dialog box", async () => {
    server.use(
      http.get("/api/v1/metrics/trunk-based-development/branches", () => {
        return HttpResponse.json(BRANCHES);
      }),
      http.get("/api/v1/metrics/trunk-based-development/activeBranches", () => {
        return HttpResponse.json(ACTIVE_BRANCHES);
      }),
    );

    render(loadTrunkBasedComponent());

    const branchesNamingConventionButton = await screen.findByTestId(
      "branches-naming-convention-button",
    );

    act(() => {
      branchesNamingConventionButton.click();
    });

    // user expects table should not contain the branches following naming standard
    expect(screen.queryByText(/users\/Kaya\/20_Pokmon_FY2_CW/i)).toBeNull();

    // user expects table should contain the branches not following naming standard
    expect(await screen.findAllByText(/20Bis2Automation/i)).toBeDefined();
    expect(await screen.findAllByText(/development/i)).toBeDefined();
  });
});
