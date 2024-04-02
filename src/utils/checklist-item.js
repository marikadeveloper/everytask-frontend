import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useClient } from "../context/auth-context";

function useCreateChecklistItem() {
  const client = useClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newItem) =>
      client(`checklist-items`, {
        method: "POST",
        data: newItem,
      }),
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries("task", [data.taskId]);
    },
  });
}

function useUpdateChecklistItem() {
  const client = useClient();

  return useMutation({
    mutationFn: ({ id, ...updates }) =>
      client(`checklist-items/${id}`, {
        method: "PUT",
        data: updates,
      }),
  });
}

function useDeleteChecklistItem() {
  const client = useClient();

  return useMutation({
    mutationFn: ({ id, taskId }) =>
      client(`checklist-items/${id}`, { method: "DELETE", data: { taskId } }),
  });
}

export {
  useCreateChecklistItem,
  useUpdateChecklistItem,
  useDeleteChecklistItem,
};
