import styles from "./CommonLayout.module.scss";
import { Header } from "../Header/Header";

interface Props {
  id?: string;
  pageHeader: string;
  children: React.ReactNode;
  searchBox?: React.ReactNode;
  filter?: React.ReactNode;
  searchDialogBox?: React.ReactNode;
}

export const CommonLayout = ({ id, pageHeader, children, searchBox, filter, searchDialogBox }: Props) => {
  return (
    <div className={styles.container}>
      <header>
        <Header
          id={id}
          pageHeader={pageHeader}
          searchBox={searchBox}
          filter={filter}
          searchDialogBox={searchDialogBox}
        />
      </header>
      <main>{children}</main>
    </div>
  );
};
