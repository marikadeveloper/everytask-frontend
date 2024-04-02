import dayjs from "dayjs";
import PropTypes from "prop-types";
import { useAuth } from "../../context/auth-context";
import { taskStatusLabels } from "../../utils/task";
import "./styles.scss";

function TaskHistory({ taskHistory }) {
  const { user } = useAuth();
  // shows the task status history like a roadmap, from the most recent to the oldest status update
  /**
   * taskHistory:  [
   *   {
   *     "id": "8149d9d0-60da-4a40-b7f8-1fbfc5619276",
   *     "status": "IN_PROGRESS",
   *     "updatedAt": "2024-03-27T12:48:04.001Z",
   *     "taskId": "14183c6f-99f5-4993-a146-ba9a41b748a2"
   *   },
   *   {
   *     "id": "0ab30b99-e55a-43b4-8c3b-c49c22286a21",
   *     "status": "TODO",
   *     "updatedAt": "2024-03-27T12:47:04.164Z",
   *     "taskId": "14183c6f-99f5-4993-a146-ba9a41b748a2"
   *   },
   *   {
   *     "id": "c97201d3-9699-485c-8331-de7e1ffb92bd",
   *     "status": "IN_PROGRESS",
   *     "updatedAt": "2024-03-27T12:46:57.671Z",
   *     "taskId": "14183c6f-99f5-4993-a146-ba9a41b748a2"
   *   },
   *   {
   *     "id": "46d92677-96f8-4cc1-ad65-585f1d6797ea",
   *     "status": "TODO",
   *     "updatedAt": "2024-03-27T12:46:30.481Z",
   *     "taskId": "14183c6f-99f5-4993-a146-ba9a41b748a2"
   *   },
   *   {
   *     "id": "1ad033eb-56fb-44fa-b30c-27f4572c0184",
   *     "status": "IN_PROGRESS",
   *     "updatedAt": "2024-03-27T12:46:25.916Z",
   *     "taskId": "14183c6f-99f5-4993-a146-ba9a41b748a2"
   *   }
   * ]
   */

  return (
    <div className="task-history">
      <h2>Status history</h2>
      {/* empty state */}
      {taskHistory.length === 0 && <p>No status updates (yet)</p>}
      {/* list of task status history */}
      <div className="task-history__list">
        {taskHistory.map((task, i) => (
          <div
            key={task.id}
            className={`task-history__list__item ${i === 0 ? "font-weight-medium" : ""}`}
          >
            <span>
              {dayjs(task.updatedAt).format(`${user.dateFormat} h:mm a`)}
            </span>
            <span>{taskStatusLabels[task.status]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

TaskHistory.propTypes = {
  taskHistory: PropTypes.array.isRequired,
};
export default TaskHistory;
