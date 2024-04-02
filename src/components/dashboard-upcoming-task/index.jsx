import PropTypes from "prop-types";
import { Emoji } from "emoji-picker-react";
import { TASK_STATUS } from "../../utils/task";
import { TaskStatusSelect } from "../input";
import TaskDeadline from "../task-deadline";
import TaskImpactChip from "../task-impact-chip";
import "./styles.scss";

function DashboardUpcomingTask({ task }) {
  return (
    <div className="upcoming-task">
      <div className="upcoming-task__header">
        <TaskImpactChip impact={task.impact} iconOnly />
        <TaskDeadline
          deadline={task.dueDate}
          isDone={task.status === TASK_STATUS.DONE}
          short
        />
      </div>
      <p className="upcoming-task__title">
        {task.emoji && <Emoji size={20} unified={task.emoji} />}
        {task.title}
      </p>
      <TaskStatusSelect
        className="upcoming-task__status"
        defaultStatus={task.status}
        taskId={task.id}
      />
    </div>
  );
}

DashboardUpcomingTask.propTypes = {
  task: PropTypes.object.isRequired,
};

export default DashboardUpcomingTask;
