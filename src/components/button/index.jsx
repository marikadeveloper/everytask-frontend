import { Button as NuiButton } from "@nextui-org/react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { ArrowBack } from "../../assets/icons/index";
import "./styles.scss";

function Button({ isLoading, type, size, className, children, onClick }) {
  return (
    <NuiButton
      color="primary"
      onClick={onClick}
      isLoading={isLoading}
      type={type}
      size={size}
      className={className}
    >
      {children}
    </NuiButton>
  );
}
Button.defaultProps = {
  isLoading: false,
  type: "button",
  size: "lg",
  className: "",
  children: null,
  onClick: () => {},
};
Button.propTypes = {
  isLoading: PropTypes.bool,
  type: PropTypes.string,
  size: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
  onClick: PropTypes.func,
};

function LinkButton({ size = "sm", to, className, children }) {
  return (
    <NuiButton
      className={`link-button ${className}`}
      color="primary"
      variant="bordered"
      startContent={<ArrowBack />}
      as={Link}
      to={to}
      size={size}
    >
      {children}
    </NuiButton>
  );
}

LinkButton.defaultProps = {
  to: "/",
  size: "sm",
  className: "",
  children: null,
};
LinkButton.propTypes = {
  to: PropTypes.string,
  size: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
};

export { Button, LinkButton };
