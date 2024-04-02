import { Emoji } from "emoji-picker-react";
import { useNavigate, useParams } from "react-router-dom";
import { FullPageErrorFallback } from "../../components/errors";
import { TaskStatusSelect } from "../../components/input";
import { FullPageSpinner } from "../../components/spinner";
import TaskDeadline from "../../components/task-deadline";
import TaskImpactChip from "../../components/task-impact-chip";
import { useBreakpoint } from "../../utils/hooks";
import { TASK_STATUS, useTask } from "../../utils/task";
import TaskChecklist from "../../components/task-checklist";
import TaskCreateEditModal from "../../components/task-create-edit-modal";
import TaskHistory from "../../components/task-history";
import { LinkButton } from "../../components/button";
import TaskDeleteModal from "../../components/task-delete-modal";
import "./styles.scss";

const smallScreenThreshold = 768;

function TaskScreen() {
  const isSmallScreen = useBreakpoint(smallScreenThreshold);
  const { taskId } = useParams();
  const {
    data: task,
    isPending: taskPending,
    error,
    isError,
  } = useTask(taskId);
  const navigate = useNavigate();

  const goToTasks = () => {
    // navigate to tasks
    navigate("/tasks");
  };

  const renderEmojis = () => {
    return (
      <>
        <div className="emoji-1">
          <Emoji unified={task.emoji} size={60} />
        </div>
        <div className="emoji-2">
          <Emoji unified={task.emoji} size={36} />
        </div>
        <div className="emoji-3">
          <Emoji unified={task.emoji} size={24} />
        </div>
      </>
    );
  };

  const renderTitleAndEmoji = () => {
    const title = <h1>{task.title}</h1>;
    if (task.emoji) {
      if (isSmallScreen) {
        return (
          <>
            <Emoji unified={task.emoji} size={24} />
            {title}
          </>
        );
      }
      return (
        <>
          <div className="task__title__emoji">{renderEmojis()}</div>
          {title}
        </>
      );
    }
    return title;
  };

  if (isError) {
    return <FullPageErrorFallback error={error} />;
  }

  if (taskPending) {
    return <FullPageSpinner />;
  }

  return (
    <div className={`layout task ${task.emoji ? "task--has-emoji" : ""}`}>
      <LinkButton to="/tasks" className="link-button">
        Back to tasks
      </LinkButton>
      <div className="task__title">
        {renderTitleAndEmoji()}
        <TaskCreateEditModal
          disabled={task.status === TASK_STATUS.DONE}
          task={task}
        />
      </div>
      <section className="task__sub-header">
        <TaskStatusSelect taskId={task.id} defaultStatus={task.status} />
        <TaskImpactChip impact={task.impact} />
        <TaskDeadline
          deadline={task.dueDate}
          short={false}
          isDone={task.status === TASK_STATUS.DONE}
        />
      </section>
      {!!task.category && (
        <section className="task__category">
          <p className="font-weight-medium">Category</p>
          <p>{task.category?.name}</p>
        </section>
      )}
      {!!task.description && (
        <section className="task__description">
          <p className="font-weight-medium">Description</p>
          <p>{task.description}</p>
        </section>
      )}
      <section className="task__checklist">
        <TaskChecklist
          readonly={task.status === TASK_STATUS.DONE}
          taskId={taskId}
          taskChecklistItems={task.checklistItems}
        />
      </section>
      <section className="task__history">
        <TaskHistory taskHistory={task.statusHistory} />
      </section>
      <section className="task__delete">
        <h2>Danger zone</h2>
        <TaskDeleteModal taskId={task.id} onTaskDeleted={goToTasks} />
      </section>
    </div>
  );
}

export default TaskScreen;
