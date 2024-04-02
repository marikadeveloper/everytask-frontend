import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useClient } from "../context/auth-context";

const userQueryConfig = {
  staleTime: 1000 * 60 * 60,
  cacheTime: 1000 * 60 * 60,
};

function useUser() {
  const client = useClient();
  const { data, isPending } = useQuery({
    queryKey: ["me"],
    queryFn: () => client("me").then((res) => res.user),
    ...userQueryConfig,
  });
  return { data, isPending };
}

function useUpdateUser() {
  const client = useClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (updates) =>
      client(`me`, {
        method: "PUT",
        data: updates,
      }),
    onSettled: () => {
      queryClient.invalidateQueries("me");
    },
  });
}

function useUpdatePassword() {
  const client = useClient();
  return useMutation({
    mutationFn: (updates) =>
      client(`change-password`, {
        method: "POST",
        data: updates,
      }),
  });
}

export { useUser, useUpdateUser, useUpdatePassword };
