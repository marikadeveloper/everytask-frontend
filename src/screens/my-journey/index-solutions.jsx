import "./styles.scss";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from "prop-types";
import { ResponsivePie } from "@nivo/pie";
import { useMemo } from "react";
import {
  useMyFastestTaskCompletionTime,
  useMyMostProductiveDay, useMyTasksByCategory,
  useMyTasksByImpact,
  useMyTasksByStatus,
} from "../../utils/my-journey";
import { taskImpactLabels, taskStatusLabels } from "../../utils/task";

dayjs.extend(duration);
dayjs.extend(relativeTime);

const chartsColorScheme = { scheme: "set3" };

function MyJourneySimpleTile({ title, description, value }) {
  return (
    <div className="simple-tile">
      <h4>{title}</h4>
      {!!description && <p>{description}</p>}
      <p className="font-weight-medium simple-tile__value">{value}</p>
    </div>
  );
}

MyJourneySimpleTile.defaultProps = {
  description: "",
};
MyJourneySimpleTile.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  value: PropTypes.string.isRequired,
};

function MyFastestTaskCompletionTimeTile() {
  const { data } = useMyFastestTaskCompletionTime();

  const formattedValue = data?.time
    ? dayjs.duration(data.time, "minutes").humanize()
    : "No data";

  return (
    <MyJourneySimpleTile
      title="Fastest Task Completion"
      description="Fastest time to complete a task"
      value={formattedValue}
    />
  );
}

function MyMostProductiveDayTile() {
  const { data } = useMyMostProductiveDay();

  const formattedValue = useMemo(() => {
    if (!data?.date) return "No data";
    return `${dayjs(data.date).format("MMMM D, YYYY")} (${data.tasks} tasks)`;
  }, [data]);

  return (
    <MyJourneySimpleTile
      title="Most Productive Day"
      description="Most tasks completed in a day"
      value={formattedValue}
    />
  );
}

function MyTasksByStatusTile() {
  const { data } = useMyTasksByStatus();

  const formattedData = useMemo(() => {
    if (!data?.statusPercentage) return [];

    return Object.entries(data.statusPercentage).map(([status, count]) => ({
      id: taskStatusLabels[status],
      label: taskStatusLabels[status],
      value: count,
    }));
  }, [data]);

  return (
    <div className="simple-tile tasks-by-status">
      <h4>Tasks by Status</h4>
      <ResponsivePie data={formattedData} colors={chartsColorScheme} />
    </div>
  );
}

function MyTasksByImpactTile() {
  const { data } = useMyTasksByImpact();

  const formattedData = useMemo(() => {
    if (!data?.impactPercentage) return [];

    return Object.entries(data.impactPercentage).map(([impact, count]) => ({
      id: taskImpactLabels[impact],
      label: taskImpactLabels[impact],
      value: count,
    }));
  }, [data]);

  return (
    <div className="simple-tile tasks-by-impact">
      <h4>Tasks by Impact</h4>
      <ResponsivePie data={formattedData} colors={chartsColorScheme} />
    </div>
  );
}

function MyTasksByCategory() {
  const { data } = useMyTasksByCategory();

  const formattedData = useMemo(() => {
    if (!data?.categoryPercentage) return [];

    return Object.entries(data.categoryPercentage).map(([category, count]) => ({
      id: category,
      label: category,
      value: count,
    }));
  }, [data]);

  return (
    <div className="simple-tile tasks-by-category">
      <h4>Tasks by Category</h4>
      <ResponsivePie data={formattedData} colors={chartsColorScheme} />
    </div>
  );
}

function MyJourneyScreen() {
  return (
    <div className="layout my-journey">
      <h1>My Journey</h1>
      <div className="my-journey__content">
        <h2>Task Activities</h2>
        <div className="my-journey__content__row">
          {/* Fastest Task Completion */}
          <MyFastestTaskCompletionTimeTile />
          {/* Most Productive Day */}
          <MyMostProductiveDayTile />
        </div>
        <div className="my-journey__content__row">
          {/* Tasks by Status */}
          <MyTasksByStatusTile />
          {/* Tasks by Impact */}
          <MyTasksByImpactTile />
        </div>
        <div className="my-journey__content__row">
          {/* Tasks by Category */}
          <MyTasksByCategory />
        </div>
      </div>
    </div>
  );
}

export default MyJourneyScreen;
