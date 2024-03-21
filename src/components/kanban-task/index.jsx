import PropTypes from "prop-types";
import TaskImpactChip from "../task-impact-chip/index";
import TaskDeadline from "../task-deadline/index";
import { ListCircle } from "../../assets/icons/index";
import { TASK_STATUS } from "../../utils/task";
import "./styles.scss";
// eslint-disable-next-line import/order
import { Emoji } from "emoji-picker-react";

function KanbanTask({ task, provided, snapshot }) {
  return (
    <div
      className={`kanban-task kanban-task--${task.status}`}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      style={{
        backgroundColor: snapshot.isDragging ? "white" : "white",
        ...provided.draggableProps.style,
      }}
    >
      <p className="kanban-task__title">
        {task.emoji && (
          <div className="kanban-task__emoji">
            <Emoji size={20} lazyLoad unified={task.emoji} />
          </div>
        )}
        {task.title}
      </p>
      <div className="kanban-task__footer">
        <div>
          <TaskImpactChip impact={task.impact} iconOnly />
          <TaskDeadline
            deadline={task.dueDate}
            isDone={task.status === TASK_STATUS.DONE}
            short
          />
          {task.category && (
            <p className="kanban-task__footer__category">
              {task.category?.name}
            </p>
          )}
        </div>
        {!!task.checklistItems?.length && (
          <div className="kanban-task__footer__checklist">
            <ListCircle />
            <span>
              {task.checklistItems.filter((item) => item.completed).length}/
              {task.checklistItems.length}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

KanbanTask.propTypes = {
  task: PropTypes.object.isRequired,
  provided: PropTypes.object.isRequired,
  snapshot: PropTypes.object.isRequired,
};

export default KanbanTask;