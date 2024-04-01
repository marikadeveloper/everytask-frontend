import React from "react";
import {
  taskStatusArray,
  taskStatusLabels,
  useUpdateTask,
} from "../../utils/task.js";
import { Select } from "../input/index.jsx";
import TaskImpactChip from "../task-impact-chip/index.jsx";
import "./styles.scss";

function DueTodayTask({ task }) {
  const { mutate } = useUpdateTask();
  const dueTodayTask = {
    title: "Da fare prima che Marika si svegli!",
    status: "IN_PROGRESS",
    impact: "HIGH",
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

  const statusColor = getStatusColor(status);

  return (
    <div className="due-today-task">
      <Select
        className="due-today-task__status"
        label="Status"
        items={taskStatuses}
        defaultSelectedKeys={[dueTodayTask.status]}
        color={getStatusColor(dueTodayTask.status)}
        variant="flat"
        size="sm"
      />
      <TaskImpactChip impact="HIGH_IMPACT_HIGH_EFFORT" iconOnly={true} />
      <p>{dueTodayTask.title}</p>
    </div>
  );
}

export default DueTodayTask;
