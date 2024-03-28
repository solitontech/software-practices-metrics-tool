import styles from "./Checkbox.module.scss";

interface ICheckboxProps {
  title: string;
  labelStyle: string;
  isChecked: boolean;
  onChange: (value: boolean) => void;
}

export const Checkbox = ({ title, labelStyle, isChecked, onChange }: ICheckboxProps) => {
  return (
    <label className={styles.container}>
      <input
        type="checkbox"
        className={styles.checkbox}
        checked={isChecked}
        onChange={(event) => {
          onChange(event.target.checked);
        }}
      />

      <span className={labelStyle} title={title}>
        {title}
      </span>
    </label>
  );
};
