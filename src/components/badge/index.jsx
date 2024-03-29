import PropTypes from "prop-types";
import dayjs from "dayjs";
import { useAuth } from "../../context/auth-context";
import "./styles.scss";

function Badge({ userBadge }) {
  const { user } = useAuth();
  const { badge } = userBadge;

  return (
    <div className="badge">
      <img
        src={`/src/assets/badges/${badge.code}.jpg`}
        alt={`${badge.code} badge`}
      />
      <small>{dayjs(userBadge.earnedAt).format(user.dateFormat)}</small>
      <p className="font-weight-medium">{badge.name}</p>
      <p>{badge.description}</p>
    </div>
  );
}

Badge.propTypes = {
  userBadge: PropTypes.object.isRequired,
};

export default Badge;
