import { Emoji } from "emoji-picker-react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { FullPageErrorFallback } from "../../components/errors/index";
import { Select } from "../../components/input/index";
import { FullPageSpinner } from "../../components/spinner/index";
import TaskDeadline from "../../components/task-deadline/index";
import TaskImpactChip from "../../components/task-impact-chip/index";
import { useBreakpoint } from "../../utils/hooks";
import {
  TASK_STATUS,
  taskStatusArray,
  taskStatusLabels,
  useTask,
  useUpdateTask,
} from "../../utils/task";
import TaskChecklist from "../../components/task-checklist/index";
import "./styles.scss";

const smallScreenThreshold = 768;

const taskStatuses = taskStatusArray.map((status) => ({
  value: status,
  label: taskStatusLabels[status],
}));
const getStatusColor = (status) => {
  switch (status) {
    case "TODO":
      return undefined;
    case "IN_PROGRESS":
      return "secondary";
    case "DONE":
      return "success";
    default:
      return "default";
  }
};

function TaskScreen() {
  const isSmallScreen = useBreakpoint(smallScreenThreshold);
  const { register, watch } = useForm();
  const status = watch("status");
  const { taskId } = useParams();
  const {
    data: task,
    isPending: taskPending,
    error,
    isError,
  } = useTask(taskId);
  const { mutate } = useUpdateTask();

  useEffect(() => {
    if (status && task?.status !== status) {
      mutate({ id: taskId, status });
    }
  }, [mutate, status, task?.status, taskId]);

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
    <div className="layout task">
      <div className="task__title">{renderTitleAndEmoji()}</div>
      <section className="task__sub-header">
        <Select
          label="Status"
          items={taskStatuses}
          defaultSelectedKeys={[task.status]}
          color={getStatusColor(task.status)}
          variant="flat"
          size="sm"
          {...register("status")}
        />
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
    </div>
  );
}

export default TaskScreen;
