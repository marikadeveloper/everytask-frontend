import { useEffect } from "react";
import Kanban from "../../components/kanban";
import TaskCreateModal from "../../components/task-create-modal";
import { useTasks, useUpdateTask } from "../../utils/task";
import "./styles.scss";

function TasksScreen() {
  // const { tasks, error, isLoading, isError, isSuccess } = useTasks();
  const { tasks, refetch } = useTasks();
  const { mutate, status } = useUpdateTask();

  useEffect(() => {
    if (status === "success") {
      refetch();
    }
  }, [status, refetch]);

  const onTaskStatusUpdate = (task) => {
    // update task
    mutate({
      id: task.id,
      status: task.status,
      relativeOrder: task.relativeOrder,
    });

    // optimistic update of status and relativeOrder (to avoid flickering)
    tasks.forEach((t) => {
      if (t.id === task.id) {
        // eslint-disable-next-line no-param-reassign
        t.status = task.status;
        // eslint-disable-next-line no-param-reassign
        t.relativeOrder = task.relativeOrder;
      }
    });
  };

  return (
    <div className="layout tasks">
      <header className="tasks__header">
        <h1>My Tasks</h1>
        <TaskCreateModal />
      </header>
      <section>{/* TODO: filters + view choice */}</section>
      <section>
        {/* Kanban */}
        <Kanban tasks={tasks} onTaskUpdate={onTaskStatusUpdate} />
      </section>
    </div>
  );
}

export default TasksScreen;
