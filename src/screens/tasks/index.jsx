import { useEffect, useState } from "react";
import Kanban from "../../components/kanban";
import TaskCreateEditModal from "../../components/task-create-edit-modal";
import TasksFilters from "../../components/tasks-filters/index";
import { useTasks, useUpdateTask } from "../../utils/task";
import "./styles.scss";

function TasksScreen() {
  const { mutate } = useUpdateTask();
  const [filters, setFilters] = useState();
  const { tasks, refetch, isPending, dataUpdatedAt } = useTasks(filters);

  useEffect(() => {
    refetch();
  }, [refetch, filters]);

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

  const onFiltersUpdated = (newFilters) => {
    // fetch tasks with filters
    setFilters(newFilters);
  };

  return (
    <div className="layout tasks">
      <header className="tasks__header">
        <h1>My Tasks</h1>
        <TaskCreateEditModal />
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
        <Kanban
          key={dataUpdatedAt}
          tasks={tasks}
          onTaskUpdate={onTaskStatusUpdate}
        />
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
