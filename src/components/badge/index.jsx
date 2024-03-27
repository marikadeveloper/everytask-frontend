import PropTypes from "prop-types";
import "./styles.scss";

function Badge({ code }) {
  return (
    <img
      className="badge"
      src={`src/assets/badges/${code}.jpg`}
      alt={`${code} badge`}
    />
  );
}
Badge.propTypes = {
  code: PropTypes.string.isRequired,
};

export default Badge;
