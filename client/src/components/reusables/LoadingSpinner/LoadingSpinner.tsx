import loading from "src/assets/images/loading.webp";

import styles from "./LoadingSpinner.module.scss";

interface ILoadingSpinnerProps {
  content: string;
}

export const LoadingSpinner = ({ content }: ILoadingSpinnerProps) => {
  return (
    <div className={styles.loadingPage}>
      <div className={styles.container}>
        <img className={styles.image} src={loading} alt="loading" />
        <p className={styles.description}>{content}</p>
      </div>
    </div>
  );
};
