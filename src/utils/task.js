import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useClient } from "../context/auth-context";
import {
  CelebrationEvent,
  useCelebrationContext,
} from "../context/celebration-context";
import dayjs from "dayjs";

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
const taskStatusLabels = {
  [TASK_STATUS.DONE]: "Done",
  [TASK_STATUS.IN_PROGRESS]: "In progress",
  [TASK_STATUS.TODO]: "To do",
};
const taskStatusesForSelect = taskStatusArray.map((status) => ({
  value: status,
  label: taskStatusLabels[status],
}));

const TASK_IMPACT = {
  HIGH_IMPACT_HIGH_EFFORT: "HIGH_IMPACT_HIGH_EFFORT",
  HIGH_IMPACT_LOW_EFFORT: "HIGH_IMPACT_LOW_EFFORT",
  LOW_IMPACT_HIGH_EFFORT: "LOW_IMPACT_HIGH_EFFORT",
  LOW_IMPACT_LOW_EFFORT: "LOW_IMPACT_LOW_EFFORT",
};
const taskImpactArray = Object.values(TASK_IMPACT);
const taskImpactLabels = {
  [TASK_IMPACT.HIGH_IMPACT_HIGH_EFFORT]: "High impact, high effort",
  [TASK_IMPACT.HIGH_IMPACT_LOW_EFFORT]: "High impact, low effort",
  [TASK_IMPACT.LOW_IMPACT_HIGH_EFFORT]: "Low impact, high effort",
  [TASK_IMPACT.LOW_IMPACT_LOW_EFFORT]: "Low impact, low effort",
};
const taskImpactsForSelect = taskImpactArray.map((impact) => ({
  value: impact,
  label: taskImpactLabels[impact],
}));

// Get tasks
function useTasks(filters) {
  const client = useClient();

  const config = {
    ...taskQueryConfig,
    queryKey: ["tasks"],
    queryFn: () =>
      client(`tasks`, { data: { ...filters } }).then((res) => res.data),
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
  const queryClient = useQueryClient();

  const now = dayjs().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");

  return useMutation({
    mutationFn: (newTask) =>
      client(`task`, {
        data: {
          ...newTask,
          updatedAt: now,
        },
        method: "POST",
      }),
    onSettled: () => {
      queryClient.invalidateQueries("tasks");
    },
  });
}

// Update task
function useUpdateTask() {
  const client = useClient();
  const queryClient = useQueryClient();
  const { triggerEvent } = useCelebrationContext();

  // now should be a string like this: "2024-04-30T11:48:37.XXXZ"
  const now = dayjs().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");

  return useMutation({
    mutationFn: ({ id, ...updates }) =>
      client(`tasks/${id}`, {
        method: "PUT",
        data: {
          ...updates,
          updatedAt: now,
        },
      }),
    onSettled: () => {
      queryClient.invalidateQueries(["tasks", "task"]);
    },
    onSuccess: ({ data }) => {
      /**
       * example data:
       * {
       *     "data": {
       *         "task": {
       *             "id": "f41f391e-f415-4704-b525-29265d1cba77",
       *             "emoji": "1f338",
       *             "title": "Garden beautification",
       *             "description": "Do it and you will not regret it!",
       *             "status": "IN_PROGRESS",
       *             "dueDate": "2024-04-30T11:48:37.317Z",
       *             "createdAt": "2024-03-26T12:49:06.092Z",
       *             "categoryId": "c2fea52b-cef9-4f0f-a1ac-0fe766c40e6d",
       *             "userId": "d1fffe0a-2e6d-458c-b976-ca14ef67bc3d",
       *             "impact": "HIGH_IMPACT_HIGH_EFFORT",
       *             "relativeOrder": 0,
       *             "firstCompletedAt": null,
       *             "checklistItems": [],
       *             "category": {
       *                 "id": "c2fea52b-cef9-4f0f-a1ac-0fe766c40e6d",
       *                 "name": "home"
       *             }
       *         },
       *         "badges": [],
       *         "pointsAwarded": 0,
       *         "levelUp": null,
       *         "streak": {
       *           id: string
       *           startDate: Date
       *           updatedAt: Date
       *           current: number
       *           longest: number
       *           userId: string
       *         }
       *     }
       * }
       */
      if (data.pointsAwarded) {
        triggerEvent({
          type: CelebrationEvent.Points,
          value: { points: data.pointsAwarded },
        });
      }
      if (data.levelUp) {
        triggerEvent({
          type: CelebrationEvent.LevelUp,
          value: { levelUp: data.levelUp },
        });
        queryClient.invalidateQueries("me");
      }
      if (data.badges?.length > 0) {
        triggerEvent({
          type: CelebrationEvent.Badges,
          value: { badges: data.badges },
        });
      }
      if (data.streak) {
        triggerEvent({
          type: CelebrationEvent.Streak,
          value: { streak: data.streak },
        });
      }
    },
  });
}

function useDeleteTask(taskId) {
  const client = useClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => client(`tasks/${taskId}`, { method: "DELETE" }),
    onSettled: () => {
      queryClient.invalidateQueries("tasks");
    },
  });
}

function useDashboardTasks() {
  const client = useClient();

  const now = dayjs().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");

  const config = {
    ...taskQueryConfig,
    queryKey: ["dashboard-tasks"],
    queryFn: () => client(`dashboard-tasks/${now}`, {}).then((res) => res.data),
  };

  return useQuery(config);
}

export {
  TASK_IMPACT,
  TASK_STATUS,
  taskImpactArray,
  taskImpactLabels,
  taskStatusArray,
  taskStatusLabels,
  taskStatusesForSelect,
  taskImpactsForSelect,
  useCreateTask,
  useTask,
  useTasks,
  useUpdateTask,
  useDashboardTasks,
  useDeleteTask,
};
