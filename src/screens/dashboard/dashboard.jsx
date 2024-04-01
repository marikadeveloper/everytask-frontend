import { Button } from "@nextui-org/react";
import { Link } from "react-router-dom";
import DueTodayTask from "../../components/due-today-task/index.jsx";
import TaskCreateEditModal from "../../components/task-create-edit-modal/index.jsx";
import UpcomingTask from "../../components/upcoming-task/index.jsx";
import { useUser } from "../../utils/user.js";

import "./styles.scss";

function DashboardScreen() {
  const user = useUser();

  return (
    <div className="layout dashboard">
      <div className="dashboard__header">
        <h1>Hello, {user.name}</h1>
        <TaskCreateEditModal />
      </div>
      <div className="dashboard__content">
        <h2>Due today</h2>
        <div className="dashboard__content__row-1">
          <DueTodayTask />
          <DueTodayTask />
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
        <div className="dashboard__content__row-2">
          <UpcomingTask />
          <UpcomingTask />
        </div>
      </div>
    </div>
  );
}

export default DashboardScreen;
