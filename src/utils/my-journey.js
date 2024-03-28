import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useClient } from "../context/auth-context";

const statQueryConfig = {
  staleTime: 1000,
  cacheTime: 1000,
};

/**
 * Get the fastest task completion time for the current user
 * @returns {{ time: number, task: string }} data - The fastest task completion time
 */
function useMyFastestTaskCompletionTime() {
  const client = useClient();

  const config = {
    ...statQueryConfig,
    queryKey: ["my-fastest-task-completion-time"],
    queryFn: () => client("my-fastest-task-completion").then((res) => res.data),
  };

  const result = useQuery(config);
  return { data: result.data || {} };
}

/**
 * Get the most productive day for the current user
 * @returns {{ date: string, tasks: number }} data - The most productive day
 */
function useMyMostProductiveDay() {
  const client = useClient();

  const config = {
    ...statQueryConfig,
    queryKey: ["my-most-productive-day"],
    queryFn: () => client("my-most-productive-day").then((res) => res.data),
  };

  const result = useQuery(config);
  return { data: result.data || {} };
}

/**
 * Get the tasks by status for the current user
 * @returns {{ statusCount: { [STATUS]: number }, statusPercentage: { [STATUS]: string } }} - data - The tasks by status
 */
function useMyTasksByStatus() {
  const client = useClient();

  // setting for now this hardcoded computation period to last month
  const computationPeriodStart = dayjs()
    .subtract(1, "month")
    .startOf("day")
    .toISOString();

  const computationPeriodEnd = dayjs().endOf("day").toISOString();

  const config = {
    ...statQueryConfig,
    queryKey: ["my-tasks-by-status"],
    queryFn: () =>
      client("my-tasks-by-status", {
        data: {
          computationPeriodStart,
          computationPeriodEnd,
        },
      }).then((res) => res.data),
  };

  const result = useQuery(config);
  return { data: result.data || {} };
}

/**
 * Get the tasks by impact for the current user
 * @returns {{ impactCount: { [IMPACT]: number }, impactPercentage: { [IMPACT]: string } }} - data - The tasks by impact
 */
function useMyTasksByImpact() {
  const client = useClient();

  // setting for now this hardcoded computation period to last month
  const computationPeriodStart = dayjs()
    .subtract(1, "month")
    .startOf("day")
    .toISOString();

  const computationPeriodEnd = dayjs().endOf("day").toISOString();

  const config = {
    ...statQueryConfig,
    queryKey: ["my-tasks-by-impact"],
    queryFn: () =>
      client("my-tasks-by-impact", {
        data: {
          computationPeriodStart,
          computationPeriodEnd,
        },
      }).then((res) => res.data),
  };

  const result = useQuery(config);
  return { data: result.data || {} };
}

/**
 * Get the tasks by category for the current user
 * @returns {{ categoryCount: { [CATEGORY]: number }, categoryPercentage: { [CATEGORY]: string } }} - data - The tasks by category
 */
function useMyTasksByCategory() {
  const client = useClient();

  // setting for now this hardcoded computation period to last month
  const computationPeriodStart = dayjs()
    .subtract(1, "month")
    .startOf("day")
    .toISOString();

  const computationPeriodEnd = dayjs().endOf("day").toISOString();

  const config = {
    ...statQueryConfig,
    queryKey: ["my-tasks-by-category"],
    queryFn: () =>
      client("my-tasks-by-category", {
        data: {
          computationPeriodStart,
          computationPeriodEnd,
        },
      }).then((res) => res.data),
  };

  const result = useQuery(config);
  return { data: result.data || {} };
}

export {
  useMyFastestTaskCompletionTime,
  useMyMostProductiveDay,
  useMyTasksByStatus,
  useMyTasksByImpact,
  useMyTasksByCategory,
};
