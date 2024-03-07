import styles from "./Tile.module.scss";

interface Props {
  title: string;
  children: React.ReactNode;
}

export const Tile = ({ title, children }: Props) => {
  return (
    <div className={styles.tile}>
      <div className={styles.title}>{title}</div>
      <div className={styles.value}>{children}</div>
    </div>
  );
};
