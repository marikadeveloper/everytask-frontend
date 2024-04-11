import PropTypes from "prop-types";
import "./styles.scss";

function ServiceAlert({ text, severity }) {
  return (
    <div role="alert" className={`service-alert service-alert--${severity}`}>
      <p>{text}</p>
    </div>
  );
}
ServiceAlert.propTypes = {
  text: PropTypes.string.isRequired,
  severity: PropTypes.oneOf(["info", "success", "warning", "error"]).isRequired,
};

export default ServiceAlert;
