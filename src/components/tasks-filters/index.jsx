import PropTypes from "prop-types";
import { Controller, useForm } from "react-hook-form";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { Input, Select } from "../input/index";
import {
  taskImpactLabels,
  taskImpactsForSelect,
  taskStatusesForSelect,
} from "../../utils/task";
import { useCategories } from "../../utils/category";
import { Button } from "../button/index";
import { useBreakpoint } from "../../utils/hooks";
import "./styles.scss";

const filtersLabels = {
  status: "Status",
  categoryIds: "Category",
  containsText: "Text",
  impact: "Impact",
};

const smallScreenThreshold = 940;

function TasksFilters({ onFiltersUpdated, isFiltering }) {
  const isSmallScreen = useBreakpoint(smallScreenThreshold);

  const { handleSubmit, reset, getValues, control } = useForm({
    defaultValues: {
      status: undefined,
      categoryIds: [],
      containsText: "",
      impact: undefined,
    },
  });
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

  const renderForm = () => (
    <form id="filters-form" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="containsText"
        control={control}
        render={({ field }) => (
          <Input
            id="title"
            placeholder="Search tasks"
            label="Search in title or description..."
            size="sm"
            {...field}
          />
        )}
      />
      <Controller
        name="status"
        control={control}
        render={({ field }) => (
          <Select
            placeholder="Filter by status"
            label="Status"
            items={taskStatusesForSelect}
            size="sm"
            {...field}
          />
        )}
      />
      <Controller
        name="categoryIds"
        control={control}
        render={({ field }) => (
          <Select
            selectionMode="multiple"
            placeholder="Filter by category"
            label="Category"
            itemKey="id"
            itemLabel="name"
            items={categories}
            size="sm"
            {...field}
          />
        )}
      />
      <Controller
        name="impact"
        control={control}
        render={({ field }) => (
          <Select
            placeholder="Filter by impact"
            label="Impact"
            items={taskImpactsForSelect}
            size="sm"
            {...field}
          />
        )}
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
        if (key === "impact") {
          return `${filtersLabels[key]} "${taskImpactLabels[values[key]]}"`;
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
