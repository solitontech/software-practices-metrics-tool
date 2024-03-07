import styles from "./LoadingSpinner.module.scss";
import loading from "../../../assets/images/loading.webp";

interface Props {
  content: string;
}

export const LoadingSpinner = ({ content }: Props) => {
  return (
    <div className={styles.loadingPage}>
      <div className={styles.loading}>
        <img className={styles.loadingImage} src={loading} alt="Loading." />
        <div className={styles.description}>{content}</div>
      </div>
    </div>
  );
};
