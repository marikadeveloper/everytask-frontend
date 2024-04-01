import { Button } from "@nextui-org/react";
import { Link } from "react-router-dom";
import TaskCreateEditModal from "../../components/task-create-edit-modal/index.jsx";
import { useUser } from "../../utils/user.js";

import "./styles.scss";

function DashboardScreen() {
  const user = useUser();

  function DueTodayTask1() {
    return <div className="simple-tile-1 due-today-task"></div>;
  }

  function DueTodayTask2() {
    return <div className="simple-tile-1 due-today-task"></div>;
  }

  function UpcomingTask1() {
    return <div className="simple-tile-2 upcoming-task"></div>;
  }

  function UpcomingTask2() {
    return <div className="simple-tile-2 upcoming-task"></div>;
  }

  return (
    <div className="layout dashboard">
      <div className="dashboard__header">
        <h1>Hello, {user.name}</h1>
        <TaskCreateEditModal />
      </div>
      <div className="dashboard__content">
        <h2>Due today</h2>
        <div className="dashboard__content__row">
          <DueTodayTask1 />
          <DueTodayTask2 />
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
        <div className="dashboard__content__row">
          <UpcomingTask1 />
          <UpcomingTask2 />
        </div>
      </div>
    </div>
  );
}

export default DashboardScreen;
