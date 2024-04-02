import "./styles.scss";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from "prop-types";
import { ResponsivePie } from "@nivo/pie";
import { useMemo } from "react";
import { ResponsiveCalendar } from "@nivo/calendar";
import { ResponsiveHeatMap } from "@nivo/heatmap";
import { Progress } from "@nextui-org/react";
import {
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
import { taskImpactLabels, taskStatusLabels } from "../../utils/task";
import { useAuth } from "../../context/auth-context";
import Badge from "../../components/badge/index";

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

  if (isPending) {
    return <LoadingTile />;
  }

  const formattedValue =
    data?.time !== undefined
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
        animate={false}
        data={formattedData}
        colors={chartsColorScheme}
        margin={{ top: 35, right: 20, bottom: 35, left: 20 }}
        innerRadius={0.4}
        padAngle={0.9}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.5]],
        }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsOffset={0}
        arcLinkLabelsDiagonalLength={16}
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
          from: "color",
          modifiers: [["darker", 2]],
        }}
        valueFormat=">-.0f"
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
        animate={false}
        data={formattedData}
        colors={chartsColorScheme}
        margin={{ top: 35, right: 20, bottom: 35, left: 20 }}
        innerRadius={0.4}
        padAngle={0.9}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.5]],
        }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsOffset={0}
        arcLinkLabelsDiagonalLength={16}
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
          from: "color",
          modifiers: [["darker", 2]],
        }}
        valueFormat=">-.0f"
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
        animate={false}
        data={formattedData}
        colors={chartsColorScheme}
        margin={{ top: 35, right: 20, bottom: 35, left: 20 }}
        innerRadius={0.4}
        padAngle={0.9}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.5]],
        }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsOffset={0}
        arcLinkLabelsDiagonalLength={16}
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
          from: "color",
          modifiers: [["darker", 2]],
        }}
        valueFormat=">-.0f"
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

  if (!calendar || !calendar.length) {
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
        align="top"
        emptyColor="#eeeeee"
        colors={["#D3EECD", "#97D494", "#2F984F", "#036429"]}
        minValue="auto"
        margin={{ top: 40, right: 20, bottom: 20, left: 20 }}
        yearSpacing={40}
        monthBorderColor="#ffffff"
        dayBorderWidth={2}
        dayBorderColor="#ffffff"
        legends={[
          {
            anchor: "bottom-right",
            direction: "row",
            translateY: 36,
            itemCount: 4,
            itemWidth: 42,
            itemHeight: 36,
            itemsSpacing: 14,
            itemDirection: "right-to-left",
          },
        ]}
      />
    </div>
  );
}

function MyMostBusyTimes() {
  const { data, isPending } = useMyMostBusyTimes();

  if (isPending) {
    return <LoadingTile />;
  }

  if (!data?.length) {
    return <MyJourneySimpleTile title="Most Busy Times" value="No data" />;
  }

  return (
    <div className="simple-tile most-busy-times">
      <h4>Most Busy Times</h4>
      <p>
        Your most busy hours and days based on the completed tasks count in each
        weekday
      </p>
      <ResponsiveHeatMap
        animate={false}
        data={data}
        margin={{ top: 50, right: 40, bottom: 60, left: 40 }}
        valueFormat=">-.0d"
        axisTop={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: -90,
          legend: "",
          legendOffset: 46,
          truncateTickAt: 0,
        }}
        axisRight={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          // legend: "days of the week",
          // legendPosition: "middle",
          // legendOffset: 70,
          truncateTickAt: 0,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          // legend: "days of the week",
          // legendPosition: "middle",
          // legendOffset: -72,
          truncateTickAt: 0,
        }}
        colors={{
          type: "diverging",
          scheme: "greens",
          divergeAt: 0.5,
          minValue: 0,
          maxValue: 10,
        }}
        emptyColor="#555555"
        legends={[
          {
            anchor: "bottom",
            translateX: 0,
            translateY: 30,
            length: 400,
            thickness: 8,
            direction: "row",
            tickPosition: "after",
            tickSize: 3,
            tickSpacing: 4,
            tickOverlap: false,
            tickFormat: ">-.2s",
            title: "Completed tasks →",
            titleAlign: "start",
            titleOffset: 4,
          },
        ]}
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
        </div>
      </section>
    </div>
  );
}

export default MyJourneyScreen;
