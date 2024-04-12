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

  it("should return the pull requests filtered by selected developers (one non selected developer)", () => {
    const filters: IContextClientFilterSquad[] = FILTERED_PULL_REQUESTS_MOCK.MOCK_2.FILTERS;

    const data: Omit<IFetchedRawCodeReviewResponse, "filteredCount" | "count"> =
      FILTERED_PULL_REQUESTS_MOCK.MOCK_2.DATA;

    const result = CodeReviewMetricsUtils.getFilteredPullRequests(data, filters);

    expect(result).toEqual(FILTERED_PULL_REQUESTS_MOCK.MOCK_2.RESULT);
  });

  it("should return the pull requests filtered by selected developers and reviewers (all developers selected & one reviewer selected)", () => {
    const filters: IContextClientFilterSquad[] = FILTERED_PULL_REQUESTS_MOCK.MOCK_3.FILTERS;

    const data: Omit<IFetchedRawCodeReviewResponse, "filteredCount" | "count"> =
      FILTERED_PULL_REQUESTS_MOCK.MOCK_3.DATA;

    const result = CodeReviewMetricsUtils.getFilteredPullRequests(data, filters);

    expect(result).toEqual(FILTERED_PULL_REQUESTS_MOCK.MOCK_3.RESULT);
  });

  it("should return the pull requests filtered by selected developers (all developers selected - no filtered pull requests as developers not found)", () => {
    const filters: IContextClientFilterSquad[] = FILTERED_PULL_REQUESTS_MOCK.MOCK_4.FILTERS;

    const data: Omit<IFetchedRawCodeReviewResponse, "filteredCount" | "count"> =
      FILTERED_PULL_REQUESTS_MOCK.MOCK_4.DATA;

    const result = CodeReviewMetricsUtils.getFilteredPullRequests(data, filters);

    expect(result).toEqual(FILTERED_PULL_REQUESTS_MOCK.MOCK_4.RESULT);
  });

  it("should return the pull requests filtered by selected developers and reviewers (all developers & reviewers selected - no filtered pull requests as reviewers not found)", () => {
    const filters: IContextClientFilterSquad[] = FILTERED_PULL_REQUESTS_MOCK.MOCK_5.FILTERS;

    const data: Omit<IFetchedRawCodeReviewResponse, "filteredCount" | "count"> =
      FILTERED_PULL_REQUESTS_MOCK.MOCK_5.DATA;

    const result = CodeReviewMetricsUtils.getFilteredPullRequests(data, filters);

    expect(result).toEqual(FILTERED_PULL_REQUESTS_MOCK.MOCK_5.RESULT);
  });

  it("should return the pull requests filtered by selected developers (no selected developers)", () => {
    const filters: IContextClientFilterSquad[] = FILTERED_PULL_REQUESTS_MOCK.MOCK_6.FILTERS;

    const data: Omit<IFetchedRawCodeReviewResponse, "filteredCount" | "count"> =
      FILTERED_PULL_REQUESTS_MOCK.MOCK_6.DATA;

    const result = CodeReviewMetricsUtils.getFilteredPullRequests(data, filters);

    expect(result).toEqual(FILTERED_PULL_REQUESTS_MOCK.MOCK_6.RESULT);
  });

  it("should return the pull requests filtered by selected developers (no selected developers & selected reviewers)", () => {
    const filters: IContextClientFilterSquad[] = FILTERED_PULL_REQUESTS_MOCK.MOCK_7.FILTERS;

    const data: Omit<IFetchedRawCodeReviewResponse, "filteredCount" | "count"> =
      FILTERED_PULL_REQUESTS_MOCK.MOCK_7.DATA;

    const result = CodeReviewMetricsUtils.getFilteredPullRequests(data, filters);

    expect(result).toEqual(FILTERED_PULL_REQUESTS_MOCK.MOCK_7.RESULT);
  });
});

describe("CodeReviewMetricsUtils~getFilteredPullRequestsByReviewers - method to get the pull requests where votes & votes timelines filtered", () => {
  it("should return pull requests without filtering the votes and votes timelines with reviewers when not selected", () => {
    const filters: IContextClientFilterSquad[] = FILTER_BY_REVIEWERS_MOCKS.MOCK_1.FILTERS;

    const data: Omit<IFetchedRawCodeReviewResponse, "filteredCount" | "count"> = FILTER_BY_REVIEWERS_MOCKS.MOCK_1.DATA;

    const result = CodeReviewMetricsUtils.getFilteredPullRequestsByReviewers(data, filters);

    expect(result).toEqual(FILTER_BY_REVIEWERS_MOCKS.MOCK_1.RESULT);
  });

  it("should return the pull requests by filtering the votes and votes timelines with reviewers when selected", () => {
    const filters: IContextClientFilterSquad[] = FILTER_BY_REVIEWERS_MOCKS.MOCK_2.FILTERS;

    const data: Omit<IFetchedRawCodeReviewResponse, "filteredCount" | "count"> = FILTER_BY_REVIEWERS_MOCKS.MOCK_2.DATA;

    const result = CodeReviewMetricsUtils.getFilteredPullRequestsByReviewers(data, filters);

    expect(result).toEqual(FILTER_BY_REVIEWERS_MOCKS.MOCK_2.RESULT);
  });

  it("should return the pull requests by filtering the votes and votes timelines as empty when selected reviewers not found", () => {
    const filters: IContextClientFilterSquad[] = FILTER_BY_REVIEWERS_MOCKS.MOCK_3.FILTERS;

    const data: Omit<IFetchedRawCodeReviewResponse, "filteredCount" | "count"> = FILTER_BY_REVIEWERS_MOCKS.MOCK_3.DATA;

    const result = CodeReviewMetricsUtils.getFilteredPullRequestsByReviewers(data, filters);

    expect(result).toEqual(FILTER_BY_REVIEWERS_MOCKS.MOCK_3.RESULT);
  });
});
