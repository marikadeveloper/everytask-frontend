import "./styles.scss";

function TaskStatusDot({ status }) {
  return <div className={`task-status-dot ${status}`}></div>;
}

export default TaskStatusDot;
