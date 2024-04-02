import PropTypes from "prop-types";
import { TaskStatusSelect } from "../input/index";
import TaskImpactChip from "../task-impact-chip";
import "./styles.scss";

function DashboardDueTodayTask({ task }) {
  return (
    <div className="due-today-task">
      <TaskStatusSelect defaultStatus={task.status} taskId={task.id} />
      <TaskImpactChip impact={task.impact} iconOnly />
      <p>{task.title}</p>
    </div>
  );
}
DashboardDueTodayTask.propTypes = {
  task: PropTypes.object.isRequired,
};

export default DashboardDueTodayTask;
