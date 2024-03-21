import { useMutation, useQuery } from "@tanstack/react-query";
import { useClient } from "../context/auth-context";

const userQueryConfig = {
  staleTime: 1000 * 60 * 60,
  cacheTime: 1000 * 60 * 60,
};

const loadingUser = {
  email: "loading email...",
  name: "loading name...",
  dateFormat: "loading dateFormat...",
  points: "loading points...",
  level: "loading level...",
};

function useUser() {
  const client = useClient();
  const { data } = useQuery({
    queryKey: ["me"],
    queryFn: () => client("me").then((res) => res.user),
    ...userQueryConfig,
  });
  return data ?? loadingUser;
}

function useUpdateUser() {
  const client = useClient();
  return useMutation({
    mutationFn: (updates) =>
      client(`me`, {
        method: "PUT",
        data: updates,
      }),
    onSettled: () => {
      client.invalidateQueries("me");
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
