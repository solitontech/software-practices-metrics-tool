import EastIcon from "@mui/icons-material/East";
import DatePicker from "react-datepicker";

import styles from "./DateRangePicker.module.scss";
import { InfoIconTooltip } from "../InfoIconTooltip/InfoIconTooltip";


interface Dates {
  startDate: Date;
  endDate: Date;
}

interface Props {
  date: Dates;
  onStartDateChange: (date: Date) => void;
  onEndDateChange: (date: Date) => void;
  minDate: Date;
  maxDate: Date;
}

export const DateRangePicker = ({ date, onStartDateChange, onEndDateChange, minDate, maxDate }: Props) => {
  return (
    <div className={styles.dateHeader}>
      <div className={styles.tileContent}>
        <div>Select start date range</div>
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
            onChange={onStartDateChange}
            minDate={minDate}
            maxDate={date.endDate}
            dateFormat="dd MMM yy"
            popperClassName={styles.popper}
          />
        </div>
        <div>
          <EastIcon />
        </div>
        <div>
          <DatePicker
            className={styles.date}
            selected={date.endDate}
            onChange={onEndDateChange}
            minDate={date.startDate}
            maxDate={maxDate}
            dateFormat="dd MMM yy"
            popperClassName={styles.popper}
          />
        </div>
      </div>
    </div>
  );
};
