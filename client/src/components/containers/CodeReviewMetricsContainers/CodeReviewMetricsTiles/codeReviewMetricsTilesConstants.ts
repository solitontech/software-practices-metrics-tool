export const HEADERS = {
  FIRST_REVIEW: "Avg first review response time",
  APPROVAL: "Avg approval time",
  MERGE: "Avg merge time",
};

export const THRESHOLDS = {
  FIRST_REVIEW: { MIN: 24, MAX: 48 },
  APPROVAL: { MIN: 48, MAX: 72 },
  MERGE: { MIN: 72, MAX: 96 },
};

export const recommendedTime = {
  firstReviewResponseTime: `Recommended time for first review response should be less than ${THRESHOLDS.FIRST_REVIEW.MIN} hours`,
  approvalTime: `Recommended time for approval should be less than ${THRESHOLDS.APPROVAL.MIN} hours`,
  mergeTime: `Recommended time for merge should be less than ${THRESHOLDS.MERGE.MIN} hours`,
};

export const MIN_THRESHOLD_CLASS = "minThreshold";
export const MAX_THRESHOLD_CLASS = "maxThreshold";
export const INSIDE_THRESHOLD_CLASS = "insideThreshold";
