import { VotesFilter } from "./VotesFilter";
import styles from "./VotesFilter.module.scss";
import { FilterIcon } from "../../../../reusables/Filter/Filter";
import { ICodeReviewTableVotesFilter, ICodeReviewTableVotes } from "../codeReviewMetricsTableTypes";

interface Props {
  showNoVote: boolean;
  filter: ICodeReviewTableVotesFilter;
  handleFilter: (type: ICodeReviewTableVotes, value: boolean) => void;
  handleFilterReset: () => void;
}

export const CustomFilterIcon = ({ handleFilter, showNoVote, filter, handleFilterReset }: Props) => {
  const isFilterSelected = Object.keys(filter).some((key) => filter[key as ICodeReviewTableVotes]);

  return (
    <FilterIcon isActive={isFilterSelected} style={styles.tableFilterIcon}>
      <div className={styles.voteFilterContainer}>
        <VotesFilter
          filter={filter}
          showNoVotes={showNoVote}
          handleChange={handleFilter}
          handleReset={handleFilterReset}
        ></VotesFilter>
      </div>
    </FilterIcon>
  );
};
