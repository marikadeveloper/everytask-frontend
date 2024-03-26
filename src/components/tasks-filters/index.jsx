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
import { useEffect, useState } from "react";
import { Accordion, AccordionItem } from "@nextui-org/react";

const taskStatuses = taskStatusArray.map((status) => ({
  value: status,
  label: taskStatusLabels[status],
}));
const taskImpacts = taskImpactArray.map((impact) => ({
  value: impact,
  label: taskImpactLabels[impact],
}));

const filtersLabels = {
  status: "Status",
  categoryIds: "Category",
  containsText: "Text",
  impact: "Impact",
};

const smallScreenThreshold = 940;

function TasksFilters({ onFiltersUpdated, isFiltering }) {
  const [isSmallScreen, setIsSmallScreen] = useState(
    () => window.innerWidth <= smallScreenThreshold,
  );
  const { register, handleSubmit, reset, getValues } = useForm({
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

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= smallScreenThreshold);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
    // TODO: make reset work for select components
    reset();
    onFiltersUpdated({});
  };

  const renderForm = () => (
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
  );

  const getActiveFiltersString = () => {
    // return a string like "Filtering by: contains text "foo", status "done", category "work""
    const values = getValues();

    const activeFilters = Object.keys(values).filter((key) => {
      if (key === "categoryIds") {
        return values[key].length > 0;
      }
      return values[key];
    });

    if (activeFilters.length === 0) {
      return "No active filters";
    }
    return `Filtering by: ${activeFilters
      .map((key) => {
        if (key === "categoryIds") {
          return `category "${values[key].map((id) => categories.find((c) => c.id === id).name).join(", ")}"`;
        }
        return `${filtersLabels[key]} "${values[key]}"`;
      })
      .join(", ")}`;
  };

  return (
    <div className="tasks-filters">
      {isSmallScreen ? (
        <Accordion>
          <AccordionItem
            key="1"
            aria-label="Filters accordion"
            title="Filters"
            subtitle={getActiveFiltersString()}
          >
            {renderForm()}
          </AccordionItem>
        </Accordion>
      ) : (
        renderForm()
      )}
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
