import approved from "src/assets/images/approved.svg";
import approvedWithSuggestions from "src/assets/images/approvedWithSuggestions.svg";
import noVote from "src/assets/images/noVote.svg";
import rejected from "src/assets/images/rejected.svg";
import waitForAuthor from "src/assets/images/waitForAuthor.svg";
import { FilterIcon } from "src/components/components";
import { VOTES } from "src/constants/constants";
import { IFetchedPullRequestVotes } from "src/services/api/api";

import styles from "./CodeReviewTableVotesFilter.module.scss";

interface ICodeReviewTableVotesFilterProps {
  showNoVote: boolean;
  filter: Record<keyof IFetchedPullRequestVotes, boolean>;
  handleFilterChange: (type: keyof IFetchedPullRequestVotes, value: boolean) => void;
  handleFilterReset: () => void;
}

export const CodeReviewTableVotesFilter = ({
  showNoVote,
  filter,
  handleFilterChange,
  handleFilterReset,
}: ICodeReviewTableVotesFilterProps) => {
  const isFilterSelected = Object.keys(filter).some((key) => filter[key as keyof IFetchedPullRequestVotes]);

  return (
    <FilterIcon isActive={isFilterSelected} className={styles.filterIcon}>
      <div className={styles.container}>
        <div className={styles.filterContainer}>
          <h6 className={styles.title}>Filter By</h6>
          <label className={styles.checkboxContainer}>
            <input
              className={styles.checkbox}
              type="checkbox"
              checked={filter.approved}
              onChange={() => handleFilterChange(VOTES.APPROVED, !filter.approved)}
            />
            <div className={styles.voteImageContainer}>
              <img className={styles.checkboxImage} src={approved} alt={"Approved"} />
              <p title="Approved" className={styles.voteLabel}>
                Approved
              </p>
            </div>
          </label>
          <label className={styles.checkboxContainer}>
            <input
              className={styles.checkbox}
              type="checkbox"
              checked={filter.approvedWithSuggestions}
              onChange={() => handleFilterChange(VOTES.APPROVED_WITH_SUGGESTIONS, !filter.approvedWithSuggestions)}
            />
            <div className={styles.voteImageContainer}>
              <img className={styles.checkboxImage} src={approvedWithSuggestions} alt={"Approved With Suggestions"} />
              <p title="Approved With Suggestions" className={styles.voteLabel}>
                Approved With Suggestions
              </p>
            </div>
          </label>
          <label className={styles.checkboxContainer}>
            <input
              className={styles.checkbox}
              type="checkbox"
              checked={filter.waitForAuthor}
              onChange={() => handleFilterChange(VOTES.WAIT_FOR_AUTHOR, !filter.waitForAuthor)}
            />
            <div className={styles.voteImageContainer}>
              <img className={styles.checkboxImage} src={waitForAuthor} alt={"Wait For Author"} />
              <p title="Wait For Author" className={styles.voteLabel}>
                Wait For Author
              </p>
            </div>
          </label>
          <label className={styles.checkboxContainer}>
            <input
              className={styles.checkbox}
              type="checkbox"
              checked={filter.rejected}
              onChange={() => handleFilterChange(VOTES.REJECTED, !filter.rejected)}
            />
            <div className={styles.voteImageContainer}>
              <img className={styles.checkboxImage} src={rejected} alt={"Rejected"} />
              <p title="Rejected" className={styles.voteLabel}>
                Rejected
              </p>
            </div>
          </label>
          {showNoVote && (
            <label className={styles.checkboxContainer}>
              <input
                className={styles.checkbox}
                type="checkbox"
                checked={filter.noVote}
                onChange={() => handleFilterChange(VOTES.NO_VOTE as keyof IFetchedPullRequestVotes, !filter.noVote)}
              />
              <div className={styles.voteImageContainer}>
                <img className={styles.checkboxImage} src={noVote} alt={"No Vote"} />
                <p title="No Vote" className={styles.voteLabel}>
                  No Vote
                </p>
              </div>
            </label>
          )}
          <div className={styles.clearFilterContainer}>
            <button className={styles.clearFilterBtn} onClick={handleFilterReset}>
              Clear
            </button>
          </div>
        </div>
      </div>
    </FilterIcon>
  );
};
