import styles from "./VotesFilter.module.scss";
import { VOTES } from "./votesFilterConstants";
import approved from "../../../../../assets/images/approved.svg";
import approvedWithSuggestions from "../../../../../assets/images/approvedWithSuggestions.svg";
import noVote from "../../../../../assets/images/noVote.svg";
import rejected from "../../../../../assets/images/rejected.svg";
import waitForAuthor from "../../../../../assets/images/waitForAuthor.svg";
import { ICodeReviewTableVotesFilter, ICodeReviewTableVotes } from "../codeReviewMetricsTableTypes";

interface Props {
  showNoVotes: boolean;
  filter: ICodeReviewTableVotesFilter;
  handleChange: (type: ICodeReviewTableVotes, value: boolean) => void;
  handleReset: () => void;
}

export const VotesFilter = ({ showNoVotes, filter, handleChange, handleReset }: Props) => {
  return (
    <div className={styles.filterContainer}>
      <div className={styles.title}>Filter By</div>

      <label className={styles.checkboxContainer}>
        <input
          className={styles.checkbox}
          type="checkbox"
          checked={filter.approved}
          onChange={() => handleChange(VOTES.APPROVED as ICodeReviewTableVotes, !filter.approved)}
        />

        <div className={styles.voteImageLabelContainer}>
          <img className={styles.checkboxImage} src={approved} alt={"Approved"} />

          <div title="Approved" className={styles.voteLabel}>
            Approved
          </div>
        </div>
      </label>

      <label className={styles.checkboxContainer}>
        <input
          className={styles.checkbox}
          type="checkbox"
          checked={filter.approvedWithSuggestions}
          onChange={() =>
            handleChange(VOTES.APPROVED_WITH_SUGGESTIONS as ICodeReviewTableVotes, !filter.approvedWithSuggestions)
          }
        />

        <div className={styles.voteImageLabelContainer}>
          <img className={styles.checkboxImage} src={approvedWithSuggestions} alt={"Approved With Suggestions"} />

          <div title="Approved With Suggestions" className={styles.voteLabel}>
            Approved With Suggestions
          </div>
        </div>
      </label>

      <label className={styles.checkboxContainer}>
        <input
          className={styles.checkbox}
          type="checkbox"
          checked={filter.waitForAuthor}
          onChange={() => handleChange(VOTES.WAIT_FOR_AUTHOR as ICodeReviewTableVotes, !filter.waitForAuthor)}
        />

        <div className={styles.voteImageLabelContainer}>
          <img className={styles.checkboxImage} src={waitForAuthor} alt={"Wait For Author"} />

          <div title="Wait For Author" className={styles.voteLabel}>
            Wait For Author
          </div>
        </div>
      </label>

      <label className={styles.checkboxContainer}>
        <input
          className={styles.checkbox}
          type="checkbox"
          checked={filter.rejected}
          onChange={() => handleChange(VOTES.REJECTED as ICodeReviewTableVotes, !filter.rejected)}
        />

        <div className={styles.voteImageLabelContainer}>
          <img className={styles.checkboxImage} src={rejected} alt={"Rejected"} />

          <div title="Rejected" className={styles.voteLabel}>
            Rejected
          </div>
        </div>
      </label>

      {showNoVotes && (
        <label className={styles.checkboxContainer}>
          <input
            className={styles.checkbox}
            type="checkbox"
            checked={filter.noVote}
            onChange={() => handleChange(VOTES.NO_VOTE as ICodeReviewTableVotes, !filter.noVote)}
          />

          <div className={styles.voteImageLabelContainer}>
            <img className={styles.checkboxImage} src={noVote} alt={"No Vote"} />

            <div title="No Vote" className={styles.voteLabel}>
              No Vote
            </div>
          </div>
        </label>
      )}

      <div className={styles.clearFilterContainer}>
        <button className={styles.clearFilters} onClick={handleReset}>
          Clear
        </button>
      </div>
    </div>
  );
};
