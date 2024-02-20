import styles from "./DisplayError.module.scss";

interface Props {
  error: string | undefined;
}
export const DisplayError = ({ error }: Props) => {
  return <div className={styles.errorMessage}>{error}</div>;
};
