import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from "prop-types";
import { useMemo } from "react";
import { Stopwatch } from "../../assets/icons";
import "./styles.scss";

dayjs.extend(relativeTime);

const getClassFromDeadline = ({ deadline, isDone }) => {
  if (isDone) {
    return "task-deadline--done";
  }

  const date = dayjs(deadline);

  // in more than one week -> black
  // in one week or less -> orange
  // in two days or less -> red
  // overdue -> grey
  if (date.isBefore(dayjs(), "day")) {
    return "task-deadline--overdue";
  }

  if (date.isBefore(dayjs().add(2, "day"), "day")) {
    return "task-deadline--red";
  }

  if (date.isBefore(dayjs().add(7, "day"), "day")) {
    return "task-deadline--orange";
  }

  return "task-deadline--black";
};

const removeInAndAgo = (str) => {
  return str.replace(/^(in )|( ago)$/, "");
};

const getTextFromDeadline = ({ deadline, short, isDone }) => {
  const date = dayjs(deadline);
  if (isDone) {
    return date.format("DD MMM YYYY");
  }

  let relative = removeInAndAgo(date.fromNow());

  if (date.isBefore(dayjs())) {
    let relativeOverdue = removeInAndAgo(date.toNow());

    if (short) {
      return "overdue";
    }

    return `Overdue by ${relativeOverdue}`;
  }

  if (short) {
    return relative;
  }

  return `Due in ${relative} (${date.format("DD MMM YYYY")})`;
};

function TaskDeadline({ deadline, short = true, isDone }) {
  // deadline: 2024-03-30T20:52:26.326Z
  const deadlineClass = useMemo(() => {
    return getClassFromDeadline({ deadline, isDone });
  }, [deadline, isDone]);

  const deadlineText = useMemo(() => {
    return getTextFromDeadline({ deadline, short, isDone });
  }, [deadline, short, isDone]);

  return (
    <div className={`task-deadline ${deadlineClass}`}>
      <div className="task-deadline__icon">
        <Stopwatch />
      </div>
      <p>{deadlineText}</p>
    </div>
  );
}

TaskDeadline.defaultProps = {
  short: true,
  isDone: false,
};
TaskDeadline.propTypes = {
  deadline: PropTypes.string.isRequired,
  short: PropTypes.bool,
  isDone: PropTypes.bool,
};

export default TaskDeadline;
