import { useEffect, useState } from "react";
import Kanban from "../../components/kanban";
import TaskCreateModal from "../../components/task-create-modal";
import { TASK_STATUS, useTasks, useUpdateTask } from "../../utils/task";
import { hurray } from "../../utils/misc";
import "./styles.scss";
import TasksFilters from "../../components/tasks-filters/index";

function TasksScreen() {
  // const { tasks, error, isLoading, isError, isSuccess } = useTasks();
  const { mutate, status: updateTaskStatus } = useUpdateTask();
  const [filters, setFilters] = useState();
  const { tasks, refetch, isPending } = useTasks(filters);

  useEffect(() => {
    if (updateTaskStatus === "success") {
      refetch();
    }
  }, [updateTaskStatus, refetch]);

  useEffect(() => {
    refetch();
  }, [refetch, filters]);

  const onTaskStatusUpdate = (task) => {
    if (task.status === TASK_STATUS.DONE) {
      // TODO: also show a quick toast showing the points (and badges, if any) earned
      hurray();
    }

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

  const onFiltersUpdated = (newFilters) => {
    // fetch tasks with filters
    setFilters(newFilters);
  };

  return (
    <div className="layout tasks">
      <header className="tasks__header">
        <h1>My Tasks</h1>
        <TaskCreateModal />
      </header>
      <section className="tasks__filters">
        <TasksFilters
          onFiltersUpdated={onFiltersUpdated}
          isFiltering={isPending}
        />
        {/* TODO: view choice */}
      </section>
      <section>
        {/* Kanban */}
        <Kanban tasks={tasks} onTaskUpdate={onTaskStatusUpdate} />
        {/* Empty state */}
        {tasks.length === 0 && (
          <div className="empty-state">
            <p>Wow, such emptiness! Maybe consider creating a task?</p>
          </div>
        )}
      </section>
    </div>
  );
}

export default TasksScreen;
