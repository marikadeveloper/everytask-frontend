import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { Input, Select } from "../input/index";
import {
  taskImpactArray,
  taskImpactLabels,
  taskStatusArray,
  taskStatusLabels,
} from "../../utils/task";
import { useCategories } from "../../utils/category";
import { Button } from "../button/index";
import "./styles.scss";

const taskStatuses = taskStatusArray.map((status) => ({
  value: status,
  label: taskStatusLabels[status],
}));
const taskImpacts = taskImpactArray.map((impact) => ({
  value: impact,
  label: taskImpactLabels[impact],
}));

function TasksFilters({ onFiltersUpdated, isFiltering }) {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      status: "",
      categoryIds: [],
      containsText: "",
      impact: "",
    },
  });
  /**
   * supported filters:
   * - status
   * - categoryIds (array)
   * - containsText
   * - impact
   */
  const { categories } = useCategories();

  const onSubmit = (data) => {
    let { categoryIds } = data;
    if (
      data.categoryIds !== undefined &&
      typeof data.categoryIds === "string"
    ) {
      categoryIds = categoryIds.split(",");
    }
    onFiltersUpdated({ ...data, categoryIds });
  };

  const clearFilters = () => {
    reset();
    onFiltersUpdated({});
  };

  return (
    <div className="tasks-filters">
      <form id="filters-form" onSubmit={handleSubmit(onSubmit)}>
        {/* containsText=xx */}
        <Input
          placeholder="Search tasks"
          label="Search in title or description..."
          size="sm"
          {...register("containsText")}
        />
        {/* status=xx */}
        <Select
          placeholder="Filter by status"
          label="Status"
          items={taskStatuses}
          size="sm"
          {...register("status")}
        />
        {/* categoryIds[]=xx */}
        <Select
          selectionMode="multiple"
          placeholder="Filter by category"
          label="Category"
          itemKey="id"
          itemLabel="name"
          items={categories}
          size="sm"
          {...register("categoryIds")}
        />
        {/* impact=xx */}
        <Select
          placeholder="Filter by impact"
          label="Impact"
          items={taskImpacts}
          size="sm"
          {...register("impact")}
        />

        <Button type="submit" form="filters-form" isLoading={isFiltering}>
          Filter
        </Button>

        <Button type="button" onClick={clearFilters} variant="bordered">
          Clear
        </Button>
      </form>
    </div>
  );
}
TasksFilters.defaultProps = {
  isFiltering: false,
};
TasksFilters.propTypes = {
  onFiltersUpdated: PropTypes.func.isRequired,
  isFiltering: PropTypes.bool,
};

export default TasksFilters;
