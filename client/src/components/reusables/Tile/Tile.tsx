import styles from "./Tile.module.scss";

interface ITileProps {
  title: string;
  children: React.ReactNode;
}

export const Tile = ({ title, children }: ITileProps) => {
  return (
    <div className={styles.tile}>
      <h6 className={styles.title}>{title}</h6>
      <p className={styles.children}>{children}</p>
    </div>
  );
};
