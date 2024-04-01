import React from "react";
import {
  TASK_STATUS,
  taskStatusArray,
  taskStatusLabels,
} from "../../utils/task.js";
import { Select } from "../input/index.jsx";
import TaskDeadline from "../task-deadline/index.jsx";
import TaskImpactChip from "../task-impact-chip/index.jsx";
import "./styles.scss";

function UpcomingTask({ task }) {
  const upcomingTask = {
    title: "Airplane check-in",
    status: "TODO",
    dueDate: "2024-04-04T17:33:26.326Z",
    impact: "MEDIUM",
  };

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

  return (
    <div className="upcoming-task">
      <div className="upcoming-task__header">
        <TaskImpactChip impact="HIGH_IMPACT_HIGH_EFFORT" iconOnly={true} />
        <TaskDeadline
          deadline={upcomingTask.dueDate}
          short={true}
          isDone={upcomingTask.status === TASK_STATUS.DONE}
        />
      </div>
      <p className="upcoming-task__title">{upcomingTask.title}</p>
      <Select
        className="upcoming-task__status"
        label="Status"
        items={taskStatuses}
        defaultSelectedKeys={[upcomingTask.status]}
        color={getStatusColor(upcomingTask.status)}
        variant="flat"
        size="sm"
      />
    </div>
  );
}

export default UpcomingTask;
