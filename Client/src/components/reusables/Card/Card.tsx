import styles from "./Card.module.scss";

interface Props {
  content: React.ReactNode;
  onClick?: () => void;
}

export const Card = ({ content }: Props) => {
  return (
    <div className={styles.cardStyle}>
      <p>{content}</p>
    </div>
  );
};
