import styles from "./Checkbox.module.scss";

interface Props {
  isChecked: boolean;
  onChange: (value: boolean) => void;
  title: string;
  labelStyle: string;
}

export const Checkbox = ({ isChecked, onChange, title, labelStyle }: Props) => {
  return (
    <label className={styles.checkboxContainer}>
      <input
        type="checkbox"
        className={styles.checkbox}
        checked={isChecked}
        onChange={(event) => {
          onChange(event.target.checked);
        }}
      />

      <div className={labelStyle} title={title}>
        {title}
      </div>
    </label>
  );
};
