import pageNotFoundImage from "src/assets/images/pageNotFound.png";
import { ErrorBoundary } from "src/components";

import styles from "./PageNotFound.module.scss";

export const PageNotFound = () => {
  return (
    <ErrorBoundary key="page-not-found">
      <section className={styles.pageNotFound}>
        <img src={pageNotFoundImage} alt="Page not found"></img>
        <h2 className={styles.pageNotFoundText}>Page not found</h2>
        <p className={styles.description}>The address you have entered does not exist</p>
      </section>
    </ErrorBoundary>
  );
};
