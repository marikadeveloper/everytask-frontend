import { ResponsivePie } from "@nivo/pie";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from "prop-types";
import { useMemo } from "react";
import {
  useMyFastestTaskCompletionTime,
  useMyMostProductiveDay,
  useMyTasksByCategory,
  useMyTasksByImpact,
  useMyTasksByStatus,
} from "../../utils/my-journey";
import { taskStatusLabels } from "../../utils/task";
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
    if (!data) return [];

    return Object.entries(data.statusPercentage).map(
      ([status, percentage]) => ({
        id: taskStatusLabels[status],
        label: taskStatusLabels[status],
        value: parseFloat(percentage),
      }),
    );
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

  /**
   * TODO: Alberto 2
   * fai la stessa cosa che hai fatto per "MyTasksByStatusTile" ma per "MyTasksByImpactTile"
   * la variabile "data" ha la struttura definita in un commento sopra la funzione "useMyTasksByImpact", è molto simile a quella di "useMyTasksByStatus"
   * la costante "formattedData" deve avere la stessa struttura di quella di "MyTasksByStatusTile"
   * per tradurre i valori di "impact" in label usa la costante "taskImpactLabels"
   */

  return (
    <div className="simple-tile tasks-by-impact">
      <h4>Tasks by Impact</h4>
      {/* <ResponsivePie ... */}
    </div>
  );
}

function MyTasksByCategory() {
  const { data } = useMyTasksByCategory();

  /**
   * TODO: Alberto 3
   * fai la stessa cosa che hai fatto per "MyTasksByStatusTile" ma per "MyTasksByCategory"
   * la variabile "data" ha la struttura definita in un commento sopra la funzione "useMyTasksByCategory"
   * la costante "formattedData" deve avere la stessa struttura di quella di "MyTasksByStatusTile"
   * per tradurre i valori di "category" in label usa direttamente la chiave dell'oggetto "data.categoryPercentage"
   * usa "useMemo" per memoizare il risultato della formattazione, come dipendenze usa "data"
   */

  return (
    <div className="simple-tile tasks-by-category">
      <h4>Tasks by Category</h4>
      {/* <ResponsivePie ... */}
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
