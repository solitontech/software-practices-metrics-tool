import { useContext } from "react";

import { produce } from "immer";

import { USERS, USER_TYPE } from "./clientFilterConstants";
import styles from "./ClientFilters.module.scss";
import { isValidUsers } from "./clientFilterUtils";
import { ClientFiltersContext } from "../../../contexts/clientFiltersContext/clientFiltersContext";
import { ISquad, IUser } from "../../../contexts/clientFiltersContext/clientFiltersContextInterface";
import { Checkbox } from "../../reusables/Checkbox/Checkbox";

export const ClientFilterContainer = () => {
  const { filters, setFilters } = useContext(ClientFiltersContext);

  const onSquadChange = (userKey: keyof typeof USERS, squadIndex: number, value: boolean) => {
    const updatedFilters = produce(filters, (draftFilters: ISquad[]) => {
      const users = draftFilters[squadIndex][USERS[userKey] as keyof ISquad] as Record<string, IUser>;

      for (const developer in users) {
        users[developer].isSelected = value;
      }
    });

    setFilters(updatedFilters);
  };

  const onUserChange = (userKey: keyof typeof USERS, squadIndex: number, userId: string, value: boolean) => {
    const updatedFilters = produce(filters, (draftFilters: ISquad[]) => {
      const users = draftFilters[squadIndex][USERS[userKey] as keyof ISquad] as Record<string, IUser>;

      users[userId].isSelected = value;
    });

    setFilters(updatedFilters);
  };

  return (
    <div className={styles.filterContainer}>
      {!filters.length && (
        <>
          <div className={styles.noFiltersHeading}>No filters available</div>
          <div className={styles.noFiltersContent}> Configure filters in server-config.json</div>
        </>
      )}
      {filters.map((squad, squadIndex) => {
        const developerKeyValues = Object.entries(squad.developers);
        const reviewKeyValues = Object.entries(squad.reviewers);

        const isAllDevelopersSelected = developerKeyValues.every(([, developer]) => developer.isSelected);
        const isAllReviewersSelected = reviewKeyValues.every(([, reviewer]) => reviewer.isSelected);

        const userKeyValues = {
          AUTHOR: developerKeyValues,
          REVIEWER: reviewKeyValues,
        };
        const userSelected = {
          AUTHOR: isAllDevelopersSelected,
          REVIEWER: isAllReviewersSelected,
        };

        return (
          <div
            className={`${styles.squadContainer} ${filters.length - 1 !== squadIndex ? styles.squadMargin : ""}`}
            key={squad.squadName}
          >
            <div className={styles.squadName} title={squad.squadName}>
              Squad - {squad.squadName}
            </div>

            <div className={styles.userFiltersContainer}>
              {Object.keys(USERS).map((userType) => {
                const userKey = userType as keyof typeof USERS;

                return (
                  isValidUsers(userKeyValues[userKey]) && (
                    <div className={styles.userFilterContainer} key={userKey}>
                      <Checkbox
                        isChecked={userSelected[userKey]}
                        onChange={(value) => {
                          onSquadChange(userKey, squadIndex, value);
                        }}
                        title={USER_TYPE[userKey]}
                        labelStyle={styles.squadCategory}
                      />

                      <div className={styles.userContainer}>
                        {userKeyValues[userKey].map(([developerKey, developerValues]) => (
                          <Checkbox
                            key={developerKey}
                            isChecked={developerValues.isSelected}
                            onChange={(value) => {
                              onUserChange(userKey, squadIndex, developerKey, value);
                            }}
                            title={developerValues.name}
                            labelStyle={styles.userLabel}
                          />
                        ))}
                      </div>
                    </div>
                  )
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};
