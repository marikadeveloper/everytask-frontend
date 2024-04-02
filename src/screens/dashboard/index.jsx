import { Button } from "@nextui-org/react";
import { Link } from "react-router-dom";
import TaskCreateEditModal from "../../components/task-create-edit-modal";
import DashboardUpcomingTask from "../../components/dashboard-upcoming-task";
import DashboardDueTodayTask from "../../components/dashboard-due-today-task";
import { useDashboardTasks } from "../../utils/task";
import { useAuth } from "../../context/auth-context";
import "./styles.scss";

function DashboardScreen() {
  const { user } = useAuth();
  const { data } = useDashboardTasks();

  return (
    <div className="layout dashboard">
      <div className="dashboard__header">
        <h1>{user?.name ? `Hello, ${user.name}` : "Hello"}</h1>
        <TaskCreateEditModal />
      </div>
      <div className="dashboard__content">
        <h2>Due today</h2>
        <div className="dashboard__content__due-today">
          {!!data?.dueTodayOrOverdue?.length &&
            data.dueTodayOrOverdue.map((task) => (
              <DashboardDueTodayTask key={task.id} task={task} />
            ))}
          {!data?.dueTodayOrOverdue?.length && <p>No tasks due today</p>}
        </div>
        <div className="dashboard__content__upcoming-tasks-header">
          <h2>Upcoming tasks</h2>
          <Button
            as={Link}
            className="link-button"
            color="primary"
            size="md"
            to="/tasks"
            variant="bordered"
          >
            See all tasks
          </Button>
        </div>
        <div className="dashboard__content__upcoming-tasks-grid">
          {!!data?.upcomingTasks?.length &&
            data.upcomingTasks.map((task) => (
              <DashboardUpcomingTask key={task.id} task={task} />
            ))}
          {!data?.upcomingTasks?.length && <p>No upcoming tasks</p>}
        </div>
      </div>
    </div>
  );
}

export default DashboardScreen;
