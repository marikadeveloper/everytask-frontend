import { useMutation, useQuery } from "@tanstack/react-query";
import { useClient } from "../context/auth-context";

/**
 * /tasks response - 7/03/2024
 *
 * {
   "data": [
     {
       "id": "c26e3305-7913-4d9c-aad9-6a48ab6ba6e6",
       "emoji": null,
       "title": "Task 2",
       "description": null,
       "status": "TODO",
       "dueDate": "2024-03-30T20:52:26.326Z",
       "createdAt": "2024-03-07T15:29:19.586Z",
       "categoryId": null,
       "userId": "d1fffe0a-2e6d-458c-b976-ca14ef67bc3d",
       "impact": "LOW_IMPACT_LOW_EFFORT",
       "checklistItems": []
     },
     {
       "id": "655299d2-cae6-470b-a66f-d85ddc989f23",
       "emoji": "👻",
       "title": "Task cambiato",
       "description": null,
       "status": "TODO",
       "dueDate": "2024-03-10T20:52:26.326Z",
       "createdAt": "2024-03-01T20:53:14.505Z",
       "categoryId": null,
       "userId": "d1fffe0a-2e6d-458c-b976-ca14ef67bc3d",
       "impact": "HIGH_IMPACT_LOW_EFFORT",
       "checklistItems": [
         {
         "id": "b4ca649a-10b7-471d-8e3b-92bd119574aa",
         "title": "Checklist item 1",
         "completed": false,
         "order": 0,
         "taskId": "655299d2-cae6-470b-a66f-d85ddc989f23"
         },
         {
         "id": "1ab30587-8afc-465c-a310-891bb8892858",
         "title": "Checklist item 2",
         "completed": false,
         "order": 1,
         "taskId": "655299d2-cae6-470b-a66f-d85ddc989f23"
         }
       ]
     }
   ]
 }
 */
const taskQueryConfig = {
  staleTime: 1000,
  cacheTime: 1000,
};

function getFilterStringFromFilterObject(filters) {
  console.log("getFilterStringFromFilterObject", filters);
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

const defaultMutationOptions = {
  onError: (err, variables, recover) =>
    typeof recover === "function" ? recover() : null,
  onSettled: () => {
    // queryClient.invalidateQueries("tasks");
  },
};

// Update task
function useUpdateTask(options) {
  const client = useClient();

  const config = {
    mutationFn: ({ id, ...updates }) =>
      client(`tasks/${id}`, {
        method: "PUT",
        data: updates,
      }),
  };

  return useMutation(config);
}

export { useTask, useTasks, useUpdateTask };
