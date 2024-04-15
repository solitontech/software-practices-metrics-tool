import { IContextClientFilterSquad } from "src/context/context";

import { IFetchedRawCodeReviewResponse } from "./codeReviewTypes.ts";
import { CodeReviewMetricsUtils } from "./codeReviewUtils.ts";
import { FILTERED_PULL_REQUESTS_MOCK, FILTER_BY_REVIEWERS_MOCKS } from "./test/codeReviewUtils.mock.ts";

describe("CodeReviewMetricsUtils~getFilteredPullRequests - method to get the pull requests filtered by developers and reviewers", () => {
  it("should return the pull requests filtered by selected developers (all developers selected)", () => {
    const filters: IContextClientFilterSquad[] = FILTERED_PULL_REQUESTS_MOCK.MOCK_1.FILTERS;

    const data: Omit<IFetchedRawCodeReviewResponse, "filteredCount" | "count"> =
      FILTERED_PULL_REQUESTS_MOCK.MOCK_1.DATA;

    const result = CodeReviewMetricsUtils.getFilteredPullRequests(data, filters);

    expect(result).toEqual(FILTERED_PULL_REQUESTS_MOCK.MOCK_1.RESULT);
  });

  it("should return the pull requests filtered by selected developers (only one developer selected)", () => {
    const filters: IContextClientFilterSquad[] = FILTERED_PULL_REQUESTS_MOCK.MOCK_2.FILTERS;

    const data: Omit<IFetchedRawCodeReviewResponse, "filteredCount" | "count"> =
      FILTERED_PULL_REQUESTS_MOCK.MOCK_2.DATA;

    const result = CodeReviewMetricsUtils.getFilteredPullRequests(data, filters);

    expect(result).toEqual(FILTERED_PULL_REQUESTS_MOCK.MOCK_2.RESULT);
  });

  it("should return the pull requests filtered by selected developers and reviewers (all developers selected & only one reviewer selected)", () => {
    const filters: IContextClientFilterSquad[] = FILTERED_PULL_REQUESTS_MOCK.MOCK_3.FILTERS;

    const data: Omit<IFetchedRawCodeReviewResponse, "filteredCount" | "count"> =
      FILTERED_PULL_REQUESTS_MOCK.MOCK_3.DATA;

    const result = CodeReviewMetricsUtils.getFilteredPullRequests(data, filters);

    expect(result).toEqual(FILTERED_PULL_REQUESTS_MOCK.MOCK_3.RESULT);
  });

  it("should return the pull requests filtered by selected developers (all developers selected - but no pull requests found as developers are not a part of PR)", () => {
    const filters: IContextClientFilterSquad[] = FILTERED_PULL_REQUESTS_MOCK.MOCK_4.FILTERS;

    const data: Omit<IFetchedRawCodeReviewResponse, "filteredCount" | "count"> =
      FILTERED_PULL_REQUESTS_MOCK.MOCK_4.DATA;

    const result = CodeReviewMetricsUtils.getFilteredPullRequests(data, filters);

    expect(result).toEqual(FILTERED_PULL_REQUESTS_MOCK.MOCK_4.RESULT);
  });

  it("should return the pull requests filtered by selected developers and reviewers (all developers & reviewers selected - but no pull requests found as developers or reviewers are not a part of PR)", () => {
    const filters: IContextClientFilterSquad[] = FILTERED_PULL_REQUESTS_MOCK.MOCK_5.FILTERS;

    const data: Omit<IFetchedRawCodeReviewResponse, "filteredCount" | "count"> =
      FILTERED_PULL_REQUESTS_MOCK.MOCK_5.DATA;

    const result = CodeReviewMetricsUtils.getFilteredPullRequests(data, filters);

    expect(result).toEqual(FILTERED_PULL_REQUESTS_MOCK.MOCK_5.RESULT);
  });

  it("should return the pull requests filtered by selected developers (no developers selected)", () => {
    const filters: IContextClientFilterSquad[] = FILTERED_PULL_REQUESTS_MOCK.MOCK_6.FILTERS;

    const data: Omit<IFetchedRawCodeReviewResponse, "filteredCount" | "count"> =
      FILTERED_PULL_REQUESTS_MOCK.MOCK_6.DATA;

    const result = CodeReviewMetricsUtils.getFilteredPullRequests(data, filters);

    expect(result).toEqual(FILTERED_PULL_REQUESTS_MOCK.MOCK_6.RESULT);
  });

  it("should return the pull requests filtered by selected developers (no developers and reviewers selected)", () => {
    const filters: IContextClientFilterSquad[] = FILTERED_PULL_REQUESTS_MOCK.MOCK_7.FILTERS;

    const data: Omit<IFetchedRawCodeReviewResponse, "filteredCount" | "count"> =
      FILTERED_PULL_REQUESTS_MOCK.MOCK_7.DATA;

    const result = CodeReviewMetricsUtils.getFilteredPullRequests(data, filters);

    expect(result).toEqual(FILTERED_PULL_REQUESTS_MOCK.MOCK_7.RESULT);
  });
});

describe("CodeReviewMetricsUtils~getFilteredPullRequestsByReviewers - method to get the pull requests where votes & votes timelines filtered", () => {
  it("should return pull requests without filtering votes and votes history timeline when no reviewers selected", () => {
    const filters: IContextClientFilterSquad[] = FILTER_BY_REVIEWERS_MOCKS.MOCK_1.FILTERS;

    const data: Omit<IFetchedRawCodeReviewResponse, "filteredCount" | "count"> = FILTER_BY_REVIEWERS_MOCKS.MOCK_1.DATA;

    const result = CodeReviewMetricsUtils.getFilteredPullRequestsByReviewers(data, filters);

    expect(result).toEqual(FILTER_BY_REVIEWERS_MOCKS.MOCK_1.RESULT);
  });

  it("should return pull requests by filtering the votes and votes history timeline when reviewers selected", () => {
    const filters: IContextClientFilterSquad[] = FILTER_BY_REVIEWERS_MOCKS.MOCK_2.FILTERS;

    const data: Omit<IFetchedRawCodeReviewResponse, "filteredCount" | "count"> = FILTER_BY_REVIEWERS_MOCKS.MOCK_2.DATA;

    const result = CodeReviewMetricsUtils.getFilteredPullRequestsByReviewers(data, filters);

    expect(result).toEqual(FILTER_BY_REVIEWERS_MOCKS.MOCK_2.RESULT);
  });

  it("should return pull requests by empty votes and votes history timeline when selected reviewers are not found", () => {
    const filters: IContextClientFilterSquad[] = FILTER_BY_REVIEWERS_MOCKS.MOCK_3.FILTERS;

    const data: Omit<IFetchedRawCodeReviewResponse, "filteredCount" | "count"> = FILTER_BY_REVIEWERS_MOCKS.MOCK_3.DATA;

    const result = CodeReviewMetricsUtils.getFilteredPullRequestsByReviewers(data, filters);

    expect(result).toEqual(FILTER_BY_REVIEWERS_MOCKS.MOCK_3.RESULT);
  });
});
