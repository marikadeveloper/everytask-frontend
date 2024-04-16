import { Accordion, AccordionItem } from "@nextui-org/react";
import PropTypes from "prop-types";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useCategories } from "../../utils/category";
import { useBreakpoint } from "../../utils/hooks";
import {
  taskImpactLabels,
  taskImpactsForSelect,
  taskStatusesForSelect,
} from "../../utils/task";
import { Button } from "../button/index";
import { Input, Select } from "../input/index";
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

  const { handleSubmit, reset, getValues, control, setValue } = useForm({
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
    } else if (!Array.isArray(data.categoryIds)) {
      categoryIds = [];
    }
    onFiltersUpdated({ ...data, categoryIds });
  };

  const [selectKey, setSelectKey] = useState(0);

  const clearFilters = () => {
    reset({
      status: undefined,
      categoryIds: [],
      containsText: "",
      impact: undefined,
    });
    setSelectKey((prevKey) => prevKey + 1);
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
            key={`status-${selectKey}`}
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
            key={`categoryIds-${selectKey}`}
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
            key={`impact-${selectKey}`}
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
          return `category "${Array.isArray(values[key]) ? values[key].map((id) => categories.find((c) => c.id === id).name).join(", ") : ""}"`;
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
