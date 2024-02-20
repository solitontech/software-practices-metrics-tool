import styles from "./PageNotFound.module.scss";
import pageNotFoundImage from "../../assets/images/pageNotFound.png";

const description =
  " The address you've entered doesn't exist or has been removed. Please recheck the address you've entered";
const pageNotFound = "Page not found";

export const PageNotFound = () => {
  return (
    <div className={styles.pageNotFound}>
      <div>
        <img src={pageNotFoundImage} alt={pageNotFound}></img>
      </div>
      <div className={styles.pageNotFoundText}>{pageNotFound}</div>
      <div className={styles.description}>{description}</div>
    </div>
  );
};
