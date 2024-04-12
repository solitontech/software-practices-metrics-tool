import { IFetchedRawPullRequestThreads } from "./codeReviewTypes";
import { CommentMetrics } from "./commentMetricsUtils";

describe("CommentMetrics~getPullRequestComments - method to get the count for nit, major and total comments for a pull request from threads.", () => {
  it("should count total comments & comments starts with nit & major", () => {
    const threads: IFetchedRawPullRequestThreads[] = [
      {
        comments: [
          {
            content: "nit: Fix this",
            authorId: "1",
            authorName: "Author1",
          },
          {
            content: "major:refactor that",
            authorId: "1",
            authorName: "Author1",
          },
        ],
      },
      {
        comments: [
          {
            content: "nItfix that",
            authorId: "1",
            authorName: "Author1",
          },
          {
            content: "majOr: fix this",
            authorId: "1",
            authorName: "Author1",
          },
          {
            content: "This is a general comment",
            authorId: "1",
            authorName: "Author1",
          },
        ],
      },
    ];

    const result = CommentMetrics.getPullRequestComments(threads);

    expect(result).toEqual({
      totalComments: 5,
      numberOfNitComments: 2,
      numberOfMajorComments: 2,
    });
  });

  it("should return all zeros if there are no comments", () => {
    const threads: IFetchedRawPullRequestThreads[] = [];

    const result = CommentMetrics.getPullRequestComments(threads);

    expect(result).toEqual({
      totalComments: 0,
      numberOfNitComments: 0,
      numberOfMajorComments: 0,
    });
  });

  it("should return nit & major comments as zero", () => {
    const threads: IFetchedRawPullRequestThreads[] = [
      {
        comments: [
          {
            content: "This is a general comment",
            authorId: "1",
            authorName: "Author1",
          },
        ],
      },
    ];

    const result = CommentMetrics.getPullRequestComments(threads);

    expect(result).toEqual({
      totalComments: 1,
      numberOfNitComments: 0,
      numberOfMajorComments: 0,
    });
  });
});

describe("CommentMetrics~getPullRequestReviewerComments - method to get the count of reviewers comments for a pull request from threads", () => {
  it("should correctly count comments per reviewer", () => {
    const threads: IFetchedRawPullRequestThreads[] = [
      {
        comments: [
          { authorId: "1", authorName: "Author1", content: "nit: Fix this" },
          { authorId: "2", authorName: "Author2", content: "major:refactor that" },
        ],
      },
      { comments: [{ authorId: "1", authorName: "Author1", content: "This is general comments" }] },
    ];

    const result = CommentMetrics.getPullRequestReviewerComments(threads);

    expect(result).toEqual([
      { reviewer: "Author1", comments: 2 },
      { reviewer: "Author2", comments: 1 },
    ]);
  });

  it("should return an empty array if there are no comments", () => {
    const threads: IFetchedRawPullRequestThreads[] = [];

    const result = CommentMetrics.getPullRequestReviewerComments(threads);

    expect(result).toEqual([]);
  });
});
