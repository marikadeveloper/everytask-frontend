import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from "prop-types";
import { Stopwatch } from "../../assets/icons";
import "./styles.scss";

dayjs.extend(relativeTime);

function TaskDeadline({ deadline, short = true }) {
  // deadline: 2024-03-30T20:52:26.326Z
  const getClassFromDeadline = (deadline) => {
    const date = dayjs(deadline);

    // in more than one week -> black
    // in one week or less -> orange
    // in two days or less -> red
    // overdue -> grey
    if (date.isBefore(dayjs(), "day")) {
      return "task-deadline--overdue";
    } else if (date.isBefore(dayjs().add(2, "day"), "day")) {
      return "task-deadline--red";
    } else if (date.isBefore(dayjs().add(7, "day"), "day")) {
      return "task-deadline--orange";
    } else {
      return "task-deadline--black";
    }
  };

  const getTextFromDeadline = (deadline) => {
    // e.g. -> Due in 2 weeks
    const date = dayjs(deadline);
    const relative = date.fromNow();
    if (date.isBefore(dayjs(), "day")) {
      const relativeOverdue = date.toNow();
      if (short) {
        return "overdue";
      } else {
        return `Overdue by ${relativeOverdue}`;
      }
    } else {
      if (short) {
        return relative?.replace("in ", "");
      } else {
        // Due in 2 weeks (20 apr 2024)
        return `Due in ${relative} (${date.format("DD MMM YYYY")})`;
      }
    }
  };

  return (
    <div className={`task-deadline ${getClassFromDeadline(deadline)}`}>
      <div className="task-deadline__icon">
        <Stopwatch />
      </div>
      <p>{getTextFromDeadline(deadline)}</p>
    </div>
  );
}
TaskDeadline.propTypes = {
  deadline: PropTypes.string.isRequired,
  short: PropTypes.bool,
};

export default TaskDeadline;
