import { ClientFilterContainer } from "./ClientFilterContainer";
import styles from "./ClientFilters.module.scss";
import { FilterIcon } from "../../reusables/Filter/Filter";

export const ClientFilters = () => {
  return (
    <FilterIcon style={styles.filterIcon}>
      <div className={styles.clientFilterContainer}>
        <ClientFilterContainer />
      </div>
    </FilterIcon>
  );
};
