import { useMutation, useQuery } from "@tanstack/react-query";
import { useClient } from "../context/auth-context";
import { queryCache } from "./api-client";

// TODO: test this

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

const defaultMutationOptions = {
  onError: (err, variables, recover) =>
    typeof recover === "function" ? recover() : null,
  onSettled: () => queryCache.remove("me"),
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

function onUpdateMutation(newMe) {
  const oldMe = queryCache.getQueryData("me");

  queryCache.setQueryData("me", (old) => ({
    ...old,
    ...newMe,
  }));

  return () => queryCache.setQueryData("me", oldMe);
}

function useUpdateUser(options) {
  const client = useClient();

  return useMutation(
    (updates) =>
      client("me", {
        method: "PUT",
        data: updates,
      }),
    {
      onMutate: onUpdateMutation,
      ...defaultMutationOptions,
      ...options,
    },
  );
}

export { useUpdateUser, useUser };
