import PropTypes from "prop-types";
import "./styles.scss";

function Badge({ userBadge }) {
  return (
    <img
      className="badge"
      src={`/src/assets/badges/${userBadge.badge.code}.jpg`}
      alt={`${userBadge.badge.code} badge`}
    />
  );
}
Badge.propTypes = {
  userBadge: PropTypes.object.isRequired,
};

export default Badge;
