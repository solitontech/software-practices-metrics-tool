import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

import { CodeReviewMetricsTiles } from "../../../../../../src/components/containers/CodeReviewMetricsContainers/CodeReviewMetricsTiles/CodeReviewMetricsTiles";

describe("CodeReviewMetricsTiles", () => {
  it("should render firstReviewResponse time, approval time & merge time correctly", async () => {
    render(
      <CodeReviewMetricsTiles
        averageFirstReviewResponseTime={0.75}
        averageApprovalTime={1}
        averageMergeTime={4}
      />,
    );

    // user should see the firstReviewResponse time
    const firstReviewResponseTimeElement = await screen.findByTestId(
      /first-review-response-time/i,
    );

    expect(firstReviewResponseTimeElement).toHaveTextContent(/0.75 hour/i);

    // user should see the approval time
    const approvalTimeElement = await screen.findByTestId(/approval-time/i);
    expect(approvalTimeElement).toHaveTextContent(/1 hour/i);

    // user should see the merge time
    const mergeTimeElement = await screen.findByTestId(/merge-time/i);
    expect(mergeTimeElement).toHaveTextContent(/4 hours/i);
  });

  it("should render firstReviewResponse time as '-' & merge time as NA", async () => {
    render(
      <CodeReviewMetricsTiles
        averageFirstReviewResponseTime={"-"}
        averageApprovalTime={"2 hours"}
        averageMergeTime={"NA"}
      />,
    );

    // user should see the firstReviewResponse time as '-'
    const firstReviewResponseTimeElement = await screen.findByText(/-/i);
    expect(firstReviewResponseTimeElement).toBeDefined();

    // user should see the approval time
    const approvalTimeElement = await screen.findByText(/2 hours/i);
    expect(approvalTimeElement).toBeDefined();

    // user should see the merge time as NA
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

    const firstReviewResponseTooltipContent =
      "1 day, 1 hour ( Recommended time for first review response should be less than 24 hours )";
    const approvalTimeTooltipContent =
      "2 days, 2 hours ( Recommended time for approval should be less than 48 hours )";
    const mergeTimeTooltipContent =
      "3 days, 3 hours ( Recommended time for merge should be less than 72 hours )";

    // when user hover over the firstReviewResponse time tooltip, user should see the recommended first review response time
    await userEvent.hover(
      screen.getByTestId(firstReviewResponseTooltipContent),
    );

    expect(
      await screen.findByText(firstReviewResponseTooltipContent),
    ).toBeInTheDocument();

    // when user hover over the approval time tooltip, user should see the recommended response time
    await userEvent.hover(screen.getByTestId(approvalTimeTooltipContent));

    expect(
      await screen.findByText(approvalTimeTooltipContent),
    ).toBeInTheDocument();

    // when user hover over the merge time tooltip, user should see the recommended merge time
    await userEvent.hover(screen.getByTestId(mergeTimeTooltipContent));

    expect(
      await screen.findByText(mergeTimeTooltipContent),
    ).toBeInTheDocument();
  });
});
