import { render, screen, fireEvent } from "@testing-library/react";

import { CodeReviewMetricsTiles } from "../../../../../../src/components/containers/CodeReviewMetricsContainers/CodeReviewMetricsTiles/CodeReviewMetricsTiles";

describe("CodeReviewMetricsTiles", () => {
  it("renders correctly", async () => {
    const props = {
      averageFirstReviewResponseTime: 0.75,
      averageApprovalTime: 1,
      averageMergeTime: 4,
    };

    render(<CodeReviewMetricsTiles {...props} />);

    const firstReviewResponseTimeElement = await screen.findByTestId(
      /first-review-response-time/i,
    );
    expect(firstReviewResponseTimeElement).toHaveTextContent(/0.75 hour/i);

    const approvalTimeElement = await screen.findByTestId(/approval-time/i);
    expect(approvalTimeElement).toHaveTextContent(/1 hour/i);

    const mergeTimeElement = await screen.findByTestId(/merge-time/i);
    expect(mergeTimeElement).toHaveTextContent(/4 hours/i);
  });

  it("renders correctly with string values", async () => {
    const props = {
      averageFirstReviewResponseTime: "-",
      averageApprovalTime: "2 hours",
      averageMergeTime: "NA",
    };

    render(<CodeReviewMetricsTiles {...props} />);

    const firstReviewResponseTimeElement = await screen.findByText(/-/i);
    expect(firstReviewResponseTimeElement).toBeDefined();

    const approvalTimeElement = await screen.findByText(/2 hours/i);
    expect(approvalTimeElement).toBeDefined();

    const mergeTimeElement = await screen.findByText(/NA/i);
    expect(mergeTimeElement).toBeDefined();
  });

  it("shows the correct recommended time for metrics for each tile on hover", async () => {
    render(
      <CodeReviewMetricsTiles
        averageFirstReviewResponseTime={25}
        averageApprovalTime={50}
        averageMergeTime={75}
      />,
    );

    const expectedFirstReviewResponseTime =
      "1 day, 1 hour ( Recommended time for first review response should be less than 24 hours )";
    const expectedApprovalTime =
      "2 days, 2 hours ( Recommended time for approval should be less than 48 hours )";
    const expectedMergeTime =
      "3 days, 3 hours ( Recommended time for merge should be less than 72 hours )";

    fireEvent.mouseOver(screen.getByTestId(expectedFirstReviewResponseTime));
    expect(
      await screen.findByText(expectedFirstReviewResponseTime),
    ).toBeInTheDocument();

    fireEvent.mouseOver(screen.getByTestId(expectedApprovalTime));
    expect(await screen.findByText(expectedApprovalTime)).toBeInTheDocument();

    fireEvent.mouseOver(screen.getByTestId(expectedMergeTime));
    expect(await screen.findByText(expectedMergeTime)).toBeInTheDocument();
  });
});
