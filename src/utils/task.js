import { useMutation, useQuery } from "@tanstack/react-query";
import { useClient } from "../context/auth-context";

const taskQueryConfig = {
  staleTime: 1000,
  cacheTime: 1000,
};

const TASK_STATUS = {
  DONE: "DONE",
  IN_PROGRESS: "IN_PROGRESS",
  TODO: "TODO",
};
const taskStatusArray = Object.values(TASK_STATUS);

const TASK_IMPACT = {
  HIGH_IMPACT_HIGH_EFFORT: "HIGH_IMPACT_HIGH_EFFORT",
  HIGH_IMPACT_LOW_EFFORT: "HIGH_IMPACT_LOW_EFFORT",
  LOW_IMPACT_HIGH_EFFORT: "LOW_IMPACT_HIGH_EFFORT",
  LOW_IMPACT_LOW_EFFORT: "LOW_IMPACT_LOW_EFFORT",
};
const taskImpactArray = Object.values(TASK_IMPACT);

function getFilterStringFromFilterObject(filters) {
  // console.log("getFilterStringFromFilterObject", filters);
  return "";
}

// Get tasks
function useTasks(filters) {
  const client = useClient();

  const filterString = getFilterStringFromFilterObject(filters);
  const config = {
    ...taskQueryConfig,
    queryKey: ["tasks", { filterString }],
    queryFn: () =>
      client("tasks", { data: { filters } }).then((res) => res.data),
  };

  const result = useQuery(config);
  return { ...result, tasks: result.data || [] };
}

// Get single task
function useTask(taskId) {
  const client = useClient();
  const config = {
    ...taskQueryConfig,
    queryKey: ["task", { taskId }],
    queryFn: () => client(`tasks/${taskId}`, {}).then((res) => res.data),
  };

  return useQuery(config);
}

// Create task
function useCreateTask() {
  const client = useClient();

  return useMutation({
    mutationFn: (newTask) => client(`tasks`, { data: newTask }),
    onSettled: () => {
      client.invalidateQueries("tasks");
    },
  });
}

// Update task
function useUpdateTask() {
  const client = useClient();

  return useMutation({
    mutationFn: ({ id, ...updates }) =>
      client(`tasks/${id}`, {
        method: "PUT",
        data: updates,
      }),
    onSettled: () => {
      client.invalidateQueries("tasks");
    },
  });
}

export {
  TASK_IMPACT,
  TASK_STATUS,
  taskImpactArray,
  taskStatusArray,
  useCreateTask,
  useTask,
  useTasks,
  useUpdateTask,
};
