import "./styles.scss";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from "prop-types";
import { ResponsivePie } from "@nivo/pie";
import { useMemo } from "react";
import { ResponsiveBar } from "@nivo/bar";
import { ResponsiveCalendar } from "@nivo/calendar";
import { ResponsiveHeatMap } from "@nivo/heatmap";
import { Progress } from "@nextui-org/react";
import {
  useMyAverageCompletionTimesByImpact,
  useMyBadges,
  useMyFastestTaskCompletionTime,
  useMyMostBusyTimes,
  useMyMostProductiveDay,
  useMyStreak,
  useMyTaskCompletionCalendar,
  useMyTasksByCategory,
  useMyTasksByImpact,
  useMyTasksByStatus,
} from "../../utils/my-journey";
import {
  TASK_IMPACT,
  taskImpactLabels,
  taskStatusLabels,
} from "../../utils/task";
import { useAuth } from "../../context/auth-context";
import Badge from "../../components/badge/index.jsx";

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

function LoadingTile() {
  return (
    <div className="simple-tile loading">
      <h4>Loading...</h4>
    </div>
  );
}

function MyFastestTaskCompletionTimeTile() {
  const { data, isPending } = useMyFastestTaskCompletionTime();

  const formattedValue = data?.time
    ? dayjs.duration(data.time, "minutes").humanize()
    : "No data";

  if (isPending) {
    return <LoadingTile />;
  }

  return (
    <MyJourneySimpleTile
      title="Fastest Task Completion"
      description="Fastest time to complete a task"
      value={formattedValue}
    />
  );
}

function MyMostProductiveDayTile() {
  const { data, isPending } = useMyMostProductiveDay();

  const formattedValue = useMemo(() => {
    if (!data?.date) return "No data";
    return `${dayjs(data.date).format("MMMM D, YYYY")} (${data.tasks} tasks)`;
  }, [data]);

  if (isPending) {
    return <LoadingTile />;
  }

  return (
    <MyJourneySimpleTile
      title="Most Productive Day"
      description="Most tasks completed in a day"
      value={formattedValue}
    />
  );
}

function MyTasksByStatusTile() {
  const { data, isPending } = useMyTasksByStatus();

  const formattedData = useMemo(() => {
    if (!data?.statusPercentage) return [];

    return Object.entries(data.statusPercentage).map(([status, count]) => ({
      id: taskStatusLabels[status],
      label: taskStatusLabels[status],
      value: count,
    }));
  }, [data]);

  if (isPending) {
    return <LoadingTile />;
  }

  if (!formattedData?.length) {
    return <MyJourneySimpleTile title="Tasks by Status (%)" value="No data" />;
  }

  return (
    <div className="pie-chart-tile tasks-by-status">
      <h4>Tasks by Status (%)</h4>
      <ResponsivePie
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        animate={false}
        data={formattedData}
        colors={chartsColorScheme}
      />
    </div>
  );
}

function MyTasksByImpactTile() {
  const { data, isPending } = useMyTasksByImpact();

  const formattedData = useMemo(() => {
    if (!data?.impactPercentage) return [];

    return Object.entries(data.impactPercentage).map(([impact, count]) => ({
      id: taskImpactLabels[impact],
      label: taskImpactLabels[impact],
      value: count,
    }));
  }, [data]);

  if (isPending) {
    return <LoadingTile />;
  }

  if (!formattedData?.length) {
    return <MyJourneySimpleTile title="Tasks by Impact (%)" value="No data" />;
  }

  return (
    <div className="pie-chart-tile tasks-by-impact">
      <h4>Tasks by Impact (%)</h4>
      <ResponsivePie
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        animate={false}
        data={formattedData}
        colors={chartsColorScheme}
      />
    </div>
  );
}

function MyTasksByCategory() {
  const { data, isPending } = useMyTasksByCategory();

  const formattedData = useMemo(() => {
    if (!data?.categoryPercentage) return [];

    return Object.entries(data.categoryPercentage).map(([category, count]) => ({
      id: category,
      label: category,
      value: count,
    }));
  }, [data]);

  if (isPending) {
    return <LoadingTile />;
  }

  if (!formattedData?.length) {
    return (
      <MyJourneySimpleTile title="Tasks by Category (%)" value="No data" />
    );
  }

  return (
    <div className="pie-chart-tile tasks-by-category">
      <h4>Tasks by Category (%)</h4>
      <ResponsivePie
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        animate={false}
        data={formattedData}
        colors={chartsColorScheme}
      />
    </div>
  );
}

function MyTaskCompletionCalendar() {
  const { data, isPending } = useMyTaskCompletionCalendar();
  const { calendar, from, to } = data;

  if (isPending) {
    return <LoadingTile />;
  }

  if (!calendar) {
    return (
      <MyJourneySimpleTile title="Task Completion Calendar" value="No data" />
    );
  }

  return (
    <div className="simple-tile calendar-tile">
      <h4>Task Completion Calendar</h4>
      <ResponsiveCalendar
        animate={false}
        data={calendar || []}
        from={from}
        to={to}
        emptyColor="#eeeeee"
        margin={{ bottom: 30 }}
      />
    </div>
  );
}

function MyMostBusyTimes() {
  const { data, isPending } = useMyMostBusyTimes();

  if (isPending) {
    return <LoadingTile />;
  }

  return (
    <div className="simple-tile most-busy-times">
      <h4>Most Busy Times</h4>
      <ResponsiveHeatMap
        animate={false}
        axisTop={{
          tickRotation: -90,
        }}
        margin={{ top: 50, right: 0, bottom: 0, left: 30 }}
        data={data}
        colors={{
          type: "diverging",
          scheme: "greens",
        }}
      />
    </div>
  );
}

function MyAverageCompletionTimesByImpact() {
  const { data, isPending } = useMyAverageCompletionTimesByImpact();

  const formattedData = useMemo(() => {
    if (!data) return [];

    return Object.entries(data).map(([impact, avgTime]) => ({
      impact: taskImpactLabels[impact],
      [impact]: avgTime,
    }));
  }, [data]);

  if (isPending) {
    return <LoadingTile />;
  }

  if (!formattedData?.length) {
    return (
      <MyJourneySimpleTile
        title="Average Completion Times by Impact"
        value="No data"
      />
    );
  }

  return (
    <div className="bar-chart-tile average-completion-times-by-impact">
      <h4>Average Completion Times by Impact (minutes)</h4>
      <ResponsiveBar
        animate={false}
        data={formattedData}
        keys={[
          TASK_IMPACT.HIGH_IMPACT_HIGH_EFFORT,
          TASK_IMPACT.HIGH_IMPACT_LOW_EFFORT,
          TASK_IMPACT.LOW_IMPACT_HIGH_EFFORT,
          TASK_IMPACT.LOW_IMPACT_LOW_EFFORT,
        ]}
        indexBy="impact"
        margin={{ bottom: 30 }}
        padding={0.3}
        colors={chartsColorScheme}
      />
    </div>
  );
}

function MyLevelTile() {
  const { user } = useAuth();

  return (
    <div className="simple-tile level-tile">
      <h4>My Mastery Level</h4>
      <Progress
        label={user.level.name}
        size="md"
        value={user.points}
        maxValue={user.points + user.level.pointsToNextLevel}
        color="secondary"
        showValueLabel
      />
    </div>
  );
}

function MyStreakTile() {
  const { data, isPending } = useMyStreak();

  const { startDate, current, longest } = data;

  if (isPending) {
    return <LoadingTile />;
  }

  if (!current && !longest) {
    return <MyJourneySimpleTile title="Current Streak" value="No data" />;
  }

  return (
    <div className="simple-tile streak-tile">
      <h4>Current Streak</h4>
      <p>Longest Streak: {longest} day(s)</p>
      <p className="font-weight-medium simple-tile__value">
        {current} day(s)
        {!!startDate && (
          <span> (since {dayjs(startDate).format("MMMM D, YYYY")})</span>
        )}
      </p>
    </div>
  );
}

function MyBadges() {
  const { data, isPending } = useMyBadges();

  if (isPending) {
    return <LoadingTile />;
  }

  const { myBadges, allBadges } = data;
  return (
    <div className="simple-tile badges-tile">
      <h4>My Badges</h4>
      <div className="badges-tile__badges">
        {allBadges?.map((badge) => (
          <div className="badges-tile__badges__badge" key={badge.code}>
            <Badge
              badge={badge}
              earnedAt={
                myBadges?.find((myBadge) => myBadge.badge.code === badge.code)
                  ?.earnedAt
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function MyJourneyScreen() {
  return (
    <div className="layout my-journey">
      <h1>My Journey</h1>
      <section className="my-journey__content">
        <h2>My Epic Achievements</h2>
        <div className="my-journey__content__row">
          {/* User level */}
          <MyLevelTile />
          {/* My streak */}
          <MyStreakTile />
          {/* My badges */}
          <MyBadges />
        </div>
      </section>
      <section className="my-journey__content">
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
          {/* Task completion calendar like G.Hub */}
          <MyTaskCompletionCalendar />
        </div>
        <div className="my-journey__content__row">
          {/* Most busy times heatmap */}
          <MyMostBusyTimes />
          {/* Average completion times by impact */}
          <MyAverageCompletionTimesByImpact />
        </div>
      </section>
    </div>
  );
}

export default MyJourneyScreen;
