import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useClient } from "../context/auth-context";

const categoryQueryConfig = {
  staleTime: 1000,
  cacheTime: 1000,
};

function useCategories() {
  const client = useClient();

  const config = {
    ...categoryQueryConfig,
    queryKey: ["categories"],
    queryFn: () => client("categories").then((res) => res.data),
  };

  const result = useQuery(config);
  return { categories: result.data || [] };
}

function useCreateCategory() {
  const client = useClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newCategory) => client(`categories`, { data: newCategory }),
    onSettled: () => {
      queryClient.invalidateQueries("categories");
    },
  });
}

function useUpdateCategory() {
  const client = useClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (category) =>
      client(`categories/${category.id}`, {
        method: "PUT",
        data: category,
      }),
    onSettled: () => {
      queryClient.invalidateQueries("categories");
    },
  });
}

function useDeleteCategory() {
  const client = useClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (categoryId) =>
      client(`categories/${categoryId}`, { method: "DELETE" }),
    onSettled: () => {
      // Invalidate categories query to refresh data after deletion
      queryClient.invalidateQueries("categories");
    },
  });
}

export {
  useCategories,
  useCreateCategory,
  useDeleteCategory,
  useUpdateCategory,
};
