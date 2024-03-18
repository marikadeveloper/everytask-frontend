import "./styles.scss";
import PropTypes from "prop-types";

function TaskStatusDot({ status }) {
  return <div className={`task-status-dot ${status}`} />;
}
TaskStatusDot.propTypes = {
  status: PropTypes.string.isRequired,
};

export default TaskStatusDot;
