import { useContext } from "react";

import { produce } from "immer";

import { Checkbox, FilterIcon } from "src/components/components";
import {
  ClientFilterContext,
  IContextClientFilterSquadMemberKey,
  IContextClientFilterSquadMembers,
} from "src/context/context";

import styles from "./ClientFilters.module.scss";

interface IClientFiltersCategory {
  label: string;
  key: IContextClientFilterSquadMemberKey;
  members: IContextClientFilterSquadMembers;
}

const MemberFilters = () => {
  const { filters, setFilters } = useContext(ClientFilterContext);

  const handleSquadValueChange = (squadIdx: number, key: IContextClientFilterSquadMemberKey, value: boolean) => {
    const updatedFilters = produce(filters, (draftFilters) => {
      const squad = draftFilters[squadIdx];
      const members = squad[key];

      members.forEach((member) => {
        member.isSelected = value;
      });
    });

    setFilters(updatedFilters);
  };

  const handleMemberValueChange = (
    squadIdx: number,
    key: IContextClientFilterSquadMemberKey,
    memberIdx: number,
    value: boolean,
  ) => {
    const updatedFilters = produce(filters, (draftFilters) => {
      const squad = draftFilters[squadIdx];
      const members = squad[key];

      members[memberIdx].isSelected = value;
    });

    setFilters(updatedFilters);
  };

  if (!filters.length) {
    return (
      <div className={styles.filterContainer}>
        <h4 className={styles.noFiltersHeading}>No filters available</h4>
        <p className={styles.noFiltersContent}> Configure filters in server-config.json</p>
      </div>
    );
  }

  return (
    <div className={styles.filterContainer}>
      {filters.map(({ squadName, developers, reviewers }, squadIdx) => {
        const category: IClientFiltersCategory[] = [
          { label: "Authors", key: "developers", members: developers },
          { label: "Reviewers", key: "reviewers", members: reviewers },
        ];

        return (
          <div key={squadName} className={styles.squadContainer}>
            <h4 title={squadName} className={styles.squadName}>
              Squad - {squadName}
            </h4>
            <div className={styles.categoryContainer}>
              {category.map(({ key, label, members }) => {
                const hasAllMembersSelected = Object.values(members).every(({ isSelected }) => isSelected);

                return (
                  <div key={label} className={styles.memberContainer}>
                    <Checkbox
                      isChecked={hasAllMembersSelected}
                      onChange={(value) => handleSquadValueChange(squadIdx, key, value)}
                      title={label}
                      labelStyle={styles.squadCategory}
                    />
                    <div className={styles.userContainer}>
                      {members.map(({ id, name, isSelected }, memberIdx) => (
                        <Checkbox
                          key={id}
                          labelStyle={styles.userLabel}
                          title={name}
                          isChecked={isSelected}
                          onChange={(value) => handleMemberValueChange(squadIdx, key, memberIdx, value)}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export const ClientFilters = () => {
  return (
    <FilterIcon className={styles.filterIcon}>
      <div className={styles.clientFilterContainer}>
        <MemberFilters />
      </div>
    </FilterIcon>
  );
};
