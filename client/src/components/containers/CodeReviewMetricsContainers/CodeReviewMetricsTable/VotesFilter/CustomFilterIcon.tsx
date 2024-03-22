import { IFetchedPullRequestVotes } from "src/services/api/api";

import { VotesFilter } from "./VotesFilter";
import styles from "./VotesFilter.module.scss";
import { FilterIcon } from "../../../../reusables/Filter/Filter";

interface Props {
  showNoVote: boolean;
  filter: Record<keyof IFetchedPullRequestVotes, boolean>;
  handleFilter: (type: keyof IFetchedPullRequestVotes, value: boolean) => void;
  handleFilterReset: () => void;
}

export const CustomFilterIcon = ({ handleFilter, showNoVote, filter, handleFilterReset }: Props) => {
  const isFilterSelected = Object.keys(filter).some((key) => filter[key as keyof IFetchedPullRequestVotes]);

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
