import EastIcon from "@mui/icons-material/East";
import DatePicker from "react-datepicker";

import { InfoIconTooltip } from "src/components";

import styles from "./DateRangePicker.module.scss";

interface IDateRangePickerProps {
  date: {
    startDate: Date;
    endDate: Date;
  };
  minDate: Date;
  maxDate: Date;
  handleStartDateChange: (date: Date) => void;
  handleEndDateChange: (date: Date) => void;
  dateFormat?: string;
}

export const DateRangePicker = ({
  date,
  minDate,
  maxDate,
  handleStartDateChange,
  handleEndDateChange,
  dateFormat = "dd MMM yy",
}: IDateRangePickerProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.label}>
        <p>Select start date range</p>
        <InfoIconTooltip
          content="If selected date range or pull request volume is high, data fetching will be slow"
          size="16px"
        />
      </div>
      <div className={styles.datePicker}>
        <div>
          <DatePicker
            className={styles.date}
            selected={date.startDate}
            onChange={handleStartDateChange}
            minDate={minDate}
            maxDate={date.endDate}
            dateFormat={dateFormat}
            popperClassName={styles.dateSelector}
          />
        </div>
        <EastIcon />
        <div>
          <DatePicker
            className={styles.date}
            selected={date.endDate}
            onChange={handleEndDateChange}
            minDate={date.startDate}
            maxDate={maxDate}
            dateFormat={dateFormat}
            popperClassName={styles.dateSelector}
          />
        </div>
      </div>
    </div>
  );
};
