import styles from "./CommonLayout.module.scss";

interface ICommonLayoutProps {
  title: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
}

export const CommonLayout = ({ title, children, actions }: ICommonLayoutProps) => {
  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        {actions && <div className={styles.actions}>{actions}</div>}
      </header>
      <main className={styles.main}>{children}</main>
    </section>
  );
};
