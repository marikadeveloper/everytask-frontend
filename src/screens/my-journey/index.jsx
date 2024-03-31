import { ResponsiveCalendar } from "@nivo/calendar";
import { ResponsiveHeatMap } from "@nivo/heatmap";
import { ResponsivePie } from "@nivo/pie";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from "prop-types";
import { useMemo } from "react";
import {
  useMyFastestTaskCompletionTime,
  useMyMostBusyTimes,
  useMyMostProductiveDay,
  useMyTaskCompletionCalendar,
  useMyTasksByCategory,
  useMyTasksByImpact,
  useMyTasksByStatus,
} from "../../utils/my-journey";
import { taskImpactLabels, taskStatusLabels } from "../../utils/task";
import "./styles.scss";

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

/**
 * TODO: Alberto 1
 * implementa un Pie Chart
 * la variabile "data" ha questa struttura -> {
 *    "statusCount": {
 *      "DONE": 2,
 *      "TODO": 1
 *    },
 *    "statusPercentage": {
 *      "DONE": "66.67",
 *      "TODO": "33.33"
 *    }
 * }
 *
 * - crea una costante "formattedData" che mappa i valori di "data" in un array di oggetti con la seguente struttura:
 *  { id: string, label: string, value: string } dove "value" deve essere il valore in percentuale dello status
 *  l'array finale deve avere questa forma ad esempio:
 *  [
 *     {
 *         "id": "Done",
 *         "label": "Done",
 *         "value": "50.00"
 *     },
 *     {
 *         "id": "In progress",
 *         "label": "In progress",
 *         "value": "25.00"
 *     },
 *     {
 *         "id": "To do",
 *         "label": "To do",
 *         "value": "25.00"
 *     }
 * ]
 *
 * - per tradurre i valori di "status" in label usa la costante "taskStatusLabels", le cui chiavi sono i valori di "TASK_STATUS", ed i valori sono le etichette da mostrare
 * - usa "useMemo" per memoizare il risultato della formattazione, come dipendenze usa "data"
 * - usa il componente "ResponsivePie" con queste props: ( import { ResponsivePie } from "@nivo/pie"; )
 *   - data: formattedData
 *   - colors: chartsColorScheme
 *
 * se ti perdi, le soluzioni sono in index-solutions.jsx
 */
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
      <ResponsivePie
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
      />
    </div>
  );
}

/**
 * TODO: Alberto 2
 * fai la stessa cosa che hai fatto per "MyTasksByStatusTile" ma per "MyTasksByImpactTile"
 * la variabile "data" ha la struttura definita in un commento sopra la funzione "useMyTasksByImpact", è molto simile a quella di "useMyTasksByStatus"
 * la costante "formattedData" deve avere la stessa struttura di quella di "MyTasksByStatusTile"
 * per tradurre i valori di "impact" in label usa la costante "taskImpactLabels"
 */

function MyTasksByImpactTile() {
  const { data } = useMyTasksByImpact();
  console.log(data);

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
      <ResponsivePie
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
      />
    </div>
  );
}

/**
 * TODO: Alberto 3
 * fai la stessa cosa che hai fatto per "MyTasksByStatusTile" ma per "MyTasksByCategory"
 * la variabile "data" ha la struttura definita in un commento sopra la funzione "useMyTasksByCategory"
 * la costante "formattedData" deve avere la stessa struttura di quella di "MyTasksByStatusTile"
 * per tradurre i valori di "category" in label usa direttamente la chiave dell'oggetto "data.categoryPercentage"
 * usa "useMemo" per memoizare il risultato della formattazione, come dipendenze usa "data"
 */

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
      <ResponsivePie
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
      />
    </div>
  );
}

function MyTaskCompletionCalendar() {
  const { data } = useMyTaskCompletionCalendar();

  // If data or calendar is undefined, return null or some fallback UI
  if (!data || !Array.isArray(data.calendar)) {
    return null; // or <div>Loading...</div> or some other fallback UI
  }

  const { calendar, from, to } = data;

  return (
    <div className="simple-tile calendar-tile">
      <h4>Task Completion Calendar</h4>
      <ResponsiveCalendar
        data={calendar}
        from={from}
        to={to}
        align="top"
        emptyColor="#eeeeee"
        colors={["#61cdbb", "#97e3d5", "#e8c1a0", "#f47560"]}
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
  const { data } = useMyMostBusyTimes();
  console.log(data);

  return (
    <div className="simple-tile most-busy-times">
      <h4>Most Busy Times</h4>
      <ResponsiveHeatMap
        data={data}
        margin={{ top: 50, right: 90, bottom: 60, left: 90 }}
        valueFormat=">-.2s"
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
          legend: "days of the week",
          legendPosition: "middle",
          legendOffset: 70,
          truncateTickAt: 0,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "days of the week",
          legendPosition: "middle",
          legendOffset: -72,
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
            title: "Tasks →",
            titleAlign: "start",
            titleOffset: 4,
          },
        ]}
      />
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
          {/* Task Completion Calendar */}
          <MyTaskCompletionCalendar />
        </div>
        <div className="my-journey__content__row">
          {/* Most Busy Times */}
          <MyMostBusyTimes />
        </div>
      </div>
    </div>
  );
}

export default MyJourneyScreen;
