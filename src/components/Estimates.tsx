import { Estimate } from "@/types/neural-network";
import styles from "@/styles/Estimates.module.css";
import { format, addDays, formatDuration, intervalToDuration } from "date-fns";

export const Estimates = ({ estimates }: { estimates?: Estimate[] }) => {
  if (!estimates) return null;

  return (
    <div className={styles.estimates}>
      {estimates.map(({ totalImagingTime }, index) => {
        const date = addDays(new Date(), index);
        const duration = intervalToDuration({
          start: 0,
          end: totalImagingTime * 60 * 1000,
        });
        return (
          <div className={styles.estimate}>
            <h2>{format(date, "EEEE")}</h2>
            <h3>{format(date, "MMM dd")}</h3>
            <p>{formatDuration(duration, { format: ["hours", "minutes"] })}</p>
          </div>
        );
      })}
    </div>
  );
};
