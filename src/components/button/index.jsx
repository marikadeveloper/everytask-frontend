import { Button as NuiButton } from "@nextui-org/react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { ArrowBack } from "../../assets/icons/index";
import "./styles.scss";

function Button({
  children,
  className,
  color = "primary",
  form,
  isLoading,
  onClick,
  onPress,
  size = "md",
  type,
  variant,
}) {
  return (
    <NuiButton
      className={className}
      color={color}
      form={form}
      isLoading={isLoading}
      onClick={onClick}
      onPress={onPress}
      size={size}
      type={type}
      variant={variant}
    >
      {children}
    </NuiButton>
  );
}
Button.defaultProps = {
  children: null,
  className: "",
  color: "primary",
  form: "",
  isLoading: false,
  onClick: () => {},
  onPress: () => {},
  size: "md",
  type: "button",
  variant: "solid",
};
Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  color: PropTypes.string,
  form: PropTypes.string,
  isLoading: PropTypes.bool,
  onClick: PropTypes.func,
  onPress: PropTypes.func,
  size: PropTypes.string,
  type: PropTypes.string,
  variant: PropTypes.string,
};

function LinkButton({ size = "sm", to, className, children }) {
  return (
    <NuiButton
      as={Link}
      className={`link-button ${className}`}
      color="primary"
      size={size}
      startContent={<ArrowBack />}
      to={to}
      variant="bordered"
    >
      {children}
    </NuiButton>
  );
}

LinkButton.defaultProps = {
  children: null,
  className: "",
  size: "sm",
  to: "/",
};
LinkButton.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  size: PropTypes.string,
  to: PropTypes.string,
};

function IconButton({ icon, ...props }) {
  return (
    <NuiButton
      className="icon-button"
      color="danger"
      isIconOnly
      startContent={icon}
      variant="light"
      {...props}
    />
  );
}
IconButton.propTypes = {
  icon: PropTypes.node.isRequired,
};

export { Button, IconButton, LinkButton };
