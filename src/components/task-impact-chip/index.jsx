import PropTypes from "prop-types";
import { Cog, Flash, Leaf, Rocket } from "../../assets/icons";
import "./styles.scss";

function TaskImpactChip({ impact, iconOnly = false }) {
  const getIcon = (impactValue) => {
    switch (impactValue) {
      case "HIGH_IMPACT_LOW_EFFORT":
        return <Flash />;
      case "HIGH_IMPACT_HIGH_EFFORT":
        return <Rocket />;
      case "LOW_IMPACT_LOW_EFFORT":
        return <Leaf />;
      case "LOW_IMPACT_HIGH_EFFORT":
        return <Cog />;
      default:
        return "";
    }
  };

  const getImpactString = (impactValue) => {
    switch (impactValue) {
      case "HIGH_IMPACT_LOW_EFFORT":
        return "High impact, low effort";
      case "HIGH_IMPACT_HIGH_EFFORT":
        return "High impact, high effort";
      case "LOW_IMPACT_LOW_EFFORT":
        return "Low impact, low effort";
      case "LOW_IMPACT_HIGH_EFFORT":
        return "Low impact, high effort";
      default:
        return "";
    }
  };

  return (
    <div
      className={`task-impact-chip ${impact} ${iconOnly ? "task-impact-chip--icon-only" : ""}`}
    >
      <div className="task-impact-chip__icon">{getIcon(impact)}</div>
      {iconOnly ? null : <p>{getImpactString(impact)}</p>}
    </div>
  );
}
TaskImpactChip.defaultProps = {
  iconOnly: false,
};
TaskImpactChip.propTypes = {
  impact: PropTypes.string.isRequired,
  iconOnly: PropTypes.bool,
};

export default TaskImpactChip;
