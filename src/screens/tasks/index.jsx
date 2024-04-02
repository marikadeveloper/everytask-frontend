import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Kanban from "../../components/kanban";
import TaskCreateEditModal from "../../components/task-create-edit-modal";
import TasksFilters from "../../components/tasks-filters";
import { useTasks, useUpdateTask } from "../../utils/task";
import { Calendar as CalendarIcon } from "../../assets/icons";
import Calendar from "../../components/calendar";
import { Button } from "../../components/button";
import "./styles.scss";

const TaskView = {
  KANBAN: "kanban",
  CALENDAR: "calendar",
};

function TasksScreen() {
  const { mutate } = useUpdateTask();
  const [filters, setFilters] = useState();
  const [view, setView] = useState(TaskView.KANBAN);
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

  const toggleView = () => {
    setView((currentView) =>
      currentView === TaskView.KANBAN ? TaskView.CALENDAR : TaskView.KANBAN,
    );
  };

  return (
    <div className="layout tasks">
      <header className="tasks__header">
        <h1>My Tasks</h1>
        <div className="tasks__header__actions">
          <TaskCreateEditModal />
          <Button
            as={Link}
            className="link-button"
            color="primary"
            size="lg"
            to="/categories"
            variant="bordered"
          >
            Manage Categories
          </Button>
        </div>
      </header>
      <section className="tasks__filters">
        <TasksFilters
          onFiltersUpdated={onFiltersUpdated}
          isFiltering={isPending}
        />
      </section>
      <div className="tasks__switch-view">
        <Button
          color="primary"
          variant="bordered"
          className="link-button"
          startContent={<CalendarIcon />}
          onClick={toggleView}
        >
          {view === TaskView.CALENDAR ? "Kanban" : "Calendar"} view
        </Button>
      </div>
      <section>
        {view === TaskView.KANBAN && (
          <Kanban
            key={dataUpdatedAt}
            tasks={tasks}
            onTaskUpdate={onTaskStatusUpdate}
          />
        )}
        {view === TaskView.CALENDAR && <Calendar tasks={tasks} />}
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
