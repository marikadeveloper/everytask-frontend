import { useMutation, useQuery } from "@tanstack/react-query";
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

  return useMutation({
    mutationFn: (newCategory) => client(`categories`, { data: newCategory }),
    onSettled: () => {
      client.invalidateQueries("categories");
    },
  });
}

function useUpdateCategory() {
  const client = useClient();

  return useMutation({
    mutationFn: (category) =>
      client(`categories/${category.id}`, { data: category }),
    onSettled: () => {
      client.invalidateQueries("categories");
    },
  });
}

// eslint-disable-next-line import/prefer-default-export
export { useCategories, useCreateCategory, useUpdateCategory };
