import PropTypes from "prop-types";
import dayjs from "dayjs";
import { useAuth } from "../../context/auth-context";
import "./styles.scss";

function Badge({ badge, earnedAt }) {
  const { user } = useAuth();

  return (
    <div className={`badge ${earnedAt ? "badge--earned" : ""}`}>
      <img src={`/badges/${badge.code}.jpg`} alt={`${badge.code} badge`} />
      {earnedAt ? (
        <small>{dayjs(earnedAt).format(user.dateFormat)}</small>
      ) : (
        <small />
      )}
      <p className="font-weight-medium">{badge.name}</p>
      <p>{badge.description}</p>
    </div>
  );
}
Badge.defaultProps = {
  earnedAt: undefined,
};
Badge.propTypes = {
  badge: PropTypes.object.isRequired,
  earnedAt: PropTypes.string,
};

export default Badge;
